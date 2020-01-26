

import React from 'react';
import Plx from "react-plx";

const textData = [
    {
        start: ".plx1",
        duration: "100vh",
        easing: "easeInQuad",
        properties: [

            {
                startValue: 1,
                endValue: 0,
                property: "opacity",
                unit: ""
            }
        ]
    }
]


const textData2 = [
    {
        start: "self",
        duration: "100vh",

        easing: "easeInQuad",
        properties: [
            {
                startValue: 1,
                endValue: 0,
                property: "opacity",
                unit: ""
            }
        ]
    }
];
const textData3 = [
    {
        start: "self",
        duration: "100vh",
        easing: "easeInQuad",
        properties: [
            {
                startValue: 1,
                endValue: 0,
                property: "opacity",
                unit: ""
            }
        ]
    }
];


export default class PLX extends React.Component {
    render() {
        return (
            <div>
                <div className="plx1" style={{ height: "40vh" }} >
                </div>

                <Plx
                    parallaxData={textData}
                    style={{
                        height: "40vw",
                        width: "60vw",
                        margin: "auto",
                        border: "2px solid white",
                        backgroundColor: "blue"
                    }}
                >
                    {/* Place your content here */}
                </Plx>

                <div className="plx2" style={{ height: "10vh" }} />

                <Plx
                    parallaxData={textData2}
                    style={{
                        height: "40vw",
                        width: "60vw",
                        margin: "auto",
                        border: "2px solid red",
                        backgroundColor: "red"
                    }}
                >
                    {/* Place your content here */}
                </Plx>
                <div className="plx3" style={{ height: "10vh" }} />
                <Plx
                    parallaxData={textData3}
                    style={{
                        height: "40vw",
                        width: "60vw",
                        margin: "auto",
                        border: "2px solid blue",
                        backgroundColor: "green"
                    }}
                >
                    {/* Place your content here */}
                </Plx>

                <div style={{ height: "10vh" }} />
            </div >
        );
    }
}