'use client'
import {useEffect, useState} from "react";
import styles from "./parallaxSectionContacts.module.css";

export default function ParallaxSectionContacts() {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => setOffsetY(window.scrollY);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className={styles.informationContainer}>
            <div className={styles.backgroundImage}></div>
            <h3 className={styles.informationTitle}>Per richiedere informazioni</h3>
            <p>
                <strong>Email:</strong> <a href="mailto:info@pasticceriacestlavie.it">info@pasticceriacestlavie.it</a><br /><br />
                <strong>Telefono/Whatsapp:</strong> <a href="tel:+393277380932">327 7380932</a>
            </p>
        </div>
    );
}
