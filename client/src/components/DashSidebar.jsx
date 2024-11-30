import React from "react";
import { Sidebar } from "flowbite-react";
import { HiDocumentText, HiUser } from "react-icons/hi";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { getTab } from "../app/features/dashboardSlice";
import { Link } from "react-router-dom";
import { useSignoutMutation } from "../app/service/authApiSlice";
import { useGetUserQuery } from "../app/service/userApiSlice";

export default function DashSidebar() {
  const tab = useSelector(getTab);
  const [signout] = useSignoutMutation();
  const { data: user } = useGetUserQuery();
  const handleSignout = async () => {
    await signout();
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col sm:gap-2">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={user.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {user.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiMiniArrowLeftStartOnRectangle}
            onClick={handleSignout}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
