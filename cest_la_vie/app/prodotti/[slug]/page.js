"use client";

import {useState, useEffect} from 'react';
import Image from "next/image";
import styles from "@/app/prodotti/[slug]/page.module.css";
import HeaderLoginUtente from "@/components/headerLoginUtente";
import Footer from "@/components/footer";
import Link from "next/link";

async function fetchProduct(id) {
    const response = await fetch(`http://localhost:8080/product/${id}`, {
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

    const slug = params?.slug;

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
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

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/product/${id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({quantity}),
            });

            if (response.ok) {
                setOrderStatus('Prodotto ordinato. Visualizzalo nel carrello');
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
                    <Image src={product.image_link} width={400} height={500}
                           alt="Immagine prodotto"/>
                </div>

                <div className={styles.productDetails}>
                    <p className={styles.category}><strong>Categoria: {product.product.category.name} </strong></p>
                    <h1 className={styles.titleProduct}>{product.product.name}</h1>
                    <p className={styles.price}>€ {product.product.price}</p>
                    <p className={styles.description}>{product.product.description}</p>
                    <p className={styles.ingredients}>
                        <strong>Ingredienti:<br/></strong>
                        {product.ingredients.map((ingredient, i) => (
                            <span key={i}>{ingredient.name}{i < product.ingredients.length - 1 ? ', ' : ''}</span>
                        ))}
                    </p>

                    <div className={styles.quantity}>
                        <label htmlFor="quantity">Quantità: </label>
                        <input
                            type="number"
                            id="quantity"
                            value={product.product.quantity}
                            min="0"
                            onChange={handleQuantityChange}
                        />
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
            <Footer/>
        </>
    );
}