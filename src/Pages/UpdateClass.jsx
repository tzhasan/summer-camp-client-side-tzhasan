import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../Hooks/UseAxiosSecure';
import useInstractor from '../Hooks/useInstractor';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const UpdateClass = () => {
  const {user} = useContext(AuthContext)
  const { id } = useParams()
  const [isInstructor] = useInstractor()
  const [axiosSecure] = useAxiosSecure()
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["updateClass", isInstructor],
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/update/${id}`);
      return res.data;
    },
  });


  // onSubmit is called
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  
  const onSubmit = async (formdata) => { 
    console.log("data", formdata);
    const newData = {
      coursename: formdata.coursename,
      price: parseFloat(formdata.price),
      totalseats: parseFloat(formdata.seats),
      imgurl: formdata.imgurl,
    };

    await axiosSecure
      .patch(`/classes/updateData/${id}`, newData)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update data successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          refetch()
        }
      })
      .catch((err) => {
        console.log(err.error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Already exists",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }



  return (
    <div>
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={data?.coursename}
                {...register("coursename", { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-md md:text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-600 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />

              <label className="peer-focus:font-medium absolute text-md md:text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Course/Class Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={data?.imgurl}
                {...register("imgurl", { required: true })}
                type="text"
                className="block py-2.5 px-0 w-full text-md md:text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-600 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md md:text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Image URL
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={user && user?.displayName}
                readOnly
                type="text"
                {...register("instructorname", { required: true })}
                className="block py-2.5 px-0 w-full text-md md:text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-600 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md md:text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Instructor Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={user && user?.email}
                readOnly
                type="text"
                {...register("email", { required: true })}
                className="block py-2.5 px-0 w-full text-md md:text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-600 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md md:text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Instructor Email
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={data?.totalseats}
                type="number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                {...register("seats", { required: true })}
                className="block py-2.5 px-0 w-full text-md md:text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-600 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md md:text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Total Seats
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                defaultValue={data?.price}
                type="number"
                {...register("price", { required: true })}
                className="block py-2.5 px-0 w-full text-md md:text-2xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-600 focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-md md:text-2xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-focus:dark:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Price
              </label>
            </div>
          </div>
          <button type="submit" className="projectMainButton">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;