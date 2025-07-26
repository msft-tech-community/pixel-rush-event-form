import React, { useState } from "react";
import Confetti from "./Confetti";
import "../App.css";

const initialState = {
    fullName: "",
    email: "",
    phone: "",
    department: "",
    course: "",
    batch: "",
    section: "",
    teamSize: "1",
    teammate: { fullName: "", email: "", phone: "" },
    consent: false,
};

const validateEmail = (email) =>
    /^(?!.*@amity\.edu$)[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

const steps = [
    { label: "Personal", icon: "👤" },
    { label: "Academic", icon: "🎓" },
    { label: "Team", icon: "👥" },
    { label: "Consent", icon: "✓" },
];

const EventRegistrationForm = () => {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.startsWith("teammate.")) {
            setForm((prev) => ({
                ...prev,
                teammate: { ...prev.teammate, [name.split(".")[1]]: value },
            }));
        } else if (type === "checkbox") {
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateStep = () => {
        let err = {};
        if (step === 0) {
            if (!form.fullName.trim()) err.fullName = "Full Name is required.";
            if (!form.email.trim()) err.email = "Email is required.";
            else if (!validateEmail(form.email))
                err.email = "Enter a valid non-Amity email.";
            if (!form.phone.trim()) err.phone = "Phone is required.";
            else if (!validatePhone(form.phone))
                err.phone = "Enter a valid 10-digit phone.";
        }
        if (step === 1) {
            if (!form.department.trim())
                err.department = "Department is required.";
            if (!form.course.trim()) err.course = "Course is required.";
            if (!form.batch.trim()) err.batch = "Batch is required.";
            if (!form.section.trim()) err.section = "Section is required.";
        }
        if (step === 2 && form.teamSize === "2") {
            if (!form.teammate.fullName.trim())
                err["teammate.fullName"] = "Teammate's name required.";
            if (!form.teammate.email.trim())
                err["teammate.email"] = "Teammate's email required.";
            else if (!validateEmail(form.teammate.email))
                err["teammate.email"] = "Enter valid non-Amity email.";
            if (!form.teammate.phone.trim())
                err["teammate.phone"] = "Teammate's phone required.";
            else if (!validatePhone(form.teammate.phone))
                err["teammate.phone"] = "Enter valid 10-digit phone.";
        }
        if (step === 3) {
            if (!form.consent) err.consent = "Consent is required.";
        }
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep((s) => s + 1);
            setSubmitError(null);
        }
    };

    const handlePrev = () => {
        setStep((s) => s - 1);
        setSubmitError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;
        setSubmitting(true);
        setShowConfetti(true);
        setSubmitError(null);

        // Convert form data to JSON format
        const registrationData = {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            university: "Amity University Noida",
            department: form.department,
            course: form.course,
            batch: form.batch,
            section: form.section,
            teamSize: parseInt(form.teamSize),
            teammate:
                form.teamSize === "2"
                    ? {
                          fullName: form.teammate.fullName,
                          email: form.teammate.email,
                          phone: form.teammate.phone,
                      }
                    : null,
            consent: form.consent,
            submittedAt: new Date().toISOString(),
        };

        try {
            // Send POST request to the registration endpoint
            const response = await fetch(
                "https://crc-admin-panel.azurewebsites.net/pixel-rush/register",
                // "http://127.0.0.1:5000/pixel-rush/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(registrationData),
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("✅ Registration successful:", result);
                console.log("📊 Submitted data:", registrationData);

                // Show success after 2 seconds
                setTimeout(() => {
                    setSubmitted(true);
                    setSubmitting(false);
                }, 2000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error("❌ Registration failed:", {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData,
                });

                // Handle error
                setSubmitError(
                    `Registration failed: ${
                        errorData.message || response.statusText
                    }`
                );
                setSubmitting(false);
                setShowConfetti(false);
            }
        } catch (error) {
            console.error("🚨 Network error during registration:", error);
            console.log("📊 Data that failed to submit:", registrationData);

            // Handle network error
            setSubmitError(
                "Network error. Please check your connection and try again."
            );
            setSubmitting(false);
            setShowConfetti(false);
        }
    };

    if (submitted) {
        return (
            <div className="page-container">
                {showConfetti && <Confetti />}
                <div className="form-outer-container">
                    <div className="event-form">
                        <div className="success-section">
                            <div className="success-icon">🎉</div>
                            <div className="success-msg">
                                Registration Successful!
                            </div>
                            <div className="success-description">
                                Thank you for registering for the Pixel Rush
                                event. You'll receive a confirmation email
                                shortly with further details.
                            </div>
                            <a
                                href="https://chat.whatsapp.com/LPwCoHlTslhJLrFuKjbiiI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                                style={{
                                    display: "inline-block",
                                    marginTop: "1.5rem",
                                    padding: "0.8rem 2rem",
                                    background: "#25D366",
                                    color: "#181824",
                                    borderRadius: "8px",
                                    fontWeight: 600,
                                    fontSize: "1.08rem",
                                    textDecoration: "none",
                                    boxShadow: "0 2px 8px 0 #25d36633",
                                    transition: "background 0.2s, color 0.2s",
                                }}
                            >
                                Join WhatsApp Group
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="form-outer-container">
                <form className="event-form" onSubmit={handleSubmit}>
                    <h1 className="form-title">Pixel Rush Registration</h1>
                    <p className="form-subtitle">
                        Join the ultimate coding challenge
                    </p>

                    {/* Progress Indicator */}
                    <div className="progress-container">
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${
                                        ((step + 1) / steps.length) * 100
                                    }%`,
                                }}
                            />
                        </div>
                        <div className="step-indicators">
                            {steps.map((stepInfo, index) => (
                                <div
                                    key={index}
                                    className={`step-indicator ${
                                        index === step
                                            ? "active"
                                            : index < step
                                            ? "completed"
                                            : ""
                                    }`}
                                >
                                    <div className="step-dot" />
                                    <span>{stepInfo.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-section">
                        {/* Step 0: Personal Information */}
                        {step === 0 && (
                            <>
                                <label>
                                    <span className="label-text">
                                        Full Name
                                    </span>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        className={`form-input ${
                                            errors.fullName ? "error" : ""
                                        }`}
                                        placeholder="Enter your full name"
                                        autoComplete="off"
                                    />
                                    {errors.fullName && (
                                        <div className="error-msg">
                                            {errors.fullName}
                                        </div>
                                    )}
                                </label>

                                <label>
                                    <span className="label-text">
                                        Email Address
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={`form-input ${
                                            errors.email ? "error" : ""
                                        }`}
                                        placeholder="your.email@example.com (non-Amity)"
                                        autoComplete="off"
                                    />
                                    {errors.email && (
                                        <div className="error-msg">
                                            {errors.email}
                                        </div>
                                    )}
                                </label>

                                <label>
                                    <span className="label-text">
                                        Phone Number
                                    </span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        className={`form-input ${
                                            errors.phone ? "error" : ""
                                        }`}
                                        placeholder="1234567890"
                                        autoComplete="off"
                                    />
                                    {errors.phone && (
                                        <div className="error-msg">
                                            {errors.phone}
                                        </div>
                                    )}
                                </label>
                            </>
                        )}

                        {/* Step 1: Academic Information */}
                        {step === 1 && (
                            <>
                                <label>
                                    <span className="label-text">
                                        University
                                    </span>
                                    <input
                                        type="text"
                                        value="Amity University Noida"
                                        disabled
                                        className="form-input"
                                    />
                                    <div className="locked-msg">
                                        Only students from Amity University
                                        Noida can participate
                                    </div>
                                </label>

                                <label>
                                    <span className="label-text">
                                        Department
                                    </span>
                                    <input
                                        type="text"
                                        name="department"
                                        value={form.department}
                                        onChange={handleChange}
                                        className={`form-input ${
                                            errors.department ? "error" : ""
                                        }`}
                                        placeholder="e.g., Computer Science"
                                    />
                                    {errors.department && (
                                        <div className="error-msg">
                                            {errors.department}
                                        </div>
                                    )}
                                </label>

                                <label>
                                    <span className="label-text">Course</span>
                                    <input
                                        type="text"
                                        name="course"
                                        value={form.course}
                                        onChange={handleChange}
                                        className={`form-input ${
                                            errors.course ? "error" : ""
                                        }`}
                                        placeholder="e.g., B.Tech, BCA, MCA"
                                    />
                                    {errors.course && (
                                        <div className="error-msg">
                                            {errors.course}
                                        </div>
                                    )}
                                </label>

                                <label>
                                    <span className="label-text">
                                        Batch/Year
                                    </span>
                                    <input
                                        type="text"
                                        name="batch"
                                        value={form.batch}
                                        onChange={handleChange}
                                        className={`form-input ${
                                            errors.batch ? "error" : ""
                                        }`}
                                        placeholder="e.g., 2024, 2025"
                                    />
                                    {errors.batch && (
                                        <div className="error-msg">
                                            {errors.batch}
                                        </div>
                                    )}
                                </label>

                                <label>
                                    <span className="label-text">Section</span>
                                    <input
                                        type="text"
                                        name="section"
                                        value={form.section}
                                        onChange={handleChange}
                                        className={`form-input ${
                                            errors.section ? "error" : ""
                                        }`}
                                        placeholder="e.g., A, B, C"
                                    />
                                    {errors.section && (
                                        <div className="error-msg">
                                            {errors.section}
                                        </div>
                                    )}
                                </label>
                            </>
                        )}

                        {/* Step 2: Team Information */}
                        {step === 2 && (
                            <>
                                <label>
                                    <span className="label-text">
                                        Team Size
                                    </span>
                                    <div className="team-size-options">
                                        <div className="radio-option">
                                            <input
                                                type="radio"
                                                name="teamSize"
                                                value="1"
                                                checked={form.teamSize === "1"}
                                                onChange={handleChange}
                                                id="solo"
                                            />
                                            <label
                                                htmlFor="solo"
                                                className="radio-label"
                                            >
                                                Solo Participant
                                            </label>
                                        </div>
                                        <div className="radio-option">
                                            <input
                                                type="radio"
                                                name="teamSize"
                                                value="2"
                                                checked={form.teamSize === "2"}
                                                onChange={handleChange}
                                                id="team"
                                            />
                                            <label
                                                htmlFor="team"
                                                className="radio-label"
                                            >
                                                Team of 2
                                            </label>
                                        </div>
                                    </div>
                                </label>

                                {form.teamSize === "2" && (
                                    <div className="teammate-section">
                                        <div className="teammate-title">
                                            Teammate Information
                                        </div>

                                        <label>
                                            <span className="label-text">
                                                Teammate's Full Name
                                            </span>
                                            <input
                                                type="text"
                                                name="teammate.fullName"
                                                value={form.teammate.fullName}
                                                onChange={handleChange}
                                                className={`form-input ${
                                                    errors["teammate.fullName"]
                                                        ? "error"
                                                        : ""
                                                }`}
                                                placeholder="Enter teammate's full name"
                                            />
                                            {errors["teammate.fullName"] && (
                                                <div className="error-msg">
                                                    {
                                                        errors[
                                                            "teammate.fullName"
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </label>

                                        <label>
                                            <span className="label-text">
                                                Teammate's Email
                                            </span>
                                            <input
                                                type="email"
                                                name="teammate.email"
                                                value={form.teammate.email}
                                                onChange={handleChange}
                                                className={`form-input ${
                                                    errors["teammate.email"]
                                                        ? "error"
                                                        : ""
                                                }`}
                                                placeholder="teammate@example.com (non-Amity)"
                                            />
                                            {errors["teammate.email"] && (
                                                <div className="error-msg">
                                                    {errors["teammate.email"]}
                                                </div>
                                            )}
                                        </label>

                                        <label>
                                            <span className="label-text">
                                                Teammate's Phone
                                            </span>
                                            <input
                                                type="tel"
                                                name="teammate.phone"
                                                value={form.teammate.phone}
                                                onChange={handleChange}
                                                className={`form-input ${
                                                    errors["teammate.phone"]
                                                        ? "error"
                                                        : ""
                                                }`}
                                                placeholder="1234567890"
                                            />
                                            {errors["teammate.phone"] && (
                                                <div className="error-msg">
                                                    {errors["teammate.phone"]}
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Step 3: Consent */}
                        {step === 3 && (
                            <div className="consent-section">
                                <h3
                                    style={{
                                        color: "#6366f1",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    Final Step
                                </h3>
                                <label className="consent-label">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={form.consent}
                                        onChange={handleChange}
                                        className="consent-checkbox"
                                    />
                                    <span>
                                        I agree to receive event-related emails
                                        and accept the{" "}
                                        <a
                                            href="#/terms"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            terms and conditions
                                        </a>
                                        . I confirm that all information
                                        provided is accurate.
                                    </span>
                                </label>
                                {errors.consent && (
                                    <div className="error-msg">
                                        {errors.consent}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submission Error Display */}
                    {submitError && (
                        <div className="submit-error">
                            <span className="error-icon">⚠️</span>
                            {submitError}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="form-nav">
                        {step > 0 && (
                            <button
                                type="button"
                                className="nav-btn prev-btn"
                                onClick={handlePrev}
                                disabled={submitting}
                            >
                                Previous
                            </button>
                        )}

                        {step < 3 ? (
                            <button
                                type="button"
                                className="nav-btn next-btn"
                                onClick={handleNext}
                                disabled={submitting}
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="nav-btn submit-btn"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <span className="loading">
                                        Submitting...
                                    </span>
                                ) : (
                                    "Complete Registration"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventRegistrationForm;
