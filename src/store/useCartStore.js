import { create } from "zustand";
import swell from "../utils/swellApi";
import { toast } from "react-toastify";

// Helper to check authentication
const requireAuth = async () => {
	const user = await swell.account.get();
	if (!user?.email) {
		toast.error("Please login to use the cart.");
		return false;
	}
	return true;
};

export const useCartStore = create((set, get) => ({
	items: [],

	// Get cart from Swell
	getCart: async () => {
		if (!(await requireAuth())) return;
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
		if (!(await requireAuth())) return;
		await swell.cart.addItem({ product_id: productId, quantity, options });
		const swellCart = await swell.cart.get();
		set({ items: swellCart.items });
		toast.success("Item added to cart successfully!");
	},

	// Remove item from Swell cart
	removeFromCart: async (itemId, productName = "") => {
		if (!(await requireAuth())) return;
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
		if (!(await requireAuth())) return;
		await swell.cart.updateItem(itemId, { quantity });
		const swellCart = await swell.cart.get();
		set({ items: swellCart.items });
	},

	// Clear Swell cart
	clearCart: async () => {
		if (!(await requireAuth())) return;
		await swell.cart.setItems([]);
		set({ items: [] });
		toast.info("Cart cleared.");
	},

	// Get total number of items in the cart (sum of all quantities)
	totalCartItems: () => {
		return get().items.reduce((sum, item) => sum + (item.quantity || 0), 0);
	},
}));
