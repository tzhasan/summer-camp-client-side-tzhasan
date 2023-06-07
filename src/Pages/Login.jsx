import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../Hooks/UseAuth';
import useTitle from '../Hooks/useTitle';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
  const navigate = useNavigate()
      useTitle("Login");
  const { user, signIn, googleSignIn } = useContext(AuthContext);
   // Submit
  const { register, handleSubmit } = useForm();
  const [hide,setHide] = useState(true)

  

  const onSubmit = (data) => { 
    signIn(data.email, data.password)
      .then(result => {
        const user = result.user;
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Logged in Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        // TODO: reset()
        // reset()
          navigate('/')
        
      })
  }

  const handlegoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const user = result.user;
        const savedUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        // navigate(from, { replace: true });
      })
      .catch((err) => {
        // setLoading(false);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] mx-auto mt-20 mb-10"
      >
        <h1 className="text-2xl md:4xl font-bold text-center my-10">
          Login here
        </h1>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email Address is required" })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@email.com"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type={hide ? "password" : "text"}
            {...register("password", { required: true, maxLength: 20 })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light "
            required
          />
          <button
            type="button"
            onClick={() => setHide(!hide)}
            className="absolute indent-5 top-[50%] right-2 text-gray-500 dark:text-gray-300"
          >
            {hide ? "Show" : "Hide"}
          </button>
        </div>
        <div className="my-2 text-sm">
          {/* TODO "error" */}
          <p className="text-red-600"></p>
        </div>

        <button
          type="submit"
          className="text-white w-full bg-[#380fb6] hover:bg-[#250681] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>

        <div className="my-4 text-sm font-medium text-gray-900 dark:text-gray-300">
          New here ?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Go for create account!
          </Link>
        </div>
      </form>
      <div className="w-[80%] mx-auto mt-6 mb-16">
        <div className="divider">OR</div>

        <button
          onClick={handlegoogleSignIn}
          className="btn bg-[#380fb6] hover:bg-[#250681] text-sm md:text-xl text-white w-full my-4"
        >
          {" "}
          <FcGoogle className="mr-2 text-3xl"></FcGoogle> Sign in With Google
        </button>
      </div>
    </div>
  );
};

export default Login;