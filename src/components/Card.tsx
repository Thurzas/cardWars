import { CardItem, CardProps } from "../utils";
import BorderCard from "./BorderCard";

import "./Card.css";

function Card({data} : CardProps) {
	return (
		<>
			<div id="card-conteneur" className="card">
				<BorderCard data={data}/>
			</div>
		</>
	);
}
export default Card;
