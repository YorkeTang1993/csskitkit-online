'use client';

import { useState, useCallback } from 'react';

type ShadowType = 'text-shadow' | 'box-shadow' | 'drop-shadow';

interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const defaultLayer: ShadowLayer = { x: 3, y: 3, blur: 6, spread: 0, color: '#000000', opacity: 40, inset: false };

function colorWithOpacity(color: string, opacity: number): string {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${(opacity / 100).toFixed(2)})`;
}

export default function ToolClient() {
  const [shadowType, setShadowType] = useState<ShadowType>('text-shadow');
  const [layers, setLayers] = useState<ShadowLayer[]>([{ ...defaultLayer }]);
  const [copied, setCopied] = useState(false);

  const buildCSS = (): string => {
    const vals = layers.map(l => {
      const c = colorWithOpacity(l.color, l.opacity);
      if (shadowType === 'text-shadow') {
        return `${l.x}px ${l.y}px ${l.blur}px ${c}`;
      }
      if (shadowType === 'box-shadow') {
        return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${c}`;
      }
      // drop-shadow
      return `drop-shadow(${l.x}px ${l.y}px ${l.blur}px ${c})`;
    });

    if (shadowType === 'drop-shadow') {
      return `filter: ${vals.join(' ')};`;
    }
    return `${shadowType}: ${vals.join(',\n    ')};`;
  };

  const cssCode = buildCSS();

  const update = (i: number, field: keyof ShadowLayer, value: number | string | boolean) => {
    setLayers(prev => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l));
  };

  const addLayer = () => setLayers(prev => [...prev, { ...defaultLayer }]);
  const removeLayer = (i: number) => {
    if (layers.length <= 1) return;
    setLayers(prev => prev.filter((_, idx) => idx !== i));
  };

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  // Build preview style
  const previewStyle = (): React.CSSProperties => {
    const vals = layers.map(l => {
      const c = colorWithOpacity(l.color, l.opacity);
      if (shadowType === 'text-shadow') return `${l.x}px ${l.y}px ${l.blur}px ${c}`;
      if (shadowType === 'box-shadow') return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${c}`;
      return `drop-shadow(${l.x}px ${l.y}px ${l.blur}px ${c})`;
    });
    if (shadowType === 'text-shadow') return { textShadow: vals.join(', ') };
    if (shadowType === 'box-shadow') return { boxShadow: vals.join(', ') };
    return { filter: vals.join(' ') };
  };

  const tabs: { value: ShadowType; label: string }[] = [
    { value: 'text-shadow', label: 'Text Shadow' },
    { value: 'box-shadow', label: 'Box Shadow' },
    { value: 'drop-shadow', label: 'Drop Shadow' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map(tab => (
          <button key={tab.value} onClick={() => { setShadowType(tab.value); setLayers([{ ...defaultLayer }]); }} className={`px-4 py-2 text-sm rounded-md transition-colors ${shadowType === tab.value ? 'bg-white shadow text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Shadow layers */}
      {layers.map((layer, i) => (
        <div key={i} className="p-4 border border-gray-200 rounded-xl bg-gray-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Layer {i + 1}</span>
            {layers.length > 1 && (
              <button onClick={() => removeLayer(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Offset X: {layer.x}px</label>
              <input type="range" min={-50} max={50} value={layer.x} onChange={e => update(i, 'x', Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Offset Y: {layer.y}px</label>
              <input type="range" min={-50} max={50} value={layer.y} onChange={e => update(i, 'y', Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Blur: {layer.blur}px</label>
              <input type="range" min={0} max={100} value={layer.blur} onChange={e => update(i, 'blur', Number(e.target.value))} className="w-full" />
            </div>
            {shadowType === 'box-shadow' && (
              <div>
                <label className="block text-xs text-gray-500 mb-1">Spread: {layer.spread}px</label>
                <input type="range" min={-50} max={50} value={layer.spread} onChange={e => update(i, 'spread', Number(e.target.value))} className="w-full" />
              </div>
            )}
            <div>
              <label className="block text-xs text-gray-500 mb-1">Color / Opacity</label>
              <div className="flex items-center gap-1">
                <input type="color" value={layer.color} onChange={e => update(i, 'color', e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
                <input type="range" min={0} max={100} value={layer.opacity} onChange={e => update(i, 'opacity', Number(e.target.value))} className="flex-1" />
                <span className="text-xs text-gray-500 w-8">{layer.opacity}%</span>
              </div>
            </div>
          </div>
          {shadowType === 'box-shadow' && (
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" checked={layer.inset} onChange={e => update(i, 'inset', e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              Inset
            </label>
          )}
        </div>
      ))}

      <button onClick={addLayer} className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
        + Add Shadow Layer
      </button>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="flex items-center justify-center p-12 bg-gray-100 rounded-xl">
          {shadowType === 'text-shadow' ? (
            <h2 className="text-5xl font-bold text-gray-800" style={previewStyle()}>Shadow Text</h2>
          ) : (
            <div className="w-48 h-48 bg-white rounded-xl" style={previewStyle()} />
          )}
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
