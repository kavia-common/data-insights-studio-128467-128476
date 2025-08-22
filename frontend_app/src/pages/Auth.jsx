import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Auth page providing login and signup with modern Tailwind styling and validation.
 */
export default function Auth() {
  const [tab, setTab] = useState("login"); // 'login' | 'signup'
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome to Data Insights Studio</h1>
        <p className="mt-1 text-sm text-secondary">
          Sign in to continue or create an account to get started.
        </p>
      </div>

      <div className="flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
        <button
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            tab === "login"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setTab("login")}
          type="button"
        >
          Log in
        </button>
        <button
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            tab === "signup"
              ? "bg-primary text-white shadow-sm"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setTab("signup")}
          type="button"
        >
          Sign up
        </button>
      </div>

      {tab === "login" ? <LoginForm /> : <SignupForm />}

      <div className="text-center text-sm text-secondary">
        <span>Or return to </span>
        <Link to="/" className="font-medium text-primary hover:underline">
          Home
        </Link>
        <span> or </span>
        <Link to="/projects" className="font-medium text-primary hover:underline">
          Projects
        </Link>
      </div>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-800">{label}</label>
      {children}
      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <p className="text-xs text-gray-400">&nbsp;</p>
      )}
    </div>
  );
}

function InputBase(props) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={[
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
        "placeholder:text-gray-400",
        "focus:border-primary focus:ring-2 focus:ring-blue-100 focus:outline-none",
        "invalid:border-red-300 invalid:focus:ring-red-100",
        className,
      ].join(" ")}
    />
  );
}

function SubmitButton({ children, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={[
        "w-full rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition",
        disabled
          ? "bg-primary/60 cursor-not-allowed"
          : "bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200",
      ].join(" ")}
    >
      {children}
    </button>
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
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {submitError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}
      <Field label="Email" error={errors.email}>
        <InputBase
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={onChange}
          required
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <InputBase
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={onChange}
          required
          minLength={6}
        />
      </Field>
      <SubmitButton disabled={submitting}>
        {submitting ? "Logging in..." : "Log in"}
      </SubmitButton>
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
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {submitError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}
      <Field label="Name" error={errors.name}>
        <InputBase
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={values.name}
          onChange={onChange}
          required
          minLength={2}
        />
      </Field>
      <Field label="Email" error={errors.email}>
        <InputBase
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={onChange}
          required
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <InputBase
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          value={values.password}
          onChange={onChange}
          required
          minLength={6}
        />
      </Field>
      <SubmitButton disabled={submitting}>
        {submitting ? "Creating account..." : "Create account"}
      </SubmitButton>
    </form>
  );
}
