import { CardItem, type DescriptionProps } from "../utils";
import "./Description.css";

function Description({ description, portrait }: DescriptionProps) {
	return (
		<>
			<div id="Description-conteneur" className="description">
				<div
					className="portrait"
					style={{
						backgroundImage: `url(${portrait})`,
						backgroundSize: "cover",
					}}
				/>
				<p className=".description">{description}</p>
			</div>
		</>
	);
}
export default Description;
