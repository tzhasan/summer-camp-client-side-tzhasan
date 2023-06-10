import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared Component/Loading';
import { AuthContext } from '../../../Provider/AuthProvider';
import useTitle from '../../../Hooks/useTitle';

const EnrolledClasses = () => {
  useTitle("Enrolled Classes")
  const {user} = useContext(AuthContext) 
  const [axiosSecure] = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["popularInstructor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClass/${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text1">
              <th>No</th>
              <th>Cover</th>
              <th>Instructor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {user?.email &&
              data &&
              data.map((course, i) => {
                return (
                  <tr key={i} className="text-lg">
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={course?.imgurl}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{course?.courseName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{course?.instructorname}</td>
                    <td>
                      <button className="projectMainButton">
                        View Modules
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClasses;