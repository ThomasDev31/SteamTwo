import { useEffect, useState } from "react"
import rawgQueries from '../api/rawgQueries';

function Test (){
    const [datas, setDatas] = useState([])
    const fetchdata=  async() => {
        const responses = await rawgQueries.getAllGamesByCategory("action", 1);
    
           
       setDatas(responses)
    } 
    useEffect(() => {
      fetchdata()
    },[])

    return (console.log(datas))
}

export default Test;