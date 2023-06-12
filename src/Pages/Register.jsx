import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
// TODO: all requirments labels need to add red color *
// TODO: Send gender info
// at the last of this page have codes for imagebb photo upload , need to do later

const Register = () => {
  const navigate = useNavigate();
  // const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const { createAccount, updateUserProfile, googleSignIn, user } =
    useContext(AuthContext);
  console.log(user);

  // Submit
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, password, email, photoURL } = data;
    console.log(name, password, email, photoURL);
    createAccount(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(data.name, photoURL).then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            photoURL: photoURL,
            role: "student",
          };
          fetch("https://summer-camp-server-tzhasan.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
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
                reset();
                navigate("/");
              }
            });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handlegoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const user = result.user;
        const savedUser = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: "student",
        };
        fetch("https://summer-camp-server-tzhasan.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Signed in by Google successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] mx-auto mt-20 mb-10"
      >
        <h1 className="text-2xl md:4xl font-bold text-center my-10">
          Register
        </h1>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-500 dark:text-white">
            Your name
          </label>
          <input
            {...register("name", { required: true, maxLength: 20 })}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Bill Gates"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-500 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email Address is required" })}
            // aria-invalid={errors.mail ? "true" : "false"}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@email.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-500 dark:text-white">
            Photo URL (Optional)
          </label>
          <input
            type="text"
            {...register("photoURL", { required: true })}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Photo URL Jpg/png/webp"
          />
        </div>
        {/* gender */}
        <div className="my-6 flex gap-4 items-center ">
          <span className="block  text-lg font-medium text-gray-500 dark:text-white">
            Gender
          </span>
          <div>
            <select className="w-40" {...register("gender")}>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        {/* gender */}

        {/* password */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-500 dark:text-white">
            Your password
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/,
                message:
                  "Password must contain at least one capital letter and one special character.",
              },
            })}
            type="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {errors.password && (
            <div className="text-red-600">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-500 dark:text-white">
            Confirm Password
          </label>
          <input
            {...register("password2", {
              required: true,
              maxLength: 20,
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
            type="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {errors.password2 && (
            <div className="text-red-600">{errors.password2.message}</div>
          )}
        </div>
        {/* password */}

        <button
          type="submit"
          className="text-white w-full bg-[#380fb6] hover:bg-[#250681] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg md:text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>

        <div className="my-4 text-lg font-medium text-gray-500 dark:text-gray-300">
          Already have account ?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Go to Login!
          </Link>
        </div>
      </form>
      <div className="w-[80%] mx-auto mt-6 mb-16">
        <div className="divider">OR</div>

        <button
          onClick={handlegoogleSignIn}
          className="btn bg-[#380fb6] hover:bg-[#250681] text-lg md:text-xl text-white w-full my-4"
        >
          {" "}
          <FcGoogle className="mr-2 text-3xl"></FcGoogle> Sign in With Google
        </button>
      </div>
    </div>
  );
};

export default Register;

// console.log(data);
// const formData = new FormData();
// formData.append("image", data.image[0]);
// console.log(formData);
// console.log(data.photoURL[0]);

// fetch(img_hosting_url, {
//   method: "POST",
//   body: formData,
// })
//   .then((res) => res.json())
//   .then((imgResponse) => {
//     if (imgResponse.success) {
//       const imgURL = imgResponse.data.display_url;
//       console.log(imgURL);
//     }
//   });
