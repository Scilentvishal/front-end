"use client";
import { getAllStudents, isLogin } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation"; // Corrected import
import React, { useEffect, useState } from "react";

const page = (ctx) => {
  const id = ctx.params.id;

  const [student, setStudent] = useState({
    name: "",
    email: "",
    hobbies: [],
    gender: "",
    mobile: "",
    profileImage: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);
      if (!loggedIn) {
        router.push("/");
      }
    };
    const students = async () => {
      const getstudents = await getAllStudents();
      const foundStudent = getstudents.find((s) => s._id === id);

      if (foundStudent) {
        setStudent({
          ...foundStudent, // Ensure hobbies is an array
        });
      }
    };

    authenticate();
    students();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setStudent((prevData) => ({
          ...prevData,
          hobbies: [...prevData.hobbies, value],
        }));
      } else {
        setStudent((prevData) => ({
          ...prevData,
          hobbies: prevData.hobbies.filter((hobby) => hobby !== value),
        }));
      }
    } else {
      setStudent((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(student);
    const formData = new FormData();
    formData.append("_id", id);
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("hobbies", student.hobbies.join(",")); // Convert hobbies array to string
    formData.append("gender", student.gender);
    formData.append("mobile", student.mobile);

    if (profileImageFile) {
      formData.append("profile", profileImageFile);
    }
    console.log(`FormData: ${formData.profileImageFile}`);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/editstudent",
        formData
      );
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit User
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={student.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={student.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <h4 className="text-white my-3">Hobbies</h4>
                <div className="flex items-center">
                  <input
                    id="playing"
                    type="checkbox"
                    value="playing"
                    name="hobbies"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                    checked={student?.hobbies?.includes("playing")}
                  />
                  <label
                    htmlFor="playing"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                  >
                    Playing
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="study"
                    type="checkbox"
                    value="study"
                    name="hobbies"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                    checked={student?.hobbies?.includes("study")}
                  />
                  <label
                    htmlFor="study"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                  >
                    Study
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="programming"
                    type="checkbox"
                    value="programming"
                    name="hobbies"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                    checked={student?.hobbies?.includes("programming")}
                  />
                  <label
                    htmlFor="programming"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                  >
                    Programming
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="teaching"
                    type="checkbox"
                    value="teaching"
                    name="hobbies"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                    checked={student?.hobbies?.includes("teaching")}
                  />
                  <label
                    htmlFor="teaching"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                  >
                    Teaching
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-white my-3">Gender</h4>

                <div className="flex items-center mb-4">
                  <input
                    id="male"
                    type="radio"
                    value="Male"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                    checked={student.gender === "Male"}
                  />
                  <label
                    htmlFor="male"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="female"
                    type="radio"
                    value="Female"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                    checked={student.gender === "Female"}
                  />
                  <label
                    htmlFor="female"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="other"
                    type="radio"
                    value="Other"
                    name="gender"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                    checked={student.gender === "Other"}
                  />
                  <label
                    htmlFor="other"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize"
                  >
                    Other
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Mobile
                </label>
                <input
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="eg: - 9933090789"
                  value={student.mobile}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              {/* <div>
                <label
                  htmlFor="profileImageFile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Profile Image
                </label>
                <input
                  type="file"
                  name="profile"
                  id="profileImageFile"
                  onChange={(e) => setProfileImageFile(e.target.files[0])}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div> */}
              <div>
                <img src={student?.profileImage} alt="" />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
