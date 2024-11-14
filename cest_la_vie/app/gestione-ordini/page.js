'use client';

import { useState, useEffect } from "react";
import styles from "@/app/gestione-ordini/page.module.css";

import HeaderAmministratore from '@/components/headerAmministratore';
import Footer from "@/components/footer";

export default function OrdiniPage() {
    const [orders, setOrders] = useState([]); // Lista degli ordini
    const[pendingOrders, setPendingOrders] = useState([]);
    const[accRefOrders, setAccRefOrders] = useState([]);
    const[todayOrders, setTodayOrders] = useState([]);
    // const [loading, setLoading] = useState(false); // Stato di caricamento

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
                    setPendingOrders(orders.filter(order => order.status === 'pending'))
                    setAccRefOrders(orders.filter(order => order.status === 'accepted' || order.status === 'refused'))
                    setTodayOrders(orders.filter(order => order.pickupDate.split('T')[0] == Date.now()))
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

    // // Funzione per aggiornare lo stato dell'ordine
    // const handleOrderStatusChange = async (id, newStatus) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/order/${id}/status?status=${newStatus}`, {
    //             method: 'PUT',
    //             credentials: 'include',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             setOrders(prevOrders =>
    //                 prevOrders.map(order =>
    //                     order.id === id ? { ...order, status: newStatus } : order
    //                 )
    //             );

                
                
    //         } else {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Errore nell\'aggiornamento dello stato dell\'ordine');
    //         }
    //     } catch (error) {
    //         console.error('Errore durante l\'aggiornamento dello stato dell\'ordine:', error);
    //     }
    // };

    return (
        <div>
            <HeaderAmministratore />
            
            <Footer />
        </div>
    );
}
