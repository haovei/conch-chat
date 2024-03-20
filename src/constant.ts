// 端口
export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// SystemPrompts
export const SYSTEM_PROMPTS = process.env.SYSTEM_PROMPTS ?? '';
export const CURRENT_API = process.env.CURRENT_API ?? 'OPENAI';

// OpenAI Key
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';
export const OPENAI_BASE_URL = process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/';
export const OPENAI_ORG_ID = process.env.OPENAI_ORG_ID ?? null;
export const OPENAI_API_MODEL = process.env.OPENAI_API_MODEL ?? 'gpt-3.5-turbo-0125';

// QianFan Key
export const QIANFAN_ACCESS_KEY = process.env.QIANFAN_ACCESS_KEY ?? '';
export const QIANFAN_SECRET_KEY = process.env.QIANFAN_SECRET_KEY ?? '';
export const QIANFAN_API_MODEL = process.env.QIANFAN_API_MODEL ?? 'ERNIE-Bot-turbo';
