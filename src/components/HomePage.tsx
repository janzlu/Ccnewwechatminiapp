import { Search, ShoppingCart, Package, Square, Circle, CircleDot, Shapes, RectangleHorizontal, Waypoints, Disc, MoreHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import heroBackground from 'figma:asset/b82b2255591ef730519442050caab0cc10ea8edb.png';

// 模拟行情数据 - 更大范围的数据
const marketData = {
  '镨钕金属': [
    { date: '12/09', price: 200 },
    { date: '12/10', price: 400 },
    { date: '12/11', price: 600 },
    { date: '12/12', price: 180 },
    { date: '12/13', price: 520 },
    { date: '12/14', price: 280 },
    { date: '12/15', price: 673 },
  ],
  '镨钕氧化物': [
    { date: '12/09', price: 180 },
    { date: '12/10', price: 350 },
    { date: '12/11', price: 550 },
    { date: '12/12', price: 160 },
    { date: '12/13', price: 480 },
    { date: '12/14', price: 250 },
    { date: '12/15', price: 620 },
  ],
  '金属镝': [
    { date: '12/09', price: 250 },
    { date: '12/10', price: 420 },
    { date: '12/11', price: 630 },
    { date: '12/12', price: 200 },
    { date: '12/13', price: 550 },
    { date: '12/14', price: 300 },
    { date: '12/15', price: 700 },
  ],
  '镝铁合金': [
    { date: '12/09', price: 220 },
    { date: '12/10', price: 380 },
    { date: '12/11', price: 580 },
    { date: '12/12', price: 190 },
    { date: '12/13', price: 500 },
    { date: '12/14', price: 270 },
    { date: '12/15', price: 650 },
  ],
};

const categories = [
  { id: 1, name: '方片', Icon: Square, category: 'square' },
  { id: 2, name: '圆片', Icon: Circle, category: 'disc' },
  { id: 3, name: '圆环', Icon: CircleDot, category: 'ring' },
  { id: 4, name: '同心瓦', Icon: Shapes, category: 'concentric' },
  { id: 5, name: '直边瓦', Icon: RectangleHorizontal, category: 'straight' },
  { id: 6, name: '同R瓦', Icon: Waypoints, category: 'sameR' },
  { id: 7, name: '方磨圆', Icon: Disc, category: 'squareRound' },
  { id: 8, name: '更多', Icon: MoreHorizontal, category: 'more' },
];

interface HomePageProps {
  onNavigateToCalculator?: (category: string) => void;
  onNavigateToMall?: () => void;
  onNavigateToSell?: () => void;
  onNavigateToMarket?: () => void;
}

export default function HomePage({ onNavigateToCalculator, onNavigateToMall, onNavigateToSell, onNavigateToMarket }: HomePageProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<keyof typeof marketData>('镨钕金属');

  const currentData = marketData[selectedMaterial];
  const currentPrice = (currentData[currentData.length - 1].price / 10).toFixed(1); // 转换为万元单位
  const previousPrice = currentData[currentData.length - 2].price / 10;
  const priceChange = parseFloat(currentPrice) - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  
  // 涨跌幅度（示例数据）
  const weekChange = 21; // 涨跌值
  const weekChangePercent = -30; // 涨跌幅

  return (
    <div className="min-h-full bg-[#F5F6F8] pb-6">
      {/* 搜索框 */}
      <div className="bg-white px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4A9AE]" size={20} />
          <input
            type="text"
            placeholder="请输入产品名称/牌号"
            className="w-full h-11 pl-11 pr-4 bg-[#F5F6F8] rounded-lg text-[#23303B] placeholder:text-[#BFBFBF] text-sm"
          />
        </div>
      </div>

      {/* Hero 区域 */}
      <div className="mx-3 mt-3 rounded-2xl p-6 text-white shadow-sm overflow-hidden relative" style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="relative z-10">
          <h2 className="text-[26px] mb-2 font-normal text-left">磁材采购"神器"</h2>
          <p className="text-[15px] opacity-90 mb-5">快速估算、精准参考</p>
          <div className="flex gap-3">
            <button 
              onClick={onNavigateToMall}
              className="flex-1 bg-white text-[#2B6CFF] h-12 rounded-lg transition-all hover:bg-opacity-95 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              我要买
            </button>
            <button 
              onClick={onNavigateToSell}
              className="flex-1 border-2 border-white text-white h-12 rounded-lg transition-all hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <Package size={20} />
              我要卖
            </button>
          </div>
        </div>
      </div>

      {/* 磁材料行情趋势图 */}
      <div className="mx-3 mt-3 bg-white rounded-2xl p-4 shadow-sm">
        {/* 材料切换 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {(Object.keys(marketData) as Array<keyof typeof marketData>).map((material) => (
            <button
              key={material}
              onClick={() => setSelectedMaterial(material)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
                selectedMaterial === material
                  ? 'bg-[#E8F0FF] text-[#2B6CFF]'
                  : 'bg-[#F5F6F8] text-[#8E949A]'
              }`}
            >
              {material}
            </button>
          ))}
        </div>

        {/* 当前价格 */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-[36px] text-[#23303B] leading-none">{currentPrice}</span>
            <div className="flex items-center gap-3">
              <span className={`text-lg ${parseFloat(priceChangePercent) >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                {parseFloat(priceChangePercent) >= 0 ? '+' : ''}
                {priceChangePercent}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-[#8E949A]">万元/吨</span>
            <span className="text-[#8E949A]">
              涨跌值: <span className="text-[#23303B]">+{weekChange}</span>
            </span>
            <span className="text-[#8E949A]">
              涨跌幅: <span className="text-[#13C999]">{weekChangePercent}%</span>
            </span>
          </div>
        </div>

        {/* 趋势图 */}
        <ResponsiveContainer width="100%" height={187}>
          <LineChart data={currentData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#A4A9AE" 
              style={{ fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="#A4A9AE" 
              style={{ fontSize: '12px' }}
              axisLine={false}
              tickLine={false}
              domain={[0, 800]}
              ticks={[0, 200, 400, 600, 800]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2B6CFF"
              strokeWidth={3}
              dot={{ fill: '#2B6CFF', r: 6, strokeWidth: 0 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 市场报价 */}
      <div className="mx-3 mt-3">
        <div className="flex items-center justify-between mb-[8px] px-1 mt-[20px] mr-[0px] ml-[0px]">
          <h3 className="text-[#23303B] text-sm font-medium text-[20px]">市场报价</h3>
          <span className="text-xs text-[#A4A9AE]">更新: 11-29 14:30</span>
        </div>
        
        <div className="space-y-2">
          {[
            { name: '钕铁硼', price: 498, unit: '元/kg', day: -4, dayPct: -0.80, week: 8, weekPct: 1.63 },
            { name: '镨钕氧化物', price: 430, unit: '元/kg', day: -2, dayPct: -0.46, week: 5, weekPct: 1.18 },
            { name: '金属镝', price: 2910, unit: '元/kg', day: -10, dayPct: -0.34, week: 30, weekPct: 1.04 },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-[#23303B] text-sm font-medium">{item.name}</h4>
                <div className="text-right flex items-baseline gap-1">
                  <div className="text-base text-[#23303B] font-semibold">¥{item.price}</div>
                  <div className="text-[10px] text-[#A4A9AE]">{item.unit}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[rgba(164,169,174,0.05)] rounded-md p-1.5 flex items-center justify-between">
                  <div className="text-[10px] text-[#A4A9AE]">日涨跌</div>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${item.day >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                    {item.day >= 0 ? (
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    ) : (
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                    )}
                    <span>{item.dayPct > 0 ? '+' : ''}{item.dayPct.toFixed(2)}%</span>
                  </div>
                </div>
                <div className="bg-[rgba(164,169,174,0.05)] rounded-md p-1.5 flex items-center justify-between">
                  <div className="text-[10px] text-[#A4A9AE]">周涨跌</div>
                   <div className={`flex items-center gap-0.5 text-xs font-medium ${item.week >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                    {item.week >= 0 ? (
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    ) : (
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                    )}
                    <span>{item.weekPct > 0 ? '+' : ''}{item.weekPct.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button onClick={onNavigateToMarket} className="w-full h-8 flex items-center justify-center text-[#A4A9AE] text-xs transition-colors hover:text-[#23303B]">
            查看更多行情 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

      {/* 磁材8个分类 */}
      <div className="mx-3 mt-3">
        <h3 className="text-[#23303B] mb-[12px] text-[20px] font-normal mt-[0px] mr-[0px] ml-[10px]">磁材分类</h3>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category) => {
            const IconComponent = category.Icon;
            return (
              <button
                key={category.id}
                className="bg-white rounded-[9px] flex flex-col items-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-95 p-[10px]"
                onClick={() => onNavigateToCalculator && onNavigateToCalculator(category.category)}
              >
                <div className="w-14 h-14 bg-[rgb(243,246,255)] rounded-full flex items-center justify-center">
                  <IconComponent className="text-[#2B6CFF]" size={28} strokeWidth={2} />
                </div>
                <span className="text-sm text-[#23303B]">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
