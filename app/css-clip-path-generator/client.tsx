'use client';

import { useState, useCallback } from 'react';

type ShapeType = 'circle' | 'ellipse' | 'inset' | 'polygon';

interface PolygonPreset {
  name: string;
  points: string;
}

const PRESETS: PolygonPreset[] = [
  { name: 'Triangle', points: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  { name: 'Pentagon', points: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
  { name: 'Hexagon', points: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  { name: 'Star', points: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
  { name: 'Arrow Right', points: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' },
  { name: 'Chevron', points: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%)' },
  { name: 'Diamond', points: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { name: 'Cross', points: 'polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)' },
];

export default function ToolClient() {
  const [shapeType, setShapeType] = useState<ShapeType>('polygon');
  const [circleRadius, setCircleRadius] = useState(50);
  const [ellipseX, setEllipseX] = useState(50);
  const [ellipseY, setEllipseY] = useState(30);
  const [insetValues, setInsetValues] = useState({ top: 10, right: 10, bottom: 10, left: 10, round: 0 });
  const [polygonValue, setPolygonValue] = useState(PRESETS[0].points);
  const [copied, setCopied] = useState(false);

  const getClipPath = (): string => {
    switch (shapeType) {
      case 'circle': return `circle(${circleRadius}% at 50% 50%)`;
      case 'ellipse': return `ellipse(${ellipseX}% ${ellipseY}% at 50% 50%)`;
      case 'inset': return `inset(${insetValues.top}% ${insetValues.right}% ${insetValues.bottom}% ${insetValues.left}%${insetValues.round > 0 ? ` round ${insetValues.round}px` : ''})`;
      case 'polygon': return polygonValue;
    }
  };

  const clipPath = getClipPath();
  const cssCode = `clip-path: ${clipPath};`;

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  return (
    <div className="space-y-6">
      {/* Shape type */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shape Type</label>
          <select value={shapeType} onChange={e => setShapeType(e.target.value as ShapeType)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            <option value="circle">Circle</option>
            <option value="ellipse">Ellipse</option>
            <option value="inset">Inset</option>
            <option value="polygon">Polygon</option>
          </select>
        </div>
      </div>

      {/* Shape controls */}
      {shapeType === 'circle' && (
        <div>
          <label className="block text-sm text-gray-700 mb-1">Radius: {circleRadius}%</label>
          <input type="range" min={5} max={50} value={circleRadius} onChange={e => setCircleRadius(Number(e.target.value))} className="w-full max-w-xs" />
        </div>
      )}
      {shapeType === 'ellipse' && (
        <div className="flex gap-6">
          <div>
            <label className="block text-sm text-gray-700 mb-1">X Radius: {ellipseX}%</label>
            <input type="range" min={5} max={50} value={ellipseX} onChange={e => setEllipseX(Number(e.target.value))} className="w-48" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Y Radius: {ellipseY}%</label>
            <input type="range" min={5} max={50} value={ellipseY} onChange={e => setEllipseY(Number(e.target.value))} className="w-48" />
          </div>
        </div>
      )}
      {shapeType === 'inset' && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {(['top', 'right', 'bottom', 'left'] as const).map(side => (
            <div key={side}>
              <label className="block text-sm text-gray-700 mb-1 capitalize">{side}: {insetValues[side]}%</label>
              <input type="range" min={0} max={45} value={insetValues[side]} onChange={e => setInsetValues(prev => ({ ...prev, [side]: Number(e.target.value) }))} className="w-full" />
            </div>
          ))}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Round: {insetValues.round}px</label>
            <input type="range" min={0} max={50} value={insetValues.round} onChange={e => setInsetValues(prev => ({ ...prev, round: Number(e.target.value) }))} className="w-full" />
          </div>
        </div>
      )}
      {shapeType === 'polygon' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Presets</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(p => (
              <button key={p.name} onClick={() => setPolygonValue(p.points)} className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${polygonValue === p.points ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="flex items-center justify-center p-8 bg-gray-100 rounded-xl">
          <div className="w-64 h-64 rounded" style={{ clipPath: clipPath, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
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
