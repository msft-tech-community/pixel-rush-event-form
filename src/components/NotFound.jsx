import React from "react";
import "../App.css";

const NotFound = () => {
    return (
        <div className="page-container">
            <div className="form-outer-container">
                <div className="event-form notfound-form">
                    <div className="notfound-content">
                        <div className="error-code">404</div>
                        <h1 className="error-title">Page Not Found</h1>
                        <p className="error-description">
                            Oops! The page you're looking for doesn't exist or
                            has been moved. Let's get you back to the Treasure Hunt
                            registration.
                        </p>

                        <div className="pixel-animation">
                            <div className="pixel-grid">
                                {Array.from({ length: 25 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="pixel-dot"
                                        style={{
                                            animationDelay: `${
                                                Math.random() * 2
                                            }s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="error-actions">
                            <a href="#/" className="nav-btn next-btn">
                                Back to Registration
                            </a>
                            <a href="#/terms" className="nav-btn prev-btn">
                                View Terms & Conditions
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
