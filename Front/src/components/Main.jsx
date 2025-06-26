import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import rawgCalls from "../api/rawgCalls";
import GameCard from "./GameCard";
import FilterSelect from "./little_components/FilterSelect";

const calls = [
	{ name: "Last 30 days", call: rawgCalls.getAllGames },
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

	const platformName = category?.cat || "Last 30 days";
	console.log("Platforme:", platformName);
	useEffect(() => {
		// let matched = null
		// if(category.section = "Platfomrs"){

		// }
		const matched = calls.find((k) => platformName === k.name);
		setFunctionData(matched);
		console.log(matched);
	}, [platformName]);

	const fetchdata = async () => {
		setLoading(true);
		try {
			const response = await functionData?.call(category?.param);
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
		}
	}, [functionData, category]);

	function GoToGamePage(id) {
		console.log(`AH LALA, ce jeu ${id} a été cliqué !! `);
	}
	return (
		<StyledMain>
			<h2 className="category">Last 30 days</h2>
			<FilterSelect value={filter} onChange={setFilter} />

			<div className="games-cards">
				{loading && <p>Chargement des données</p>}
				{datas.length === 0 && !loading && <p>😕 Aucun jeu trouvé.</p>}
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
		grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
		gap: 30px;
		width: 80vw;
		padding: 30px;
		padding-left: 0;
	}
	GameCard:hover {
		transform: scale(1.2);
	}
`;

export default Main;

// import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import { useState, useEffect } from "react";
// import rawgCalls from "../api/rawgCalls";
// import GameCard from "./GameCard";

// const calls = [
//     { name: "Last 30 days", call: rawgCalls.getAllGames },
//     { name: "This week", call: rawgCalls.getAllGamesByWeek },
//     { name: "Next week", call: rawgCalls.getAllGamesNextWeek },
//     { name: "Best of the year", call: rawgCalls.getAllGamesBestOfYear },
//     { name: "Popular in 2025", call: rawgCalls.getAllGamesMostPopularOfYear },
//     { name: "All time top", call: rawgCalls.getAllGamesBestOfTime },
// ];

// const Main = ({ category }) => {
//     const [datas, setDatas] = useState([]);
//     const [error, setError] = useState();
//     const [loading, setLoading] = useState(true);
//     const [functionData, setFunctionData] = useState();

//     useEffect(() => {
//         let matched = null;

//         // 🎮 Cas spécial pour Platforms
//         if (category?.section === "Platforms") {
//             matched = {
//                 call: rawgCalls.getAllGamesByPlatform,
//                 needsParam: true,
//             };
//         }

//         // 🎭 Cas spécial pour Genres
//         else if (category?.section === "Genres") {
//             matched = {
//                 call: rawgCalls.getAllGamesByCategory,
//                 needsParam: true,
//             };
//         }

//         // 📅 Cas général (Last 30 days, This week, etc.)
//         else {
//             const standardCall = calls.find((k) => k.name === category?.cat || "Last 30 days");
//             if (standardCall) {
//                 matched = {
//                     call: standardCall.call,
//                     needsParam: false,
//                 };
//             }
//         }

//         setFunctionData(matched);
//     }, [category]);

//     const fetchdata = async () => {
//         if (!functionData) return;

//         try {
//             setLoading(true);

//             const param = category?.cat?.toLowerCase().replaceAll(" ", "-");
//             const response = functionData.needsParam
//                 ? await functionData.call(param)
//                 : await functionData.call();

//             setDatas(response?.[0]?.result || []);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchdata();
//     }, [functionData, category]);

//     return (
//         <div>
//             {loading && <p>Loading...</p>}
//             {error && <p>Error: {error}</p>}
//             {!loading && !error && datas.length === 0 && <p>No games found.</p>}
//             <div>
//                 {datas.map((game) => (
//                     <GameCard key={game.id} game={game} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Main;
