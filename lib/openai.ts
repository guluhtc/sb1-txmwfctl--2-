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

export async function generateContent(prompt: string, maxTokens: number = 500): Promise<string | null> {
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
    return null;
  }
}

export async function generateCaption(
  prompt: string, 
  options: { style?: string; engagement?: boolean; includeQuestion?: boolean; includeQuote?: boolean } = {}
): Promise<string | null> {
  const { style, engagement, includeQuestion, includeQuote } = options;
  let contentPrompt = `Generate an engaging Instagram caption for: ${prompt}`;
  
  if (style) contentPrompt += `\nStyle: ${style}`;
  if (engagement) contentPrompt += '\nMake it highly engaging';
  if (includeQuestion) contentPrompt += '\nInclude a question to encourage comments';
  if (includeQuote) contentPrompt += '\nInclude a relevant quote';
  
  return generateContent(contentPrompt);
}

export async function generateBio(topic: string, category: string): Promise<string | null> {
  const prompt = `Generate a professional Instagram bio for a ${category} account about ${topic}. Make it engaging and include relevant keywords.`;
  return generateContent(prompt);
}

export async function generateHashtags(topic: string, count: number = 30): Promise<string[]> {
  const prompt = `Generate ${count} relevant Instagram hashtags for posts about ${topic}. Include a mix of popular and niche hashtags.`;
  const content = await generateContent(prompt);
  return content?.split(/\s+/).filter(tag => tag.startsWith('#')) || [];
}

export default openai;