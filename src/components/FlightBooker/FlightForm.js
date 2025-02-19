import React, { useState } from 'react'
import { FLIGHTS, TODAY } from './constants';
import { formatDate } from './helper';
import './styles.css';

function FlightForm() {

    const [flightOption, setFlightOption] = useState(FLIGHTS.ONE_WAY);
    const [departureDate, setDepartureDate] = useState(formatDate(TODAY));
    const [arrivalDate, setArrivalDate] = useState(departureDate);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(flightOption == FLIGHTS.ONE_WAY) {
            alert(`Flight Successfully Booked for ${departureDate}`);
        } else {
            alert(`Flight Successfully Booked for Departure on ${departureDate} and Arrival on ${arrivalDate}`);
        }
    }

    return (
        <form className="flight-booker" onSubmit={handleSubmit}>
            <select value={flightOption} onChange={(e) => setFlightOption(e.target.value)}>
                <option value={FLIGHTS.ONE_WAY}>One Way Flight</option>
                <option value={FLIGHTS.RETURN}>Return Flight</option>
            </select>

            <input 
                type='date'
                value={departureDate}
                min={TODAY}
                onChange={(e) => setDepartureDate(e.target.value)}
            />

            {
                flightOption == FLIGHTS.RETURN &&
                <input 
                    type='date'
                    value={arrivalDate}
                    min={departureDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                />
            }

            <button>
                Book Flight
            </button>
            
        </form>
    )
}

export default FlightForm