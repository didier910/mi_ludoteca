import { NavLink } from "react-router-dom";

export const Logo = () => {
  return (
    <NavLink to="/games" className="logo-link">
      <div className="logo-pip">
        <img src='/meeple_black.png' alt="Board Games Blog Logo" />
      </div>
      <span className="logo-text">MI LUDOTECA</span>
    </NavLink>
  )
}