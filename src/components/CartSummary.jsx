import React from "react";
import { useCartStore } from "../store/useCartStore";
import formatter from "../utils/currencyFormatter";

const CartSummary = () => {
	const items = useCartStore((state) => state.items);
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const total = subtotal; // You can add tax/shipping logic here if needed

	return (
		<div className="cart__total__procced">
			<h6>Cart total</h6>
			<ul>
				<li>
					Subtotal <span>{formatter.format(subtotal)}</span>
				</li>
				<li>
					Total <span>{formatter.format(total)}</span>
				</li>
			</ul>
			<a href="#" className="primary-btn">
				Proceed to checkout
			</a>
		</div>
	);
};

export default CartSummary;
