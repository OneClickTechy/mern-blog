import React, { useEffect, useRef, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../app/service/userApiSlice";
import { Alert, Button, TextInput } from "flowbite-react";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { data } = useGetUserQuery();
  const [updateProfile, {data: updatedProfileData, isLoading, isError, isSuccess}] = useUpdateUserMutation();
  console.log({updatedProfileData, isLoading, isError, isSuccess});
  const imagePickerRef = useRef(null);
  const [imageFile, setimageFile] = useState(null);
  const [imageFileUrl, setimageFileUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData({...formData, [id]: value})
  }

  const handleImageFileChange = (e) => {

    const imageFileFromInput = e.target.files[0];
    e.target.value="";
    
    if (!imageFileFromInput?.type?.startsWith("image/")) {
      return setUploadError("file is not an image");
    }
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (imageFileFromInput.size > MAX_FILE_SIZE) {
      return setUploadError("max file size is 2mb");
    }
    if (imageFileFromInput) {
      setUploadError(null);
      setimageFile(imageFileFromInput);
      setimageFileUrl(URL.createObjectURL(imageFileFromInput));
    }
  };

  const uploadImage = async () => {
    try {
      setProgress(0);
      setUploadError(null);
      setUploadStatus("Uploading...");
      setIsUploadSuccess(false);

      const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

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
       // Check if response has an error
    if (response.status !== 200 || !response.data.secure_url) {
      throw new Error("Failed to upload image");
    }
      setIsUploadSuccess(true);
      setUploadedUrl(response.data.secure_url);
      setFormData({
        ...formData,
        profilePicture: response.data.secure_url,
      })
      setimageFile(null);
      setUploadStatus("Upload successful!");
      
    } catch (error) {
      console.error("Error uploading the image", error);
      setUploadStatus(error.message || "Upload failed!");
      setIsUploadSuccess(false);
      setimageFile(null)
      setimageFileUrl(null)
      setProgress(0); // Reset progress
    }
  };
  const canUpdate = Boolean(!uploadError && Object.keys(formData).length > 0 && isUploadSuccess);
  const handleSubmit = async (e) =>{
    e.preventDefault();
      if(!canUpdate){
        console.log('can\'t upload')
        return
      }
      try {
        setIsUploadSuccess(false);//reset
        await updateProfile(formData);

        setimageFile(null)
        setimageFileUrl(null)
        setUploadError(null)
        setUploadedUrl("")
        setFormData({})

        console.log("Profile updated successfully!")
      } catch (error) {
        console.error(error)
      }
      
  }
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  
  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
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
          {progress > 0 && imageFileUrl ? (
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
          id="username" onChange={handleChange} 
        />
        <TextInput placeholder="Email" defaultValue={data.email} id="email" onChange={handleChange} />
        <TextInput placeholder="password" id="password" onChange={handleChange} />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={!canUpdate|| isLoading || !isUploadSuccess} >
          Update
        </Button>
        {isSuccess && (
          <Alert color="success">Profile updated successfully</Alert>
        )}
        <div className="flex justify-between text-red-500">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign out</span>
        </div>
      </form>
    </div>
  );
}
