"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import HeaderLoginUtente from "@/components/headerLoginUtente.js";
import styles from '@/app/prodotti/page.module.css';
import Footer from "@/components/footer";
import Link from 'next/link';

export default function Page() {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const response = await fetch(`http://localhost:8080/product/all`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    throw new Error('Errore nella richiesta dei prodotti');
                }
            } catch (error) {
                console.error('Errore durante il recupero dei prodotti:', error);
            }
        };

        fetchCatalog();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // Funzione per filtrare i prodotti in base alla ricerca
    const filteredCategories = categories.map((category) => ({
        ...category,
        products: category.products.filter(({ product }) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(category => category.products.length > 0);

    return (
        <div>
            <HeaderLoginUtente />
            <div className={styles.background}>
                <div>
                    <h1 className={styles.mainTitle}>I nostri prodotti</h1>
                </div>
            </div>
            <p className={styles.pAcquisto}>*per acquistare selezionare un prodotto</p>
            <div className={styles.content}>
                <div className={styles.catalog}>
                    {filteredCategories.length === 0 ? (
                        <p className={styles.noProductsMessage}>Nessun prodotto trovato. <br /> Torna più tardi per trovare deliziosità</p>
                    ) : (
                        filteredCategories.map((category) => (  
                            <div key={category.id}>
                                <h2 className={styles.categoryTitle}>{category.name}</h2>
                                <div className={styles.productGrid}>
                                    {category.products.map(({ product, ingredients }) => (
                                        <Link href={'/prodotti/' + product.id} key={product.id}>
                                            <div className={styles.productCard}>
                                                <Image
                                                    src={product.image ? product.image : "/images/prodotto2.jpg"} // Percorso immagine o immagine di fallback
                                                    alt={product.product_name}
                                                    width={300}
                                                    height={300}
                                                    className={styles.image}
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                                <div className={styles.productInfo}>
                                                    <p className={styles.info}><strong>{product.product_name}</strong></p>
                                                    <p className={styles.info}><strong>Descrizione:</strong> {product.description}</p>
                                                    <p className={styles.info}><strong>Prezzo:</strong> €{product.price}</p>
                                                    <p className={styles.info}><strong>Ingredienti:</strong> {ingredients.map(ingredient => ingredient.name).join(", ")}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className={styles.sidebar}>
                    <h1 className={styles.subTitle}>Cerca Prodotti</h1>
                    <form onSubmit={handleSubmit} className={styles.searchForm}>
                        <input
                            type="text"
                            name="title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchBar}
                            placeholder="Cerca un prodotto..."
                        />
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
