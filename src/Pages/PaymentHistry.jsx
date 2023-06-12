import React, { useContext } from 'react';
import Loading from '../Shared Component/Loading';
import useAxiosSecure from '../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Provider/AuthProvider';
import useTitle from '../Hooks/useTitle';
import NodataFound from '../Shared Component/NodataFound';

const PaymentHistry = () => {
  useTitle("Payment History")
   const { user } = useContext(AuthContext);
   const [axiosSecure] = useAxiosSecure();
   const { data, isLoading } = useQuery({
     queryKey: ["paymentHistry"],
     queryFn: async () => {
       const res = await axiosSecure.get(`/paymentHistry/${user?.email}`);
       return res.data;
     },
   });
  
  function convertToNormalDate(timestamp) {
    const createdDate = new Date(timestamp * 1000);
    const formattedDate = createdDate.toLocaleString(); // Adjust the date format as desired
    return formattedDate;
  }
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
              <th>trans ID</th>
              <th>Created</th>
              <th>Payment Type</th>
              <th>Paid</th>
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
                      <td className="font-bold">{course?.transactionId}</td>
                      <td className="font-bold">
                        {convertToNormalDate(course?.created)}
                      </td>
                      <td className="font-bold">{course?.paymentMethod}</td>
                      <td className="font-bold text-green-500">
                        ${course?.price}
                      </td>
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

export default PaymentHistry;