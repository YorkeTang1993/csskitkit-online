export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  slug: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  category: 'generator' | 'editor' | 'converter' | 'utility';
  categoryLabel: string;
  relatedSlugs: string[];
  faq: FAQ[];
  howToUse: string;
  whatIs: string;
  useCases: string[];
  howItWorks: string;
}

export const tools: Tool[] = [
  // ---- Generators ----
  {
    slug: 'css-gradient-generator',
    name: 'CSS Gradient Generator',
    title: 'CSS Gradient Generator | Free Online Tool - CSSKit',
    description: 'Free CSS gradient generator. Create beautiful linear, radial, and conic gradients with live preview. Copy CSS code instantly.',
    keywords: ['css gradient generator', 'gradient generator css', 'css linear gradient generator', 'css radial gradient generator', 'conic gradient generator', 'gradient maker', 'css gradient tool', 'gradient color picker'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-filter-generator', 'css-animation-generator', 'css-shadow-generator', 'css-shape-generator'],
    howToUse: 'Select your gradient type (linear, radial, or conic). Add color stops by clicking the add button. Adjust colors using the color pickers. Set the gradient direction or angle. Copy the generated CSS code with one click.',
    whatIs: 'CSS Gradient Generator is a free online tool that helps you create beautiful CSS gradients visually. It supports linear, radial, and conic gradients with multiple color stops, and generates the exact CSS code you need for your web projects.',
    useCases: [
      'Creating background gradients for websites',
      'Designing colorful button styles',
      'Building hero section backgrounds',
      'Crafting overlay effects for images',
      'Generating gradient text effects',
    ],
    howItWorks: 'The tool provides a visual interface for building CSS gradients. You select the gradient type, add and position color stops, and adjust the direction. The tool generates the corresponding CSS background property in real time, which you can copy and use directly in your stylesheets.',
    faq: [
      { question: 'What types of CSS gradients can I create?', answer: 'You can create linear gradients (straight line), radial gradients (circular/elliptical), and conic gradients (angular sweep). Each type supports multiple color stops.' },
      { question: 'Can I add multiple color stops?', answer: 'Yes, you can add as many color stops as you need. Each stop has its own color picker and position control.' },
      { question: 'Does the generated CSS work in all browsers?', answer: 'Yes, the generated CSS gradient syntax is supported by all modern browsers including Chrome, Firefox, Safari, and Edge.' },
      { question: 'Can I use the gradient generator for free?', answer: 'Absolutely. The CSS Gradient Generator is completely free with no signup required. All processing happens in your browser.' },
    ],
  },
  {
    slug: 'css-grid-generator',
    name: 'CSS Grid Generator',
    title: 'CSS Grid Generator | Visual Grid Builder - CSSKit',
    description: 'Free CSS grid generator. Build complex grid layouts visually with rows, columns, and gaps. Copy production-ready CSS grid code.',
    keywords: ['css grid generator', 'grid generator css', 'css grid layout generator', 'css grid builder', 'grid template generator', 'css grid tool', 'visual grid builder', 'grid layout maker'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-flexbox-generator', 'css-border-generator', 'css-shape-generator', 'css-gradient-generator'],
    howToUse: 'Set the number of rows and columns for your grid. Adjust the gap size between cells. Customize column and row sizes using the template inputs. See the live preview update in real time. Copy the generated CSS code.',
    whatIs: 'CSS Grid Generator is a free visual tool for creating CSS Grid layouts. It lets you define rows, columns, gaps, and template areas through an intuitive interface, then generates clean CSS code ready for production use.',
    useCases: [
      'Building page layouts with CSS Grid',
      'Creating responsive dashboard grids',
      'Designing photo gallery layouts',
      'Prototyping complex web layouts quickly',
      'Learning CSS Grid visually',
    ],
    howItWorks: 'The tool lets you specify grid dimensions (rows and columns), gap sizes, and template definitions. It renders a live preview of the grid layout and generates the corresponding CSS grid-template-columns, grid-template-rows, and gap properties.',
    faq: [
      { question: 'What is CSS Grid?', answer: 'CSS Grid is a two-dimensional layout system that allows you to create complex web layouts using rows and columns. It is natively supported in all modern browsers.' },
      { question: 'Can I set custom column widths?', answer: 'Yes, you can define custom column and row sizes using CSS units like px, fr, %, em, or auto in the template inputs.' },
      { question: 'Does this tool generate responsive grids?', answer: 'The tool generates the CSS grid code which you can combine with media queries for responsive behavior. Use fr units for flexible layouts.' },
      { question: 'Is CSS Grid better than Flexbox?', answer: 'CSS Grid is better for two-dimensional layouts (rows and columns), while Flexbox excels at one-dimensional layouts. They work great together.' },
    ],
  },
  {
    slug: 'css-flexbox-generator',
    name: 'CSS Flexbox Generator',
    title: 'CSS Flexbox Generator | Visual Flex Layout Tool - CSSKit',
    description: 'Free CSS flexbox generator. Build flex layouts visually with direction, alignment, wrapping and gap controls. Copy CSS flexbox code instantly.',
    keywords: ['css flexbox generator', 'flexbox generator', 'css flex generator', 'flexbox layout generator', 'flex container generator', 'css flexbox tool', 'flexbox builder', 'flex layout maker'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-grid-generator', 'css-border-generator', 'css-gradient-generator', 'css-animation-generator'],
    howToUse: 'Select the flex direction (row or column). Choose justify-content and align-items values. Toggle flex-wrap if needed. Set the gap between items. Watch the live preview and copy the generated CSS.',
    whatIs: 'CSS Flexbox Generator is a free visual tool for creating CSS Flexbox layouts. Configure flex container properties like direction, alignment, wrapping, and spacing through an intuitive interface and get production-ready CSS code.',
    useCases: [
      'Creating navigation bar layouts',
      'Building card row arrangements',
      'Centering elements on a page',
      'Creating responsive component layouts',
      'Aligning form elements',
    ],
    howItWorks: 'The tool provides dropdown and toggle controls for all major flexbox container properties. As you adjust each property, a live preview with colored boxes shows the layout result, and the CSS code updates in real time for you to copy.',
    faq: [
      { question: 'What is CSS Flexbox?', answer: 'CSS Flexbox (Flexible Box Layout) is a one-dimensional layout method for arranging items in rows or columns. It provides powerful alignment and distribution capabilities.' },
      { question: 'When should I use Flexbox vs Grid?', answer: 'Use Flexbox for one-dimensional layouts (a single row or column of items). Use CSS Grid for two-dimensional layouts where you need control over both rows and columns simultaneously.' },
      { question: 'Can I set gap between flex items?', answer: 'Yes, the gap property works with Flexbox in all modern browsers. You can set both row-gap and column-gap.' },
      { question: 'Does this tool support flex item properties?', answer: 'This tool focuses on the flex container properties. The generated code sets display: flex along with direction, alignment, wrapping, and gap values.' },
    ],
  },
  {
    slug: 'css-clip-path-generator',
    name: 'CSS Clip Path Generator',
    title: 'CSS Clip Path Generator | Shape Clipping Tool - CSSKit',
    description: 'Free CSS clip-path generator. Create circles, ellipses, polygons, and inset clip paths visually. Copy CSS clip-path code instantly.',
    keywords: ['css clip path generator', 'clip-path generator', 'css clip path maker', 'polygon clip path', 'css shape clipping', 'clip path tool', 'css clip-path', 'css polygon generator'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-shape-generator', 'css-border-generator', 'css-gradient-generator', 'css-filter-generator'],
    howToUse: 'Select a shape type (circle, ellipse, polygon, or inset). For polygons, click to add points or use preset shapes. Adjust the shape parameters using the controls. See the clip path applied to the preview element in real time. Copy the CSS code.',
    whatIs: 'CSS Clip Path Generator is a free online tool for creating CSS clip-path shapes visually. It supports circle, ellipse, polygon, and inset clipping shapes, allowing you to crop elements into any shape you need.',
    useCases: [
      'Creating custom image shapes',
      'Building decorative section dividers',
      'Designing unique avatar shapes',
      'Creating polygon masks for elements',
      'Building creative hover effects',
    ],
    howItWorks: 'The tool provides preset shapes and a visual editor for defining clip-path values. You select a shape type, adjust its parameters, and the tool generates the CSS clip-path property. The preview shows the clipping applied to a sample element in real time.',
    faq: [
      { question: 'What is CSS clip-path?', answer: 'CSS clip-path defines a clipping region that determines which parts of an element are visible. Content outside the clipping region is hidden.' },
      { question: 'What shapes can I create?', answer: 'You can create circle(), ellipse(), polygon(), and inset() shapes. Polygons allow any custom shape by defining vertex points.' },
      { question: 'Is clip-path supported in all browsers?', answer: 'CSS clip-path is supported in all modern browsers. Some older browsers may need the -webkit- prefix for certain values.' },
      { question: 'Can I create custom polygon shapes?', answer: 'Yes, you can create custom polygons by adding points. The tool also provides preset shapes like triangles, pentagons, hexagons, and stars.' },
    ],
  },
  {
    slug: 'css-animation-generator',
    name: 'CSS Animation Generator',
    title: 'CSS Animation Generator | Keyframe Animation Builder - CSSKit',
    description: 'Free CSS animation generator. Create keyframe animations with visual controls for timing, duration, delay, and easing. Copy CSS @keyframes code.',
    keywords: ['css animation generator', 'css keyframe generator', 'css animation maker', 'keyframe animation tool', 'css animation builder', 'css transition generator', 'animation css tool', 'css animate'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-transition-generator', 'css-transform-generator', 'css-filter-generator', 'css-shadow-generator'],
    howToUse: 'Set the animation properties: name, duration, timing function, delay, iteration count, direction, and fill mode. Add keyframes and define CSS properties at each keyframe percentage. Preview the animation live and copy the generated CSS code.',
    whatIs: 'CSS Animation Generator is a free online tool for creating CSS @keyframes animations visually. Build complex animations with multiple keyframes, timing functions, and animation properties without writing code manually.',
    useCases: [
      'Creating loading spinner animations',
      'Building entrance and exit animations',
      'Designing hover effect animations',
      'Creating attention-grabbing UI animations',
      'Prototyping animation sequences',
    ],
    howItWorks: 'The tool provides controls for all CSS animation properties and a keyframe editor. You define what CSS properties change at each keyframe percentage (0%, 50%, 100%, etc.). The tool generates both the @keyframes rule and the animation shorthand property.',
    faq: [
      { question: 'What are CSS keyframe animations?', answer: 'CSS @keyframes animations let you define how an element should look at various points during an animation sequence. You specify styles at percentage points from 0% to 100%.' },
      { question: 'Can I create multi-step animations?', answer: 'Yes, you can add as many keyframes as you need at different percentage points to create complex multi-step animations.' },
      { question: 'What timing functions are available?', answer: 'The tool supports ease, linear, ease-in, ease-out, ease-in-out, and custom cubic-bezier timing functions.' },
      { question: 'Can I make infinite looping animations?', answer: 'Yes, set the iteration count to "infinite" to create animations that loop continuously.' },
    ],
  },
  {
    slug: 'css-shape-generator',
    name: 'CSS Shape Generator',
    title: 'CSS Shape Generator | Pure CSS Shapes Tool - CSSKit',
    description: 'Free CSS shape generator. Create triangles, circles, stars, hearts, arrows and more with pure CSS. Copy the code instantly.',
    keywords: ['css shape generator', 'css shapes', 'css triangle generator', 'css circle generator', 'css star generator', 'pure css shapes', 'css shape maker', 'css heart shape'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-clip-path-generator', 'css-border-generator', 'css-gradient-generator', 'css-animation-generator'],
    howToUse: 'Select a shape preset from the shape library (triangle, circle, star, pentagon, hexagon, heart, arrow, etc.). Customize the size and color. See the shape rendered in the live preview. Copy the generated CSS code.',
    whatIs: 'CSS Shape Generator is a free online tool that generates pure CSS code for common geometric shapes. Create triangles, circles, stars, hearts, arrows, and more without using images or SVGs.',
    useCases: [
      'Creating decorative elements without images',
      'Building CSS-only icons',
      'Adding arrows and pointers to tooltips',
      'Creating shape dividers between sections',
      'Learning CSS techniques for shape creation',
    ],
    howItWorks: 'The tool uses various CSS techniques to create shapes, including border tricks for triangles, border-radius for circles and ellipses, and clip-path for complex polygons. Each shape preset generates optimized CSS code that renders the shape using a single HTML element.',
    faq: [
      { question: 'How are CSS shapes created?', answer: 'CSS shapes are created using techniques like border manipulation (for triangles), border-radius (for circles), clip-path (for polygons), and transform/pseudo-elements for complex shapes like stars and hearts.' },
      { question: 'Are pure CSS shapes better than SVGs?', answer: 'CSS shapes are lighter weight and easier to style dynamically. SVGs are better for complex or scalable graphics. For simple geometric shapes, CSS is often the better choice.' },
      { question: 'Can I customize the shape colors and sizes?', answer: 'Yes, you can adjust the size and color of each shape. The generated CSS uses your chosen values.' },
      { question: 'Do these shapes work in all browsers?', answer: 'Most shapes use widely supported CSS properties. Shapes using clip-path work in all modern browsers.' },
    ],
  },
  // ---- Editors ----
  {
    slug: 'css-box-shadow-generator',
    name: 'CSS Box Shadow Generator',
    title: 'CSS Box Shadow Generator | Visual Shadow Editor - CSSKit',
    description: 'Free CSS box-shadow generator. Create beautiful box shadows with visual controls for offset, blur, spread, and color. Copy CSS code instantly.',
    keywords: ['css box shadow generator', 'box shadow generator', 'css shadow generator', 'box shadow css', 'shadow generator', 'css box shadow tool', 'box shadow maker', 'css drop shadow'],
    category: 'editor',
    categoryLabel: 'Editors',
    relatedSlugs: ['css-shadow-generator', 'css-border-generator', 'css-filter-generator', 'css-gradient-generator'],
    howToUse: 'Adjust the shadow properties using the sliders: horizontal offset, vertical offset, blur radius, and spread radius. Pick a shadow color and set its opacity. Toggle the inset option for inner shadows. Add multiple shadows if needed. Copy the generated CSS.',
    whatIs: 'CSS Box Shadow Generator is a free online tool for creating CSS box-shadow effects visually. Use intuitive sliders and color pickers to design single or multiple shadows, with real-time preview and one-click code copying.',
    useCases: [
      'Adding depth to card components',
      'Creating elevated button effects',
      'Building neumorphic UI designs',
      'Designing modal and popup shadows',
      'Creating layered shadow effects',
    ],
    howItWorks: 'The tool provides slider controls for each box-shadow parameter: horizontal offset (x), vertical offset (y), blur radius, spread radius, and color with opacity. You can add multiple shadow layers and toggle inset mode. The CSS box-shadow property is generated in real time.',
    faq: [
      { question: 'What is CSS box-shadow?', answer: 'CSS box-shadow adds shadow effects around an element\'s frame. You can set the shadow\'s offset, blur, spread, color, and whether it appears inside (inset) or outside the element.' },
      { question: 'Can I add multiple shadows?', answer: 'Yes, CSS supports multiple box shadows separated by commas. This tool lets you add, remove, and configure multiple shadow layers.' },
      { question: 'What is an inset shadow?', answer: 'An inset shadow appears inside the element rather than outside. It creates an inner shadow or pressed-in effect.' },
      { question: 'How do I create a soft shadow?', answer: 'For a soft, natural shadow, use a large blur radius (15-30px) with a small offset (2-5px) and a semi-transparent dark color.' },
    ],
  },
  {
    slug: 'css-filter-generator',
    name: 'CSS Filter Generator',
    title: 'CSS Filter Generator | Visual Filter Effects Tool - CSSKit',
    description: 'Free CSS filter generator. Apply blur, brightness, contrast, grayscale, hue-rotate, and more with live preview. Copy CSS filter code.',
    keywords: ['css filter generator', 'css filter effects', 'css blur generator', 'css brightness filter', 'css grayscale filter', 'css hue rotate', 'filter generator css', 'css image filter'],
    category: 'editor',
    categoryLabel: 'Editors',
    relatedSlugs: ['css-gradient-generator', 'css-shadow-generator', 'css-animation-generator', 'css-box-shadow-generator'],
    howToUse: 'Use the sliders to adjust each filter effect: blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, and sepia. See the filters applied to a sample preview in real time. Copy the generated CSS filter property.',
    whatIs: 'CSS Filter Generator is a free online tool for creating CSS filter effects visually. Apply and combine multiple filters like blur, brightness, contrast, grayscale, and more with instant preview and code generation.',
    useCases: [
      'Creating image hover effects',
      'Building grayscale-to-color transitions',
      'Adjusting image brightness and contrast',
      'Creating vintage or sepia photo effects',
      'Applying blur effects to backgrounds',
    ],
    howItWorks: 'The tool provides individual sliders for each CSS filter function. As you adjust the sliders, the combined filter property is applied to a preview element in real time. The generated CSS filter property includes all non-default values.',
    faq: [
      { question: 'What CSS filters are available?', answer: 'CSS supports blur(), brightness(), contrast(), grayscale(), hue-rotate(), invert(), opacity(), saturate(), sepia(), and drop-shadow() filter functions.' },
      { question: 'Can I combine multiple filters?', answer: 'Yes, multiple filter functions can be combined in a single filter property. They are applied in the order listed.' },
      { question: 'Do CSS filters affect performance?', answer: 'CSS filters are GPU-accelerated in most browsers, so they perform well. However, heavy use of blur on large elements can impact performance.' },
      { question: 'Can I animate CSS filters?', answer: 'Yes, CSS filters can be animated using CSS transitions or @keyframes animations for smooth visual effects.' },
    ],
  },
  {
    slug: 'css-border-generator',
    name: 'CSS Border Generator',
    title: 'CSS Border Generator | Border & Radius Editor - CSSKit',
    description: 'Free CSS border generator. Create borders with custom width, style, color, and border-radius for each corner. Copy CSS code instantly.',
    keywords: ['css border generator', 'border generator css', 'css border radius generator', 'border radius tool', 'css border maker', 'rounded corners generator', 'css border style', 'border radius css'],
    category: 'editor',
    categoryLabel: 'Editors',
    relatedSlugs: ['css-box-shadow-generator', 'css-shape-generator', 'css-gradient-generator', 'css-clip-path-generator'],
    howToUse: 'Set the border width using the slider. Select a border style from the dropdown (solid, dashed, dotted, double, groove, ridge, etc.). Pick the border color. Adjust each corner\'s border-radius independently or link them. Preview the result and copy the CSS.',
    whatIs: 'CSS Border Generator is a free online tool for creating CSS borders and border-radius values visually. Customize border width, style, color, and individual corner radii with a live preview.',
    useCases: [
      'Creating rounded corner elements',
      'Designing custom card borders',
      'Building pill-shaped buttons',
      'Creating decorative border styles',
      'Generating individual corner radius values',
    ],
    howItWorks: 'The tool provides controls for border-width, border-style, border-color, and individual border-radius values for each corner (top-left, top-right, bottom-right, bottom-left). The live preview shows the combined effect and the tool generates the complete CSS code.',
    faq: [
      { question: 'What border styles are available in CSS?', answer: 'CSS supports solid, dashed, dotted, double, groove, ridge, inset, outset, and none border styles.' },
      { question: 'Can I set different radius for each corner?', answer: 'Yes, CSS border-radius supports individual values for each corner: border-top-left-radius, border-top-right-radius, border-bottom-right-radius, and border-bottom-left-radius.' },
      { question: 'How do I create a circle with border-radius?', answer: 'Set border-radius to 50% on a square element to create a perfect circle.' },
      { question: 'Can I use different border styles per side?', answer: 'Yes, CSS allows different border properties for each side using border-top, border-right, border-bottom, and border-left.' },
    ],
  },
  {
    slug: 'css-shadow-generator',
    name: 'CSS Shadow Generator',
    title: 'CSS Shadow Generator | Text & Box Shadow Tool - CSSKit',
    description: 'Free CSS shadow generator. Create text-shadow, box-shadow, and drop-shadow effects with visual controls. Compare shadow types side by side.',
    keywords: ['css shadow generator', 'text shadow generator', 'css text shadow', 'drop shadow generator', 'css shadow tool', 'shadow generator css', 'text shadow css', 'css shadow maker'],
    category: 'editor',
    categoryLabel: 'Editors',
    relatedSlugs: ['css-text-shadow-generator', 'css-box-shadow-generator', 'css-filter-generator', 'css-border-generator'],
    howToUse: 'Choose the shadow type: text-shadow, box-shadow, or drop-shadow filter. Adjust offset, blur, spread (box-shadow only), and color using the controls. Add multiple shadow layers. Switch between tabs to compare different shadow types. Copy the CSS code.',
    whatIs: 'CSS Shadow Generator is a free online tool for creating all types of CSS shadows. It supports text-shadow, box-shadow, and drop-shadow filter, letting you compare and generate shadow code for any use case.',
    useCases: [
      'Creating text shadow effects for headings',
      'Building glowing text effects',
      'Comparing box-shadow vs drop-shadow',
      'Designing embossed or letterpress text',
      'Creating neon glow effects',
    ],
    howItWorks: 'The tool offers tabbed views for text-shadow, box-shadow, and drop-shadow filter. Each tab has controls for shadow parameters specific to that type. Text-shadow uses offset-x, offset-y, blur-radius, and color. Box-shadow adds spread-radius and inset. Drop-shadow is similar to text-shadow but applied as a filter.',
    faq: [
      { question: 'What is the difference between box-shadow and text-shadow?', answer: 'Box-shadow applies to the element\'s box (rectangular area), while text-shadow applies to the text content only. Box-shadow also supports spread radius and inset, which text-shadow does not.' },
      { question: 'What is drop-shadow filter?', answer: 'The drop-shadow() CSS filter function applies a shadow to the element\'s painted content, respecting its transparency. Unlike box-shadow, it follows the shape of the content.' },
      { question: 'Can I add multiple text shadows?', answer: 'Yes, CSS text-shadow supports multiple shadow values separated by commas, allowing you to create complex layered text effects.' },
      { question: 'How do I create a glowing text effect?', answer: 'Use text-shadow with zero offset and a large blur radius in a bright color. Stack multiple shadows for a stronger glow effect.' },
    ],
  },
  // ---- New Tools ----
  {
    slug: 'css-text-shadow-generator',
    name: 'CSS Text Shadow Generator',
    title: 'CSS Text Shadow Generator | Free Online Tool - CSSKit',
    description: 'Free CSS text-shadow generator. Create stunning text shadow effects with live preview. Multiple shadows, blur, color, and offset controls.',
    keywords: ['css text shadow generator', 'text shadow css generator', 'text-shadow generator', 'css text shadow', 'text shadow effect generator'],
    category: 'editor',
    categoryLabel: 'Editors',
    relatedSlugs: ['css-shadow-generator', 'css-box-shadow-generator', 'css-glassmorphism-generator', 'css-filter-generator'],
    howToUse: 'Type your preview text in the input field. Add shadow layers using the "Add Shadow" button. For each layer, adjust the horizontal and vertical offset, blur radius, and color using the sliders and color picker. See the combined text shadow effect in the live preview. Copy the generated CSS code with one click.',
    whatIs: 'CSS Text Shadow Generator is a free online tool for creating CSS text-shadow effects visually. Build single or multiple layered text shadows with full control over offset, blur, and color, all with instant live preview.',
    useCases: [
      'Creating 3D text effects for headings',
      'Building neon glow text styles',
      'Designing embossed or letterpress text',
      'Adding depth to typography',
      'Creating retro or vintage text effects',
    ],
    howItWorks: 'The tool provides visual controls for each text-shadow layer. You set the X and Y offset to position the shadow, blur radius for softness, and pick a color. Multiple layers are combined into a single text-shadow CSS property. The preview updates in real time as you adjust any parameter.',
    faq: [
      { question: 'What is CSS text-shadow?', answer: 'CSS text-shadow adds shadow effects to text. It accepts offset-x, offset-y, blur-radius, and color values. Multiple shadows can be stacked by separating them with commas.' },
      { question: 'Can I add multiple text shadows?', answer: 'Yes, you can add as many shadow layers as you like. Each layer has its own offset, blur, and color. They are combined into a single text-shadow property.' },
      { question: 'How do I create a neon glow effect?', answer: 'Set the offsets to 0, use a large blur radius (10-20px), and choose a bright neon color. Add multiple layers with increasing blur for a stronger glow.' },
      { question: 'Does text-shadow work in all browsers?', answer: 'Yes, text-shadow is supported in all modern browsers including Chrome, Firefox, Safari, and Edge.' },
    ],
  },
  {
    slug: 'css-transform-generator',
    name: 'CSS Transform Generator',
    title: 'CSS Transform Generator | Visual Transform Tool - CSSKit',
    description: 'Free CSS transform generator. Combine rotate, scale, skew, translate, and perspective transforms with live visual preview.',
    keywords: ['css transform generator', 'css transform tool', 'css rotate generator', 'css scale generator', 'css skew generator'],
    category: 'editor',
    categoryLabel: 'Editors',
    relatedSlugs: ['css-animation-generator', 'css-transition-generator', 'css-filter-generator', 'css-clip-path-generator'],
    howToUse: 'Use the sliders to adjust each transform function: rotate (0-360 degrees), scaleX and scaleY (0-3), skewX and skewY (-90 to 90 degrees), translateX and translateY (-200 to 200px), and perspective. Watch the preview element transform in real time. Copy the generated CSS transform property.',
    whatIs: 'CSS Transform Generator is a free online tool for building CSS transform values visually. Combine rotate, scale, skew, translate, and perspective transforms with an interactive preview that shows exactly how the transformations stack.',
    useCases: [
      'Creating hover transform effects',
      'Building card flip animations',
      'Rotating and scaling UI elements',
      'Creating 3D perspective effects',
      'Prototyping complex CSS transforms',
    ],
    howItWorks: 'The tool provides range sliders for each CSS transform function. As you adjust the values, the corresponding transform property is built by combining all active functions. The preview element updates in real time, showing how multiple transforms compose together.',
    faq: [
      { question: 'What is CSS transform?', answer: 'CSS transform lets you rotate, scale, skew, or translate an element. It modifies the coordinate space of the CSS visual formatting model without affecting the document flow.' },
      { question: 'Can I combine multiple transforms?', answer: 'Yes, multiple transform functions can be combined in a single transform property. They are applied in the order listed, which affects the final result.' },
      { question: 'What is the perspective transform?', answer: 'Perspective sets the distance between the viewer and the z=0 plane, creating a 3D depth effect. Smaller values create more dramatic 3D effects.' },
      { question: 'Does transform order matter?', answer: 'Yes, CSS transforms are applied from right to left. For example, rotate then translate produces a different result than translate then rotate.' },
    ],
  },
  {
    slug: 'css-transition-generator',
    name: 'CSS Transition Generator',
    title: 'CSS Transition Generator | Easing Visualizer - CSSKit',
    description: 'Free CSS transition generator with easing function visualizer. Create smooth CSS transitions with custom timing functions and live preview.',
    keywords: ['css transition generator', 'css easing generator', 'css timing function', 'css transition tool', 'cubic bezier generator'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-animation-generator', 'css-transform-generator', 'css-gradient-generator', 'css-glassmorphism-generator'],
    howToUse: 'Select the CSS property to transition (all, opacity, transform, background, etc.). Set the duration and delay using the sliders. Choose a timing function preset or customize a cubic-bezier curve. Click the "Play Transition" button to preview the effect. Copy the generated CSS code.',
    whatIs: 'CSS Transition Generator is a free online tool for creating CSS transition effects with an easing function visualizer. Build smooth property transitions by selecting properties, durations, delays, and timing functions with instant visual feedback.',
    useCases: [
      'Creating smooth hover effects',
      'Building animated button states',
      'Designing fade-in and fade-out effects',
      'Creating smooth color transitions',
      'Prototyping UI micro-interactions',
    ],
    howItWorks: 'The tool lets you configure the four components of a CSS transition: property, duration, timing-function, and delay. A visual easing curve shows how the timing function distributes the animation progress over time. The live preview demonstrates the transition when triggered.',
    faq: [
      { question: 'What is a CSS transition?', answer: 'A CSS transition provides a way to control animation speed when changing CSS properties. It creates smooth gradual changes between property values over a specified duration.' },
      { question: 'What timing functions are available?', answer: 'CSS supports ease, linear, ease-in, ease-out, ease-in-out, step-start, step-end, and custom cubic-bezier() timing functions.' },
      { question: 'What is a cubic-bezier function?', answer: 'cubic-bezier() defines a custom easing curve using four control points. It allows you to create unique acceleration and deceleration patterns for transitions.' },
      { question: 'Can I transition multiple properties?', answer: 'Yes, you can transition all properties at once using "all", or specify individual properties with separate transition declarations.' },
      { question: 'What is the difference between transition and animation?', answer: 'Transitions animate between two states when triggered (e.g., hover). Animations use @keyframes to define multi-step sequences that can run automatically and loop.' },
    ],
  },
  {
    slug: 'css-background-pattern-generator',
    name: 'CSS Background Pattern Generator',
    title: 'CSS Background Pattern Generator | Pure CSS Patterns - CSSKit',
    description: 'Free CSS background pattern generator. Create beautiful repeating patterns using pure CSS gradients. Stripes, dots, checkerboard, and more.',
    keywords: ['css background pattern generator', 'css pattern generator', 'css repeating pattern', 'pure css pattern', 'css background pattern'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-gradient-generator', 'css-glassmorphism-generator', 'css-shape-generator', 'css-filter-generator'],
    howToUse: 'Select a pattern preset from the gallery (stripes, dots, checkerboard, diagonal lines, zigzag, waves, grid, triangles). Choose foreground and background colors with the color pickers. Adjust the pattern size and angle with the sliders. See the pattern fill the preview area in real time. Copy the generated CSS code.',
    whatIs: 'CSS Background Pattern Generator is a free online tool for creating repeating background patterns using pure CSS. It generates patterns like stripes, dots, checkerboard, and more using CSS gradients, with no images required.',
    useCases: [
      'Creating decorative page backgrounds',
      'Building subtle texture patterns',
      'Designing hero section backgrounds',
      'Adding pattern overlays to images',
      'Creating loading placeholder patterns',
    ],
    howItWorks: 'The tool uses CSS repeating-linear-gradient, repeating-radial-gradient, and linear-gradient functions to create seamless patterns. Each preset defines a specific combination of gradient layers. You can customize the colors, size, and angle, and the generated CSS is pure gradient code with no images.',
    faq: [
      { question: 'Are these patterns made with pure CSS?', answer: 'Yes, all patterns are generated using CSS gradient functions (linear-gradient, radial-gradient, repeating-linear-gradient). No images are used.' },
      { question: 'Can I customize the pattern colors?', answer: 'Yes, you can change the foreground and background colors of any pattern using the color pickers.' },
      { question: 'Do CSS patterns affect page performance?', answer: 'CSS gradient patterns are very lightweight compared to image patterns. They render efficiently and scale to any resolution without pixelation.' },
      { question: 'Can I adjust the pattern size?', answer: 'Yes, use the size slider to control the scale of the repeating pattern. Smaller values create denser patterns.' },
    ],
  },
  {
    slug: 'css-glassmorphism-generator',
    name: 'CSS Glassmorphism Generator',
    title: 'CSS Glassmorphism Generator | Frosted Glass Effect - CSSKit',
    description: 'Free CSS glassmorphism generator. Create modern frosted glass UI effects with backdrop-filter blur, transparency, and border styling.',
    keywords: ['css glassmorphism generator', 'glassmorphism css', 'frosted glass css', 'backdrop filter generator', 'glass effect css generator'],
    category: 'generator',
    categoryLabel: 'Generators',
    relatedSlugs: ['css-gradient-generator', 'css-background-pattern-generator', 'css-box-shadow-generator', 'css-border-generator'],
    howToUse: 'Adjust the backdrop blur amount to control the frosted glass intensity. Set the background transparency and color. Customize the border radius for rounded corners. Adjust the border opacity for a subtle glass edge. See the glass card effect rendered on a colorful background. Copy the generated CSS code.',
    whatIs: 'CSS Glassmorphism Generator is a free online tool for creating modern frosted glass UI effects. It uses backdrop-filter blur, semi-transparent backgrounds, and subtle borders to produce the popular glassmorphism design style.',
    useCases: [
      'Creating frosted glass cards',
      'Building modern login form overlays',
      'Designing translucent navigation bars',
      'Creating glassmorphic modal dialogs',
      'Building trendy UI components',
    ],
    howItWorks: 'The tool combines several CSS properties to create the glassmorphism effect: backdrop-filter: blur() for the frosted look, a semi-transparent background color, border-radius for rounded corners, and a subtle border for the glass edge. The preview shows the effect over a colorful gradient background.',
    faq: [
      { question: 'What is glassmorphism?', answer: 'Glassmorphism is a design style that creates a frosted glass effect using background blur, transparency, and subtle borders. It became popular in modern UI design, notably in Apple\'s macOS Big Sur.' },
      { question: 'Is backdrop-filter supported in all browsers?', answer: 'backdrop-filter is supported in all modern browsers including Chrome, Firefox (76+), Safari, and Edge. Some older browsers may not support it.' },
      { question: 'Can I change the background behind the glass?', answer: 'The tool provides a colorful gradient background for demonstration. In your own project, the glass effect works over any background content.' },
      { question: 'How do I make the glass more or less transparent?', answer: 'Adjust the transparency slider to control the alpha value of the background color. Lower values make the glass more transparent, showing more of the content behind it.' },
      { question: 'What CSS properties does glassmorphism use?', answer: 'The main properties are backdrop-filter: blur(), a semi-transparent background-color (rgba), border-radius for rounded corners, and a subtle border with low opacity.' },
    ],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getRelatedTools(slug: string): Tool[] {
  const tool = tools.find(t => t.slug === slug);
  if (!tool) return [];
  return tool.relatedSlugs
    .map(s => tools.find(t => t.slug === s))
    .filter((t): t is Tool => t !== undefined);
}

export { siteConfig } from './site-config';
import { siteConfig } from './site-config';
export const categories = siteConfig.categories;
