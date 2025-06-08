import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";
function App() {
	return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/shop" element={<ShopScreen />} />
					<Route path="/shop/:id" element={<ProductDetailScreen />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
