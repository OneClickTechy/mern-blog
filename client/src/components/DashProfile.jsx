import React, { useEffect, useRef, useState } from "react";
import { useGetUserQuery } from "../app/service/userApiSlice";
import { Alert, Button, TextInput } from "flowbite-react";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { data } = useGetUserQuery();
  const imagePickerRef = useRef(null);
  const [imageFile, setimageFile] = useState(null);
  const [imageFileUrl, setimageFileUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadError, setUploadError] = useState(null);

  const handleImageFileChange = (e) => {
    const imageFileFromInput = e.target.files[0];

    if (!imageFileFromInput?.type?.startsWith("image/")) {
      return setUploadError("file is not an image");
    }
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (imageFileFromInput.size > MAX_FILE_SIZE) {
      return setUploadError("max file size is 2mb");
    }
    if (imageFileFromInput) {
      setimageFile(imageFileFromInput);
      setimageFileUrl(URL.createObjectURL(imageFileFromInput));
    }
  };

  const uploadImage = async () => {
    try {
      setProgress(0);
      setUploadError(null);
      setUploadStatus("Uploading...");
      const upload_preset = "mern-blog";
      const cloud_name = "dj3ckhyfk";
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", upload_preset);
      data.append("cloud_name", cloud_name);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            
            setProgress(
              ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0)
            );
          },
        }
      );
      setUploadedUrl(response.data.secure_url);
      setimageFile(null);
      setUploadStatus("Upload successful!");
      
    } catch (error) {
      console.error("Error uploading the image", error);
      setUploadStatus(error.message || "Upload failed!");
      setimageFile(null)
      setimageFileUrl(null)
      setProgress(0); // Reset progress
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  
  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          hidden
          ref={imagePickerRef}
        />
         <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => imagePickerRef.current.click()}
        >
          {progress ? (
            <CircularProgressbar
            
              value={progress || 0}
              text={`${progress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    progress / 100
                  })`,
                },
              }}
            />
          ):null}
          <img
            src={imageFileUrl || data.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              progress &&
              progress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        <TextInput
          placeholder="Username"
          defaultValue={data.username}
          id="username"
        />
        <TextInput placeholder="Email" defaultValue={data.email} id="email" />
        <TextInput placeholder="password" id="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
        <div className="flex justify-between text-red-500">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}
