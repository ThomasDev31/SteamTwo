

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
            
            const result = categoryData.results.map(r => ({
                 id : r.id, 
                 name :r.name, 
                 slug: r.slug 
            }))
            return result ;
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
            const response = await fetch(`https://api.rawg.io/api/platforms/lists/parents?key=192c02abeefe448e8434a0b1a68694d7&page_size=8`)
            if (!response.ok) {
                throw new Error(`Erreur sur la requete pour la platforme (${response.status})`)
            }
            const platformData = await response.json();
            const result = platformData.results.map(r => ({
                 id : r.id, 
                 name :r.name, 
                 slug: r.slug 
            }))
            return result;
        } catch (error) {
            console.error("Erreur dans getByPlatform : ", error.message);
            throw error;
        }
    },


     /*
    * Get all tags games
    * @return {promise} result of promise
    */
    async getTags() {
        try {
            const response = await fetch(`https://api.rawg.io/api/tags?key=192c02abeefe448e8434a0b1a68694d7`)
            if (!response.ok) {
                throw new Error(`Erreur sur la requete pour la platforme (${response.status})`)
            }
            const tagsData = await response.json();
            const result = tagsData.results.map(r => ({
                 id : r.id, 
                 name :r.name, 
                 slug: r.slug 
            }))
            return result;
        } catch (error) {
            console.error("Erreur dans getByPlatform : ", error.message);
            throw error;
        }
    } 
}

export default rawgQueries;