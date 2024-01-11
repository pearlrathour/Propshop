import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./card";
import { useBusinessStore } from '../../store';
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Services() {
    let navigate = useNavigate();
    const [services, setServices] = useState([]);
    const { businessId } = useBusinessStore();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [dateSlot, setDateSlot] = useState({ startDate: '', endDate: '' });
    const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '' }]);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({
            id: businessId,
            name: e.target.elements.name.value,
            image: e.target.elements.image.value,
            price: e.target.elements.price.value,
            description: e.target.elements.description.value,
            date: dateSlot,
            timeslots: timeSlots,
        })
        const response = await fetch("http://localhost:4000/business/addservice", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: businessId,
                name: e.target.elements.name.value,
                image: e.target.elements.image.value,
                price: e.target.elements.price.value,
                description: e.target.elements.description.value,
                date: dateSlot,
                timeslots: timeSlots
            })
        });
        setDrawerOpen(!drawerOpen);
        navigate("/business/myservices");
    };

    const handleDateChange = (field, value) => {
        const updatedDateSlot = { ...dateSlot };
        updatedDateSlot[field] = value;
        setDateSlot(updatedDateSlot);
    };

    const addTimeSlot = () => {
        if (timeSlots.length === 0)
            setTimeSlots([...timeSlots, { startTime: '', endTime: '' }])
        else {
            const s = timeSlots[timeSlots.length - 1].startTime;
            const e = timeSlots[timeSlots.length - 1].endTime;
            if (s !== "" && e != "")
                setTimeSlots([...timeSlots, { startTime: '', endTime: '' }])
            else
                alert("Please select start and end time of slot")
        }
    };

    const handleTimeChange = (index, field, value) => {
        const updatedTimeSlots = [...timeSlots];
        updatedTimeSlots[index][field] = value;
        setTimeSlots(updatedTimeSlots);
    };

    useEffect(() => {
        async function loadData() {
            const response = await fetch('http://localhost:4000/business/myservices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: businessId
                })
            });

            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        }
        loadData();
    }, [services.length]);

    return (
        <div className="w-full flex flex-row flex-wrap px-10 py-6 justify-start items-start text-3xl text-gray-400">
            {services.map((service) => (
                <Link key={service._id} to={`/business/myservices/${service._id}`} className="basis-1/4 cursor-pointer">
                    <Card service={service} />
                </Link>
            ))}
        </div>
    );
};