import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateCryptoAnalysis = async (
  coinData: any
): Promise<string> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a cryptocurrency market analyst. Provide insights based on the given data."
        },
        {
          role: "user",
          content: `Analyze this cryptocurrency data: ${JSON.stringify(coinData)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || 'No analysis available.';
  } catch (error) {
    console.error('Error generating analysis:', error);
    return 'Unable to generate analysis at this time.';
  }
};