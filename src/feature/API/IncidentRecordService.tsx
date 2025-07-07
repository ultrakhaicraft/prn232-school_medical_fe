import apiClient from '../ApiClient';

export interface IncidentRecord {
  id: string;
  studentId: string;
  studentName: string;
  incidentType: string;
  dateOccurred: string;
  status: string;
}

export interface IncidentRecordQueryParams {
  IncidentType?: string;
  Status?: string;
  StudentId?: string;
  PageIndex?: number;
  PageSize?: number;
  IsDescending?: boolean;
}

export interface PaginatedResponse<T> {
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
}

interface RawApiResponse<T> {
  statusCode: string;
  message: string;
  data: T;
}

export const IncidentRecordService = {
  getAll: async (params: IncidentRecordQueryParams = {}): Promise<IncidentRecord[]> => {
    const response = await apiClient.get<RawApiResponse<IncidentRecord[]>>('/incident-record', { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<IncidentRecord> => {
    const response = await apiClient.get<RawApiResponse<IncidentRecord>>(`/incident-record/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<IncidentRecord>): Promise<IncidentRecord> => {
    const response = await apiClient.post<RawApiResponse<IncidentRecord>>('/incident-record', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<IncidentRecord>): Promise<IncidentRecord> => {
    const response = await apiClient.put<RawApiResponse<IncidentRecord>>(`/incident-record/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/incident-record/${id}`);
  },
};