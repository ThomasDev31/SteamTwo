import Main from "./components/Main";
import Layout from "./layout/Layout";
import Game from "./components/little_components/Game";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
    return (
        <>
            <BrowserRouter>
				<Header/>
                <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/game/:id" element={<Game />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
