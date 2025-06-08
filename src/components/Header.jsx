import { FaBagShopping, FaBars, FaRegHeart, FaX } from "react-icons/fa6";
import { useState } from "react";
import logo from "../assets/img/site-logo.png";
import OffCanvas from "./OffCanvas";

const Header = () => {
	const [offCanvasOpen, setOffCanvasOpen] = useState(false);

	return (
		<header className="header" style={{ maxHeight: "100px" }}>
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-3 col-lg-2">
						<div
							className="header__logo"
							style={{
								display: "flex",
								alignItems: "center",
								height: "80px",
							}}
						>
							<a
								href="./index.html"
								style={{
									display: "flex",
									alignItems: "center",
									height: "100%",
								}}
							>
								<img
									src={logo}
									alt="logo"
									style={{
										height: "80px",
										width: "auto",
										objectFit: "contain",
										display: "block",
										margin: 0,
										padding: 0,
									}}
								/>
							</a>
						</div>
					</div>
					<div className="col-xl-6 col-lg-7">
						<nav className="header__menu">
							<ul>
								<li className="active">
									<a href="/">Home</a>
								</li>

								<li>
									<a href="/about">About</a>
								</li>

								<li>
									<a href="/shop">Shop</a>
								</li>
								<li>
									<a href="/contact">Contact</a>
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-lg-3">
						<div className="header__right">
							<div className="header__right__auth">
								<a href="#">Login</a>
								<a href="#">Register</a>
							</div>
							<ul className="header__right__widget">
								<li>
									<span className="icon_search search-switch" />
								</li>
								<li>
									<a href="#">
										<FaRegHeart />
										<div className="tip">2</div>
									</a>
								</li>
								<li>
									<a href="#">
										<FaBagShopping />
										<div className="tip">2</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div
					className="canvas__open"
					onClick={() => setOffCanvasOpen(!offCanvasOpen)}
				>
					{offCanvasOpen ? <FaX /> : <FaBars className="fa fa-bars" />}
				</div>
				{offCanvasOpen && (
					<OffCanvas
						onClose={() => setOffCanvasOpen(false)}
						offCanvasOpen={offCanvasOpen}
					/>
				)}
			</div>
		</header>
	);
};

export default Header;
