import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { EVENTS } from './constants';
import './styles.css';

function GoogleCalendar() {

    const [events, setEvents] = useState([]);

    const timeToMinutes = useCallback((time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }, [])

    const timeSlots = useMemo(() => {
        const slots = [];
        for (let i = 0; i < 13; i++) {
            slots.push(`${i < 10 ? `0${i}` : i}:00`);
        }
        return slots;
    }, []);

    const renderTimeSlots = () => {
        return timeSlots.map((item, index) => <div className='time-slot' key={`${index}--${item}`}>{item}</div>)
    }

    const generateEvents = useCallback(() => {
        const sortedEvents = [...EVENTS].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start))
        let lastEnd = 0;
        let overlapCount = 0;

        return sortedEvents.map((event, index) => {
            
            const eventStartInMinutes = timeToMinutes(event.start);
            const eventEndInMinutes = timeToMinutes(event.end);

            if(lastEnd > eventStartInMinutes) {
                overlapCount++;
            } else {
                overlapCount = 1;
            }

            const offsetLength = `${overlapCount * 100}px`

            lastEnd = Math.max(lastEnd, eventEndInMinutes);

            return {
                ...event,
                id: `${index}--${event.title}`,
                top: `${eventStartInMinutes}px`,
                height: `${eventEndInMinutes - eventStartInMinutes}px`,
                left: offsetLength
            }
        })
    }, [timeToMinutes]);

    useEffect(() => {
        setEvents(generateEvents());
    }, [generateEvents])

    return (
        <div className='calendar'>
            <div className='time-slots'>
                {renderTimeSlots()}
            </div>
            {
                events.map((item) => 
                    <div 
                        key={item.id}
                        className='event' 
                        style={{
                            left: item.left,
                            top: item.top,
                            height: item.height,
                            backgroundColor: item.color
                        }}
                    >
                        {item.title}
                    </div>
                )
            }
        </div>
    )
}

export default GoogleCalendar;