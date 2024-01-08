import React, { useState } from "react";
import { Space, Table, Tag } from "antd";
import { Switch } from "antd";
import "../style.css";
import { Collapse } from "antd";
const YTDReports = () => {
  const [isButton1Active, setIsButton1Active] = useState(true);

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === 1 && !isButton1Active) {
      setIsButton1Active(true);
    } else if (buttonNumber === 2 && isButton1Active) {
      setIsButton1Active(false);
    }
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const items = [
    {
      key: "1",
      label: "Income",
      children: <Table dataSource={dataSource} columns={columns} />,
    },
    {
      key: "2",
      label: "Deduction",
      children: <Table dataSource={dataSource} columns={columns} />,
    },
    {
      key: "3",
      label: "Days",
      children: <Table dataSource={dataSource} columns={columns} />,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div className="YTDContent">
      <h3> YTD Reports</h3>
      <div className="YTDReports">
        <button
          onClick={() => handleButtonClick(1)}
          // disabled={isButton1Active}
          className={
            isButton1Active
              ? "YTDStatementbtnActive"
              : "YTDStatementbtnInactive"
          }
        >
          YTD Statement
        </button>
        <button
          onClick={() => handleButtonClick(2)}
          // disabled={!isButton1Active}
          className={
            !isButton1Active
              ? "YTDStatementbtnActive"
              : "YTDStatementbtnInactive"
          }
        >
          PF YTD Statement
        </button>
      </div>
      <div>
        {isButton1Active ? (
          <div>
            <div className="YTDSumary">
              <h3>YTD Summary</h3>
            </div>
            <Collapse
              items={items}
              defaultActiveKey={["1"]}
              onChange={onChange}
            />
            ;
          </div>
        ) : (
          <div>
            <div className="YTDSumary">
              <h3>PF YTD Summary</h3>
            </div>
            <Table dataSource={dataSource} columns={columns} />;
          </div>
        )}
      </div>
    </div>
  );
};

export default YTDReports;
