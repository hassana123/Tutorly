// ProfileForm.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { updateUserProfile } from "../../firebase";
const ProfileForm = () => {
  const { dispatch, currentUser } = useContext(AuthContext);
  //const userData = currentUser.userData;
  const userId = currentUser.userId;
  const [userData, setUserData] = useState({
    firstName: currentUser.userData.firstName,
    lastName: currentUser.userData.lastName,
    userName: currentUser.userData.userName,
  });
  console.log(userData, currentUser.userData);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    // Handle image upload logic (can use a library like react-dropzone)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call a function to update the user profile
      await updateUserProfile(currentUser.userId, userData);
      console.log("Profile updated successfully!");
      // Dispatch the UPDATE action after the profile is updated
      dispatch({ type: "UPDATE", payload: { userData, userId } });
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          name="userName"
          value={userData.userName}
          onChange={handleChange}
        />
      </label>
      {/* <label>
        Profile Picture:
        <input type="file" onChange={handleImageChange} />
      </label> */}
      <button
        className="bg-blue-500 block py-5 px-10 my-5 rounded-lg"
        type="submit"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileForm;
