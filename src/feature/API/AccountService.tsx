//The goal is to call CRUD operations on the user API
import apiClient from '../ApiClient';

// --- Type Definitions for an Account ---
// This defines the data structure for an account, providing type safety.

export interface Account {
  id: string;
  parentId: string;
  email: string;
  fullName: string;
  role: 'Student' | 'Parent' | 'SchoolNurse' | 'Manager' | 'Admin';
  status: 'Active' | 'Inactive';
  password: string;
  address: string;
  phoneNumber: string;
}

export interface GetAllAccountsParams {
  FullName?: string;
  Role?: string;
  Status?: string;
  PageNumber: number;
  PageSize: number;
}

export interface AccountView {
  id: string;     
  fullName: string;
  email: string;   
  role: string;   
  status: string | null; 
}

export interface AccountDetail extends AccountView {
  phoneNumber: string;
  address: string;
}


export type AccountCreationData = Omit<Account, 'id' | 'status'>;


export type AccountUpdateData = Partial<Omit<Account, 'id' >>;


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
  /**
   * Fetches a paginated and filtered list of accounts.
   * @param {GetAllAccountsParams} params - The filtering and pagination options.
   * @returns {Promise<PaginatedResponse<AccountView>>} A promise that resolves to the paginated data.
   */

  getAll: async (params: GetAllAccountsParams): Promise<PaginatedResponse<AccountView>> => {
    
    const response = await apiClient.get<RawApiResponse<PaginatedResponse<AccountView>>>('/account/get-all', {
      params: params,
    });
    
    // The actual data we need is nested inside the `data` property
    return response.data.data;
  },

  /**
   * Fetches a single account detail by its ID.
   * @param {string} id - The ID of the account to fetch.
   * @returns {Promise<AccountDetail>} A promise that resolves to the account data.
   * No Pagination
   */
  getDetailById: async (userId: string): Promise<AccountDetail> => {
    const response = await apiClient.get<RawApiResponse<AccountDetail>>('/account/get-detail',{
      params: {userId}
    });

    return response.data.data;
  },


  //TODO: Next time

  /**
   * Creates a new account.
   * @param {AccountCreationData} accountData - The data for the new account.
   * @returns {Promise<Account>} A promise that resolves to the newly created account data.
   */
  create: async (accountData: AccountCreationData): Promise<Account> => {
    const response = await apiClient.post<Account>('/account', accountData);
    return response.data;
  },

  /**
   * Updates an existing account.
   * @param {string} id - The ID of the account to update.
   * @param {AccountUpdateData} updateData - The fields to update.
   * @returns {Promise<Account>} A promise that resolves to the updated account data.
   */
  update: async (id: string, updateData: AccountUpdateData): Promise<Account> => {
    // We use PUT here, but PATCH is also common for partial updates.
    const response = await apiClient.put<Account>(`/accounts/${id}`, updateData);
    return response.data;
  },

  /**
   * Deletes an account by its ID.
   * @param {string} id - The ID of the account to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is successful.
   */
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/accounts/${id}`);
  },
};