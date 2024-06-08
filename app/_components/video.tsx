import React from "react";

export const Video = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 p-4">
      <div className="w-full">
        <div className="relative">
          <iframe
            className="absolute top-0 left-0 w-full h-[400px]"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
