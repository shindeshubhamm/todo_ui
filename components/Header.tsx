import React, { FC } from "react";
import { IoMdListBox } from "react-icons/io";

const Header: FC = () => {
  return (
    <div className="header">
      <IoMdListBox className="h-icon" />
      <h1 className="h-text">Todo App</h1>
    </div>
  );
};

export default Header;
