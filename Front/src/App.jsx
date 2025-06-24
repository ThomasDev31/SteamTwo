import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import AllGames from './components/Allgames'
import Header from './layout/Header'
import Game from './components/Game';
import Error404 from'./layout/Error404';
function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<AllGames />}/>
        <Route path={`/game/:id`} element={<Game />}/>
        <Route path='*' element={<Error404 />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App


// Last 30 days
// This Week
// Next 

// Best of year
// popular in current year 
// all time top 

// PC
// Play
// Xbox
// Nintendo
// IOS
// Android

// Action 
// Strat 
// RPG 
// Shooter 
// Adventure 
// Puzzle 
// Racing 
// Sports 