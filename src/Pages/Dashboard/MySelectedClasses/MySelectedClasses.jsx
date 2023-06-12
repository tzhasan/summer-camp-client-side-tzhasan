import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import Loading from '../../../Shared Component/Loading';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useTitle from '../../../Hooks/useTitle';
import NodataFound from '../../../Shared Component/NodataFound';

const MySelectedClasses = () => {
  useTitle("Selected Classes");
  const {user} = useContext(AuthContext)
  const [axiosSecure] = useAxiosSecure()
  const { data, refetch } = useQuery({
    queryKey: ['selectedClass',user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/selectedClasses/${user?.email}`)
      return res.data
    }
  })
  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/deleteClassForStudent/${id}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Course Deleted !!",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
    })
  }
  if (!data && !user) {
    return <Loading></Loading>
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
              <th>Price</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {user?.email && data ? (
              data.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <NodataFound />
                  </td>
                </tr>
              ) : (
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
                            <div className="font-bold">
                              {course?.courseName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-bold">{course?.instructorname}</td>
                      <td className="font-bold text-red-500">
                        ${course?.price}
                      </td>
                      <td>
                        {course?.enrolled ? (
                          <p className="text-green-600 md:text-2xl text-xl font-semibold">
                            Paid
                          </p>
                        ) : (
                          <Link to={`/dashboard/payment/${course._id}`}>
                            <button
                              disabled={course?.enrolled}
                              className="btn projectMainButton"
                            >
                              Pay
                            </button>
                          </Link>
                        )}
                      </td>
                      <th>
                        <button
                          disabled={course?.enrolled}
                          onClick={() => handleDelete(course.courseId)}
                          className="btn projectMainButton"
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })
              )
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClasses;