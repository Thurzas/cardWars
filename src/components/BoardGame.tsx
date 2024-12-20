import React, { useState, useEffect } from "react";
import {
	DeckProps,
	CardItem,
	Board,
	Player,
	Deck,
	Hand,
	AttackCommand,
	CommandManager,
} from "../utils.tsx";

interface GameBoardProps {
	player1: Player;
	player2: Player;
}

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
			);
	});
	const cards = mergedData.filter((card) => card !== undefined);
	const deck = new Deck();
	deck.Cards = cards;
	const [player1, setPlayer1] = useState(
		new Player(0, "joueur1", new Hand(), deck),
	);
	const [player2, setPlayer2] = useState(
		new Player(0, "joueur2", new Hand(), deck),
	);
	const [player1Board, setPlayer1Board] = useState(new Board(player1));
	const [player2Board, setPlayer2Board] = useState(new Board(player2));
	const [player1Hand, setPlayer1Hand] = useState<Hand>(player1.hand);
	const [player2Hand, setPlayer2Hand] = useState<Hand>(player2.hand);
	const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
	const [isPlayer1Turn, setIsPlayer1Turn] = useState(true);
	const commandManager = new CommandManager();

	// Initialiser la main des joueurs avec 3 cartes du deck
	useEffect(() => {
		const initHands = () => {
			for (let i = 0; i < 3; i++) {
				const card1 = player1.deck.drawCardItem();
				const card2 = player2.deck.drawCardItem();
				if (card1) player1Hand.addCardItem(card1);
				if (card2) player2.hand.addCardItem(card2); // Main du joueur 2 non affichée
			}
		};
		initHands();

        const initBoard2 = () => {
            player2Hand.Cards.forEach((c) => {
				const card = player2Hand.drawCardItem(c);
				if(card)
	                player2Board.addCardItem(card);
            });
        };
        initBoard2();
	}, [player1, player2, player1Hand]);

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
            if (board === player1Board) {
                // Sélectionner une carte sur le plateau du joueur 1
                setSelectedCard(card);
            } else if (board === player2Board && selectedCard) {
                // Attaquer une carte du plateau du joueur 2
                const attackCommand = new AttackCommand(
                    selectedCard,
                    card,
                    player1Board,
                    player2Board
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
	};


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
			<h1>Game Board</h1>

			<div style={{ display: "flex", flexDirection:"column-reverse", justifyContent: "space-between" }}>
				<div>
					<h2>Player 1 Board</h2>
					{player1Board.Cards.map((card: CardItem) => (
						<button
							key={card.id}
							style={{
								border:
									selectedCard?.id === card.id
										? "2px solid red"
										: "1px solid black",
							}}
							onClick={() => handleCardClick(card, player1Board)}
						>
							{card.title} (A: {card.attack}, H: {card.health})
						</button>
					))}
				</div>

				<div>
					<h2>Player 2 Board</h2>
					{player2Board.Cards.map((card: CardItem) => (
						<button
							key={card.id}
							onClick={() => handleCardClick(card, player2Board)}
						>
							{card.title} (A: {card.attack}, H: {card.health})
						</button>
					))}
				</div>
			</div>

			<div>
				<h2>Player 1 Hand</h2>
				{player1Hand.Cards.map((card: CardItem) => (
					<button key={card.id} onClick={() => playCardFromHand(card)}>
						{card.title} (A: {card.attack}, H: {card.health})
					</button>
				))}
			</div>

			<button onClick={endTurn}>
				{isPlayer1Turn ? "PASSER MON TOUR" : "Tour du joueur 2..."}
			</button>
		</div>
	);
}
export default BoardGame;