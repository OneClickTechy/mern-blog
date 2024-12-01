import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import { useGetPostsByAdminQuery } from '../app/service/postApiSlice';
import { useGetUserQuery } from '../app/service/userApiSlice';

export default function UpdatePost() {
  const { postId } = useParams();
  console.log("postId", postId, typeof postId);
  const startIndex=0;
  const limit=9;
  const sort="desc";
  const { data, error } = useGetPostsByAdminQuery(
    {startIndex,
    limit,
    sort,
    postId
  }
  );
  console.log("startIndex", startIndex, typeof startIndex) 
  console.log(data, error)
  return (
    <div>UpdatePost</div>
  )
}
