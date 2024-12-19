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
   return(
        <>
           <h2>Deck show off</h2>
           {cards.map(card =>(
            card !== undefined?
                <Card props={card}/>
                :
                <p>An error occured</p>
           ))}
        </>
    );
    
}
    

export default Deck;