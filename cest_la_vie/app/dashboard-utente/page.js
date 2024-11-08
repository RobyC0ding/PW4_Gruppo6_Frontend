"use client"

import styles from '@/app/dashboard-utente/page.module.css';
import HeaderLoginUtente from "@/components/headerLoginUtente";
import Footer from "@/components/footer";
import {useEffect, useState} from "react";

export default function DashboardUtente() {
    const [order, setOrder] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/orders')
            .then((response) => response.json())
            .then((data) => setOrder(data))
            .catch((error) => console.error('Errore nel fetch degli ordini:', error));


        fetch('http://localhost:8080/orderStatus')
            .then((response) => response.json())
            .then((data) => setOrderStatus(data))
            .catch((error) => console.error('Errore nel fetch dello stato ordine:', error));


        fetch('http://localhost:8080/orderList')
            .then((response) => response.json())
            .then((data) => setOrderList(data))
            .catch((error) => console.error('Errore nel fetch dello storico ordini:', error));
    }, []);

    return (
        <>
            <HeaderLoginUtente/>
            <div className={styles.welcomeUser}>
                <h1>Benvenuto Roberto</h1>
                <p>roberto.zuccaro@itsincom.it</p>
            </div>
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardSection}>
                    <h2>Ordini effettuati</h2>
                    <p>Visualizza gli ordini effettuati</p>
                    <div>
                        {order.length > 0 ? (
                            order.map((order, index) => (
                                <div key={index}>
                                    <p>Ordine ID: {order.id}</p>
                                    <p>Data: {order.data}</p>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine trovato</p>
                        )}
                    </div>
                </div>

                <div className={styles.dashboardSection}>
                    <h2>Stato del tuo ordine</h2>
                    <p>Visualizza lo stato del tuo ordine</p>
                    {orderStatus ? (
                        <p>{orderStatus.status}</p>
                    ) : (
                        <p>Nessuno stato disponibile</p>
                    )}
                </div>

                <div className={styles.dashboardSection}>
                    <h2>Storico degli ordini</h2>
                    <p>Visualizza i tuoi ordini precedenti</p>
                    <div>
                        {orderList.length > 0 ? (
                            orderList.map((ordine, index) => (
                                <div key={index}>
                                    <p>Ordine ID: {ordine.id}</p>
                                    <p>Data: {ordine.data}</p>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine storico trovato</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}