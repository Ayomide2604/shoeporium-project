import React, { useEffect, useState } from "react";
import Hero from "../pages/Hero";
import Preloader from "../components/Preloader";
import LatestProducts from "../pages/LatestProducts";
import useProductStore from "../store/useProductStore";
import useCategoryStore from "./../store/useCategoryStore";
import ProductTabs from "../components/ProductTabs";
const HomeScreen = () => {
	const { products, fetchProducts, productsLoading } = useProductStore();
	const { categories, fetchCategories, categoriesLoading } = useCategoryStore();
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [filteredProducts, setFilteredProducts] = useState(products);

	const handleSelectedCategory = (categoryId) => {
		setSelectedCategory(categoryId);
		console.log("Selected Category:", categoryId);
	};
	useEffect(() => {
		fetchProducts();
		fetchCategories();
	}, []);

	useEffect(() => {
		if (selectedCategory) {
			const filtered = products.filter((product) =>
				product.categories.some((category) => category.id === selectedCategory)
			);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(products);
		}
	}, [selectedCategory, products]);

	if (productsLoading || categoriesLoading) {
		return <Preloader />;
	}
	return (
		<div>
			<Hero />
			<section className="product spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-4 col-md-4">
							<div className="section-title">
								<h4>New product</h4>
							</div>
						</div>
						<ProductTabs
							categories={categories}
							selectedCategory={selectedCategory}
							onSelect={handleSelectedCategory}
						/>
					</div>
					<LatestProducts products={filteredProducts} />
				</div>
			</section>
		</div>
	);
};

export default HomeScreen;
