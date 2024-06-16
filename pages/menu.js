import React, { useState } from 'react';
import styles from '../styles/menu.module.css'; 
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function Demande() {

    return (
        <>
            <Head>
                <title>MENU</title>
            </Head>
            <div className={styles.background}>
            <div className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#0000F5"><path d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"/></svg>
           </div>
            <div className={styles.plan}>
            <form className={styles.mnu}>
            <div className={styles.menuContainer}>
            <div className={styles.menu}>
            <Link href="/sap">
                <img
                    src="/images/menu.jpeg"
                    width={300}
                    height={300}
                />
        </Link>
        </div>
        <div className={styles.menu}>
            <Link href="/sage">
                <img
                    src="/images/menusage.png"
                    width={300}
                    height={300}
                />
            
        </Link> </div>
         </div>
         <div className={styles.menuContainer}>
            <div className={styles.menu}>
            <Link href="/">
                <img
                    src="/images/accmenu.png"
                    width={300}
                    height={300}
                />
        </Link>
        </div>
        <div className={styles.menu}>
            <Link href="/liste">
                <img
                    src="/images/liste.png"
                    width={300}
                    height={300}
                />
            
        </Link> </div>
         </div>
         </form>
         </div></div>
            </>
            )


}