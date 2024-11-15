"use client";

import styles from '@/app/dashboard-utente/page.module.css';
import HeaderLoginUtente from "@/components/headerLoginUtente";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function DashboardUtente() {
    const [orders, setOrders] = useState([]); // Ordini generali
    const [orderStatus, setOrderStatus] = useState(null); // Stato generico
    const [showCommentBox, setShowCommentBox] = useState({}); // Commento, gestione per singolo ordine
    const [comments, setComments] = useState({}); // Commenti per ordine
    const [userId, setUserId] = useState(null); // Placeholder for userId, replace with actual value

    const handleCommentChange = (e, orderId) => {
        setComments(prevComments => ({
            ...prevComments,
            [orderId]: e.target.value,
        }));
    };

    const handleCommentToggle = (orderId) => {
        setShowCommentBox(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId], // Toggles the visibility of the comment box for the order
        }));
    };

    const handleCommentSubmit = async (orderId) => {
        const comment = comments[orderId];

        if (!comment) return;

        try {
            const response = await fetch(`http://localhost:8080/comment?orderId=${orderId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });

            if (!response.ok) {
                throw new Error(`Errore nel server: ${response.status} ${response.statusText}`);
            }

            // Dopo la sottomissione con successo, nascondi la casella di commento
            setShowCommentBox(prevState => ({
                ...prevState,
                [orderId]: false,
            }));
            alert('Commento inviato con successo');
        } catch (error) {
            console.error('Errore nel invio del commento:', error);
        }
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

    return (
        <body>
            <HeaderLoginUtente />
            <div className={styles.background}>
                <div>
                    <h1 className={styles.mainTitle}>Benvenuto nella tua dashboard</h1>
                </div>
            </div>
            <div className={styles.dashboardContainer}>
                <div className={styles.dashboardSection1}>
                    <h2 className={styles.h2}>Ordini in attesa</h2>
                    <p className={styles.ps1}>Visualizza gli ordini in attesa di risposta</p>
                    <div>
                        {pendingOrders.length > 0 ? (
                            pendingOrders.map((order) => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>Data creazione: {new Date(order.creation_date).toLocaleString()}</p>
                                    <p>Ritiro
                                        previsto: {new Date(order.pickup_date).toLocaleString()} alle {order.pickup_time}</p>
                                    <div>
                                        <p className={styles.h3}>Prodotti:</p>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                {console.log(product)}
                                                <p>{product.name} - {product.quantity} x €{product.price}</p>
                                            </div>
                                        ))}
                                        <p><strong>Totale:
                                            €{order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</strong>
                                        </p>
                                    </div>
                                    <br></br>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine in attesa trovato</p>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.columnSection}>
                <div className={styles.dashboardSection2}>
                    <h2>Ordini accettati</h2>
                    <p className={styles.ps2}>Visualizza gli ordini accettati</p>
                    <div>
                        {acceptedOrders.length > 0 ? (
                            acceptedOrders.map((order) => (
                                <div key={order._id} className={styles.orderCard}>
                                    <p>Data creazione: {new Date(order.creation_date).toLocaleString()}</p>
                                    <p>Ritiro
                                        previsto: {new Date(order.pickup_date).toLocaleString()} alle {order.pickup_time}</p>
                                    <div>
                                        <p className={styles.h3}>Prodotti:</p>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <p>{product.product_name} - {product.quantity} x €{product.price}</p>
                                            </div>
                                        ))}
                                        <p><strong>Totale:
                                            €{order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</strong>
                                        </p>
                                        <br></br>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine accettato trovato</p>
                        )}
                    </div>
                </div>


                <div className={styles.dashboardSection3}>
                    <h2>Ordini rifiutati</h2>
                    <p className={styles.ps3}>Visualizza i tuoi ordini rifiutati</p>
                    <div>
                        {refusedOrders.length > 0 ? (
                            refusedOrders.map((order) => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>Data creazione: {new Date(order.creation_date).toLocaleString()}</p>
                                    <p>Ritiro
                                        previsto: {new Date(order.pickup_date).toLocaleString()} alle {order.pickup_time}</p>
                                    <div>
                                        <p className={styles.h3}>Prodotti:</p>
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
                            <p>Nessun ordine pronto trovato</p>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.storico}>
                <div className={styles.dashboardSection4}>
                    <h2>Storico degli ordini</h2>
                    <p className={styles.ps4}>Visualizza lo storico degli ordini potrai aggiungere i commenti agli ordini relativi</p>
                    <div>
                        {takenOrders.length > 0 ? (
                            takenOrders.map((order) => (
                                <div key={order.id} className={styles.orderCard}>
                                    <p>Data creazione: {new Date(order.creation_date).toLocaleString()}</p>
                                    <p>Ritiro
                                        previsto: {new Date(order.pickup_date).toLocaleString()} alle {order.pickup_time}</p>
                                    <div>
                                        <p className={styles.h3}>Prodotti:</p>
                                        {order.products.map((product, index) => (
                                            <div key={index}>
                                                <p>{product.product_name} - {product.quantity} x €{product.price}</p>
                                            </div>
                                        ))}
                                        <p className={styles.h3}><strong>Totale:
                                            €{order.products.reduce((acc, product) => acc + (product.price * product.quantity), 0).toFixed(2)}</strong>
                                        </p>
                                    </div>

                                    <div key={order.id} className={styles.orderCard}>
                                        <button className={styles.button} onClick={() => handleCommentToggle(order.id)}>
                                            {showCommentBox[order.id] ? 'Modifica commento' : 'Aggiungi un commento'}
                                        </button>
                                        {showCommentBox[order.id] && (
                                            <div className={styles.comment}>
                                                <textarea
                                                    className={styles.textarea}
                                                    value={comments[order.id] || ''}
                                                    onChange={(e) => handleCommentChange(e, order.id)}
                                                    placeholder="Inserisci il tuo commento"
                                                    rows="4"
                                                    cols="50"
                                                />
                                                <button className={styles.buttonSend} onClick={() => handleCommentSubmit(order.id)}>
                                                    Invia commento
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nessun ordine pronto trovato</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    );
}
