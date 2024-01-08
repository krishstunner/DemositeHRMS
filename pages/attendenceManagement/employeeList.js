import Attendance from "./../../components/Attendance";
import Layout from "../../components/Layout";

const AttendancePage = () => {
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Attendance Management</h2>
      <Attendance />
    </Layout>
  );
};

export default AttendancePage;
