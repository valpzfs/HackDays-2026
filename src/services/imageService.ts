/**
 * Image Generation Service
 * Uses Pollinations.ai for free AI image generation
 */

export type ImageGenerationParams = {
  prompt: string;
  width?: number;
  height?: number;
  seed?: number;
};

/**
 * Generate an image using Pollinations.ai
 * This service provides free AI image generation without requiring API keys
 */
export const generateImage = ({
  prompt,
  width = 1024,
  height = 768,
  seed
}: ImageGenerationParams): string => {
  // Pollinations.ai uses a simple URL-based API
  const encodedPrompt = encodeURIComponent(prompt);
  const seedParam = seed !== undefined ? `&seed=${seed}` : `&seed=${Date.now()}`;

  // Construct the image URL - the browser will handle loading it
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true${seedParam}`;

  return imageUrl;
};

/**
 * Generate a robot render using the provided prompt
 */
export const generateRobotRender = (prompt: string): string => {
  return generateImage({
    prompt: `3D render of ${prompt}, professional robotics design, clean background, high detail, technical illustration`,
    width: 1024,
    height: 768,
    seed: Date.now()
  });
};
