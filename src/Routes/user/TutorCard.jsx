// TutorCard.jsx
import React from "react";

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <img
        src={tutor.tutor.profilePicture}
        alt="Tutor Profile"
        className="w-20 h-20 rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{`${tutor.tutor.firstName} ${tutor.tutor.lastName}`}</h3>

      <p className="text-gray-600 mb-2">{tutor.tutor.experience}</p>
      <p className="text-gray-600 mb-2">{tutor.tutor.currentLevel}</p>

      <div className="flex space-x-2">
        <strong>Courses: </strong>
        {tutor.tutor.courses.map((course, index) => (
          <span key={index} className="text-blue-500">
            {course}
          </span>
        ))}
      </div>
      <div className="flex space-x-2 mt-4">
        <strong>Availability: </strong>
        {tutor.tutor.availability.map((day, index) => (
          <span key={index} className="text-green-500">
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TutorCard;
