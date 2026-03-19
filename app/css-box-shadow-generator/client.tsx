'use client';

import { useState, useCallback } from 'react';

interface Shadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const defaultShadow: Shadow = { x: 5, y: 5, blur: 15, spread: 0, color: '#000000', opacity: 30, inset: false };

function shadowToCSS(s: Shadow): string {
  const r = parseInt(s.color.slice(1, 3), 16);
  const g = parseInt(s.color.slice(3, 5), 16);
  const b = parseInt(s.color.slice(5, 7), 16);
  const a = (s.opacity / 100).toFixed(2);
  return `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function ToolClient() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...defaultShadow }]);
  const [copied, setCopied] = useState(false);

  const cssValue = shadows.map(shadowToCSS).join(',\n    ');
  const cssCode = `box-shadow: ${cssValue};`;

  const update = (i: number, field: keyof Shadow, value: number | string | boolean) => {
    setShadows(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: value } : s));
  };

  const addShadow = () => setShadows(prev => [...prev, { ...defaultShadow }]);
  const removeShadow = (i: number) => {
    if (shadows.length <= 1) return;
    setShadows(prev => prev.filter((_, idx) => idx !== i));
  };

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  return (
    <div className="space-y-6">
      {shadows.map((shadow, i) => (
        <div key={i} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Shadow {i + 1}</span>
            {shadows.length > 1 && (
              <button onClick={() => removeShadow(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Offset X</label>
              <input type="range" min={-50} max={50} value={shadow.x} onChange={e => update(i, 'x', Number(e.target.value))} className="w-full" />
              <span className="text-xs text-gray-500">{shadow.x}px</span>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Offset Y</label>
              <input type="range" min={-50} max={50} value={shadow.y} onChange={e => update(i, 'y', Number(e.target.value))} className="w-full" />
              <span className="text-xs text-gray-500">{shadow.y}px</span>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Blur</label>
              <input type="range" min={0} max={100} value={shadow.blur} onChange={e => update(i, 'blur', Number(e.target.value))} className="w-full" />
              <span className="text-xs text-gray-500">{shadow.blur}px</span>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Spread</label>
              <input type="range" min={-50} max={50} value={shadow.spread} onChange={e => update(i, 'spread', Number(e.target.value))} className="w-full" />
              <span className="text-xs text-gray-500">{shadow.spread}px</span>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={shadow.color} onChange={e => update(i, 'color', e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
                <input type="range" min={0} max={100} value={shadow.opacity} onChange={e => update(i, 'opacity', Number(e.target.value))} className="flex-1" />
                <span className="text-xs text-gray-500 w-8">{shadow.opacity}%</span>
              </div>
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mt-4">
                <input type="checkbox" checked={shadow.inset} onChange={e => update(i, 'inset', e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Inset
              </label>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addShadow} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
        + Add Shadow Layer
      </button>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="flex items-center justify-center p-12 bg-gray-100 rounded-xl">
          <div className="w-48 h-48 bg-white rounded-xl" style={{ boxShadow: shadows.map(shadowToCSS).join(', ') }} />
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
