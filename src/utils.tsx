//mettez les interfaces et les classes ici pour plus de netteté
import {Component} from 'react';

export interface CardData{
    id:number;
    name: string;
    imageUrl: string;
}
export interface AssetsData{
    id:number;
    title: string;
    attack: number;
    health: number;
    cost: number;
}

export interface DeckProps
{
    data:CardData[];
    assets: AssetsData[];
}


export class CardItem{
    id:number;
    portrait:string;
    title: string;
    attack: number;
    health: number;
    cost: number;
    constructor(id:number,portrait:string, title:string, attack:number, health:number, cost:number){
        this.id = id;
        this.portrait = portrait;
        this.title = title;
        this.attack = attack;
        this.health = health;
        this.cost = cost;                
    }
}


interface Board {
    Cards: CardItem[]; // array of CardItems on the board
    owner:Player;
  }
  
  class Board implements Board {
    constructor(Player:Player) {
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
  
interface Deck {
    Cards: CardItem[];
    shuffled: boolean; // true if the deck is shuffled
  }
  
  class Deck implements Deck {
    constructor() {
      this.Cards = [];
      this.shuffled = false;
    }
  
    public shuffle() {
      // implementation of shuffling algorithm
      this.shuffled = true;
    }
  
    public drawCardItem(): CardItem | null {
      if (!this.Cards.length) {
        return null; // deck is empty
      }
      const CardItem = this.Cards.pop();
      return CardItem||null;
    }
  }
interface Hand {
    Cards: CardItem[];
  }
  
  class Hand implements Hand {
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
interface Player {
    id: number;
    name: string;
    hand: Hand[];
    turn: boolean; // true if it's the player's turn
  }
  
  class Player implements Player {
    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
      this.hand = [];
      this.turn = false;
    }
  }