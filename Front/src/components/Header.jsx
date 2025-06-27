import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faL,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.png";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "./contexts/CartContext";
import rawgParams from "../api/rawgParams";
const apiKey = import.meta.env.VITE_KEY;

const Header = () => {
	const [searchedEntries, setSearchedEntries] = useState("");
	const [games, setGames] = useState([]);
	const [modalOpen, setModalOpen] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { toggleCart } = useContext(CartContext);

	useEffect(() => {
		if (searchedEntries.length < 2) {
			setGames([]);
			setModalOpen(false);
			return;
		}

		// juste pour éviter qu'il spamme l'api de ses morts
		const timeout = setTimeout(
			async () => await SearchTheGames(searchedEntries),
			500
		);
		return () => clearTimeout(timeout);
	}, [searchedEntries]);

	async function SearchTheGames(name) {
		setIsLoading(true);
		console.log("searchedEntries : ", searchedEntries);
		// FORCER L'OUVERTURE pour tester
		//setModalOpen(true);
		try {
			const response = await rawgParams.getGameBySearch(name);

			const data = response.gameData;
			setGames(data);
			if (data && data.results && data.results.length > 0) {
				setModalOpen(true);
			} else {
				setModalOpen(false);
			}
		} catch (error) {
			console.error("Error game search");
			setGames([]);
			setModalOpen(false);
			return { ERROR: error.message };
		} finally {
			setIsLoading(false);
		}
	}

	function closeModal() {
		setModalOpen(false);
		setSearchedEntries("");
		setGames([]);
	}

	return (
		<StyledHeader>
			<div className="title-logo">
				<a href="/">
					<img src={Logo} alt="SteamTwo logo" />
				</a>
			</div>
			<div className="search-container">
				{/* ICI la search bar avec le placeholder */}
				<div className="search-bar">
					<input
						type="text"
						value={searchedEntries}
						placeholder="Search games..."
						onChange={(g) => setSearchedEntries(g.target.value)}
					/>
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						color="rgb(0, 0, 0, .7)"
						size="lg"
					/>
				</div>
			</div>

			{/* DEBUG: Affichage conditionnel avec logs */}
			{/* ICI La logique de la modal qui s'ouvre comme ça quand on a une
					recherche en cours */}
			{modalOpen && (
				<div className="overlay_modal" onClick={closeModal}>
					<div className="search_modal">
						{isLoading && (
							<div className="search_loading">
								Loading en cours de chargement ...
							</div>
						)}

						{!isLoading &&
							games &&
							games.results &&
							games.results.length > 0 && (
								<div className="search_results">
									{games.results.map((game) => {
										return (
											<div key={game.slug} className="game_container">
												{game.background_image && (
													<img
														src={game.background_image}
														alt={game.name}
														className="game_image"
													/>
												)}
												<div className="game_info">{game.name}</div>
											</div>
										);
									})}
								</div>
							)}
					</div>
				</div>
			)}

			<div className="cart">
				<button onClick={toggleCart}>
					<FontAwesomeIcon icon={faCartShopping} color="white" size="2x" />
				</button>{" "}
				{/* temporary */}
			</div>
		</StyledHeader>
	);
};

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 25px 30px;
	gap: 35px;
	align-items: center;

	.title-logo {
		img {
			height: 100px;
			margin: -20px 0;
		}
	}

	.search-bar {
		position: relative;
		width: 300px;
		input {
			font-family: inherit;
			padding: 8px 15px;
			border-radius: 5px;
			font-size: inherit;
			width: 100%;
		}
		svg {
			position: absolute;
			top: 50%;
			right: 8px;
			transform: translateY(-50%);
			cursor: pointer;
		}
	}

	.cart button {
		background: inherit;
		border: 0;
		cursor: pointer;
	}

	@media (min-width: 500px) {
		grid-column: 1 / -1;
	}

	.search-container {
		position: relative;
		width: 100%;
		max-width: 400px;
	}

	.overlay_modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.search_modal {
		background: rgb(32, 32, 32);
		border-radius: 8px;
		padding: 20px;
		max-height: 500px;
		width: 90%;
		max-width: 600px;
		overflow-y: auto;
	}

	.search_loading {
		text-align: center;
		padding: 20px;
		font-size: 16px;
	}

	.search_results {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
	.game_container {
		display: flex;
		gap: 15px;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
		color: #f0f0f0;
		transition: background-color 0.2s;

		&:hover {
			background-color: #f0f0f0;
			color: #000000;
		}
	}

	.game_image {
		width: 80px;
		height: 60px;
		object-fit: cover;
		border-radius: 4px;
	}

	.game_info {
		display: flex;
		align-items: center;
		font-weight: 500;
	}
	.no_results {
		text-align: center;
		padding: 20px;
		color: #666;
	}
`;

export default Header;
