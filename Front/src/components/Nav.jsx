import styled from "styled-components";

const Nav = () => {
	return (
		<StyledNav>
			<p>Nav</p>
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 100;
`;

export default Nav;
