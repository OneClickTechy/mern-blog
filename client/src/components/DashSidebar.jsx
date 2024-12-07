import { Sidebar } from "flowbite-react";
import { HiDocumentText, HiUser, HiUserGroup } from "react-icons/hi";
import { HiMiniArrowLeftStartOnRectangle } from "react-icons/hi2";
import { BiSolidComment } from "react-icons/bi";
import { useSelector } from "react-redux";
import { getTab } from "../app/features/dashboardSlice";
import { Link } from "react-router-dom";
import { useSignoutMutation } from "../app/service/authApiSlice";
import { useGetUserQuery } from "../app/service/userApiSlice";
import { FaChartPie } from "react-icons/fa";

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
        {user.isAdmin && (
            <>
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item
                active={tab === "dash"}
                icon={FaChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            </>
            )
        }
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
            <>
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiUserGroup}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=comments">
              <Sidebar.Item
                active={tab === "comments"}
                icon={BiSolidComment}
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
            </>
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
