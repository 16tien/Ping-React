import type { ColumnsType } from "antd/es/table";
import type { DeviceTypeUI } from "../types/deviceTypeUI";
import { Button, Popconfirm } from "antd";

export const getDeviceColumns = (
  role: "admin" | "user",
  handleEdit?: (record: DeviceTypeUI) => void,
  handleDelete?: (record: DeviceTypeUI) => void,
  deletingId?: number | null
): ColumnsType<DeviceTypeUI> => {
  const columns: ColumnsType<DeviceTypeUI> = [
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      sorter: true,
      width: "20%",
    },
    {
      title: "IP Address",
      dataIndex: "ip_address",
      width: "20%",
    },
    {
      title: "Người quản lý",
      dataIndex: ["manager", "manager_name"],
      width: "20%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "20%",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: ["pinglog", "status"],
      render: (status: boolean) => (
        <span style={{ color: status ? "green" : "red" }}>
          {status ? "Online" : "Offline"}
        </span>
      ),
      filters: [
        { text: "Online", value: true },
        { text: "Offline", value: false },
      ],
      width: "20%",
    },
  ];

  if (role === "admin") {
    columns.push({
      title: "Hành động",
      key: "actions",
      width: "20%",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit?.(record);
            }}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={(e) => {
              e?.stopPropagation?.();
              handleDelete?.(record);
            }}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              danger
              loading={deletingId === record.device_id}
              onClick={(e) => e.stopPropagation()}
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    });
  }

  return columns;
};
