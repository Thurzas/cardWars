import "./BorderCard.css";
import AttackBorder from "./AttackBorder";
import Cost from "./Cost";
import Heal from "./Heal";
import Description from "./Description";

function BorderCard() {
	return (
		<>
			<div id="BorderCard-svg">
				<Description />
				<Cost />
				<AttackBorder />
				<Heal />
			</div>
		</>
	);
}
export default BorderCard;
