import React, { useState } from 'react';
import styles from '../styles/menuAD.module.css'; 
import Header from '../components/Header'; 
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function Demande() {

    return (
        <>
          <Head>
                <title>MENU</title>
            </Head>
            <div className={styles.icon}>
        
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#0000F5"><path d="M679-466 466-679l213-213 213 213-213 213Zm-559-72v-301h301v301H120Zm418 418v-301h301v301H538Zm-418 0v-301h301v301H120Zm60-478h181v-181H180v181Zm502 51 129-129-129-129-129 129 129 129Zm-84 367h181v-181H598v181Zm-418 0h181v-181H180v181Zm181-418Zm192-78ZM361-361Zm237 0Z"/></svg>
            
           <div className={styles.leftAlign}>
           <Link href="/nvcmpte">
           <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#0000F5"><path d="M530-410v-120H410v-60h120v-120h60v120h120v60H590v120h-60ZM140-80q-24 0-42-18t-18-42v-508q0-24 18-42t42-18h112v-112q0-24 18-42t42-18h508q24 0 42 18t18 42v508q0 24-18 42t-42 18H708v112q0 24-18 42t-42 18H140Zm172-232h508v-508H312v508Z"/></svg>
                  </Link>
          </div>
          
           </div>
            <div className={styles.plan}>
            <form className={styles.mnu}>
            <div className={styles.menuContainer}>
            <div className={styles.menu}>
            <Link href="/nvsap">
                <img
                    src="/images/menu.jpeg"
                    width={300}
                    height={300}
                />
        </Link>
        </div>
        <div className={styles.menu}>
            <Link href="/nvuser">
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
            <Link href="/listAD">
                <img
                    src="/images/liste.png"
                    width={300}
                    height={300}
                />
            
        </Link> </div>
         </div>
         </form>
         </div>
        





        </>
    ) 
}