import React, { useState, useRef } from "react";
import BreadCrumb from "./../components/BreadCrumb";
import Coupon from "./../components/Coupon";
import CheckoutForm from "./../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import useOrderStore from "../store/useOrderStore";
import swell from "../utils/swellApi";
import useCartStore from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutScreen = () => {
	const { items, getCart, clearCart } = useCartStore();
	const { shippingDetails, placeOrder } = useOrderStore();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const formRef = useRef();

	const handlePlaceOrder = async (e) => {
		e?.preventDefault();
		if (formRef.current) {
			formRef.current.requestSubmit(); // Triggers form submit and updates shipping info
		}
		setLoading(true);
		try {
			await placeOrder(items, shippingDetails, clearCart, navigate, toast);
		} finally {
			setLoading(false);
		}
	};

	// Always update shipping details from the form before placing order
	const updateShippingDetails = () => {
		const form = document.querySelector(".checkout__form");
		if (form) {
			const formData = new FormData(form);
			const shipping = {
				firstName: formData.get("firstName")?.trim() || "",
				lastName: formData.get("lastName")?.trim() || "",
				phone: formData.get("phone")?.trim() || "",
				state: formData.get("state")?.trim() || "",
				city: formData.get("city")?.trim() || "",
				address: formData.get("address")?.trim() || "",
			};
			useOrderStore.getState().setShippingDetails(shipping);
		}
	};

	const handlePlaceOrderClick = async () => {
		updateShippingDetails();
		setLoading(true);
		try {
			await placeOrder(
				items,
				useOrderStore.getState().shippingDetails,
				clearCart,
				navigate,
				toast
			);
		} finally {
			setLoading(false);
		}
	};

	// Make handlePlaceOrder globally accessible for the form
	window.handlePlaceOrder = handlePlaceOrder;

	return (
		<div>
			<BreadCrumb title="Shopping Cart" />
			<section className="checkout spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<CheckoutForm ref={formRef} />
						</div>

						<div className="col-lg-4">
							<OrderSummary items={items} />
							<button
								disabled={loading}
								className="site-btn mt-3 w-100"
								onClick={handlePlaceOrderClick}
							>
								{loading ? "Placing Order..." : "Place Order"}
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default CheckoutScreen;
