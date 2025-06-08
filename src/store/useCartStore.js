import { create } from "zustand";
import swell from "../utils/swellApi";
import { toast } from "react-toastify";

export const useCartStore = create((set, get) => ({
	items: [],

	anonCart: JSON.parse(localStorage.getItem("anon_cart")) || [],

	// Get Swell cart (authenticated or anon)
	getCart: async () => {
		try {
			const user = await swell.account.get();
			if (!user?.email) {
				// Use anonCart
				set({ items: get().anonCart });
				return;
			}
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
			if (!user?.email) {
				// Fetch product details for anon cart
				let product = get().products?.find((p) => p.id === productId);
				if (!product) {
					try {
						product = await swell.products.get(productId);
					} catch (e) {
						product = { name: productName, price: 0 };
					}
				}
				const newItem = {
					id: `${productId}-${JSON.stringify(options)}`,
					product_id: productId,
					quantity,
					options,
					product: {
						name: product?.name,
						images: product?.images || [],
						options: product?.options || [],
					},
					price: product?.price || 0,
				};
				const updated = [
					...get().anonCart.filter((i) => i.id !== newItem.id),
					newItem,
				];
				set({ anonCart: updated, items: updated });
				localStorage.setItem("anon_cart", JSON.stringify(updated));
				toast.success("Item added to cart.");
				return;
			}
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
			if (!user?.email) {
				// Remove from anonCart
				const updated = get().anonCart.filter(
					(item) => item.product_id !== itemId && item.id !== itemId
				);
				set({ anonCart: updated, items: updated });
				localStorage.setItem("anon_cart", JSON.stringify(updated));
				toast.info(productName ? `${productName} removed.` : "Item removed.");
				return;
			}
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
			if (!user?.email) {
				// Update anonCart
				const updated = get().anonCart.map((item) =>
					item.product_id === itemId || item.id === itemId
						? { ...item, quantity }
						: item
				);
				set({ anonCart: updated, items: updated });
				localStorage.setItem("anon_cart", JSON.stringify(updated));
				return;
			}
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
			if (!user?.email) {
				set({ anonCart: [], items: [] });
				localStorage.removeItem("anon_cart");
				toast.info("Cart cleared.");
				return;
			}
			await swell.cart.setItems([]);
			set({ items: [] });
			toast.info("Cart cleared.");
		} catch (err) {
			toast.error("Failed to clear cart.");
			console.error("Clear cart error:", err);
		}
	},

	// Merge anon cart with Swell cart after login
	mergeAnonWithSwell: async () => {
		try {
			const anonItems = get().anonCart;
			if (anonItems.length === 0) return;
			for (const item of anonItems) {
				await swell.cart.addItem(item);
			}
			const updated = await swell.cart.get();
			set({ items: updated.items, anonCart: [] });
			localStorage.removeItem("anon_cart");
			// No toast here per user request
		} catch (err) {
			toast.error("Failed to merge guest cart.");
			console.error("Merge error:", err);
		}
	},

	// Total cart quantity
	totalCartItems: () => {
		return get().items.reduce((sum, item) => sum + (item.quantity || 0), 0);
	},
}));
