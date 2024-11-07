'use client'
import { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import Image from "next/image";
import logoImg from '@/public/logo.jpeg'

export default function Header() {
    const [active, setActive] = useState('Home');

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/">
                    <Image className={styles.logo} src={logoImg} alt="ITS Incom" priority />
                </Link>
                <div className={styles.centerLinks}>
                    <Link href="/" passHref>
                        <p
                            className={`${styles.link} ${active === 'Home' ? styles.active : ''}`}
                            onClick={() => setActive('Home')}>Home</p>
                    </Link>
                    <Link href="/prodotti" passHref>
                        <p
                            className={`${styles.link} ${active === 'Prodotti' ? styles.active : ''}`}
                            onClick={() => setActive('Prodotti')}>Prodotti</p>
                    </Link>
                    <Link href="/contatti" passHref>
                        <p
                            className={`${styles.link} ${active === 'Contatti' ? styles.active : ''}`}
                            onClick={() => setActive('Contatti')}>Contatti</p>
                    </Link>
                </div>
                <div className={styles.rightLink}>
                    <Link href="/login" passHref>
                        <p
                            className={`${styles.link} ${active === 'Login' ? styles.active : ''}`}
                            onClick={() => setActive('Login')}>Login</p>
                    </Link>
                    <div className={styles.rightLink}>
                        <Link href="/register" passHref>
                            <p
                                className={`${styles.link} ${active === 'Register' ? styles.active : ''}`}
                                onClick={() => setActive('Register')}>Registrati</p>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
