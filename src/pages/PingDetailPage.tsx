import { useParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch';
import { useEffect, useState } from 'react';
import { DatePicker, Table } from 'antd';
import { useSetHeaderTitle } from '../hooks/useHeaderTitle';
import { useDevice } from '../hooks/useDevice';
import type { PingLogUI } from '../types/pingLogUI';
import type { ColumnsType } from 'antd/es/table';
import { useTableData } from '../hooks/useTableData';
import { fetchPingLogs } from '../api/pingLogApi';
import { useUser } from '../hooks/useUser';

const columns: ColumnsType<PingLogUI> = [
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    render: (status: boolean) => (
      <span style={{ color: status ? 'green' : 'red' }}>
        {status ? 'Online' : 'Offline'}
      </span>
    ),
    filters: [
      { text: 'Online', value: true },
      { text: 'Offline', value: false },
    ],
    width: '20%',
  },
  {
    title: 'Thời gian',
    dataIndex: 'ping_time',
    width: '20%',
  },
];

const PingDetailPage: React.FC = () => {
  const { id } = useParams();
  const { setSearchComponent, setKeyword } = useSearch();
  const { device } = useDevice(id);
  const [managerId, setManagerId] = useState<number | null>(null);

  useEffect(() => {
  if (device?.manager_user_id) {
    setManagerId(device.manager_user_id);
  }
}, [device]);

  const { user: manager } = useUser(managerId ?? 0);
  const { RangePicker } = DatePicker;
  const { data, loading, pagination, handleTableChange } = useTableData<PingLogUI>({
    fetchApi: (params) => fetchPingLogs({ ...params, device_id: id }),
  });

  useEffect(() => {
    setSearchComponent?.(
      <RangePicker
        showTime
        format="HH:mm:ss DD-MM-YYYY"

        onChange={(dates, dateStrings) => {
          if (dates) {
            const [from, to] = dateStrings;
            setKeyword(`${from}~${to}`);
          }
        }}
      />
    );

    return () => setSearchComponent?.(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setKeyword, setSearchComponent]);

  useSetHeaderTitle(device ? `${device.name} - ${device.ip_address}` : "Chi tiết ping");

  return (
    <>
      <Table<PingLogUI>
        columns={columns}
        rowKey={(record) => record.id.toString()}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      {device && manager && (

        <div>
          <h3>Thông tin thiết bị:</h3>
          <p>Tên: {device.name}</p>
          <p>IP: {device.ip_address}</p>
            <p>Địa chỉ: {device.address}</p>

          <h3>Người quản lý:</h3>
          <p>Tên: {manager.name}</p>
          <p>Email: {manager.email}</p>
        </div>
      )}
    </>
  );
};

export default PingDetailPage;
