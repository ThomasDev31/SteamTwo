const rawgQueries = {
    async getAllGames() {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7`);
            if (!response.ok) {
                throw new Error("Erreur sur la requete " + response.status);
            }
            const jsonData = await response.json();
            return jsonData;
        } catch (error) {
            console.error("Erreur getAllGames", error);
            throw error;
        }
    },

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

    async getByCategory(category) {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&genres=${category}`);
            if (!response.ok) {
                throw new Error(`Erreur sur la requête pour la catégorie ${category} (statut : ${response.status})`);
            }
            const categoryData = await response.json();
            return categoryData;
        } catch (error) {
            console.error("Erreur dans getByCategory :", error.message);
            throw error;
        }
    },

    async getByPlatform(platform) {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&platforms=${platform}`)
            if (!response.ok) {
                throw new Error(`Erreur sur la requete pour la platforme ${platform} (${response.status})`)
            }
            const platformData = await response.json();
            return platformData;
        } catch (error) {
            console.error("Erreur dans getByPlatform : ", error.message);
            throw error;
        }
    } 

    async getByTime() {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7&platforms=${platform}`)
        }
    }
}