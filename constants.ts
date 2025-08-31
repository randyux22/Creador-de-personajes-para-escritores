
// These keys will be used for translation lookups
export const ART_STYLE_KEYS = [
    'photorealistic',
    'sketch',
    'charcoalDrawing',
    'oilPainting',
    'comicBook',
    'watercolor',
    'animeManga',
    'threeDRender',
    'fantasyArt',
    'pixelArt',
    'cyberpunk',
    'steampunk',
    'impressionism'
];

// This maps the translation key to the value the API expects
export const ART_STYLE_API_VALUES: { [key: string]: string } = {
    photorealistic: 'Photorealistic',
    sketch: 'Sketch',
    charcoalDrawing: 'Charcoal Drawing',
    oilPainting: 'Oil Painting',
    comicBook: 'Comic Book',
    watercolor: 'Watercolor',
    animeManga: 'Anime/Manga',
    threeDRender: '3D Render',
    fantasyArt: 'Fantasy Art',
    pixelArt: 'Pixel Art',
    cyberpunk: 'Cyberpunk',
    steampunk: 'Steampunk',
    impressionism: 'Impressionism'
};


// Maps aspect ratio value to its translation key
export const ASPECT_RATIOS: { [key: string]: string } = {
    '1:1': 'square',
    '16:9': 'landscape',
    '9:16': 'portrait',
    '4:3': 'standard',
    '3:4': 'tall'
};

// Maps aspect ratio value to its English label for API prompts
export const ASPECT_RATIO_LABELS: { [key: string]: string } = {
    '1:1': 'Square',
    '16:9': 'Landscape',
    '9:16': 'Portrait',
    '4:3': 'Standard',
    '3:4': 'Tall'
};
