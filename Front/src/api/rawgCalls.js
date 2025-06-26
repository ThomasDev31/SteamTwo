const apiKey = import.meta.env.VITE_KEY;
import rawgParams from "./rawgParams";

const rawgCalls = {
	/*
	 * Get all Games
	 * @return{promise} results of all games (id, title, platform :[], price)
	 */
	async getAllGames(nbPage = 1) {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&page=${nbPage}`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete getAllGames (statut : ${response.status})`
				);
			}
			const gameData = await response.json();
			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get game by id for more informations
	 * @params{gameId} id game
	 * @return {promise} result of promise
	 */
	async getGame(gameId) {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games/${gameId}?key=${apiKey}`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete par Id getGame (statut : ${response.status})`
				);
			}
			const gameData = await response.json();

			if (!gameData.id) {
				return { error: "Aucun jeu n'a été trouvé ", gameData: null };
			}

			const responseMovie = await rawgParams.getGameMovies(gameId);

			const responseScreenShots = await rawgParams.getGameScreenShots(
				gameId
			);
			console.log();
			console.log(responseScreenShots);

			const result = {
				id: gameData.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: gameData.name,
				platform:
					gameData.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				description: gameData.description_raw.split("Español")[0],
				date: gameData.released,
				stores:
					gameData.stores?.map((s) => ({
						id: s.store.id,
						name: s.store.name,
						slug: s.store.slug,
						url: s.store.domain,
					})) || [],
				tags: gameData.tags?.map((t) => ({
					id: t.id,
					name: t.name,
					slug: t.slug,
				})),
				developers: gameData.developers?.map((d) => ({
					id: d.id,
					name: d.name,
				})),
				trailers: responseMovie.data?.map((m) => ({
					id: m.id,
					name: m.name,
					movie: m.data,
				})),
				screenshoot: responseScreenShots.data?.map((s) => ({
					id: s.id,
					image: s.image,
				})),
			};

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get best games of year
	 * @return{promise} results of all games
	 */
	async getAllGamesBestOfYear(nbPage = 1) {
		const year = new Date().getFullYear();
		const startYear = `${year}-01-01`;
		const endYear = `${year}-12-31`;
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&dates=${startYear},${endYear}&ordering=metacritic${nbPage}`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete getBestOfYear (statut : ${response.status})`
				);
			}
			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
				title_data: `Best game of year`,
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get best games of year
	 * @return{promise} results of all games
	 */
	async getAllGamesMostPopularOfYear(nbPage = 1) {
		const year = new Date().getFullYear();
		const startYear = `${year}-01-01`;
		const endYear = `${year}-12-31`;
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&dates=${startYear},${endYear}&ordering=rating${nbPage}`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete PopularOfYear (statut : ${response.status})`
				);
			}
			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
				title_data: `Best game of ${year}`,
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get all Games of all times
	 * @return{promise} results of all games
	 */
	async getAllGamesBestOfTime(nbPage = 1) {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&ordering=metacritic${nbPage}`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete BestOfTime (statut : ${response.status})`
				);
			}
			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get game by id for more informations
	 * @params{platform} name of platform
	 * @params{nbPages} value of page
	 * @return {promise} result of promise
	 */
	async getAllGamesByPlatform(platform, nbPage = 1) {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&parent_platforms=${platform}&page=${nbPage}&page_size=20`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete GamesByPlatform (statut : ${response.status})`
				);
			}
			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get game by id for more informations
	 * @params{category} name of category
	 * @params{nbPages} value of page
	 * @return {promise} result of promise
	 */
	async getAllGamesByCategory(category, nbPage = 1) {
		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&genres=${category}&page=${nbPage}&page_size=20`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete par Category (statut : ${response.status})`
				);
			}

			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get all game by month
	 * @params{nbPages} value of page
	 * @return {promise} result of promise
	 */
	async getAllGamesByMonth(nbPage = 1) {
		const today = new Date();
		const thirtyDay = new Date(today);
		thirtyDay.setDate(today.getDate() - 30);
		const formatingDate = (date) => date.toISOString().split("T")[0];

		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&dates=${formatingDate(
					thirtyDay
				)},${formatingDate(today)}&page=${nbPage}&page_size=20`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete par GamesByMonth (statut : ${response.status})`
				);
			}

			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
				title_data: `Best game of month`,
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get all game by week
	 * @params{nbPages} value of page
	 * @return {promise} result of promise
	 */
	async getAllGamesByWeek(nbPage = 1) {
		const today = new Date();
		const week = new Date(today);
		week.setDate(today.getDate() - 7);
		const formatingDate = (date) => date.toISOString().split("T")[0];

		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&dates=${formatingDate(
					week
				)},${formatingDate(today)}&page=${nbPage}&page_size=20`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete GamesByWeek (statut : ${response.status})`
				);
			}
			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
				title_data: `Best game of week`,
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},

	/*
	 * Get all game next week
	 * @params{nbPages} value of page
	 * @return {promise} result of promise
	 */
	async getAllGamesNextWeek(nbPage = 1) {
		const today = new Date();
		const week = new Date(today);
		week.setDate(today.getDate() + 7);
		const formatingDate = (date) => date.toISOString().split("T")[0];

		try {
			const response = await fetch(
				`https://api.rawg.io/api/games?key=${apiKey}&dates=${formatingDate(
					week
				)},${formatingDate(today)}&page=${nbPage}&page_size=20`
			);
			if (!response.ok) {
				throw new Error(
					`Erreure sur la requete NextWeek (statut : ${response.status})`
				);
			}
			const gameData = await response.json();

			if (gameData.count === 0 || !gameData.results) {
				return { error: "Aucun jeux n'a été trouvés", gameData: null };
			}

			const generateRandomPrice = () => {
				const prices = [39.49, 23.99, 59.99, 12.5, 66.29];
				const randomIndex = Math.floor(Math.random() * prices.length);
				return prices[randomIndex];
			};

			const result = gameData.results.map((r) => ({
				id: r.id,
				releaseDate: r.released,
				rating: r.rating,
				metacritic: r.metacritic,
				title: r.name,
				image: r.background_image,
				platform:
					r.parent_platforms?.map((p) => ({
						id: p.platform?.id,
						slug: p.platform?.slug,
					})) || [],
				price: generateRandomPrice(),
				title_data: `Next game of week`,
			}));

			return [{ result: result }, { error: null }];
		} catch (error) {
			console.error("Erreur getGame", error.message);
			return { error: error.message, gameData: null };
		}
	},
};
export default rawgCalls;
