'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';
import Image from 'next/image';
import logoImg from '@/public/logo.jpeg';

export default function Header() {
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
                    <Link href="/contatti" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/contatti' ? styles.active : ''}`}
                        >Contatti</p>
                    </Link>
                </div>
                <div className={styles.rightLink}>
                    <Link href="/login" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/login' ? styles.active : ''}`}
                        >Login</p>
                    </Link>
                    <Link href="/register" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/register' ? styles.active : ''}`}
                        >Registrati</p>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
