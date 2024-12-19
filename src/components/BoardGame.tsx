import React, { Component } from "react";
import { useReducer } from "react";
import {Board, Player, Hand, Deck, CardItem, DeckProps, CommandManager} from "../utils.tsx";


function BoardGame(data: DeckProps){
    const deck1 = new Deck();
    const hand1 = new Hand();
    const player1 = new Player(0,"player1",hand1, deck1); 
    const board1 = new Board(player1);

    const deck2 = new Deck();
    const hand2 = new Hand();
    const player2 = new Player(1,"player2",hand2, deck2); 
    const board2 = new Board(player2);

    const attackManager = new CommandManager();

    //initialisation des cartes des decks
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
    deck1.Cards= cards;

    const initialState = {
        players: [
          player1,
          player2,
        ],
        currentTurn: 0, // Indice du joueur actif
        boards: [board1, board2],
        attackManager
      };

    const gameReducer = (state: typeof initialState, action: any) => {
        switch (action.type) {
            case 'DRAW_CARD': {                
                //prendre premier carte du deck                
            return { ...state };
            }
            case 'PLAY_CARD': {
                //jetter la carte sur le board
                return { ...state };
            }

            case 'ATTACK':
            {
                //attaque de la carte joueur courant vers cible du board adverse et check condition victoire.
                return { ...state
                    ,
                 };
            }
            case 'END_TURN': {
                //joueur suivant 

            return { ...state};
            }
            default:
            return state;
        }
    };
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return(
        <>
            {/* board 2 */}
			{hand1.Cards.map((card) =>
				card !== undefined ? (
					<div onClick={dispatch(type:"PLAY_CARD", payload: attackManager)}
                        key={card.id}>
						<p>Name: {card.title}</p>
						<p>Attack: {card.attack}</p>
						<p>Health: {card.health}</p>
						<p>Cost: {card.cost}</p>
					</div>
				) : (
					<p>An error occured</p>
				),
			)}
            {/* board 1 */}
        </>
    );    
}

export default BoardGame;
