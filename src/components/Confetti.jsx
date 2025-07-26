import React from "react";
import Confetti from "react-confetti";

const ConfettiWrapper = () => {
    const [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    React.useEffect(() => {
        const handleResize = () =>
            setDimensions({
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
            numberOfPieces={200}
            gravity={0.15}
            colors={[
                "#6366f1",
                "#8b5cf6",
                "#10b981",
                "#f59e0b",
                "#ef4444",
                "#ffffff",
                "#e0e7ff",
            ]}
            recycle={false}
            initialVelocityY={20}
            wind={0.05}
        />
    );
};

export default ConfettiWrapper;
