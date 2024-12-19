import {CardData,AssetsData,CardItem,DeckProps} from '../utils.tsx';
import {useState} from  'react';


function Deck(data:DeckProps){
    const [DarkDeck, setDarkDeck] = useState([]);
    const [LightDeck, setLightkDeck] = useState([]);
    const mergedData = data.data.map(card =>{
        const targetedAsset = data.assets.find(asset => asset.id === card.id);
        if(targetedAsset)
            return new CardItem(card.id,card.imageUrl,targetedAsset.title,targetedAsset.attack,targetedAsset.health,targetedAsset.cost);
    })
    
    const cards = mergedData.filter(card => card !== undefined);
    console.log(mergedData);
   return(
        <>
           <h2>Deck show off</h2>
           {cards.map(card =>(
            card !== undefined?
                <div key={card.id}>
                    <p>Name: {card.title}</p>
                    <img src={card.portrait} />
                    <p>Attack: {card.attack}</p>
                    <p>Health: {card.health}</p>
                    <p>Cost: {card.cost}</p>
                </div>
                :
                <p>An error occured</p>
           ))}
        </>
    );
    
}
    

export default Deck;