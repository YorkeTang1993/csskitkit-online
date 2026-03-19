'use client';

import { useState, useMemo } from 'react';

interface PatternDef {
  name: string;
  build: (fg: string, bg: string, size: number, angle: number) => string;
}

const PATTERNS: PatternDef[] = [
  {
    name: 'Stripes',
    build: (fg, bg, size, angle) =>
      `repeating-linear-gradient(${angle}deg, ${fg} 0px, ${fg} ${size / 4}px, ${bg} ${size / 4}px, ${bg} ${size}px)`,
  },
  {
    name: 'Dots',
    build: (fg, bg, size) =>
      `radial-gradient(${fg} ${size / 6}px, ${bg} ${size / 6}px)`,
  },
  {
    name: 'Checkerboard',
    build: (fg, bg, size) =>
      `conic-gradient(${fg} 25%, ${bg} 25%, ${bg} 50%, ${fg} 50%, ${fg} 75%, ${bg} 75%)`,
  },
  {
    name: 'Diagonal Lines',
    build: (fg, bg, size) =>
      `repeating-linear-gradient(45deg, ${fg} 0px, ${fg} ${size / 8}px, ${bg} ${size / 8}px, ${bg} ${size / 2}px)`,
  },
  {
    name: 'Grid',
    build: (fg, bg, size) =>
      `linear-gradient(${fg} ${size / 10}px, transparent ${size / 10}px), linear-gradient(90deg, ${fg} ${size / 10}px, ${bg} ${size / 10}px)`,
  },
  {
    name: 'Zigzag',
    build: (fg, bg, size) =>
      `linear-gradient(135deg, ${fg} 25%, transparent 25%) -${size / 2}px 0, linear-gradient(225deg, ${fg} 25%, transparent 25%) -${size / 2}px 0, linear-gradient(315deg, ${fg} 25%, transparent 25%), linear-gradient(45deg, ${fg} 25%, ${bg} 25%)`,
  },
  {
    name: 'Waves',
    build: (fg, bg, size) =>
      `radial-gradient(circle at 100% 50%, transparent ${size * 0.2}px, ${fg} ${size * 0.2}px, ${fg} ${size * 0.28}px, transparent ${size * 0.28}px), radial-gradient(circle at 0% 50%, transparent ${size * 0.2}px, ${fg} ${size * 0.2}px, ${fg} ${size * 0.28}px, ${bg} ${size * 0.28}px)`,
  },
  {
    name: 'Triangles',
    build: (fg, bg, size) =>
      `linear-gradient(60deg, ${fg} 25%, ${bg} 25%, ${bg} 75%, ${fg} 75%, ${fg})`,
  },
];

function getBackgroundSize(patternName: string, size: number): string {
  switch (patternName) {
    case 'Dots': return `${size}px ${size}px`;
    case 'Checkerboard': return `${size}px ${size}px`;
    case 'Grid': return `${size}px ${size}px`;
    case 'Zigzag': return `${size}px ${size}px`;
    case 'Waves': return `${size}px ${size * 0.6}px`;
    case 'Triangles': return `${size}px ${size * 0.6}px`;
    default: return 'auto';
  }
}

export default function ToolClient() {
  const [selected, setSelected] = useState(0);
  const [fg, setFg] = useState('#3b82f6');
  const [bg, setBg] = useState('#ffffff');
  const [size, setSize] = useState(20);
  const [angle, setAngle] = useState(0);
  const [copied, setCopied] = useState(false);

  const pattern = PATTERNS[selected];
  const bgImage = pattern.build(fg, bg, size, angle);
  const bgSize = getBackgroundSize(pattern.name, size);

  const cssCode = useMemo(() => {
    let code = `background-image: ${bgImage};`;
    if (bgSize !== 'auto') {
      code += `\nbackground-size: ${bgSize};`;
    }
    return code;
  }, [bgImage, bgSize]);

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Pattern Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
        <div className="flex flex-wrap gap-2">
          {PATTERNS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setSelected(i)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                selected === i ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Foreground</label>
          <div className="flex items-center gap-2">
            <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
            <input type="text" value={fg} onChange={e => setFg(e.target.value)} className="w-20 px-2 py-1 border border-gray-300 rounded text-xs font-mono" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Background</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
            <input type="text" value={bg} onChange={e => setBg(e.target.value)} className="w-20 px-2 py-1 border border-gray-300 rounded text-xs font-mono" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Size: {size}px</label>
          <input type="range" min={5} max={80} value={size} onChange={e => setSize(Number(e.target.value))} className="w-full" />
        </div>
        {pattern.name === 'Stripes' && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">Angle: {angle}deg</label>
            <input type="range" min={0} max={360} value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full" />
          </div>
        )}
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div
          className="w-full h-64 rounded-xl border border-gray-200"
          style={{
            backgroundImage: bgImage,
            backgroundSize: bgSize !== 'auto' ? bgSize : undefined,
          }}
        />
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
