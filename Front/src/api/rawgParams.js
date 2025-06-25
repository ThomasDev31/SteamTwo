const apiKey = import.meta.env.VITE_KEY;

const rawgParams = {
    /*
	* Get Trailers of game
	* @params{gameId} id game
	* @return {promise} result of promise
	*/
	async getGameMovies(gameId) {
		try {
			const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`);
			if (!response.ok) {
				throw new Error(`Erreure sur la requete par Id  + (${response.status})`);
			}
			const gameData = await response.json();
			if (gameData.count === 0) {
				return { error: "Aucun jeu n'a été trouvé ", gameData: null };
			}
			const data = gameData.results
			return { data, error: null };

		} catch (error) {
			console.error("Erreur getGame", error.message)
			return { error: error.message, gameData: null };
		}
	},


    /*
	* Get Screenshots of game
	* @params{gameId} id game
	* @return {promise} result of promise
	*/
	async getGameScreenShots(gameId) {
		try {
			const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`);
			if (!response.ok) {
				throw new Error(`Erreure sur la requete par Id  + (${response.status})`);
			}
			const gameData = await response.json();
			if (gameData.count === 0) {
				return { error: "Aucun jeu n'a été trouvé ", gameData: null };
			}
			const data = gameData.results
			return { data, error: null };

		} catch (error) {
			console.error("Erreur getGame", error.message)
			return { error: error.message, gameData: null };
		}
	},


    /*
	* Get game by search
	* @params{name} name of game
	* @return {promise} result of promise
	*/
	async getGameBySearch(name, nbPage = 1) {
		try {
			const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}&page=${nbPage}`);
			if (!response.ok) {
				throw new Error(`Erreure sur la requete par Id  + (${response.status})`);
			}
			const gameData = await response.json();
			if (gameData.count === 0) {
				return { error: "Aucun jeu n'a été trouvé ", gameData: null };
			}
			return { gameData, error: null };

		} catch (error) {
			console.error("Erreur getGame", error.message)
			return { error: error.message, gameData: null };
		}
	},


}
export default rawgParams;