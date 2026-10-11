import { NavLink } from "react-router-dom";
import meepleBlack from "../../meeple_black.png";

export const Logo = () => {
  return (
    <NavLink to="/games" className="logo-link">
      <div className="logo-pip">
        <img src={meepleBlack} alt="Board Games Blog Logo" />
      </div>
      <span className="logo-text">MI LUDOTECA</span>
    </NavLink>
  )
}