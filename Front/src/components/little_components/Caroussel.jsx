import { useState } from "react";
import styled from "styled-components";

function Carrousel({ image, video }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState("next");
    const items = [...image, ...video];
    const currentItem = items[current];
    console.log(items);
    const next = () => {
        setDirection("next");
        setCurrent((prev) => (prev + 1) % items.length);
    };
    const prev = () => {
        setDirection("prev");
        setCurrent((prev) => (prev - 1 + items.length) % items.length);
    };

    const slideTo = (index) => setCurrent(index);
    return (
        <>
            <Carousel>
                <div className="carousel-value">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${
                                index === current ? `active ${direction}` : ""
                            }`}
                        >
                            {item.type === "image" ? (
                                <img
                                    src={item.image}
                                    alt={`Image ${index + 1}`}
                                />
                            ) : (
                                <video
                                    src={item.movie?.max}
                                    controls
                                    autoPlay
                                    muted
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="carousel-controls">
                    <span onClick={prev} className="button-1">
                        ◀
                    </span>
                    <div className="span-change">
                        {items.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => slideTo(index)}
                                className={index === current ? "active" : ""}
                            ></span>
                        ))}
                    </div>
                    <span className="span-value">
                        {current + 1} / {items.length}
                    </span>
                    <span onClick={next} className="button-2">
                        ▶
                    </span>
                </div>
            </Carousel>
        </>
    );
}

const Carousel = styled.div`
    width: 80%;
    margin: auto;
    text-align: center;
    position: relative;
    scrollbar-width: none;
    .carousel-value {
        position: relative;
        width: 100%;
        height: 700px;
        overflow: hidden;
        display: flex;

        .carousel-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: translateX(0px);
            transition: transform 0.5s ease, opacity 0.5s ease;
            z-index: 1;
            img,
            video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 25px;
            }
            &.active {
                opacity: 1;
                z-index: 2;
            }
            &.active.next{
                animation: slide-left 1s forwards;
            }
            &.active.prev{
                animation: slide-right 1s forwards;
            }
        }
    }

    .carousel-controls {
        .button-1 {
            position: absolute;
            left: 10px;
            top: 50%;
            z-index: 100;
            font-size: 2rem;
            cursor: pointer;
        }
        .button-2 {
            position: absolute;
            right: 10px;
            top: 50%;
            z-index: 100;
            font-size: 2rem;
            cursor: pointer;
        }
        .span-value {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 25px;
            z-index: 100;
        }

        .span-change {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 50px;
            z-index: 100;
            display: flex;
            gap: 5px;
            span {
                border: 2px solid white;
                padding: 8px;
                border-radius: 50%;
                cursor: pointer;
            }
            span.active {
                background-color: white;
            }
        }
    }
    @keyframes slide-right {
        from {
            transform: translateX(-50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
     @keyframes slide-left {
        from {
            transform: translateX(50px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
export default Carrousel;
