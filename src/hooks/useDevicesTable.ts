import { useEffect, useState } from 'react';
import type { TableProps, TablePaginationConfig } from 'antd';
import type { DeviceTypeUI } from '../types/deviceTypeUI';
import { getAllDevices } from '../api/deviceApi';
import { useSearch } from './useSearch';

interface TableParams {
  pagination: TablePaginationConfig;
  filters?: Record<string, unknown>;
  sortField?: string;
  sortOrder?: 'ascend' | 'descend';
}

export const useDevicesTable = () => {
  const [data, setData] = useState<DeviceTypeUI[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { keyword } = useSearch()

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    filters: {},
    sortField: undefined,
    sortOrder: undefined,
  });

  const fetchData = async (params: TableParams) => {
    setLoading(true);

    const { pagination, sortField, sortOrder, filters } = params;

    const queryParams: Record<string, string> = {
      page: String(pagination.current || 1),
      limit: String(pagination.pageSize || 10),
    };

    if (sortField && sortOrder) {
      queryParams.orderby = sortField;
      queryParams.order = sortOrder === 'ascend' ? 'asc' : 'desc';
    }
    if (keyword) {
      queryParams.keyword = keyword;
    }
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams[key] = String(value);
        }
      });
    }

    try {
      const { data: devices, total } = await getAllDevices(queryParams);
      setData(devices || []);
      setTotal(total || 0);
    } catch (err) {
      console.error('Error fetching devices:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(tableParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams, keyword]);

  const handleTableChange: TableProps<DeviceTypeUI>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    const sortObj = Array.isArray(sorter)
      ? {}
      : {
        sortField: sorter.field as string,
        sortOrder: sorter.order ?? undefined,
      };

    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      filters,
      ...sortObj,
    }));

    if (pagination.pageSize !== tableParams.pagination.pageSize) {
      setData([]);
    }
  };

  return {
    data,
    loading,
    pagination: {
      ...tableParams.pagination,
      total,
    },
    handleTableChange,
    refetch: () => fetchData(tableParams), 
  };
};
