import React from "react";
import { Tabs } from "antd";

function Review() {
  const items = [
    {
      label: `Attendance Regulariz`,
      key: 1,
      // disabled: i === 28,
      children: "attendance regulariz",
    },
    {
      label: `Resignations`,
      key: 2,
      // disabled: i === 28,
      children: "resignations",
    },
    {
      label: "Helpdesk",
      key: 3,
      // disabled: i === 28,
      children: "helpdesk",
    },
    {
      label: "Leave",
      key: 4,
      // disabled: i === 28,
      children: "leave",
    },
    {
      label: "leave Cancel",
      key: 5,
      // disabled: i === 28,
      children: "leave Cancel",
    },
    {
      label: "leave Comp Off",
      key: 6,
      // disabled: i === 28,
      children: "leave Comp off",
    },
    {
      label: "Restricted Holidays",
      key: 7,
      // disabled: i === 28,
      children: "Restricted Holidays",
    },
  ];
  return (
    <div>
      <h3>Review</h3>
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

export default Review;
