import styled from "styled-components";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Test from "../components/Test";
const Layout = () => {
	return (
		<StyledLayout className="layout">
			<Test /> 
			<Header />
			<Main />
			<Nav />
		</StyledLayout>
	);
};

const StyledLayout = styled.div`
	background-color: black;
	min-height: 100vh;
	color: white;
`;

export default Layout;
