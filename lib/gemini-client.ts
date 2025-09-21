// Client-side Gemini service that calls our API routes
export class GeminiClientService {
  private baseUrl = '/api/gemini';

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateText',
          data: { prompt }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateImage',
          data: { prompt }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      return result.imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      // Fallback to placeholder
      return `https://picsum.photos/400/400?random=${Date.now()}`;
    }
  }

  async suggestPrice(description: string, location: string = 'India'): Promise<{
    suggestedPrice: number;
    platformFee: number;
    deliveryFee: number;
    profitMargin: number;
  }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'suggestPrice',
          data: { description, location }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error suggesting price:', error);
      // Fallback values
      return {
        suggestedPrice: 29.99,
        platformFee: 2.99,
        deliveryFee: 5.99,
        profitMargin: 25
      };
    }
  }

  async generateTags(name: string, description: string): Promise<string[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateTags',
          data: { 
            name, 
            description: `Generate exactly 7-10 highly relevant and specific product tags for: 
            Product Name: "${name}"
            Description: "${description}"
            
            Requirements:
            - Minimum 7 tags, maximum 10 tags
            - Tags should be specific to the product features, style, use case, and target audience
            - Include material, style, function, and category-related tags
            - Make tags searchable and marketable
            - Return only comma-separated tags without quotes`
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      return result.tags;
    } catch (error) {
      console.error('Error generating tags:', error);
      return ['handmade', 'unique', 'artisan', 'quality', 'premium', 'crafted', 'authentic'];
    }
  }

  async expandStory(description: string, wordCount: number = 300): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'expandStory',
          data: { description, wordCount }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      return result.story;
    } catch (error) {
      console.error('Error expanding story:', error);
      return `This unique product represents exceptional craftsmanship and attention to detail. ${description} Each piece is carefully created with passion and dedication, ensuring quality that stands the test of time.`;
    }
  }

  async generateSocialPost(story: string, platform: 'instagram' | 'facebook'): Promise<{
    text: string;
    hashtags: string[];
  }> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateSocialPost',
          data: { story, platform }
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating social post:', error);
      return {
        text: "Check out this amazing handcrafted product! ✨",
        hashtags: ['handmade', 'unique', 'crafted', 'artisan', 'quality']
      };
    }
  }
}