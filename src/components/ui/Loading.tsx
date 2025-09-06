import React from "react";

const Loading: React.FC = () => (
  <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none">
    <div className="h-0.5 bg-primary-200/40">
      <div className="h-full w-1/3 bg-primary-500 animate-progress"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loading;
