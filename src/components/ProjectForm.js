import { useState } from "react";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [manager, setManager] = useState("");
  const [dev, setDev] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // data
    const project = { title, tech, budget, duration, manager, dev };

    // post request
    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });

    const json = await res.json();

    // ste error
    if (!res.ok) {
      setError(json.error);
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
      console.log("New project added", json);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="project-form flex flex-col gap-5">
      <h2 className="text-4xl font-medium text-gray-600 mb-10">
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
          className=" bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
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
          className=" bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
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
          className=" bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
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
          className=" bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
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
          className=" bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
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
          className=" bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-400 py-2 text-gray-900 rounded-md shadow-sm hover:bg-sky-200/50 duration-300"
      >
        Add project
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
