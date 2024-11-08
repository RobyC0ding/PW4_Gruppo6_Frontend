'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './headerLoginUtente.module.css';
import Image from 'next/image';
import logoImg from '@/public/logo.jpeg';


export default function HeaderLoginUtente() {
    const pathname = usePathname();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/">
                    <Image className={styles.logo} src={logoImg} alt="C'est la Vie" priority />
                </Link>
                <div className={styles.centerLinks}>
                    <Link href="/" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
                        >Home</p>
                    </Link>
                    <Link href="/prodotti" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/prodotti' ? styles.active : ''}`}
                        >Prodotti</p>
                    </Link>
                    <Link href="/dashboard" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/dashboard-utente' ? styles.active : ''}`}
                        >Dashboard</p>
                    </Link>
                    <Link href="/contatti" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/contatti' ? styles.active : ''}`}
                        >Contatti</p>
                    </Link>
                </div>
                <div className={styles.rightLink}>
                    <Link href="/" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/logout' ? styles.active : ''}`}
                        >Logout</p>
                    </Link>
                    <Link href='/dashboard' passHref>
                        <img width="25" height="25" src="https://img.icons8.com/pastel-glyph/100/shopping-cart--v1.png" alt="shopping-cart--v1" />
                    </Link>
                </div>



            </nav>
        </header>
    );
}
