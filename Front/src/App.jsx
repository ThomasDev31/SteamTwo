import Layout from "./layout/Layout";
import Game from "./components/little_components/Game";
import Header from "./components/Header";
import Cart from "./components/little_components/Cart";
import Error404 from "./layout/Error404"
import { CartProvider } from "./components/contexts/CartContext";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
	return (
		<>
			<BrowserRouter>
				<CartProvider>
					<Header />
					<Cart />
					<Routes>
						<Route path="/" element={<Layout />} />
						<Route path="/game/:id" element={<Game />} />
						<Route path="*" element={<Error404 />} />
						
					</Routes>
				</CartProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
