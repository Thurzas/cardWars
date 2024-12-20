import { useState, useEffect, Suspense } from "react";
import BoardGame from "../../components/BoardGame.tsx";
import { AssetsData, CardData } from "../../utils.tsx";
import {
	DeckProps,
	CardItem,
	Board,
	Player,
	Deck,
	Hand,
	AttackCommand,
	CommandManager,
} from "../../utils.tsx";

const data = await fetch(
	"https://starwarsapi.remote-8.wilders.dev/api/characters/original?take=45&skip=0",
).then((response) => response.json());

function Home() {
	const [cardAssets, setCardAssets] = useState<AssetsData[] | null>(null); // Modifiez ici
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCardAssets = async () => {
			try {
				const response = await fetch("../src/assets/cards.json");
				const json: AssetsData[] = await response.json();
				setCardAssets(json);
			} catch (error) {
				console.error("Erreur lors du chargement des assets:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCardAssets();
	}, []);

	if (loading || cardAssets === null) {
		// Vérifiez également que cardAssets n'est pas null
		return <p>Chargement...</p>;
	}
        const mergedData = data.map((card:CardData) => {
            const targetedAsset = cardAssets.find((asset : AssetsData) => asset.id === card.id);
            if (targetedAsset)
                return new CardItem(
                    card.id,
                    card.imageUrl,
                    targetedAsset.title,
                    targetedAsset.attack,
                    targetedAsset.health,
                    targetedAsset.cost,
                );
        });
        const cards = mergedData.filter((card:CardItem) => card !== undefined);
        const deck = new Deck();
        deck.Cards = cards;
	return (
		<>
			<h2>Hello, Home !</h2>
			<Suspense fallback={<p>Loading data...</p>}>
				<BoardGame data={data} assets={cardAssets} /> {/* Type garanti ici */}
			</Suspense>
		</>
	);
}

export default Home;
