'use client';

import { useState, useCallback, useId } from 'react';

interface Keyframe {
  percent: number;
  css: string;
}

const TIMING_FUNCTIONS = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'];
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
const FILL_MODES = ['none', 'forwards', 'backwards', 'both'];

export default function ToolClient() {
  const uniqueId = useId().replace(/:/g, '');
  const [animName, setAnimName] = useState('myAnimation');
  const [duration, setDuration] = useState('1s');
  const [timing, setTiming] = useState('ease');
  const [delay, setDelay] = useState('0s');
  const [iterationCount, setIterationCount] = useState('infinite');
  const [direction, setDirection] = useState('normal');
  const [fillMode, setFillMode] = useState('none');
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { percent: 0, css: 'transform: translateX(0); opacity: 1;' },
    { percent: 50, css: 'transform: translateX(100px); opacity: 0.5;' },
    { percent: 100, css: 'transform: translateX(0); opacity: 1;' },
  ]);
  const [copied, setCopied] = useState(false);

  const keyframesCSS = keyframes
    .sort((a, b) => a.percent - b.percent)
    .map(kf => `  ${kf.percent}% {\n    ${kf.css}\n  }`)
    .join('\n');

  const cssCode = `@keyframes ${animName} {\n${keyframesCSS}\n}\n\n.element {\n  animation: ${animName} ${duration} ${timing} ${delay} ${iterationCount} ${direction} ${fillMode};\n}`;

  const addKeyframe = () => {
    setKeyframes(prev => [...prev, { percent: 50, css: 'opacity: 1;' }]);
  };

  const removeKeyframe = (i: number) => {
    if (keyframes.length <= 2) return;
    setKeyframes(prev => prev.filter((_, idx) => idx !== i));
  };

  const updateKeyframe = (i: number, field: keyof Keyframe, value: string | number) => {
    setKeyframes(prev => prev.map((kf, idx) => idx === i ? { ...kf, [field]: value } : kf));
  };

  const copy = useCallback(() => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [cssCode]);

  // Build inline style for preview
  const previewStyleTag = `
    @keyframes preview_${uniqueId} {
      ${keyframes.sort((a, b) => a.percent - b.percent).map(kf => `${kf.percent}% { ${kf.css} }`).join('\n      ')}
    }
    .preview-box-${uniqueId} {
      animation: preview_${uniqueId} ${duration} ${timing} ${delay} ${iterationCount} ${direction} ${fillMode};
    }
  `;

  return (
    <div className="space-y-6">
      {/* Animation Properties */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" value={animName} onChange={e => setAnimName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
          <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {['0.3s', '0.5s', '0.8s', '1s', '1.5s', '2s', '3s', '5s'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Timing</label>
          <select value={timing} onChange={e => setTiming(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {TIMING_FUNCTIONS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delay</label>
          <select value={delay} onChange={e => setDelay(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {['0s', '0.2s', '0.5s', '1s', '2s'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Iteration Count</label>
          <select value={iterationCount} onChange={e => setIterationCount(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {['1', '2', '3', '5', 'infinite'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
          <select value={direction} onChange={e => setDirection(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {DIRECTIONS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fill Mode</label>
          <select value={fillMode} onChange={e => setFillMode(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
            {FILL_MODES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      {/* Keyframes */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Keyframes</label>
          <button onClick={addKeyframe} className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            + Add Keyframe
          </button>
        </div>
        <div className="space-y-3">
          {keyframes.map((kf, i) => (
            <div key={i} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div className="w-20 shrink-0">
                <label className="block text-xs text-gray-500 mb-1">%</label>
                <input type="number" min={0} max={100} value={kf.percent} onChange={e => updateKeyframe(i, 'percent', Number(e.target.value))} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-mono" />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">CSS Properties</label>
                <input type="text" value={kf.css} onChange={e => updateKeyframe(i, 'css', e.target.value)} className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-mono" placeholder="transform: scale(1); opacity: 1;" />
              </div>
              {keyframes.length > 2 && (
                <button onClick={() => removeKeyframe(i)} className="text-red-500 hover:text-red-700 text-sm mt-5">Remove</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
        <div className="flex items-center justify-center p-12 bg-gray-100 rounded-xl overflow-hidden">
          <style dangerouslySetInnerHTML={{ __html: previewStyleTag }} />
          <div className={`w-20 h-20 bg-blue-600 rounded-lg preview-box-${uniqueId}`} />
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
