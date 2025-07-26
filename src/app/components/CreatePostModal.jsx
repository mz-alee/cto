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

const profileSchema = yup.object().shape({
  about: yup.string().required("About is required"),
  location: yup.string().required("Location is required"),
  bird_species: yup.string().required("Bird species is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  duration: yup.string().required("Duration is required"),
});

const CreatePostModal = ({ isOpen, setIsOpen, postMutation }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({ locations: [], bird_species: [] });

  useEffect(() => {
    fetch("/DropDownData.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  const locationItems = data.locations.map((loc, index) => ({
    key: `loc-${index}`,
    label: loc,
  }));
  const bird_species = data.bird_species.map((loc, index) => ({
    key: `loc-${index}`,
    label: loc,
  }));

  const {
    handleSubmit,
    setValue,
    getValues,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      about: "",
      image: "",
      location: "",
      bird_species: "",
      date: "",
      time: "",
      duration: "",
    },
  });

  const value = getValues();
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleImage = (e) => {
    const img = e.target.files && e.target.files[0];
    if (img) {
      const imageURL = URL.createObjectURL(img);
      setValue("image", img);
      setFile(imageURL);
    }
  };


  const handleProfileData = (formData) => {
    const { date, time, ...rest } = formData;

    // Combine date and time and convert to UTC ISO format
    const datetime = moment
      .utc(`${date} ${time}`, "YYYY-MM-DD HH:mm")
      .toISOString();

    const payload = {
      ...rest,
      datetime, // e.g. "2025-07-26T20:54:14.000Z"
    };

    console.log("Payload:", payload);

    postMutation.mutate(payload);
  };

  useEffect(() => {
    if (postMutation.isSuccess) {
      setFile("");
      reset();
      // setIsOpen(false)
    }
  }, [postMutation.isSuccess]);
  console.log(errors);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Profile Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
        },
        content: {
          minHeight: "550px",
          width: "380px",
          top: "50%",
          padding: "10px 10px",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "8px",
        },
      }}
    >
      <form
        className="flex flex-col text-gray-800 justify-between gap-4"
        onSubmit={handleSubmit(handleProfileData)}
      >
        <div>
          <IoIosClose
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-2xl cursor-pointer"
          />
          <h2 className="text-center font-medium text-[15px] lg:text-[1.2vw]">
            create your post
          </h2>
        </div>
        <div>
          <label
            htmlFor="profile"
            className="border-dashed bg-gray-50 hover:bg-gray-100 cursor-pointer border rounded-lg flex flex-col items-center justify-center gap-2 border-gray-300 h-30 w-full p-4"
          >
            {file ? (
              <div className="bg-gray-400 rounded-full overflow-hidden w-16 h-16 flex justify-center items-center">
                <Image
                  src={file}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <>
                <LuImagePlus className="text-lg" />
                <p className="text-[12px] text-gray-700">
                  Click or drag to upload
                </p>
                <p className="text-gray-500 text-[12px]">PNG, JPG, SVG</p>
              </>
            )}
          </label>
          <input
            type="file"
            id="profile"
            className="hidden"
            onChange={handleImage}
            accept="image/*"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[13px] lg:text-[0.8vw] capitalize">
            location
          </label>
          <div className="w-full border border-gray-700 rounded p-1">
            <DropdownList
              data={locationItems}
              onSelect={(value) => {
                setValue("location", value);
              }}
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-xs">{errors.location.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[13px] lg:text-[0.8vw] capitalize">
            bird type
          </label>
          <div className="w-full border border-gray-700 rounded p-1">
            <DropdownList
              data={bird_species}
              onSelect={(value) => {
                setValue("bird_species", value);
              }}
            />
          </div>
          {errors.bird_species && (
            <p className="text-red-500 text-xs">
              {errors.bird_species.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[13px] lg:text-[0.8vw] capitalize">Time</label>
          <InputField
            register={register}
            placeholder="Time"
            type="time"
            name="time"
          />
          {errors.time && (
            <p className="text-red-500 text-xs">{errors.time.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[13px] lg:text-[0.8vw] capitalize">date</label>
          <InputField
            register={register}
            placeholder="Date"
            type="date"
            name="date"
          />
          {errors.date && (
            <p className="text-red-500 text-xs">{errors.date.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[13px] lg:text-[0.8vw] capitalize">
            duration
          </label>
          <InputField
            register={register}
            placeholder="Duration"
            type="text"
            name="duration"
          />
          {errors.duration && (
            <p className="text-red-500 text-xs">{errors.duration.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[13px] lg:text-[0.8vw] capitalize">
            about
          </label>
          <InputField
            register={register}
            placeholder="about"
            type="text"
            name="about"
          />
          {errors.about && (
            <p className="text-red-500 text-xs">{errors.about.message}</p>
          )}
        </div>

        <div className="flex justify-between w-full flex-col gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="border text-[14px] rounded-2xl px-3 cursor-pointer py-1 text-gray-600 hover:bg-gray-100"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#132928] text-white text-[14px] rounded-2xl px-3 py-1 hover:bg-[#375f5d]"
          >
            {postMutation.isPending ? <Loader color="white" /> : "upload"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostModal;
