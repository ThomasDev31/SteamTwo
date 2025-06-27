import { CartContext } from "../contexts/CartContext";
import { useContext, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import styled from "styled-components";
import Sample from "../../assets/sample.jpg";

const Cart = () => {
	const { cart, isOpen, toggleCart, clearCart, removeItemFromCart } =
		useContext(CartContext);
	const ref = useRef();

	const totalPrice = cart
		.reduce((total, item) => {
			return total + item.price * (item.quantity || 1);
		}, 0)
		.toFixed(2);

	useClickOutside(ref, () => {
		if (isOpen) {
			toggleCart();
			console.log("here");
		}
	});

	return (
		<>
			<div
				className={isOpen ? "modal open" : "modal"}
				onClick={toggleCart}
			></div>
			<StyledCart ref={ref} className={isOpen ? "open" : ""}>
				<div className="top">
					<h2>
						<span>{cart.length}</span> Games
					</h2>
					<button onClick={clearCart}>Clear</button>
				</div>
				<div className="cart-items">
					{cart.map((item) => (
						<div className="cart-item" key={item.id}>
							<div className="content">
								<img src={item.image} alt="sample" />{" "}
								{console.log(item)}
								<div className="info">
									<p>{item.title}</p>
									<p>{item.price}</p>
								</div>
							</div>
							<button onClick={() => removeItemFromCart(item.id)}>
								<i class="fa-solid fa-trash-can"></i>
							</button>
						</div>
					))}
				</div>
				<p className="total-price">
					Total price: <span>{totalPrice + "$"}</span>
				</p>
			</StyledCart>
		</>
	);
};

const StyledCart = styled.div`
	position: fixed;
	top: 0;
	right: -350px;
	transition: right 0.3s ease-in-out;
	width: 350px;
	height: 100vh;
	background: rgb(32, 32, 32);
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	z-index: 20;

	h2 {
		color: white;
	}

	&.open {
		right: 0;
		z-index: 20;
	}

	p.total-price {
		font-size: 1.2rem;
		font-weight: 300;
		color: rgb(255, 255, 255, 0.5);
		margin-top: 20px;

		span {
			font-weight: bold;
			color: rgb(255, 255, 255);
		}
	}

	.top {
		display: flex;
		justify-content: space-between;
		button {
			cursor: pointer;
			background: inherit;
			font-family: inherit;
			color: rgb(255, 255, 255, 0.5);
			border: none;
			outline: none;
			font-weight: 300;
			font-size: 1.2rem;
		}
	}

	.cart-items {
		margin-top: 15px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		overflow-y: auto;
		scrollbar-width: none;
		flex: 1 1 0%;
		&::-webkit-scrollbar {
			display: none;
		}

		.cart-item {
			display: flex;
			flex-direction: column;

			.content {
				border-radius: 10px;
				padding: 10px;
				background: rgb(50, 50, 50);
				display: flex;
				gap: 25px;
				justify-content: space-between;
				align-items: center;

				.info {
					padding-right: 5px;
					font-weight: 300;
					color: white;
					word-wrap: break-word;

					p:nth-child(2) {
						color: rgb(255, 255, 255, 0.5);
					}
				}

				img {
					width: 140px;
					height: 80px;
					object-fit: cover;
					border-radius: 10px;
				}
			}

			button {
				cursor: pointer;
				background: inherit;
				border-radius: 10px;
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				position: relative;
				left: 10px;
				top: 1px;
				width: fit-content;
				padding: 3px 10px;
				font-weight: bold;
				font-family: inherit;

				border: none;
				outline: none;
				font-size: 1rem;
				color: rgb(255, 255, 255);
				background: rgb(88, 0, 0);
				font-weight: 300;
			}
		}
	}
`;

export default Cart;
