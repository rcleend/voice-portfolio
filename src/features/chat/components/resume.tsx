import React from "react";
import { X, Download } from "lucide-react";
import SocialButton from "./socialButton";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

const handleImageClick = () => {
  const link = document.createElement("a");
  link.href = "/docs/roel_cv.pdf";
  link.download = "roel_cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Resume: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="w-full flex h-[50vh]">
      <div className="mx-auto w-full max-w-[30rem] relative flex flex-col">
        <div className="w-full h-[20rem] sm:h-[30rem] bg-white mb-4 shadow-md rounded-3xl relative p-6">
          <button
            onClick={onClose}
            className="absolute -top-10 lg:top-3 right-3 p-2 text-white  lg:text-gray-500 lg:hover:text-gray-700 focus:outline-none z-10"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center justify-center h-full">
            <div
              className="h-[17rem] w-[20rem] sm:h-[23rem] sm:w-[25rem] rounded-2xl cursor-pointer relative"
              style={{
                backgroundImage: "url('/images/resume_thumbnail.svg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={handleImageClick}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center rounded-2xl lg:opacity-0 hover:opacity-100 transition-opacity duration-300">
                <Download className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center space-x-5">
          <SocialButton
            href="https://github.com/rcleend"
            text="GITHUB"
            icon={<GitHubLogoIcon />}
            bgColor="bg-[#24292e]"
          />
          <SocialButton
            href="https://www.linkedin.com/in/roel-leendersit/"
            text="LINKEDIN"
            icon={<LinkedInLogoIcon />}
            bgColor="bg-[#0077b5]"
          />
        </div>
      </div>
    </div>
  );
};

export default Resume;
