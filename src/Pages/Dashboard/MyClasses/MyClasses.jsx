import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useInstractor from '../../../Hooks/useInstractor';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loading from '../../../Shared Component/Loading';
import useTitle from '../../../Hooks/useTitle';
import { Link } from 'react-router-dom';
// todo: should work on update button
const MyClasses = () => {
  useTitle("My Classes")
  const { user } = useContext(AuthContext)
  const [isInstructor] = useInstractor()
  const [axiosSecure] = useAxiosSecure()

  const { data ,isLoading,refetch} = useQuery({
    queryKey: ["myallclasses",user],
    queryFn: async () => {
    const res=  await axiosSecure.get(`/myclasses/${user?.email}`)
        return res.data
    }
  })
  if (!data && isLoading) {
    return <Loading/>
  }
  return (
    <div className="flex flex-col gap-4 ">
      {data.map((course, i) => {
        return (
          <section
            className="text-gray-600 body-font border-2 rounded-lg bg-sky-100 py-4"
            key={i}
          >
            <div
              className="container mx-auto flex px-5 md:flex-row flex-col items-center"
              bis_skin_checked={1}
            >
              <div
                className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"
                bis_skin_checked={1}
              >
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src={course.imgurl}
                />
              </div>
              <div
                className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"
                bis_skin_checked={1}
              >
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  {course.coursename}
                </h1>
                <p className=" text-lg md:text-xl mb-4  text-gray-900">
                  Status:{" "}
                  <span
                    className={`${
                      course.status === "Approved"
                        ? "text-green-500"
                        : course.status === "Pending"
                        ? "text-yellow-500"
                        : course.status === "Denied"
                        ? "text-red-500"
                        : "text-gray-900"
                    }`}
                  >
                    {course.status}
                  </span>
                </p>
                <p className=" text-lg md:text-xl mb-4  text-gray-900">
                  Total Seats: {course.totalseats}
                </p>
                <p className=" text-lg md:text-xl mb-4  text-gray-900">
                  Total enrolled students: {course.enrolled}
                </p>
                <p className=" text-lg md:text-xl mb-4  text-gray-900">
                  Available Seats: {course.availableSeats}
                </p>
                <p className=" text-lg md:text-xl mb-4  text-gray-900">
                  Admin's Feedback:{" "}
                  <span className="text-gray-500">{course.feedback}</span>
                </p>
                <div className="flex justify-center" bis_skin_checked={1}>
                  <Link to={`/dashboard/updateClassOfInstructor/${course._id}`}>
                    <button className="projectMainButton">Update</button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MyClasses;