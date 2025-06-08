import React from "react";

const CartSummary = () => {
	return (
		<div className="cart__total__procced">
			<h6>Cart total</h6>
			<ul>
				<li>
					Subtotal <span>$ 750.0</span>
				</li>
				<li>
					Total <span>$ 750.0</span>
				</li>
			</ul>
			<a href="#" className="primary-btn">
				Proceed to checkout
			</a>
		</div>
	);
};

export default CartSummary;
