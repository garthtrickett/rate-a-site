import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { server } from './server'

export const runtime = 'edge' // 'nodejs' is the default

const handler = startServerAndCreateNextHandler(server)

/**
 * Handles GET requests.
 *
 * @param {Request} request - The incoming GET request.
 * @returns {Promise<Response>} The response from the handler.
 */
export async function GET(request) {
  return handler(request)
}

/**
 * Handles POST requests.
 *
 * @param {Request} request - The incoming POST request.
 * @returns {Promise<Response>} The response from the handler.
 */
export async function POST(request) {
  return handler(request)
}
