
'use server';
/**
 * @fileOverview AI Flow to generate structured blog content for product guides.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductBlogInputSchema = z.object({
  productName: z.string().describe('The name of the gift card brand.'),
  category: z.string().describe('The category (e.g. Gaming, Shopping).'),
  description: z.string().describe('Short description of the product.')
});

export type ProductBlogInput = z.infer<typeof ProductBlogInputSchema>;

const ProductBlogOutputSchema = z.object({
  introduction: z.string().describe('Engaging introduction paragraph.'),
  whatIs: z.string().describe('Clear explanation of the product.'),
  whereToUse: z.string().describe('Real-life usage examples.'),
  benefits: z.array(z.string()).describe('List of 3-5 key benefits.'),
  tips: z.object({
    dos: z.array(z.string()).describe('Do points for success.'),
    donts: z.array(z.string()).describe('Don\'t points to avoid errors.')
  }),
  faq: z.array(z.object({
    q: z.string(),
    a: z.string()
  })).describe('3 frequently asked questions and answers.')
});

export type ProductBlogOutput = z.infer<typeof ProductBlogOutputSchema>;

const productBlogPrompt = ai.definePrompt({
  name: 'productBlogPrompt',
  input: { schema: ProductBlogInputSchema },
  output: { schema: ProductBlogOutputSchema },
  prompt: `You are a Senior SEO Content Strategist for GameFlashX.
Generate a comprehensive, high-conversion "Step-by-Step Guide" for getting a free {{{productName}}} in 2026.

Product: {{{productName}}}
Category: {{{category}}}
Description: {{{description}}}

The content must be professional, exciting, and trustworthy. 
Focus on the 2026 digital economy where users earn rewards by completing advertiser tasks.
Do NOT use markdown asterisks or bolding in the text — provide clean strings.

Include:
1. An introduction mentioning the trend of earning {{{productName}}} free in 2026.
2. A section explaining what it is and where it can be used.
3. 4 benefits.
4. Tips for success (Dos and Don'ts).
5. 3 FAQs addressing: Is it free? How long does it take? Why do we need verification?`
});

export async function generateProductBlog(input: ProductBlogInput): Promise<ProductBlogOutput | null> {
  try {
    const { output } = await productBlogPrompt(input);
    return output || null;
  } catch (error) {
    console.error("AI Blog Generation Error:", error);
    return null;
  }
}
