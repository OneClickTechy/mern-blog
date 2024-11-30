import { useGetUserQuery } from "../app/service/userApiSlice";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function OnlyAdminPrivateRoutes() {
  const { isSuccess, data: user, isError, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isSuccess) {
    // Check if user is an admin
    if (user?.isAdmin) {
      return <Outlet />;
    }
  }
  if (isError) {
    return <Navigate to="/sign-in" />;
  }
  return null;
}
