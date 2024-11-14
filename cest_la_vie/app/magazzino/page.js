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
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [ingredients, setAllIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

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

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`http://localhost:8080/ingredients`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setAllIngredients(data);

                } else {
                    throw new Error('Errore nella richiesta dei prodotti');
                }
            } catch (error) {
                console.error('Errore durante il recupero dei prodotti:', error);
            }
        };
        fetchIngredients();
    }, []);



    const handleIngredientSelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option =>
            ingredients.find(ingredient => ingredient.name === option.value)
        );

        
        const updatedIngredients = selectedOptions.reduce((acc, ingredient) => {
            
            if (acc.some(existingIngredient => existingIngredient.id === ingredient.id)) {
                return acc.filter(existingIngredient => existingIngredient.id !== ingredient.id);
            }
            
            return [...acc, ingredient];
        }, selectedIngredients);

        setSelectedIngredients(updatedIngredients);
    };
    const filteredCategories = categories.map((category) => ({
        ...category,
        products: category.products.filter(({ product }) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(category => category.products.length > 0);


    const handleAddProduct = async () => {
        if (!name || !price || !quantity || !description || !category || !selectedIngredients.length) {
            setError('Tutti i campi sono obbligatori');
            return;
        }
    
        // Modifica qui: invia solo l'ID della categoria
        const newProduct = {
            name,
            price,
            quantity,
            description,
            category: category, // Assicurati che 'category' sia solo l'ID numerico
            ingredients: selectedIngredients,
        };
    
        try {
            console.log(newProduct);
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
    

    const handleEditProduct = async (id) => {
        if (!name || !price || !quantity || !description || !category || !selectedIngredients) {
            setError('Tutti i campi sono obbligatori');
            return;
        }
    
        const updatedProduct = {
            name,
            price,
            quantity,
            description,
            category: category, // Assicurati che qui venga passato solo l'ID della categoria
            ingredients: selectedIngredients,
        };
        console.log(updatedProduct);
    
        try {
            const response = await fetch(`http://localhost:8080/product`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
                credentials:'include',
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
        setSelectedIngredients([]);
        setIsImageSelected(false);
        setError('');
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => {
            const numericQuantity = parseInt(prevQuantity.toString().replace('pz', '')) || 0;
            return `${Math.max(numericQuantity + delta, 0)}`;
        });
    };

    const handleQuantityPrice = (delta) => {
        setPrice((prevPrice) => {
            const numericPrice = parseInt(prevPrice.toString().replace('€', '')) || 0;
            return `${Math.max(numericPrice + delta, 0)}€`;
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
                        <select
                            multiple
                            value={selectedIngredients.map(ingredient => ingredient.name)}
                            onChange={handleIngredientSelect}
                            className={styles.select}
                        >
                            {ingredients.map((ingredient) => (
                                <option type="radio" key={ingredient.id} value={ingredient.name}>
                                    {ingredient.name}
                                </option>
                            ))}
                        </select>
                        <ul>
                            {selectedIngredients.map((ingredient, index) => (
                                <li key={index}>{ingredient.name}</li>
                            ))}
                        </ul>
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
                            onChange={(e) => setCategory(e.target.value)} // Impostiamo solo l'ID della categoria
                            className={styles.select}
                        >
                            <option value="">Seleziona categoria...</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
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
                            {filteredCategories.length === 0 ? (
                                <p>Nessun ptodotto trovato</p>
                            ) : (
                                filteredCategories.map((category) => (
                                    <div key={category.id}>
                                        {category.products.map(({ product, ingredients }) => (
                                            <li key={product.id} className={styles.productItem}>
                                                <div className={styles.productInfo}>
                                                    {product.product_name} - {product.price}€ - {product.quantity} pz disponibili
                                                    <br />{ingredients.map(ingredient => ingredient.name).join(",  ")}
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
                                                            setEditId(product.id);
                                                            setName(product.product_name);
                                                            setPrice(product.price);
                                                            setQuantity(product.quantity);
                                                            setDescription(product.description);
                                                            setCategory(product.category.id);
                                                            setAllIngredients(ingredients);
                                                        }}
                                                        className={styles.editButton}
                                                    >
                                                        Modifica
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </div>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </body>
    );
};

export default AdminProducts;