import { currencyFormatter } from "../utls/currencyFomrmatter";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import moment from "moment";
import { useState } from "react";
import ProjectForm from "./ProjectForm";

const ProjectDetails = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
  };
  const handleUpdate = async () => {
    setIsModalOpen(true);
    setIsOverlayOpen(true);
  };

  const handleOverlay = () => {
    setIsModalOpen(false);
    setIsOverlayOpen(false);
  };
  return (
    <div className="project bg-stone-200/50 p-5 rounded-md shadow-md border border-stone-300 flex flex-col gap-5 w-[30rem]">
      <div className="top">
        <span className="text-sky-600">ID: {project._id}</span>
        <h3 className="text-2xl font-medium text-gray-800/75 truncate">
          {project.title}
        </h3>
        <span className="text-gray-500/75 -tracking-widest uppercase font-medium text-xs">
          {project.tech}
        </span>
      </div>
      <div className="mid flex gap-10">
        <div className="left flex flex-col">
          <span>Budget: {currencyFormatter(project.budget)}</span>
          <span>
            Added: {moment(project.createdAt).format("DD-MMM hh:mm A")}
          </span>
          <span>
            Updated: {moment(project.updatedAt).format("DD-MMM hh:mm A")}
          </span>
        </div>
        <div className="right flex flex-col">
          <span>Manager: {project.manager}</span>
          <span>Developers: {project.dev}</span>
          <span>
            Duration:{" "}
            {`${project.duration} week${project.duration === 1 ? "" : "s"}`}
          </span>
        </div>
      </div>
      <div className="bottom flex gap-5">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 py-2 text-white px-5 rounded-md shadow-sm hover:bg-blue-700 duration-300"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600/50 duration-300"
        >
          Delete
        </button>
      </div>
      {/* overlay */}
      <div
        onClick={handleOverlay}
        className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrip-blur-sm top-0 left-0 bottom-0 right-0 ${
          isOverlayOpen ? "" : "hidden"
        }`}
      ></div>
      {/* modal */}
      <div
        className={`update-modal w-[35rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-100 p-10 rounded-md shadow-md border-stone-200 z-[2] ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <h2 className="text-4xl font-medium text-gray-600 mb-10">
          Update project
        </h2>
        <ProjectForm
          project={project}
          setIsModalOpen={setIsModalOpen}
          setIsOverlayOpen={setIsOverlayOpen}
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
