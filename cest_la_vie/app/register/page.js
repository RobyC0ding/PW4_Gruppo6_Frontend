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

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica che almeno uno tra email e numero di telefono sia presente
        if (!formData.email && !formData.phoneNumber) {
            console.error("Devi inserire almeno una delle due informazioni: email o numero di telefono");
            return;
        }

        if(formData.email){
            if (!validateEmail(formData.email)) {
                console.error("Email non valida");
                return;
            }
        }
        
        if(formData.phoneNumber){
            if (!validatePhoneNumber(formData.phoneNumber)) {
                console.error("Numero di telefono non valido");
                return;
            }
        }
        

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log(response);

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
                <Image src={pasticceria} style={{width: "500px", height: "600px"}}></Image>
            </div>
            <div className={styles.form}>
                <h1 className={styles.formTitle}>Compila il form per registrarti e <br/> ordinare i nostri prodotti
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="surname">Cognome</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
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
                            name="phoneNumber"
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
                            required
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
                                required
                            />
                            <span className={styles.checkmark}></span>
                            <span className={styles.textButton}>Accetto la Privacy Policy</span>
                        </label>
                    </div>

                    <button type="submit" className={styles.submitButton}>Registrati</button>
                </form>
            </div>

            <Footer/>
        </>
    );
}
