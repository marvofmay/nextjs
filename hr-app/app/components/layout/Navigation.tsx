"use client";

import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import { usePathname } from "next/navigation";
import ManageListNavigation from "../manage/navigation/List";
import SettingsListNavigation from "../settings/navigation/List";
import UserProfileNavigation from "../user/UserProfileNavigation"

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from '@mui/icons-material/Login';

import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const navLinks = [
    { href: "/", label: "HR APP", activePath: "/", icon: <HomeIcon /> },
    { href: "/home", label: "Home", activePath: "/home", icon: <HomeIcon /> },
    { href: "/info", label: "Info", activePath: "/info", icon: <InfoIcon /> },
];

const Navigation: React.FC = () => {
    const pathname = usePathname();
	//odkomentuj jeśli podepniesz backend
	//const { isAuthenticated } = useUser();
    const { isAuthenticated } = {isAuthenticated: true}; 

    return (
        <AppBar position="static" sx={{ backgroundColor: "#1A237E" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/" color="inherit" underline="none">
                    <Typography>HR APP</Typography>
                </Link>
                <div style={{ display: "flex", gap: "16px" }}>
                    {navLinks.slice(1).map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            color="inherit"
                            underline="none"
                            sx={{
                                backgroundColor: pathname.startsWith(link.activePath) ? "rgba(255, 255, 255, 0.3)" : "transparent",
                                padding: 0,
                                borderRadius: "2px",
                            }}
                        >
                            <Button color="inherit">{link.icon} {link.label}</Button>
                        </Link>
                    ))}                
                    {isAuthenticated && <ManageListNavigation />}                  
                    {isAuthenticated && <SettingsListNavigation />}
                    {isAuthenticated ? (
                        <UserProfileNavigation />
                    ) : (
                        <Link 
                            href="/login" 
                            color="inherit" 
                            underline="none"
                            sx={{
                                backgroundColor: pathname.startsWith('/login') ? "rgba(255, 255, 255, 0.3)" : "transparent",
                                color: pathname.startsWith('/login') ? "#fff" : "inherit",
                                padding: 0,
                                borderRadius: "2px",
                            }}                         
                        >
                            <Button color="inherit"><LoginIcon />Login</Button>
                        </Link>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
