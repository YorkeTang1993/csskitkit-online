'use client';

import { useState, useCallback } from 'react';

export default function ToolClient() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [gap, setGap] = useState(10);
  const [colTemplate, setColTemplate] = useState('1fr');
  const [rowTemplate, setRowTemplate] = useState('1fr');
  const [copied, setCopied] = useState(false);

  const colValue = Array(cols).fill(colTemplate).join(' ');
  const rowValue = Array(rows).fill(rowTemplate).join(' ');

  const cssCode = `.container {
  display: grid;
  grid-template-columns: ${colValue};
  grid-template-rows: ${rowValue};
  gap: ${gap}px;
}`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  const cellColors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140', '#a18cd1', '#fbc2eb', '#fda085'];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
          <input type="number" min={1} max={12} value={cols} onChange={e => setCols(Math.max(1, Math.min(12, Number(e.target.value))))} className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
          <input type="number" min={1} max={12} value={rows} onChange={e => setRows(Math.max(1, Math.min(12, Number(e.target.value))))} className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gap (px)</label>
          <input type="number" min={0} max={50} value={gap} onChange={e => setGap(Number(e.target.value))} className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Column Size</label>
          <select value={colTemplate} onChange={e => setColTemplate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="1fr">1fr</option>
            <option value="auto">auto</option>
            <option value="100px">100px</option>
            <option value="150px">150px</option>
            <option value="200px">200px</option>
            <option value="minmax(100px, 1fr)">minmax(100px, 1fr)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Row Size</label>
          <select value={rowTemplate} onChange={e => setRowTemplate(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="1fr">1fr</option>
            <option value="auto">auto</option>
            <option value="80px">80px</option>
            <option value="100px">100px</option>
            <option value="150px">150px</option>
            <option value="minmax(80px, 1fr)">minmax(80px, 1fr)</option>
          </select>
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 overflow-auto">
          <div style={{ display: 'grid', gridTemplateColumns: colValue, gridTemplateRows: rowValue, gap: `${gap}px` }}>
            {Array.from({ length: rows * cols }, (_, i) => (
              <div key={i} className="rounded-lg flex items-center justify-center text-white font-bold text-sm min-h-[60px]" style={{ backgroundColor: cellColors[i % cellColors.length] }}>
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
