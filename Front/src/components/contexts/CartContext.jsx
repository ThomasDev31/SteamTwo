import { createContext, useEffect } from "react";
import { useState } from "react";

const initialCart = [
	{ id: 1, title: "Mario Kart", price: 29.99, quantity: 1 },
	{ id: 2, title: "Super Mario", price: 49.99, quantity: 1 },
	{ id: 3, title: "Mario Kart", price: 29.99, quantity: 1 },
	{ id: 4, title: "Super Mario", price: 49.99, quantity: 1 },
];

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : initialCart;
	});
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const toggleCart = () => {
		setIsOpen(!isOpen);
	};

	const addItemToCart = (item) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((i) => i.id === item.id);
			if (existingItem) {
				return prevCart.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
				);
			}
			return [...prevCart, { ...item, quantity: 1 }];
		});
	};

	const removeItemFromCart = (id) => {
		setCart((prevCart) => prevCart.filter((item) => item.id !== id));
	};

	const clearCart = () => {
		setCart([]);
	};

	const isInCart = (id) => {
		return cart.some((item) => item.id == id);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				isOpen,
				isInCart,
				addItemToCart,
				removeItemFromCart,
				clearCart,
				toggleCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
