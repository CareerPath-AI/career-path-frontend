import React, { useState } from "react";

const UserProfile = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="user-profile-container">
      <div className="user-profile" onClick={() => setOpen(!open)}>
        <span className="user-name">{user.name}</span>
        <div className="user-avatar">{initials}</div>
        <span className="dropdown-arrow">▼</span>
      </div>

      {open && (
        <div className="dropdown-menu">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
