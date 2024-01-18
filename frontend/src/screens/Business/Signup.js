import React from "react";
import { useNavigate, Link, useParams } from 'react-router-dom';
import {useBusinessStore} from '../../store';

export default function BusinessSignup() {
    let navigate = useNavigate();
    const {businessId, setBusiness}= useBusinessStore();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const response= await fetch("http://localhost:4000/business/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username: e.target.elements.username.value, 
          email: e.target.elements.email.value, 
          contactno: e.target.elements.contactno.value, 
          location: e.target.elements.location.value,
          image: e.target.elements.image.value,
          description: e.target.elements.description.value,
          password: e.target.elements.password.value 
        })
      });
      const j = await response.json();
      console.log(j);
      if (j.success) {
        setBusiness(j.id);
        navigate("/business/myservices");
      }
      else {
        console.log("Business Signup Error");
      }
    }
  
    return (
        <div className="bg-gray-400 dark:bg-slate-100 py-10">
            <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto md:h-full lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-4xl font-bold text-gray-200 dark:text-blue-700">
                    <img className="w-10 h-10 mr-2" src={"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"} alt="" />
                    Propshop
                </Link>
                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0 dark:bg-white">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-semibold text-gray-900 md:text-2xl dark:text-gray-900">
                            Register you Salon
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="/business/signup" method="post" onSubmit={handleSubmit}>
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
                                <input type="text" name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400 focus:border-none" placeholder="Location" required />
                            </div>
                            <div>
                                <input type="text" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400 focus:border-none" placeholder="Image URL" required />
                            </div>
                            <div>
                                <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400 focus:border-none" placeholder="Description" />
                            </div>
                            <div>
                                <input type="password" name="password" id="password" placeholder="Password" className="bg-gray-50 border border-zinc-100 text-gray-900 sm:text-base rounded-md block w-full p-2.5 dark:bg-transparent dark:border-gray-300 dark:placeholder-gray-500 focus:placeholder-gray-400" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                                Create an account
                            </button>
                            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                                Already have an account?
                                <Link to="/business/signin" className="font-medium text-blue-600 hover:underline cursor-pointer ml-2">
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};