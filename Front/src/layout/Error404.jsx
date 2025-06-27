import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

function Error404() {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <StyledError>
                <div className="container-error">
                    <h1>Error 404</h1>
                    <p
                        onClick={() => {
                            setActive(true);
                            setTimeout(() => {
                                setActive(false);
                                navigate('/');
                            }, 3000)
                        }}
                    >
                        retourner à l'accueil
                    </p>
                </div>
                <div className={`container-modal ${active ? "active" : ""}`}>
                    <div>
                        <h1>Hello petit coquin !</h1>
                        <img src="../src\assets\2112.gif" alt="" />
                    </div>
                </div>
            </StyledError>
        </>
    );
}

const StyledError = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .container-error {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: 30px;
        color: whitesmoke;
        h1 {
            font-size: 3rem;
        }
        p {
            color: pink;
            font-size: 1.5rem;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .container-modal {
        border: 1px solid white;
        width: 50%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        margin: 0;
        z-index: -100;
        opacity:0;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        div {
            background-color: white;
            height: 80%;
            width: 80%;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width:100%;
                border-radius:20px;
            }
            h1{
                position:absolute;
                bottom:20px;
            }
        }
        &.active{
            opacity:1;
            z-index:100;
        }
    }
    
`;
export default Error404;
