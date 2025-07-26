import React from "react";
import EventRegistrationForm from "./components/EventRegistrationForm";
import TermsAndConditions from "./components/TermsAndConditions";
import NotFound from "./components/NotFound";

function App() {
    const [route, setRoute] = React.useState(window.location.hash);

    React.useEffect(() => {
        const onHashChange = () => setRoute(window.location.hash);
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    const renderCurrentPage = () => {
        switch (route) {
            case "#/terms":
                return <TermsAndConditions />;
            case "":
            case "#":
            case "#/":
                return <EventRegistrationForm />;
            case "#/404":
            case "#/not-found":
                return <NotFound />;
            default:
                return <NotFound />;
        }
    };

    return <>{renderCurrentPage()}</>;
}

export default App;
