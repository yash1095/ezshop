import React from "react";
import TeamCard from "./TeamCard";
import captain from "../../assets/captain.jpg";

function About() {
  return (
    <div className="px-5 sm:px-8 md:px-15 lg:px-32 pb-10 h-[calc(100vh-4.5rem)] overflow-y-scroll">
      <h1 className="font-bold text-3xl text-center my-10">About us</h1>
      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-4 md:col-span-3 text-center content-center">
          <div className="max-w-80 aspect-square m-auto rounded-full gradient bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 drop-shadow-md dark:hover:drop-shadow-purple-600">
            <div className="h-full w-full overflow-hidden bg-black rounded-full">
              <img
                src={captain}
                className="h-full w-full object-cover"
                alt="profile"
              />
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-8 md:col-span-9 px-5 md:px-10 lg:px-15 text-center md:text-start">
          <h2 className="font-bold text-2xl">CEO</h2>
          <h3 className="font-bold text-lg mt-2">Name</h3>
          <p className="font-semibold mt-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem modi
            quidem delectus fuga? Perspiciatis recusandae at ullam, eius
            adipisci consequatur sequi suscipit porro perferendis odio hic ipsa
            aperiam sunt eum voluptate molestiae qui dolore aspernatur
            architecto exercitationem harum corrupti laudantium. Ad est optio
            commodi atque sint itaque nihil deserunt culpa!
          </p>
          <button className="mt-5 text-white bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-md border-2 font-semibold  text-sm duration-200 hover:saturate-200 cursor-pointer">
            Know More
          </button>
        </div>
      </div>
      <h1 className="font-bold text-3xl text-center my-10">Our Team</h1>
      <div className="flex flex-nowrap gap-3 mt-20 overflow-x-scroll pb-5">
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>
    </div>
  );
}

export default About;
