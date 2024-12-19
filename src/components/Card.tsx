import attackBorder from "../assets/card-img/attack-border-red.svg";
import starBorder from "../assets/card-img/star-border-yellow.svg";
import healBorder from "../assets/card-img/number-border-green.svg";
import fondCard from "../assets/card-img/card-description-frame-alt.svg";

import "./Card.css";

function Card() {
	return (
		<>
			<div id="card-conteneur" className="card">
				<img className="fondCard" src={fondCard} alt="fond" />
				<img className="attackBorder" src={attackBorder} alt="attack" />
				<img className="starBorder" src={starBorder} alt="star" />
				<img className="healBorder" src={healBorder} alt="defence" />
			</div>
		</>
	);
}
export default Card;
