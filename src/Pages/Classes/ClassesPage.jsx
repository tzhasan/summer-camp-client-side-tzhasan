import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../src/Shared Component/Loading";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useInstractor from "../../Hooks/useInstractor";
import useTitle from "../../Hooks/useTitle";

const ClassesPage = () => {
  useTitle("Classes")
  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstractor()
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const location = useLocation()
  const navigate = useNavigate()

  // get all classes for Classes page
  const { data, isLoading } = useQuery({
    queryKey: ["classesPage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allclasses/classesPage");
      return res.data;
    },
  });

  const handleAddCartSelect = async (course) => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login first",
        showConfirmButton: false,
        timer: 1500,
      });
      const state = { from: location };
      navigate("/login", { state });
      return
    }
    const selectedCourse = {
      studentName: user.displayName,
      studentEmail: user.email,
      studentImg: user.photoURL,
      courseName: course.coursename,
      instructorEmail: course.email,
      imgurl: course.imgurl,
      instructorname: course.instructorname,
      price: course.price,
      courseId: course._id,
      enrolled: false,
    };
    await axiosSecure
      .post(`/addtocart`, selectedCourse)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Course Selected",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err.message));
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-xl md:text-3xl text-center font-semibold text-sky-600 my-6">
        All Classes by Our Expert Instructors
      </h2>
      {/* cards */}
      <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 ">
        {
          data &&
          data.map((course) => {
            return (
              <div
                key={course._id}
                className={`card p-1 w-full group ${
                  course.availableSeats <= 0
                    ? "bg-red-500"
                    : isAdmin || isInstructor
                    ? "bg-red-500"
                    : "bg-green-200"
                } shadow-xl image-full`}
              >
                <figure>
                  <img
                    className="group-hover:scale-125 
              transition "
                    src={course?.imgurl}
                  />
                </figure>
                <div className="card-body ">
                  <h2 className="card-title text-xl md:text-4xl">
                    {course?.coursename}
                  </h2>
                  <p className="text-lg md:text-2xl font-semibold">
                    Instructor: {course.instructorname}
                  </p>
                  <p className="text-lg md:text-2xl">
                    Total Seats: {course.totalseats}
                  </p>
                  <p className="text-lg md:text-2xl">
                    Available Seats: {course.totalseats - course.enrolled}
                    {/* it should be dynamic from database */}
                  </p>
                  <p className="text-lg md:text-2xl">Price: ${course.price}</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => handleAddCartSelect(course)}
                      className="btn btn-primary projectMainButton"
                      disabled={
                        course.availableSeats <= 0 ||
                        isAdmin === true ||
                        isInstructor === true
                      }
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {/* cards */}
    </div>
  );
};

export default ClassesPage;
