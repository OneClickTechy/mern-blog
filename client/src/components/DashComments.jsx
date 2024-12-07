import  { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDeleteCommentMutation, useGetAllCommentsQuery } from "../app/service/commentApiSlice";
import {FaCheck, FaTimes} from "react-icons/fa"
import LoadingPage from "./LoadingPage";

export default function DashComments({ user }) {
  const [startIndex, setStartIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const { data, isLoading, isError, error, refetch } = useGetAllCommentsQuery(
    {startIndex,
    limit:9,
    sort:"desc",
    }
  );
  console.log(data)
  
  const [deleteComment]= useDeleteCommentMutation()
  const [openModal, setOpenModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const handleShowMore = async () => {
    const newStartIndex = startIndex + 9;
    setStartIndex(startIndex + 9);
    await refetch({startIndex:newStartIndex, limit:9, sort:"desc"});
  };
  const canShowMore = Boolean(comments?.length < data?.totalComments);
  useEffect(() => {
    if (data?.comments?.length) {
      const newComments = data.comments.filter((comment) =>
        comments.length ? !comments.some((c) => c._id === comment._id) : true
      );
      setComments((prev) => [...prev, ...newComments]);
    }
  }, [data]);
  const handleDeleteComment = async () => {
    setOpenModal(false);
    await deleteComment(commentToDelete);
    setComments(comments.filter((comment) => comment._id !== commentToDelete));
  }
  if(isLoading){
    return <LoadingPage content="Loading comments, please wait..." />
  }
  if(isError){
    return <div>Error: {error?.data?.message}</div>
  }
  return (
    <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {user?.isAdmin && comments.length>0 ? (
        <>
          <Table className="overflow-x-scroll">
            <Table.Head>
              <Table.HeadCell>Date Modified</Table.HeadCell>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>No.of likes</Table.HeadCell>
              <Table.HeadCell>Post Id</Table.HeadCell>
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell><span className="sr-only">Delete</span></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments &&
                comments.map((comment) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={comment._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{comment.content}</Table.Cell>
                    <Table.Cell>
                      {comment.numberOfLikes}
                    </Table.Cell>
                    <Table.Cell>{comment.postId}</Table.Cell>
                    <Table.Cell>
                     {comment.userId}
                    </Table.Cell>
                    <Table.Cell className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() =>{
                      setOpenModal(true)
                      setCommentToDelete(comment._id)
                    }}>Delete</Table.Cell>
                   
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
        <p>You have no comments!!!</p>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>
               handleDeleteComment()
              }>
               {"Yes, I'm sure"}
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
