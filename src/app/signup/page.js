"use client";
import { isLogin } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hobbies: [],
    gender: "",
    mobile: "",
    profileImage: ""
  });
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          hobbies: [...prevData.hobbies, value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          hobbies: prevData.hobbies.filter((hobby) => hobby !== value),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/register", formData).then((res)=>{
      console.log(res)
      router.push('/login')
      
    }).catch((err)=> {
      console.log(err)
    })
    console.log(formData);
  };

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn)
      if (loggedIn) {
       router.push("/")
      }
    };

    authenticate()
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
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
                  type="name"
                  name="name"
                  id="name"
                  value={formData.name}
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
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  value={formData.mobile}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="profileImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter profile Url
                </label>
                <input
                  type="text"
                  name="profileImage"
                  id="profileImage"
                  placeholder="Enter Url"
                  value={formData.profileImage}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
