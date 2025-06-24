

const rawgQueries = {

    /*
    * Get all Games 
    * @return{promise} results of all games
    */ 
    async getAllGames(nbPage=1) {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&page=${nbPage}`);
            if (!response.ok) {
                throw new Error("Erreur sur la requete " + response.status);
            }
            const jsonData = await response.json();
            return jsonData.results;
        } catch (error) {
            console.error("Erreur getAllGames", error);
            throw error;
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
            return gameData;
        } catch (error) {
            console.error("Erreur getGame", error);
            throw error;
        }
    
    },


    /*
    * Get game by id for more informations
    * @params{platform} name of platform
    * @params{nbPages} value of page
    * @return {promise} result of promise
    */
    async getAllGamesByPlatform(platform, nbPage=1) {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&parent_platforms=${platform}&page=${nbPage}&page_size=20`);
            if (!response.ok) {
                throw new Error(`Erreure sur la requete par Id ${platform} + (${response.status})`);
            }
            const gameData = await response.json();
            
            return gameData.results;
        } catch (error) {
            console.error("Erreur getGame", error);
            throw error;
        }
    
    },
    

    /*
    * Get game by id for more informations
    * @params{category} name of category
    * @params{nbPages} value of page
    * @return {promise} result of promise
    */
    async getAllGamesByCategory(category, nbPage=1) {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&genres=${category}&page=${nbPage}&page_size=20`);
            if (!response.ok) {
                throw new Error(`Erreure sur la requete par Id ${category} + (${response.status})`);
            }
            const gameData = await response.json();
            return gameData.results;
        } catch (error) {
            console.error("Erreur getGame", error);
            throw error;
        }
    },


    /*
    * Get all categories
    * @return {promise} result of promise
    */
    async getCategory() {
        try {
            const response = await fetch(`https://api.rawg.io/api/genres?key=192c02abeefe448e8434a0b1a68694d7`);
            if (!response.ok) {
                throw new Error(`Erreur sur la requête pour la catégorie  (statut : ${response.status})`);
            }
            const categoryData = await response.json();
            return categoryData;
        } catch (error) {
            console.error("Erreur dans getByCategory :", error.message);
            throw error;
        }
    },


    /*
    * Get all platforms games
    * @return {promise} result of promise
    */
    async getPlatform() {
        try {
            const response = await fetch(`https://api.rawg.io/api/platforms/lists/parents?key=192c02abeefe448e8434a0b1a68694d7&platforms`)
            if (!response.ok) {
                throw new Error(`Erreur sur la requete pour la platforme (${response.status})`)
            }
            const platformData = await response.json();
            return platformData.results;
        } catch (error) {
            console.error("Erreur dans getByPlatform : ", error.message);
            throw error;
        }
    } 


    // async getByTime() {
    //     try {
    //         const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&platforms=${platform}`)
    //     }
    // }
}

export default rawgQueries;