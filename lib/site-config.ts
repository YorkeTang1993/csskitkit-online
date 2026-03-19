// ============================================================
// Site Configuration — THE ONLY FILE YOU NEED TO EDIT PER SITE
// ============================================================

export const siteConfig = {
  // --- Brand ---
  name: 'CSSKit',
  description: 'Free online CSS tools. Gradient generators, grid builders, shadow editors, animation creators and more for web developers.',
  domain: 'https://csskitkit-online.vercel.app',
  email: 'contact@csskitkit.online',

  // Header brand display: renders as "{text}{accent}{suffix}"
  brand: {
    text: 'CSS',
    accent: 'Kit',
    suffix: '',
  },

  // --- Categories ---
  categories: [
    { id: 'generator', label: 'Generators', description: 'Generate CSS code with visual builders' },
    { id: 'editor', label: 'Editors', description: 'Edit and customize CSS properties visually' },
    { id: 'converter', label: 'Converters', description: 'Convert between CSS formats and syntaxes' },
    { id: 'utility', label: 'Utilities', description: 'CSS utilities and helper tools' },
  ] as const,

  // --- SEO & Verification ---
  googleAnalyticsId: '',
  googleVerification: '',
  indexNowKey: '',

  // --- About page tagline ---
  tagline: 'free, fast, and privacy-friendly CSS tools that work right in your browser.',
};
