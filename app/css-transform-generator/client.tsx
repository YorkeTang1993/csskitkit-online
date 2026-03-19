'use client';

import { useState, useMemo } from 'react';

export default function ToolClient() {
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [perspective, setPerspective] = useState(0);
  const [copied, setCopied] = useState(false);

  const transformValue = useMemo(() => {
    const parts: string[] = [];
    if (perspective > 0) parts.push(`perspective(${perspective}px)`);
    if (rotate !== 0) parts.push(`rotate(${rotate}deg)`);
    if (scaleX !== 1 || scaleY !== 1) parts.push(`scale(${scaleX}, ${scaleY})`);
    if (skewX !== 0 || skewY !== 0) parts.push(`skew(${skewX}deg, ${skewY}deg)`);
    if (translateX !== 0 || translateY !== 0) parts.push(`translate(${translateX}px, ${translateY}px)`);
    return parts.length > 0 ? parts.join(' ') : 'none';
  }, [rotate, scaleX, scaleY, skewX, skewY, translateX, translateY, perspective]);

  const cssCode = `transform: ${transformValue};`;

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const reset = () => {
    setRotate(0); setScaleX(1); setScaleY(1);
    setSkewX(0); setSkewY(0); setTranslateX(0); setTranslateY(0);
    setPerspective(0);
  };

  const sliders = [
    { label: 'Rotate', value: rotate, set: setRotate, min: 0, max: 360, unit: 'deg' },
    { label: 'Scale X', value: scaleX, set: setScaleX, min: 0, max: 3, step: 0.1, unit: '' },
    { label: 'Scale Y', value: scaleY, set: setScaleY, min: 0, max: 3, step: 0.1, unit: '' },
    { label: 'Skew X', value: skewX, set: setSkewX, min: -90, max: 90, unit: 'deg' },
    { label: 'Skew Y', value: skewY, set: setSkewY, min: -90, max: 90, unit: 'deg' },
    { label: 'Translate X', value: translateX, set: setTranslateX, min: -200, max: 200, unit: 'px' },
    { label: 'Translate Y', value: translateY, set: setTranslateY, min: -200, max: 200, unit: 'px' },
    { label: 'Perspective', value: perspective, set: setPerspective, min: 0, max: 1000, unit: 'px' },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Transform Properties</label>
          <button onClick={reset} className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            Reset All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sliders.map(s => (
            <div key={s.label}>
              <label className="block text-xs text-gray-500 mb-1">
                {s.label}: {s.step ? Number(s.value).toFixed(1) : s.value}{s.unit}
              </label>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step || 1}
                value={s.value}
                onChange={e => s.set(Number(e.target.value))}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="w-full h-64 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
          <div
            className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
            style={{ transform: transformValue }}
          >
            Transform Me
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
