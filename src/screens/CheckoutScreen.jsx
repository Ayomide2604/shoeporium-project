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
import Preloader from "../components/Preloader";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

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

	// Validate shipping details
	const validateShippingDetails = () => {
		const form = document.querySelector(".checkout__form");
		if (!form) return false;
		const formData = new FormData(form);
		const requiredFields = [
			"firstName",
			"lastName",
			"phone",
			"state",
			"city",
			"address",
		];
		for (const field of requiredFields) {
			if (!formData.get(field) || !formData.get(field).trim()) {
				toast.error("Please fill all required shipping details.");
				return false;
			}
		}
		return true;
	};

	const handlePlaceOrderClick = async () => {
		updateShippingDetails();
		if (!validateShippingDetails()) return;
		setLoading(true);
		const amount = items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		let email = useOrderStore.getState().shippingDetails.email;
		if (!email || typeof email !== "string" || !email.includes("@")) {
			email = "test@example.com";
		}
		await new Promise((resolve) => {
			const scriptReady = () => {
				if (!window.PaystackPop) {
					toast.error("Paystack failed to load. Please try again.");
					setLoading(false);
					return;
				}
				const handler = window.PaystackPop.setup({
					key: PAYSTACK_PUBLIC_KEY,
					email,
					amount: amount * 100,
					callback: function (response) {
						if (
							typeof response === "object" &&
							response &&
							response.reference
						) {
							(async () => {
								try {
									await placeOrder(
										items,
										{
											...useOrderStore.getState().shippingDetails,
											paid: true,
											paymentRef: response.reference,
										},
										clearCart,
										navigate,
										toast
									);
									toast.success("Payment successful! Order placed.");
								} catch (err) {
									toast.error(
										"Order placement failed after payment. Please contact support."
									);
								}
								setLoading(false);
								resolve();
							})();
						} else {
							setLoading(false);
							resolve();
						}
					},
					onClose: function () {
						setLoading(false);
						resolve();
					},
				});
				handler.openIframe();
			};
			if (window.PaystackPop) {
				scriptReady();
			} else {
				const script = document.getElementById("paystack-script");
				if (script) {
					script.onload = scriptReady;
				} else {
					const newScript = document.createElement("script");
					newScript.id = "paystack-script";
					newScript.src = "https://js.paystack.co/v1/inline.js";
					newScript.onload = scriptReady;
					document.body.appendChild(newScript);
				}
			}
		});
	};

	// Make handlePlaceOrder globally accessible for the form
	window.handlePlaceOrder = handlePlaceOrder;

	return (
		<div>
			{loading && <Preloader message="Placing order..." />}
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
