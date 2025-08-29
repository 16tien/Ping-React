import { Card, Col, Row, Table, List, Spin, Alert } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CheckCircle, WifiOff } from "lucide-react";
import { useDashboardData } from "../hooks/useDashboardData";

const Dashboard = () => {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải dữ liệu dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert message="Lỗi tải dashboard" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!data) return null;

  const chartWidth = Math.max(data.chart.length * 15, 500);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">📊 Dashboard Quản lý Thiết bị</h1>

      {/* KPI Cards */}
      <Row gutter={16}>
        <Col span={6}>
          <Card className="rounded-2xl shadow-md text-center">
            <CheckCircle className="text-green-500 mx-auto" />
            <h3 className="text-lg font-semibold">Online</h3>
            <p className="text-xl">{data.kpi.online}</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="rounded-2xl shadow-md text-center">
            <WifiOff className="text-red-500 mx-auto" />
            <h3 className="text-lg font-semibold">Offline</h3>
            <p className="text-xl">{data.kpi.offline}</p>
          </Card>
        </Col>
      </Row>

      {/* Chart */}
      <Card className="rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">
          Biểu đồ trạng thái thiết bị ({data.chart.length} mốc)
        </h2>
        <div className="overflow-x-auto">
          <div style={{ width: chartWidth, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    `${value} thiết bị`,
                    name === "online" ? "Online" : "Offline",
                  ]}
                  labelFormatter={(label) => `Thời gian: ${label}`}
                />
                <Line type="monotone" dataKey="online" stroke="#4ade80" />
                <Line type="monotone" dataKey="offline" stroke="#f87171" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Offline Devices Table */}
      <Card className="rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Thiết bị mất kết nối gần đây</h2>
        <Table
          columns={[
            { title: "Tên thiết bị", dataIndex: "name", key: "name" },
            { title: "IP", dataIndex: "ip_address", key: "ip" },
            { title: "Thời điểm mất", dataIndex: "time", key: "time" },
          ]}
          dataSource={data.offlineDevices}
          pagination={false}
          rowKey="key"
        />
      </Card>

      {/* Alert Logs */}
      <Card className="rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Log cảnh báo mới nhất</h2>
        <List
          size="small"
          dataSource={data.logs}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
