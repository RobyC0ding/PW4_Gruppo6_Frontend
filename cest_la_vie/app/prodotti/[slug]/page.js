"use client";

import {useState, useEffect} from 'react';
import Image from "next/image";
import styles from "@/app/[slug]/page.module.css";
import HeaderLoginUtente from "@/components/headerLoginUtente";
import Footer from "@/components/footer";

async function fetchProduct(slug) {
    const response = await fetch(`http://localhost:8080/product/${slug}`, {
        credentials: 'include',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export default function ProductSlug({params}) {
    const {slug} = params;
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [orderStatus, setOrderStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProduct(slug);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [slug]);

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/products/${slug}/dashboard-utente`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({quantity}),
            });

            if (response.ok) {
                setOrderStatus('Prodotto ordinato');
            } else {
                console.error(`HTTP error! status: ${response.status}`);
                setOrderStatus('Prodotto non ordinato. Riprova.');
            }
        } catch (error) {
            console.error("Failed to request a product:", error);
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
            <HeaderLoginUtente/>
            <div className={styles.productContainer}>
                <div className={styles.imageContainer}>
                    <Image src={product.imageUrl || "/path/to/default-image.jpg"} width={400} height={500}
                           alt="Immagine prodotto"/>
                </div>

                <div className={styles.productDetails}>
                    <p className={styles.category}><strong>Categoria: </strong> {product.Category_id}</p>
                    <h1 className={styles.titleProduct}>{product.name}</h1>
                    <p className={styles.price}>€ {product.price}</p>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.ingredients}><strong>Ingredienti:<br/></strong> {product.ingredients}</p>

                    <div className={styles.quantity}>
                        <label htmlFor="quantity">Quantità: </label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            min="1"
                            onChange={handleQuantityChange}
                        />
                    </div>

                    <button onClick={handleOrder} className={styles.addToCartButton}>
                        {orderStatus === 'Prodotto ordinato' ? 'Consulta la dashboard' : 'Aggiungi al carrello'}
                    </button>

                    {orderStatus && <p className={styles.orderStatus}>{orderStatus}</p>}
                </div>
            </div>
            <Footer/>
        </>
    );
}
