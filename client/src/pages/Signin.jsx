import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSigninMutation } from "../app/service/authApiSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [signin, { isLoading, isSuccess, isError, error }] =
    useSigninMutation();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const canSignin = Boolean(formData.email && formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSignin) {
      return;
    }
    const userInfo = formData;
    await signin(userInfo);
  };
  return (
    <section className="mt-20 min-h-screen">
      <div className="p-2 flex flex-col gap-4 sm:flex-row sm:items-center max-w-3xl mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-lg text-white">
              Mr. JP&apos;S
            </span>
            Blog
          </Link>
          <p className="text-sm mt-4 text-gray-500">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@gmail.com"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                id="password"
                type="password"
                placeholder="********"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              className="mt-4"
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={isLoading || !canSignin}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span className="ml-2">Loading....</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          {isError && <Alert color="failure" className="mt-4">{error.data.message}</Alert>}
          {isSuccess && 
          <>
          <Alert color="success"  className="mt-4">SignIn Successfully</Alert>
          <Navigate to="/"/>
          </>
          }
          <div className="text-sm mt-5 flex gap-2">
            <span>Don&apos;t Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
         
        </div>
      </div>
    </section>
  );
}
