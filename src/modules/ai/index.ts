import { Elysia, t } from 'elysia'
import { explainSimulationResults } from './service';

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
  .get(
    '/explain-simulation-results',
    async () => {
      return "Please send a POST request with the simulation results to get an explanation.";
    }
  )