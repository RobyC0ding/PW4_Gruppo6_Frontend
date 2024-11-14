'use client';

import { useState, useEffect } from "react";
import styles from "@/app/gestione-ordini/page.module.css";

import HeaderAmministratore from '@/components/headerAmministratore';
import Footer from "@/components/footer";

export default function OrdiniPage() {
    const [orders, setOrders] = useState([]); // Lista degli ordini
    const [loading, setLoading] = useState(false); // Stato di caricamento

    // Funzione per recuperare tutti gli ordini
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
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
                    console.log(ordersData); // Aggiungi questo per verificare la struttura dei dati

                    // Mappa dei dati dell'API a quelli del componente
                    const formattedOrders = ordersData.map(order => ({
                        id: order.id,  // Usa 'id' direttamente
                        userId: order.user_id || 'N/A',
                        products: order.products || [],
                        pickupDate: order.pickup_date || 'Data non disponibile',
                        pickupTime: order.pickup_time || 'Ora non disponibile',
                        creationDate: order.creation_date || 'Data non disponibile',
                        status: order.status || 'Stato non definito',
                        comments: order.comments || [],
                    }));

                    setOrders(formattedOrders); // Imposta gli ordini nello stato
                } else {
                    throw new Error('Errore nella richiesta degli ordini');
                }
            } catch (error) {
                console.error('Errore durante il recupero degli ordini:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders(); // Chiamata per recuperare gli ordini
    }, []); // Effettua la chiamata solo al primo render

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
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === id ? { ...order, status: newStatus } : order
                    )
                );
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
            <div className={styles.background}>
                <div>
                    <h1 className={styles.titolo}><span className={styles.mainTitle}>Gestione degli Ordini</span></h1>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.orderList}>
                    {loading ? (
                        <p>Caricamento ordini...</p>
                    ) : orders.length === 0 ? (
                        <p className={styles.noOrdersMessage}>Nessun ordine trovato.</p>
                    ) : (
                        orders.map((order, index) => (
                            <div key={index} className={styles.orderCard}>
                                <h2 className={styles.orderTitle}>Ordine #{order.id}</h2>
                                <p className={styles.p}><strong>Cliente ID:</strong> {order.userId}</p>
                                <p className={styles.p}><strong>Prodotti:</strong></p>
                                <ul className={styles.p}>
                                    {order.products.length > 0 ? (
                                        order.products.map((product, idx) => (
                                            <li key={idx} className={styles.orderItem}>
                                                {product.product_name || 'Nome prodotto non disponibile'} - Quantità: {product.quantity || 0} - Prezzo: €{product.price || 0}
                                            </li>
                                        ))
                                    ) : (
                                        <p className={styles.p}>Prodotti non disponibili</p>
                                    )}
                                </ul>
                                <p className={styles.p}><strong>Totale:</strong> €{order.products.reduce((total, product) => total + (product.price * product.quantity), 0)}</p>
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
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
