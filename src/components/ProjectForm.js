import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProjectForm = ({ project, setIsModalOpen, setIsOverlayOpen }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyfields] = useState([]);

  const { dispatch } = useProjectsContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in!");
      return;
    }

    // data
    const projectObj = { title, tech, budget, duration, manager, dev };

    // if there is no project
    if (!project) {
      // post request
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );

      const json = await res.json();

      // ste error
      if (!res.ok) {
        setError(json.error);
        setEmptyfields(json.emptyFields);
      }

      // reset
      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDev("");
        setError(null);
        setEmptyfields([]);
        dispatch({ type: "CREATE_PROJECTS", payload: json });
      }
      return;
    }

    // there is a project, send patch request
    if (project) {
      //send patch
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(projectObj),
        }
      );

      const json = await res.json();
      // !res.ok
      if (!res.ok) {
        setError(json.error);
        setEmptyfields(json.emptyFields);
      }
      // res.ok
      if (res.ok) {
        setError(null);
        setEmptyfields([]);

        // dispatch
        dispatch({ type: "UPDATE_PROJECT", payload: json });

        // close overlay modal
        setIsModalOpen(false);
        setIsOverlayOpen(false);
      }
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className="project-form flex flex-col gap-5">
      <h2
        className={`text-4xl font-medium text-gray-600 mb-10 ${
          project ? "hidden" : ""
        }`}
      >
        Add a new project
      </h2>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="title"
          className=" cursor-pointer hover:text-sky-600 duration-300"
        >
          Project title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="e.g e-commerce website"
          id="title"
          className={`bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("title")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="tech"
          className=" cursor-pointer hover:text-sky-600 duration-300"
        >
          Technologies
        </label>
        <input
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          type="text"
          placeholder="node.js, react, redux etc."
          id="tech"
          className={`bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("tech")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="tbudget"
          className=" cursor-pointer hover:text-sky-600 duration-300"
        >
          Budget (in USD)
        </label>
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="e.g 500"
          id="budget"
          className={`bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("budget")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="duration"
          className=" cursor-pointer hover:text-sky-600 duration-300"
        >
          Duration (in weeks)
        </label>
        <input
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          type="number"
          placeholder="e.g 3"
          id="duration"
          className={`bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("duration")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="manager"
          className=" cursor-pointer hover:text-sky-600 duration-300"
        >
          Manager
        </label>
        <input
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          type="text"
          placeholder="e.g Mr Habib"
          id="manager"
          className={`bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("manager")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>
      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="dev"
          className=" cursor-pointer hover:text-sky-600 duration-300"
        >
          Developers
        </label>
        <input
          value={dev}
          onChange={(e) => setDev(e.target.value)}
          type="number"
          placeholder="e.g 4"
          id="dev"
          className={`bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300 ${
            emptyFields?.includes("developer")
              ? "border-rose-500"
              : "border-slate-500"
          }`}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 py-2 text-white rounded-md shadow-sm hover:bg-blue-700 duration-300"
      >
        {project ? "Confirm Update" : "Add Project"}
      </button>
      {error && (
        <p className="bg-rose-500/20 text-rose-500 border border-rose-700 p-2 rounded-md">
          {error}
        </p>
      )}
    </form>
  );
};

export default ProjectForm;
