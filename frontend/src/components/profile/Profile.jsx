import React, { useState } from "react";
import { useUser } from "../../contexts/userContext";
import { toast } from "sonner";
import defaultProfile from '../../assets/profile.png'
import { useNavigate } from "react-router-dom";

function Profile() {
  const { updateUser, currentUser, fetchUsers, setCurrentUser } = useUser();

  const [isEditable, setIsEditable] = useState(false);
  const [image, setImage] = useState(currentUser?.image || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [address, setAddress] = useState(currentUser?.address || "");

  const navigate = useNavigate();

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = reader.result;
      setImage(image);
    };
  };

  const saveChanges = (e) => {
    e.preventDefault();
    setIsEditable((prev) => !prev);
    updateUser(currentUser?._id, image, username, address);
    toast.success("profile updated!");
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("currentuser");
    fetchUsers();
    setCurrentUser(null);
    toast.success("You've been logged out!");
    navigate('/');
  };

  return (
    <div className="px-4 h-[calc(100vh-4.5rem)] overflow-y-scroll content-center">
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg mx-auto p-5 border rounded-xl dark:bg-gradient-to-br from-gray-900/75 via-slate-800/75 to-blue-950/75 font-semibold"
      >
        <form>
          <div className="h-30 w-30 border m-auto rounded-full overflow-hidden">
            <img
              src={image ? image : defaultProfile}
              className="h-full w-full object-cover"
              alt=""
            />
            {/* <div className="h-8 w-8 rounded-full border absolute bg-gray-500 z-40 bottom-0 right-0 p-2 overflow-hidden">
              <div className="relative h-full w-full">
                <img src={profileEditSvg} className="h-full w-full"  alt="" />
                <input
                  type="file"
                  onChange={handleImage}
                  className="absolute w-full h-full inset-0 opacity-0"
                />
              </div>
            </div> */}
          </div>
          <div>
            {isEditable ? (
              <div className="w-50 m-auto mt-5 text-sm">
                <input
                  type="file"
                  onChange={handleImage}
                  className="border p-1 rounded-md w-full"
                />
              </div>
            ) : (
              <div className="mt-5 text-end">
                <button
                  className="text-sm font-mono text-blue-500 cursor-pointer"
                  onClick={() => setIsEditable((prev) => !prev)}
                >
                  Edit profile
                </button>
              </div>
            )}
            <div className="mt-5 border-b">
              <label
                htmlFor="username"
                className="text-xs font-bold text-gray-400"
              >
                Name
              </label>
              <input
                id="username"
                type="text"
                value={username}
                className={`text-lg capitalize p-1 outline-none w-full rounded-md mb-1 ${
                  isEditable ? "border" : ""
                }`}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!isEditable}
              />
            </div>
            <div className="mt-5 border-b">
              <label
                htmlFor="email"
                className="text-xs font-bold text-gray-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={currentUser?.email || ""}
                className="text-lg p-1 outline-none w-full"
                readOnly
              />
            </div>
            <div className="mt-5 border-b">
              <label
                htmlFor="address"
                className="text-xs font-bold text-gray-400"
              >
                address
              </label>
              <textarea
                id="address"
                type="text"
                value={address}
                placeholder="Add your address"
                className={`text-lg p-1 outline-none w-full rounded-md mb-1 ${
                  isEditable ? "border" : ""
                }`}
                onChange={(e) => setAddress(e.target.value)}
                readOnly={!isEditable}
              />
            </div>

            {isEditable ? (
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full border p-2 rounded-md bg-gradient-to-br from-blue-800 bg-cyan-600 cursor-pointer hover:saturate-200 duration-200"
                  onClick={saveChanges}
                >
                  save changes
                </button>
              </div>
            ) : (
              <div className="mt-5">
                <button
                  onClick={logout}
                  className="border-2 border-red-500 text-red-400 p-2 rounded-md hover:bg-red-500 hover:text-white duration-200 cursor-pointer"
                >
                  logout
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
