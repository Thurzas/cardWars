import type { CostProps } from "../utils";
import "./Cost.css";

function Cost({ cost }: CostProps) {
	return (
		<>
			<div id="Cost-Conteneur" className="Cost">
				<p>{cost}</p>
			</div>
		</>
	);
}
export default Cost;
