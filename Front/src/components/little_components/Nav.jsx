import styled from "styled-components";
import { navContent } from "../../utils";

/*
 */

const Nav = ({ category, setCategory, active, setActive }) => {
	
	return (
		<StyledNav className={active? "active" : "" }>
			{navContent.map((section) => (
				<div key={section.sectionName} className="nav-section">
					<h3>{section.sectionName}</h3>
					<ul>
						{section.categories.map((category) => (
							<li
								key={category.title}
								onClick={() => {
									setCategory(() => ({
										section: section.sectionName,
										cat: category.title,
										id: category.id,
										slug: category.slug,
									}));
								}}
							>
								<div className="container-icon">
									<i className={category.icon}></i>
								</div>
								<span>{category.title}</span>
							</li>
						))}
					</ul>
				</div>
			))}
			<div className={active? "cross active" : "cross"  }  onClick={() => {setActive(!active)}}>
				X
			</div>
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	top: 0;
	left: 0;
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
	.nav-section li .container-icon {
		min-width: 50px;
		background-color: rgb(32, 32, 32);
		border-radius: 10px;
		padding: 10px;
		text-align: center;
		transition: color 0.3s ease, background-color 0.3s ease;
	}
	.nav-section li i {
		font-size: 1.5rem;
		color: #ffffff;
		background-color: rgb(32, 32, 32);
		transition: color 0.3s ease, background-color 0.3s ease;
	}

	.nav-section li:hover {
		color: #f0f0f0;

		i {
			color: #000000;
			background-color: #f0f0f0;
		}
		.container-icon {
			background-color: #f0f0f0;
		}
	}
	.cross{
			display:none;
	}
	@media (min-width: 700px) {
		grid-row: 2 / -1;
		
	}
	@media (max-width: 700px) { 
		display:none;
		&.active{
		position:fixed;
		top:0;
		width:100%;
		height:100%;
		overflow-y:auto;
		z-index:100;
		background-color:white;
		display:block;
		}
		
		.nav-section{
			flex-wrap:wrap;
		}
		&.active li,&.active  h3{
			color:black;
		}
		h3{

		}
		.cross.active{
			color:black;
			position:fixed;
			top:20px;
			right:40px;
			cursor:pointer;
			font-size:2rem;
			font-weight:500;
			font-family:inherit;
			display:block;
		}
	}
`;

export default Nav;
