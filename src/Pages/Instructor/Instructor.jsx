import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import Loading from '../../Shared Component/Loading';

const Instructor = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["/allInstructors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allInstructors")
      return res.data;
    },
  });
  console.log(data && data);
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
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              data &&
              data.map((user, i) => {
               
                return (
                  <tr key={i} className="text-lg">
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={user?.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{user?.email}</td>
                    <td className="font-bold">{user?.role}</td>
                    <td className="btn btn-outline mt-3 ">See Classes</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Instructor;