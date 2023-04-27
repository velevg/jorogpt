import React, { useState } from "react";

function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    // Make your API call or perform the action that triggers the loading animation here
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Set a timeout to simulate a delay in the API call
  };

  return (
    <div>
      <button onClick={handleClick}>Load Data</button>
      {isLoading && <div className="loading"></div>}
    </div>
  );
}

export default LoadingAnimation;
