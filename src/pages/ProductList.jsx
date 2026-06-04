import { useState, useEffect, useMemo } from 'react';

function ProductList() {

    // setto var di stato per salvare i prodotti nell'array
    const [products, setProducts] = useState([]);

    // setto var di  stato per gestione search bar inizilmente vuota
    const [searchBar, setSearchBar] = useState('');

    // setto var di stato per gestione ordimanto + string literal ('none', 'asc' (A-Z), 'desc' (Z-A))
    const [sortOrder, setSortOrder] = useState('none');


    // utilizzo usememo per rendere più efficiente il filtraggio e l'ordinamento dei prodotti, in questo modo la funzione viene eseguita solo quando cambia lo stato dei prodotti, della search bar o dell'ordinamento
    // wrappo la funzione di filtraggio e ordinamento dei prodotti in useMemo
    const processedProducts = useMemo(() => {
        // funzione per filtrare i prodotti in base al valore della search bar, converto sia il titolo del prodotto che il valore della search bar in minuscolo per rendere la ricerca case-insensitive
        let filteredProduct = products.filter((product) => {
            return product.title.toLowerCase().includes(searchBar.toLowerCase())
        })

        // gestione ordinamento
        if (sortOrder === 'asc') {
            // ordino i prodotti in ordine alfabetico in base al titolo, utilizzo localeCompare per confrontare le stringhe
            filteredProduct = [...filteredProduct].sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOrder === 'desc') {
            // ordino i prodotti in ordine inverso in base al titolo
            filteredProduct = [...filteredProduct].sort((a, b) => b.title.localeCompare(a.title));
        }
        return filteredProduct;
    }, [products, searchBar, sortOrder]);



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
            {/* input per la search bar, aggiorna lo stato al cambiamento del valore */}
            <input
                type="text"
                placeholder="Cerca un prodotto"
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}>
            </input>

            {/* creo bottone per ordinare i prodotti in ordine alfabetico */}
            <button
                onClick={() => setSortOrder('asc')}
            >Ordina dalla a alla z
            </button>

            {/* creo bottone per ordinare i prodotti in ordine inverso */}
            <button
                onClick={() => setSortOrder('desc')}
            >Ordina dalla z alla a
            </button>

            {/* creo bottone per resettare l'ordinamento */}
            <button
                onClick={() => setSortOrder('none')}
            >Resetta ordinamento
            </button>

            <div>
                {/* controllo prodotti  */}
                {processedProducts.length === 0 ? (
                    <p> Nessun prodotto disponibile</p>
                ) : (
                    <ul>
                        {/* mappo l'array dei prodotti popolata precedentemente */}
                        {processedProducts.map((product) => (
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