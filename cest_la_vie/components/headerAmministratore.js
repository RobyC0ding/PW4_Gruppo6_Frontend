'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './headerLoginUtente.module.css';
import Image from 'next/image';
import logoImg from '@/public/logo.jpeg';

export default function HeaderLoginUtente() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Richiesta di logout al backend
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                credentials: 'include',  // Include il cookie della sessione
            });

            if (response.ok) {
                // Elimina manualmente il cookie dal client
                document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

                // Redirige alla pagina di login
                router.push('/login');
            } else {
                throw new Error('Errore nel logout');
            }
        } catch (error) {
            console.error('Errore nel logout:', error);
        }
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/gestione-ordini">
                    <Image className={styles.logo} src={logoImg} alt="C'est la Vie" priority />
                </Link>
                <div className={styles.centerLinks}>
                    <Link href="/gestione-utenti" passHref>
                        <p
                            className={`${styles.link} ${pathname === '/gestione-utenti' ? styles.active : ''}`}
                        >Gestione utenti</p>
                    </Link>
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
                    <p
                        className={styles.link}
                        onClick={handleLogout}
                    >
                        Logout
                    </p>
                </div>
            </nav>
        </header>
    );
}
