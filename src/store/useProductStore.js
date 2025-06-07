import { create } from "zustand";
import swell from "../utils/swellApi";

const useProductStore = create((set) => ({
	products: [],
	productsLoading: false,
	productLoading: false,
	productsError: null,
	productError: null,
	fetchProducts: async () => {
		try {
			set((state) => ({
				...state,
				productsLoading: true,
				productsError: null,
			}));

			const { results } = await swell.products.list({
				expand: ["categories"],
			});

			set((state) => ({
				...state,
				products: results,
				productsLoading: false,
			}));
		} catch (error) {
			set((state) => ({
				...state,
				productsError: error.message,
				productsLoading: false,
			}));
			console.error("Error fetching products:", error);
		}
	},
	fetchProductById: async (id) => {
		set((state) => ({ ...state, productLoading: true, productError: null }));
		try {
			const product = await swell.products.get(id, { expand: ["categories"] });
			set((state) => ({
				...state,
				productLoading: false,
				productError: null,
				product: product,
			}));
			return product;
		} catch (error) {
			set((state) => ({
				...state,
				productError: error.message,
				productLoading: false,
			}));
			console.error("Error fetching product by id:", error);
			return null;
		}
	},
}));

export default useProductStore;
