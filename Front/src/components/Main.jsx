import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import rawgCalls from "../api/rawgCalls";
import GameCard from "./GameCard";
import FilterSelect from "./little_components/FilterSelect";
import { filterBy } from "../utils";
import LoadingComponent from "./little_components/Loading";

const calls = [
	{ name: "Last 30 days", call: rawgCalls.getAllGamesByMonth },
	{ name: "This week", call: rawgCalls.getAllGamesByWeek },
	{ name: "Next week", call: rawgCalls.getAllGamesNextWeek },
	{ name: "Best of the year", call: rawgCalls.getAllGamesBestOfYear },
	{ name: "Popular in 2025", call: rawgCalls.getAllGamesMostPopularOfYear },
	{ name: "All time top", call: rawgCalls.getAllGamesBestOfTime },
	{
		name: "Platforms",
		call: (plat) => rawgCalls.getAllGamesByPlatform(plat),
	},
	{ name: "Genres", call: (genre) => rawgCalls.getAllGamesByCategory(genre) },
];

const Main = ({ category }) => {
	const [datas, setDatas] = useState([]);
	const [error, setError] = useState();
	const [loading, setLoading] = useState(true);
	const [functionData, setFunctionData] = useState();
	const [filter, setFilter] = useState("popularity");

	const filteredDatas = filterBy(datas, filter);
	console.log("Filtered data: ", filteredDatas);

	useEffect(() => {
		let matched;
		if (category?.section === "Platforms") {
			matched = {
				name: "Platforms",
				call: rawgCalls.getAllGamesByPlatform,
				needsParam: true,
			};
		} else if (category?.section === "Genres") {
			matched = {
				name: "Genres",
				call: rawgCalls.getAllGamesByCategory,
				needsParam: true,
			};
		} else {
			const standardCall = calls.find(
				(k) => k.name === (category?.cat || "Last 30 days")
			);
			matched = {
				call: standardCall.call,
				needsParam: false,
			};
		}
		setFunctionData(matched);
	}, [category?.cat || category?.section]);

	const fetchdata = async () => {
		if (!functionData) return;
		try {
			let param;
			setLoading(true);
			if (functionData.name === "Platforms") {
				param = category?.id;
			} else if (functionData.name === "Genres") {
				param = category?.cat?.toLowerCase();
			}

			const response = functionData.needsParam
				? await functionData.call(param)
				: await functionData.call();

			setDatas(response?.[0]?.result || []);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (functionData) {
			fetchdata();
			console.log(datas);
		}
	}, [functionData]);
	function GoToGamePage(id) {
		console.log(`AH LALA, ce jeu ${id} a été cliqué !! `);
	}
	return (
		<StyledMain>
			{datas && !loading && (
				<h2 className="category">
					{category?.cat || category?.section || "Last 30 days"}
				</h2>
			)}

			<FilterSelect
				value={filter}
				onChange={(newValue) => {
					setFilter(newValue);
				}}
			/>
			<div className="games-cards">
				{loading && <LoadingComponent />}
				{filteredDatas.length === 0 && !loading && (
					<p>😕 Aucun jeu trouvé.</p>
				)}
				{!error &&
					!loading &&
					filteredDatas.map((game) => (
						<GameCard
							key={game.id}
							title={game.title}
							image={game.image}
							price={`${game.price}€`}
							platforms={game?.platform}
							id={game?.id}
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
	position: relative;
	align-items: center;

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
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
		padding: 30px;
		@media (min-width: 700px) {
			grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
			padding-left: 0;
		}
	}
	GameCard:hover {
		transform: scale(1.2);
	}

	@media (min-width: 700px) {
		align-items: flex-start;
`;

export default Main;
