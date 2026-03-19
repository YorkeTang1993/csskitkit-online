'use client';

import { useState, useCallback } from 'react';

interface FilterValues {
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  invert: number;
  opacity: number;
  saturate: number;
  sepia: number;
}

const defaults: FilterValues = {
  blur: 0,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  hueRotate: 0,
  invert: 0,
  opacity: 100,
  saturate: 100,
  sepia: 0,
};

const sliderConfigs: { key: keyof FilterValues; label: string; min: number; max: number; unit: string; defaultVal: number }[] = [
  { key: 'blur', label: 'Blur', min: 0, max: 20, unit: 'px', defaultVal: 0 },
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, unit: '%', defaultVal: 100 },
  { key: 'contrast', label: 'Contrast', min: 0, max: 200, unit: '%', defaultVal: 100 },
  { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, unit: '%', defaultVal: 0 },
  { key: 'hueRotate', label: 'Hue Rotate', min: 0, max: 360, unit: 'deg', defaultVal: 0 },
  { key: 'invert', label: 'Invert', min: 0, max: 100, unit: '%', defaultVal: 0 },
  { key: 'opacity', label: 'Opacity', min: 0, max: 100, unit: '%', defaultVal: 100 },
  { key: 'saturate', label: 'Saturate', min: 0, max: 200, unit: '%', defaultVal: 100 },
  { key: 'sepia', label: 'Sepia', min: 0, max: 100, unit: '%', defaultVal: 0 },
];

export default function ToolClient() {
  const [filters, setFilters] = useState<FilterValues>({ ...defaults });
  const [copied, setCopied] = useState(false);

  const buildFilter = (): string => {
    const parts: string[] = [];
    if (filters.blur !== 0) parts.push(`blur(${filters.blur}px)`);
    if (filters.brightness !== 100) parts.push(`brightness(${filters.brightness}%)`);
    if (filters.contrast !== 100) parts.push(`contrast(${filters.contrast}%)`);
    if (filters.grayscale !== 0) parts.push(`grayscale(${filters.grayscale}%)`);
    if (filters.hueRotate !== 0) parts.push(`hue-rotate(${filters.hueRotate}deg)`);
    if (filters.invert !== 0) parts.push(`invert(${filters.invert}%)`);
    if (filters.opacity !== 100) parts.push(`opacity(${filters.opacity}%)`);
    if (filters.saturate !== 100) parts.push(`saturate(${filters.saturate}%)`);
    if (filters.sepia !== 0) parts.push(`sepia(${filters.sepia}%)`);
    return parts.length > 0 ? parts.join(' ') : 'none';
  };

  const filterValue = buildFilter();
  const cssCode = `filter: ${filterValue};`;

  const update = (key: keyof FilterValues, value: number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const reset = () => setFilters({ ...defaults });

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Filter Controls</h3>
        <button onClick={reset} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Reset All
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliderConfigs.map(cfg => (
          <div key={cfg.key} className="space-y-1">
            <div className="flex justify-between text-sm">
              <label className="text-gray-700">{cfg.label}</label>
              <span className="text-gray-500">{filters[cfg.key]}{cfg.unit}</span>
            </div>
            <input type="range" min={cfg.min} max={cfg.max} value={filters[cfg.key]} onChange={e => update(cfg.key, Number(e.target.value))} className="w-full" />
          </div>
        ))}
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1 text-center">Original</p>
            <div className="w-full h-48 rounded-xl" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }} />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1 text-center">Filtered</p>
            <div className="w-full h-48 rounded-xl" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', filter: filterValue }} />
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
