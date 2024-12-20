import { CardData, AssetsData, CardItem, DeckProps } from "../utils.tsx";
import { useState } from "react";
import Card from "./Card.tsx";

function Deck(data: CardItem[]) {
	const [DarkDeck, setDarkDeck] = useState([]);
	const [LightDeck, setLightkDeck] = useState([]);

	return (
		<>
			<h2>Deck show off</h2>
			{data.map((card) =>
				card !== undefined ? (
					<Card data={card}/>
				) : (
					<p>An error occured</p>
				),
			)}
		</>
	);
}

export default Deck;

