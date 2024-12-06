import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  useGetPostsByAdminQuery,
  useUpdatePostMutation,
} from "../app/service/postApiSlice";
import {
  Alert,
  Button,
  FileInput,
  Progress,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import axios from "axios";
import ReactQuill from "react-quill";

export default function UpdatePost() {
  const { postId } = useParams();
  const {
    data: postData,
    error: postError,
    isLoading: isPostFetching,
  } = useGetPostsByAdminQuery({ postId });
  const [updatePost, { data, isLoading, error, isSuccess }] =
    useUpdatePostMutation();
  const post = postData?.posts?.[0];
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  useEffect(() => {
    if (postData?.posts?.length > 0) {
      const { title, content, category, image } = postData.posts[0];
      setFormData({
        title,
        content,
        category,
        image,
      });
    }
  }, [postData]);

  useEffect(() => {
    if (error?.message) {
      setPublishError(error.message);
    } else if (error?.data?.message) {
      setPublishError(error.data.message);
    } else {
      return;
    }
  }, [error]);

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        return setLocalError("max file size is 2mb");
      }
      if (!file.type.startsWith("image/")) {
        return setLocalError("file is not an image");
      }
      setImage(file);
      setLocalError(null);
    }
  };
  const handleImageUpload = async () => {
    if (!image) {
      return setLocalError("Please select an image");
    }
    setIsImageUploading(true);
    const data = new FormData();
    data.append("file", image);
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

      setFormData({
        ...formData,
        image: response.data.secure_url,
      });
      setIsImageUploading(false);
      setImageUploadProgress(null);
      setLocalError(null);
      setImage(null);
    } catch (error) {
      setLocalError(error.message || "Upload failed!");
      setIsImageUploading(false);
      setImageUploadProgress(null);
      setImage(null);
    }
  };
  const handleUpdatePost = async (e) => {
    try {
      e.preventDefault();
      const { title, content } = formData;
      if (!title || !content || title.trim() === "" || content.trim() === "") {
        return;
      }
      const updatedData = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image: formData.image,
      };
      await updatePost({ postId, updatedData });
    } catch (error) {
      setPublishError(error.message || "Publish failed!");
    }
  };
  console.log(formData);
  return (
    <section>
      <h1 className="text-center text-4xl font-semibold mt-7">Update Post</h1>
      <form className="flex flex-col gap-4 mt-7" onSubmit={handleUpdatePost}>
        <div className="flex flex-col gap-4 md:flex-row">
          <TextInput
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
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
              onClick={handleImageUpload}
            >
              Upload Image
            </Button>
          )}
        </div>

        {localError && <Alert color="failure">{localError}</Alert>}
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
        {formData.image && (
          <div className="flex justify-center">
            <img
              src={formData.image}
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
          value={formData.content || ""}
          onChange={(value) =>{
            setFormData((prev) => ({ ...prev, content: value }))
          }
          }
        />
        {publishError && <Alert color="failure">{publishError}</Alert>}

        <Button type="submit" gradientDuoTone="greenToBlue">
          {isLoading ? (
            <>
              <Spinner aria-label="Spinner button uploading" size="sm" />
              <span>Uploading</span>
            </>
          ) : (
            "Upload"
          )}
        </Button>
      </form>
      {isSuccess && <Navigate to={`/post/${data.post.slug}`} />}
    </section>
  );
}
