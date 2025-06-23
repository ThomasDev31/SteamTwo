import styled from "styled-components";

const Main = () => {
	return (
		<StyledMain>
			<h2 className="category">Last 30 days</h2>
			<button>
				<span>Order by: </span>
				<span>Name</span>
			</button>
		</StyledMain>
	);
};

const StyledMain = styled.main``;

export default Main;
