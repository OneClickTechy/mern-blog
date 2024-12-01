import { useGetUserQuery } from "../app/service/userApiSlice"
import {Navigate, Outlet} from "react-router-dom"
import LoadingPage from "./LoadingPage";
export default function PrivateRoutes() {
    
    const {isSuccess, isError, isLoading, data, error} = useGetUserQuery();
    
    if(isLoading){
        return <LoadingPage />
    }
    if(isSuccess){
        return <Outlet />
    }
    if(isError){
        return <Navigate to='/sign-in'/>
    }
  
}
