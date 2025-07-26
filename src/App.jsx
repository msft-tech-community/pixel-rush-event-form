import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventRegistrationForm from "./components/EventRegistrationForm";
import TermsAndConditions from "./components/TermsAndConditions";
import NotFound from "./components/NotFound";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EventRegistrationForm />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
