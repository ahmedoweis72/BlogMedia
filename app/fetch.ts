import { NextResponse } from "next/server";

const api:string=`http://localhost:3000/api/posts`;

export const getAllPosts=async()=>{
  try {
    const response=await fetch(api);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data=response.json();
    const json = await NextResponse.json({data});
    console.log(json);
    return json;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
}
