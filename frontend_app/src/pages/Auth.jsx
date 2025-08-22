import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Auth page providing minimal login and signup tabs with validation.
 */
export default function Auth() {
  const [tab, setTab] = useState("login"); // 'login' | 'signup'
  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 text-center">Welcome to Data Insights Studio</h1>

      <div className="flex rounded-lg border border-gray-200 bg-white p-1">
        <button
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
            tab === "login" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setTab("login")}
        >
          Log in
        </button>
        <button
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium ${
            tab === "signup" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setTab("signup")}
        >
          Sign up
        </button>
      </div>

      {tab === "login" ? <LoginForm /> : <SignupForm />}

      <div className="text-center text-sm text-gray-600">
        <span>Or return to </span>
        <Link to="/" className="text-primary hover:underline">
          Home
        </Link>
        <span> or </span>
        <Link to="/projects" className="text-primary hover:underline">
          Projects
        </Link>
      </div>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!values.email || !values.email.includes("@")) errs.email = "Enter a valid email";
    if (!values.password || values.password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    try {
      setSubmitting(true);
      await login(values.email, values.password);
      navigate("/projects");
    } catch (err) {
      setSubmitError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      {submitError ? (
        <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">{submitError}</div>
      ) : null}
      <Field label="Email" error={errors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="you@example.com"
          value={values.email}
          onChange={onChange}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="••••••••"
          value={values.password}
          onChange={onChange}
        />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className={`w-full rounded-md px-4 py-2 text-sm font-medium text-white ${
          submitting ? "bg-primary/60" : "bg-primary hover:bg-blue-700"
        }`}
      >
        {submitting ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!values.name || values.name.trim().length < 2) errs.name = "Enter your name";
    if (!values.email || !values.email.includes("@")) errs.email = "Enter a valid email";
    if (!values.password || values.password.length < 6) errs.password = "Min 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;
    try {
      setSubmitting(true);
      await signup(values.name, values.email, values.password);
      navigate("/projects");
    } catch (err) {
      setSubmitError(err?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      {submitError ? (
        <div className="rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">{submitError}</div>
      ) : null}
      <Field label="Name" error={errors.name}>
        <input
          name="name"
          type="text"
          autoComplete="name"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="Ada Lovelace"
          value={values.name}
          onChange={onChange}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="you@example.com"
          value={values.email}
          onChange={onChange}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          placeholder="At least 6 characters"
          value={values.password}
          onChange={onChange}
        />
      </Field>
      <button
        type="submit"
        disabled={submitting}
        className={`w-full rounded-md px-4 py-2 text-sm font-medium text-white ${
          submitting ? "bg-primary/60" : "bg-primary hover:bg-blue-700"
        }`}
      >
        {submitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
