import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
	return (
		<StyledMain>
			<h2 className="category">Last 30 days</h2>
			<button className="order-by">
				<span>Order by: </span>
				<span>Name </span>
				<FontAwesomeIcon icon={faChevronDown} />
			</button>

			<div className="games-cards"></div>
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
`;

export default Main;
