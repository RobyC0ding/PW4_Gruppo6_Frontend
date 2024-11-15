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
                console.log("daje");
                const response = await fetch("http://localhost:8080/user/all",{
                    method:'GET',
                    credentials:'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setUtenti(data)
            } catch (error) {
                console.log("non daje");
                console.log("Errore durante il caricamento degli utenti")
            }
        };
        fetchUser();
    }, []);

    const handleVerify = async (phoneNumber) => {
        try {
            const response = await fetch("http://localhost:8080/user/adminVerify", {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_number: phoneNumber }),
            });

            if (response.ok) {
                alert("Utente verificato con successo!");
                // Puoi aggiornare lo stato per riflettere la modifica
                setUtenti(utenti.map(user => 
                    user.phoneNumber === phoneNumber ? { ...user, verified: true } : user
                ));
            } else {
                const errorData = await response.json();
                alert("Errore: " + errorData.message);
            }
        } catch (error) {
            console.log("Errore durante la verifica dell'utente", error);
        }
    };

    return (
        <body>
            <HeaderAmministratore />
            <div className={styles.container}>
                <h1 className={styles.title}>Lista utenti registrati da telefono</h1>
                <ul>
                    {utenti.map((user) => (
                        <ul key={user.phoneNumber} className={styles.list}>
                            <p>Numero di telefono: {user.phoneNumber}</p>
                            <p>Stato di verifica: {user.verified ? "Verificato" : "Non verificato"}</p>
                            <button onClick={() => handleVerify(user.phoneNumber)}>Verifica</button>
                        </ul>
                    ))}
                </ul>
            </div>
            <Footer />
        </body>
    );
};

export default Utente;
