import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartShopping,
	faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.png";
import { useContext } from "react";
import { CartContext } from "./contexts/CartContext";

const Header = () => {
	const { toggleCart } = useContext(CartContext);
	return (
		<StyledHeader>
			<div className="title-logo">
				<a href="/">
					<img src={Logo} alt="SteamTwo logo" />
				</a>
			</div>
			<div className="search-bar">
				<input type="text" placeholder="Search games..." />
				<FontAwesomeIcon
					icon={faMagnifyingGlass}
					color="rgb(0, 0, 0, .7)"
					size="lg"
				/>
			</div>
			<div className="cart">
				<button onClick={toggleCart}>
					<FontAwesomeIcon
						icon={faCartShopping}
						color="white"
						size="2x"
					/>
				</button>{" "}
				{/* temporary */}
			</div>
		</StyledHeader>
	);
};

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 25px 30px;
	gap: 35px;
	align-items: center;

	.title-logo {
		img {
			height: 100px;
			margin: -20px 0;
		}
	}

	.search-bar {
		position: relative;
		width: 300px;
		input {
			font-family: inherit;
			padding: 8px 15px;
			border-radius: 5px;
			font-size: inherit;
			width: 100%;
		}
		svg {
			position: absolute;
			top: 50%;
			right: 8px;
			transform: translateY(-50%);
			cursor: pointer;
		}
	}

	.cart button {
		background: inherit;
		border: 0;
		cursor: pointer;
	}

	@media (min-width: 500px) {
		grid-column: 1 / -1;
	}
`;

export default Header;
