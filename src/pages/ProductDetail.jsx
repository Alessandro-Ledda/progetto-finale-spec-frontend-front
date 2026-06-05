import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const endPoint = 'http://localhost:3001/products';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);



    useEffect(() => {
        // chiamata
        const fetchProduct = async () => {
            try {
                const productId = Number(id); // converto l'id in numero 
                // risposta che racchiude il valore del prodotto
                const response = await fetch(`${endPoint}?id=/${productId}`);
                // ulteriore controllo
                if (!response.ok) {
                    throw new Error('Errore nella chiamata API');
                }

                const allProducts = await response.json();
                // filtraggio locale per trovare il prodotto con l'id corrispondente
                const foundProduct = allProducts.find((product) => product.id === productId);
                setProduct(foundProduct || null);

            } catch (error) {
                console.error(error);
                setProduct(null); // forza lo stato a null in caso di errore
            }

        };

        fetchProduct();
    }, [id]); //esegue l'effetto ogni volta che cambia l'id, unica dipendenza

    // qualunque cosa diversa da null, undefined o un oggetto vuoto viene considerata come "truthy", quindi se product è null, undefined o un oggetto vuoto, la condizione sarà falsa e verrà restituito il messaggio "Prodotto non trovato"
    if (!product) {
        return <div>Prodotto non trovato</div>;
    }

    return (
        <div>
            <h1>Product Detail</h1>
            <h2>{product.title}</h2>
            <p> categoria: {product.category} </p>
            <pre>{JSON.stringify(product, null, 2)}</pre>
            <p> descrizione: {product.description}</p>
            <p>prezzo: {product.price}</p>
        </div>
    );
}

export default ProductDetail;