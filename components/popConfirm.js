import React, { useState } from "react";
import { Button, Popconfirm } from "antd";
const popConfirm = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showPopconfirm = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    props.submit();
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  console.log("props", props, props.open);
  return (
    <Popconfirm
      title={props.title}
      description={props.description}
      open={props.open}
      onConfirm={handleOk}
      okButtonProps={{
        loading: confirmLoading,
      }}
      onCancel={handleCancel}
    >
      <Button type="primary" onClick={showPopconfirm}>
        Open Popconfirm with async logic
      </Button>
    </Popconfirm>
  );
};
export default popConfirm;
