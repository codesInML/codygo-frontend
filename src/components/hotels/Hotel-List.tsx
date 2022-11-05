import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import React, { useState } from "react";
import { Hotel } from "./Hotel";
import "./hotel.css";

const Hotels: React.FC = () => {
  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <div className="container">
      <Hotel />
      <Hotel />
      <Hotel />
      <div className="paginate">
        <Pagination current={current} onChange={onChange} total={50} />
      </div>
    </div>
  );
};

export default Hotels;
