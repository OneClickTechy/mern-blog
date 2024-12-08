import { useEffect, useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../app/service/userApiSlice";
import { Modal, Alert, Button, Spinner, TextInput } from "flowbite-react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSignoutMutation } from "../app/service/authApiSlice";
import {Link} from "react-router-dom"

export default function DashProfile() {
  const { data } = useGetUserQuery();
  const [updateProfile, { isLoading, isError, isSuccess }] =
    useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteLoading, isError: isDeleteError }] =
    useDeleteUserMutation();
  const [signout] = useSignoutMutation();
  const {data:AuthUser}= useGetUserQuery();
  const imagePickerRef = useRef(null);
  const [imageFile, setimageFile] = useState(null);
  const [imageFileUrl, setimageFileUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  const handleSignout = async () => {
    await signout();
  }
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageFileChange = (e) => {
    const imageFileFromInput = e.target.files[0];
    e.target.value = "";

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
      setFormData({
        ...formData,
        profilePicture: response.data.secure_url,
      });
      setimageFile(null);
    } catch (error) {
      console.error("Error uploading the image", error);
      setimageFile(null);
      setimageFileUrl(null);
      setProgress(0); // Reset progress
    }
  };
  const canUpdate = Boolean(
    !uploadError && Object.keys(formData).length > 0
  );
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canUpdate) {
      console.log("can't upload");
      return;
    }
    try {
      await updateProfile(formData);

      setimageFile(null);
      setimageFileUrl(null);
      setUploadError(null);
      setFormData({});

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async () => {
    await deleteUser(data._id);
      setOpenModal(false);
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
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => imagePickerRef.current.click()}
        >
          {progress > 0 && imageFileUrl ? (
            <CircularProgressbar
              value={progress || 0}
              text={`${progress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${progress / 100})`,
                },
              }}
            />
          ) : null}
          <img
            src={imageFileUrl || data.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              progress && progress < 100 && "opacity-60"
            }`}
          />
        </div>

        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        <TextInput
          placeholder="Username"
          defaultValue={data.username}
          id="username"
          onChange={handleChange}
        />
        <TextInput
          placeholder="Email"
          defaultValue={data.email}
          id="email"
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={!canUpdate || isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size="sm" /> <span>Update in progress</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
        {AuthUser?.isAdmin && (
          <Link to="/create-post">
          <Button gradientDuoTone="tealToLime" className="w-full">Create post</Button>
          </Link>
        )}
        {isSuccess && (
          <Alert color="success">Profile updated successfully</Alert>
        )}
        {isError && (
          <Alert color="failure">Failed to update profile</Alert>
        )}
        {
          isDeleteError && (
            <Alert color="failure">Failed to delete user</Alert>
          )
        }
        <div className="flex justify-between text-red-500">
          <span className="cursor-pointer" onClick={() => setOpenModal(true)}>Delete Account</span>
          <span className="cursor-pointer" onClick={handleSignout}>Sign out</span>
        </div>
       <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {isDeleteLoading ? (
                   <>
                   <Spinner size="sm" color="failure" /> <span>deleting...</span>
                 </>
                ) : "Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
          </Modal.Body>
       </Modal>
      </form>
    </div>
  );
}
