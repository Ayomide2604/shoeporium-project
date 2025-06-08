import React from "react";
import logo from "../assets/img/site-logo.png";

const Signup = () => {
	return (
		<div
			className="container d-flex align-items-center justify-content-center"
			style={{ minHeight: "100vh", background: "#f8f9fa" }}
		>
			<div
				className="login-card shadow p-4 rounded"
				style={{ maxWidth: 400, width: "100%", background: "#fff" }}
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
				<form>
					<div className="mb-3">
						<label
							htmlFor="name"
							className="form-label"
							style={{ fontWeight: 500 }}
						>
							Full Name
						</label>
						<input
							type="text"
							className="form-control"
							id="name"
							placeholder="Enter your name"
							required
							style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
						/>
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
							style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
						/>
					</div>
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
					>
						Sign Up
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
