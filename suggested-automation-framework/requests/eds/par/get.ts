import { apiClient } from '../../../utils/apiClient';
import { env } from '../../../environments/env';
import { logger } from '../../../utils/logger';
import { AxiosResponse } from 'axios';

/**
 * Interface for PAR get response
 */
export interface ParGetResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  type: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
  tags: string[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface for PAR list response
 */
export interface ParListResponse {
  items: ParGetResponse[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * Get a PAR by ID
 * @param parId PAR ID
 * @returns Promise with the response
 */
export async function getPar(parId: string): Promise<AxiosResponse<ParGetResponse>> {
  try {
    const url = `${env.getProductUrl('eds')}/pars/${parId}`;
    logger.info(`Getting PAR with ID: ${parId}`);
    
    return await apiClient.get<ParGetResponse>(url);
  } catch (error) {
    logger.error(`Error getting PAR with ID: ${parId}`, error);
    throw error;
  }
}

/**
 * Get all PARs with optional filters
 * @param page Page number
 * @param pageSize Page size
 * @param filters Optional filters
 * @returns Promise with the response
 */
export async function listPars(
  page: number = 1,
  pageSize: number = 10,
  filters?: Record<string, any>
): Promise<AxiosResponse<ParListResponse>> {
  try {
    const url = `${env.getProductUrl('eds')}/pars`;
    const params = {
      page,
      pageSize,
      ...filters,
    };
    
    logger.info(`Listing PARs with page: ${page}, pageSize: ${pageSize}`);
    
    return await apiClient.get<ParListResponse>(url, { params });
  } catch (error) {
    logger.error('Error listing PARs', error);
    throw error;
  }
}