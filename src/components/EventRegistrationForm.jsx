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
  teamSize: 1,
  teammate: { fullName: "", email: "", phone: "" },
  consent: false,
};

const validateEmail = (email) => /^(?!.*@amity\.edu$)[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
const validatePhone = (phone) => /^\d{10}$/.test(phone);

const EventRegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      else if (!validateEmail(form.email)) err.email = "Enter a valid non-Amity email.";
      if (!form.phone.trim()) err.phone = "Phone is required.";
      else if (!validatePhone(form.phone)) err.phone = "Enter a valid 10-digit phone.";
    }
    if (step === 1) {
      if (!form.department.trim()) err.department = "Department is required.";
      if (!form.course.trim()) err.course = "Course is required.";
      if (!form.batch.trim()) err.batch = "Batch is required.";
      if (!form.section.trim()) err.section = "Section is required.";
    }
    if (step === 2 && form.teamSize === "2") {
      if (!form.teammate.fullName.trim()) err["teammate.fullName"] = "Teammate's name required.";
      if (!form.teammate.email.trim()) err["teammate.email"] = "Teammate's email required.";
      else if (!validateEmail(form.teammate.email)) err["teammate.email"] = "Enter valid non-Amity email.";
      if (!form.teammate.phone.trim()) err["teammate.phone"] = "Teammate's phone required.";
      else if (!validatePhone(form.teammate.phone)) err["teammate.phone"] = "Enter valid 10-digit phone.";
    }
    if (step === 3) {
      if (!form.consent) err.consent = "Consent is required.";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };
  const handlePrev = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSubmitting(true);
    setShowConfetti(true);
    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="form-outer-container">
      {showConfetti && <Confetti />}
      <form className="event-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Event Registration</h2>
        <div className={`form-section section-${step}`}> 
          {step === 0 && (
            <>
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "error" : ""}
                  autoComplete="off"
                />
                {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
              </label>
              <label>
                Non-Amity Email ID
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  autoComplete="off"
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </label>
              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "error" : ""}
                  autoComplete="off"
                />
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </label>
            </>
          )}
          {step === 1 && (
            <>
              <label>
                University
                <input type="text" value="Amity University Noida" disabled className="locked" />
                <span className="locked-msg">Only people at Amity University Noida can participate.</span>
              </label>
              <label>
                Department
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className={errors.department ? "error" : ""}
                />
                {errors.department && <span className="error-msg">{errors.department}</span>}
              </label>
              <label>
                Course
                <input
                  type="text"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className={errors.course ? "error" : ""}
                />
                {errors.course && <span className="error-msg">{errors.course}</span>}
              </label>
              <label>
                Batch
                <input
                  type="text"
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  className={errors.batch ? "error" : ""}
                />
                {errors.batch && <span className="error-msg">{errors.batch}</span>}
              </label>
              <label>
                Section
                <input
                  type="text"
                  name="section"
                  value={form.section}
                  onChange={handleChange}
                  className={errors.section ? "error" : ""}
                />
                {errors.section && <span className="error-msg">{errors.section}</span>}
              </label>
            </>
          )}
          {step === 2 && (
            <>
              <label>
                Team Members
                <div className="team-size-options">
                  <label>
                    <input
                      type="radio"
                      name="teamSize"
                      value="1"
                      checked={form.teamSize === "1"}
                      onChange={handleChange}
                    />
                    Just Me
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="teamSize"
                      value="2"
                      checked={form.teamSize === "2"}
                      onChange={handleChange}
                    />
                    Me + 1 Teammate
                  </label>
                </div>
              </label>
              {form.teamSize === "2" && (
                <div className="teammate-section">
                  <label>
                    Teammate Full Name
                    <input
                      type="text"
                      name="teammate.fullName"
                      value={form.teammate.fullName}
                      onChange={handleChange}
                      className={errors["teammate.fullName"] ? "error" : ""}
                    />
                    {errors["teammate.fullName"] && <span className="error-msg">{errors["teammate.fullName"]}</span>}
                  </label>
                  <label>
                    Teammate Non-Amity Email
                    <input
                      type="email"
                      name="teammate.email"
                      value={form.teammate.email}
                      onChange={handleChange}
                      className={errors["teammate.email"] ? "error" : ""}
                    />
                    {errors["teammate.email"] && <span className="error-msg">{errors["teammate.email"]}</span>}
                  </label>
                  <label>
                    Teammate Phone Number
                    <input
                      type="tel"
                      name="teammate.phone"
                      value={form.teammate.phone}
                      onChange={handleChange}
                      className={errors["teammate.phone"] ? "error" : ""}
                    />
                    {errors["teammate.phone"] && <span className="error-msg">{errors["teammate.phone"]}</span>}
                  </label>
                </div>
              )}
            </>
          )}
          {step === 3 && (
            <>
              <label className="consent-label">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                />
                I agree to receive event-related emails and accept the <a href="#/terms" target="_blank" rel="noopener noreferrer">terms and conditions</a>.
              </label>
              {errors.consent && <span className="error-msg">{errors.consent}</span>}
            </>
          )}
        </div>
        <div className="form-nav">
          {step > 0 && (
            <button type="button" className="nav-btn prev-btn" onClick={handlePrev} disabled={submitting}>
              Previous
            </button>
          )}
          {step < 3 && (
            <button type="button" className="nav-btn next-btn" onClick={handleNext} disabled={submitting}>
              Next
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="nav-btn submit-btn"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
        {submitted && <div className="success-msg">Registration Successful! 🎉</div>}
      </form>
    </div>
  );
};

export default EventRegistrationForm;
