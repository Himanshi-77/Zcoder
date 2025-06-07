'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const handleSignout = () => {
    window.sessionStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (!token) return;

    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getAuth`, {
      headers: { Authorization: `${token}` },
    }).then(res => {
      setAuthUser(res.data);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + "/")
      ? "underline underline-offset-4 text-black"
      : "text-gray-700";

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Create Room", path: "/createRoom" },
    { label: "Join Room", path: "/joinroom" },
    { label: "FAQ", path: "/ask_form" },
    { label: "Code Editor", path: "/codeEditor" },
  ];

  return (
    <nav style={{ backgroundColor: '#F2F2F2' }} className="border-b border-[#EAE4D5]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

        {/* Logo - fixed to left */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-2xl font-semibold text-black cursor-pointer">Zcoder</span>
        </Link>

        {/* Nav links container - flex-grow to take available space */}
        <div className={`hidden md:flex md:flex-grow md:justify-center md:space-x-6`}>
          {navLinks.map(({ label, path }) => (
            <Link key={path} href={path}>
              <span className={`px-3 py-2 rounded text-sm font-medium hover:bg-[#EAE4D5] transition cursor-pointer ${isActive(path)}`}>
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* User icon and hamburger on right */}
        <div className="flex items-center gap-3">

          <button
            ref={userButtonRef}
            onClick={toggleUserMenu}
            className="flex text-sm bg-[#B6B09F] rounded-full p-1.5 hover:opacity-90 focus:ring-4 focus:ring-[#EAE4D5]"
            aria-label="User menu"
          >
            <Image
              src="/userlogo.jpg"
              alt="User profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </button>

          {userMenuOpen && (
            <div
              ref={userMenuRef}
              className="absolute top-12 right-0 z-50 bg-white border border-[#B6B09F] rounded-lg shadow-md w-48"
            >
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-black">{authUser?.name}</p>
                <p className="text-sm text-gray-600 truncate">{authUser?.email}</p>
              </div>
              <ul className="py-2">
                <li>
                  <button
                    onClick={handleSignout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#EAE4D5]"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Hamburger menu for mobile */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-500 hover:bg-[#EAE4D5] rounded-lg"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile nav links */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-[#F2F2F2] border-t border-[#EAE4D5] ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col p-4 space-y-2">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link href={path}>
                  <span
                    className={`block px-3 py-2 rounded text-sm font-medium hover:bg-[#EAE4D5] ${isActive(path)}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
}
