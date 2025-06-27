import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import rawgCalls from "../../api/rawgCalls";
import styled from "styled-components";
import Carrousel from "./Caroussel";
import Loading from "./Loading";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";

function Game() {
	const [datas, setDatas] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const { addItemToCart, isInCart, cart } = useContext(CartContext);

	const inCart = isInCart(id);

	const fetchData = async () => {
		if (id) {
			try {
				setLoading(true);
				const responses = await rawgCalls.getGame(id);
				if (responses.error != null) {
					setError(responses.error);
				} else {
					setDatas(responses[0].result);
				}
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
	};
	useEffect(() => {
		fetchData();
	}, [id]);

	if (error) return <div>{error}</div>;

	return (
		<>
			<StyledModal>
				{error && <div>{error}</div>}
				{loading && (
					<div>
						<h2>
							<Loading />
						</h2>
					</div>
				)}
				{!error && !loading && datas && (
					<>
						<div className="top">
							<div
								onClick={() => navigate("/")}
								className="return"
							>
								<i className="fa-solid fa-arrow-left"></i>
								<h3>SteamTwo</h3>
							</div>
							<h2>{datas.title}</h2>
						</div>

						<div className="container-element-parent">
							<Carrousel
								image={datas.screenshoot}
								video={datas.trailers}
								className="max-width"
							/>
							<div className="container-content max-width">
								<div className="container-description">
									<h4>Description</h4>
									<div className="paragraphe">
										<p>{datas.description}</p>
									</div>
								</div>
								<div className="more-information">
									<div
										className={`${
											active ? "active" : ""
										} information`}
									>
										<p>
											Website :{" "}
											<Link to={datas.website}>
												{datas.website}
											</Link>
										</p>
										<p>Released : {datas.releaseDate}</p>
										<p>
											Genres :{" "}
											{datas.genres.length > 0 &&
												datas.genres.map((g, index) => (
													<span key={g.id}>
														{g.name}
														{index <
														datas.genres.length - 1
															? ","
															: " "}{" "}
													</span>
												))}
										</p>
										<p>
											Plateformes :{" "}
											{datas.platform.length > 0 &&
												datas.platform.map(
													(p, index) => (
														<span key={p.id}>
															{p.slug}
															{index <
															datas.platform
																.length -
																1
																? ", "
																: " "}
														</span>
													)
												)}
										</p>
										<p>
											Developpeurs :{" "}
											{datas.developers.length > 0 &&
												datas.developers.map(
													(d, index) => (
														<span key={d.id}>
															{d.name}
															{index >
															datas.developers
																.length -
																1
																? ", "
																: " "}
														</span>
													)
												)}
										</p>
										<p>
											Publicateurs :{" "}
											{datas.publisher.length > 0 &&
												datas.publisher.map(
													(d, index) => (
														<span key={index}>
															{d.name}
															{index >
															datas.publisher
																.length -
																1
																? ", "
																: " "}
														</span>
													)
												)}
										</p>
									</div>
									<div
										className={`${
											active ? "active" : ""
										} click-more`}
										onClick={() => setActive(!active)}
									>
										<p>more</p>
										<i
											className={`${
												active ? "active" : ""
											} fa-solid fa-arrow-right`}
										></i>
									</div>
								</div>
								<div
									className="container-cart"
									onClick={() => {
										addItemToCart({
											id: datas.id,
											title: datas.title,
											image: datas.screenshoot[0].image,
											price: datas.price,
										});
									}}
								>
									<div
										className={
											inCart ? "cart active" : "cart"
										}
									>
										<p>
											{!inCart ? datas.price : "In cart!"}
										</p>
										<p>
											{!inCart ? (
												"Add to cart +"
											) : (
												<i className="fa-solid fa-check"></i>
											)}
										</p>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</StyledModal>
		</>
	);
}

const StyledModal = styled.div`
	width: 100%;
	margin: auto;
	box-sizing: border-box;
	padding: 10px 100px 10px 100px;
	display: flex;
	flex-direction: column;
	height: 80%;
	scrollbar-width: none;
	.top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		h2 {
			color: white;
		}
		.return {
			display: flex;
			gap: 20px;
			align-items: center;
			text-align: left;
			position: relative;
			left: 0;
			color: white;
			cursor: pointer;

			i {
				transition: color 0.3s ease-in-out;
				font-size: 1.5rem;
			}
			h3 {
				transition: color 0.3s ease-in-out;
				font-size: 1.5rem;
			}
		}
		.return:hover {
			i {
				color: #5d6d7e;
			}
			h3 {
				color: #5d6d7e;
			}
		}
	}

	.container-element-parent {
		display: flex;
		justify-content: space-between;
		width: 100%;

		color: white;
		.container-content {
			max-width: 25%;
			position: relative;
			display: flex;
			flex-direction: column;
			.container-description {
				position: relative;

				h4 {
					text-align: center;
				}
			}

			.paragraphe {
				padding: 20px;
				border-radius: 10px;
				margin: 10px;
				margin-bottom: 5px;
				max-height: 300px;
				overflow-y: scroll;
				scrollbar-width: none;
				background-color: rgb(32, 32, 32);
			}

			.paragraphe::-webkit-scrollbar {
				display: none;
			}

			.container-description::after {
				content: "";
				position: absolute;
				bottom: 0px;
				left: 10px;
				right: 10px;
				height: 50px;
				background: linear-gradient(
					to top,
					rgba(0, 0, 0, 0.8),
					transparent
				);
				pointer-events: none;
				border-radius: 0 0 10px 10px;
				z-index: 10;
			}
			.more-information {
				padding: 10px;
				margin: 10px;
				margin-top: 5px;
				border-radius: 10px;
				max-height: 300px;
				overflow-y: hidden;
				scrollbar-width: none;
				background-color: rgb(32, 32, 32);
				position: relative;

				.click-more {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					gap: 5px;
					width: 100%;
					cursor: pointer;
					height: 20px;
					position: relative;

					i {
						transform: rotate(-90deg);
						transition: 0.5s ease-in-out;
						&.active {
							transform: rotate(90deg);
						}
					}

					&.active {
						position: absolute;
						bottom: 10px;
						right: 10px;
					}
				}
				.information {
					position: relative;
					opacity: 0;
					height: 0;
					transition: all 0.5s ease-in-out;
					transition: all 0.5s ease-in-out;
					&.active {
						opacity: 1;
						height: 250px;
					}
					a {
						color: #5d6d7e;
						&:hover {
							color: white;
						}
					}
				}
			}
			.container-cart {
				padding: 10px;
				border-radius: 10px;
				margin: 10px;
				margin-bottom: 5px;
				max-height: 300px;
				overflow-y: scroll;
				scrollbar-width: none;
				background-color: rgb(32, 32, 32);
				bottom: 150px;
				.cart {
					padding: 10px;
					display: flex;
					justify-content: space-between;
					width: 100%;
				}

				.cart.active {
					color: #059905;
					i {
						font-size: 1.2rem;
					}
				}
			}
		}

		.image {
			position: relative;
			width: 70%;
			aspect-ratio: 16 / 9;
			border-radius: 25px;
			overflow: hidden;
			z-index: 0;
			scrollbar-width: none;

			&::before {
				content: "";
				position: absolute;
				top: -20px;
				left: -20px;
				right: -20px;
				bottom: -20px;
				background: radial-gradient(
					circle,
					rgba(255, 255, 255, 0) 80%,
					rgba(255, 255, 255, 0.6)
				);
				border-radius: 35px;
				pointer-events: none;
				z-index: 10;
			}
		}
	}
	@media screen and (max-width: 1020px) {
		display: flex;
		padding: 10px;
		.top {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		.container-element-parent {
			display: flex;
			flex-direction: column;
			width: 100%;
			.max-width {
				max-width: 100%;
				display: flex;
				flex-direction: column;
				gap: 20px;
			}
		}
	}
`;
export default Game;
