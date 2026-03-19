'use client';

import { useState, useCallback } from 'react';

interface ColorStop {
  color: string;
  position: number;
}

const DIRECTIONS = [
  'to right', 'to left', 'to bottom', 'to top',
  'to bottom right', 'to bottom left', 'to top right', 'to top left',
  '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg',
];

export default function ToolClient() {
  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [direction, setDirection] = useState('to right');
  const [colors, setColors] = useState<ColorStop[]>([
    { color: '#667eea', position: 0 },
    { color: '#764ba2', position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const buildGradient = useCallback(() => {
    const stops = colors.map(c => `${c.color} ${c.position}%`).join(', ');
    if (gradientType === 'linear') return `linear-gradient(${direction}, ${stops})`;
    if (gradientType === 'radial') return `radial-gradient(circle, ${stops})`;
    return `conic-gradient(from 0deg, ${stops})`;
  }, [colors, direction, gradientType]);

  const cssCode = `background: ${buildGradient()};`;

  const addStop = () => {
    setColors(prev => [...prev, { color: '#ffffff', position: 50 }]);
  };

  const removeStop = (i: number) => {
    if (colors.length <= 2) return;
    setColors(prev => prev.filter((_, idx) => idx !== i));
  };

  const updateStop = (i: number, field: keyof ColorStop, value: string | number) => {
    setColors(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select value={gradientType} onChange={e => setGradientType(e.target.value as 'linear' | 'radial' | 'conic')} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
            <option value="conic">Conic</option>
          </select>
        </div>
        {gradientType === 'linear' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
            <select value={direction} onChange={e => setDirection(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              {DIRECTIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        )}
        <button onClick={addStop} className="mt-5 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          + Add Color Stop
        </button>
      </div>

      {/* Color stops */}
      <div className="space-y-3">
        {colors.map((stop, i) => (
          <div key={i} className="flex items-center gap-3">
            <input type="color" value={stop.color} onChange={e => updateStop(i, 'color', e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
            <input type="text" value={stop.color} onChange={e => updateStop(i, 'color', e.target.value)} className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm font-mono" />
            <input type="range" min={0} max={100} value={stop.position} onChange={e => updateStop(i, 'position', Number(e.target.value))} className="flex-1" />
            <span className="text-sm text-gray-500 w-10">{stop.position}%</span>
            {colors.length > 2 && (
              <button onClick={() => removeStop(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
            )}
          </div>
        ))}
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="w-full h-48 rounded-xl border border-gray-200" style={{ background: buildGradient() }} />
      </div>

      {/* CSS Output */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">CSS Code</label>
          <button onClick={copy} className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
        <pre className="w-full px-4 py-3 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">{cssCode}</pre>
      </div>
    </div>
  );
}
