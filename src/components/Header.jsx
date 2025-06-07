import { FaBagShopping, FaHeart, FaRegHeart } from "react-icons/fa6";
const Header = () => {
	return (
		<header className="header">
			<div className="container-fluid">
				<div className="row">
					<div className="col-xl-3 col-lg-2">
						<div className="header__logo">
							<a href="./index.html">
								<img src="img/logo.png" alt="" />
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
				<div className="canvas__open">
					<i className="fa fa-bars" />
				</div>
			</div>
		</header>
	);
};

export default Header;
