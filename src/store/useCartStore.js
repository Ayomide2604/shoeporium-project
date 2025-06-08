import { create } from "zustand";
import swell from "../utils/swellApi";
import { toast } from "react-toastify";

export const useCartStore = create((set, get) => ({
	items: [],

	// Get cart from Swell
	getCart: async () => {
		const swellCart = await swell.cart.get();
		set({ items: swellCart.items || [] });
	},

	// Add item to Swell cart (require login)
	addToCart: async (
		productId,
		quantity = 1,
		productName = "",
		options = {}
	) => {
		const user = await swell.account.get();
		if (!user?.email) {
			toast.error("Please login to add items to your cart.");
			return;
		}
		await swell.cart.addItem({ product_id: productId, quantity, options });
		const swellCart = await swell.cart.get();
		set({ items: swellCart.items });
		toast.success("Item added to cart successfully!");
	},

	// Remove item from Swell cart
	removeFromCart: async (itemId, productName = "") => {
		await swell.cart.removeItem(itemId);
		const swellCart = await swell.cart.get();
		set({ items: swellCart.items });
		if (productName) {
			toast.info(`${productName} removed from cart.`);
		} else {
			toast.info("Item removed from cart.");
		}
	},

	// Update item quantity in Swell cart
	updateCart: async (itemId, quantity) => {
		await swell.cart.updateItem(itemId, { quantity });
		const swellCart = await swell.cart.get();
		set({ items: swellCart.items });
	},

	// Clear Swell cart
	clearCart: async () => {
		await swell.cart.setItems([]);
		set({ items: [] });
		toast.info("Cart cleared.");
	},

	// Get total number of items in the cart (sum of all quantities)
	totalCartItems: () => {
		return get().items.reduce((sum, item) => sum + (item.quantity || 0), 0);
	},
}));
