import BreadCrumb from "../components/BreadCrumb";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useProductStore from "../store/useProductStore";
import Preloader from "../components/Preloader";
import formatter from "../utils/currencyFormatter";

import ProductDetailImage from "../components/ProductDetailImage";

const ProductDetailScreen = () => {
	const { id } = useParams();
	const { fetchProductById, productLoading, product } = useProductStore();
	const swiperRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		fetchProductById(id);
		console.log(product);
	}, [id]);

	useEffect(() => {
		if (
			swiperRef.current &&
			swiperRef.current.swiper &&
			swiperRef.current.swiper.activeIndex !== activeIndex
		) {
			swiperRef.current.swiper.slideTo(activeIndex, 0);
		}
	}, [activeIndex]);

	if (productLoading) {
		return <Preloader />;
	}
	return (
		<div>
			<BreadCrumb title={product?.name} />

			<section className="product-details spad">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<ProductDetailImage
								product={product}
								activeIndex={activeIndex}
								setActiveIndex={setActiveIndex}
								swiperRef={swiperRef}
							/>
						</div>
						<div className="col-lg-6">
							<div className="product__details__text">
								<h3>
									{product?.name}
									<span className="d-flex col-1 badge badge-pill bg-secondary text-white ">
										{" "}
										{product?.categories[0]?.name}
									</span>
								</h3>
								{/* <div className="rating">
									<i className="fa fa-star" />
									<i className="fa fa-star" />
									<i className="fa fa-star" />
									<i className="fa fa-star" />
									<i className="fa fa-star" />
									<span>( 138 reviews )</span>
								</div> */}
								<div className="product__details__price">
									{formatter.format(product?.price)}
								</div>
								<p
									dangerouslySetInnerHTML={{
										__html: product?.description,
									}}
								/>
								<div className="product__details__button">
									<div className="quantity">
										<span>Quantity:</span>
										<div className="pro-qty">
											<input type="text" defaultValue={1} />
										</div>
									</div>
									<a href="#" className="cart-btn">
										<span className="icon_bag_alt" /> Add to cart
									</a>
									<ul>
										<li>
											<a href="#">
												<span className="icon_heart_alt" />
											</a>
										</li>
										<li>
											<a href="#">
												<span className="icon_adjust-horiz" />
											</a>
										</li>
									</ul>
								</div>
								<div className="product__details__widget">
									<ul>
										<li>
											<span>Availability:</span>
											<div className="stock__checkbox">
												<label htmlFor="stockin">
													In Stock
													<input type="checkbox" id="stockin" />
													<span className="checkmark" />
												</label>
											</div>
										</li>
										<li>
											<span>Available color:</span>
											<div className="color__checkbox">
												<label htmlFor="red">
													<input
														type="radio"
														name="color__radio"
														id="red"
														defaultChecked=""
													/>
													<span className="checkmark" />
												</label>
												<label htmlFor="black">
													<input type="radio" name="color__radio" id="black" />
													<span className="checkmark black-bg" />
												</label>
												<label htmlFor="grey">
													<input type="radio" name="color__radio" id="grey" />
													<span className="checkmark grey-bg" />
												</label>
											</div>
										</li>
										<li>
											<span>Available size:</span>
											<div className="size__btn">
												<label htmlFor="xs-btn" className="active">
													<input type="radio" id="xs-btn" />
													xs
												</label>
												<label htmlFor="s-btn">
													<input type="radio" id="s-btn" />s
												</label>
												<label htmlFor="m-btn">
													<input type="radio" id="m-btn" />m
												</label>
												<label htmlFor="l-btn">
													<input type="radio" id="l-btn" />l
												</label>
											</div>
										</li>
										<li>
											<span>Promotions:</span>
											<p>Free shipping</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProductDetailScreen;
