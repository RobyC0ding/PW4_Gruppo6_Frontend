import Image from 'next/image';
import styles from '@/components/aboutUs.module.css';

export default function AboutSection() {
  return (
    <section className={styles.container}>
      <div className={styles.textSection}>
        <h2 className={styles.h2}>Pasticceria C'est la Vie a Varese</h2>
        <p className={styles.p}>
          Mi chiamo Giacomo Aceti e sono il titolare di C’est la Vie. La mia pasticceria nasce nel 2015 come
          laboratorio artigianale in via Garibaldi, 5 a Varese e nel 2020 apro un punto vendita espositivo
          per la vendita diretta in Via Carlo Croce, 4.
        </p>
        <p className={styles.p}>
          Nel laboratorio produciamo tutti i prodotti messi a disposizione del pubblico nella boutique, con
          una continua ricerca di materie prime di alta qualità e una lavorazione che unisce tradizione e
          innovazione.
        </p>
        <p className={styles.p}>
          Il mio è un giovanissimo team che guido con entusiasmo e passione. Una passione che porto
          avanti da 16 anni, iniziata con un percorso nella scuola alberghiera di Stresa e concluso con il
          corso superiore di pasticceria di Alma.
        </p>
        <p className={styles.p}>
          Accanto a me, uno staff giovane e preparato. Formo personalmente il mio team trasmettendo
          valori per me fondamentali in questo lavoro: <strong>Divertimento, Passione, Ricercatezza, Innovazione</strong>
          e <strong>Attenzione al dettaglio</strong>.
        </p>
        <p className={styles.p}>
          C’est la Vie è un luogo capace di sorprendere per l’amore trasmesso attraverso l’arte della
          pasticceria, ma anche per l’accoglienza informale: “Ci piace coinvolgere il cliente e trasmettere la
          nostra passione”. A fare la differenza è anche la location di Via Carlo Croce. Già dall’esterno è
          possibile ammirare una grande vetrata da cui poter apprezzare i nostri deliziosi prodotti. Una
          location elegante e raffinata. Una volta entrati vi perderete in meravigliosi profumi e colori capaci
          di sorprendere ed incuriosire.
        </p>
        <button className={styles.callButton}>Chiamaci</button>
      </div>
      <div className={styles.imageSection}>
        <Image
          src="/giacomoAceti.jpeg" // Assicurati che questa immagine sia nella cartella "public/images"
          alt="Giacomo Aceti"
          width={400} // Regola le dimensioni in base alle tue necessità
          height={500}
          className={styles.image}
        />
      </div>
    </section>
  );
}
