import axios from "axios";
import {
  Alert,
  Button,
  FileInput,
  Progress,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const [imageFileFromInput, setimageFileFromInput] = useState(null);
  const [imageFileFromInputError, setImageFileFromInputError] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        return setImageFileFromInputError("max file size is 2mb");
      }
      if (!file.type.startsWith("image/")) {
        return setImageFileFromInputError("file is not an image");
      }
      setImageFileFromInputError(null);
      setimageFileFromInput(file);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFileFromInput) {
      return setImageUploadError("Please select an image");
    }
    setIsImageUploading(true);
    const data = new FormData();
    data.append("file", imageFileFromInput);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            setImageUploadProgress(
              ((progressEvent.loaded / progressEvent.total) * 100).toFixed(0)
            );
          },
        }
      );

      if (response.status !== 200 || !response.data.secure_url) {
        throw new Error("Failed to upload image");
      }

      setUploadedImageURL(response.data.secure_url);
      setIsImageUploading(false);
      setImageUploadProgress(null);
      setImageUploadError(null);
      setimageFileFromInput(null);
      setImageFileFromInputError(null);
    } catch (error) {
      setImageUploadError(error.message || "Upload failed!");
      setIsImageUploading(false);
      setImageUploadProgress(null);
      setimageFileFromInput(null);
      setImageFileFromInputError(null);
    }
  };
  useEffect(() => {
    if (uploadedImageURL) {
      console.log(uploadedImageURL);
    }
  }, [uploadedImageURL]);

  return (
    <section className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-4xl font-semibold mt-7">Create Post</h1>
      <form className="flex flex-col gap-4 mt-7">
        <div className="flex flex-col gap-4 md:flex-row">
          <TextInput
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select id="category">
            <option value="uncategorized">Select Category</option>
            <option value="reactjs">React JS</option>
            <option value="nodejs">Node JS</option>
            <option value="expressjs">Express JS</option>
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            accept="image/*"
            className="flex-1"
            onChange={handleImageInputChange}
          />
          {isImageUploading ? (
            <Button>
              <Spinner aria-label="Spinner button uploading" size="sm" />
              <span className="pl-3">Uploading...</span>
            </Button>
          ) : (
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
              disabled={!imageFileFromInput}
              onClick={handleImageUpload}
            >
              Upload Image
            </Button>
          )}
        </div>
        {imageFileFromInputError && (
          <Alert color="failure">{imageFileFromInputError}</Alert>
        )}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {isImageUploading && (
          <Progress
            progress={imageUploadProgress}
            progressLabelPosition="inside"
            textLabel={`Uploading....`}
            textLabelPosition="inside"
            size="lg"
            labelProgress
            labelText
          />
        )}

        {uploadedImageURL && (
          <div className="flex justify-center">
            <img
              src={uploadedImageURL}
              alt="uploaded image"
              className="rounded-lg"
            />
          </div>
        )}

        <ReactQuill
          theme="snow"
          placeholder="Write something...."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="greenToBlue">
          Publish
        </Button>
      </form>
    </section>
  );
}
