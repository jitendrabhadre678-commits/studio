'use server';
/**
 * @fileOverview An AI tool that generates unique, compelling marketing descriptions for new gift card offerings.
 *
 * - generateGiftCardDescription - A function that handles the gift card description generation process.
 * - GenerateGiftCardDescriptionInput - The input type for the generateGiftCardDescription function.
 * - GenerateGiftCardDescriptionOutput - The return type for the generateGiftCardDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateGiftCardDescriptionInputSchema = z.object({
  brandName: z.string().describe('The brand name of the gift card (e.g., Amazon, Steam).'),
  value: z.string().describe('The value of the gift card (e.g., $25, $50, $100).'),
  category: z.string().describe('The category of the gift card (e.g., Shopping, Gaming, Entertainment).'),
  keyFeatures: z.array(z.string()).optional().describe('Optional key features or benefits to highlight about this specific gift card.')
});
export type GenerateGiftCardDescriptionInput = z.infer<typeof GenerateGiftCardDescriptionInputSchema>;

const GenerateGiftCardDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and unique marketing description for the gift card, tailored to the GameFlashX brand voice.')
});
export type GenerateGiftCardDescriptionOutput = z.infer<typeof GenerateGiftCardDescriptionOutputSchema>;

export async function generateGiftCardDescription(input: GenerateGiftCardDescriptionInput): Promise<GenerateGiftCardDescriptionOutput> {
  return generateGiftCardDescriptionFlow(input);
}

const generateGiftCardDescriptionPrompt = ai.definePrompt({
  name: 'generateGiftCardDescriptionPrompt',
  input: { schema: GenerateGiftCardDescriptionInputSchema },
  output: { schema: GenerateGiftCardDescriptionOutputSchema },
  prompt: `You are a marketing copywriter for GameFlashX, a premium, modern SaaS platform with a futuristic gaming aesthetic. Your goal is to create compelling and unique marketing descriptions for gift card offerings. The descriptions should be engaging, highlight the value, and align with GameFlashX's brand voice, which is exciting, cutting-edge, and premium. Focus on the thrill of unlocking rewards.

GameFlashX emphasizes glassmorphism effects, smooth animations, and a sleek, modern UI with gaming inspiration. Use language that evokes these qualities.

Here are the details for the gift card:
Brand: {{{brandName}}}
Value: {{{value}}}
Category: {{{category}}}
{{#if keyFeatures}}
Key Features to Highlight:
{{#each keyFeatures}}
- {{{this}}}
{{/each}}
{{/if}}

Generate a marketing description that is concise, impactful, and suitable for our website and social media. Focus on attracting users to unlock this reward now!`
});

const generateGiftCardDescriptionFlow = ai.defineFlow(
  {
    name: 'generateGiftCardDescriptionFlow',
    inputSchema: GenerateGiftCardDescriptionInputSchema,
    outputSchema: GenerateGiftCardDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await generateGiftCardDescriptionPrompt(input);
    if (!output) {
      throw new Error('Failed to generate gift card description.');
    }
    return output;
  }
);
