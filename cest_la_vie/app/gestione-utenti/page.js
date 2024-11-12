'use client'
import HeaderAmministratore from '@/components/headerAmministratore.js';
import Footer from '@/components/footer.js';
import styles from '@/app/gestione-utenti/page.module.css';
import { useEffect, useState } from 'react';


const Utente = () => {
    const [utenti, setUtenti] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/all");
                const data = await response.json();
                setUtenti(data)
            } catch (error) {
                console.log("Errore durante il caricamento degli utenti")
            }
        };
        fetchUser();
    }, []);



    return (
        <body>
            <HeaderAmministratore />
            <div className={styles.container}>
                <h1 className={styles.title}>Lista utenti quelli registrati da telefono</h1>
                <ul>
                    {utenti.map((user) => (
                        <ul key={user.id}>
                            <h3>{user.name}{user.surname}</h3>
                            <p>Numero di telefomo: {user.phoneNumber}</p>
                            <p>Stato di verifica: {user.state}</p>
                        </ul>
                    ))}
                </ul>
            </div>
            <Footer />
        </body>
    );
};

export default Utente;