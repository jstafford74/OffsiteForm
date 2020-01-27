

import React from 'react';
import Plx from "react-plx";
import Arrange from '../Arrange';

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


const textData3 = [
    {
        start: "self",
        duration: "100vh",
        easing: "easeInQuad",
        properties: [
            {
                startValue: .2,
                endValue: 1,
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

                </Plx>

                <div className="plx2" style={{ height: "10vh" }} />
                <Arrange />


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

                </Plx>

                <div style={{ height: "10vh" }} />
            </div >
        );
    }
}