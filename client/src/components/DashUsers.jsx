import  { useState } from "react";
import { useEffect } from "react";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDeleteUserMutation, useGetUsersQuery } from "../app/service/userApiSlice";
import {FaCheck, FaTimes} from "react-icons/fa"
import LoadingPage from "./LoadingPage";

export default function DashUsers({ user }) {
  const [startIndex, setStartIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery(
    {startIndex,
    limit:9,
    sort:"desc",
    }
  );
  const [deleteUser]= useDeleteUserMutation()
  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const handleShowMore = async () => {
    const newStartIndex = startIndex + 9;
    setStartIndex(startIndex + 9);
    await refetch({startIndex:newStartIndex, limit:9, sort:"desc"});
  };
  const canShowMore = Boolean(users?.length < data?.totalUsers);
  useEffect(() => {
    if (data?.users?.length) {
      const newUsers = data.users.filter((user) =>
        users.length ? !users.some((u) => u._id === user._id) : true
      );
      setUsers((prev) => [...prev, ...newUsers]);
    }
  }, [data]);
  const handleDeleteUser = async () => {
    setOpenModal(false);
    await deleteUser(userToDelete);
    setUsers(users.filter((user) => user._id !== userToDelete));
  }
  if(isLoading){
    return <LoadingPage content="Loading users, please wait..." />
  }
  if(isError){
    return <div>Error: {error?.data?.message}</div>
  }
  return (
    <div className="table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {user?.isAdmin && users.length>0 ? (
        <>
          <Table className="overflow-x-scroll" hoverable>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell><span className="sr-only">Delete</span></Table.HeadCell>

            </Table.Head>
            <Table.Body className="divide-y">
              {users &&
                users.map((user) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={user._id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>
                      
                      <img
                        src={user.profilePicture}
                        className="w-12 aspect-square object-cover bg-gray-500 rounded-full "
                        alt={user.username}
                      />
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                    ):
                    (
                        <FaTimes className="text-red-500" />
                    )}
                    </Table.Cell>
                    <Table.Cell className="font-medium text-red-500 hover:underline cursor-pointer" onClick={() =>{
                      setOpenModal(true)
                      setUserToDelete(user._id)
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
        <p>You have no user!!!</p>
      )}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header />
          <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={()=>
               handleDeleteUser()
              }>
               Yes, I&apos;m sure
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
