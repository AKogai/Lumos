export interface ToneOption {
  value: string;
  hint: string;
}

export const toneOptions: ToneOption[] = [
  {
    value: 'Very Formal',
    hint: 'Reserved, respectful, and traditional. Often used in professional or distant relationships.'
  },
  { value: 'Gentle Formal', hint: 'Polite and composed, but with a softer emotional touch.' },
  { value: 'Warm and Conversational', hint: 'Friendly and sincere, suitable for colleagues or acquaintances.' },
  { value: 'Intimate', hint: 'Deeply personal and emotional, appropriate for close friends or family.' },
  {
    value: 'Light with Gentle Humour',
    hint: 'Comforting with a touch of levity, used when the deceased appreciated humour or the relationship allows it.'
  },
  {
    value: 'Spiritual or Reflective',
    hint: 'Focuses on peace, legacy, and deeper meaning; may include religious or philosophical elements.'
  },
  { value: 'Poetic or Literary', hint: 'Uses metaphor, imagery, or quotes to express grief and remembrance.' },
  {
    value: 'Minimalist and Quiet',
    hint: 'Sparse in words, but powerful in sentiment; ideal for those who prefer subtlety.'
  },
  { value: 'Supportive and Practical', hint: 'Focuses on offering help and presence rather than emotional depth.' },
  {
    value: 'Celebratory of Life',
    hint: 'Emphasizes the joy, impact, and memories of the person’s life rather than the sorrow of loss.'
  }
];
