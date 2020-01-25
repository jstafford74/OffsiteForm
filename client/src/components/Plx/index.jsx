

import React from 'react';
import Plx from "react-plx";

const textData = [
    {
        start: "self",
        startOffset: "0",
        end: "self",
        endOffset: "50vh",
        easing: "easeInQuad",
        properties: [
            {
                startValue: 0,
                endValue: -60,
                property: "translateY",
                unit: "vh"
            }
        ]
    }
];

const textData2 = [
    {
        start: "self",
        startOffset: "0",
        end: "self",
        endOffset: "50vh",
        easing: "easeInQuad",
        properties: [
            {
                startValue: 60,
                endValue: 0,
                property: "translateX",
                unit: "vw"
            }
        ]
    }
];
const textData3 = [
    {
        start: "self",
        startOffset: "0",
        end: "self",
        endOffset: "70vh",
        easing: "easeInQuad",
        properties: [
            {
                startValue: -60,
                endValue: 0,
                property: "translateX",
                unit: "vw"
            }
        ]
    }
];


export default class PLX extends React.Component {
    render() {
        return (
            <div>
                <div style={{ marginTop: "0vh" }}>
                    <h2>Scroll down</h2>
                </div>

                <div style={{ height: "20vh" }} />

                <Plx
                    parallaxData={textData}
                    style={{
                        height: "20vw",
                        width: "60vw",
                        margin: "auto",
                        border: "2px solid white"
                    }}
                >
                    {/* Place your content here */}
                </Plx>

                <div style={{ height: "5vh" }} />

                <Plx
                    parallaxData={textData2}
                    style={{
                        height: "20vw",
                        width: "60vw",
                        margin: "auto",
                        border: "2px solid red"
                    }}
                >
                    {/* Place your content here */}
                </Plx>
                <div style={{ height: "15vh" }} />
                <Plx
                    parallaxData={textData3}
                    style={{
                        height: "20vw",
                        width: "60vw",
                        margin: "auto",
                        border: "2px solid blue"
                    }}
                >
                    {/* Place your content here */}
                </Plx>

                <div style={{ height: "10vh" }} />
            </div >
        );
    }
}