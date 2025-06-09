import formatter from "../utils/currencyFormatter";
const OrderSummary = ({ items }) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const total = subtotal;
	return (
		<div className="checkout__order">
			<h5>Your order</h5>
			<div className="checkout__order__product">
				<ul>
					<li>
						<span className="top__text">Product</span>
						<span className="top__text__right">Total</span>
					</li>
					{items?.map((item, idx) => (
						<li key={item.id}>
							{`${idx + 1}.`} {item?.product?.name}{" "}
							<span>{formatter.format(item?.product?.price)}</span>
						</li>
					))}
				</ul>
			</div>
			<div className="checkout__order__total">
				<ul>
					<li>
						Subtotal <span>{formatter.format(subtotal)}</span>
					</li>
					<li>
						Total <span>{formatter.format(total)}</span>
					</li>
				</ul>
			</div>
			{/* <div className="checkout__order__widget">
				<label htmlFor="o-acc">
					Create an acount?
					<input type="checkbox" id="o-acc" />
					<span className="checkmark" />
				</label>
				<p>
					Create am acount by entering the information below. If you are a
					returing customer login at the top of the page.
				</p>
				<label htmlFor="check-payment">
					Cheque payment
					<input type="checkbox" id="check-payment" />
					<span className="checkmark" />
				</label>
				<label htmlFor="paypal">
					PayPal
					<input type="checkbox" id="paypal" />
					<span className="checkmark" />
				</label>
			</div> */}
		</div>
	);
};

export default OrderSummary;
