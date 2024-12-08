import { HiDocumentText, HiUserGroup } from "react-icons/hi";
import { useGetUsersQuery } from "../app/service/userApiSlice";
import OverviewCard from "./OverviewCard";
import { useGetPostsByAdminQuery } from "../app/service/postApiSlice";
import { useGetAllCommentsQuery } from "../app/service/commentApiSlice";
import { BiSolidComment } from "react-icons/bi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
export default function DashboardComp() {
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useGetUsersQuery({ startIndex: 0, limit: 5, sort: "desc" });
  const {
    data: postsData,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useGetPostsByAdminQuery({
    startIndex: 0,
    limit: 5,
    sort: "desc",
  });
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    error: commentsError,
  } = useGetAllCommentsQuery({ startIndex: 0, limit: 5, sort: "desc" });

  if(isUsersLoading || isPostsLoading || isCommentsLoading){
    return <LoadingPage />
  }
  if(isUsersError || isPostsError || isCommentsError){
    return <div>{usersError?.data?.message || postsError?.data?.message || commentsError?.data?.message || usersError?.error || postsError?.error || commentsError?.error || "Something went wrong"}</div>
  }
  return (
    <div className="flex-1 p-4 max-w-6xl sm:h-screen overflow-y-scroll scrollbar-none mb-8">
      <div className="flex gap-2 sm:justify-center sm:p-4 flex-col sm:flex-row flex-wrap ">
        <OverviewCard
          title={"TOTAL USERS"}
          totalCount={usersData?.totalUsers}
          lastMonth={usersData?.lastMonthUsers}
          icon={HiUserGroup}
          iconColor={"bg-teal-500"}
        />
        <OverviewCard
          title={"TOTAL POSTS"}
          totalCount={postsData?.totalPosts}
          lastMonth={postsData?.lastMonthPosts}
          icon={HiDocumentText}
          iconColor={"bg-blue-500"}
        />
        <OverviewCard
          title={"TOTAL COMMENTS"}
          totalCount={commentsData?.totalComments}
          lastMonth={commentsData?.lastMonthComments}
          icon={BiSolidComment}
          iconColor={"bg-green-500"}
        />
      </div>
      <div className="flex flex-wrap gap-4 md:gap-8 p-4 justify-center ">
        <div className="max-w-lg">
          <div className="flex items-center justify-between p-2">
            <p>Recent users</p>
            <Link to="/dashboard?tab=users">
            <Button gradientDuoTone="pinkToOrange" className="rounded-xl">
              View all
            </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Profile</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {usersData?.users?.map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell>@{user.username}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
       
        <div className="max-w-lg">
          <div className="flex items-center justify-between p-2">
            <p>Recent comments</p>
            <Button gradientDuoTone="pinkToOrange" className="rounded-xl">
              View all
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {commentsData?.comments?.map((comment) => (
                <Table.Row key={comment._id}>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        <div className="max-w-lg">
          <div className="flex items-center justify-between p-2">
            <p>Recent posts</p>
            <Link to="/dashboard?tab=posts">
            <Button gradientDuoTone="pinkToOrange" className="rounded-xl">
              View all
            </Button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {postsData?.posts?.map((post) => (
                <Table.Row key={post._id}>
                    
                  <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      width={75}
                      height={50}
                      className="w-16 h-12 object-cover"
                    />
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="line-clamp-2"><Link to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
