import swell from "swell-js";

const storeId = import.meta.env.VITE_SWELL_STORE_ID;
const publicKey = import.meta.env.VITE_SWELL_PUBLIC_KEY;

swell.init(storeId, publicKey);

export default swell;
