"use client"
import {useState} from "react";
import Header from "@/components/header";
import styles from "@/app/register/page.module.css";
import Footer from "@/components/footer";
import pasticceria from "@/public/pasticceria.jpg";
import Image from "next/image";

export default function Register() {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        password: '',
        privacy: false
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("localhost:8080/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {

                console.log("Registrazione avvenuta con successo");
            } else {

                console.error("Errore durante la registrazione");
            }
        } catch (error) {

            console.error("Errore di rete", error);
        }
    };

    return (
        <>
            <Header/>
            <div className={styles.formContainer}>
                <Image src={pasticceria} style={{width:"500px",height:"600px"}}></Image>
            </div>
            <div className={styles.form}>
                <h1 className={styles.formTitle}>Compila il form per registrarti e <br/> ordinare i nostri prodotti
                </h1>

                <form className={styles.formRecord} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="firstName"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="surname">Cognome</label>
                        <input
                            type="text"
                            id="surname"
                            name="lastName"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Numero di Telefono</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="privacyPolicy" className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                id="privacyPolicy"
                                name="privacy"
                                checked={formData.privacy}
                                onChange={handleChange}
                                className={styles.checkboxInput}
                            />
                            Accetto la Privacy Policy
                        </label>
                    </div>

                    <button type="submit" className={styles.submitButton}>Registrati</button>
                </form>
            </div>

            <Footer/>
        </>
    );
}
