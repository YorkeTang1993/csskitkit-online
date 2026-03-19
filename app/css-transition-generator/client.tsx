'use client';

import { useState, useCallback } from 'react';

const PROPERTIES = ['all', 'opacity', 'transform', 'background-color', 'color', 'border', 'box-shadow', 'width', 'height', 'margin', 'padding'];
const TIMING_PRESETS = [
  { name: 'ease', value: 'ease' },
  { name: 'linear', value: 'linear' },
  { name: 'ease-in', value: 'ease-in' },
  { name: 'ease-out', value: 'ease-out' },
  { name: 'ease-in-out', value: 'ease-in-out' },
  { name: 'cubic-bezier', value: 'custom' },
];

export default function ToolClient() {
  const [property, setProperty] = useState('all');
  const [duration, setDuration] = useState(0.3);
  const [delay, setDelay] = useState(0);
  const [timingPreset, setTimingPreset] = useState('ease');
  const [cubicP1, setCubicP1] = useState(0.25);
  const [cubicP2, setCubicP2] = useState(0.1);
  const [cubicP3, setCubicP3] = useState(0.25);
  const [cubicP4, setCubicP4] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const timingValue = timingPreset === 'custom'
    ? `cubic-bezier(${cubicP1}, ${cubicP2}, ${cubicP3}, ${cubicP4})`
    : timingPreset;

  const cssCode = `transition: ${property} ${duration}s ${timingValue}${delay > 0 ? ` ${delay}s` : ''};`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  const playTransition = () => {
    setIsActive(prev => !prev);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
          <select value={property} onChange={e => setProperty(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {PROPERTIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timing Function</label>
          <select value={timingPreset} onChange={e => setTimingPreset(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {TIMING_PRESETS.map(t => <option key={t.value} value={t.value}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Duration: {duration}s</label>
          <input type="range" min={0} max={3} step={0.1} value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Delay: {delay}s</label>
          <input type="range" min={0} max={2} step={0.1} value={delay} onChange={e => setDelay(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      {/* Custom Cubic Bezier */}
      {timingPreset === 'custom' && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
          <label className="text-sm font-medium text-gray-700">Custom Cubic Bezier</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'P1', value: cubicP1, set: setCubicP1 },
              { label: 'P2', value: cubicP2, set: setCubicP2 },
              { label: 'P3', value: cubicP3, set: setCubicP3 },
              { label: 'P4', value: cubicP4, set: setCubicP4 },
            ].map(p => (
              <div key={p.label}>
                <label className="block text-xs text-gray-500 mb-1">{p.label}: {p.value}</label>
                <input type="range" min={0} max={1} step={0.05} value={p.value} onChange={e => p.set(Number(e.target.value))} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Easing Curve Visualization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Easing Curve</label>
        <div className="w-full h-32 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden">
          <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="200" y2="0" stroke="#e5e7eb" strokeWidth="1" />
            {(() => {
              const [p1x, p1y, p2x, p2y] = timingPreset === 'custom'
                ? [cubicP1, cubicP2, cubicP3, cubicP4]
                : timingPreset === 'linear' ? [0, 0, 1, 1]
                : timingPreset === 'ease' ? [0.25, 0.1, 0.25, 1]
                : timingPreset === 'ease-in' ? [0.42, 0, 1, 1]
                : timingPreset === 'ease-out' ? [0, 0, 0.58, 1]
                : [0.42, 0, 0.58, 1]; // ease-in-out
              return (
                <path
                  d={`M 0,100 C ${p1x * 200},${100 - p1y * 100} ${p2x * 200},${100 - p2y * 100} 200,0`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                />
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Preview */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Preview</label>
          <button onClick={playTransition} className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            {isActive ? 'Reset' : 'Play Transition'}
          </button>
        </div>
        <div className="w-full h-32 flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 overflow-hidden">
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{
              transition: cssCode.replace('transition: ', '').replace(';', ''),
              backgroundColor: isActive ? '#8b5cf6' : '#3b82f6',
              transform: isActive ? 'translateX(300px) scale(1.2)' : 'translateX(0) scale(1)',
              opacity: isActive ? 0.7 : 1,
              borderRadius: isActive ? '50%' : '8px',
            }}
          >
            Box
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
        <pre className="w-full px-4 py-3 bg-gray-900 text-green-400 rounded-lg font-mono text-sm overflow-x-auto">{cssCode}</pre>
      </div>
    </div>
  );
}
