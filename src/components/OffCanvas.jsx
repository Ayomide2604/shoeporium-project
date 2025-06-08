import { FaBagShopping, FaRegHeart } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import logo from "../assets/img/site-logo.png";
const OffCanvas = ({ onClose, offCanvasOpen }) => {
	const menuStyle = { textDecoration: "none", color: "#000" };
	return (
		<>
			<div
				className={`offcanvas-menu-overlay ${offCanvasOpen ? "active" : ""}`}
				onClick={onClose}
			/>
			<div
				className={`offcanvas-menu-wrapper  ${offCanvasOpen ? "active" : ""}`}
				style={{
					height: "100vh",
					maxHeight: "100vh",
					overflowY: "auto",
					position: "fixed",
					top: 0,
					left: 0,
					zIndex: 9999,
					background: "#fff",
				}}
			>
				<div className="offcanvas__close" onClick={onClose}>
					+
				</div>
				<ul className="offcanvas__widget">
					<li>
						<BiSearch size={25} />
					</li>
					<li>
						<a href="#">
							<FaRegHeart size={25} />
							<div className="tip">2</div>
						</a>
					</li>
					<li>
						<a href="#">
							<FaBagShopping size={25} />
							<div className="tip">2</div>
						</a>
					</li>
				</ul>
				<div className="offcanvas__logo">
					<h3 href="/" style={menuStyle} className="mt-5">
						Shoeporium NG
					</h3>
				</div>
				<div id="header__menu">
					<ul style={{ listStyle: "none", padding: 0 }}>
						<li className="active">
							<a href="/" style={menuStyle}>
								Home
							</a>
						</li>

						<li>
							<a href="/about" style={menuStyle}>
								About
							</a>
						</li>

						<li>
							<a href="/shop" style={menuStyle}>
								Shop
							</a>
						</li>
						<li>
							<a href="/contact" style={menuStyle}>
								Contact
							</a>
						</li>
					</ul>
				</div>
				<div className="offcanvas__auth">
					<a href="#">Login</a>
					<a href="#">Register</a>
				</div>
			</div>
		</>
	);
};

export default OffCanvas;
