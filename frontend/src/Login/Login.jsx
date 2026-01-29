import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
// import { toast } from 'react-toastify';
import { toast } from "sonner";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPwdVisible, setIsPwdVisible] = useState(false)
  const { users, addCurrentUser } = useUser();

  const navigate = useNavigate();

  const resetForm = () => {
    setUserName("");
    setPassword("");
  };

  useEffect(() => {
    const inputs = document.querySelectorAll(".login-input");
    inputs.forEach((input) => {
      input.classList.remove("!ring-red-400");
      input.placeholder = "";
    });
  }, [userName, password]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (userName && password) {
      if (userName === "admin") {
        if (password === "admin@1095") {
          toast.success("login successfull!");
          resetForm();
          navigate("/admin");
          return;
        }
      }

      const user = users.find((user) => user.email === userName);

      const inputs = document.querySelectorAll(".login-input");
      inputs.forEach((input) => {
        input.classList.remove("!ring-red-400");
        input.placeholder = "";
      });

      if (user) {
        if (user.password === password) {
          addCurrentUser(user._id);
          localStorage.setItem("currentuser", `${user._id}`);
          toast.success("Logged in successfully!");
          resetForm();
          navigate('/')
        } else {
          toast.error("incorrect password!");
          document.getElementById('password').focus();
          document.getElementById('password').classList.add('!ring-red-400');
        }
      } else {
        resetForm();
        document.getElementById('username').focus();
        toast.error("user not found!");
      }
    } else {
      const inputs = document.querySelectorAll(".login-input");

      inputs.forEach((input) => {
        input.classList.remove("!ring-red-400");
        input.placeholder = "";
      });

      for (const input of inputs) {
        if (!input.value) {
          input.classList.add("!ring-red-400");
          input.placeholder = "please fill this field!";
          input.focus();
          break;
        } else {
          input.classList.remove("!ring-red-400");
          input.placeholder = "";
        }
      }
    }
  };

  return (
    <div className="px-4 h-[calc(100vh-4.5rem)] overflow-y-scroll content-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg border m-auto p-5 rounded-xl dark:bg-gradient-to-br from-gray-900 to-gray-800 "
      >
        <form action="">
          <div className="font-bold text-2xl">
            <h2>Login</h2>
          </div>
          <div className="mt-3">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={userName}
              className="w-full border rounded-md p-2 login-input placeholder-red-400 focus:ring-4 focus:ring-blue-400 outline-none"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mt-3 relative">
            <label htmlFor="password">Password</label>
            <input
              type={isPwdVisible ? 'text' : 'password'}
              id="password"
              value={password}
              className="w-full border rounded-md p-2 login-input placeholder-red-400 focus:ring-4 focus:ring-blue-400 duration-200 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isPwdVisible ? (
              <button type="button" onClick={() => setIsPwdVisible(prev => !prev)} className="absolute right-3 top-10 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="10" width="11.25" viewBox="0 0 576 512"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
              </button>
            ) : (
              <button type="button" onClick={() => setIsPwdVisible(prev => !prev)} className="absolute right-3 top-10 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="10" width="12.5" viewBox="0 0 640 512"><path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>
              </button>
            )}
            <button
              type="button"
              className="text-sm font-mono text-blue-700 cursor-pointer"
            >
              forgot password?
            </button>
          </div>
          <div className="mt-3">
            <button
              className="px-3 py-2 border rounded-md font-semibold cursor-pointer duration-200 hover:bg-white hover:text-black"
              type="button"
              onClick={handleLogin}
            >
              login
            </button>
          </div>
          <div className="mt-3">
            <div>
              <span>Don't have an account? </span>
              <button
                onClick={() => navigate('/signin')}
                className="text-sm font-mono text-blue-700 cursor-pointer"
                type="button"
              >
                signin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
