import Image from "next/image";
import styles from "./singlePage.module.css";
import PostUser from "@/components/postUser/PostUser";
import { getPost } from "@/lib/data";


const getData = async(slug)=>{

  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)
  if(!res.ok)
    throw new Error("Something went wrong");

  return res.json();

};


export const generateMetadata = async ({ params }) => {
  const { slug } = params;

  const post = await getData(slug);

  return {
    title: post.title,
    description: post.desc,
  };
};


const Singlepage = async({params}) => {

  const {slug} = params
  const post = await getPost(slug)
  console.log(post)
  return (
    <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image src="https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" fill className={styles.img} />
        </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <PostUser userId={post.userId} />
        <div className={styles.detail}>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
            {post.createdAt.toString().slice(4, 16)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post.desc}</div>
      </div>
    </div>
  )
}

export default Singlepage
