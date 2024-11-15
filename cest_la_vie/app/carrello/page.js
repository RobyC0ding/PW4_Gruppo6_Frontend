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
    const [utente, setUtente] = useState("");

    useEffect(() => {
        const fetchUser= async () => {
            try {
                const response = await fetch("http://localhost:8080/user/fromSession",{
                    credentials:'include',
                });
                const data = await response.json();
                setUtente(data)
            } catch (error) {
                console.error("Errore durante dell'utente", error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setProdotti(cartItems);
    }, []);

    useEffect(() => {
        const generateAvailableDates = () => {
            const dates = [];
            const today = new Date();
            for (let i = 0; i < 30; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                dates.push(date.toISOString().split("T")[0]); // Formatta come YYYY-MM-DD
            }
            setDate(dates);
            setSelectedDate(dates[0]); // Imposta la data selezionata come la prima disponibile
        };

        generateAvailableDates();
    }, []);

    useEffect(() => {
        const generateAvailableTimes = () => {
            const times = [];
            const startHour = 9; // Orario di apertura
            const endHour = 19; // Orario di chiusura
            for (let hour = startHour; hour <= endHour; hour++) {
                times.push(`${hour.toString().padStart(2, '0')}:00`); // Formatta come HH:MM
            }
            setOre(times);
            setSelectedTime(times[0]); // Imposta l'orario selezionato come il primo disponibile
        };

        generateAvailableTimes();
    }, []);

    const handleOrder = async () => {
        console.log("CI SIAMO");
        const orderData = {
            user_id: utente,
            products: prodotti,
            pickup_date: selectedDate + "T"+ selectedTime+":00.000Z",
            pickup_time: selectedTime,
            creation_date: new Date().toISOString(),
            status: "pending",
            comments: [],
        };
        console.log(orderData);

        try {
            debugger
            const response = await fetch("http://localhost:8080/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
                credentials:'include',
            });

            if (response.ok) {
                console.log("molto bene");
                alert("Ordine effettuato con successo!");
                localStorage.removeItem("cart");
                setProdotti([]);
            } else {
                console.log("male");
                console.error(`Errore nell'invio dell'ordine: ${response.status}`);
            }
        } catch (error) {
            console.error("Errore durante l'invio dell'ordine:", error);
        }
    };

    //prendi lolcal store cart
    //prendi dalla sessione l'id utente
    //prendi dagli input pickpu_time, pickup_date
    //prendi la giornata di oggi creation_date   ISTANT(2024-11-15T15:00:00Z) poichè Mongodb

    //crei oggetto complesso
    /*
    
    const data={
  "user_id": 12345, //prendi dalla sessione l'id utente
  "products": //prendi lolcal store cart,
  "pickup_date": "2024-11-15T15:00:00Z",
  "pickup_time": "15:55",
  "creation_date": Date.now(),
  "status": "pending",
  "comments": [
  ]
}

    */

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

                    <Link onClick={handleOrder} href="/dashboard-utente" passHref>
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
