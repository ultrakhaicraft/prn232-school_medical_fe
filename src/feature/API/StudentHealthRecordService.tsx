//The goal is to call CRUD operations on the user API
import apiClient from '../ApiClient';

// --- Type Definitions for an Account ---
// This defines the data structure for an account, providing type safety.



export interface GetAllStudentHealthRecordsParams {
    StudentName : string;
    PageNumber: number;
    PageSize: number;
    Status: 'Active' | 'Inactive' | '';
}

export interface StudentHealthRecordView {
    id: string;
    studentName: string;
    studentId: string;
    createdBy: string;
    status: string | null;
}

export interface StudentHealthRecordDetail extends StudentHealthRecordView {
    height: number;
    allergies: string;
    chronicDiseases: string;
    vision: string;
    hearing: string;

}


export interface StudentHealthRecordCreationData{
    id: string;     
    studentName: string;
    studentId: string;   
    createdBy: string;
    height: number;
    allergies: string;
    chronicDiseases : string;
    vision: string;
    hearing: string;
    status: string | null;
}


export interface StudentHealthRecordUpdate extends StudentHealthRecordCreationData {}


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

// --- API Service Object ---


export const accountService = {


  getAll: async (params: GetAllStudentHealthRecordsParams): Promise<PaginatedResponse<StudentHealthRecordView>> => {
    
    const response = await apiClient.get<RawApiResponse<PaginatedResponse<StudentHealthRecordView>>>('/account', {
      params: params,
    });
    
    // The actual data we need is nested inside the `data` property
    return response.data.data;
  },

 
  getDetailById: async (userId: string): Promise<StudentHealthRecordDetail> => {
    const response = await apiClient.get<RawApiResponse<StudentHealthRecordDetail>>('/student-health-record',{
      params: {userId}
    });

    return response.data.data;
  },


  

  create: async (accountData: StudentHealthRecordCreationData): Promise<string> => {
    const response = await apiClient.post<RawApiResponse<string>>('/student-health-record', accountData);
    return response.data.data;
  },

  
  update: async (id: string, updateData: StudentHealthRecordUpdate): Promise<string> => {
    // We use PUT here, but PATCH is also common for partial updates.
    const response = await apiClient.put<RawApiResponse<string>>('/student-health-record',{
        id,
        ...updateData
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data.data;
  },

 
  remove: async (userId: string): Promise<string> => {
    const response = await apiClient.delete<RawApiResponse<string>>('/student-health-record',{
      params: { userId },
    });

    return response.data.data;
  },
};