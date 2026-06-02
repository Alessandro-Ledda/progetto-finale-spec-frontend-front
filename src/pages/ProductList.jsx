import { useState, useEffect } from 'react';

function ProductList() {

    // setto var di stato per salvare i prodotti nell'array
    const [products, setProducts] = useState([]);

    // chiamata api per recuperare i prodotti passandola allo useEffect in modo che venga eseguita al montaggio del componente
    useEffect(() => {
        async function getProducts() {
            try {
                const response = await fetch('http://localhost:3001/products');

                // controllo risposta, se non è ok lancio un errore, altrimenti converto in json e salvo i dati nello stato
                if (!response.ok) {
                    throw new Error('Errore nella chiamata API');
                }

                // trasformo  la risponsta in json
                const data = await response.json();

                // salvo i dati nello stato
                setProducts(data);

            } catch (error) {
                console.error(error)
            }

        }
        // chiamo la funzione per recuperare i prodotti
        getProducts();
    }, []);

    return (
        <div>
            <h1>Lista prodotti disponibili</h1>
            <div>
                {/* controllo prodotti  */}
                {products.length === 0 ? (
                    <p> Nessun prodotto disponibile</p>
                ) : (
                    <ul>
                        {/* mappo l'array dei prodotti popolata precedentemente */}
                        {products.map((product) => (
                            <li key={product.id}>
                                <h2>{product.title}</h2>
                                <p>{product.category}</p>
                                <p>{product.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default ProductList;