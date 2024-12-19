//mettez les interfaces et les classes ici pour plus de netteté
import { Component } from "react";

export interface CardData {
	id: number;
	name: string;
	imageUrl: string;
}
export interface AssetsData {
	id: number;
	title: string;
	attack: number;
	health: number;
	cost: number;
}

export interface DeckProps {
	data: CardData[];
	assets: AssetsData[];
}

export class CardItem {
	id: number;
	portrait: string;
	title: string;
	attack: number;
	health: number;
	cost: number;
	constructor(
		id: number,
		portrait: string,
		title: string,
		attack: number,
		health: number,
		cost: number,
	) {
		this.id = id;
		this.portrait = portrait;
		this.title = title;
		this.attack = attack;
		this.health = health;
		this.cost = cost;
	}
}

export interface Board {
	Cards: CardItem[];
	owner: Player;
}

export class Board implements Board {
	constructor(Player: Player) {
		this.Cards = [];
		this.owner = Player;
	}

	public addCardItem(CardItem: CardItem) {
		this.Cards.push(CardItem);
	}

	public removeCardItem(CardItem: CardItem) {
		const index = this.Cards.indexOf(CardItem);
		if (index >= 0) {
			this.Cards.splice(index, 1);
		}
	}
}

export interface Deck {
	Cards: CardItem[];
	shuffled: boolean;
}

export class Deck implements Deck {
	constructor() {
		this.Cards = [];
		this.shuffled = false;
	}

	public shuffle() {
		this.shuffled = true;
	}

	public drawCardItem(): CardItem | null {
		if (!this.Cards.length) {
			return null;
		}
		const CardItem = this.Cards.pop();
		return CardItem || null;
	}
}
export interface Hand {
	Cards: CardItem[];
}

export class Hand implements Hand {
	constructor() {
		this.Cards = [];
	}

	public addCardItem(CardItem: CardItem) {
		this.Cards.push(CardItem);
	}

	public removeCardItem(CardItem: CardItem) {
		const index = this.Cards.indexOf(CardItem);
		if (index >= 0) {
			this.Cards.splice(index, 1);
		}
	}
}
export interface Player {
	id: number;
	name: string;
	hand: Hand;
	deck: Deck;
	turn: boolean;
}

export class Player implements Player {
	constructor(id: number, name: string, hand: Hand, deck: Deck) {
		this.id = id;
		this.name = name;
		this.hand = hand;
		this.deck = deck;
		this.turn = false;
		this.turn = false;
	}
}

interface Command {
	execute(): void;
}

export class AttackCommand implements Command {
	private attacker: CardItem;
	private defender: CardItem;
	private attackerBoard: Board;
	private defenderBoard: Board;

	constructor(
		attacker: CardItem,
		defender: CardItem,
		attackerBoard: Board,
		defenderBoard: Board,
	) {
		this.attacker = attacker;
		this.defender = defender;
		this.attackerBoard = attackerBoard;
		this.defenderBoard = defenderBoard;
	}

	public execute(): void {
		this.defender.health -= this.attacker.attack;
		this.attacker.health -= this.defender.attack;

		if (this.defender.health <= 0) {
			this.defenderBoard.removeCardItem(this.defender);
			console.log(`${this.defender.title} a été détruit !`);
		}

		if (this.attacker.health <= 0) {
			this.attackerBoard.removeCardItem(this.attacker);
			console.log(`${this.attacker.title} a été détruit !`);
		}

		console.log(`${this.attacker.title} attaque ${this.defender.title}`);
	}
}

export class CommandManager {
	private commandQueue: Command[];

	constructor() {
		this.commandQueue = [];
	}

	public addCommand(command: Command): void {
		this.commandQueue.push(command);
	}

	public executeCommands(): void {
		while (this.commandQueue.length > 0) {
			const command = this.commandQueue.shift();
			command?.execute();
		}
	}
}
