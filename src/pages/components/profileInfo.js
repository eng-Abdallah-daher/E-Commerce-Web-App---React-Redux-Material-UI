import { getCookie } from "../utils/Functions";

export default function ProfileInfo() {
    const email = getCookie("email");
    const userName = getCookie("userName");
    const userimage = getCookie("userimage");

    return (
        <div className="profile-card">
            <div className="profile-image-wrapper">
                <img src={userimage} alt="User" className="profile-image"
                style={{ borderRadius: '50%' ,width: '100px', height: '100px' }}
                />
            </div>
            <div className="profile-details">
                <h2 className="profile-name">{userName}</h2>
                <p className="profile-email">{email}</p>
            </div>
        </div>
    );
}
