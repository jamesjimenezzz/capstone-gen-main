import React from "react";
import LoginButton from "./LoginLogoutButton";
import UserGreetText from "./UserGreetText";

const Header = () => {
  return (
    <div className="flex justify-between items-center text-center justify-center mb-5 ">
      <ul className="flex items-center gap-8 text-center justify-center">
        <li>
          <UserGreetText />
        </li>
        <li>Home </li>
        <li>Favorites</li>
      </ul>
      <ul>
        <li>
          {" "}
          <LoginButton />{" "}
        </li>
      </ul>
    </div>
  );
};

export default Header;
