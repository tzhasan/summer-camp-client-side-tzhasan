import React, { useContext } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usersFromAdmin/users");
      return res.data;
    },
  });
  console.log(data);

  if (loading) {
    return <p>Loading...</p>;
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
              <th>Current Role</th>
              <th>Make Admin</th>
              <th>Make Instructor</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {user &&
              data.map((user, i) => {
                return (
                  <tr key={i} className="text-lg">
                    <th>
                      <td>{i + 1}</td>
                    </th>
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
                    <td className="font-bold">{user?.role}</td>
                    <td>
                      <button className="projectMainButton">Admin</button>
                    </td>
                    <th>
                      <button className="projectMainButton">Instructor</button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
