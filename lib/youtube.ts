// Helper to get YouTube thumbnail URL from video ID
export function getYouTubeThumbnail(youtubeId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'maxres'): string {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}default.jpg`;
}

// Extract YouTube ID from various URL formats or return as-is if already an ID
export function extractYouTubeId(input: string): string | null {
  if (!input) return null;
  
  // Clean up the input
  const trimmed = input.trim();
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    /(?:youtube\.com\/v\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct ID (11 chars)
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }

  return null;
}
