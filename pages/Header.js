import Link from "next/link";
import { useState } from "react";
const Header = () => {
  const [state, setState] = useState(false)
  const handleToggle = () => {
    setState(!state)
  };
  const classLi = state ? 'menu active' : 'menu'
  return (
    <div className="header">
      <h1>Insiderable<span>beta</span></h1>
      <a href="#" className="toggle-button" onClick={handleToggle}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className={classLi}>
        <ul>
          <li>
            <Link href={"/jobs"}>Jobs</Link>
          </li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
