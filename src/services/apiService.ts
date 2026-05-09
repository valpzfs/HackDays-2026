import { GoogleGenerativeAI } from '@google/generative-ai';

// --- TYPES ---

export type CompatibilityState = 'compatible' | 'conflict';

export type ComponentTag = {
  label: string;
  state: CompatibilityState;
};

export type ComponentAlternative = {
  name: string;
  description: string;
  price: number;
  compatibility: number;
  warning?: string;
};

export type RobotComponent = {
  category: string;
  name: string;
  description: string;
  price: number;
  compatibility: number;
  warning?: string;
  tags: ComponentTag[];
  frameworks: string[];
  amazonUrl: string;
  vendorUrl: string;
  alternative?: ComponentAlternative;
};

export type RobotIssue = {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  description: string;
};

export type RobotFix = {
  title: string;
  recommendation: string;
};

export type RobotDesignData = {
  overview: {
    compatibilityScore: number;
    estimatedCost: number;
    fullyCompatible: number;
    minorConflicts: number;
    incompatible: number;
    verdict: string;
    summary: string;
  };
  components: RobotComponent[];
  render: {
    caption: string;
    legend: string[];
    imagePrompt: string;
    componentsUsed: string[];
  };
  realityCheck: {
    score: number;
    verdict: string;
    summary: string;
    breakIssues: RobotIssue[];
    edgeCases: RobotIssue[];
    fixes: RobotFix[];
  };
};

type GenerateRobotDataParams = {
  apiKey: string;
  userInput: string;
  budget: string;
  tags: string[];
};

// --- HELPER FUNCTIONS ---

const cleanJson = (raw: string) => {
  const trimmed = raw.trim();
  if (trimmed.startsWith('```')) {
    return trimmed
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();
  }
  return trimmed;
};

const parseRobotData = (raw: string): RobotDesignData => {
  try {
    const cleaned = cleanJson(raw);
    return JSON.parse(cleaned) as RobotDesignData;
  } catch (error) {
    console.error("Error parsing JSON from Gemini:", error);
    throw new Error("Invalid intelligence format received. System diagnostic required.");
  }
};

// --- MAIN SERVICE ---

export const generateRobotData = async ({ apiKey, userInput, budget, tags }: GenerateRobotDataParams) => {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('A Gemini API key is required.');
  }

  // Inicialización limpia
  const genAI = new GoogleGenerativeAI(apiKey.trim());

  /**
   * PARCHE DE SEGURIDAD PARA ERROR 404
   * El SDK de Google ya añade "models/" internamente. 
   * Limpiamos el nombre del modelo para evitar duplicados.
   */
  const rawModelName = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-3-flash-preview';
  const cleanModelName = rawModelName.replace(/^models\//, '').trim();

  const model = genAI.getGenerativeModel({
    model: cleanModelName,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.3,
    },
  });

  const prompt = `
Return ONLY a JSON object for a robot design mission. 
No markdown code fences. No conversational text.

INPUT PARAMETERS:
- Mission: "${userInput}"
- Budget: $${budget}
- Context: ${tags.length > 0 ? tags.join(', ') : 'none'}

SCHEMA REQUIREMENT:
{
  "overview": {
    "compatibilityScore": number,
    "estimatedCost": number,
    "fullyCompatible": number,
    "minorConflicts": number,
    "incompatible": number,
    "verdict": "OPTIMAL" | "CAUTION" | "DANGEROUS",
    "summary": "string (2 sentences max)"
  },
  "components": [
    {
      "category": "MICROCONTROLLER | MOTOR DRIVER | DEPTH CAMERA | LIDAR | CHASSIS | BATTERY | WHEELS | POWER REGULATOR | FRAME",
      "name": "string",
      "description": "string",
      "price": number,
      "compatibility": number,
      "warning": "string",
      "tags": [{ "label": "string", "state": "compatible" | "conflict" }],
      "frameworks": ["ROS2", "Arduino", "Python"],
      "amazonUrl": "https://amazon.com",
      "vendorUrl": "https://mouser.com"
    }
  ],
  "render": {
    "caption": "string",
    "legend": ["string"],
    "imagePrompt": "string",
    "componentsUsed": ["string"]
  },
  "realityCheck": {
    "score": number,
    "verdict": "string",
    "summary": "string",
    "breakIssues": [{ "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW", "title": "string", "description": "string" }],
    "edgeCases": [{ "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW", "title": "string", "description": "string" }],
    "fixes": [{ "title": "string", "recommendation": "string" }]
  }
}
`;

  try {
    const result = await model.generateContent(prompt);
    /**
     * CORRECCIÓN DEL SDK:
     * 'result.response.text()' es una función que devuelve el string directamente.
     * No se usa '.ok' ni se trata como un fetch response estándar.
     */
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Mission Control received an empty telemetry stream.");
    }

    return parseRobotData(text);
  } catch (err: any) {
    console.error("Gemini Telemetry Error:", err);
    
    // Guía específica para el error 404
    if (err?.message?.includes('404') || err?.message?.includes('not found')) {
      throw new Error(`Model Error: "${cleanModelName}" not found. Update your .env to VITE_GEMINI_MODEL=gemini-1.5-flash and RESTART your terminal.`);
    }

    throw new Error(`Reality Check Failed: ${err?.message || "Unknown API Error"}`);
  }
};
