import type { AttackProps } from "../utils";
import "./AttackBorder.css";
function AttackBorder({ attack }: AttackProps) {
	return (
		<>
			<div id="AttackBorder-conteneur">
				<p>{attack}</p>
			</div>
		</>
	);
}
export default AttackBorder;
