import React from "react";
import BannerImg from "../../assets/314159.png";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";

const Banner = () => {

  const teammates = [
    { username: "Nikillxh", github: "https://avatars.githubusercontent.com/u/147069367?v=4" },
    { username: "Arnav-panjla", github: "https://avatars.githubusercontent.com/u/146819303?v=4" },
    { username: "Akshat-Shandilya", github: "https://avatars.githubusercontent.com/u/166644996?v=4" },
    { username: "reeshabh-k", github: "https://avatars.githubusercontent.com/u/161019958?v=4" }
  ];


  return (
    <div className="min-h-[450px] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* image section */}
          <div data-aos="zoom-in">
            <img
              src={BannerImg}
              alt=""
              className="max-w-[800px] h-[350px] w-full mx-auto  object-cover"
            />
          </div>

          {/* text details section */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
            <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold">
              About the project
            </h1>
            <p
              data-aos="fade-up"
              className="text-sm text-gray-500 tracking-wide leading-5"
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
              reiciendis inventore iste ratione ex alias quis magni at optio
            </p>
            <div className="flex flex-col gap-4">
              {teammates.map((member, index) => (
                <div key={index} data-aos="fade-up" className="flex items-center gap-4">
                  <img
                    src={member.github}
                    alt={member.username}
                    className="h-9 w-9 rounded-full border shadow-sm"
                  />
                  <a
                    href={`https://github.com/${member.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md font-medium hover:underline"
                  >
                    {member.username}
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
