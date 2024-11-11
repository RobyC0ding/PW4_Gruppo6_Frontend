"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import HeaderLoginUtente from "@/components/headerLoginUtente.js";

import styles from '@/app/prodotti/page.module.css';

import Footer from "@/components/footer";

export default function Page() {
    const [productsByCategory, setProductsByCategory] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const size = 18;

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const searchQueryParam = searchQuery ? `&title=${searchQuery}` : "";
                const response = await fetch(`http://localhost:8080/products?size=${size}${searchQueryParam}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const products = await response.json();

                    // Raggruppa i prodotti per categoria
                    const groupedProducts = products.reduce((acc, product) => {
                        const category = product.category || "Senza Categoria";
                        if (!acc[category]) acc[category] = [];
                        acc[category].push(product);
                        return acc;
                    }, {});

                    setProductsByCategory(groupedProducts);
                } else {
                    throw new Error('Errore nella richiesta dei prodotti');
                }
            } catch (error) {
                console.error('Errore durante il recupero dei prodotti:', error);
            }
        };

        fetchCatalog();
    }, [searchQuery]);

    const handleQuantityChange = (category, index, delta) => {
        setProductsByCategory((prevProductsByCategory) => {
            const updatedCategory = [...prevProductsByCategory[category]];
            updatedCategory[index].quantity = Math.max((updatedCategory[index].quantity || 0) + delta, 0);

            return { ...prevProductsByCategory, [category]: updatedCategory };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <HeaderLoginUtente />
            <div className={styles.background}>
                <div>
                    <h1 className={styles.mainTitle}>I nostri prodotti</h1>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.catalog}>
                    {Object.keys(productsByCategory).length === 0 ? (
                        <p className={styles.noProductsMessage}>Nessun prodotto trovato. <br /> Torna pià tardi per trovare deliziosità</p>
                    ) : (
                        Object.entries(productsByCategory).map(([category, products], categoryIndex) => (
                            <div key={categoryIndex}>
                                <h2 className={styles.categoryTitle}>{category}</h2>
                                <div className={styles.productGrid}>
                                    {products.map((product, index) => (
                                        <div key={index} className={styles.productCard}>
                                            <Image
                                                src={product.image || fallbackImage}
                                                alt={product.title || "Product image"}
                                                width={200}
                                                height={300}
                                                className={styles.image}
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                            <div className={styles.productInfo}>
                                                <p><strong>{product.title}</strong></p>
                                                <p><strong>Descrizione:</strong> {product.description}</p>
                                                <p><strong>Prezzo:</strong> €{product.price}</p>
                                                <div className={styles.quantityControl}>
                                                    <button onClick={() => handleQuantityChange(category, index, -1)}>-</button>
                                                    <span>{product.quantity || 0}</span>
                                                    <button onClick={() => handleQuantityChange(category, index, 1)}>+</button>
                                                </div>
                                            </div>
                                        </div>
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
