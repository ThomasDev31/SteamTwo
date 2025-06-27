import styled from "styled-components";
import Nav from "../components/little_components/Nav";
import Main from "../components/Main";
import Cart from "../components/little_components/Cart";
import { useState } from "react";

const Layout = () => {
	const [category, setCategory] = useState("");
	const [active, setActive] = useState(false)
	return (
		<StyledLayout className="layout">
			<div className="container-buger" onClick={()=> {setActive(!active)}}>
				<div className="bar-burger"></div>
				<div className="bar-burger"></div>
				<div className="bar-burger"></div>
			</div>
			<Main category={category} />
			<Nav category={category} setCategory={setCategory} active={active} setActive={setActive} />
		</StyledLayout>
	);
};

const StyledLayout = styled.div`
	background-color: rgb(15, 16, 17);
	min-height: 100vh;
	color: white;
	display: grid;
	grid-template-columns: 1fr;
	position: relative;
	.container-buger{
			width:40px;
			height:40px;
			flex-direction:column;
			position:fixed;
			bottom:10px;
			right:10px;
			display:flex;
			z-index:100;
			justify-content:center;
			align-items:center;
			gap:5px;
			border-radius:50%;
			background-color:white;
			display:none;
			.bar-burger{
				border-bottom: 2px solid black;
				width:20px;
			}
		}
	@media (min-width: 700px) {
		grid-template-columns: 300px auto;
	}
	@media (max-width: 700px ) {
		.container-buger{
			display:flex;
			cursor: pointer;
		}
		.nav{
			position:fixed;
			top:0;
		}
	}
`;

export default Layout;
