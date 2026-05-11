import { Elysia, t } from 'elysia'
import { analyzeDappPayload, explainSimulationResults } from './service';

export const aiControllers = new Elysia({ prefix: '/ai' })
  .post(
    '/explain-simulation-results',
    async ({ body: { results } }) => {
      return await explainSimulationResults(results);
    },
    {
      body: t.Object({
        results: t.String(),
      })
    }
  )
  .post(
    '/analyze-dapp-payload',
    async ({ body: { payload } }) => {
      // Placeholder for analyzing dApp payloads
      return await analyzeDappPayload(payload);
    },
    {
      body: t.Object({
        payload: t.String(),
      })
    }
  )
  .get(
    '/explain-simulation-results',
    async () => {
      return "Please send a POST request with the simulation results to get an explanation.";
    }
  )