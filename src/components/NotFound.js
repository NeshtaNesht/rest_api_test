import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>Страница не найдена :(</h3>
      <Link to="/">
        <h4>На главную</h4>
      </Link>
    </div>
  );
};

export default NotFound;
