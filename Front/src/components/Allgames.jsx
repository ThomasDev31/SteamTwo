import { useEffect, useState } from "react";
const keyApi = import.meta.env.VITE_KEY;
import '../styles/styles.css'


function AllGames() {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);

    const fetchDatas = async () => {
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games?key=192c02abeefe448e8434a0b1a68694d7`
            );
            if (!response.ok) {
                throw new Error("Erreur sur la requetes " + response.status);
            }
            const jsonData = await response.json();
            
            setData(jsonData);
        } catch (err) {
            setErrors(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);
    console.log(data)
    return (
        <>
            <div className="all_games">
                
                {data.results && data.results.map((game) => (
                    <div key={game.id} className="game" >
                        <h2>{game.name}</h2>
                        <div className="container_img">
                            <img src={game.background_image} alt="image du jeu" />
                        </div>
                        
                        <div>
                            {game.parent_platforms &&
                                game.parent_platforms.map((plat) => (
                                    <div key={plat.platform.id}>
                                        {plat.platform.slug === "pc" && (
                                            <i className="fa-brands fa-windows"></i>
                                        )}
                                        {plat.platform.slug ===
                                            "playstation" && (
                                            <i className="fa-brands fa-playstation"></i>
                                        )}
                                        {plat.platform.slug === "xbox" && (
                                            <i className="fa-brands fa-xbox"></i>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}

             
            </div>
        </>
    );
}

export default AllGames;
{
    /* <i class="fa-brands fa-playstation"></i>
<i class="fa-brands fa-xbox"></i>
<i class="fa-brands fa-windows"></i> */
}
