import { useState } from "react";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebaseClient";
import "./claimForm.css";

const emptyFields = { userName: "", userEmail: "" };

// Enable claims form be setting to 'true'. Currently auto close 24 hours before start of parade
const CLAIMS_ENABLED = false;
const CLAIMS_CLOSE = new Date("2026-09-04T10:00:00");
const claimsOpen =
  CLAIMS_ENABLED &&
  new Date() < CLAIMS_CLOSE;

export default function ClaimForm({ element, onCancel }) {
  const [fields, setFields] = useState(emptyFields);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState("idle");
  const [message, setMessage] = useState("");

  const validate = () => {
    const nextErrors = {};
    const name = fields.userName.trim();
    const email = fields.userEmail.trim();

    if (!name) nextErrors.userName = "Please enter your name.";
    if (!email) {
      nextErrors.userEmail = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.userEmail = "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = ({ target }) => {
    setFields((current) => ({ ...current, [target.name]: target.value }));
    setErrors((current) => ({ ...current, [target.name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!claimsOpen) return;
    if (!validate()) return;

    setSubmitState("submitting");
    setMessage("");

    try {
      const elementRef = doc(db, "elements", String(element.Z));

      await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(elementRef);
        if (!snapshot.exists()) throw new Error("ELEMENT_NOT_FOUND");
        if (snapshot.data().status !== "available") throw new Error("ELEMENT_TAKEN");

        transaction.update(elementRef, {
          userName: fields.userName.trim(),
          userEmail: fields.userEmail.trim().toLowerCase(),
          status: "unavailable",
        });
      });

      setSubmitState("success");
      setMessage(`${element.name} is yours! Watch your email for next steps.`);
    } catch (error) {
      console.error("Unable to claim element:", error);
      setSubmitState("error");
      setMessage(
        error.message === "ELEMENT_TAKEN"
          ? "Someone claimed this element just before you. Please choose another."
          : "We could not save your claim. Please try again."
      );
    }
  };

  return (
    <div className="claim-layout">
      <div className={`selected-element family-${element.family || "nonmetal"}`}>
        <span>{element.Z}</span>
        <strong>{element.symbol}</strong>
        <span>{element.name}</span>
      </div>

      <form className="claim-form" onSubmit={handleSubmit} noValidate>
        <p className="eyebrow">Step two</p>
        <h2>Claim {element.name}</h2>
        <p>
          Atomic number <strong>{element.Z}</strong> will be saved with your registration.
        </p>

        {submitState === "success" ? (
          <div className="form-message success" role="status">
            <h3>Claim confirmed</h3>
            <p>{message}</p>
            <button type="button" className="secondary-button" onClick={onCancel}>
              Back to the table
            </button>
          </div>
        ) : (
          <>
            <label>
              Your name
              <input
                name="userName"
                value={fields.userName}
                onChange={handleChange}
                autoComplete="name"
                aria-invalid={Boolean(errors.userName)}
                aria-describedby={errors.userName ? "name-error" : undefined}
              />
              {errors.userName && <span className="field-error" id="name-error">{errors.userName}</span>}
            </label>

            <label>
              Email address
              <input
                name="userEmail"
                type="email"
                value={fields.userEmail}
                onChange={handleChange}
                autoComplete="email"
                aria-invalid={Boolean(errors.userEmail)}
                aria-describedby={errors.userEmail ? "email-error" : undefined}
              />
              {errors.userEmail && <span className="field-error" id="email-error">{errors.userEmail}</span>}
            </label>

            {message && <p className="form-message error" role="alert">{message}</p>}

            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={onCancel}>Choose another</button>
              <button type="submit" className="primary-button" disabled={submitState === "submitting" || !claimsOpen}>
                {submitState === "submitting"
                  ? "Saving..."
                  : claimsOpen
                    ? `Claim ${element.symbol}`
                    : "Registration Opens Soon"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
