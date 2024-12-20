import { Suspense, useEffect, useState } from "react";
import Card from "../../components/Card";
import { type AssetsData, type CardData, CardItem, Deck } from "../../utils";
import BoardGame from "../../components/BoardGame";

const data = await fetch(
	"https://starwarsapi.remote-8.wilders.dev/api/characters/original?take=45&skip=0",
).then((response) => response.json());

function Game() {
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
	const mergedData = data.map((card: CardData) => {
		const targetedAsset = cardAssets.find(
			(asset: AssetsData) => asset.id === card.id,
		);
		if (targetedAsset)
			return new CardItem(
				card.id,
				card.imageUrl,
				targetedAsset.title,
				targetedAsset.attack,
				targetedAsset.health,
				targetedAsset.cost,
				targetedAsset.side,
			);
	});
	const cards = mergedData.filter((card: CardItem) => card !== undefined);
	const deck = new Deck();
	deck.Cards = cards;
	return (
		<>
			<Suspense fallback={<p>Loading data...</p>}>
				<BoardGame data={data} assets={cardAssets} />
			</Suspense>
		</>
	);
}

export default Game;
