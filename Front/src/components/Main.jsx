import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import rawgCalls from "../api/rawgCalls";
import GameCard from "./GameCard";

const Main = () => {
	const [datas, setDatas] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const fetchdata = async () => {
		try {
			const responses = await rawgCalls.getAllGames();
			setDatas(responses[0].result);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
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
				{!error &&
					!loading &&
					datas.map((game) => (
						<GameCard
							key={game.id}
							title={game.title}
							image={game.image}
							price={`${game.price}€`}
							platforms={game?.platform}
						/>
					))}
			</div>
		</StyledMain>
	);
};

const StyledMain = styled.main`
	display: flex;
	flex-flow: column;
	margin-top: 15px;

	.category {
		font-size: 2.5rem;
		font-weight: bolder;
	}

	button.order-by {
		width: fit-content;
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
		padding: 20px;
		padding-left: 0;
	}
`;

export default Main;
