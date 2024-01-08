import React from "react";
import { Tabs } from "antd";
function Feeds() {
  const items = [
    {
      label: `All feeds`,
      key: 1,
      // disabled: i === 28,
      children: "all feeds",
    },
    {
      label: `Everyone`,
      key: 2,
      // disabled: i === 28,
      children: "everyone",
    },
    {
      label: "Events",
      key: 3,
      // disabled: i === 28,
      children: "events",
    },
    {
      label: "Company News",
      key: 4,
      // disabled: i === 28,
      children: "company news",
    },
    {
      label: "Appreciation",
      key: 5,
      // disabled: i === 28,
      children: "appreciation",
    },
    {
      label: "Buy/Sell/Rent",
      key: 6,
      // disabled: i === 28,
      children: "buy/sell/rent",
    },
  ];
  return (
    <div>
      <h3>Groups</h3>
      <Tabs
        defaultActiveKey="1"
        tabPosition={"left"}
        style={{
          height: 500,
        }}
        items={items}
      />
    </div>
  );
}

export default Feeds;
