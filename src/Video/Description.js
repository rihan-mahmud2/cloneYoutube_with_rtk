import React, { useEffect } from "react";
import edit from "../assets/edit.svg";
import deleted from "../assets/delete.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteVideoMutation } from "../features/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
const Description = ({ video }) => {
  const navigate = useNavigate();
  const { title, date, id, description } = video || {};
  const [deleteVideo, { isLoading, isError, isSuccess }] =
    useDeleteVideoMutation();
  const handleDelete = () => {
    deleteVideo(id);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b">
        <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
          Uploaded on {date}
        </h2>

        <div className="flex gap-10 w-48">
          <div className="flex gap-1">
            <Link to={`/edit/${id}`} className="shrink-0">
              <img className="w-5 block" src={edit} alt="Edit" />
            </Link>
            <Link
              to={`/edit/${id}`}
              className="text-sm leading-[1.7142857] text-slate-600"
            >
              Edit
            </Link>
          </div>
          <div className="flex gap-1">
            <div className="shrink-0">
              <img
                onClick={handleDelete}
                className="w-5 block"
                src={deleted}
                alt="Delete"
              />
            </div>

            {isLoading && (
              <div
                onClick={handleDelete}
                className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer"
              >
                Loading
              </div>
            )}

            {isError && <Error message="" />}
            {isSuccess && <Success message="video was deleted sucessfully" />}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
        {description}
      </div>
    </div>
  );
};

export default Description;
