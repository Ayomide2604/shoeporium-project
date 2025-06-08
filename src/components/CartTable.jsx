import { FaX } from "react-icons/fa6";
import adidas from "../assets/img/adidas.jpg";

const CartTable = ({}) => {
	return (
		<div className="shop__cart__table">
			<table>
				<thead>
					<tr>
						<th>Product</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="cart__product__item">
							<img src={adidas} />
							<div className="cart__product__item__title">
								<h6>Chain bucket bag</h6>
							</div>
						</td>
						<td className="cart__price">$ 150.0</td>
						<td className="cart__quantity">
							<div className="pro-qty">
								<input type="text" value="1" />
							</div>
						</td>
						<td className="cart__total">$ 300.0</td>
						<td className="cart__close">
							<span className="icon_close">
								<FaX />
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default CartTable;
