"use client";
import {useState, useEffect} from "react";
import styles from "@/app/carrello/page.module.css";
import HeaderLoginUtente from "@/components/headerLoginUtente";
import Footer from "@/components/footer";
import Link from "next/link";

const Carrello = () => {
    const [prodotti, setProdotti] = useState([]);
    const [date, setDate] = useState([]);
    const [ore, setOre] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/prodotti");
                const data = await response.json();
                setProdotti(data)
            } catch (error) {
                console.error("Errore durante il caricamento dei prodotti:", error);
            }
        };

        fetchProducts();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Recupera le date disponibili
                const dateResponse = await fetch("http://localhost:8080/api/ritiro/dates");
                const dateData = await dateResponse.json();
                setDate(dateData);

                // Recupera le ore disponibili per la prima data
                if (dateData.length > 0) {
                    const timeResponse = await fetch(
                        `http://localhost:8080/api/ritiro/times?date=${dateData[0]}`
                    );
                    const timeData = await timeResponse.json();
                    setOre(timeData);
                    setSelectedDate(dateData[0]);
                }
            } catch (error) {
                console.error("Errore durante il caricamento dei dati:", error);
            }
        };

        fetchData();
    }, []);


    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);


        try {
            const timeResponse = await fetch(
                `http://localhost:8080/api/ritiro/times?date=${selectedDate}`
            );
            const timeData = await timeResponse.json();
            setOre(timeData);
        } catch (error) {
            console.error("Errore durante il caricamento delle ore:", error);
        }
    };


    return (
        <>
            <HeaderLoginUtente/>
            <div className={styles.containerPage}>
                <div className={styles.checkout}>
                    <h1>Il tuo carrello</h1>
                    <ul>
                        {prodotti.map((product) => (
                            <ul key={product.id}>
                                <h3>{product.name}</h3>
                                <p>Descrizione: {product.description}</p>
                                <p>Quantità: {product.quantity}</p>
                                <p>Prezzo: €{product.price}</p>
                            </ul>
                        ))}
                    </ul>
                </div>

                <div className={styles.formContainer}>
                    <h2>Seleziona data e ora per <br></br> il ritiro in pasticceria</h2>
                    <form>
                        <label htmlFor="dataRitiro">Data del ritiro: </label>
                        <select
                            className={styles.oraEdataRitiro}
                            id="dataRitiro"
                            required
                            value={selectedDate}
                            onChange={handleDateChange}
                        >
                            {date.map((data) => (
                                <option key={data} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>
                        <br/>
                        <br/>
                        <br/>

                        <label htmlFor="oraRitiro">Ora del ritiro: </label>
                        <select
                            className={styles.oraEdataRitiro}
                            id="oraRitiro"
                            required
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            {ore.map((ora) => (
                                <option key={ora} value={ora}>
                                    {ora}
                                </option>
                            ))}
                        </select>
                    </form>

                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <Link href="/dashboard-utente" passHref>
                        <div className={styles.buttonOrder}>
                            <p>Clicca qui per ordinare</p>
                        </div>
                    </Link>
                </div>
            </div>

            <Footer/>
        </>
    );
};

export default Carrello;
