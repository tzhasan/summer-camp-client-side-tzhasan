import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from "../../../src/Shared Component/Loading";
import { AuthContext } from '../../Provider/AuthProvider';


const ClassesPage = () => {
  const { user, loading } = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure()

  // get all classes for Classes page
  const {data, isLoading} = useQuery({
    queryKey: ['classesPage', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/allclasses/classesPage");
      return res.data
    }
    
  })
  console.log(user?.email);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className='text-xl md:text-3xl text-center font-semibold text-sky-600 my-6'>All Classes by Our Expert Instructors</h2>
      {/* cards */}
      <div className='p-10 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4'>
        { user?.email && !isLoading &&
          data.map(course => {
            return (
              <div
                key={course._id}
                className="card w-full bg-sky-100 shadow-xl image-full"
              >
                <figure>
                  <img src={course?.imgurl} />
                </figure>
                <div className="card-body ">
                  <h2 className="card-title text-xl md:text-4xl">
                    {course?.coursename}
                  </h2>
                  <p className="text-lg md:text-2xl font-semibold">
                    Instructor: {course.instructorname}
                  </p>
                  <p className="text-lg md:text-2xl">
                    Available Seats: {course.seats}
                  </p>
                  <p className="text-lg md:text-2xl">Price: ${course.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary projectMainButton">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
      {/* cards */}
    </div>
  );
};

export default ClassesPage;