import React from "react";
import ReactTyped from "react-typed";
import "./style.css"

const MainTyping = () => (
    <div className='justify-content-center'>
        <h4>
            <span>

                <ReactTyped
                    strings={[
                        'Accurate Skin Examinations',
                        'Early Detection of Skin Disease',
                        'Skin Cancer Prevention',
                        'Survival.....'
                    ]}
                    startDelay={1000}
                    typeSpeed={45}
                    backSpeed={55}
                    backDelay={1500}
                    ReactTyped
                    cursorChar="|"
                    loopCount={3}
                    smartBackspace
                    fadeOut
                    className='text-primary'
                    fadeOutDelay="2500"
                />
            </span>
        </h4>
    </div>
);

export default MainTyping;
