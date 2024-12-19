import { useState, useEffect, Suspense } from 'react';
import Deck from '../../components/Deck.tsx';
import { AssetsData } from '../../utils.tsx';
const data = await fetch("https://starwarsapi.remote-8.wilders.dev/api/characters/original?take=45&skip=0").then((response) => response.json());

function Home() {
    const [cardAssets, setCardAssets] = useState<AssetsData[] | null>(null); // Modifiez ici
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCardAssets = async () => {
            try {
                const response = await fetch('../src/assets/cards.json'); 
                const json: AssetsData[] = await response.json();
                setCardAssets(json);
            } catch (error) {
                console.error('Erreur lors du chargement des assets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCardAssets();
    }, []);

    if (loading || cardAssets === null) { // Vérifiez également que cardAssets n'est pas null
        return <p>Chargement...</p>;
    }

    return (
        <>
            <h2>Hello, Home !</h2>
            <Suspense fallback={<p>Loading data...</p>}>
                <Deck data={data} assets={cardAssets} /> {/* Type garanti ici */}
            </Suspense>
        </>
    );
}

export default Home;
