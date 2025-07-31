"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";
import { LuImagePlus } from "react-icons/lu";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "./Loader";
import InputField from "./InputField";
import DropdownList from "./Dropdown";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPostApi } from "../api/PostApi";

const profileSchema = yup.object().shape({
  about: yup.string().required("About is required"),
  location: yup.string().required("Location is required"),
  bird_species: yup.string().required("Bird species is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  duration: yup.string().required("Duration is required"),
});

const PostUpdateModal = ({ isOpen, setIsOpen, postData }) => {
  const [filePreview, setFilePreview] = useState(null);
  const queryClient = useQueryClient();

  const [data, setData] = useState({ locations: [], bird_species: [] });

  useEffect(() => {
    fetch("/DropDownData.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Dropdown load error:", err));
  }, []);

  const locationItems = data.locations.map((loc, i) => ({
    key: `loc-${i}`,
    label: loc,
  }));

  const birdSpeciesItems = data.bird_species.map((bird, i) => ({
    key: `bird-${i}`,
    label: bird,
  }));

  const {
    handleSubmit,
    setValue,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      about: "",
      location: "",
      bird_species: "",
      date: "",
      time: "",
      duration: "",
      image: "",
    },
  });

  // Set post data
  useEffect(() => {
    if (postData) {
      setValue("about", postData.about || "");
      setValue("location", postData.location || "");
      setValue("bird_species", postData.bird_species || "");
      setValue("duration", postData.duration || "");

      if (postData.datetime) {
        const date = moment(postData.datetime).format("YYYY-MM-DD");
        const time = moment(postData.datetime).format("HH:mm");
        setValue("date", date);
        setValue("time", time);
      }

      if (postData.image) {
        setFilePreview(postData.image);
        setValue("image", postData.image); // Initially keep the URL
      }
    }
  }, [postData]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const mutation = useMutation({
    mutationFn: ({ id, data }) => editPostApi({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      setIsOpen(false);
    },
    onError: (err) => {
      console.error("Update error:", err);
    },
  });

  const onSubmit = async (formData) => {
    const { date, time, image, ...rest } = formData;
    const datetime = moment
      .utc(`${date} ${time}`, "YYYY-MM-DD HH:mm")
      .toISOString();

    const payload = {
      ...rest,
      datetime,
    };

    const form = new FormData();
    for (let key in payload) {
      form.append(key, payload[key] || ""); // fallback to empty string
    }

    // Add image as File
    if (image && typeof image === "object") {
      form.append("image", image);
    } else if (filePreview && typeof image === "string") {
      try {
        const res = await fetch(filePreview);
        const blob = await res.blob();
        const fileName = filePreview.split("/").pop().split("?")[0];
        const file = new File([blob], fileName, { type: blob.type });
        form.append("image", file);
      } catch (err) {
        console.error("Image conversion error:", err);
      }
    }

    mutation.mutate({ id: postData.id, data: form });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Update Post"
      style={{
        overlay: { backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1000 },
        content: {
          minHeight: "550px",
          width: "380px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px",
          borderRadius: "8px",
        },
      }}
    >
      <form
        className="flex flex-col text-gray-800 justify-between gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <IoIosClose
            onClick={() => setIsOpen(false)}
            className="text-2xl cursor-pointer"
          />
          <h2 className="text-center font-medium text-[15px]">
            Update your post
          </h2>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="profile"
            className="border-dashed bg-gray-50 hover:bg-gray-100 cursor-pointer border rounded-lg flex flex-col items-center justify-center gap-2 border-gray-300 h-30 w-full p-4"
          >
            {filePreview ? (
              <Image
                src={filePreview}
                alt="Preview"
                width={60}
                height={60}
                className="object-cover h-25 w-25 rounded-full"
              />
            ) : (
              <>
                <LuImagePlus className="text-lg" />
                <p className="text-sm text-gray-700">Click or drag to upload</p>
                <p className="text-xs text-gray-500">PNG, JPG, SVG</p>
              </>
            )}
          </label>
          <input
            type="file"
            id="profile"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {/* Dropdowns and Inputs */}
        <div className="flex flex-col gap-1">
          <label className="text-sm capitalize">Location</label>
          <div className="border p-1 rounded border-gray-700">
            <DropdownList
              data={locationItems}
              value={watch("location")}
              onSelect={(val) => setValue("location", val)}
            />
          </div>
          {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm capitalize">Bird Type</label>
          <div className="border p-1 rounded border-gray-700">
            <DropdownList
              data={birdSpeciesItems}
              value={watch("bird_species")}
              onSelect={(val) => setValue("bird_species", val)}
            />
          </div>
          {errors.bird_species && <p className="text-red-500 text-xs">{errors.bird_species.message}</p>}
        </div>

        <InputField name="date" type="date" register={register} placeholder="Date" />
        {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}

        <InputField name="time" type="time" register={register} placeholder="Time" />
        {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}

        <InputField name="duration" type="text" register={register} placeholder="Duration" />
        {errors.duration && <p className="text-red-500 text-xs">{errors.duration.message}</p>}

        <InputField name="about" type="text" register={register} placeholder="About this post" />
        {errors.about && <p className="text-red-500 text-xs">{errors.about.message}</p>}

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="border rounded-2xl py-1 text-gray-600 hover:bg-gray-100"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#132928] text-white rounded-2xl py-1 hover:bg-[#375f5d]"
          >
            {mutation.isPending ? <Loader color="white" /> : "Update"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PostUpdateModal;
