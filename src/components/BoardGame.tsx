import React, { useState, useEffect } from "react";
import {
	type DeckProps,
	CardItem,
	Board,
	Player,
	Deck,
	Hand,
	AttackCommand,
	CommandManager,
} from "../utils.tsx";
import Card from "./Card.tsx";
import "./BoardGame.css";

function BoardGame(data: DeckProps) {
	const mergedData = data.data.map((card) => {
		const targetedAsset = data.assets.find((asset) => asset.id === card.id);
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
	const cards = mergedData.filter((card) => card !== undefined);
	const light = new Deck();
	const dark = new Deck();
	light.Cards = cards.filter((card) => card.side === "light");
	dark.Cards = cards.filter((card) => card.side === "dark");
	const [player1, setPlayer1] = useState(
		new Player(0, "joueur1", new Hand(), light, 30),
	);
	const [player2, setPlayer2] = useState(
		new Player(0, "joueur2", new Hand(), dark, 30),
	);
	const [player1Board, setPlayer1Board] = useState(new Board(player1));
	const [player2Board, setPlayer2Board] = useState(new Board(player2));
	const [player1Hand, setPlayer1Hand] = useState<Hand>(player1.hand);
	const [player2Hand, setPlayer2Hand] = useState<Hand>(player2.hand);
	const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
	const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
	const [isGameInit, setGameInit] = useState(false);
	const [isTurnChanged, setChangeTurn] = useState(false);
	const commandManager = new CommandManager();
	const [player1LoseCondition, setPlayer1LoseCondition] = useState(
		new CardItem(
			911,
			"https://starwarsapi.remote-8.wilders.dev/api/assets/images/CluckSkylwalker.jpg",
			"Joueur 1",
			1,
			30,
			0,
			"light",
		),
	);
	const [player2LoseCondition, setPlayer2LoseCondition] = useState(
		new CardItem(
			912,
			"https://starwarsapi.remote-8.wilders.dev/api/assets/images/DarkFeather.jpg",
			"Joueur 2",
			1,
			30,
			0,
			"dark",
		),
	);

	const [isWinCondition, setWinCondition] = useState(false);
	const [isLoseCondition, setLoseCondition] = useState(false);
	const [isPlaying, setPlaying] = useState(true);
	useEffect(() => {
		if (!isGameInit) {
			const initHands = () => {
				for (let i = 0; i < 3; i++) {
					const card1 = player1.deck.drawCardItem();
					const card2 = player2.deck.drawCardItem();
					if (card1) player1Hand.addCardItem(card1);
					if (card2) player2.hand.addCardItem(card2);
				}
			};
			initHands();

			const initBoard2 = () => {
				player2Hand.Cards.forEach((c) => {
					const card = player2Hand.drawCardItem(c);
					if (card) player2Board.addCardItem(card);
				});
			};
			initBoard2();

			setGameInit(true);
		}
	}, [isGameInit, player1, player2, player1Hand]);

	useEffect(() => {
		if (!isPlayer1Turn) {
			console.log("Adverse turn...");
			setIsPlayer1Turn(true);
		}
	}, [isPlayer1Turn]);

	useEffect(() => {
		if (isTurnChanged && isPlayer1Turn) {
			console.log("Your turn...");
			const card = player1.deck.drawCardItem();
			if (card) player1Hand.addCardItem(card);
			setChangeTurn(false);
		}
	}, [isTurnChanged, isPlayer1Turn, player1, player1Hand]);

	useEffect(() => {
		if (!isWinCondition) {
			if (player2LoseCondition.health <= 0) {
				setWinCondition(true);
				setPlaying(false);
			}
		} else {
			alert("YOU WIN !");
		}

		if (!isLoseCondition) {
			if (player1LoseCondition.health <= 0) {
				setLoseCondition(true);
				setPlaying(false);
			}
		} else {
			alert("YOU LOSE !");
		}
	});
	const playCardFromHand = (card: CardItem) => {
		if (isPlayer1Turn) {
			// Retirer la carte de la main du joueur 1
			const DrawedCard = player1Hand.drawCardItem(card);

			//les useStates me force à créer un nouvel objet au lieu de mettre à jour un objet courant...
			const updatedHand = new Hand();
			player1Hand.Cards.forEach((c) => {
				updatedHand.addCardItem(c);
			});
			setPlayer1Hand(updatedHand);

			// Ajouter la carte au plateau du joueur 1
			const updatedBoard = new Board(player1Board.owner);
			player1Board.Cards.forEach((c) => updatedBoard.addCardItem(c));
			updatedBoard.addCardItem(card);
			setPlayer1Board(updatedBoard);
		}
	};

	const handleCardClick = (card: CardItem, board: Board) => {
		if (isPlayer1Turn) {
			//joueur 1 en train de jouer
			if (board === player1Board) {
				// Sélectionner une carte sur le plateau du joueur 1
				console.log("selected card :", card);
				setSelectedCard(card);
			} else if (board === player2Board && selectedCard) {
				// Attaquer une carte du plateau du joueur 2
				const attackCommand = new AttackCommand(
					selectedCard,
					card,
					player1Board,
					player2Board,
					player1LoseCondition,
					player2LoseCondition,
				);
				commandManager.addCommand(attackCommand);
				commandManager.executeCommands();

				// Mettre à jour les états des plateaux après l'attaque
				const updateBoard1 = new Board(player1Board.owner);
				player1Board.Cards.forEach((c) => updateBoard1.addCardItem(c));
				setPlayer1Board(updateBoard1);

				const updateBoard2 = new Board(player2Board.owner);
				player2Board.Cards.forEach((c) => updateBoard2.addCardItem(c));
				setPlayer2Board(updateBoard2);

				setSelectedCard(null);
			}
		}
	};

	const endTurn = () => {
		setIsPlayer1Turn(!isPlayer1Turn);
		setChangeTurn(true);
		console.log("fin de tour ? ", isPlayer1Turn);
	};

	const attackPlayer = () => {};

	//idée de départ pour l'affichage
	//        Player2
	//------------------------//
	//                        //
	//       Board  2         //
	//                        //
	//------------------------//PASSER TOUR ICI ?
	//                        //
	//       Board  1         //
	//                        //
	//------------------------//
	//        Player1
	//nos cartes
	//affichage temporaire: normalement quand j'aurai fini avec la logique du dessus, y'a plus qu'a implementer les components ici
	return (
		<div>
			<div>
				<button
					className="player"
					onClick={() => {
						handleCardClick(player2LoseCondition, player2Board);
					}}
				>
					<Card data={player2LoseCondition} />
				</button>
			</div>
			<h1>Game Board</h1>
			<div className="board1-2">
				<div className="board">
					<h2>Player 1 Board</h2>
					<div className="button-card">
						{player1Board.Cards.map((card: CardItem) => (
							<button
								type="button"
								key={card.id}
								onClick={() => handleCardClick(card, player1Board)}
							>
								<Card data={card} />
							</button>
						))}
					</div>
				</div>

				<div>
					<div className="board">
						<h2>Player 2 Board</h2>
						<div className="button-card">
							{player2Board.Cards.map((card: CardItem) => (
								<button
									type="button"
									key={card.id}
									onClick={() => handleCardClick(card, player2Board)}
								>
									<Card data={card} />
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			<div>
				<h2>Player 1 Hand</h2>
				{player1Hand.Cards.map((card: CardItem) => (
					<button
						type="button"
						key={card.id}
						onClick={() => playCardFromHand(card)}
					>
						<Card data={card} />
					</button>
				))}
			</div>
			<div>
				<button
					className="player"
					type="button"
					onClick={() => {
						handleCardClick(player1LoseCondition, player2Board);
					}}
				>
					<Card data={player1LoseCondition} />
				</button>
			</div>
			<button type="button" onClick={endTurn}>
				{isPlayer1Turn ? "PASSER MON TOUR" : "Tour du joueur 2..."}
			</button>
		</div>
	);
}
export default BoardGame;
