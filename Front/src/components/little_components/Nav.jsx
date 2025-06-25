import styled from "styled-components";
import { navContent } from "../../data";

/*
 */

const Nav = () => {
	return (
		<StyledNav>
			{navContent.map((section) => (
				<div key={section.sectionName} className="nav-section">
					<h3>{section.sectionName}</h3>
					<ul>
						{section.categories.map((category) => (
							<li key={category.title}>
								<i className={category.icon}></i>
								<span>{category.title}</span>
							</li>
						))}
					</ul>
				</div>
			))}
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	top: 0;
	left: 0;
	z-index: 100;
	padding: 20px 40px;
	font-weight: 300;
	.nav-section {
		margin-bottom: 20px;
	}
	.nav-section h3 {
		font-size: 1.5rem;
		margin-bottom: 15px;
	}

	.nav-section ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.nav-section li {
		display: flex;
		align-items: center;
		gap: 10px;
		
		font-size: 1.2rem;
		cursor: pointer;
	}

	.nav-section li i {
		font-size: 1.5rem;
		color: #ffffff;
		background-color: rgb(32, 32, 32);
		border-radius: 10px;
		padding: 10px;
		transition: color 0.3s ease, background-color 0.3s ease;
	}

	.nav-section li:hover {
		color: #f0f0f0;

		i {
			color: #000000;
			background-color: #f0f0f0;
		}
	}
	@media (min-width: 500px) {
		grid-row: 2 / -1;
	}
`;

export default Nav;
