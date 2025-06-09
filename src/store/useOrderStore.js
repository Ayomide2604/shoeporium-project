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
	placeOrder: async (
		cartItems,
		shippingDetails,
		clearCart,
		navigate,
		toast
	) => {
		try {
			if (
				!shippingDetails.firstName ||
				!shippingDetails.lastName ||
				!shippingDetails.phone ||
				!shippingDetails.state ||
				!shippingDetails.city ||
				!shippingDetails.address
			) {
				toast.error(
					"Please fill in all shipping details before placing your order."
				);
				return;
			}

			// 1. Update shipping info on the cart
			const updatedCart = await swell.cart.update({
				shipping: {
					name: `${shippingDetails.firstName} ${shippingDetails.lastName}`.trim(),
					address1: shippingDetails.address,
					address2: shippingDetails.address2 || "",
					city: shippingDetails.city,
					state: shippingDetails.state,
					zip: shippingDetails.zip || "",
					country: shippingDetails.country || "NG",
					phone: shippingDetails.phone,
				},
			});

			// 2. Submit the order
			const order = await swell.cart.submitOrder();

			// 3. Clear the cart in Zustand
			clearCart();

			toast.success("Order placed successfully!");
			navigate("/", { replace: true });
		} catch (err) {
			toast.error("Failed to place order. Please try again.");
			console.error("Order error:", err);
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
