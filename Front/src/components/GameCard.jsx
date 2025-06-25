import styled from "styled-components";

const GameCard = ({ title, price, image, platforms }) => {
	console.log(platforms);
	return (
		<StyledGameCard className="Game_Card">
			<div className="img">
				<img src={image} alt={`La photo du jeu ${title}`} />
			</div>
			<div className="Price_Block">
				<div className="Price_CTA">add to cart</div>
				<div className="Price">{price}</div>
			</div>
			<div className="Platforms">{"platforms"}</div>
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
`;

export default GameCard;

/*
<div className="platform_game">
	{game.parent_platforms &&
		game.parent_platforms.map((plat) => (
			<div key={plat.platform.id} >
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
				{plat.platform.slug === "linux" && (
					<i className="fa-brands fa-linux"></i>
				)}
				{plat.platform.slug === "mac" && (
					<i className="fa-brands fa-apple"></i>
				)}
				{plat.platform.slug === "nintendo" && (
					<i className="fa-solid fa-gamepad"></i>
				)}
				{plat.platform.slug === "ios" && (
					<i class="fa-brands fa-app-store-ios"></i>
				)}
				{plat.platform.slug === "android" && (
					<i class="fa-brands fa-android"></i>
				)}	
			</div>
		))}
</div>
*/
