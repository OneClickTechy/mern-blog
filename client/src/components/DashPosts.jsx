import React, { useState } from "react";
import { useGetPostsByAdminQuery } from "../app/service/postApiSlice";
import { useEffect } from "react";
import { Table } from "flowbite-react";
export default function DashPosts({ user }) {
  const [startIndex, setStartIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const { data, refetch } = useGetPostsByAdminQuery(
    startIndex,
    9,
    "desc",
    user?._id
  );
  console.log(data);

  const handleShowMore = async () => {
    const newStartIndex = startIndex + 9;
    setStartIndex(startIndex + 9);
    console.log(startIndex);
    await refetch(newStartIndex, 9, "desc", user?._id);
  };
  const canShowMore = Boolean(posts?.length < data?.totalPosts);
  useEffect(() => {
    if (data?.posts?.length) {
      const newPosts = data.posts.filter((post) =>
        posts.length ? !posts.some((p) => p._id === post._id) : true
      );
      setPosts((prev) => [...prev, ...newPosts]);
    }
  }, [data]);

  return (
    <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {user?.isAdmin && posts.length>0 ? (
        <>
          <Table className="overflow-x-scroll">
            <Table.Head>
              <Table.HeadCell>Date modified</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">delete</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {posts &&
                posts.map((post) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={post._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{post.title}</Table.Cell>
                    <Table.Cell>
                      <img
                        src={post.image}
                        className="w-12 h-10 object-cover bg-gray-500"
                        alt={post.title}
                      />
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>Edit</Table.Cell>
                    <Table.Cell>Delete</Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
          {canShowMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no post!!!</p>
      )}
    </div>
  );
}
