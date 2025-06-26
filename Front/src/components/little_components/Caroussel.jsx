import { useState } from "react";
import styled from "styled-components";

function Carrousel({ image, video }) {
    const [current, setCurrent] = useState(0);
    const items = [...image, ...video];
    const currentItem = items[current];
    console.log(items);
    const next = () => setCurrent((prev) => (prev + 1) % items.length);
    const prev = () =>
        setCurrent((prev) => (prev - 1 + items.length) % items.length);
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
                    <button onClick={prev}>◀</button>
                    <span>
                        {current + 1} / {items.length}
                    </span>
                    <button onClick={next}>▶</button>
                </div>
            </Carousel>
        </>
    );
}

const Carousel = styled.div`
    width: 80%;
    margin: auto;
    text-align: center;

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
        margin-top: 10px;
        display: flex;
        justify-content: center;
        gap: 20px;
    }
`;
export default Carrousel;
