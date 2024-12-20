import "./BorderCard.css";
import AttackBorder from "./AttackBorder";
import Cost from "./Cost";
import Heal from "./Heal";
import Description from "./Description";
import { CardProps,CardItem, DescriptionProps } from "../utils";

function BorderCard({data} : CardProps) {
	return (
		<>
			<div id="BorderCard-svg">
				<Description description={data.title} portrait={data.portrait}/>
				<Cost cost={data.cost}/>
				<AttackBorder attack={data.attack}/>
				<Heal health={data.health}/>
			</div>
		</>
	);
}
export default BorderCard;
