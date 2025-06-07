import React from "react";

const ProductTabs = ({ selectedCategory, onSelect, categories }) => {
	return (
		<div className="col-lg-8 col-md-8 col-sm-8">
			<ul className="filter__controls">
				<li
					className={`${selectedCategory === null ? "active" : ""}`}
					onClick={() => onSelect(null)}
				>
					All
				</li>

				{categories.map((category) => (
					<li
						key={category.id}
						onClick={() => onSelect(category.id)}
						className={`${selectedCategory === category.id ? "active" : ""}`}
					>
						{category.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductTabs;
