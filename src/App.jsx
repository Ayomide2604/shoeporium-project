import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
function App() {
	return (
		<>
			<Header />
			<div className="container">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
}

export default App;
