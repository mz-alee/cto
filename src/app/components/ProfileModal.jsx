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
import { useMutation } from "@tanstack/react-query";
import { ProfileEditApi } from "../api/profileApi";
import { toast } from "react-toastify";

const profileSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
});

const ProfileEditModal = ({
  isOpen,
  setIsOpen,
  profileMutation,
  profileData,
}) => {
  const [file, setFile] = useState(null);

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: profileData?.data?.[0].username,
      image: undefined,
      bio: "",
    },
  });

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleImage = (e) => {
    const img = e.target.files?.[0];
    if (img) {
      const imageURL = URL.createObjectURL(img);
      setValue("image", img);
      setFile(imageURL);
    }
  };

  const handleProfileData = (data) => {
    // console.log(formData);
    const formData = data;
    if (formData.image) {
      profileMutation.mutate(formData);
    } else {
      const username = { username: data.username, about: data.about };
      profileMutation.mutate(username);
    }
  };

  useEffect(() => {
    if (profileMutation.isSuccess) {
      setIsOpen(false);
    }
  }, [profileMutation.isSuccess]);
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
          minHeight: "490px",
          width: "350px",
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
          <h2 className="text-center font-medium text-[15px]">Edit Profile</h2>
        </div>

        <div>
          <label
            htmlFor="profile"
            className="border-dashed bg-gray-50 hover:bg-gray-100 cursor-pointer border rounded-lg flex flex-col items-center justify-center gap-2 border-gray-300 h-30 w-full p-4"
          >
            {file || profileData?.data?.[0].image ? (
              <div className="bg-gray-400 rounded-full overflow-hidden w-20 h-20 flex justify-center items-center">
                <Image
                  src={file || profileData?.data?.[0]?.image}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover rounded-full"
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
          <label className="text-[13px] capitalize">username</label>
          <InputField
            register={register}
            placeholder="username"
            type="text"
            name="username"
            values={profileData?.data?.[0]?.username}
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[13px] capitalize">bio</label>
          <InputField
            register={register}
            placeholder="bio"
            type="text"
            name="about"
            values={profileData?.data?.[0]?.about}
          />
        </div>

        <div className="flex flex-col gap-2 mt-10">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="border text-[12px] rounded-2xl px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#132928] text-white text-[12px] rounded-2xl px-3 py-2 hover:bg-[#375f5d]"
          >
            {profileMutation.isPending ? <Loader /> : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default ProfileEditModal;
