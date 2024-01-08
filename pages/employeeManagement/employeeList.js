import Employees from "./../../components/Employees";
import Layout from "./../../components/Layout";

const EmployeesPage = () => {
  return (
    <Layout>
      <h2 style={{ marginBottom: "20px" }}>Employee Management</h2>
      <Employees />
    </Layout>
  );
};

export default EmployeesPage;
