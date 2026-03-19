'use client';

import { useState, useCallback } from 'react';

type ShapeName = 'triangle' | 'circle' | 'square' | 'star' | 'pentagon' | 'hexagon' | 'heart' | 'arrow';

interface ShapeConfig {
  name: string;
  css: (size: number, color: string) => string;
  style: (size: number, color: string) => React.CSSProperties;
}

const shapes: Record<ShapeName, ShapeConfig> = {
  triangle: {
    name: 'Triangle',
    css: (size, color) => `width: 0;\nheight: 0;\nborder-left: ${size / 2}px solid transparent;\nborder-right: ${size / 2}px solid transparent;\nborder-bottom: ${size}px solid ${color};`,
    style: (size, color) => ({ width: 0, height: 0, borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderBottom: `${size}px solid ${color}` }),
  },
  circle: {
    name: 'Circle',
    css: (size, color) => `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};\nborder-radius: 50%;`,
    style: (size, color) => ({ width: size, height: size, background: color, borderRadius: '50%' }),
  },
  square: {
    name: 'Square',
    css: (size, color) => `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};`,
    style: (size, color) => ({ width: size, height: size, background: color }),
  },
  star: {
    name: 'Star',
    css: (size, color) => `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};\nclip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);`,
    style: (size, color) => ({ width: size, height: size, background: color, clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }),
  },
  pentagon: {
    name: 'Pentagon',
    css: (size, color) => `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};\nclip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);`,
    style: (size, color) => ({ width: size, height: size, background: color, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }),
  },
  hexagon: {
    name: 'Hexagon',
    css: (size, color) => `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};\nclip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);`,
    style: (size, color) => ({ width: size, height: size, background: color, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }),
  },
  heart: {
    name: 'Heart',
    css: (size, color) => `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};\nclip-path: path('M${size / 2} ${size * 0.9} C${size * 0.1} ${size * 0.55}, 0 ${size * 0.15}, ${size * 0.25} 0 C${size * 0.4} 0, ${size / 2} ${size * 0.15}, ${size / 2} ${size * 0.3} C${size / 2} ${size * 0.15}, ${size * 0.6} 0, ${size * 0.75} 0 C${size} ${size * 0.15}, ${size * 0.9} ${size * 0.55}, ${size / 2} ${size * 0.9}Z');`,
    style: (size, color) => ({ width: size, height: size, background: color, clipPath: `path('M${size / 2} ${size * 0.9} C${size * 0.1} ${size * 0.55}, 0 ${size * 0.15}, ${size * 0.25} 0 C${size * 0.4} 0, ${size / 2} ${size * 0.15}, ${size / 2} ${size * 0.3} C${size / 2} ${size * 0.15}, ${size * 0.6} 0, ${size * 0.75} 0 C${size} ${size * 0.15}, ${size * 0.9} ${size * 0.55}, ${size / 2} ${size * 0.9}Z')` }),
  },
  arrow: {
    name: 'Arrow Right',
    css: (size, color) => `width: ${size}px;\nheight: ${size}px;\nbackground: ${color};\nclip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);`,
    style: (size, color) => ({ width: size, height: size, background: color, clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }),
  },
};

export default function ToolClient() {
  const [selectedShape, setSelectedShape] = useState<ShapeName>('triangle');
  const [size, setSize] = useState(150);
  const [color, setColor] = useState('#3b82f6');
  const [copied, setCopied] = useState(false);

  const shape = shapes[selectedShape];
  const cssCode = `.shape {\n  ${shape.css(size, color)}\n}`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  return (
    <div className="space-y-6">
      {/* Shape selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Shape</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(shapes) as ShapeName[]).map(key => (
            <button key={key} onClick={() => setSelectedShape(key)} className={`px-4 py-2 text-sm rounded-lg transition-colors ${selectedShape === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {shapes[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-6 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Size: {size}px</label>
          <input type="range" min={50} max={300} value={size} onChange={e => setSize(Number(e.target.value))} className="w-48" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
            <input type="text" value={color} onChange={e => setColor(e.target.value)} className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm font-mono" />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="flex items-center justify-center p-12 bg-gray-100 rounded-xl min-h-[250px]">
          <div style={shape.style(size, color)} />
        </div>
      </div>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">CSS Code</label>
          <button onClick={copy} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
        <pre className="w-full px-4 py-3 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">{cssCode}</pre>
      </div>
    </div>
  );
}
