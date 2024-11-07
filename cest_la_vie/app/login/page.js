"use client";
import {useState} from 'react';
import styles from '@/app/login/page.module.css';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import cake from "@/public/cake.jpg"

export default function LoginForm() {
    const [formData, setFormData] = useState({
        nome: '',
        emailOrPhone: ''
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
        const phoneRegex = /^\d{10,15}$/;

        if (emailRegex.test(input)) return 'email';
        if (phoneRegex.test(input)) return 'phone';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.emailOrPhone) {
            setError("Tutti i campi sono obbligatori");
            return;
        }

        const type = validateEmailOrPhone(formData.emailOrPhone);
        if (!type) {
            setError("Inserisci un'email valida o un numero di telefono");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: formData.nome,
                    contact: formData.emailOrPhone,
                    type: type
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore nella connessione con l’API');
            }

            const data = await response.json();
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
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Email o Numero di Telefono:</label>
                        <input
                            type="text"
                            name="emailOrPhone"
                            value={formData.emailOrPhone}
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
