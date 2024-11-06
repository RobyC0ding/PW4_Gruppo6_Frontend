import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3 className={styles.heading}> <span>Sede e contatti</span></h3>
                    <p>Via Carlo Croce, 4 - 21100 Varese (VA)</p>
                    <p>Via Giuseppe Garibaldi, 5 - 21100 Varese (VA)</p>
                    <p>+39 327 7380932</p>
                    <p>pasticceriacestlavie@gmail.com</p>
                </div>
                <div className={styles.section}>
                    <h3 className={styles.heading}>Orari boutique</h3>
                    <div className={styles.scheduleRow}>
                        <p>Lunedì:</p> <p>Chiuso</p>
                    </div>
                    <div className={styles.scheduleRow}>
                        <p>Mar - Ven:</p> <p>8:30 - 19:00</p>
                    </div>
                    <div className={styles.scheduleRow}>
                        <p>Sabato:</p> <p>9:00 - 19:00</p>
                    </div>
                    <div className={styles.scheduleRow}>
                        <p>Domenica:</p> <p>9:00 - 13:00, 15:00 - 19:00</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.heading}>Orari laboratorio</h3>
                    <div className={styles.scheduleRow}>
                        <p>Lunedì:</p> <p>Chiuso</p>
                    </div>
                    <div className={styles.scheduleRow}>
                        <p>Mar - Sab:</p> <p>7:30 - 13:00, 14:30 - 16:00</p>
                    </div>
                    <div className={styles.scheduleRow}>
                        <p>Domenica:</p> <p>8:00 - 12:30</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}