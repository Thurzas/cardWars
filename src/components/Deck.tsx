import { CardData, AssetsData, CardItem, DeckProps } from "../utils.tsx";
import { useState } from "react";

function Deck(data: CardItem[]) {
	const [DarkDeck, setDarkDeck] = useState([]);
	const [LightDeck, setLightkDeck] = useState([]);

	return (
		<>
			<h2>Deck show off</h2>
			{data.map((card) =>
				card !== undefined ? (
					<div key={card.id}>
						<p>Name: {card.title}</p>
						<img src={card.portrait} />
						<p>Attack: {card.attack}</p>
						<p>Health: {card.health}</p>
						<p>Cost: {card.cost}</p>
					</div>
				) : (
					<p>An error occured</p>
				),
			)}
		</>
	);
}

export default Deck;

