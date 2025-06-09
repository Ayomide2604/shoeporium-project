import { create } from "zustand";
import swell from "../utils/swellApi";
import { toast } from "react-toastify";

const useCartStore = create((set, get) => ({
	items: [],

	// Get Swell cart (authenticated or anon)
	getCart: async () => {
		try {
			const user = await swell.account.get();

			const swellCart = await swell.cart.get();
			set({ items: swellCart.items || [] });
		} catch (err) {
			toast.error("Failed to load cart.");
			console.error("Get cart error:", err);
		}
	},

	// Add item to Swell cart or anonCart
	addToCart: async (
		productId,
		quantity = 1,
		productName = "",
		options = {}
	) => {
		try {
			const user = await swell.account.get();
			await swell.cart.addItem({ product_id: productId, quantity, options });
			const swellCart = await swell.cart.get();
			set({ items: swellCart.items });
			toast.success("Item added to cart.");
		} catch (err) {
			toast.error("Failed to add to cart.");
			console.error("Add to cart error:", err);
		}
	},

	// Remove item
	removeFromCart: async (itemId, productName = "") => {
		try {
			const user = await swell.account.get();

			await swell.cart.removeItem(itemId);
			const swellCart = await swell.cart.get();
			set({ items: swellCart.items });
			toast.info(productName ? `${productName} removed.` : "Item removed.");
		} catch (err) {
			toast.error("Failed to remove item.");
			console.error("Remove from cart error:", err);
		}
	},

	// Update quantity
	updateCart: async (itemId, quantity) => {
		try {
			const user = await swell.account.get();

			await swell.cart.updateItem(itemId, { quantity });
			const swellCart = await swell.cart.get();
			set({ items: swellCart.items });
		} catch (err) {
			toast.error("Failed to update cart.");
			console.error("Update cart error:", err);
		}
	},

	// Clear cart
	clearCart: async () => {
		try {
			const user = await swell.account.get();

			await swell.cart.setItems([]);
			set({ items: [] });
		} catch (err) {
			toast.error("Failed to clear cart.");
			console.error("Clear cart error:", err);
		}
	},

	// Merge anon cart with Swell cart after login
	// mergeAnonWithSwell: async () => {
	// 	try {
	// 		const anonItems = get().anonCart;
	// 		if (anonItems.length === 0) return;
	// 		for (const item of anonItems) {
	// 			await swell.cart.addItem(item);
	// 		}
	// 		const updated = await swell.cart.get();
	// 		set({ items: updated.items, anonCart: [] });
	// 		localStorage.removeItem("anon_cart");
	// 		// No toast here per user request
	// 	} catch (err) {
	// 		toast.error("Failed to merge guest cart.");
	// 		console.error("Merge error:", err);
	// 	}
	// },

	// Total cart quantity
	totalCartItems: () => {
		return get().items.reduce((sum, item) => sum + (item.quantity || 0), 0);
	},
}));

export default useCartStore;
