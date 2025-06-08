import { Routes, Route } from "react-router-dom";
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
import { useLocation } from "react-router-dom";
import { useCartStore } from "./store/useCartStore";

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
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
