import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";

const CartScreen = () => {
	return (
		<div>
			<BreadCrumb title="Shopping Cart" />
			<section className="shop-cart spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<CartTable />
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-6">
							<div className="cart__btn">
								<a href="#">Continue Shopping</a>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-6">
							<div className="cart__btn update__btn">
								<a href="#">
									<span className="icon_loading"></span> Update cart
								</a>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<div className="discount__content">
								<h6>Discount codes</h6>
								<form action="#">
									<input type="text" placeholder="Enter your coupon code" />
									<button type="submit" className="site-btn">
										Apply
									</button>
								</form>
							</div>
						</div>
						<div className="col-lg-4 offset-lg-2">
							<CartSummary />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default CartScreen;
