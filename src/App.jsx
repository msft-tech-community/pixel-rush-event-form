
import React from "react";
import EventRegistrationForm from "./components/EventRegistrationForm";
import TermsAndConditions from "./components/TermsAndConditions";

function App() {
  const [route, setRoute] = React.useState(window.location.hash);
  React.useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return (
    <>
      {route === "#/terms" ? (
        <TermsAndConditions />
      ) : (
        <EventRegistrationForm />
      )}
    </>
  );
}

export default App;
