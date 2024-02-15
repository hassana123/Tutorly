import React, { useState, useEffect, useContext } from "react";
import TutorCard from "./TutorCard";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
import { AuthContext } from "../../authContext/AuthContext";

const User = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useContext(AuthContext);
  const userData = currentUser.userData;
  const userId = currentUser.userId;
  const [availableTutors, setAvailableTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const navigate = useNavigate();
  console.log(currentUser);
  console.log(userId);
  useEffect(() => {
    // Fetch available tutors
    const fetchTutors = async () => {
      try {
        const tutorsSnapshot = await getDocs(collection(firestore, "tutors"));
        const tutorsData = tutorsSnapshot.docs.map((doc) => doc.data());
        setAvailableTutors(tutorsData);
        setFilteredTutors(tutorsData);
        // console.log(tutorsData);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);
  //console.log(availableTutors);
  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Filter tutors based on the search query
    const filteredTutors = availableTutors.filter((tutor) => {
      return (
        tutor.tutor.firstName.toLowerCase().includes(lowerCaseQuery) ||
        tutor.tutor.lastName.toLowerCase().includes(lowerCaseQuery) ||
        tutor.tutor.courses.some((course) =>
          course.toLowerCase().includes(lowerCaseQuery)
        ) ||
        tutor.tutor.currentLevel.toLowerCase().includes(lowerCaseQuery)
      );
    });

    // Update the state with the filtered tutors
    setFilteredTutors(filteredTutors);
  };
  // const tutorsData = [
  //   {
  //     firstName: "John",
  //     lastName: "Doe",
  //     userName: "john_doe_tutor",
  //     email: "john.doe.tutor@example.com",
  //     courses: ["GSP 101", "MTH 201"],
  //     availability: ["Monday", "Wednesday", "Friday"],
  //     experience: "2 years of tutoring experience",
  //     description:
  //       "I am a passionate tutor who enjoys helping students excel in their studies.",
  //     currentLevel: "Ph.D. Candidate",
  //     facultyDepartment: "Engineering",
  //     profilePicture: "https://example.com/john_doe_profile.jpg",
  //   },
  //   {
  //     firstName: "Alice",
  //     lastName: "Smith",
  //     userName: "alice_smith_tutor",
  //     email: "alice.smith.tutor@example.com",
  //     courses: ["EEP 301", "PHY 202"],
  //     availability: ["Tuesday", "Thursday"],
  //     experience: "3 years of tutoring experience",
  //     description:
  //       "I have a strong background in Physics and enjoy helping students grasp complex concepts.",
  //     currentLevel: "Master's Student",
  //     facultyDepartment: "Science",
  //     profilePicture: "https://example.com/alice_smith_profile.jpg",
  //   },

  //   {
  //     firstName: "Emma",
  //     lastName: "Johnson",
  //     userName: "emma_johnson_tutor",
  //     email: "emma.johnson.tutor@example.com",
  //     courses: ["CHE 101", "GSP 201"],
  //     availability: ["Wednesday", "Friday"],
  //     experience: "1 year of tutoring experience",
  //     description:
  //       "Chemistry is my passion, and I love helping students understand complex concepts.",
  //     currentLevel: "Bachelor's Student",
  //     facultyDepartment: "Science",
  //     profilePicture: "https://example.com/emma_johnson_profile.jpg",
  //   },
  //   {
  //     firstName: "Daniel",
  //     lastName: "Williams",
  //     userName: "daniel_williams_tutor",
  //     email: "daniel.williams.tutor@example.com",
  //     courses: ["PHY 201", "MTH 401"],
  //     availability: ["Tuesday", "Thursday"],
  //     experience: "4 years of tutoring experience",
  //     description:
  //       "Physics and Advanced Mathematics are my areas of expertise.",
  //     currentLevel: "Ph.D. Candidate",
  //     facultyDepartment: "Science",
  //     profilePicture: "https://example.com/daniel_williams_profile.jpg",
  //   },
  //   {
  //     firstName: "Sophia",
  //     lastName: "Miller",
  //     userName: "sophia_miller_tutor",
  //     email: "sophia.miller.tutor@example.com",
  //     courses: ["CSE 101", "EEE 301"],
  //     availability: ["Monday", "Friday"],
  //     experience: "2 years of tutoring experience",
  //     description:
  //       "I enjoy teaching Computer Science and Electrical Engineering topics.",
  //     currentLevel: "Master's Student",
  //     facultyDepartment: "Engineering",
  //     profilePicture: "https://example.com/sophia_miller_profile.jpg",
  //   },
  //   {
  //     firstName: "Michael",
  //     lastName: "Johnson",
  //     userName: "michael_johnson_tutor",
  //     email: "michael.johnson.tutor@example.com",
  //     courses: ["GSP 201", "MTH 301"],
  //     availability: ["Monday", "Wednesday", "Friday"],
  //     experience: "4 years of tutoring experience",
  //     description:
  //       "I specialize in advanced mathematics and am dedicated to helping students achieve their academic goals.",
  //     currentLevel: "Ph.D. Candidate",
  //     facultyDepartment: "Mathematics",
  //     profilePicture: "https://example.com/michael_johnson_profile.jpg",
  //   },

  //   {
  //     firstName: "Emily",
  //     lastName: "Brown",
  //     userName: "emily_brown_tutor",
  //     email: "emily.brown.tutor@example.com",
  //     courses: ["PHY 101", "GSP 301"],
  //     availability: ["Tuesday", "Thursday"],
  //     experience: "2 years of tutoring experience",
  //     description:
  //       "I am passionate about Physics and aim to make learning enjoyable for my students.",
  //     currentLevel: "Master's Student",
  //     facultyDepartment: "Science",
  //     profilePicture: "https://example.com/emily_brown_profile.jpg",
  //   },
  // ];
  // useEffect(() => {
  //   const addToFirestore = async () => {
  //     try {
  //       const tutorsCollectionRef = collection(firestore, "tutors");

  //       // Iterate through tutorsData and add each tutor as a separate document
  //       for (const tutor of tutorsData) {
  //         await addDoc(tutorsCollectionRef, {
  //           tutor: tutor,
  //         });
  //       }

  //       console.log("Tutors added to Firestore!");
  //     } catch (error) {
  //       console.error("Error adding tutors to Firestore: ", error);
  //     }
  //   };

  //   addToFirestore();
  // }, []); // Only run this effect once, similar to componentDidMount
  const handleViewProfile = (tutor) => {
    // Navigate to the tutor's profile page and pass tutor data as state
    navigate(`/user/tutorprofile/${tutor.tutor.userName}`, {
      state: { tutor },
    });
  };

  return (
    <section className="bg-white text-black py-10">
      <div className="mx-auto p-8">
        <h1 className="text-5xl font-semibold mb-8">
          Welcome to Your Dashboard, {userData?.firstName}!
        </h1>

        {/* User Information Section */}
        <div className="mb-8">
          {/* Display user information, such as name, email, profile picture, etc. */}
          {/* You can use Tailwind CSS classes for styling */}
          <div className="flex items-center space-x-4">
            <img
              src={userData?.profilePicture}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">
                {userData?.firstName} {userData?.lastName}
              </p>
              <p className="text-gray-500">{userData?.email}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search Tutors..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(); // Call handleSearch on each input change for real-time searching
            }}
            className="border-[2px] bg-white w-[70%] py-4 px-3 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white p-4 px-5 rounded-lg"
          >
            Search
          </button>
        </div>
        {/* Available Tutors Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Tutors</h2>
          {filteredTutors.length === 0 ? (
            <p>No tutors found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor, index) => (
                <div key={index}>
                  <TutorCard tutor={tutor} />
                  <button
                    className="text-blue-500 underline"
                    onClick={() => handleViewProfile(tutor)}
                  >
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Other Dashboard Features */}
        {/* Add other features, such as enrolled courses, upcoming sessions, etc. */}
      </div>
    </section>
  );
};

export default User;
