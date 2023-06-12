import React, { useContext } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";
import Loading from "../../../Shared Component/Loading";
import useTitle from "../../../Hooks/useTitle";
const ManageUsers = () => {
  useTitle("Manage Users")
  const [isAdmin, isAdminLoading] = useAdmin();
  
  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);

  const { data, refetch } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usersFromAdmin/users");
      return res.data;
    },
  });

  // Change Role factch
  const handleChangeRole = async (role, id, name) => {
    await axiosSecure
      .patch(`/changeUserRole/${id}`, { role })
      .then((res) => {
        const update = res.data;
        if (update.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} is ${role} now !!`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  if (loading || !user) {
    return <Loading/>
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
            {user?.email && isAdmin && !isAdminLoading && data &&
              data.map((user, i) => {
                const isAdmin = user.role === "admin";
                const isInstructor = user.role === "instractor";
                return (
                  <tr key={i} className="text-lg text-gray-500">
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
                    <td className="font-bold">{user?.role}</td>
                    <td>
                      <button
                        disabled={isAdmin}
                        onClick={() =>
                          handleChangeRole("admin", user._id, user.name)
                        }
                        className={`projectMainButton btn`}
                      >
                        Admin
                      </button>
                    </td>
                    <th>
                      <button
                        disabled={isInstructor || isAdmin}
                        onClick={() =>
                          handleChangeRole("instractor", user._id, user.name)
                        }
                        className={`projectMainButton btn`}
                      >
                        Instractor
                      </button>
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
