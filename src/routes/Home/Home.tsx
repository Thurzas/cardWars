import "./Home.css";
import "../../assets/fonts/font.css";
import "../../assets/fonts/Starjedi.ttf";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
	const [side, setSide] = useState("");
	return (
		<>
			<main id="home_container">
				<h1>Choisis ton camp !</h1>
				<div id="hero_zero">
					<img
						className="vador"
						src="/home-img/darkvador.png"
						alt="darkvador"
					/>
					<img
						className="anakin"
						src="/public/home-img/hanakin.png"
						alt="hanakin"
					/>
					<Link to="/Game" id="vador">
						<img
							id="vador_booster"
							src="/public/home-img/booster_vador.png"
							alt="booster"
						/>
					</Link>
					<Link to="/Game" id="anakin">
						<img
							id="anakin_booster"
							src="/public/home-img/booster.png"
							alt="booster"
						/>
					</Link>
				</div>
			</main>
		</>
	);
}

export default Home;
