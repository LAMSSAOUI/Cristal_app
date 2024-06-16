
import styles from '../styles/Header.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <ul className={styles.menu}>
      
      <li>
        <Link href="/demande">Demande</Link>
      </li>
      
      <li>
        <Link href="/sage">Sage</Link>
      </li>
      <li>
        <Link href="/sap">SAP</Link>
      </li>
      
    </ul>
  );
}