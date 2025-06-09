const Preloader = ({ message }) => {
	return (
		<div id="preloder">
			<div className="loader"></div>
			{message ? (
				<div style={{ textAlign: "center", marginTop: 16, color: "#333", fontWeight: 500 }}>{message}</div>
			) : null}
		</div>
	);
};

export default Preloader;
