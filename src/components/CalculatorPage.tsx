import { useState, useEffect } from 'react';
import { ChevronDown, Edit3 } from 'lucide-react';

interface CalculatorPageProps {
  onStartCalculate?: () => void;
  initialCategory?: string;
}

// SVG图标组件
const ShapeIcon = ({ type, isSelected }: { type: string; isSelected: boolean }) => {
  const color = isSelected ? '#456EFE' : '#23303B';
  const strokeWidth = 2;

  switch (type) {
    case 'square':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="8" y="8" width="16" height="16" fill="none" stroke={color} strokeWidth={strokeWidth} rx="2" />
        </svg>
      );
    case 'disc':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="8" fill="none" stroke={color} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'ring':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="8" fill="none" stroke={color} strokeWidth={strokeWidth} />
          <circle cx="16" cy="16" r="4" fill="none" stroke={color} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'concentric':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path d="M16 6 L24 11 L24 21 L16 26 L8 21 L8 11 Z" fill="none" stroke={color} strokeWidth={strokeWidth} />
        </svg>
      );
    case 'straight':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="6" y="12" width="20" height="8" fill="none" stroke={color} strokeWidth={strokeWidth} rx="1" />
        </svg>
      );
    case 'arc':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path d="M8 20 Q16 8 24 20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
          <path d="M8 20 L24 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </svg>
      );
    case 'oblique':
      return (
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="8" y="8" width="16" height="16" fill="none" stroke={color} strokeWidth={strokeWidth} rx="4" />
        </svg>
      );
    default:
      return null;
  }
};

const categories = [
  { id: 'square', name: '方片' },
  { id: 'disc', name: '圆片' },
  { id: 'ring', name: '圆环' },
  { id: 'concentric', name: '同心瓦' },
  { id: 'straight', name: '直边瓦' },
  { id: 'arc', name: '同R瓦' },
  { id: 'oblique', name: '方磨圆' },
];

const performanceLevels = ['N35', 'N38', 'N42', 'N45', 'N48', 'N52'];
const coatingTypes = ['镀锌', '镍铜镍', '镀金', '镀银', '环氧树脂', '无镀层'];

export default function CalculatorPage({ onStartCalculate, initialCategory }: CalculatorPageProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'square');
  const [performance, setPerformance] = useState('N35');
  const [coating, setCoating] = useState('镍铜镍');
  const [length, setLength] = useState('0.00');
  const [width, setWidth] = useState('0.00');
  const [height, setHeight] = useState('0.00');
  const [unitPrice, setUnitPrice] = useState(160);
  const [inputMode, setInputMode] = useState<'auto' | 'manual'>('manual');

  // 当initialCategory变化时更新selectedCategory
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  return (
    <div className="min-h-full bg-[#F5F6F8] pb-24">
      <div className="p-4 space-y-4">
        {/* 选择分类 */}
        <div>
          <h3 className="text-[#23303B] text-sm mb-3">选择分类</h3>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}  
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-all border-2 ${
                    isSelected
                      ? 'bg-white border-[#456EFE]'
                      : 'bg-white border-transparent'
                  }`}
                >
                  <ShapeIcon type={category.id} isSelected={isSelected} />
                  <span className={`text-xs ${isSelected ? 'text-[#456EFE]' : 'text-[#23303B]'}`}>
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 性能和表面镀层 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-[#23303B] text-sm mb-2">性能</h3>
            <div className="relative">
              <select
                value={performance}
                onChange={(e) => setPerformance(e.target.value)}
                className="w-full h-11 px-3 bg-white rounded-lg text-sm text-[#23303B] appearance-none pr-8 border border-gray-200"
              >
                {performanceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A4A9AE] pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-[#23303B] text-sm mb-2">表面镀层</h3>  
            <div className="relative">
              <select
                value={coating}
                onChange={(e) => setCoating(e.target.value)}
                className="w-full h-11 px-3 bg-white rounded-lg text-sm text-[#23303B] appearance-none pr-8 border border-gray-200"  
              >
                {coatingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A4A9AE] pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* 长度、宽度、高度 */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <h3 className="text-[#23303B] text-sm mb-2">长度</h3>
            <div className="relative">
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full h-11 px-2 bg-white rounded-lg text-sm text-[#23303B] text-center border border-gray-200"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A4A9AE] text-xs">mm</span>
            </div>
          </div>
          <div>
            <h3 className="text-[#23303B] text-sm mb-2">宽度</h3>  
            <div className="relative">
              <input
                type="text"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full h-11 px-2 bg-white rounded-lg text-sm text-[#23303B] text-center border border-gray-200"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A4A9AE] text-xs">mm</span>
            </div>
          </div>
          <div>
            <h3 className="text-[#23303B] text-sm mb-2">高度</h3>
            <div className="relative">
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full h-11 px-2 bg-white rounded-lg text-sm text-[#23303B] text-center border border-gray-200"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A4A9AE] text-xs">mm</span>
            </div>
          </div>
        </div>

        {/* 材料单价 */}
        <div>
          <h3 className="text-[#23303B] text-sm mb-2">材料单价</h3>
          <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-2xl text-[#456EFE] text-[16px]">{unitPrice}</span>
              <span className="text-sm text-[#A4A9AE]">元</span>
            </div>
          </div>
        </div>
      </div>

      {/* 固定底部计算按钮 */}
      <div className="fixed bottom-20 left-0 right-0 bg-white px-4 py-3">
        <button
          className="w-full h-12 bg-[#456EFE] text-white rounded-xl transition-all hover:bg-[#3A5ED9] active:scale-98 flex items-center justify-center gap-2"
          onClick={onStartCalculate}
        >
          开始计算
        </button>
      </div>

      {/* 固定悬浮的自动/手动切换按钮 */}
      <button
        onClick={() => setInputMode(inputMode === 'auto' ? 'manual' : 'auto')}
        className="fixed bottom-36 right-4 flex flex-col items-center gap-1 transition-all hover:opacity-80 active:scale-95 z-30"
      >
        <div className="w-14 h-14 bg-[#456EFE] text-white rounded-full shadow-lg flex items-center justify-center">
          <Edit3 size={20} />
        </div>
        <span className="text-xs text-[#456EFE] bg-white px-2 py-0.5 rounded-full shadow-sm">
          {inputMode === 'manual' ? '手动' : '自动'}
        </span>
      </button>
    </div>
  );
}