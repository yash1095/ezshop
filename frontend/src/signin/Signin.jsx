import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
// import { toast } from 'react-toastify';
import { toast } from "sonner";
import axios from 'axios';
import Loader from "./Loader";

function Signin() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [userOtp, setUserOtp] = useState('');
  const [otp, setOtp] = useState(1);
  const [verification, setVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    users,
    addUser,
    addCurrentUser,
  } = useUser();

  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await axios.post('http://localhost:3000/send-email',{email: newEmail})

      toast.success("OTP sent successfully!");
      setOtp(res.data.otp);

    } catch (error) {
      console.error(error);
      toast.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    if (!verification) {
      const sInputs = document.querySelectorAll(".signin-input");

      sInputs.forEach((input) => {
        input.classList.remove("!ring-red-400");
        input.placeholder = "";
      });

      const email = document.getElementById("email");
      email.classList.remove("!ring-red-500");
    }
  }, [newUsername, newEmail, newPassword, verification]);

  const handleSignin = async (e) => {
    e.preventDefault();

    if (newUsername && newEmail && newPassword) {
      let isUserExist = users.find((user) => user.email === newEmail);
      if (isUserExist) {
        toast.error("user already exist!");
        document.getElementById("email").focus();
      } else {
        const email = document.getElementById("email");
        const isContain = email.value.includes("@");
        if (isContain) {
          setIsLoading(true);
          await sendOtp();
          setIsLoading(false);
          setVerification(true);
        } else {
          email.focus();
          email.classList.add("!ring-red-500");
          email.value = "";
          email.placeholder = "please include '@' in your email!";
        }
      }
    } else {
      const sInputs = document.querySelectorAll(".signin-input");

      sInputs.forEach((input) => {
        input.classList.remove("!ring-red-400");
        input.placeholder = "";
      });

      for (const input of sInputs) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === userOtp) {
      addUser(newUsername, newEmail, newPassword);
      addCurrentUser(newEmail);
      localStorage.setItem("currentuser", `${newEmail}`);
      setNewUsername("");
      setNewEmail("");
      setNewPassword("");
      toast.success("You`ve signed up successfully");
      navigate("/");
    } else {
      const otpInput = document.getElementById("otp");
      otpInput.focus();
      otpInput.classList.add("!ring-red-400");
      toast.error("Incorrect OTP!");
    }
  };

  return (
    <>
      <div className="px-4 h-[calc(100vh-4.5rem)] overflow-y-scroll content-center">
        {!verification ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg m-auto dark:bg-gradient-to-br from-gray-900 to-gray-800 p-5 border rounded-lg"
          >
            <form action="">
              <div className="font-bold text-2xl">Signin</div>
              <div className="mt-5">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  id="username"
                  className="w-full border rounded-md p-2 focus:ring-4 focus:ring-blue-400 placeholder-red-500 outline-none signin-input"
                  required
                />
              </div>
              <div className="mt-5">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  id="email"
                  className="w-full border rounded-md p-2 focus:ring-4 focus:ring-blue-400 placeholder-red-500 outline-none signin-input"
                  required
                />
              </div>
              <div className="mt-5 relative">
                <label htmlFor="password">Password</label>
                <input
                  type={isPwdVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="password"
                  className="w-full border rounded-md p-2 focus:ring-4 focus:ring-blue-400 placeholder-red-500 signin-input"
                  required
                />
                {isPwdVisible ? (
                  <button
                    type="button"
                    onClick={() => setIsPwdVisible((prev) => !prev)}
                    className="absolute right-3 top-10 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="10"
                      width="11.25"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsPwdVisible((prev) => !prev);
                    }}
                    className="absolute right-3 top-10 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="10"
                      width="12.5"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="mt-5">
                <button
                  onClick={handleSignin}
                  className="p-2 rounded-md hover:bg-white hover:text-black duration-200 border cursor-pointer"
                >
                  Signin
                </button>
              </div>
              <div className="mt-5">
                <div>
                  <span>Already have an account? </span>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-sm font-mono text-blue-700 cursor-pointer"
                    type="button"
                  >
                    login
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="max-w-lg m-auto dark:bg-gradient-to-br from-gray-900 to-gray-800 p-5 px-8 border rounded-lg">
            <div>
              <div>
                <div className="mb-6">
                  <span className="font-bold text-2xl">OTP Verification</span>
                </div>
                <div className="p-2 border-2 border-green-600/50 bg-green-400/50 rounded-md mb-4">
                  <span>
                    We've sent a varification OTP to your email - {newEmail}
                  </span>
                </div>
                <div className="mb-4">
                  <label htmlFor="otp">Enter your OTP</label>
                  <input
                    type="number"
                    value={userOtp}
                    id="otp"
                    onChange={(e) => setUserOtp(Number(e.target.value))}
                    className="border w-full p-2 rounded-md outline-none focus:ring-4 ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <button
                    onClick={handleSubmit}
                    className="p-2 rounded-md hover:bg-white hover:text-black duration-200 border cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setVerification(false)}
                    className="text-blue-500 rounded-md p-1 cursor-pointer font-semibold"
                  >
                    {"<-- back to Signin"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="fixed inset-0 z-10 bg-gray-900/50 backdrop-blur-xs flex justify-center items-center pe-4">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}

export default Signin;
