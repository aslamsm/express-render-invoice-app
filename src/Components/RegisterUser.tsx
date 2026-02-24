import { useState } from "react";

const RegisterUser = () => {
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Validate the form
  // If details are correct, we need to hit the Post API
  const handleSubmit = () => {
    console.log("Handle Submit called");
    setError(null);

    if (fullName.length == 0) {
      setError("Full name cannot be left blank");
      return;
    }

    if (email.length == 0) {
      setError("Email cannot be left blank");
      return;
    }

    if (password.length < 8) {
      setError("Password cannot be less than 8 chars");
      return;
    }

    if (confirmPassword != password) {
      setError("Confirm Password and Password do not match");
      return;
    }

    setSuccess("All data entered is correct");

    // ToDO: Write code to hit the Post API and send details to the server
  };

  let errorMessage = null;

  if (error) {
    errorMessage = <div className="alert alert-danger">{error}</div>;
  }

  let successMessage = null;
  if (success) {
    successMessage = <div className="alert alert-success">{success}</div>;
  }

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Register User</h2>

      {errorMessage}

      {successMessage}

      <div className="border p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterUser;
