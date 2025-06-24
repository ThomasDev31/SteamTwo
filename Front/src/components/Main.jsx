import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Main = () => {
	return (
		<StyledMain>
			<h2 className="category">Last 30 days</h2>
			<button>
				<span>Order by: </span>
				<span>Name </span>
				<FontAwesomeIcon icon={faChevronDown} />
			</button>

			<div className="games-cards"></div>
		</StyledMain>
	);
};

const StyledMain = styled.main``;

export default Main;
