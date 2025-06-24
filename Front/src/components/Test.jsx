import { useEffect, useState } from "react";
import rawgCalls from "../api/rawgCalls";
import rawgQueries from "../api/rawgQueries";

function Test() {
    const [datas, setDatas] = useState([]);
    const [datas2, setDatas2] = useState([]);

    const fetchdata = async () => {
        const responses = await rawgCalls.getAllGamesMostPopularOfYear();

        setDatas(responses.gameData.results);
    };
    const fetchdatabis = async () => {
        const responses = await rawgQueries.getCategory();
      
        setDatas2(responses);
    };
    useEffect(() => {
        fetchdata();
        fetchdatabis();
    }, []);

    return console.log(datas, datas2);
}

export default Test;
