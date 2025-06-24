import { useEffect, useState } from "react"
import rawgCalls from '../api/rawgCalls';

function Test (){
    const [datas, setDatas] = useState([])
    const fetchdata=  async() => {
        const responses = await rawgCalls.getAllGames();
    
           
       setDatas(responses)
    } 
    useEffect(() => {
      fetchdata()
    },[])

    return (console.log(datas.gameData.results))
}

export default Test;