import React, { useState } from 'react';
import styles from '../styles/menu.module.css'; 
import Header from '../components/Header'; 
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';


export default function Demande() {

    return (
        <>
         
        <div className={styles.plan}>
            <form className={styles.mnu}>
        <div className={styles.menu}>
            <Link href="/sage">
                <img
                    src="/images/menusage.png"
                    width={300}
                    height={300}
                />
            
        </Link> </div>
        <Link href="/sap">
                <img
                    src="/images/menu.jpeg"
                    width={300}
                    height={300}
                />
        </Link>
         
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
         </div></form>
        </div>
        </>
    )}