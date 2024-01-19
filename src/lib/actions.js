"use server"

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import connectToDatabase from "./utils";
import bcrypt from "bcryptjs"
import { login1, signIn, signOut } from "./auth";
import { redirect } from "next/dist/server/api-utils";
import LoginPage from "@/app/(auth)/login/page";

export const addPost = async(prevState,formdata)=>{
    const {title, desc, slug, userId} = Object.fromEntries(formdata);
    
    try {
        
        connectToDatabase();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
        })

        await newPost.save();
        console.log("saved to database");
        revalidatePath("/blog")
        revalidatePath("/admin")

    } catch (error) {
        console.log("falied to add post to database");
        console.log(error)
        return { error: "Something went wrong!" };
    }

}


export const deletePost = async(formdata)=>{

    const {id} = Object.fromEntries(formdata);

    try {
        connectToDatabase();
        await Post.findByIdAndDelete(id);
        console.log("post deleted");
        revalidatePath("/blog")
        revalidatePath("/admin")

    } catch (error) {
        console.log("falied to delete post from database");
        console.log(error)
        return { error: "Something went wrong!" };
    }
}


export const addUser = async(prevState,formdata) =>{

    const {username, email, password, img} = Object.fromEntries(formdata);

    try {
        connectToDatabase()
        const newUser = new User({
            username,
            email,
            password,
            img
        })

        await newUser.save();
        console.log('user added');
        revalidatePath("/admin")

    } catch (error) {
        console.log("falied to add user to database");
        console.log(error)
        return { error: "Something went wrong!" };
    }

}

export const deleteUser = async(formdata)=>{

    const {id} = Object.fromEntries(formdata);

    try {
        connectToDatabase();
        await User.findByIdAndDelete(id);
        console.log("user deleted");
        revalidatePath("/admin")

    } catch (error) {
        console.log("falied to delete user from database");
        console.log(error)
        return { error: "Something went wrong!" };
    }
}

export const register = async(previousState,formData) => {

    const{ username, email, password, img, passwordRepeat } =  Object.fromEntries(formData);

    if(password !== passwordRepeat){
        return { error: "Passwords do not match" };
    }
    try {
        connectToDatabase();
        const user = await User.findOne({ username });
        if(user)
        {
            return {error : "user already exists"}
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save();
        console.log("user registered");
        return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
}

export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
        const credentials = {
            username,
            password
        }
      await login1(credentials);
    } catch (err) {
      console.log(err);
  
      if (err.message.includes("CredentialsSignin")) {
        return { error: "Invalid username or password" };
      }
      throw err;
    }
  };

export const handleLogout = async () => {
    "use server";
    await signOut();
  };