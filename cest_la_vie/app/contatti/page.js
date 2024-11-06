import styles from "@/app/contatti/page.module.css";
import Header from "@/components/header";
import ParallaxSection from "@/components/parallaxSection";
import Footer from "@/components/footer";


export default function Contatti() {
    return (
        <div>
            <Header/>
            <ParallaxSection/>
            <div className={styles.contactsText}>
                <h1 className={styles.contactsH1}>La nostra pasticceria artigianale ti aspetta!</h1>
                <p className={styles.contactsP}>
                    C'est la Vie è una pasticceria in stile francese con una boutique in via Carlo Croce, 4 a Varese. La
                    nostra pasticceria artigianale offre una vasta gamma di prodotti dolciari, tra cui: macarons, torte
                    tradizionali e moderne, biscotti artigianali, pasticceria mignon, confetture e marmellate. Inoltre,
                    su prenotazione, realizziamo torte personalizzabili per eventi e wedding cake.

                    È possibile prenotare i nostri prodotti direttamente sul sito e scegliere di ritirarli in negozio o
                    nel laboratorio di Via Garibaldi, 5, dove è possibile effettuare ordini e ritiri. Il laboratorio è
                    aperto dal martedì al sabato dalle 7.30 alle 13.00 e dalle 14.30 alle 17.00, e la domenica dalle
                    8.00 alle 12.30.

                </p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.callButton}>
                    📞 Chiamaci
                </button>

                <button className={styles.orderButton}>
                    🛒 Ordina Online
                </button>
            </div>

            <div className={styles.addressContainer}>
                <h2 className={styles.addressTitle}>Dove siamo?</h2>
                <p className={styles.addressText}>Ci puoi trovare a Varese (VA) in Via Carlo Croce, 4 e in Via Giuseppe
                    Garibaldi, 5 </p>
            </div>


            <div className={styles.mapContainer}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22244.818758963156!2d8.804883173403162!3d45.8192217963139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478680831df813a5%3A0x59e2eeb682bd2280!2sPasticceria%20C'est%20la%20Vie!5e0!3m2!1sit!2sit!4v1730819801292!5m2!1sit!2sit"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22244.818758963156!2d8.804883173403162!3d45.8192217963139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478681f48fadaa2f%3A0xa473c43ae645cd8d!2sC'est%20la%20Vie%20-%20Laboratorio!5e0!3m2!1sit!2sit!4v1730820080192!5m2!1sit!2sit"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <div className={styles.informationContainer}>
                <h3 className={styles.informationTitle}>Per richiedere informazioni</h3>

                <p>
                    <strong>Email:</strong> <a
                    href="mailto:info@pasticceriacestlavie.it">info@pasticceriacestlavie.it</a><br/><br/>
                    <strong>Telefono/Whatsapp:</strong> <a href="tel:+393277380932">327 7380932</a>
                </p>
            </div>


            <Footer/>
        </div>
    )
}
