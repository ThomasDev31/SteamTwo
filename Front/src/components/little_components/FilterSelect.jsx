import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const correspondances = {
	name: "Name",
	popularity: "Popularity",
	release_date: "Release Date",
	rating: "Rating",
};

function useClickOutside(ref, handler) {
	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			handler(event);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handler]);
}

const FilterSelect = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef();
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleFilterChange = (newValue) => {
		onChange(newValue);
		setIsOpen(false);
	};

	useClickOutside(ref, () => {
		if (isOpen) {
			setIsOpen(false);
		}
	});

	return (
		<StyledFilterSelect ref={ref}>
			<button onClick={toggleDropdown}>
				<span>Order by: </span>
				<span>{correspondances[value]}</span>
				<i className="fa-solid fa-circle-chevron-down"></i>
			</button>
			{isOpen && (
				<ul className="dropdown-menu">
					<li onClick={() => handleFilterChange("name")}>
						Name
						{value === "name" && (
							<i className="fa-solid fa-check"></i>
						)}
					</li>
					<li onClick={() => handleFilterChange("popularity")}>
						Popularity
						{value === "popularity" && (
							<i className="fa-solid fa-check"></i>
						)}
					</li>
					<li onClick={() => handleFilterChange("release_date")}>
						Release Date
						{value === "release_date" && (
							<i className="fa-solid fa-check"></i>
						)}
					</li>
					<li onClick={() => handleFilterChange("rating")}>
						Rating
						{value === "rating" && (
							<i className="fa-solid fa-check"></i>
						)}
					</li>
				</ul>
			)}
		</StyledFilterSelect>
	);
};

const StyledFilterSelect = styled.div`
	margin-top: 12px;
	position: relative;
	width: fit-content;
	ul.dropdown-menu {
		position: absolute;
		top: 0;
		left: 0;
		color: black;
		width: 100%;
		background: white;
		border-radius: 10px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		list-style: none;
		padding: 10px 0;
		margin: 0;
		z-index: 1000;
	}
	ul.dropdown-menu li {
		padding: 8px 15px;
		cursor: pointer;
		font-family: inherit;
		font-size: 1.1rem;
		font-weight: 300;
		display: flex;
		justify-content: space-between;
		transition: background 0.3s ease;

		&:hover {
			background: #f0f0f0;
		}
	}
	button {
		cursor: pointer;
		font-family: inherit;
		font-size: 1.1rem;
		font-weight: 300;
		border: none;
		background: white;
		padding: 8px 15px;
		border-radius: 10px;
		display: flex;
		align-items: center;
	}

	span:nth-child(2) {
		font-weight: bold;
		margin-left: 8px;
	}

	i {
		margin-top: 3px;
		margin-left: 8px;
	}
`;

export default FilterSelect;
