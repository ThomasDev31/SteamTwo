import { useState } from "react";
import styled from "styled-components";

function Carrousel({ image, video }) {
    const [current, setCurrent] = useState(0);
    const items = [...image, ...video];
    const currentItem = items[current];
    console.log(items);
    const next = () => setCurrent((prev) => (prev + 1) % items.length);
    const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);
    const slideTo = (index) => setCurrent(index)
    return (
        <>
            <Carousel>
                <div className="carousel-value">
                    {currentItem.type === "image" ? (
                        <img
                            src={currentItem.image}
                            alt={`Image ${current + 1}`}
                        />
                    ) : (
                        <video
                            src={currentItem.movie?.max}
                            controls
                            autoPlay
                            muted
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    )}
                </div>

                <div className="carousel-controls">
                    <span onClick={prev} className="button-1">◀</span>
                    <div className="span-change">
                        {items.map((_, index) => (
                            <span key={index} onClick={() => slideTo(index)} className={index === current ? "active": ""}></span>
                        ))}
                    </div>
                    <span className="span-value">
                        {current + 1} / {items.length}
                    </span>
                    <span onClick={next} className="button-2">▶</span>
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
    scrollbar-width:none;

    .carousel-value img,
    .carousel-value video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        border-radius: 25px;
        position: relative;
        z-index: 2;
    }

    .carousel-controls {
        .button-1 {
            position: absolute;
            left: 10px;
            top: 50%;
            z-index: 100;
            font-size:2rem;
            cursor: pointer;
        }
        .button-2 {
            position: absolute;
            right: 10px;
            top: 50%;
            z-index: 100;
            font-size:2rem;
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
            display:flex;
            gap:5px;
            span{
                border:2px solid white;
                padding:8px;
                border-radius:50%;
                cursor: pointer;
            }
            span.active{
                background-color:white;
            }
           
        }
    }
`;
export default Carrousel;
