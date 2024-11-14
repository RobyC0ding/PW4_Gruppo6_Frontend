"use client";

import styles from '@/app/dashboard-utente/page.module.css';
import HeaderLoginUtente from "@/components/headerLoginUtente";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function DashboardUtente() {
    const [orders, setOrders] = useState([]); // Ordini generali
    const [orderStatus, setOrderStatus] = useState(null); // Stato generico
    const [showCommentBox, setShowCommentBox] = useState(false); // Commento
    const [comment, setComment] = useState(''); // Commento utente
    const [userId, setUserId] = useState(null); // Placeholder for userId, replace with actual value

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentToggle = () => {
        setShowCommentBox((prevState) => !prevState);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userResponse = await fetch('http://localhost:8080/user/fromSession', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!userResponse.ok) {
                    throw new Error(`Errore nel server: ${userResponse.status} ${userResponse.statusText}`);
                }
                const userData = await userResponse.json();
                setUserId(userData);

                //prende tutti gli ordini di un utente con l'id del utente
                const orderResponse = await fetch(`http://localhost:8080/order/user/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!orderResponse.ok) {
                    throw new Error(`Errore nel server: ${orderResponse.status} ${orderResponse.statusText}`);
                }

                // Converti la risposta in formato JSON
                const orderData = await orderResponse.json();
                setOrders(orderData);
            } catch (error) {
                console.error('Errore nel fetch:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    const pendingOrders = orders.filter(order => order.status === 'pending');
    const acceptedOrders = orders.filter(order => order.status === 'accepted');
    const refusedOrders = orders.filter(order => order.status === 'refused');
    const takenOrders = orders.filter(order => order.status === 'taken');

    //
    //quarta lista ordine di tempo  tutti

    return (
        <>
            <HeaderLoginUtente/>
            <div className={styles.welcomeUser}>
                <h1>Benvenuto </h1>
                <p>roberto.zuccaro@itsincom.it</p>
            </div>
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardSection}>
                    <h2>Ordini in attesa</h2>
                    <p>Visualizza gli ordini in attesa di risposta</p>
                    <div>
                        {pendingOrders.length > 0 ? (
                            pendingOrders.map((order) => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>Data creazione: {new Date(order.creation_date).toLocaleString()}</p>
                                    <p>Ritiro
                                        previsto: {new Date(order.pickup_date).toLocaleString()} alle {order.pickup_time}</p>
                                    <div>
                                        <h3>Prodotti:</h3>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <p>{product.product_name} - {product.quantity} x €{product.price}</p>
                                            </div>
                                        ))}
                                        <p><strong>Totale:
                                            €{order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</strong>
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine in attesa trovato</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.columnSection}>
                <div className={styles.dashboardSection}>
                    <h2>Ordini accettati</h2>
                    <p>Visualizza gli ordini accettati</p>
                    <div>
                        {acceptedOrders.length > 0 ? (
                            acceptedOrders.map((order) => (
                                <div key={order._id} className={styles.orderCard}>
                                    <p>Data creazione: {new Date(order.creation_date).toLocaleString()}</p>
                                    <p>Ritiro
                                        previsto: {new Date(order.pickup_date).toLocaleString()} alle {order.pickup_time}</p>
                                    <div>
                                        <h3>Prodotti:</h3>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <p>{product.product_name} - {product.quantity} x €{product.price}</p>
                                            </div>
                                        ))}
                                        <p><strong>Totale:
                                            €{order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</strong>
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine accettato trovato</p>
                        )}
                    </div>
                </div>

                <div className={styles.dashboardSection}>
                    <h2>Ordini pronti</h2>
                    <p>Visualizza i tuoi ordini pronti per il ritiro</p>
                    <div>
                        {takenOrders.length > 0 ? (
                            takenOrders.map((order) => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>Data creazione: {new Date(order.creation_date).toLocaleString()}</p>
                                    <p>Ritiro
                                        previsto: {new Date(order.pickup_date).toLocaleString()} alle {order.pickup_time}</p>
                                    <div>
                                        <h3>Prodotti:</h3>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <p>{product.product_name} - {product.quantity} x €{product.price}</p>
                                            </div>
                                        ))}
                                        <p><strong>Totale:
                                            €{order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</strong>
                                        </p>
                                    </div>
                                    <button className={styles.button} onClick={() => handleCommentToggle(order.id)}>
                                        {order.comments.length ? 'Modifica commento' : 'Aggiungi un commento'}
                                    </button>
                                    {showCommentBox[order.id] && (
                                        <div>
                                <textarea
                                    className={styles.textarea}
                                    value={comment[order.id] || ''}
                                    onChange={(e) => handleCommentChange(e, order.id)}
                                    placeholder="Inserisci il tuo commento"
                                    rows="4"
                                    cols="50"
                                />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine pronto trovato</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.dashboardContainer}>
                <div className={styles.orderHistory}>
                    <h2>Storico degli ordini</h2>
                    <p>Visualizza lo storico dei tuoi ordini</p>
                    {orderStatus ? (
                        <p>{orderStatus}</p>
                    ) : (
                        <p>Nessuno stato disponibile</p>
                    )}
                </div>
            </div>


            <Footer/>
        </>
    );
}
