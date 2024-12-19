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
