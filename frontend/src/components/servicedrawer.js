import React, { useState } from "react";
import { CalendarDaysIcon ,XMarkIcon } from '@heroicons/react/24/solid';

export default function Services() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '' }]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Date:', date);
    console.log('Time Slots:', timeSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][field] = value;
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-center my-[3%]">
        <button className="h-full w-[12%] rounded-3xl text-gray-600 text-xl text-center border-dashed border-2 border-gray-400 hover:border-gray-600" type="button" onClick={handleDrawerToggle} data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form">
          Add Services
        </button>
      </div>

      <div id="drawer-form" className={`fixed top-0 left-0 z-40 h-screen w-[27%] p-4 overflow-y-auto transition-transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"} bg-gray-800 w-1/3`} tabIndex="-1" aria-labelledby="drawer-form-label" >
        <h5 id="drawer-label" className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          <CalendarDaysIcon className="h-5 w-5 mr-2"/>
          New Service
        </h5>
        <button type="button" onClick={handleDrawerToggle} data-drawer-target="drawer-form" data-drawer-show="drawer-form" aria-controls="drawer-form" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-7 h-7 absolute top-3 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
          <XMarkIcon />
        </button>

        <form className="space-y-2" action="/home" method="post" onSubmit={handleSubmit}>
          <div>
            <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Service Title" required />
          </div>
          <div>
            <label for="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input type="text" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Image URL" required />
          </div>
          <div>
            <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Price (Rs.)" required />
          </div>
          <div>
            <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Write event description..."></textarea>
          </div>
          <div >
            <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div>
            <div className="text-sm font-medium text-white mb-2">Time Slots</div>
            {timeSlots.map((slot, index) => (
              <div key={index} className="flex flex-row items-center justify-between py-1">
                <div className="w-full">
                  <input type="time" id={`starttime-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={slot.startTime} onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)} required />
                </div>
                <div className="px-4 text-sm font-medium text-white">to</div>
                <div className="w-full">
                  <input type="time" id={`endtime-${index}`} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-slate-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={slot.endTime} onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)} required />
                </div>
              </div>
            ))}
            <button type="button" onClick={addTimeSlot} className="text-blue-500 hover:underline cursor-pointer focus:outline-none">
              Add Time Slot
            </button>
            </div>
          <button type="submit" className="text-white justify-center flex items-center bg-blue-600 hover:bg-blue-700 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add Service</button>
        </form>
      </div>
    </div>
  );
}