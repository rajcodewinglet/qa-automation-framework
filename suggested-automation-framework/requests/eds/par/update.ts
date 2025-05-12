import { apiClient } from '../../../utils/apiClient';
import { env } from '../../../environments/env';
import { logger } from '../../../utils/logger';
import { AxiosResponse } from 'axios';

/**
 * Interface for PAR update request
 */
export interface ParUpdateRequest {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  dueDate?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Interface for PAR update response
 */
export interface ParUpdateResponse {
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
 * Update a PAR
 * @param parId PAR ID
 * @param requestData Request data for updating a PAR
 * @returns Promise with the response
 */
export async function updatePar(
  parId: string,
  requestData: ParUpdateRequest
): Promise<AxiosResponse<ParUpdateResponse>> {
  try {
    const url = `${env.getProductUrl('eds')}/pars/${parId}`;
    logger.info(`Updating PAR with ID: ${parId}`);
    
    return await apiClient.put<ParUpdateResponse>(url, requestData);
  } catch (error) {
    logger.error(`Error updating PAR with ID: ${parId}`, error);
    throw error;
  }
}