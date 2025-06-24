import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import rawgCalls from "../api/rawgCalls";
import { data } from "react-router";
import GameCard from "./GameCard";

const Main = () => {
	const [datas, setDatas] = useState([]);
	const fetchdata = async () => {
		const responses = await rawgCalls.getAllGames();
		console.log(responses);
		setDatas(responses);
	};
	useEffect(() => {
		fetchdata();
	}, []);

	function GoToGamePage(id) {
		console.log(`AH LALA, ce jeu ${id} a été cliqué !! `);
	}

	return (
		<StyledMain>
			<h2 className="category">Last 30 days</h2>
			<button className="order-by">
				<span>Order by: </span>
				<span>Name </span>
				<FontAwesomeIcon icon={faChevronDown} />
			</button>

			<div className="games-cards">
				{datas.gameData &&
					datas.gameData.results.map((game) => (
						<GameCard
							key={game.id}
							title={game.name}
							image={game.background_image}
							price={50}
							platforms={game.parent_platforms.map(
								(plat) => plat.platform.slug
							)}
						/>
					))}
			</div>
		</StyledMain>
	);
};

const StyledMain = styled.main`
	display: flex;
	flex-flow: column;
	align-items: center;
	margin-top: 15px;

	.category {
		font-size: 2.5rem;
		font-weight: bolder;
	}

	button.order-by {
		margin-top: 15px;
		padding: 5px 15px;
		display: flex;
		gap: 5px;
		font-size: inherit;
		font-weight: 300;
		font-family: inherit;
		align-items: center;
		border-radius: 10px;
		border: none;
		outline: 0;

		span:nth-child(2) {
			font-weight: bold;
		}
	}

	.games-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		width: 80vw;
		padding: 20px;
	}
`;

export default Main;
