import React from "react";
import Confetti from "react-confetti";

const ConfettiWrapper = () => {
  // Use window size for full screen confetti
  const [dimensions, setDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  React.useEffect(() => {
    const handleResize = () => setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={180}
      gravity={0.25}
      colors={["#fff", "#e0e0e0", "#bdbdbd", "#757575", "#424242", "#212121"]}
      recycle={false}
    />
  );
};

export default ConfettiWrapper;
