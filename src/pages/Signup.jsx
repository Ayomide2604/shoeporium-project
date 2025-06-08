import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/site-logo.png";
import useAuthStore from "../store/useAuthStore";

const Signup = () => {
	const { register, loading, user, error } = useAuthStore();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [formError, setFormError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError("");
		if (password !== confirmPassword) {
			setFormError("Passwords do not match");
			return;
		}
		try {
			await register(email, password, firstName, lastName);
			// If registration succeeds, navigate to login
			navigate("/login");
		} catch (err) {
			// Error is handled by store, but you can set a fallback here if needed
		}
	};

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div
			className="container d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh", background: "#f8f9fa" }}
		>
			<div
				className="login-card shadow p-4 rounded"
				style={{ maxWidth: 540, width: "100%", background: "#fff" }}
			>
				<div className="text-center mb-4">
					<img
						src={logo}
						alt="Shoeporium Logo"
						style={{ height: 60, marginBottom: 16 }}
					/>
					<h2
						className="mb-1"
						style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700 }}
					>
						Create Account
					</h2>
					<p
						className="text-muted"
						style={{ fontFamily: "Montserrat, sans-serif" }}
					>
						Sign up to get started with Shoeporium.
					</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="row mb-3">
						<div className="col-12 col-md-6 mb-3 mb-md-0">
							<label
								htmlFor="first_name"
								className="form-label"
								style={{ fontWeight: 500 }}
							>
								First Name
							</label>
							<input
								type="text"
								className="form-control"
								id="first_name"
								placeholder="Enter your first name"
								required
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
							/>
						</div>
						<div className="col-12 col-md-6">
							<label
								htmlFor="last_name"
								className="form-label"
								style={{ fontWeight: 500 }}
							>
								Last Name
							</label>
							<input
								type="text"
								className="form-control"
								id="last_name"
								placeholder="Enter your last name"
								required
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
							/>
						</div>
					</div>
					<div className="mb-3">
						<label
							htmlFor="email"
							className="form-label"
							style={{ fontWeight: 500 }}
						>
							Email address
						</label>
						<input
							type="email"
							className="form-control"
							id="email"
							placeholder="Enter your email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="password"
							className="form-label"
							style={{ fontWeight: 500 }}
						>
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							placeholder="Enter your password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="confirmPassword"
							className="form-label"
							style={{ fontWeight: 500 }}
						>
							Confirm Password
						</label>
						<input
							type="password"
							className="form-control"
							id="confirmPassword"
							placeholder="Confirm your password"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
						/>
					</div>
					{(formError || error) && (
						<div className="alert alert-danger" style={{ fontSize: 14 }}>
							{formError || error}
						</div>
					)}
					<button
						type="submit"
						className="btn w-100"
						style={{
							background: "#ca1515",
							color: "#fff",
							fontWeight: 600,
							borderRadius: 8,
							fontFamily: "Montserrat, sans-serif",
							padding: "12px 0",
							fontSize: 16,
						}}
						disabled={loading}
					>
						{loading ? "Signing Up..." : "Sign Up"}
					</button>
				</form>
				<div className="text-center mt-4">
					<span style={{ fontSize: 14 }}>
						Already have an account?{" "}
						<a
							href="/login"
							className="text-decoration-none"
							style={{ color: "#ca1515", fontWeight: 600 }}
						>
							Sign In
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Signup;
