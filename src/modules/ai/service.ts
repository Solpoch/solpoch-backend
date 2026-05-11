import { GoogleGenAI } from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// simple memory store for caching explanations, not using redis or db cuz i am broke :D
const explanationCache: Record<string, string> = {};
const dappPayloadCache: Record<string, string> = {};


export async function explainSimulationResults(results: string) {
  try {

    // check if we have a cached explanation for the same results
    if (explanationCache[results]) {
      console.log("Returning cached explanation", explanationCache[results]);
      return explanationCache[results];
    }

    const prompt = `
You are a Solana transaction debugger.

Explain the failure in:
1. Simple explanation (1-2 lines)
2. Root cause (technical)
3. How to fix it

dont provide any other information except the above 3 points.
dont send the explaination in markdown format, just plain text.

Context:
${results}
  `;

    const response = await ai.models.generateContent({
      model: 'models/gemini-3-flash-preview',
      contents: prompt,
    });

    if (response.text) {
      explanationCache[results] = response.text;
      console.log("Caching explanation", response.text);
    }

    return response.text;
  } catch (error) {
    console.error("Error explaining simulation results", error);
    return "Sorry, I couldn't explain the simulation results at this time. We are experiencing some issues with the AI service due to high traffic. Please try again later.";
  }
}

export async function getModels() {
  const models = await ai.models.list();
  // @ts-ignore
  const availableModels = models.pageInternal.map((model) => model.name);
  // @ts-ignore
  availableModels.forEach((model) => {
    console.log(model);
  });
}

export async function analyzeDappPayload(payload: string) {
  try {
    // Check if we have a cached analysis for the same payload
    if (dappPayloadCache[payload]) {
      console.log("Returning cached dApp payload analysis", dappPayloadCache[payload]);
      return dappPayloadCache[payload];
    }

    const prompt = `
You are a Solana dApp security auditor.

Analyze the following dApp payload for potential security issues and provide a summary of your findings.

dont send the explaination in markdown format, just plain text.

Context:
${payload}
    `;

    const response = await ai.models.generateContent({
      model: 'models/gemini-3-flash-preview',
      contents: prompt,
    });

    if (response.text) {
      dappPayloadCache[payload] = response.text;
      console.log("Caching dApp payload analysis", response.text);
    }
    return response.text;
  } catch (error) {
    console.error("Error analyzing dApp payload", error);
    return "Sorry, I couldn't analyze the dApp payload at this time. We are experiencing some issues with the AI service due to high traffic. Please try again later.";
  }
}