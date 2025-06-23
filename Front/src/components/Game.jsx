import { useEffect, useState } from "react";

import '../styles/styles.css'
import { useParams } from "react-router";


function Game() {
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchDatas = async () => {
        try {
            const response = await fetch(
                `https://api.rawg.io/api/games/${id}?key=192c02abeefe448e8434a0b1a68694d7`
            );
            if (!response.ok) {
                throw new Error("Erreur sur la requetes " + response.status);
            }
            const jsonData = await response.json();
            
            setData(jsonData);
        } catch (err) {
            setErrors(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, []);
    console.log(data)
    return (
        <>
            <div>
                test
            </div>
        </>
    );
}

export default Game;

