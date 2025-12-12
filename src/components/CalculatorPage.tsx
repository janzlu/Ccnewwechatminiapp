import { useState, useEffect } from 'react';
import { Calculator, FileText, CheckCircle, Square, Circle, CircleDot, Shapes, ChevronDown, Edit3 } from 'lucide-react';

interface CalculatorPageProps {
  onStartCalculate?: () => void;
  initialCategory?: string;
}

const steps = [
  { id: 1, name: '价格计算', Icon: Calculator },
  { id: 2, name: '订单详情', Icon: FileText },
  { id: 3, name: '订单确认', Icon: CheckCircle },
];

const categories = [
  { id: 'square', name: '方片', Icon: Square },
  { id: 'disc', name: '圆片', Icon: Circle },
  { id: 'ring', name: '圆环', Icon: CircleDot },
  { id: 'concentric', name: '同心瓦', Icon: Shapes },
];

const performanceLevels = ['N35', 'N38', 'N42', 'N45', 'N48', 'N52'];
const coatingTypes = ['镀锌', '镀镍', '镀金', '镀银', '环氧树脂', '无镀层'];

export default function CalculatorPage({ onStartCalculate, initialCategory }: CalculatorPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'square');
  const [performance, setPerformance] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [diameter, setDiameter] = useState('');
  const [outerDiameter, setOuterDiameter] = useState('');
  const [innerDiameter, setInnerDiameter] = useState('');
  const [thickness, setThickness] = useState('');
  const [arcAngle, setArcAngle] = useState('');
  const [magnetizationHeight, setMagnetizationHeight] = useState('');
  const [coating, setCoating] = useState('');
  const [inputMode, setInputMode] = useState<'auto' | 'manual'>('auto');

  // 当initialCategory变化时更新selectedCategory
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      // 清空输入
      setLength('');
      setWidth('');
      setDiameter('');
      setOuterDiameter('');
      setInnerDiameter('');
      setThickness('');
      setArcAngle('');
      setMagnetizationHeight('');
    }
  }, [initialCategory]);

  return (
    <div className="min-h-full bg-[#F5F6F8] pb-24">
      {/* 步骤指示器 */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between max-w-[320px] mx-auto">
          {/* 步骤1 - 当前步骤 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#456EFE] flex items-center justify-center mb-2">
              <span className="text-white text-sm">1</span>
            </div>
            <span className="text-xs text-[#456EFE]">磁材计算</span>
          </div>

          {/* 连接线1 */}
          <div className="flex-1 h-[2px] bg-[rgba(164,169,174,0.2)] mx-3 mb-5"></div>

          {/* 步骤2 - 未完成 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[rgba(164,169,174,0.1)] flex items-center justify-center mb-2">
              <span className="text-[#A4A9AE] text-sm">2</span>
            </div>
            <span className="text-xs text-[#A4A9AE]">价格计算</span>
          </div>

          {/* 连接线2 */}
          <div className="flex-1 h-[2px] bg-[rgba(164,169,174,0.2)] mx-3 mb-5"></div>

          {/* 步骤3 - 未完成 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[rgba(164,169,174,0.1)] flex items-center justify-center mb-2">
              <span className="text-[#A4A9AE] text-sm">3</span>
            </div>
            <span className="text-xs text-[#A4A9AE]">确认下单</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 选择分类 */}
        <div>
          <h3 className="text-[#23303B] mb-3">选择分类</h3>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => {
              const IconComponent = category.Icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setLength('');
                    setWidth('');
                    setDiameter('');
                    setOuterDiameter('');
                    setInnerDiameter('');
                    setThickness('');
                    setArcAngle('');
                    setMagnetizationHeight('');
                  }}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 transition-all ${
                    selectedCategory === category.id
                      ? 'bg-[#E8F0FF] border-2 border-[#456EFE]'
                      : 'bg-white border-2 border-transparent'
                  }`}
                >
                  <IconComponent
                    size={32}
                    className={selectedCategory === category.id ? 'text-[#456EFE]' : 'text-[#23303B]'}
                  />
                  <span
                    className={`text-sm ${
                      selectedCategory === category.id ? 'text-[#456EFE]' : 'text-[#23303B]'
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 性能 */}
        <div>
          <h3 className="text-[#23303B] mb-3">性能</h3>
          <div className="relative">
            <select
              value={performance}
              onChange={(e) => setPerformance(e.target.value)}
              className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] appearance-none pr-12 shadow-sm"
              style={{ color: performance ? '#23303B' : '#A4A9AE' }}
            >
              <option value="">请选择性能等级</option>
              {performanceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE] pointer-events-none" size={20} />
          </div>
        </div>

        {/* 原料单价 */}
        <div>
          <h3 className="text-[#23303B] mb-3">原料单价</h3>
          <div className="relative">
            <input
              type="number"
              placeholder="可参考原料单价表"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              disabled={inputMode === 'auto'}
              className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">元</span>
          </div>
        </div>

        {/* 动态尺寸参数 - 方片 */}
        {selectedCategory === 'square' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-[#23303B] mb-3">长度</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
              <div>
                <h3 className="text-[#23303B] mb-3">宽度</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[#23303B] mb-3">厚度</h3>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
              </div>
            </div>
          </>
        )}

        {/* 动态尺寸参数 - 圆片 */}
        {selectedCategory === 'disc' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-[#23303B] mb-3">直径</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
              <div>
                <h3 className="text-[#23303B] mb-3">厚度</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 动态尺寸参数 - 圆环 */}
        {selectedCategory === 'ring' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-[#23303B] mb-3">外径</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={outerDiameter}
                    onChange={(e) => setOuterDiameter(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
              <div>
                <h3 className="text-[#23303B] mb-3">内径</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={innerDiameter}
                    onChange={(e) => setInnerDiameter(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-[#23303B] mb-3">厚度</h3>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={thickness}
                  onChange={(e) => setThickness(e.target.value)}
                  className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
              </div>
            </div>
          </>
        )}

        {/* 动态尺寸参数 - 同心瓦 */}
        {selectedCategory === 'concentric' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-[#23303B] mb-3">外径</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={outerDiameter}
                    onChange={(e) => setOuterDiameter(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
              <div>
                <h3 className="text-[#23303B] mb-3">内径</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={innerDiameter}
                    onChange={(e) => setInnerDiameter(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-[#23303B] mb-3">厚度</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
                </div>
              </div>
              <div>
                <h3 className="text-[#23303B] mb-3">弧度</h3>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={arcAngle}
                    onChange={(e) => setArcAngle(e.target.value)}
                    className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">°</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 磁化高度 - 所有类型共用 */}
        <div>
          <h3 className="text-[#23303B] mb-3">磁化高度</h3>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={magnetizationHeight}
              onChange={(e) => setMagnetizationHeight(e.target.value)}
              className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] placeholder:text-[#A4A9AE] pr-12 shadow-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]">mm</span>
          </div>
        </div>

        {/* 表面镀层 */}
        <div>
          <h3 className="text-[#23303B] mb-3">表面镀层</h3>
          <div className="relative">
            <select
              value={coating}
              onChange={(e) => setCoating(e.target.value)}
              className="w-full h-14 px-4 bg-white rounded-2xl text-[#23303B] appearance-none pr-12 shadow-sm"
              style={{ color: coating ? '#23303B' : '#A4A9AE' }}
            >
              <option value="">请选择镀层类型</option>
              {coatingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A4A9AE] pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      {/* 固定底部计算按钮 */}
      <div className="fixed bottom-20 left-0 right-0 bg-white px-4 py-3 shadow-lg">
        <button
          className="w-full h-12 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] active:scale-98 flex items-center justify-center gap-2"
          onClick={onStartCalculate}
        >
          <Calculator size={20} />
          开始计算
        </button>
      </div>

      {/* 固定悬浮的自动/手动切换按钮 */}
      <button
        onClick={() => setInputMode(inputMode === 'auto' ? 'manual' : 'auto')}
        className="fixed bottom-36 right-4 flex flex-col items-center gap-1 transition-all hover:opacity-80 active:scale-95 z-30"
        title={inputMode === 'auto' ? '切换到手动模式' : '切换到自动模式'}
      >
        <div className="w-14 h-14 bg-[#456EFE] text-white rounded-full shadow-lg flex items-center justify-center">
          <Edit3 size={24} />
        </div>
        <span className="text-xs text-[#456EFE] bg-white px-2 py-0.5 rounded shadow-sm">
          {inputMode === 'auto' ? '自动' : '手动'}
        </span>
      </button>
    </div>
  );
}