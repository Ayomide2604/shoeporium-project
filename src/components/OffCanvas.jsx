import { FaBagShopping, FaRegHeart } from "react-icons/fa6";
import { BiSearch } from "react-icons/bi";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";
const OffCanvas = ({ onClose, offCanvasOpen }) => {
	const menuStyle = { textDecoration: "none", color: "#000" };
	const { user, logout } = useAuthStore();

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
				<ul className="offcanvas__widget" onClick={onClose}>
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
						<Link to="/cart">
							<FaBagShopping size={25} />
							<div className="tip">2</div>
						</Link>
					</li>
				</ul>
				<div className="offcanvas__logo">
					<h3 href="/" style={menuStyle} className="mt-5">
						Shoeporium NG
					</h3>
				</div>
				<div id="header__menu" onClick={onClose}>
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
				<div className="offcanvas__auth" onClick={onClose}>
					{user ? (
						<>
							<Link href="#">Welcome {user?.first_name}</Link>
							<Link href="#" onClick={logout}>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link to="/login">Login</Link>
							<Link to="/signup">Register</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default OffCanvas;
