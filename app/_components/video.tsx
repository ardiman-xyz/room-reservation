import React from "react";

export const Video = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 p-4 tb-10">
      <div className="w-full">
        <iframe
          className="h-[400px] w-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
