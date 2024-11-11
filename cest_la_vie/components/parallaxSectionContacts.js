'use client'
import { useEffect, useState } from "react";
import styles from "./parallaxSectionContacts.module.css";

export default function ParallaxSectionContacts() {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => setOffsetY(window.scrollY);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className={styles.background}>
            <div className={styles.maxContainer}>
                <div className={styles.container}>
                    <div className={styles.description}>
                        <h3 className={styles.informationTitle}>Per richiedere informazioni</h3>
                        <div className={styles.info}>
                            <p><strong>Email:</strong> <a href="mailto:info@pasticceriacestlavie.it">info@pasticceriacestlavie.it</a></p>
                            <p><strong>Telefono/Whatsapp:</strong> <a href="tel:+393277380932">327 7380932</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}