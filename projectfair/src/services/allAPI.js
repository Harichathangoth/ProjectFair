


import { BASE_URL } from "./baseurl";
import { commonAPI } from "./commonAPI"

// register

export const registerAPI = async (user) => {
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"");
} 

//Login

export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

//add projects

export const addproject = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/projects/add`,reqBody,reqHeader)
}

// get home projects

export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/projects/homeprojects`,"","")
}

//get AllProjects

export const allProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchKey}`,"",reqHeader)
}

//User projects

export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/allprojects`,"",reqHeader)
}

//Edit Projects

export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/projects/edit/${projectId}`,reqBody,reqHeader)
}

//Delete project

export const deleteProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/projects/remove/${projectId}`,{},reqHeader)
}