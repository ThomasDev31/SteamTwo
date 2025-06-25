import styled from "styled-components";
import PlatGame from "./little_components/PlatGame";
const GameCard = ({ title, price, image, platforms }) => {
    return (
        <StyledGameCard className="Game_Card">
            <div className="img">
                <img src={image} alt={`La photo du jeu ${title}`} />
            </div>
            <div className="Price_Block">
                <div className="Price_CTA">add to cart</div>
                <div className="Price">{price}</div>
            </div>

            <div className="Platforms">
                <PlatGame platform={platforms || {}} />
            </div>
            <div className="Game_Title">{title}</div>
        </StyledGameCard>
    );
};

const StyledGameCard = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    img {
        overflow: hidden;
        width: 100px;
        height: auto;
        object-fit: cover;
    }
	.Platforms{
		display: flex;
		
		i{
			color:red;
		}
		
	}
`;

export default GameCard;



