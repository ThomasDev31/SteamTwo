import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import rawgCalls from "../api/rawgCalls";
import GameCard from "./GameCard";

const calls = [
    { name: "Last 30 days", call: rawgCalls.getAllGames },
    { name: "This week", call: rawgCalls.getAllGamesByWeek },
    { name: "Next week", call: rawgCalls.getAllGamesNextWeek },
    { name: "Best of the year", call: rawgCalls.getAllGamesBestOfYear },
    { name: "Popular in 2025", call: rawgCalls.getAllGamesMostPopularOfYear },
    { name: "All time top", call: rawgCalls.getAllGamesBestOfTime },
    
];

const Main = ({ category }) => {
    const [datas, setDatas] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [functionData, setFunctionData] = useState();
    
    const platformName = category?.cat || "Last 30 days";

    useEffect(() => {
		let matched = null
		if(category?.section === "Platforms"){
             matched = {
                name: "Platforms",
                call: rawgCalls.getAllGamesByPlatform,
                needsParam: true,
            };
		}else if(category?.section === "Genres"){
             matched = {
                name: "Genres",
                call: rawgCalls.getAllGamesByCategory,
                needsParam: true,
            };
        }else{
            const standardCall = calls.find((k) => k.name === category?.cat || "Last 30 days");
            if (standardCall) {
                matched = {
                    call: standardCall.call,
                    needsParam: false,
                };
            }
        }
        setFunctionData(matched);
    }, [platformName]);

    const fetchdata = async () => {
         if (!functionData) return;
        try {
            let param;
            setLoading(true);
            if(functionData.name === "Platforms"){
                 param = category?.id; 
            }else if(functionData.name === "Genres"){
                param = category?.cat?.toLowerCase(); 
            }
            
            const response = functionData.needsParam
                ? await functionData.call(param)
                : await functionData.call();

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
            <button className="order-by">
                <span>Order by: </span>
                <span>Name </span>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>

            <div className="games-cards">
				{loading && (<p>Chargement des données</p>)}
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
    align-items: center;
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
    }
    GameCard:hover {
        transform: scale(1.2);
    }
`;

export default Main;
