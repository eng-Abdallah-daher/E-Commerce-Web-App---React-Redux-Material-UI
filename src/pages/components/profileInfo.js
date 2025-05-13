import React from 'react';
import { useSelector } from 'react-redux';
export default function ProfileInfo() {
    const currentUser = useSelector(state => state.user.currentUser);
    const email = currentUser?.email || '';
    const userName = currentUser?.name || 'Guest User';
    const userimage = currentUser?.userimage || 'https://via.placeholder.com/100';
    return (
        <div
            className="profile-card"
            role="region"
            aria-label="Profile Information"
            tabIndex="0"
        >
            <div className="profile-image-wrapper">
                <img
                    src={userimage}
                    alt={`${userName}'s profile`}
                    className="profile-image"
                    style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                    tabIndex="0"
                />
            </div>
            <div className="profile-details">
                <h2
                    className="profile-name"
                    tabIndex="0"
                >
                    {userName}
                </h2>
                <p
                    className="profile-email"
                    tabIndex="0"
                >
                    {email}
                </p>
            </div>
        </div>
    );
}
