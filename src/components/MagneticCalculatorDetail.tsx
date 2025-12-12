import { ChevronLeft, ChevronDown, ChevronRight, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface MagneticCalculatorDetailProps {
  onBack?: () => void;
  onConfirmOrder?: () => void;
}

export default function MagneticCalculatorDetail({ onBack, onConfirmOrder }: MagneticCalculatorDetailProps) {
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    basicData: true,
    processingFee: false,
    scrapData: false,
  });

  // 基本数据状态
  const [basicData, setBasicData] = useState({
    profitRate: 10,
    qualifiedRate: 97,
    density: 7.6,
  });

  // 尺寸数据状态
  const [dimensionData, setDimensionData] = useState({
    blankSpec: { length: 121.8, width: 81.8, height: 31.8 },
    actualMaterial: { length: 121.8, width: 81.8, height: 31.8 },
    cutCount: { length: 1, width: 1, height: 1 },
    slicingSkin: { length: 0, width: 0, height: 1.5 },
    slicingWire: { length: 1.8, width: 1.8, height: 0.3 },
  });

  // 加工费数据状态
  const [processingData, setProcessingData] = useState({
    grooveBr: '',
    centerLength: '',
    platingCoef: 0.000352,
    platingArea: 31200,
    slicingCoef: 0.00015,
    slicingArea: 15600,
    chamferFee: 0.33,
    grindingCost: 361.188,
    packagingFee: 7.224,
    platingFee: 10.983,
    shippingFee: 2.189,
    slicingFee: 2.340,
  });

  // 数据表格状态（可编辑）
  const [tableData, setTableData] = useState([
    { label: '计算时长', values: [12, 15, 18, 20, 25, 30] },
    { label: '元件数量', values: [100, 120, 150, 180, 200, 250] },
    { label: '边框数', values: [4, 5, 6, 7, 8, 10] },
    { label: '材料损耗', values: [2.5, 3.0, 3.5, 4.0, 4.5, 5.0] },
  ]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleQuantityChange = (delta: number) => {
    setOrderQuantity(prev => Math.max(1, prev + delta));
  };

  const handleTableValueChange = (rowIndex: number, colIndex: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setTableData(prev => {
      const newData = [...prev];
      newData[rowIndex].values[colIndex] = numValue;
      return newData;
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col pb-32">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-[rgba(164,169,174,0.15)]">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] pr-8">价格计算</h1>
      </div>

      {/* 步骤指示器 */}
      <div className="bg-white px-4 py-5 mb-3">
        <div className="flex items-center justify-between max-w-[320px] mx-auto">
          {/* 步骤1 - 已完成 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#456EFE] flex items-center justify-center mb-2">
              <CheckCircle2 size={16} className="text-white" />
            </div>
            <span className="text-xs text-[#456EFE]">磁材计算</span>
          </div>

          {/* 连接线1 */}
          <div className="flex-1 h-[2px] bg-[#456EFE] mx-3 mb-5"></div>

          {/* 步骤2 - 当前步骤 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-[#456EFE] flex items-center justify-center mb-2">
              <span className="text-white text-sm">2</span>
            </div>
            <span className="text-xs text-[#456EFE]">价格计算</span>
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

      {/* 滚动内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {/* 订单数量输入区 */}
        <div className="bg-white px-4 py-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#23303B]">订单数量</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 rounded-full bg-[rgba(164,169,174,0.15)] flex items-center justify-center text-[#8E949A]"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-8 text-center border border-[rgba(164,169,174,0.3)] rounded-lg text-[#23303B]"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 rounded-full bg-[rgba(164,169,174,0.15)] flex items-center justify-center text-[#8E949A]"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <p className="text-xs text-[#FF6B6B]">* 默认订量为1件，请根据实际需求填写，得出最终报价</p>
        </div>

        {/* 基本数据区域 - 默认展开 */}
        <div className="bg-white mb-3">
          <button
            onClick={() => toggleSection('basicData')}
            className="w-full px-4 py-3 flex items-center justify-between border-b border-[rgba(164,169,174,0.15)]"
          >
            <div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-[#456EFE] rounded-full"></div>
                <span className="text-[#23303B]">基本数据</span>
              </div>
              <p className="text-xs text-[#8E949A] mt-1">以下是订单所需的原料数据和单块磁铁的基本数据</p>
            </div>
            {expandedSections.basicData ? <ChevronDown size={20} className="text-[#8E949A]" /> : <ChevronRight size={20} className="text-[#8E949A]" />}
          </button>
          {expandedSections.basicData && (
            <div className="px-4 py-4 space-y-3">
              {/* 毛利润率 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#8E949A] w-20">毛利润率</span>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="number"
                    value={basicData.profitRate}
                    onChange={(e) => setBasicData(prev => ({ ...prev, profitRate: parseInt(e.target.value) || 0 }))}
                    className="flex-1 h-10 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] text-center border border-[rgba(164,169,174,0.2)]"
                  />
                  <span className="text-[#8E949A]">%</span>
                </div>
              </div>

              {/* 合格数率 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#8E949A] w-20">合格数率</span>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="number"
                    value={basicData.qualifiedRate}
                    onChange={(e) => setBasicData(prev => ({ ...prev, qualifiedRate: parseInt(e.target.value) || 0 }))}
                    className="flex-1 h-10 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] text-center border border-[rgba(164,169,174,0.2)]"
                  />
                  <span className="text-[#8E949A]">%</span>
                </div>
              </div>

              {/* 密度 */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#8E949A] w-20">密度</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={basicData.density}
                    onChange={(e) => setBasicData(prev => ({ ...prev, density: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-10 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] text-center border border-[rgba(164,169,174,0.2)]"
                  />
                </div>
              </div>

              {/* 四个数据卡片 */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                  <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">合税总估值</div>
                  <div className="text-xl text-[#456EFE]">43575.2</div>
                </div>
                <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                  <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">合税利润</div>
                  <div className="text-xl text-[#456EFE]">3961.3</div>
                </div>
                <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                  <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">数量(块)</div>
                  <div className="text-xl text-[#456EFE]">104</div>
                </div>
                <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                  <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">重量(公斤)</div>
                  <div className="text-xl text-[#456EFE]">250.43</div>
                </div>
              </div>

              {/* 尺寸数据表格 */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[rgba(164,169,174,0.15)]">
                      <th className="text-left py-2 text-[#8E949A]"></th>
                      <th className="text-center py-2 text-[#8E949A]">长(mm)</th>
                      <th className="text-center py-2 text-[#8E949A]">宽(mm)</th>
                      <th className="text-center py-2 text-[#8E949A]">高(mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[rgba(164,169,174,0.08)]">
                      <td className="py-2 text-[#8E949A]">坯料规格</td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.blankSpec.length}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, blankSpec: { ...prev.blankSpec, length: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.blankSpec.width}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, blankSpec: { ...prev.blankSpec, width: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.blankSpec.height}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, blankSpec: { ...prev.blankSpec, height: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[rgba(164,169,174,0.08)]">
                      <td className="py-2 text-[#8E949A]">实际用料</td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.actualMaterial.length}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, actualMaterial: { ...prev.actualMaterial, length: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.actualMaterial.width}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, actualMaterial: { ...prev.actualMaterial, width: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.actualMaterial.height}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, actualMaterial: { ...prev.actualMaterial, height: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[rgba(164,169,174,0.08)]">
                      <td className="py-2 text-[#8E949A]">出刀数</td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.cutCount.length}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, cutCount: { ...prev.cutCount, length: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.cutCount.width}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, cutCount: { ...prev.cutCount, width: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.cutCount.height}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, cutCount: { ...prev.cutCount, height: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-[rgba(164,169,174,0.08)]">
                      <td className="py-2 text-[#8E949A]">切片料皮</td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.slicingSkin.length}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, slicingSkin: { ...prev.slicingSkin, length: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.slicingSkin.width}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, slicingSkin: { ...prev.slicingSkin, width: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.slicingSkin.height}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, slicingSkin: { ...prev.slicingSkin, height: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#8E949A]">切片刀丝</td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.slicingWire.length}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, slicingWire: { ...prev.slicingWire, length: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.slicingWire.width}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, slicingWire: { ...prev.slicingWire, width: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          value={dimensionData.slicingWire.height}
                          onChange={(e) => setDimensionData(prev => ({ ...prev, slicingWire: { ...prev.slicingWire, height: parseFloat(e.target.value) || 0 } }))}
                          className="w-16 text-center bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded px-1 py-0.5 text-[#23303B]"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 统计数据卡片 */}
              <div className="mt-4 space-y-3">
                {/* 出片数 - 单独一行 */}
                <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3 flex flex-col items-center">
                  <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2 text-left">出片数</div>
                  <div className="text-xl text-[#456EFE] text-center">1</div>
                </div>

                {/* 原料重量 + 成品重量 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                    <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">原料重量</div>
                    <div className="text-xl text-[#456EFE]">2407.92</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                    <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">成品重量</div>
                    <div className="text-xl text-[#456EFE]">2188.8</div>
                  </div>
                </div>

                {/* 原料利用率 + 原料损耗率 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                    <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">原料利用率</div>
                    <div className="text-xl text-[#456EFE]">90.9%</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                    <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">原料损耗率</div>
                    <div className="text-xl text-[#456EFE]">9.1%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 成品加工费基本详情 - 默认折叠 */}
        <div className="bg-white mb-3">
          <button
            onClick={() => toggleSection('processingFee')}
            className="w-full px-4 py-3 flex items-center justify-between border-b border-[rgba(164,169,174,0.15)]"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#456EFE] rounded-full"></div>
              <span className="text-[#23303B]">成品加工费基本详情</span>
            </div>
            {expandedSections.processingFee ? <ChevronDown size={20} className="text-[#8E949A]" /> : <ChevronRight size={20} className="text-[#8E949A]" />}
          </button>
          {expandedSections.processingFee && (
            <div className="px-4 py-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {/* 左列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">剩磁Br</label>
                  <input
                    type="text"
                    value={processingData.grooveBr}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, grooveBr: e.target.value }))}
                    placeholder=""
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>
                
                {/* 右列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">中心表磁≈</label>
                  <input
                    type="text"
                    value={processingData.centerLength}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, centerLength: e.target.value }))}
                    placeholder=""
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 左列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">电波系数</label>
                  <input
                    type="number"
                    value={processingData.platingCoef}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, platingCoef: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 右列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">电镀面积</label>
                  <input
                    type="number"
                    value={processingData.platingArea}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, platingArea: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 左列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">切片系数</label>
                  <input
                    type="number"
                    value={processingData.slicingCoef}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, slicingCoef: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 右列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">切片面积</label>
                  <input
                    type="number"
                    value={processingData.slicingArea}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, slicingArea: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 左列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">倒角费</label>
                  <input
                    type="number"
                    value={processingData.chamferFee}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, chamferFee: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 右列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">磨料成本</label>
                  <input
                    type="number"
                    value={processingData.grindingCost}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, grindingCost: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 左列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">包装费</label>
                  <input
                    type="number"
                    value={processingData.packagingFee}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, packagingFee: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 右列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">电镀费</label>
                  <input
                    type="number"
                    value={processingData.platingFee}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, platingFee: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 左列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">运输费</label>
                  <input
                    type="number"
                    value={processingData.shippingFee}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, shippingFee: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 右列 */}
                <div>
                  <label className="text-xs text-[#8E949A] mb-1 block">切片费</label>
                  <input
                    type="number"
                    value={processingData.slicingFee}
                    onChange={(e) => setProcessingData(prev => ({ ...prev, slicingFee: parseFloat(e.target.value) || 0 }))}
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#456EFE] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 废料基本详情 - 默认折叠 */}
        <div className="bg-white mb-3">
          <button
            onClick={() => toggleSection('scrapData')}
            className="w-full px-4 py-3 flex items-center justify-between border-b border-[rgba(164,169,174,0.15)]"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#456EFE] rounded-full"></div>
              <span className="text-[#23303B]">废料基本详情</span>
            </div>
            {expandedSections.scrapData ? <ChevronDown size={20} className="text-[#8E949A]" /> : <ChevronRight size={20} className="text-[#8E949A]" />}
          </button>
          {expandedSections.scrapData && (
            <div className="px-4 py-4">
              {/* 料皮和料泥数据卡片 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                  <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">料皮(公斤)</div>
                  <div className="text-xl text-[#456EFE]">9.11</div>
                </div>
                <div className="bg-gradient-to-br from-[#E8F0FF] to-[#F0F5FF] rounded-xl p-3">
                  <div className="bg-[#456EFE] text-white text-xs px-3 py-1 rounded-md inline-block mb-2">料泥(公斤)</div>
                  <div className="text-xl text-[#456EFE]">13.68</div>
                </div>
              </div>

              {/* 回收和单价输入框 */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {/* 料皮回收 */}
                <div>
                  <label className="text-sm text-[#8E949A] mb-2 block">料皮回收</label>
                  <input
                    type="number"
                    value="90"
                    readOnly
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#8E949A] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 料皮单价 */}
                <div>
                  <label className="text-sm text-[#8E949A] mb-2 block">料皮单价</label>
                  <input
                    type="number"
                    value="8.199"
                    readOnly
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#8E949A] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 料泥回收 */}
                <div>
                  <label className="text-sm text-[#8E949A] mb-2 block">料泥回收</label>
                  <input
                    type="number"
                    value="68"
                    readOnly
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#8E949A] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>

                {/* 料泥单价 */}
                <div>
                  <label className="text-sm text-[#8E949A] mb-2 block">料泥单价</label>
                  <input
                    type="number"
                    value="9.302"
                    readOnly
                    className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#8E949A] border border-[rgba(164,169,174,0.15)]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部操作区 - 固定悬浮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(164,169,174,0.15)] px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-[#8E949A]">含税总金额</span>
          <span className="text-xl text-[#456EFE]">¥ 28,650.00</span>
        </div>
        <button
          onClick={onConfirmOrder}
          className="w-full h-12 bg-gradient-to-r from-[#D946A6] to-[#9333EA] text-white rounded-lg transition-all active:opacity-90"
        >
          开始下单
        </button>
      </div>
    </div>
  );
}