import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
// TODO: all requirments labels need to add red color *
// TODO: Send gender info
// TODO: reset and navigate not working
// todo: hide unhide password like login page 

const Register = () => {
  const navigate = useNavigate();
  // const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const { createAccount, updateUserProfile, googleSignIn, user } = useContext(AuthContext)
  console.log(user);

  useEffect(() => {
    if (password2 === password) {
      setError2("");
    } else {
      setError2("Password does not match");
    }
  }, [password, password2]);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (
      !/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$/.test(
        newPassword
      )
    ) {
      setError(
        "Password must be at least 6 characters long, contain at least one lowercase letter, one uppercase letter, and one special character."
      );
    } else {
      setError("");
    }
  };

  const handlePasswordConfirm = (event) => {
    const newPassword = event.target.value;
    setPassword2(newPassword);
  };

  // Submit
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log({ data });
    if (data.password2 !== data.password) {
      setError2("Password don't match");
      return;
    } else {
      setError2("");
    }
    const {
      name,
      password,
      email,
      photoURL,
    } = data;
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
            role: 'student'
          };
          fetch("http://localhost:5000/users", {
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
      <div></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] mx-auto mt-20 mb-10"
      >
        <h1 className="text-2xl md:4xl font-bold text-center my-10">
          Register
        </h1>

        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Your name
          </label>
          <input
            {...register("name", { required: true, maxLength: 20 })}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Bill Gates"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email Address is required" })}
            // aria-invalid={errors.mail ? "true" : "false"}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@email.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Photo URL (Optional)
          </label>
          <input
            {...register("photoURL")}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Photo URL Jpg/png/webp"
          />
        </div>
        {/* gender */}
        <div className="my-6 flex gap-4 items-center ">
          <span className="block  text-lg font-medium text-gray-900 dark:text-white">
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
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            {...register("password", { required: true, maxLength: 20 })}
            onChange={handlePasswordChange}
            type="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {error && <div className="text-red-600">{error}</div>}
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input
            {...register("password2", { required: true, maxLength: 20 })}
            onChange={handlePasswordConfirm}
            type="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
          {error2 && <div className="text-red-600">{error2}</div>}
        </div>
        {/* password */}

        <button
          type="submit"
          className="text-white w-full bg-[#380fb6] hover:bg-[#250681] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg md:text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>

        <div className="my-4 text-lg font-medium text-gray-900 dark:text-gray-300">
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
