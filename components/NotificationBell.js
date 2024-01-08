import React, { useEffect, useState } from "react";
import { BellOutlined } from "@ant-design/icons";
import { notification, Popover, List } from "antd";

const NotificationBell = () => {
  const notificationTypes = [
    "Leave Request Approval",
    "Promotion Approval",
    "Termination Approval",
  ];
  const [notifications, setNotifications] = useState([]);

  const showNotification = () => {
    const randomNotificationType =
      notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const randomMessage = `New ${randomNotificationType}`;

    const newNotification = {
      id: Date.now(),
      message: randomMessage,
    };

    setNotifications((prevNotifications) => [
      newNotification,
      ...prevNotifications,
    ]);

    notification.info({
      message: "Notification",
      description: randomMessage,
      duration: 6,
      onClose: () => removeNotification(newNotification.id),
    });
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      showNotification();
    }, 60000); // Every 1 minute (60,000 milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, []);

  const content = (
    <List
      size="small"
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta description={item.message} />
        </List.Item>
      )}
    />
  );

  return (
    <Popover content={content} title="Notifications" placement="bottomRight">
      <BellOutlined
        style={{ fontSize: "24px", marginRight: "8px", color: "white" }}
      />
    </Popover>
  );
};

export default NotificationBell;
