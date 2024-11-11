'use client';

import { useState, useEffect } from "react";
import styles from "@/app/gestione-ordini/page.module.css";

import HeaderAmministratore from '@/components/headerAmministratore';
import Footer from "@/components/footer";

export default function OrdiniPage() {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const searchQueryParam = searchQuery ? `&customerName=${searchQuery}` : "";
                const response = await fetch(`http://localhost:8080/orders?size=20${searchQueryParam}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const ordersData = await response.json();
                    setOrders(ordersData);
                } else {
                    throw new Error('Errore nella richiesta degli ordini');
                }
            } catch (error) {
                console.error('Errore durante il recupero degli ordini:', error);
            }
        };

        fetchOrders();
    }, [searchQuery]);

    const handleOrderStatusChange = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    {orders.length === 0 ? (
                        <p className={styles.noOrdersMessage}>Nessun ordine trovato.</p>
                    ) : (
                        orders.map((order, index) => (
                            <div key={index} className={styles.orderCard}>
                                <h2 className={styles.orderTitle}>Ordine #{order.id}</h2>
                                <p><strong>Cliente:</strong> {order.customerName}</p>
                                <p><strong>Prodotti:</strong></p>
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className={styles.orderItem}>
                                            {item.name} - Quantità: {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <p><strong>Totale:</strong> €{order.totalPrice}</p>
                                <div className={styles.orderStatus}>
                                    <label>Stato:</label>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                                    >
                                        <option value="pending">In attesa</option>
                                        <option value="in-preparation">In preparazione</option>
                                        <option value="ready">Pronto per la consegna</option>
                                        <option value="delivered">Consegnato</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className={styles.sidebar}>
                    <h1 className={styles.subTitle}>Cerca Ordini</h1>
                    <form onSubmit={handleSubmit} className={styles.searchForm}>
                        <input
                            type="text"
                            name="customerName"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchBar}
                            placeholder="Cerca un ordine per cliente..."
                        />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
