import React from 'react';
import Plx from "react-plx";
import Arrange from '../Arrange';
import { Col, Row } from 'react-bootstrap';
import ';

const textData = [
    {
        start: ".plx1",
        duration: "200vh",
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
            <div className="justify-content-center">
                <div className="plx1" style={{ height: "70vh" }} >
                    <h3 className="text-success">
                        Frequent Systematic Skin Examinations Reduce Mortality
                    </h3>
                    <Row >
                        <Col md={4}>
                            <h5 style={{ lineHeight: 1.4 }}>
                                Advanced analytic techniques used to classify and recognize close-up(dermascopic) images of the skin are 30% more accurate than the typical skin exam. Utilizing a proven format of scanning, re-scanning and delivering actionable reports, Melanoscan is able to more accurately and sooner detect problematic spots on the human body.
                            </h5>
                        </Col>
                        <Col md={4}>
                            <h5 style={{ lineHeight: 1.4 }}>

                                With the world's largest dataset of paired images involving skin lesions, abnormal skin hue, respitory action and clinical outcomes, Melanoscan brings a powerful A.I. engine capable of finding the world's smallest Melanoma and assisting the current ecosystem achieve a practical cure for skin cancer mortality.
                            </h5>

                        </Col>
                        <Col md={4}>
                            <h5 style={{ lineHeight: 1.4 }}>
                                In the United States,skin cancer is the <strong className="text-danger">most common cancer</strong>, as more people are diagnosed than all other cancers combined each year.  Melanoscan has reduced the average number of biopsies needed to find 1 melanoma by <strong className="text-success">500%</strong>, and thereby costs to find the deadly disease by similar amounts.
                            </h5>
                        </Col>
                    </Row>
                    <h5>

                    </h5>
                </div>

                <Plx
                    parallaxData={textData}
                    style={{
                        height: "20vw",
                        width: "60vw",
                        margin: "auto",

                    }}
                >
                    <Row>
                        <Col>
                            <h1 style={{ lineHeight: '1.8' }}>Utilizing 3TB of storage and over 20yrs of critical <code>[Key:Value]</code> image pairs, Our AI engine will <strong className="text-success">SHATTER</strong> & disrupt the landscape for not only early detection of skin diseases, but also adminitering primary care.</h1>
                        </Col>
                    </Row>
                </Plx>

                <div className="plx2" style={{ height: "20vh" }} />
                <Arrange />
                <div className="plx3" style={{ height: "20vh" }} />
                <Plx
                    parallaxData={textData3}
                    style={{
                        height: "40vh",
                        width: "60vw",
                        margin: "auto",

                    }}
                >
                    <hr />
                    <Row>
                        <Col>
                            <h3 style={{ lineHeight: '1' }}>The Melanoscan mobile scanning booth operates within a secure HIPPA compliant network protocol that puts the patient's privacy and care first.  Within a few minutes, an onsite medical practice can be deployed to ensure employees and stakeholders receive optimal care without sacrificing time or travel away from work.</h3>
                        </Col>
                    </Row>
                </Plx>

                <div style={{ height: "10vh" }} />
            </div >
        );
    }
}