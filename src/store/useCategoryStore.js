import { create } from "zustand";
import swell from "../utils/swellApi";

const useCategoryStore = create((set) => ({
	categories: [],
	categoriesLoading: true,
	categoriesError: null,
	fetchCategories: async () => {
		try {
			set((state) => ({
				...state,
				categoriesLoading: true,
				error: null,
			}));

			const { results } = await swell.categories.list();

			set((state) => ({
				...state,
				categories: results,
				categoriesLoading: false,
			}));
		} catch (error) {
			set((state) => ({
				...state,
				error: error.message,
				categoriesLoading: false,
			}));
			console.error("Error fetching categories:", error);
		}
	},
}));

export default useCategoryStore;
