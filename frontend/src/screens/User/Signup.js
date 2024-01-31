import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import { useUserStore } from '../../store';

export default function UserSignup() {
  let navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://propshop-api.onrender.com/user/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target.elements.username.value,
        email: e.target.elements.email.value,
        contactno: e.target.elements.contactno.value,
        password: e.target.elements.password.value
      })
    });
    const j = await response.json();
    if (j.success) {
      setUser(j.id, j.username, j.email, j.contactno);
      navigate("/user/myapppointments");
    }
    else {
      alert(j.message);
    }
  }
  
  return (
    <div className="bg-slate-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-4xl font-bold text-teal-700 tracking-tight">
          <img className="w-10 h-10 mr-2" src={logo} alt="" />
          PROPSHOP
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-center text-xl font-semibold text-gray-900 md:text-2xl dark:text-gray-900">
              Create and account
            </h1>
            <form className="space-y-4 md:space-y-6" action="/user/signup" method="post" onSubmit={handleSubmit}>
              <div>
                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400 focus:border-none" placeholder="Name" required />
              </div>
              <div>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400 focus:border-none" placeholder="Email address" required />
              </div>
              <div>
                <input type="text" name="contactno" id="contactno" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400 focus:border-none" placeholder="Contact Number" required />
              </div>
              <div>
                <input type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-zinc-100 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400" required />
              </div>
              <button type="submit" className="w-full text-white  bg-teal-600 hover:bg-teal-700/90 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                Create an account
              </button>
              <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link to="/user/signin" className="font-medium text-teal-600 hover:underline cursor-pointer ml-2">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};