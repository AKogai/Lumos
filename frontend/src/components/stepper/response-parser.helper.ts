export interface ParsedMessages {
  familyMessage: string;
  publicMessage: string;
}

export function parseOpenAIResponse(response: string): ParsedMessages {
  // Split by the bold markers to find sections
  const sections = response.split(/\*\*.*?\*\*/);

  // Filter out empty strings and trim whitespace
  const cleanedSections = sections.map((section) => section.trim()).filter((section) => section.length > 0);

  return {
    familyMessage: cleanedSections[0] || '',
    publicMessage: cleanedSections[1] || ''
  };
}
