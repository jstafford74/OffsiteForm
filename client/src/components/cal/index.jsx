import React, { useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';



// export default function Example() {
//     const [disabledDays,setDisabledDays] = useState ()


//     return <DayPicker
//         month={new Date(2018, 8)}
//         fromMonth={new Date(2018, 8)}
//         toMonth={new Date(2018, 11)}
//         fixedWeeks
//     />
// }

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.state = {
            
            selectedDay: null,
        };
    }

    handleDayClick(day, { selected }) {
        this.setState({
            selectedDay: selected ? undefined : day,
        });
    }

    render() {
        return (
            <div>
                <DayPicker
                    month={new Date(2020, 1)}
                    fromMonth={new Date(2020, 1)}
                    toMonth={new Date(2020, 12)}
                    fixedWeeks
                    selectedDays={this.state.selectedDay}
                    onDayClick={this.handleDayClick}
                />
                <p>
                    {this.state.selectedDay
                        ? this.state.selectedDay.toLocaleDateString()
                        : 'Please select a day 👻'}
                </p>
            </div>
        );
    }
}