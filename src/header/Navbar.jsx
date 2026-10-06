import { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { Logo } from "./Logo";
import { Bars } from "../pages/Icons";

const getNavLinkClassName = ({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`;

const navigationItems = [
    { to: '/games', label: 'Juegos' },
    { to: '/glosario', label: 'Glosario' },
    { to: '/premios', label: 'Premios' },
    { to: '/marcadores', label: 'Marcadores' }
];

const NavigationLink = ({ to, children, onClick }) => (
    <li>
        <NavLink
            className={getNavLinkClassName}
            to={to}
            onClick={onClick}
        >
            {children}
        </NavLink>
    </li>
);

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    const handleLinkClick = useCallback(() => {
        setMenuOpen(false);
    }, []);

    return (
        <nav>
            <div className="title">
                <Logo />
            </div>
            <div className="menu" onClick={handleMenuToggle}>
                <Bars />
            </div>

            <ul className={menuOpen ? "open" : ""}>
                {navigationItems.map(({ to, label }) => (
                    <NavigationLink
                        key={to}
                        to={to}
                        onClick={handleLinkClick}
                    >
                        {label}
                    </NavigationLink>
                ))}
            </ul>
        </nav>
    );
};
