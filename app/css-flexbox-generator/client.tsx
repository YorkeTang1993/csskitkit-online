'use client';

import { useState, useCallback } from 'react';

export default function ToolClient() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('flex-start');
  const [align, setAlign] = useState('stretch');
  const [wrap, setWrap] = useState('nowrap');
  const [gap, setGap] = useState(10);
  const [itemCount, setItemCount] = useState(5);
  const [copied, setCopied] = useState(false);

  const cssCode = `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  const boxColors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#fa709a'];
  const boxSizes = [80, 60, 100, 70, 90, 65, 85, 75];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
          <select value={direction} onChange={e => setDirection(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="row">row</option>
            <option value="row-reverse">row-reverse</option>
            <option value="column">column</option>
            <option value="column-reverse">column-reverse</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Justify Content</label>
          <select value={justify} onChange={e => setJustify(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="space-between">space-between</option>
            <option value="space-around">space-around</option>
            <option value="space-evenly">space-evenly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Align Items</label>
          <select value={align} onChange={e => setAlign(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="stretch">stretch</option>
            <option value="flex-start">flex-start</option>
            <option value="flex-end">flex-end</option>
            <option value="center">center</option>
            <option value="baseline">baseline</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wrap</label>
          <select value={wrap} onChange={e => setWrap(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="nowrap">nowrap</option>
            <option value="wrap">wrap</option>
            <option value="wrap-reverse">wrap-reverse</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gap (px)</label>
          <input type="number" min={0} max={50} value={gap} onChange={e => setGap(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Items</label>
          <input type="number" min={1} max={8} value={itemCount} onChange={e => setItemCount(Math.max(1, Math.min(8, Number(e.target.value))))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 min-h-[200px] overflow-auto">
          <div style={{ display: 'flex', flexDirection: direction as React.CSSProperties['flexDirection'], justifyContent: justify, alignItems: align, flexWrap: wrap as React.CSSProperties['flexWrap'], gap: `${gap}px`, minHeight: '180px' }}>
            {Array.from({ length: itemCount }, (_, i) => (
              <div key={i} className="rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ backgroundColor: boxColors[i % boxColors.length], width: boxSizes[i % boxSizes.length], height: align === 'stretch' ? 'auto' : boxSizes[i % boxSizes.length], minHeight: 40 }}>
                {i + 1}
              </div>
            ))}
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
