import React from "react";
import "../App.css";

const TermsAndConditions = () => (
    <div className="page-container">
        <div className="terms-container">
            <div className="terms-header">
                <h1 className="terms-title">Terms & Conditions</h1>
                <p className="terms-subtitle">Treasure Hunt Event Registration</p>
            </div>

            <div className="terms-content">
                <h3>Eligibility Requirements</h3>
                <ul>
                    <li>
                        Only current students from Amity University Noida are
                        eligible to participate in this event.
                    </li>
                    <li>
                        Participants must be enrolled in an active academic
                        program at the time of registration.
                    </li>
                    <li>
                        Valid student ID must be presented upon request during
                        the event.
                    </li>
                </ul>

                <h3>Team Formation</h3>
                <ul>
                    <li>
                        Each team can consist of either 1 or 2 members maximum.
                    </li>
                    <li>
                        Team members can be from different departments or
                        courses within Amity University Noida.
                    </li>
                    <li>
                        Teams cannot be modified after the registration
                        deadline.
                    </li>
                    <li>
                        In case of team member unavailability, the remaining
                        member can participate solo.
                    </li>
                </ul>

                <h3>Registration & Information</h3>
                <ul>
                    <li>
                        All participants must provide accurate and complete
                        information during registration.
                    </li>
                    <li>
                        Non-Amity email addresses are required for event
                        communications and updates.
                    </li>
                    <li>
                        Phone numbers must be valid and reachable during the
                        event period.
                    </li>
                    <li>
                        Any false or misleading information may result in
                        immediate disqualification.
                    </li>
                </ul>

                <h3>Event Conduct</h3>
                <ul>
                    <li>
                        Participants must maintain professional conduct
                        throughout the event.
                    </li>
                    <li>
                        Any form of misconduct, harassment, or unsportsmanlike
                        behavior will result in disqualification.
                    </li>
                    <li>
                        Plagiarism or unauthorized collaboration is strictly
                        prohibited.
                    </li>
                    <li>
                        Event organizers' decisions on all matters are final and
                        binding.
                    </li>
                    <li>
                        Winners will be announced within 2 days of the competition's conclusion.
                    </li>
                </ul>

                <h3>Communication & Updates</h3>
                <ul>
                    <li>
                        By registering, participants consent to receive
                        event-related emails and notifications.
                    </li>
                    <li>
                        Important updates will be communicated via the provided
                        email addresses.
                    </li>
                    <li>
                        Participants are responsible for checking their emails
                        regularly for event updates.
                    </li>
                </ul>

                <h3>Modifications & Cancellations</h3>
                <ul>
                    <li>
                        Event organizers reserve the right to modify event
                        rules, schedule, or format at any time.
                    </li>
                    <li>
                        In case of unforeseen circumstances, the event may be
                        postponed or cancelled.
                    </li>
                    <li>
                        Participants will be notified of any changes via email
                        and official channels.
                    </li>
                    <li>
                        No compensation will be provided for any changes or
                        cancellations.
                    </li>
                </ul>

                <p>
                    <strong>Contact Information:</strong> For any queries,
                    concerns, or clarifications regarding these terms and
                    conditions, please contact the event organizers through the
                    official communication channels provided during
                    registration.
                </p>

                <p>
                    By proceeding with the registration, you acknowledge that
                    you have read, understood, and agree to abide by all the
                    terms and conditions mentioned above.
                </p>

                <a href="#/" className="back-to-form">
                    Back to Registration
                </a>
            </div>
        </div>
    </div>
);

export default TermsAndConditions;
