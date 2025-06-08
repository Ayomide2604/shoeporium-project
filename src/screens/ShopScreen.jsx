import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import ShopSidebar from "../components/ShopSidebar";
import useProductStore from "../store/useProductStore";
import Product from "../components/Product";
import useCategoryStore from "../store/useCategoryStore";
import Preloader from "../components/Preloader";

const ShopScreen = () => {
	const getImageUrl = (product) => {
		if (product?.images?.[0]?.file?.url) {
			return product.images[0].file.url;
		}
		// return defaultProduct;
	};
	const { products, fetchProducts, productsLoading } = useProductStore();
	const { categories, fetchCategories, categoriesLoading } = useCategoryStore();
	const [activeCategory, setActiveCategory] = useState(null);
	const handleCategoryChange = (categoryId) => {
		setActiveCategory(categoryId);
	};
	useEffect(() => {
		fetchProducts();
		fetchCategories();
	}, []);

	if (productsLoading || categoriesLoading) {
		return <Preloader />;
	}
	return (
		<>
			<BreadCrumb title="Shop" />
			<section className="shop spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-3">
							<ShopSidebar categories={categories} />
						</div>
						<div className="col-lg-9 col-md-9">
							<div className="row">
								{products.map((product) => {
									const imageUrl = getImageUrl(product);
									return (
										<div key={product.id} className="col-lg-4 col-md-6">
											<Product
												id={product.id}
												name={product.name}
												price={product.price}
												image={imageUrl}
											/>
										</div>
									);
								})}

								<div className="col-lg-12 text-center">
									<div className="pagination__option">
										<a href="#">1</a>
										<a href="#">2</a>
										<a href="#">3</a>
										<a href="#">
											<i className="fa fa-angle-right" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ShopScreen;
