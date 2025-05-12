import { apiClient } from '../../../utils/apiClient';
import { env } from '../../../environments/env';
import { logger } from '../../../utils/logger';
import { AxiosResponse } from 'axios';

/**
 * Interface for PAR create request
 */
export interface ParCreateRequest {
  title: string;
  description: string;
  status: string;
  type: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
  tags: string[];
  metadata: Record<string, any>;
}

/**
 * Interface for PAR create response
 */
export interface ParCreateResponse {
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
 * Create a new PAR
 * @param requestData Request data for creating a PAR
 * @returns Promise with the response
 */
export async function createPar(requestData: ParCreateRequest): Promise<AxiosResponse<ParCreateResponse>> {
  try {
    const url = `${env.getProductUrl('eds')}/pars`;
    logger.info(`Creating PAR with title: ${requestData.title}`);
    
    return await apiClient.post<ParCreateResponse>(url, requestData);
  } catch (error) {
    logger.error('Error creating PAR', error);
    throw error;
  }
}