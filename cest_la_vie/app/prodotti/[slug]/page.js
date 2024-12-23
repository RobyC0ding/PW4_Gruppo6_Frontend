"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "@/app/prodotti/[slug]/page.module.css";
import HeaderLoginUtente from "@/components/headerLoginUtente";
import Footer from "@/components/footer";
import Link from "next/link";

async function fetchProduct(id) {
    const response = await fetch(`http://localhost:8080/product/${id}`, {
        credentials: 'include',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export default function ProductSlug({ params }) {
    const slug = params?.slug;

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState('0 pz.');
    const [orderStatus, setOrderStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProduct(slug);
                console.log(data);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) loadProduct();
    }, [slug]);

    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => {
            const numericQuantity = parseInt(prevQuantity.toString().replace('pz', '')) || 0;
            const newQuantity = Math.max(numericQuantity + delta, 0);
            return `${newQuantity} pz.`;
        });
    };

    const handleOrder = async (id) => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductIndex = cart.findIndex(item => item.id === id);

            const numericQuantity = parseInt(quantity.replace(' pz.', '')) || 0;
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += numericQuantity;
            } else {
                cart.push({
                    id: product.product.id,
                    name: product.product.product_name,
                    price: product.product.price,
                    quantity: numericQuantity,
                });
            }

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update order status message
            setOrderStatus('Prodotto ordinato. Visualizzalo nel carrello');
        } catch (error) {
            console.error("Failed to save product to cart:", error);
            setOrderStatus('Prodotto non ordinato. Riprova.');
        }
    };

    if (loading) {
        return <div className={styles.loading}>Caricamento...</div>;
    }

    if (!product) {
        return <div className={styles.error}>Errore nel caricamento del prodotto</div>;
    }

    return (
        <>
            <HeaderLoginUtente />
            <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                    <Image
                        src={`/images/prodotto${product.product.id}.jpg`}
                        width={600}
                        height={500}
                        alt="Immagine prodotto"
                        unoptimized
                        className={styles.image}
                    />
                </div>

                <div className={styles.productDetails}>
                    <p className={styles.category}><strong>Categoria:  </strong>{product.product.category.name}</p>
                    <h1 className={styles.titleProduct}>{product.product_name}</h1>
                    {console.log(product.product.name)}
                    <p className={styles.price}>€ {product.product.price}</p>
                    <p className={styles.description}><strong>Descrizione:<br /></strong>{product.product.description}</p>
                    <p className={styles.ingredients}>
                        <strong>Ingredienti:<br /></strong>
                        {product.ingredients.map((ingredient, i) => (
                            <span key={i}>{ingredient.name}{i < product.ingredients.length - 1 ? ', ' : ''}</span>
                        ))}
                    </p>

                    <div className={styles.quantityWrapper}>
                        <input
                            type="text"
                            value={quantity}
                            onChange={(e) => {
                                const numericValue = parseInt(e.target.value.replace('pz', '')) || 0;
                                setQuantity(`${numericValue} pz.`);
                            }}
                            placeholder="Quantità..."
                            className={styles.input}
                            max={quantity}
                        />
                        <div className={styles.stylebutton}>
                            <button onClick={() => handleQuantityChange(+1)} className={styles.quantityButton}>
                                <svg className={styles.plus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808">
                                    <path d="M20 11h-7V4c0-.55-.45-1-1-1s-1 .45-1 1v7H4c-.55 0-1 .45-1 1s.45 1 1 1h7v7c0 .55.45 1 1 1s1-.45 1-1v-7h7c.55 0 1-.45 1-1s-.45-1-1-1Z"></path>
                                </svg>
                            </button>
                            <button onClick={() => handleQuantityChange(-1)} className={styles.quantityButton}>
                                <svg className={styles.minus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808">
                                    <path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {orderStatus === 'Prodotto ordinato' ? (
                        <Link href="/carrello" passHref>
                            <button className={styles.addToCartButton}>
                                Vai al carrello
                            </button>
                        </Link>
                    ) : (
                        <button onClick={() => handleOrder(slug)} className={styles.addToCartButton}>
                            Aggiungi al carrello
                        </button>
                    )}

                    {orderStatus && <p className={styles.orderStatus}>{orderStatus}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
}
