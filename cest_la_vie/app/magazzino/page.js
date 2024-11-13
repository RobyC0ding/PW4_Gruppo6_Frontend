"use client"
import { useState, useEffect } from 'react';
import styles from '@/app/magazzino/page.module.css';
import HeadersAmministratore from '@/components/headerAmministratore';
import Footer from '@/components/footer';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);

    // Fetch products and categories on component mount
    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                const [productRes, categoryRes] = await Promise.all([
                    fetch('http://localhost:8080/product/all', {
                        method: 'GET',
                        credentials: 'include'
                    }),
                ]);

                if (productRes.ok && categoryRes.ok) {
                    const productsData = await productRes.json();
                    const categoriesData = await categoryRes.json();
                    console.log('Prodotti:', productsData);  // Aggiungi questo log
                    console.log('Categorie:', categoriesData); // Aggiungi anche per le categorie
                    setProducts(productsData);
                    setCategories(categoriesData);
                } else {
                    throw new Error('Errore nel recupero di prodotti o categorie');
                }
            } catch (error) {
                console.error('Errore durante il recupero di prodotti e categorie:', error);
                setError('Errore durante il recupero dei dati');
            }
        };

        fetchCatalog();
    }, []);

    const handleAddProduct = async () => {
        if (!name || !price || !quantity || !description || !category || !ingredients) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        const newProduct = { name, price, quantity, description, category, ingredients, image };
        try {
            const response = await fetch('http://localhost:8080/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct),
            });
            if (response.ok) {
                const addedProduct = await response.json();
                setProducts([...products, addedProduct]);
                resetForm();
            } else {
                throw new Error('Errore durante l\'aggiunta del prodotto');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEditProduct = async () => {
        if (!name || !price || !quantity || !description || !category || !ingredients) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        const updatedProduct = { name, price, quantity, description, category, ingredients, image };
        try {
            const response = await fetch(`http://localhost:8080/product/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            if (response.ok) {
                const updatedData = await response.json();
                setProducts(products.map((product) =>
                    product.id === editId ? updatedData : product
                ));
                resetForm();
                setEditId(null);
            } else {
                throw new Error('Errore durante la modifica del prodotto');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/product/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setProducts(products.filter((product) => product.id !== id));
            } else {
                throw new Error('Errore durante l\'eliminazione del prodotto');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setCategory('');
        setIngredients('');
        setImage(null);
        setIsImageSelected(false);
        setError('');
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => {
            const numericQuantity = parseInt(prevQuantity.toString().replace('pz', '')) || 0;
            return `${Math.max(numericQuantity + delta, 0)} pz.`;
        });
    };

    const handleQuantityPrice = (delta) => {
        setPrice((prevPrice) => {
            const numericPrice = parseInt(prevPrice.toString().replace('€', '')) || 0;
            return `${Math.max(numericPrice + delta, 0)}€`;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setIsImageSelected(true);
        } else {
            setIsImageSelected(false);
        }
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
                        <input
                            type='textarea'
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                            placeholder='Ingredienti...'
                            className={styles.input}
                        />
                        <div className={styles.quantityWrapper}>
                            <input
                                type="textarea"
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
                        <input
                            type='file'
                            accept='image/*'
                            id='imageUpload'
                            onChange={handleImageChange}
                            className={styles.inputFile}
                        />

                        <label htmlFor="imageUpload" className={styles.customFileButton}>
                            <p className={styles.pButton}>Carica immagine</p>
                        </label>
                        <div className={`${styles.fileInputContainer} ${isImageSelected ? styles.visible : ''}`} >
                            <div className={styles.anteprima}>
                                {image && <img src={image} alt="anteprima" className={styles.background} />}
                            </div>
                        </div>

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
                                <li key={product.id} className={styles.productItem}>
                                    <div className={styles.productInfo}>
                                        {product.name} - {product.price}€ - {product.quantity} pz disponibili
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
                                                setCategory(product.category);
                                                setIngredients(product.ingredients);
                                                setEditId(product.id);
                                                setImage(product.image || null);
                                            }}
                                            className={styles.editButton}
                                        >
                                            Modifica
                                        </button>
                                    </div>
                                </li>
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