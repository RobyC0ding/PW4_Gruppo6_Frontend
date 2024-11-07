'use client'
import styles from "./parallaxSectionContacts.module.css";

export default function ParallaxSectionContacts() {
    return (
        <div className={styles.informationContainer}>
<<<<<<< HEAD
            <div className={styles.backgroundImage} whigth={305} higth={121}></div>
=======
            <div className={styles.backgroundImage}></div> {/* Background gestito via CSS */}
>>>>>>> 8d81a31522ee48d123fa8a2df5d65b1dd0a7aadf
            <h3 className={styles.informationTitle}>Per richiedere informazioni</h3>
            <p>
                <strong>Email:</strong> <a href="mailto:info@pasticceriacestlavie.it">info@pasticceriacestlavie.it</a><br /><br />
                <strong>Telefono/Whatsapp:</strong> <a href="tel:+393277380932">327 7380932</a>
            </p>
        </div>
    );
}
