import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserGlobalState } from "../components/Layout/UserGlobalState";
import { AuthFormGlobalState } from "../components/Layout/AuthFormGlobalState";
import axios from "axios";
import Cookies from "js-cookie";

function DEOPortal() {
  const BaseURL = process.env.REACT_APP_BACKEND_API_URL;

  const { setAuthForm } = AuthFormGlobalState();
  const { setCurrentUserData } = UserGlobalState();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [randomError, setRandomError] = useState(null);

  const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_@]{3,30}$/;
    if (usernameRegex.test(username) === false) {
      setUsernameError(`
              Enter a valid username
          `);
    } else {
      setUsernameError(null);
      setRandomError(null);
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9@]{4,30}$/;
    if (passwordRegex.test(password) === false) {
      setPasswordError(`
              Enter a valid password
          `);
    } else {
      setPasswordError(null);
      setRandomError(null);
    }
  };

  async function handleSubmitClick(e) {
    e.preventDefault();

    if (usernameError || passwordError) {
      setRandomError("Fill all the fields correctly");
      return;
    } else if (username === "" || password === "") {
      setRandomError("Fill username and password");
      return;
    }

    const postData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${BaseURL}/deo/auth`, postData);

      if (response.status === 200) {
        alert("Login Successful");
        Cookies.set("access-token", response.data.token, { expires: 1 });
        setCurrentUserData(response.data.userData);
        //setAdmin profile Details
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      alert(error);
      if (error.response.status) {
        if (error.response.status === 401) {
          setRandomError("Invalid username or password");
        }
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmitClick}
        className="w-full max-w-sm bg-white p-8 shadow-lg rounded"
      >
        <h2 className="text-2xl font-bold mb-6">Data Entry Operator Login</h2>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={validateUsername}
          />
          {usernameError && (
            <p className="text-red-500 text-sm mt-1">{usernameError}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default DEOPortal;