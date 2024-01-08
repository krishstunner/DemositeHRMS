import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  DatePicker,
  List,
  Row,
  Col,
  message,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import api from "@/service/config";
import styles from "./../styles/form.module.css";
import moment from "moment";

const AttendanceTable = () => {
  const [visible, setVisible] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [attendenceViewList, setattendenceViewList] = useState([]);

  // Dummy data for attendance status
  // const attendanceData = [
  //   { date: "2023-06-14", status: "Present" },
  //   { date: "2023-06-13", status: "Absent" },
  //   { date: "2023-06-12", status: "Present" },
  // ];

  useEffect(() => {
    getEmployeeAttendenceList();
    generateAttendanceData();
  }, []);

  const getEmployeeAttendenceList = async () => {
    setisLoading(true);
    await api
      .get("getAttendencelist")
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: `Something went wrong`,
        });
        console.log(err);
      });
    setisLoading(false);
  };

  const generateAttendanceData = () => {
    const currentDate = new Date(); // Get the current date
    const lastMonth = new Date(); // Get the date of last month
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const attendanceData = [];

    // Generate dummy data for each day within the last month until today
    let currentDateIterator = new Date(lastMonth);
    while (currentDateIterator <= currentDate) {
      const dateString = currentDateIterator.toISOString().split("T")[0];
      const status = Math.random() < 0.8 ? "Present" : "Absent"; // Randomly assign Present or Absent status

      attendanceData.push({ date: dateString, status });

      currentDateIterator.setDate(currentDateIterator.getDate() + 1);
    }

    return attendanceData;
  };

  // Generate dummy attendance data for last month until today
  // const attendanceData = generateAttendanceData();

  // const dataSource = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     daysPresent: 22,
  //     daysAbsent: 8,
  //     attendanceStatus: "Present",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     daysPresent: 20,
  //     daysAbsent: 10,
  //     attendanceStatus: "Absent",
  //   },
  //   // Add more sample data rows here...
  // ];

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Days Present (Current Month)",
      dataIndex: "daysPresent",
      key: "daysPresent",
    },
    {
      title: "Days Absent (Current Month)",
      dataIndex: "daysAbsent",
      key: "daysAbsent",
    },
    {
      title: "Today Attendance Status",
      dataIndex: "attendanceStatus",
      key: "attendanceStatus",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => handleAction(record)}>Update</Button>
          <Button type="primary" onClick={() => handleView(record)}>
            View
          </Button>
        </div>
      ),
    },
  ];

  const handleView = (record) => {
    // Open the drawer and store the selected date range
    setIsDrawerVisible(true);
    setSelectedAttendance(record);
  };

  const handleAction = (record) => {
    setSelectedAttendance(record);
    setVisible(true);
  };

  const handleDrawerClose = () => {
    setVisible(false);
  };

  const handleFormSubmit = async (values) => {
    // Handle form submission and update the attendance record
    console.log("Updated attendance:", values, selectedAttendance);
    let payload = {},
      attendenceData = selectedAttendance.attendenceData
        ? selectedAttendance.attendenceData
        : {};
    let attendencedataKeys = selectedAttendance.attendenceData
      ? Object.keys(selectedAttendance.attendenceData)
      : [];
    const todayDate = moment().format("DD-MM-YYYY");
    const datePresentInJson = attendencedataKeys.filter((a) => a == todayDate);

    if (
      values?.attendanceStatus == "Present" &&
      selectedAttendance.attendanceStatus !== "Present"
    ) {
      attendenceData[todayDate] = {
        LoggedInTime: moment().format("HH:mm:ss"),
        LoggedOutTime: "-",
        hoursLoggedIn: "-",
        updatedBy: "admin",
        status: "Present",
      };
      payload = {
        todayStatus: values?.attendanceStatus,
        daysPresentInCurrentMonth: selectedAttendance.daysPresent
          ? selectedAttendance.daysPresent + 1
          : 1,
        daysAbsentInCurrentMonth: selectedAttendance.daysAbsent
          ? selectedAttendance.daysAbsent - 1
          : 0,
        attendenceData: {
          ...attendenceData,
        },
      };
    } else if (
      values?.attendanceStatus == "Absent" &&
      selectedAttendance.attendanceStatus !== "Absent"
    ) {
      attendenceData[todayDate] = {
        LoggedInTime: "-",
        LoggedOutTime: "-",
        hoursLoggedIn: "-",
        updatedBy: "admin",
        status: "Absent",
      };
      payload = {
        todayStatus: values?.attendanceStatus,
        daysPresentInCurrentMonth: selectedAttendance.daysPresent
          ? selectedAttendance.daysPresent - 1
          : 0,
        daysAbsentInCurrentMonth: selectedAttendance.daysAbsent
          ? selectedAttendance.daysAbsent + 1
          : 1,
        attendenceData: {
          ...attendenceData,
        },
      };
    } else {
      attendenceData[todayDate] = {
        LoggedInTime: moment().format("HH:mm:ss"),
        LoggedOutTime: "-",
        hoursLoggedIn: "-",
        updatedBy: "admin",
        status: "Present",
      };
      payload = {
        todayStatus: values?.attendanceStatus,
      };
    }

    await api
      .put(`attendences/${selectedAttendance.attendenceId}`, {
        data: payload,
      })
      .then((res) => {
        // setDataSource(res.data);
        getEmployeeAttendenceList();
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: `Something went wrong`,
        });
        console.log(err);
      });
    // Close the drawer
    setVisible(false);
  };
  // const filteredAttendanceData = attendanceData.filter((item) => {
  //   const date = new Date(item.date);
  //   if (selectedDateRange) {
  //     return date >= selectedDateRange[0] && date <= selectedDateRange[1];
  //   } else return false;
  // });
  const handleDateRangeChange = (dates) => {
    const fromDate = moment(dates[0].$d).format("DD-MM-YYYY");
    const toDate = moment(dates[1].$d).format("DD-MM-YYYY");
    setSelectedDateRange(dates);
    // attendenceDateRangeCalc([fromDate, toDate]);
    console.log("selectedAttendance", selectedAttendance);
    const list = filterByDateRange(
      fromDate,
      toDate,
      selectedAttendance?.attendenceData
    );
    console.log("list", list);
    const viewList = list ? [...list] : [];
    setattendenceViewList(viewList);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // Function to filter objects within the selected date range
  function filterByDateRange(startDate, endDate, data) {
    let listData = [];
    Object.keys(data).forEach((date) => {
      let filteredData = {};
      console.log(date, startDate, endDate);
      const currentDate = moment(date, "DD-MM-YYYY").format("YYYYMMDD");
      const start = moment(startDate, "DD-MM-YYYY").format("YYYYMMDD");
      const end = moment(endDate, "DD-MM-YYYY").format("YYYYMMDD");
      console.log(
        currentDate >= start && currentDate <= end,
        currentDate,
        start,
        currentDate,
        end
      );
      if (currentDate >= start && currentDate <= end) {
        // console.log("data", data, data[date].status, date);
        // filteredData[date] = data[date];
        filteredData = {
          status: data[date].status,
          date: date,
        };
      }
      console.log("filteredData", filteredData);
      listData.push(filteredData);
    });
    console.log("listData", listData);
    return listData;
  }
  const handleAttendenceStatus = () => {
    setIsDrawerVisible(false);
    setSelectedDateRange(null);
    setattendenceViewList([]);
  };
  // const atte
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
      {contextHolder}
      <Drawer
        title="Update Attendance"
        visible={visible}
        onClose={handleDrawerClose}
        destroyOnClose={true}
        width={400}
      >
        {selectedAttendance && (
          <Form
            onFinish={handleFormSubmit}
            initialValues={selectedAttendance}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            labelAlign="left"
          >
            <Form.Item name="id" label="Employee Id">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="name" label="Name">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item
              name="attendanceStatus"
              label={
                <span className={styles.custom_label}>
                  Today Attendance Status
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please enter the attendance status",
                },
              ]}
            >
              <Select
                defaultValue="present"
                style={{ width: 235 }}
                onChange={handleChange}
                options={[
                  { value: "Present", label: "Present" },
                  { value: "Absent", label: "Absent" },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>

      <Drawer
        title="Attendance Status"
        visible={isDrawerVisible}
        onClose={handleAttendenceStatus}
        width={400}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        {selectedAttendance && (
          <Form onFinish={handleFormSubmit} initialValues={selectedAttendance}>
            <Form.Item name="id" label="Employee Id">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item name="name" label="Name">
              <Input disabled={true} />
            </Form.Item>
            <Form.Item label="Please select date range"></Form.Item>
            <Form.Item>
              <DatePicker.RangePicker
                onChange={handleDateRangeChange}
                value={selectedDateRange}
              />{" "}
            </Form.Item>
          </Form>
        )}
        <Row style={{ fontWeight: "bold" }}>
          <Col span={21}>Date</Col> <Col span={3}>Status</Col>
        </Row>
        <List
          // dataSource={filteredAttendanceData || attendanceData}
          dataSource={attendenceViewList}
          renderItem={(item) => (
            <List.Item>
              <div> {item.date}</div>
              <div style={{ fontWeight: "bold" }}>
                <span
                  style={
                    item.status == "Present"
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  {item.status}
                </span>
              </div>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default AttendanceTable;
