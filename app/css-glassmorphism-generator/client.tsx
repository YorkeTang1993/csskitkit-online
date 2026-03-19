'use client';

import { useState, useMemo } from 'react';

export default function ToolClient() {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(0.25);
  const [borderRadius, setBorderRadius] = useState(16);
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(bgColor);

  const cssCode = useMemo(() => {
    return [
      `background: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency});`,
      `backdrop-filter: blur(${blur}px);`,
      `-webkit-backdrop-filter: blur(${blur}px);`,
      `border-radius: ${borderRadius}px;`,
      `border: 1px solid rgba(255, 255, 255, ${borderOpacity});`,
    ].join('\n');
  }, [blur, transparency, borderRadius, borderOpacity, rgb]);

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Blur: {blur}px</label>
          <input type="range" min={0} max={20} value={blur} onChange={e => setBlur(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Transparency: {transparency}</label>
          <input type="range" min={0} max={1} step={0.05} value={transparency} onChange={e => setTransparency(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Border Radius: {borderRadius}px</label>
          <input type="range" min={0} max={50} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Border Opacity: {borderOpacity}</label>
          <input type="range" min={0} max={1} step={0.05} value={borderOpacity} onChange={e => setBorderOpacity(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Background Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
            <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-24 px-2 py-1 border border-gray-300 rounded text-xs font-mono" />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div
          className="w-full h-80 rounded-xl overflow-hidden flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          }}
        >
          {/* Decorative circles behind the glass */}
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-yellow-400 opacity-70" />
          <div className="absolute bottom-8 right-8 w-40 h-40 rounded-full bg-pink-400 opacity-70" />
          <div className="absolute top-12 right-16 w-24 h-24 rounded-full bg-cyan-400 opacity-70" />

          {/* Glass card */}
          <div
            className="relative z-10 w-72 px-8 py-10 text-center"
            style={{
              background: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              borderRadius: `${borderRadius}px`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
            }}
          >
            <h3 className="text-xl font-bold text-white mb-2">Glassmorphism</h3>
            <p className="text-sm text-white/80">A modern frosted glass UI effect using backdrop-filter and transparency.</p>
          </div>
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
