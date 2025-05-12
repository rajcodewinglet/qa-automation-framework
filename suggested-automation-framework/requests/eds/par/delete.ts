import { apiClient } from '../../../utils/apiClient';
import { env } from '../../../environments/env';
import { logger } from '../../../utils/logger';
import { AxiosResponse } from 'axios';

/**
 * Delete a PAR
 * @param parId PAR ID
 * @returns Promise with the response
 */
export async function deletePar(parId: string): Promise<AxiosResponse<void>> {
  try {
    const url = `${env.getProductUrl('eds')}/pars/${parId}`;
    logger.info(`Deleting PAR with ID: ${parId}`);
    
    return await apiClient.delete<void>(url);
  } catch (error) {
    logger.error(`Error deleting PAR with ID: ${parId}`, error);
    throw error;
  }
}