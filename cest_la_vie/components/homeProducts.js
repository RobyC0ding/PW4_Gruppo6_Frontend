import Image from 'next/image';
import styles from '@/components/homeProducts.module.css';

export default function homeProducts() {
    return (
        <div className={styles.container}>
            <section className={styles.mSection}>
                <div className={styles.text}>
                    <h2 className={styles.h2}>Macarons</h2>
                    <p className={styles.mdescription}>
                        Macarons: un'esplosione di sapore racchiusa tra due gusci morbidi e un cremoso ripieno. Dolcetti piccoli, rotondi e coloratissimi. Semplicemente deliziosi! Impossibile non innamorarsi a prima vista di questi dolci unici nel loro genere che ti travolgeranno con il loro sapore. Da C'est La Vie abbiamo sempre disponibili una grande varietà di gusti differenti tra cui scegliere. Sono inoltre l'idea perfetta per un regalo elegante e raffinato.
                    </p>
                </div>
            </section>
            <sezioni className={styles.sezioni}>
                <section className={styles.cSection}>
                    <div className={styles.text}>
                        <h2 className={styles.h2}>Confetture e Marmellate</h2>
                        <p className={styles.cDescription}>
                            Nella nostra bellissima Boutique troverete ad aspettarvi anche le buonissime marmellate e confetture homemade.<br />
                            Dai gusti audaci, le nostre marmellate sono uniche e irresistibili, ma soprattutto buone!<br />
                            Prodotte esclusivamente in modo artigianale e con ingredienti di prima scelta sono ideali per una sana colazione o per una deliziosa merenda.<br />
                            Le trovate di vari gusti: arancia rossa e castagna, albicocca e camomilla, fragola e fava tonka, pesca e lavanda, pompelmo e pepe rosa e tanti altri! Le varianti sono molte e cambiano anche in base alla stagionalità!<br />
                            Queste deliziose confetture sono anche perfette come cadeau o come bomboniera per il vostro evento!
                        </p>
                    </div>
                    <div className={styles.cImageWrapper}>
                        <Image src="/confetture.jpeg" alt="Confetture e Marmellate" width={1067} height={1600} layout='responsive'/>
                    </div>
                </section>

                <section className={styles.bSection}>
                    <div className={styles.text}>
                        <h2 className={styles.h2}>Biscotti</h2>
                        <p className={styles.bDescription}>
                            La pasticceria C'est La Vie propone deliziosi biscotti artigianali. I nostri biscotti non sono ovviamente semplici biscotti ma piccoli capolavori di pasticceria pensati per accompagnare con gusto ogni momento della giornata: dalla colazione al tè del pomeriggio, dalla pausa mattutina alla coccola della sera.
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <Image src="/biscotti.jpeg" alt="Biscotti" width={300} height={200}/>
                    </div>
                </section>


            </sezioni>
        </div>
    );
}
