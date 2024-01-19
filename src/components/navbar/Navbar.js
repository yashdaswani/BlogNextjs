"use server";

import Link from "next/link"
import styles from "./navbar.module.css"
import Links from "./Links/Link"
import { auth } from "@/lib/auth";

const Navbar = async() => {

  const session = await auth();

  return (
    <div className={styles.container}>
       <Link href="/" className={styles.logo}>Y_Blog</Link>
       <div>
        <Links session = {session}/>
      </div>

    </div>
  )
}

export default Navbar
