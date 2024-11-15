'use client';

import { useState, useEffect } from "react";
import styles from "@/app/gestione-ordini/page.module.css";

import HeaderAmministratore from '@/components/headerAmministratore';
import Footer from "@/components/footer";

export default function OrdiniPage() {
    const [orders, setOrders] = useState([]); // Lista degli ordini
    const [pendingOrders, setPendingOrders] = useState([]);
    const [accRefOrders, setAccRefOrders] = useState([]);
    const [todayOrders, setTodayOrders] = useState([]);

    // Funzione per recuperare tutti gli ordini
    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:8080/order/all", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const ordersData = await response.json();
                console.log(ordersData);

                const formattedOrders = ordersData.map(order => ({
                    id: order.id,
                    userId: order.user_id || 'N/A',
                    products: order.products || [],
                    pickupDate: order.pickup_date || 'Data non disponibile',
                    pickupTime: order.pickup_time || 'Ora non disponibile',
                    creationDate: order.creation_date || 'Data non disponibile',
                    status: order.status || 'Stato non definito',
                    comments: order.comments || [],
                }));

                setOrders(formattedOrders);
                setPendingOrders(formattedOrders.filter(order => order.status === 'pending'));
                setAccRefOrders(formattedOrders.filter(order => order.status === 'accepted' || order.status === 'refused'));

                const today = new Date().toISOString().split('T')[0];
                setTodayOrders(formattedOrders.filter(order => order.pickupDate.split('T')[0] === today));
            } else {
                throw new Error('Errore nella richiesta degli ordini');
            }
        } catch (error) {
            console.error('Errore durante il recupero degli ordini:', error);
        }
    };

    // Effettua la chiamata solo al primo render
    useEffect(() => {
        fetchOrders();
    }, []);

    // Funzione per aggiornare lo stato dell'ordine
    const handleOrderStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:8080/order/${id}/status?status=${newStatus}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                await fetchOrders(); // Richiama la funzione per aggiornare la lista ordini
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore nell\'aggiornamento dello stato dell\'ordine');
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento dello stato dell\'ordine:', error);
        }
    };

    return (
        <div>
            <HeaderAmministratore />

            <main className={styles.main}>
                <div>
                    <section className={styles.section}>
                        <h2 className={styles.title}>Ordini Pendenti</h2>
                        {pendingOrders.length > 0 ? (
                            pendingOrders.map(order => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>ID: {order.id}</p>
                                    <p>Utente: {order.userId}</p>
                                    <p>Data di Ritiro: {order.pickupDate}</p>
                                    <p>Ora di Ritiro: {order.pickupTime}</p>
                                    <div className={styles.orderStatus}>
                                        <label className={styles.p}>Stato: </label>
                                        <select
                                            className={styles.select}
                                            value={order.status}
                                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="pending">In attesa</option>
                                            <option value="accepted">Accettato</option>
                                            <option value="refused">Rifiutato</option>
                                            <option value="taken">Preso</option>
                                        </select>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine pendente.</p>
                        )}
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.title}>Ordini Accettati/Rifiutati</h2>
                        {accRefOrders.length > 0 ? (
                            accRefOrders.map(order => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>ID: {order.id}</p>
                                    <p>Utente: {order.userId}</p>
                                    <p>Data di Ritiro: {order.pickupDate}</p>
                                    <p>Ora di Ritiro: {order.pickupTime}</p>
                                    <div className={styles.orderStatus}>
                                        <label className={styles.p}>Stato: </label>
                                        <select
                                            className={styles.select}
                                            value={order.status}
                                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                                        >
                                            <option value="pending">In attesa</option>
                                            <option value="accepted">Accettato</option>
                                            <option value="refused">Rifiutato</option>
                                            <option value="taken">Preso</option>
                                        </select>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine accettato o rifiutato.</p>
                        )}
                    </section>

                    <section className={styles.section}>
                        <h2>Ordini di Oggi</h2>
                        {todayOrders.length > 0 ? (
                            todayOrders.map(order => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>ID: {order.id}</p>
                                    <p>Utente: {order.userId}</p>
                                    <p>Data di Ritiro: {order.pickupDate}</p>
                                    <p>Ora di Ritiro: {order.pickupTime}</p>
                                    <p>Stato: {order.status}</p>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine previsto per oggi.</p>
                        )}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
