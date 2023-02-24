import { currencyFormatter } from "../utls/currencyFomrmatter";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectDetails = ({ project }) => {
  const { dispatch } = useProjectsContext();

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/api/projects/${project._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_PROJECT", payload: json });
    }
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
            Added on: {new Date(project.createdAt).toLocaleDateString()}
          </span>
          <span>
            Last updated: {new Date(project.updatedAt).toDateString()}
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
        <button className="bg-sky-400 py-2 text-gray-900 px-5 rounded-md shadow-sm hover:bg-sky-200/50 duration-300">
          Update
        </button>
        <button
          onClick={handleDelete}
          className="text-rose-500 hover:text-rose-500/50 duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
