import styled from "styled-components";
import Header from "../components/Header";
import Nav from "../components/little_components/Nav";
import Main from "../components/Main";

const Layout = () => {
	return (
		<StyledLayout className="layout">
			<Header />
			<Main />
			<Nav />
		</StyledLayout>
	);
};

const StyledLayout = styled.div`
	background-color: rgb(15, 16, 17);
	min-height: 100vh;
	color: white;
	display: grid;
	grid-template-rows: 100px auto;
	grid-template-columns: 300px auto;
`;

export default Layout;
