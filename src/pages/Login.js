import { useState } from "react";
import { useLogin } from "../hooks/useLogin.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, loading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    // login user
    await login(email, password);
  };
  return (
    <form
      onSubmit={handleLogin}
      className="login-form flex flex-col gap-5 py-20 mx-auto max-w-sm h-screen"
    >
      <h2 className="text-4xl font-medium text-gray-600 mb-10">Login</h2>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="email"
          className="cursor-pointer hover:text-sky-600 duration-300"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="hello@react.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <div className="form-control flex flex-col gap-2">
        <label
          htmlFor="password"
          className="cursor-pointer hover:text-sky-400 duration-300"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent border border-gray-300 py-3 px-5 rounded-md outline-none focus:border-sky-400 duration-300"
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="bg-blue-600 text-white  py-3 rounded-md hover:bg-blue-700 duration-300 mt-3"
      >
        Log in
      </button>

      {error && (
        <p className="bg-rose-500/20 text-rose-500 border border-rose-700 p-2 rounded-md">
          {error}
        </p>
      )}
    </form>
  );
};

export default Login;
