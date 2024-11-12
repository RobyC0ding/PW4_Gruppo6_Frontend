"use client"
import { useState, useEffect } from 'react';
import styles from '@/app/magazzino/page.module.css';
import HeadersAmministratore from '@/components/headerAmministratore';
import Footer from '@/components/footer';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');  //nuovo stato per la categoria
    const [categories, setCategories] = useState([]); //stato per le opzioni delle categorie
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    const mockProducts = [
        {
            id: 1,
            name: "Torta al cioccolato",
            price: 15,
            quantity: 10,
            description: "Torta al cioccolato fondente, perfetta per ogni occasione.",
            category: "Dolci"
        },
        {
            id: 2,
            name: "Croissant alla marmellata",
            price: 3,
            quantity: 20,
            description: "Deliziosi croissant con marmellata di albicocche."
        },
        {
            id: 3,
            name: "Biscotti al burro",
            price: 5,
            quantity: 30,
            description: "Biscotti fragranti e croccanti, perfetti per la colazione."
        },
        {
            id: 4,
            name: "Muffin ai mirtilli",
            price: 4,
            quantity: 15,
            description: "Muffin soffici con mirtilli freschi."
        },
        {
            id: 5,
            name: "Pane integrale",
            price: 2,
            quantity: 50,
            description: "Pane fatto in casa con farina integrale, ideale per ogni pasto."
        },
    ];

    const mockCategories = [
        { id: 1, name: 'Dolci' },
        { id: 2, name: 'Pane' },
        { id: 3, name: 'Bevande' },
    ]

    useEffect(() => {
        setProducts(mockProducts);
        setCategories(mockCategories);
    }, []);

    const handleAddProduct = async () => {
        if (!name || !price || !quantity || !description || !category) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        const newProduct = {
            id: products.length + 1,
            name,
            price,
            quantity,
            description,
            category,
        };

        setProducts([...products, newProduct]);
        resetForm();
    };

    const handleEditProduct = async () => {
        if (!name || !price || !quantity || !description || !category) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        const updatedProducts = products.map((product) =>
            product.id === editId
                ? { ...product, name, price, quantity, description, category }
                : product
        );

        setProducts(updatedProducts);
        setEditId(null);
        resetForm();
    };

    const handleDeleteProduct = async (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setCategory('');
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => {
            const numericQuantity = parseInt(prevQuantity.toString().replace('pz', '')) || 0;
            const newQuantity = Math.max(numericQuantity + delta, 0);
            return `${newQuantity} pz.`;
        });
    };

    const handleQuantityPrice = (delta) => {
        setPrice((prevPrice) => {
            const numericPrice = parseInt(prevPrice.toString().replace('€', '')) || 0;
            const newPrice = Math.max(numericPrice + delta, 0);
            return `${newPrice}€`;
        });
    };

    return (
        <body>
            <HeadersAmministratore />
            <div className={styles.container}>
                <div className={styles.ch1}>
                    <h1 className={styles.h1}>Aggiungi, modifica, rimuovi prodotto</h1>
                </div>
                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.containerForm}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome prodotto..."
                            className={styles.input}
                        />
                        <input
                            type="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descrizione..."
                            className={styles.input}
                        />
                        <div className={styles.quantityWrapper}>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => {
                                    const numericValue = parseInt(e.target.value.replace('€', '')) || 0;
                                    setPrice(`${numericValue}€`);
                                }}
                                placeholder="Prezzo..."
                                className={styles.input}
                            />
                            <div className={styles.stylebutton}>
                                <button onClick={() => handleQuantityPrice(+1)} className={styles.quantityButton}><svg className={styles.plus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808"><path d="M20 11h-7V4c0-.55-.45-1-1-1s-1 .45-1 1v7H4c-.55 0-1 .45-1 1s.45 1 1 1h7v7c0 .55.45 1 1 1s1-.45 1-1v-7h7c.55 0 1-.45 1-1s-.45-1-1-1Z" ></path></svg></button>
                                <button onClick={() => handleQuantityPrice(-1)} className={styles.quantityButton}><svg className={styles.minus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808"><path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path></svg></button>
                            </div>
                        </div>
                        <div className={styles.quantityWrapper}>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => {
                                    const numericValue = parseInt(e.target.value.replace('pz', '')) || 0;
                                    setQuantity(`${numericValue}pz`);
                                }}
                                placeholder="Quantità..."
                                className={styles.input}
                            />
                            <div className={styles.stylebutton}>
                                <button onClick={() => handleQuantityChange(+1)} className={styles.quantityButton}><svg className={styles.plus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808"><path d="M20 11h-7V4c0-.55-.45-1-1-1s-1 .45-1 1v7H4c-.55 0-1 .45-1 1s.45 1 1 1h7v7c0 .55.45 1 1 1s1-.45 1-1v-7h7c.55 0 1-.45 1-1s-.45-1-1-1Z" ></path></svg></button>
                                <button onClick={() => handleQuantityChange(-1)} className={styles.quantityButton}><svg className={styles.minus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808"><path d="M20 11H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1Z"></path></svg></button>
                            </div>
                        </div>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Seleziona categoria...</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={editId ? handleEditProduct : handleAddProduct}
                            className={styles.button}
                        >
                            {editId ? 'Modifica prodotto' : 'Aggiungi prodotto'}
                        </button>
                    </div>


                    <div className={styles.productContainer}>
                        <h2>Lista dei prodotti</h2>
                        <ul className={styles.productList}>
                            {products.map((product) => (
                                <ul key={product.id} className={styles.productItem}>
                                    <div className={styles.productInfo}>
                                        {product.name} - {product.price}€ - {product.quantity} disponibile
                                    </div>
                                    <div className={styles.buttons}>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className={styles.deleteButton}
                                        >
                                            Rimuovi
                                        </button>
                                        <button
                                            onClick={() => {
                                                setName(product.name);
                                                setPrice(product.price);
                                                setQuantity(product.quantity);
                                                setDescription(product.description);
                                                setEditId(product.id);
                                            }}
                                            className={styles.editButton}
                                        >
                                            Modifica
                                        </button>
                                    </div>
                                </ul>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    );
};

export default AdminProducts;


//onClick={() => handleQuantityChange(-1)