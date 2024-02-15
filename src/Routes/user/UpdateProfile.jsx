import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import ProfileForm from "./ProfileForm";
const UpdateProfile = () => {
  const [edit, setEdit] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const userData = currentUser.userData;
  const userId = currentUser.userId;

  console.log(userData);
  console.log(currentUser);

  console.log(userId);
  const handlEdit = () => {
    setEdit(true);
  };
  return (
    <>
      {edit ? (
        <ProfileForm />
      ) : (
        <div>
          <h1>
            hey {userData.firstName} {userData.lastName}
          </h1>
          <p>{userData.email}</p>
          <p>{userData.userName}</p>
          <button
            className="bg-blue-500 block py-5 px-10 my-5 rounded-lg"
            onClick={handlEdit}
          >
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
