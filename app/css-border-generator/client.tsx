'use client';

import { useState, useCallback } from 'react';

const BORDER_STYLES = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none'];

export default function ToolClient() {
  const [width, setWidth] = useState(3);
  const [style, setStyle] = useState('solid');
  const [color, setColor] = useState('#3b82f6');
  const [linked, setLinked] = useState(true);
  const [radius, setRadius] = useState([10, 10, 10, 10]);
  const [copied, setCopied] = useState(false);

  const updateRadius = (i: number, val: number) => {
    if (linked) {
      setRadius([val, val, val, val]);
    } else {
      setRadius(prev => prev.map((r, idx) => idx === i ? val : r));
    }
  };

  const allSame = radius.every(r => r === radius[0]);
  const borderRadiusCSS = allSame ? `${radius[0]}px` : `${radius[0]}px ${radius[1]}px ${radius[2]}px ${radius[3]}px`;

  const cssCode = `border: ${width}px ${style} ${color};\nborder-radius: ${borderRadiusCSS};`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  const cornerLabels = ['Top Left', 'Top Right', 'Bottom Right', 'Bottom Left'];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width: {width}px</label>
          <input type="range" min={0} max={20} value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
          <select value={style} onChange={e => setStyle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {BORDER_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0" />
            <input type="text" value={color} onChange={e => setColor(e.target.value)} className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm font-mono" />
          </div>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-2">
            <input type="checkbox" checked={linked} onChange={e => setLinked(e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            Link corners
          </label>
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {cornerLabels.map((label, i) => (
            <div key={i}>
              <label className="block text-xs text-gray-500 mb-1">{label}: {radius[i]}px</label>
              <input type="range" min={0} max={100} value={radius[i]} onChange={e => updateRadius(i, Number(e.target.value))} className="w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="flex items-center justify-center p-12 bg-gray-100 rounded-xl">
          <div className="w-48 h-48 bg-white" style={{ border: `${width}px ${style} ${color}`, borderRadius: borderRadiusCSS }} />
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
