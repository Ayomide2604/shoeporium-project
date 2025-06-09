import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import useCartStore from "./store/useCartStore";
import useAuthStore from "./store/useAuthStore";

function ProtectedRoute({ children }) {
	const user = useAuthStore((state) => state.user);
	const location = useLocation();
	if (!user || !user.email) {
		return (
			<Navigate
				to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
				replace
			/>
		);
	}
	return children;
}

function App() {
	const location = useLocation();
	const getCart = useCartStore((state) => state.getCart);

	useEffect(() => {
		getCart();
	}, [location]);

	return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/shop" element={<ShopScreen />} />
					<Route path="/shop/:id" element={<ProductDetailScreen />} />
					<Route path="/cart" element={<CartScreen />} />
					<Route
						path="/checkout"
						element={
							<ProtectedRoute>
								<CheckoutScreen />
							</ProtectedRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
