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
                <Link href="/gestione-ordini">
                    <Image className={styles.logo} src={logoImg} alt="C'est la Vie" priority />
                </Link>
                <div className={styles.centerLinks}>
                    <Link href="/gestione-ordini" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/gestione-ordini' ? styles.active : ''}`}
                        >Gestione ordini</p>
                    </Link>
                    <Link href="/magazzino" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/magazzino' ? styles.active : ''}`}
                        >Magazzino</p>
                    </Link>
                </div>
                <div className={styles.rightLink}>
                    <Link href="/" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/logout' ? styles.active : ''}`}
                        >Logout</p>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
