import  { useState } from "react";
import { useDeletePostMutation, useGetPostsByAdminQuery } from "../app/service/postApiSlice";
import { useEffect } from "react";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashPosts({ user }) {
  const [startIndex, setStartIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const { data, refetch } = useGetPostsByAdminQuery(
    {startIndex,
    limit:9,
    sort:"desc",
    userId:user?._id}
  );
  const [deletePost, {}]= useDeletePostMutation()
  const [openModal, setOpenModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const handleShowMore = async () => {
    const newStartIndex = startIndex + 9;
    setStartIndex(startIndex + 9);
    await refetch({startIndex:newStartIndex, limit:9, sort:"desc", userId:user?._id});
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
  const handleDeletePost = async () => {
    setOpenModal(false);
    await deletePost(postToDelete);
    setPosts(posts.filter((post) => post._id !== postToDelete));
  }
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
                   
                    <Table.Cell> <Link to={`/post/${post.slug}`}>{post.title}</Link></Table.Cell>
                    
                    <Table.Cell>
                      <img
                        src={post.image}
                        className="w-12 h-10 object-cover bg-gray-500"
                        alt={post.title}
                      />
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    
                    <Table.Cell className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() =>{
                      setOpenModal(true)
                      setPostToDelete(post._id)
                    }}>Delete</Table.Cell>
                    <Table.Cell className="font-medium hover:underline cursor-pointer">
                      <Link to={`/update-post/${post._id}`}>
                      Edit
                      </Link>
                      </Table.Cell>
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>
               handleDeletePost()
              }>
               {"Yes, I\'m sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
          </Modal.Body>
       </Modal>
    </div>
  );
}
