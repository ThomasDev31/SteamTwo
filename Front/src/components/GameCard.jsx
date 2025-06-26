import styled from "styled-components";
import PlatGame from "./little_components/PlatGame";
import { useState } from "react";
import Game from "./little_components/Game";
import { useNavigate } from "react-router";
const GameCard = ({ title, price, image, platforms, id }) => {
    const [idGame, setIdGame] = useState("");
    const [active, setActive] = useState(false)
    const navigate = useNavigate();
    return (
        <>
            <StyledGameCard
                className="Game_Card"
                onClick={(s) => {
                    navigate(`/game/${id}`)
                }}
            >
                <div className="img">
                    <img src={image} alt={`La photo du jeu ${title}`} />
                </div>
                <div className="Price_Block">
                    <div className="Price_CTA">Add to cart +</div>
                    <div className="Price">{price}</div>
                </div>

                <div className="Platforms">
                    <PlatGame platform={platforms || {}} />
                </div>
                <h2 className="Game_Title">{title}</h2>
            </StyledGameCard>
            <Game id={idGame} active={active} setActive={setActive} />
        </>
    );
};

const StyledGameCard = styled.div`
    background-color: rgb(32, 32, 32);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    padding-bottom: 10px;
    transition: 0.3s transform ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
    img {
        overflow: hidden;
        aspect-ratio: 16/9;
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    .Price_Block {
        display: flex;
        justify-content: space-between;
        margin: 5px 10px;
        font-size: 1.2rem;
    }
    .Platforms {
        display: flex;
        gap: 10px;
        margin: 10px 10px;
        i {
            color: whitesmoke;
        }
    }
    .Game_Title {
        text-align: left;
        margin: 5px 10px;
        font-size: 1.4rem;
    }
`;

export default GameCard;
