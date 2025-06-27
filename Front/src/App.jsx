import Layout from "./layout/Layout";
import Game from "./components/little_components/Game";
import Header from "./components/Header";
import { CartProvider } from "./components/contexts/CartContext";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
	return (
		<>
			<BrowserRouter>
				<CartProvider>
					<Header />
					<Routes>
						<Route path="/" element={<Layout />} />
						<Route path="/game/:id" element={<Game />} />
					</Routes>
				</CartProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
