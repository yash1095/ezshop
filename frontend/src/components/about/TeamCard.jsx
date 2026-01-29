import React from "react";
import ironman from "../../assets/mark_85.webp";

function TeamCard() {
  return (
    <div className="!shrink-0 flex-6/12 sm:flex-6/12 md:flex-4/12 md:px-10 lg:flex-3/12 rounded-lg p-3 hover:text- hover:bg-gradient-to-br from-blue-200 dark:from-black/50 via-25% to-blue-300 border">
      <div className="max-w-52 aspect-square bg-gradient-to-tl from-teal-400 bg-cyan-400 rounded-full p-1 m-auto">
        <div className="bg-black h-full w-full rounded-full overflow-hidden">
          <img
            src={ironman}
            className="h-full w-full object-cover"
            alt="Profile Photo"
          />
        </div>
      </div>
      <div className="text-center mt-6">
        <h3 className="font-bold text-lg">Name</h3>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore,
          eligendi.
        </p>
        <button className="mt-5 text-white bg-blue-400 rounded p-2 text-sm border-2 font-semibold hover:bg-blue-500 duration-200 cursor-pointer">
          Know More
        </button>
      </div>
    </div>
  );
}

export default TeamCard;
