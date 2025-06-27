import styled from "styled-components";
import Nav from "../components/little_components/Nav";
import Main from "../components/Main";
import Cart from "../components/little_components/Cart";
import { useState } from "react";

const Layout = () => {
	const [category, setCategory] = useState("");

	return (
		<StyledLayout className="layout">
			<Main category={category} />
			<Nav category={category} setCategory={setCategory} />
			<Cart />
		</StyledLayout>
	); 
};

const StyledLayout = styled.div`
	background-color: rgb(15, 16, 17);
	min-height: 100vh;
	color: white;
	display: grid;

	grid-template-columns: 300px auto;
`;

export default Layout;
