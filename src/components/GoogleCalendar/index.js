import React, { useCallback, useMemo } from 'react';
import { EVENTS } from './constants';
import './styles.css';

function GoogleCalendar() {

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

    const renderTimeSlots = useMemo(() => {
        return timeSlots.map((item, index) => <div key={`${index}--${item}`} className='time-slot'>{item}</div>)
    }, [timeSlots]);

    const sortedEvents = useMemo(() => [...EVENTS].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)), [timeToMinutes]);

    const eventPositions = useMemo(() => {
        let lastEnd = 0;
        let overlapCount = 0;

        return sortedEvents.map((event, index) => {
            const eventStartInMinutes = timeToMinutes(event.start);
            const eventEndInMinutes = timeToMinutes(event.end);

            if (eventStartInMinutes < lastEnd) {
                overlapCount++;
            } else {
                overlapCount = 1;
            }

            const offsetLeft = 60 + (overlapCount - 1) * 100;
            lastEnd = Math.max(lastEnd, eventEndInMinutes);

            return {
                ...event,
                id: `${index}--${event.name}`,
                top: eventStartInMinutes,
                height: eventEndInMinutes - eventStartInMinutes,
                left: offsetLeft
            };
        });
    }, [sortedEvents, timeToMinutes]);

    return (
        <div className='calendar'>
            {renderTimeSlots}
            {
                eventPositions.map((item) =>
                    <div className='event' key={item.id} style={{ backgroundColor: item.color, top: item.top, left: item.left, height: item.height }}>
                        {item.title}
                    </div>
                )
            }
        </div>
    )
}

export default GoogleCalendar;