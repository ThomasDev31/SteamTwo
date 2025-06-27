import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import rawgCalls from "../../api/rawgCalls";
import styled from "styled-components";
import Carrousel from "./Caroussel";
import Loading from "./Loading";
function Game() {
    const [datas, setDatas] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        if (id) {
            try {
                setLoading(true);
                const responses = await rawgCalls.getGame(id);
                if (responses.error != null) {
                    setError(responses.error);
                } else {
                    setDatas(responses[0].result);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
    };
    useEffect(() => {
        fetchData();
    }, [id]);
    console.log(datas);
    if (error) return <div>{error}</div>;

    return (
        <>
            <StyledModal>
                {error && <div>{error}</div>}
                {loading && (
                    <div>
                        <h2>
                            <Loading />
                        </h2>
                    </div>
                )}
                {!error && !loading && datas && (
                    <>
                        <div className="top">
                            <div
                                onClick={() => navigate("/")}
                                className="return"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                                <h3>SteamTwo</h3>
                            </div>
                            <h2>{datas.title}</h2>
                        </div>

                        <div className="container-element-parent">
                            <Carrousel
                                image={datas.screenshoot}
                                video={datas.trailers}
                            />
                            <div className="container-content">
                                <div className="container-description">
                                    <h4>Description</h4>
                                    <div className="paragraphe">
                                        <p>{datas.description}</p>
                                    </div>
                                </div>
                                <div className="more-information">
                                    <div
                                        className={`${
                                            active ? "active" : ""
                                        } information`}
                                    >
                                        <p>
                                            Website :{" "}
                                            <Link to={datas.website}>
                                                {datas.website}
                                            </Link>
                                        </p>
                                        <p>Released : {datas.releaseDate}</p>
                                        <p>
                                            Genres :{" "}
                                            {datas.genres.length > 0 &&
                                                datas.genres.map((g, index) => (
                                                    <span key={g.id}>
                                                        {g.name}
                                                        {index <
                                                        datas.genres.length - 1
                                                            ? ","
                                                            : " "}{" "}
                                                    </span>
                                                ))}
                                        </p>
                                        <p>
                                            Plateformes :{" "}
                                            {datas.platform.length > 0 &&
                                                datas.platform.map(
                                                    (p, index) => (
                                                        <span key={p.id}>
                                                            {p.slug}
                                                            {index <
                                                            datas.platform
                                                                .length -
                                                                1
                                                                ? ", "
                                                                : " "}
                                                        </span>
                                                    )
                                                )}
                                        </p>
                                        <p>
                                            Developpeurs :{" "}
                                            {datas.developers.length > 0 &&
                                                datas.developers.map(
                                                    (d, index) => (
                                                        <span key={d.id}>
                                                            {d.name}
                                                            {index >
                                                            datas.developers
                                                                .length -
                                                                1
                                                                ? ", "
                                                                : " "}
                                                        </span>
                                                    )
                                                )}
                                        </p>
                                        <p>
                                            Publicateurs :{" "}
                                            {datas.publisher.length > 0 &&
                                                datas.publisher.map(
                                                    (d, index) => (
                                                        <span key={index}>
                                                            {d.name}
                                                            {index >
                                                            datas.publisher
                                                                .length -
                                                                1
                                                                ? ", "
                                                                : " "}
                                                        </span>
                                                    )
                                                )}
                                        </p>
                                    </div>
                                    <div
                                        className={`${
                                            active ? "active" : ""
                                        } click-more`}
                                        onClick={() => setActive(!active)}
                                    >
                                        <p>more</p>
                                        <i
                                            className={`${
                                                active ? "active" : ""
                                            } fa-solid fa-arrow-right`}
                                        ></i>
                                    </div>
                                </div>
                                <div
                                    className="container-cart"
                                    onClick={() => {}}
                                >
                                    <div className="cart">
                                        <p>{datas.price}</p>
                                        <p>Add to cart +</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </StyledModal>
        </>
    );
}

const StyledModal = styled.div`
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    padding: 10px 100px 10px 100px;
    display: flex;
    flex-direction: column;
    height: 80%;
    scrollbar-width: none;
    .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        h2 {
            color: white;
        }
        .return {
            display: flex;
            gap: 20px;
            align-items: center;
            text-align: left;
            position: relative;
            left: 0;
            color: white;
            cursor: pointer;

            i {
                transition: color 0.3s ease-in-out;
                font-size: 1.5rem;
            }
            h3 {
                transition: color 0.3s ease-in-out;
                font-size: 1.5rem;
            }
        }
        .return:hover {
            i {
                color: blue;
            }
            h3 {
                color: blue;
            }
        }
    }

    .container-element-parent {
        display: flex;
        justify-content: space-between;
        width: 100%;

        color: white;
        .container-content {
            max-width: 25%;
            position: relative;
            .container-description {
                position: relative;
                h4 {
                    text-align: center;
                }
            }

            .paragraphe {
                padding: 20px;
                border-radius: 10px;
                margin: 10px;
                margin-bottom: 5px;
                max-height: 300px;
                overflow-y: scroll;
                scrollbar-width: none;
                background-color: rgb(32, 32, 32);
            }

            .paragraphe::-webkit-scrollbar {
                display: none;
            }

            .container-description::after {
                content: "";
                position: absolute;
                bottom: 0px;
                left: 10px;
                right: 10px;
                height: 50px;
                background: linear-gradient(
                    to top,
                    rgba(0, 0, 0, 0.8),
                    transparent
                );
                pointer-events: none;
                border-radius: 0 0 10px 10px;
                z-index: 10;
            }
            .more-information {
                padding: 10px;
                margin: 10px;
                margin-top: 5px;
                border-radius: 10px;
                max-height: 300px;
                overflow-y: hidden;
                scrollbar-width: none;
                background-color: rgb(32, 32, 32);
                position: relative;
                
                .click-more {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    gap: 5px;
                    width: 100%;
                    cursor: pointer;
                    height: 20px;
                    position: relative;

                    i {
                        transform: rotate(-90deg);
                        transition: 0.5s ease-in-out;
                        &.active {
                            transform: rotate(90deg);
                        }
                    }

                    &.active {
                        position: absolute;
                        bottom: 10px;
                        right: 10px;
                    }
                }
                .information {
                    position: relative;
                    opacity: 0;
                    height: 0;
                    transition: all 0.5s ease-in-out;
                    transition: all 0.5s ease-in-out;
                    &.active {
                        opacity: 1;
                        height: 250px;
                    }
                }
            }
            .container-cart {
               
                border-radius: 10px;
                
                max-height: 300px;
                overflow-y: scroll;
                scrollbar-width: none;
                background-color: rgb(32, 32, 32);
                position: absolute;
                bottom: 0px;
                width: 95%;
                display: flex;
                box-sizing:border-box;
                margin: 10px;
                    justify-content: space-between;
                .cart {
                     padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    width:100%;
                }
            }
        }

        .image {
            position: relative;
            width: 70%;
            aspect-ratio: 16 / 9;
            border-radius: 25px;
            overflow: hidden;
            z-index: 0;
            scrollbar-width: none;

            &::before {
                content: "";
                position: absolute;
                top: -20px;
                left: -20px;
                right: -20px;
                bottom: -20px;
                background: radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0) 80%,
                    rgba(255, 255, 255, 0.6)
                );
                border-radius: 35px;
                pointer-events: none;
                z-index: 10;
            }
        }
    }
`;
export default Game;
