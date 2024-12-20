import type { HealthProps } from "../utils";
import "./Heal.css";
function Heal({ health }: HealthProps) {
	return (
		<>
			<div id="Heal-svg" className="heal-svg">
				<p>{health}</p>
			</div>
		</>
	);
}
export default Heal;
