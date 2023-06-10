import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Shared Component/Loading";
import useTitle from "../../../Hooks/useTitle";

const ManageClasses = () => {
  useTitle("Manage Classes")
  const feedbackButtonRef = useRef(null);
  const [axiosSecure] = useAxiosSecure();
  const [modalId, setModalId] = useState("");
  const feedbackRef = useRef(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classesFromAdmin/classes");
      return res.data;
    },
  });

  // Change status factch
  const handleChangeStatus = async (status, id, name) => {
    await axiosSecure
      .patch(`/updatestatus/${id}`, { status })
      .then((res) => {
        const update = res.data;
        if (update.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${status} Done !! Add a Feedback`,
            showConfirmButton: false,
            timer: 2000,
          });
          refetch();
          if (status === "Denied" || status === "Approved") {
            // window.my_modal_5.showModal();
            feedbackButtonRef.current.dispatchEvent(new MouseEvent("click"));
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const showModal = (id) => {
    setModalId(id);
  };

  const handleFeedback = async () => {
    const feedbackValue = feedbackRef.current.value;
    await axiosSecure
      .patch(`/addfeedback/admin/${modalId}`, { feedbackValue })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Feedback sent",
            showConfirmButton: false,
            timer: 1500,
          });
          feedbackRef.current.value = "";
        }
      });
  };

  if (!data && isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* <h2 className="text-2xl font-bold text-sky-600  my-4">All { data.length} classes Are here.</h2> */}
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
                  <p className=" text-xl md:text-2xl mb-4 font-medium text-gray-900">
                    Instructor : {course.instructorname}
                  </p>
                  <p className=" text-lg md:text-xl mb-4  text-gray-900">
                    Email: {course.email}
                  </p>
                  <p className=" text-lg md:text-xl mb-4  text-gray-900">
                    Total Seats: {course.totalseats}
                  </p>
                  <p className=" text-lg md:text-xl mb-4  text-gray-900">
                    Enrolled: {course.enrolled}
                  </p>
                  <p className=" text-lg md:text-xl mb-4  text-gray-900">
                    Available Seats: {course.totalseats - course.enrolled}
                  </p>
                  <p className=" text-lg md:text-xl mb-4  text-gray-900">
                    Price: ${course.price}
                  </p>
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
                      } font-bold`}
                    >
                      {course.status}
                    </span>
                  </p>
                  <div className="flex justify-center" bis_skin_checked={1}>
                    <button
                      onClick={() => handleChangeStatus("Approved", course._id)}
                      className="btn inline-flex text-black bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                      disabled={
                        course.status === "Denied" ||
                        course.status === "Approved"
                      }
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleChangeStatus("Denied", course._id)}
                      className="btn ml-4 inline-flex text-white bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-red-400 rounded text-lg"
                      disabled={
                        course.status === "Denied" ||
                        course.status === "Approved"
                      }
                    >
                      Deny
                    </button>
                    <button
                      onClick={() => {
                        window.my_modal_5.showModal();
                        showModal(course._id);
                      }}
                      className="ml-4 inline-flex text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
                    >
                      Feedback
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
        {/*  */}
        {/* Open the modal using ID.showModal() method */}

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Send Feedback to Instructor</h3>
            <textarea
              ref={feedbackRef}
              className="textarea textarea-info w-full my-4"
              placeholder="Feedback"
            ></textarea>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                ref={feedbackButtonRef}
                onClick={() => handleFeedback()}
                className="projectMainButton"
              >
                Send Feedback
              </button>
              <button className="projectMainButton">Close</button>
            </div>
          </form>
        </dialog>
        {/*  */}
      </div>
    </div>
  );
};

export default ManageClasses;
