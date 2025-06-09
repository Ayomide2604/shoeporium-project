import { create } from "zustand";
import swell from "../utils/swellApi";

const useOrderStore = create((set) => ({
	shippingDetails: {
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		state: "",
		city: "",
		address: "",
	},
	setShippingDetails: (details) =>
		set((state) => ({
			shippingDetails: { ...state.shippingDetails, ...details },
		})),
	clearShippingDetails: () =>
		set({
			shippingDetails: {
				firstName: "",
				lastName: "",
				phone: "",
				email: "",
				state: "",
				city: "",
				address: "",
			},
		}),
	placeOrder: async (items, shippingDetails, clearCart, navigate, toast) => {
		try {
			if (!swell || !swell.cart || !swell.cart.update) {
				console.error("Swell API is not initialized correctly.", { swell });
				toast &&
					toast.error("Order placement failed: Swell API not initialized.");
				throw new Error("Swell API is not initialized correctly.");
			}
			// Prepare billing info from shipping details
			const billingInfo = {
				method: "paystack",
				name: `${shippingDetails.firstName} ${shippingDetails.lastName}`.trim(),
				first_name: shippingDetails.firstName,
				last_name: shippingDetails.lastName,
				address1: shippingDetails.address,
				address2: shippingDetails.address2 || "",
				city: shippingDetails.city,
				state: shippingDetails.state,
				zip: shippingDetails.zip || "",
				country: shippingDetails.country || "NG",
				phone: shippingDetails.phone,
			};
			// 1. Update the cart with shipping and billing info
			await swell.cart.update({
				shipping: {
					name: `${shippingDetails.firstName} ${shippingDetails.lastName}`.trim(),
					first_name: shippingDetails.firstName,
					last_name: shippingDetails.lastName,
					address1: shippingDetails.address,
					address2: shippingDetails.address2 || "",
					city: shippingDetails.city,
					state: shippingDetails.state,
					zip: shippingDetails.zip || "",
					country: shippingDetails.country || "NG",
					phone: shippingDetails.phone,
				},
				billing: billingInfo,
			});
			// 2. Submit the order
			const order = await swell.cart.submitOrder();
			clearCart();
			toast && toast.success("Order placed successfully!");
			navigate && navigate("/account/orders");
			return order;
		} catch (err) {
			console.error("Order placement failed:", err);
			toast && toast.error("Order placement failed. Please try again.");
			throw err;
		}
	},
	getOrders: async ({ limit = 10, page = 1 } = {}) => {
		try {
			const orders = await swell.account.listOrders({ limit, page });
			return orders;
		} catch (err) {
			console.error("Failed to fetch orders:", err);
			throw err;
		}
	},
	getOrderById: async (orderId) => {
		try {
			const order = await swell.account.getOrder(orderId);
			return order;
		} catch (err) {
			console.error("Failed to fetch order details:", err);
			throw err;
		}
	},
}));

export default useOrderStore;
