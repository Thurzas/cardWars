import "./Home.css";
import "../../assets/fonts/font.css";
import "../../assets/fonts/Starjedi.ttf";

function Home() {
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
					<img
						id="vador_booster"
						src="/public/home-img/booster.png"
						alt="booster"
					/>
					<img
						id="anakin_booster"
						src="/public/home-img/booster.png"
						alt="booster"
					/>
				</div>
			</main>
		</>
	);
}

export default Home;
