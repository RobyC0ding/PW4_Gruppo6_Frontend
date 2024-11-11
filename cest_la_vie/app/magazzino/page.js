"use client"
import {useState, useEffect} from 'react';
import styles from '@/app/magazzino/page.module.css';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    const mockProducts = [
        {
            id: 1,
            name: "Torta al cioccolato",
            price: 15,
            quantity: 10,
            description: "Torta al cioccolato fondente, perfetta per ogni occasione."
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

    useEffect(() => {
        setProducts(mockProducts);
    }, []);

    const handleAddProduct = async () => {
        if (!name || !price || !quantity || !description) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        const newProduct = {
            id: products.length + 1,
            name,
            price,
            quantity,
            description,
        };

        setProducts([...products, newProduct]);
        resetForm();
    };

    const handleEditProduct = async () => {
        if (!name || !price || !quantity || !description) {
            setError('Tutti i campi sono obbligatori');
            return;
        }

        const updatedProducts = products.map((product) =>
            product.id === editId
                ? {...product, name, price, quantity, description}
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
    };

    return (

        <div className={styles.container}>
            <h1>Aggiungi, modifica, rimuovi prodotto</h1>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.containerForm}>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome prodotto"
                        className={styles.input}
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Prezzo"
                        className={styles.input}
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantità"
                        className={styles.input}
                    />
                    <input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrizione"
                        className={styles.input}
                    />
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
    );
};

export default AdminProducts;
