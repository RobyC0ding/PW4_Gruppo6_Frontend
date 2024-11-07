"use client";
import {useState} from 'react';
import styles from '@/app/login/page.module.css';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import cake from "@/public/cake.jpg"

export default function LoginForm() {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = ({target: {name, value}}) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateEmailOrPhone = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (emailRegex.test(input)) {
            return 'email';
        }
        if (phoneRegex.test(input)) {
            return 'phoneNumber';
        }
        return null;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( !formData.phoneNumber || !formData.password) {
            setError("Tutti i campi sono obbligatori");
            return;
        }


        const type = validateEmailOrPhone(formData.phoneNumber);
        if (!type) {
            setError("Inserisci un'email valida o un numero di telefono");
            return;
        }


        console.log("Dati inviati al backend:", {
            password: formData.password,
            type: formData.phoneNumber
        });

        setLoading(true);
        try {
            const bodyContent = type === 'email'
                ? JSON.stringify({
                    password: formData.password,
                    email: formData.phoneNumber
                } )
                : JSON.stringify({
                    password: formData.password,
                    phone_number: formData.phoneNumber
                });
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: bodyContent
            });


            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Errore nella connessione con l’API');
            }

            const contentType = response.headers.get('content-type');
            let data;
            console.log('content-type', contentType);
            data = await response.text();
            console.log('Login riuscito:', data);


        } catch (error) {
            console.error('Errore nel login:', error);
            setError("Login fallito, riprova.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header/>
            <div className={styles.formContainerLogin}>
                <h2 className={styles.formTitle}>Effettua il login<br></br>per ordinare i nostri prodotti</h2>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Email o Numero di Telefono:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButtonLogin} disabled={loading}>
                        {loading ? 'Caricamento...' : 'Login'}
                    </button>
                </form>
            </div>
            <div className={styles.imageContainer}>
                <Image src={cake} style={{width: "500px", height: "600px"}}></Image>
            </div>

            <Footer/>
        </>
    );
}
