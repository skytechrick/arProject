import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json();

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    switch (action) {
      case 'generateText':
        return await handleTextGeneration(data);
      case 'generateImage':
        return await handleImageGeneration(data);
      case 'suggestPrice':
        return await handlePriceSuggestion(data);
      case 'generateTags':
        return await handleTagGeneration(data);
      case 'expandStory':
        return await handleStoryExpansion(data);
      case 'generateSocialPost':
        return await handleSocialPostGeneration(data);
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleTextGeneration(data: { prompt: string }) {
  const response = await fetch(
    `${GEMINI_BASE_URL}/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: data.prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const result = await response.json();
  const text = result.candidates[0]?.content?.parts[0]?.text || '';
  
  return NextResponse.json({ text });
}

async function handleImageGeneration(data: { prompt: string }) {
  try {
    // Enhanced image generation with better prompting
    const enhancedPrompt = `Professional product photography: ${data.prompt}. 
    High quality, studio lighting, clean white background, commercial photography style, 
    sharp focus, detailed textures, professional composition, marketing ready image.`;
    
    // For now, return a more relevant placeholder based on the prompt
    // In production, integrate with DALL-E, Midjourney API, or Stable Diffusion
    const seed = data.prompt.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const placeholderImage = `https://picsum.photos/seed/${seed}/400/400`;
    
    return NextResponse.json({ 
      imageUrl: placeholderImage,
      prompt: enhancedPrompt,
      message: 'AI-generated image (using placeholder service - integrate with DALL-E/Midjourney for production)'
    });
  } catch (error) {
    console.error('Image generation error:', error);
    const fallbackImage = `https://picsum.photos/400/400?random=${Date.now()}`;
  
    return NextResponse.json({ 
      imageUrl: fallbackImage,
      message: 'Fallback image - please check your image generation service'
    });
  }
}

async function handlePriceSuggestion(data: { description: string; location: string }) {
  const prompt = `Conduct comprehensive market analysis for this product:
  Description: "${data.description}"
  Location: "${data.location}"
  
  Analyze:
  1. Competitor pricing research for similar products in ${data.location}
  2. Market demand and supply factors
  3. Local economic conditions and purchasing power
  4. Platform fees and operational costs
  5. Delivery and logistics costs for ${data.location}
  6. Optimal profit margins for sustainable business
  7. Seasonal and trend factors
  
  Provide detailed pricing strategy in JSON format:
  {
    "suggestedPrice": number,
    "platformFee": number,
    "deliveryFee": number,
    "profitMargin": number,
    "competitorAnalysis": {
      "averagePrice": number,
      "priceRange": {"min": number, "max": number},
      "marketTrend": "string",
      "competitorCount": number
    },
    "reasoning": "string explaining the pricing strategy"
  }`;
  
  const response = await fetch(
    `${GEMINI_BASE_URL}/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const result = await response.json();
  const text = result.candidates[0]?.content?.parts[0]?.text || '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const priceData = JSON.parse(jsonMatch[0]);
      return NextResponse.json(priceData);
    }
  } catch (error) {
    console.error('Error parsing price data:', error);
  }
  
  // Fallback values
  return NextResponse.json({
    suggestedPrice: 29.99,
    platformFee: 2.99,
    deliveryFee: 5.99,
    profitMargin: 25
  });
}

async function handleTagGeneration(data: { name: string; description: string }) {
  const prompt = `Generate exactly 7-10 highly relevant and specific product tags for:
  Product Name: "${data.name}"
  Description: "${data.description}"
  
  Requirements:
  - Minimum 7 tags, maximum 10 tags
  - Tags should be specific to the product features, style, use case, and target audience
  - Include material, style, function, category, color, size, and benefit-related tags
  - Make tags searchable and marketable for e-commerce
  - Consider SEO and discoverability
  - Return only comma-separated tags without quotes
  
  Example format: handmade, wooden, kitchen, utensil, eco-friendly, sustainable, artisan, premium, natural, durable`;
  
  const response = await fetch(
    `${GEMINI_BASE_URL}/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const result = await response.json();
  const text = result.candidates[0]?.content?.parts[0]?.text || '';
  const tags = text.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  
  return NextResponse.json({ tags });
}

async function handleStoryExpansion(data: { description: string; wordCount: number }) {
  const prompt = `Create an engaging and detailed product story of exactly ${data.wordCount} words based on this description: "${data.description}".
  
  The story must include:
  1. Product origin and inspiration (how it was conceived)
  2. Detailed craftsmanship and creation process
  3. Cultural significance and heritage background
  4. Quality materials and techniques used
  5. Emotional appeal and lifestyle benefits
  6. Target audience connection and use cases
  7. Unique selling points and differentiators
  8. Sustainability and ethical aspects (if applicable)
  
  Requirements:
  - Exactly ${data.wordCount} words (count carefully)
  - Compelling narrative that drives purchase decisions
  - Professional tone suitable for e-commerce
  - Include sensory details and emotional triggers
  - Make it shareable and engaging for social media
  
  Write in a storytelling format that connects with customers emotionally while highlighting the product's value proposition.`;
  
  const response = await fetch(
    `${GEMINI_BASE_URL}/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const result = await response.json();
  const story = result.candidates[0]?.content?.parts[0]?.text || '';
  
  return NextResponse.json({ story });
}

async function handleSocialPostGeneration(data: { story: string; platform: string }) {
  const maxLength = data.platform === 'instagram' ? 150 : 200;
  const prompt = `Create an engaging ${data.platform} post based on this product story: "${data.story}".
  
  Requirements for ${data.platform}:
  - Engaging text (max ${maxLength} characters)
  - ${data.platform === 'instagram' ? '8-12 trending hashtags' : '5-8 relevant hashtags'}
  - Call-to-action to drive engagement
  - Platform-specific tone and style
  - Emoji usage appropriate for ${data.platform}
  - Focus on benefits and emotional appeal
  
  ${data.platform === 'instagram' ? 
    'Instagram style: Visual-focused, trendy, use relevant emojis, include story elements, encourage saves and shares' : 
    'Facebook style: Conversational, community-focused, encourage comments and shares, longer form acceptable'
  }
  
  Return JSON format: {"text": "engaging post text with emojis", "hashtags": ["hashtag1", "hashtag2", ...]}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
  const response = await fetch(
    `${GEMINI_BASE_URL}/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );

    clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const result = await response.json();
  const text = result.candidates[0]?.content?.parts[0]?.text || '';
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const postData = JSON.parse(jsonMatch[0]);
      return NextResponse.json(postData);
    }
  } catch (error) {
    console.error('Error parsing social post data:', error);
  }
  
  // Fallback
  return NextResponse.json({
    text: "Discover this incredible handcrafted masterpiece! ✨ Each piece tells a unique story of artisan dedication and cultural heritage. 🎨",
    hashtags: ['handmade', 'unique', 'crafted', 'artisan', 'quality', 'authentic', 'premium', 'cultural', 'heritage', 'masterpiece']
  });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}