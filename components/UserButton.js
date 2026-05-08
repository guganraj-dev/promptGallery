'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, User } from 'lucide-react';
import { useState } from 'react';

export default function UserButton() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return <div className="user-skeleton"></div>;
  }

  if (status === "unauthenticated") {
    return (
      <button 
        onClick={() => signIn('google')} 
        className="btn btn-primary login-btn"
      >
        <LogIn size={18} />
        <span>Login with Google</span>
      </button>
    );
  }

  return (
    <div className="user-menu-container">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="user-profile-btn"
      >
        {session.user.image ? (
          <img src={session.user.image} alt={session.user.name} className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            <User size={20} />
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div className="menu-overlay" onClick={() => setIsOpen(false)}></div>
          <div className="user-dropdown">
            <div className="user-info">
              <p className="user-name">
                {session.user.name}
                {session.user.role === 'admin' && <span className="admin-badge">Admin</span>}
              </p>
              <p className="user-email">{session.user.email}</p>
            </div>
            <div className="menu-divider"></div>
            <button 
              onClick={() => signOut()} 
              className="menu-item logout"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .user-menu-container {
          position: relative;
        }
        .user-profile-btn {
          background: none;
          border: 2px solid var(--border-color, #333);
          padding: 2px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          overflow: hidden;
        }
        .user-profile-btn:hover {
          border-color: #818cf8;
          transform: scale(1.05);
        }
        .user-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
        .user-avatar-placeholder {
          color: var(--text-muted);
        }
        .user-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          min-width: 200px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          z-index: 1000;
          padding: 8px;
          animation: slideIn 0.2s ease-out;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .user-info {
          padding: 12px;
        }
        .user-name {
          font-weight: 600;
          font-size: 0.95rem;
          margin: 0;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .admin-badge {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          font-size: 0.65rem;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .user-email {
          font-size: 0.8rem;
          color: #888;
          margin: 4px 0 0 0;
        }
        .menu-divider {
          height: 1px;
          background: #333;
          margin: 8px 0;
        }
        .menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          background: none;
          border: none;
          color: #ccc;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }
        .menu-item:hover {
          background: #2a2a2a;
          color: #fff;
        }
        .menu-item.logout:hover {
          background: #fee2e210;
          color: #ef4444;
        }
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
        }
        .user-skeleton {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #2a2a2a;
          animation: pulse 1.5s infinite ease-in-out;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .login-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          font-weight: 500;
          background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
          border: none;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
        }
      `}</style>
    </div>
  );
}
