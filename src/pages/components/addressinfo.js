import { getCookie } from "../utils/Functions";

export default function AddressInfo() {
    const addressRaw = getCookie('address');

    const address = addressRaw ? addressRaw : null;
        return (
            <div className="address-card">
                <h2 className="address-title">Address Information</h2>
                <div className="address-field"><strong>Street:</strong> {address.street}</div>
                <div className="address-field"><strong>City:</strong> {address.city}</div>
                <div className="address-field"><strong>Country:</strong> {address.country}</div>
                <div className="address-field"><strong>ZIP Code:</strong> {address.zip}</div>
                <div className="address-field"><strong>Phone:</strong> {address.phone}</div>
            </div>
        );
    

    
}
