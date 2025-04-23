import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "https://techigem.com",
    "X-Title": "Techigem",
  },
  dangerouslyAllowBrowser: true
});

export async function generateContent(prompt: string, maxTokens: number = 500) {
  try {
    const completion = await openai.chat.completions.create({
      model: "microsoft/mai-ds-r1:free",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
      top_p: 0.9,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export default openai;