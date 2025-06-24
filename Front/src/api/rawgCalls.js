const rawgCalls = {


	/*
   * Get all Games 
   * @return{promise} results of all games
   */
	async getAllGames(nbPage = 1) {
		try {
			const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&page=${nbPage}`);
			if (!response.ok) {
				throw new Error("Erreur sur la requete " + response.status);
			}
			const gameData = await response.json();
			if (gameData.count === 0) {
				return { error: "Aucun jeu trouvé pour cette catégorie", gameData: null };
			}
			return { gameData, error: null };

		} catch (error) {
			console.error("Erreur getGame", error.message)
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
			const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=192c02abeefe448e8434a0b1a68694d7`);
			if (!response.ok) {
				throw new Error(`Erreure sur la requete par Id ${platform} + (${response.status})`);
			}
			const gameData = await response.json();
			if (gameData.count === 0) {
				return { error: "Aucun jeu trouvé pour cette catégorie", gameData: null };
			}
			return { gameData, error: null };

		} catch (error) {
			console.error("Erreur getGame", error.message)
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
			const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&parent_platforms=${platform}&page=${nbPage}&page_size=20`);
			if (!response.ok) {
				throw new Error(`Erreure sur la requete par Id ${platform} + (${response.status})`);
			}
			const gameData = await response.json();

			if (gameData.count === 0) {
				return { error: "Aucun jeu trouvé pour cette catégorie", gameData: null };
			}
			return { gameData, error: null };

		} catch (error) {
			console.error("Erreur getGame", error.message)
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
			const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&genres=${category}&page=${nbPage}&page_size=20`);
			if (!response.ok) {
				throw new Error(`Erreure sur la requete par Id ${category} + (${response.status})`);
			}

			const gameData = await response.json();
			if (gameData.count === 0) {

				return { error: "Aucun jeu trouvé pour cette catégorie", gameData: null };
			}
			return { gameData, error: null };
		} catch (error) {
			console.error("Erreur getGame", error.message)
			return { error: error.message, gameData: null };
		}
	},

};
export default rawgCalls;