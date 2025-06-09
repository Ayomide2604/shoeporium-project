import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/site-logo.png";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
	const { login, loading, user, error } = useAuthStore();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	// Handles form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	// Watch for successful login
	useEffect(() => {
		if (user) {
			// Redirect to cart
			navigate("/cart");
		}
	}, [user, navigate]);

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
						Sign In
					</h2>
					<p
						className="text-muted"
						style={{ fontFamily: "Montserrat, sans-serif" }}
					>
						Welcome back! Please login to your account.
					</p>
				</div>

				<form onSubmit={handleSubmit}>
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
							onChange={(e) => setPassword(e.target.value)}
							style={{ borderRadius: 8, fontFamily: "Montserrat, sans-serif" }}
						/>
					</div>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								id="rememberMe"
							/>
							<label
								className="form-check-label"
								htmlFor="rememberMe"
								style={{ fontSize: 14 }}
							>
								Remember me
							</label>
						</div>
						<a
							href="#"
							className="text-decoration-none"
							style={{ fontSize: 14, color: "#ca1515" }}
						>
							Forgot password?
						</a>
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
						disabled={loading}
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>

				{error && (
					<div
						className="text-danger text-center mt-3"
						style={{ fontSize: 14 }}
					>
						{error}
					</div>
				)}

				<div className="text-center mt-4">
					<span style={{ fontSize: 14 }}>
						Don't have an account?{" "}
						<a
							href="/signup"
							className="text-decoration-none"
							style={{ color: "#ca1515", fontWeight: 600 }}
						>
							Register
						</a>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Login;
