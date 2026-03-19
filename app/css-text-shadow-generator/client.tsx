'use client';

import { useState } from 'react';

interface ShadowLayer {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
}

const defaultLayer = (): ShadowLayer => ({ offsetX: 2, offsetY: 2, blur: 4, color: '#000000' });

export default function ToolClient() {
  const [text, setText] = useState('Text Shadow');
  const [layers, setLayers] = useState<ShadowLayer[]>([defaultLayer()]);
  const [copied, setCopied] = useState(false);

  const updateLayer = (i: number, field: keyof ShadowLayer, value: number | string) => {
    setLayers(prev => prev.map((l, idx) => (idx === i ? { ...l, [field]: value } : l)));
  };

  const addLayer = () => setLayers(prev => [...prev, defaultLayer()]);

  const removeLayer = (i: number) => {
    if (layers.length <= 1) return;
    setLayers(prev => prev.filter((_, idx) => idx !== i));
  };

  const shadowValue = layers
    .map(l => `${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.color}`)
    .join(', ');

  const cssCode = `text-shadow: ${shadowValue};`;

  const copy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Preview Text Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preview Text</label>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Enter preview text"
        />
      </div>

      {/* Shadow Layers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Shadow Layers</label>
          <button onClick={addLayer} className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            + Add Shadow
          </button>
        </div>
        {layers.map((layer, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Layer {i + 1}</span>
              {layers.length > 1 && (
                <button onClick={() => removeLayer(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Offset X ({layer.offsetX}px)</label>
                <input type="range" min={-50} max={50} value={layer.offsetX} onChange={e => updateLayer(i, 'offsetX', Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Offset Y ({layer.offsetY}px)</label>
                <input type="range" min={-50} max={50} value={layer.offsetY} onChange={e => updateLayer(i, 'offsetY', Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Blur ({layer.blur}px)</label>
                <input type="range" min={0} max={50} value={layer.blur} onChange={e => updateLayer(i, 'blur', Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={layer.color} onChange={e => updateLayer(i, 'color', e.target.value)} className="w-8 h-8 rounded cursor-pointer border-0" />
                  <input type="text" value={layer.color} onChange={e => updateLayer(i, 'color', e.target.value)} className="w-20 px-2 py-1 border border-gray-300 rounded text-xs font-mono" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="w-full min-h-32 flex items-center justify-center rounded-xl border border-gray-200 bg-white p-6">
          <span className="text-5xl font-bold text-gray-800" style={{ textShadow: shadowValue }}>
            {text || 'Text Shadow'}
          </span>
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
