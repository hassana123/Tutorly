import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";

const TutorProfile = () => {
  const location = useLocation();
  const { tutor } = location.state;
  const [showBooking, setShowBooking] = useState(false);

  const handleBookSession = () => {
    setShowBooking(true);
  };
  const closeBookSession = () => {
    setShowBooking(false);
  };
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // Add more form fields as needed

  const handleBooking = () => {
    // Implement booking logic here
    // Send booking request to the server, update the database, etc.
    // Close the form after successful booking
  };

  return (
    <section className="md:flex h-screen bg-gray-200 py-5 ">
      <div className="">
        {/* Tutor Profile Section */}
        <div className="bg-gray-100 p-6 shadow-md ">
          <NavLink
            to="/userdashboard"
            className="text-blue-500 underline hover:text-blue-700 transition duration-300"
          >
            Back to Dashboard
          </NavLink>
          <img
            src={tutor.tutor.profilePicture}
            alt="Tutor Profile"
            className="w-[50%] rounded-[9px] mb-4"
          />
          <h2 className="text-3xl font-semibold mb-4">
            {tutor.tutor.firstName} {tutor.tutor.lastName}
          </h2>
          <p className="text-gray-600 mb-2">{tutor.tutor.email}</p>
          <p className="text-gray-600 mb-4">{tutor.tutor.description}</p>
          <p className="text-gray-600 mb-2">
            <strong>Department: </strong>
            {tutor.tutor.facultyDepartment}
          </p>

          <div className="flex space-x-2 mt-4">
            <strong>Availability: </strong>
            {tutor.tutor.availability.map((day, index) => (
              <span
                key={index}
                className="text-green-500 border border-green-500 px-2 py-1 rounded-md"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleBookSession}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Book a Session
            </button>
          </div>
        </div>
      </div>
      {/* Booking Session Interface Section */}
      {showBooking && (
        <div className="bg-white text-black w-[50%] text-center  py-4 mx-auto h-[59vh] shadow-lg ">
          <button
            onClick={closeBookSession}
            className="bg-red-500 block mx-5 my-5 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
          {/* Form fields go here */}

          <label className="block mt-5 mb-2">Date:</label>
          <input
            className="bg-white block border-[3px] mx-auto text-center text-black w-[60%] py-2 rounded-md"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block mt-5 mb-2">Time:</label>
          <input
            className="bg-white block border-[3px] mx-auto text-center text-black w-[40%] py-2 rounded-md"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          {/* Add more form fields as needed */}

          {/* Submit button */}
          <button
            onClick={handleBooking}
            className="bg-blue-500 block mx-auto my-5 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Book Session
          </button>
        </div>
      )}
    </section>
  );
};

export default TutorProfile;
