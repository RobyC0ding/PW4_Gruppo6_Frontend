"use client"

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import styles from '@/app/login/page.module.css';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import cake from "@/public/cake.jpg";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

        if (!formData.phoneNumber || !formData.password) {
            setError("Tutti i campi sono obbligatori");
            return;
        }

        const type = validateEmailOrPhone(formData.phoneNumber);
        if (!type) {
            setError("Inserisci un'email valida o un numero di telefono");
            return;
        }

        setLoading(true);
        try {
            const bodyContent = type === 'email'
                ? JSON.stringify({
                    password: formData.password,
                    email: formData.phoneNumber
                })
                : JSON.stringify({
                    password: formData.password,
                    phone_number: formData.phoneNumber
                });

            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyContent,
                credentials: "include"
            });

            const responseText = await response.text(); // Usa text() per leggere la risposta come stringa
            console.log('Server response:', responseText);

            if (!response.ok) {
                throw new Error(responseText || 'Errore nel login');
            }

            // Verifica del ruolo utente
            const roleResponse = await fetch('http://localhost:8080/user/role', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include"
            });

            const roleData = await roleResponse.text(); // Usa text() per leggere la risposta come stringa
            console.log('Role response:', roleData);

            // Verifica del ruolo dell'utente
            if (roleData.includes('Admin')) {
                console.log('Redirecting to magazzino...');
                await router.push('/magazzino');
            } else if (roleData.includes('Client') || roleData.includes('cliente') || roleData.includes('customer')) {
                console.log('Redirecting to home-utente...');
                await router.push('/home-utente');
            } else {
                console.log('Response text:', responseText);
                setError('Tipo utente non riconosciuto');
            }

        } catch (error) {
            console.error('Login error:', error);
            // Gestione degli errori
            setError('Login fallito, riprova.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <Header/>
            <div className={styles.container}>
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
                    <Image src={cake} style={{width: "500px", height: "600px"}}/>
                </div>
            </div>
            <Footer/>
        </>
    );
}