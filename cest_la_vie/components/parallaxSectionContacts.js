'use client'
import styles from "./parallaxSectionContacts.module.css";

export default function ParallaxSectionContacts() {
    return (
        <div className={styles.informationContainer}>
            <div className={styles.backgroundImage}></div> {/* Background gestito via CSS */}
            <h3 className={styles.informationTitle}>Per richiedere informazioni</h3>
            <p>
                <strong>Email:</strong> <a href="mailto:info@pasticceriacestlavie.it">info@pasticceriacestlavie.it</a><br /><br />
                <strong>Telefono/Whatsapp:</strong> <a href="tel:+393277380932">327 7380932</a>
            </p>
        </div>
    );
}
