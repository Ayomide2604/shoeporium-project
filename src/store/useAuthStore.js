import { create } from "zustand";
import { persist } from "zustand/middleware";
import swell from "./../utils/swellApi";
import { toast } from "react-toastify";

const useAuthStore = create(
	persist(
		(set) => ({
			user:
				JSON.parse(localStorage.getItem("auth-storage"))?.state?.user || null,
			loading: false,
			error: null,

			login: async (email, password) => {
				set({ loading: true, error: null });
				try {
					const session = await swell.account.login(email, password);
					set({ user: session });
					console.log("Login successful:", session);
					toast.success("Login successful!");
				} catch (err) {
					set({ error: err.message || "Login failed" });
					console.error("Login error:", err);
					toast.error(err.message || "Login failed");
				} finally {
					set({ loading: false });
				}
			},

			register: async (email, password, first_name, last_name) => {
				set({ loading: true, error: null });
				try {
					await swell.account.create({
						email,
						password,
						first_name,
						last_name,
					});
					toast.success("Registration successful!");
				} catch (err) {
					set({ error: err.message || "Registration failed" });
					console.error("Registration error:", err);
					toast.error(err.message || "Registration failed");
				} finally {
					set({ loading: false });
				}
			},

			logout: async () => {
				set({ loading: true, error: null });
				try {
					await swell.account.logout();
					set({ user: null });
					toast.info("Logout successful!");
				} catch (err) {
					set({ error: err.message || "Logout failed" });
					console.error("Logout error:", err);
					toast.error(err.message || "Logout failed");
				} finally {
					set({ loading: false });
				}
			},

			fetchUser: async () => {
				set({ loading: true, error: null });
				try {
					const user = await swell.account.get();
					set({ user });
				} catch (err) {
					set({ error: err.message || "Could not fetch user" });
					console.error("Fetch user error:", err);
				} finally {
					set({ loading: false });
				}
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({ user: state.user }),
		}
	)
);

export default useAuthStore;
