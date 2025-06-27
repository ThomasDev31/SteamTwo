import styled from "styled-components";
import PlatGame from "./little_components/PlatGame";
import { useNavigate } from "react-router";
import { CartContext } from "../components/contexts/CartContext";
import { useContext } from "react";
const GameCard = ({ title, price, image, platforms, id }) => {
	const navigate = useNavigate();
	const { addItemToCart, isInCart, cart } = useContext(CartContext);

	const inCart = isInCart(id);
	return (
		<>
			<StyledGameCard className="Game_Card">
				<div
					className="img"
					onClick={() => {
						navigate(`/game/${id}`);
					}}
				>
					<img src={image} alt={`La photo du jeu ${title}`} />
				</div>
				<div
					className="Price_Block"
					onClick={() => {
						addItemToCart({
							id: id,
							title: title,
							image: image,
							price: price,
						});
					}}
				>
					<div className={inCart ? "cart active" : "cart"}>
						<p>
							{!inCart ? (
								"Add to cart +"
							) : (
								<i className="fa-solid fa-check"></i>
							)}
						</p>
						<p>{!inCart ? price : "In cart!"}</p>
					</div>
				</div>
				<div
					className="Platforms"
					onClick={() => {
						navigate(`/game/${id}`);
					}}
				>
					<PlatGame platform={platforms || {}} />
				</div>
				<h2
					className="Game_Title"
					onClick={() => {
						navigate(`/game/${id}`);
					}}
				>
					{title}
				</h2>
			</StyledGameCard>
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
		z-index: 10;
		position: relative;
		.cart {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
		.cart.active {
			justify-content: flex-start;
			gap: 10px;
			color: #059905;
			i {
				font-size: 1.2rem;
			}
		}
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
		@media (min-width: 600px) {
			font-size: 1.4rem;
		}
		font-size: 1.2rem;
	}
`;

export default GameCard;
