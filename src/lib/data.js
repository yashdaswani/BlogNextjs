import { Post, User } from "./models";
import connectToDatabase from "./utils"
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async()=>{
   
    try {
        connectToDatabase();
        const posts = await Post.find();
        return posts;
    
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts");
    }

}


export const getPost = async(slug)=>{
    try {
        connectToDatabase();
        const post = await Post.findOne({slug})
        console.log(post)
        return post
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch post");
    }
}


export const getUser = async(id)=>{
    noStore();
    try {
        connectToDatabase();
        const user = await User.findById(id);
        return user
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user");
    }
}


export const getUsers = async()=>{
    try {
        connectToDatabase();
        const users = User.find();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
    }
}