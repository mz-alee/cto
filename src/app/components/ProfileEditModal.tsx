"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoIosClose } from "react-icons/io";
import Modal from "react-modal";
import { LuImagePlus } from "react-icons/lu";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";
import Loader from "./Loader";
import InputField from "./InputField";
interface ProfileFormInputs {
  username: string;
  image?: File | null;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const profileSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
});

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, setIsOpen }) => {
  const [file, setFile] = useState<string | null>(null);

  const data = {
    data: {
      user_details: {
        image: "",
        username: "",
      },
    },
  };

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: data.data.user_details.username,
      image: undefined,
    },
  });

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    if (img) {
      const imageURL = URL.createObjectURL(img);
      setValue("image", img);
      setFile(imageURL);
    }
  };

  const handleProfileData: SubmitHandler<ProfileFormInputs> = (formData) => {
    // Use your mutation here
    console.log(formData);

    if (formData.image) {
      // profileEditMutation.mutate(formData);
      console.log("Uploading image + username");
    } else {
      const usernameOnly = { username: formData.username };
      // profileEditMutation.mutate(usernameOnly);
      console.log("Updating only username");
    }
  };

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
          minHeight: "350px",
          width: "350px",
          top: "50%",
          padding: '10px 10px',
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
          <h2 className="text-center font-medium text-[15px]">
            create your post
          </h2>
        </div>

        <div>
          <label
            htmlFor="profile"
            className="border-dashed bg-gray-50 hover:bg-gray-100 cursor-pointer border rounded-lg flex flex-col items-center justify-center gap-2 border-gray-300 h-30 w-full p-4"
          >
            {file || data?.data?.user_details?.image ? (
              <div className="bg-gray-400 rounded-full overflow-hidden w-16 h-16 flex justify-center items-center">
                <Image
                  src={file || data.data.user_details.image}
                  alt="Profile"
                  width={60}
                  height={60}
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <>
                <LuImagePlus className="text-lg" />
                <p className="text-[12px] text-gray-700">Click or drag to upload</p>
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
            values={data.data.user_details.username}
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="border text-[12px] rounded-2xl px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            Discard
          </button>
          <button
            type="submit"
            className="bg-[#132928] text-white text-[12px] rounded-2xl px-3 py-1 hover:bg-[#375f5d]"
          >
            {/* Replace with actual loading state: */}
            {/* {profileEditMutation.isPending ? <Loader /> : "Save Changes"} */}
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileEditModal;
