

const rawgQueries = {


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
            
            return {platformData.results};
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