import apiClient from '../ApiClient';

export interface Medicine {
  id: string;
  name: string;
  description: string;
  amount: number;
  isAvailable: boolean;
  createdBy: string;
  createdByName: string;
}

export interface MedicineQueryParams {
  Name?: string;
  IsAvailable?: boolean;
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

export const MedicineService = {
  getAll: async (params: MedicineQueryParams = {}): Promise<PaginatedResponse<Medicine>> => {
    const response = await apiClient.get<RawApiResponse<PaginatedResponse<Medicine>>>('/medicine', { params });
    return response.data.data;
  },

  getById: async (id: string): Promise<Medicine> => {
    const response = await apiClient.get<RawApiResponse<Medicine>>(`/medicine/${id}`);
    return response.data.data;
  },
}; 