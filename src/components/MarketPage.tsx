import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

// 模拟行情数据 - 与首页保持一致
const marketData = {
  '镨钕金属': [
    { date: 'Jul', price: 200 },
    { date: 'Aug', price: 400 },
    { date: 'Sep', price: 600 },
    { date: 'Oct', price: 180 },
    { date: 'Nov', price: 520 },
    { date: 'Dec', price: 280 },
    { date: 'Jan', price: 673 },
  ],
  '镨钕氧化物': [
    { date: 'Jul', price: 180 },
    { date: 'Aug', price: 350 },
    { date: 'Sep', price: 550 },
    { date: 'Oct', price: 160 },
    { date: 'Nov', price: 480 },
    { date: 'Dec', price: 250 },
    { date: 'Jan', price: 620 },
  ],
  '金属镝': [
    { date: 'Jul', price: 250 },
    { date: 'Aug', price: 420 },
    { date: 'Sep', price: 630 },
    { date: 'Oct', price: 200 },
    { date: 'Nov', price: 550 },
    { date: 'Dec', price: 300 },
    { date: 'Jan', price: 700 },
  ],
  '镝铁合金': [
    { date: 'Jul', price: 220 },
    { date: 'Aug', price: 380 },
    { date: 'Sep', price: 580 },
    { date: 'Oct', price: 190 },
    { date: 'Nov', price: 500 },
    { date: 'Dec', price: 270 },
    { date: 'Jan', price: 650 },
  ],
};

const priceList = [
  {
    name: '钕铁硼',
    currentPrice: 498,
    yesterday: 502,
    weekAgo: 490,
    unit: '元/kg',
  },
  {
    name: '镨钕氧化物',
    currentPrice: 430,
    yesterday: 432,
    weekAgo: 425,
    unit: '元/kg',
  },
  {
    name: '金属镝',
    currentPrice: 2910,
    yesterday: 2920,
    weekAgo: 2880,
    unit: '元/kg',
  },
  {
    name: '镝铁合金',
    currentPrice: 2700,
    yesterday: 2710,
    weekAgo: 2670,
    unit: '元/kg',
  },
  {
    name: '金属铽',
    currentPrice: 12500,
    yesterday: 12450,
    weekAgo: 12300,
    unit: '元/kg',
  },
  {
    name: '钴',
    currentPrice: 285,
    yesterday: 288,
    weekAgo: 282,
    unit: '元/kg',
  },
];

export default function MarketPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<keyof typeof marketData>('镨钕金属');

  const currentData = marketData[selectedMaterial];
  const currentPrice = (currentData[currentData.length - 1].price / 10).toFixed(1); // 转换为万元单位
  const previousPrice = currentData[currentData.length - 2].price / 10;
  const priceChange = parseFloat(currentPrice) - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);

  return (
    <div className="min-h-full bg-[#F9F9FB] pb-6">
      {/* 行情趋势图 */}
      <div className="bg-white p-4 shadow-sm">
        {/* 材料切换 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
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
              <span className={`text-lg ${parseFloat(priceChangePercent) >= 0 ? 'text-[#13C999]' : 'text-[#FF6363]'}`}>
                {parseFloat(priceChangePercent) >= 0 ? '+' : ''}
                {priceChangePercent}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="text-[#8E949A]">万元/吨</span>
            <span className="text-[#8E949A]">
              涨跌值: <span className="text-[#23303B]">{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}</span>
            </span>
            <span className="text-[#8E949A]">
              涨跌幅: <span className={parseFloat(priceChangePercent) >= 0 ? 'text-[#13C999]' : 'text-[#FF6363]'}>{parseFloat(priceChangePercent) >= 0 ? '+' : ''}{priceChangePercent}%</span>
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

      {/* 市场价格列表 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#23303B]">市场报价</h3>
          <span className="text-sm text-[#A4A9AE]">更新时间: 11-29 14:30</span>
        </div>

        <div className="space-y-3">
          {priceList.map((item) => {
            const dayChange = item.currentPrice - item.yesterday;
            const dayChangePercent = ((dayChange / item.yesterday) * 100).toFixed(2);
            const weekChange = item.currentPrice - item.weekAgo;
            const weekChangePercent = ((weekChange / item.weekAgo) * 100).toFixed(2);

            return (
              <div key={item.name} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[#23303B]">{item.name}</h4>
                  <div className="text-right">
                    <div className="text-xl text-[#23303B]">¥{item.currentPrice}</div>
                    <div className="text-xs text-[#A4A9AE]">{item.unit}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* 日涨跌 */}
                  <div className="bg-[rgba(164,169,174,0.05)] rounded-lg p-3">
                    <div className="text-xs text-[#A4A9AE] mb-1">日涨跌</div>
                    <div className="flex items-center gap-1">
                      {dayChange >= 0 ? (
                        <TrendingUp size={16} className="text-[#13C999]" />
                      ) : (
                        <TrendingDown size={16} className="text-[#FF6363]" />
                      )}
                      <span className={dayChange >= 0 ? 'text-[#13C999]' : 'text-[#FF6363]'}>
                        {dayChange >= 0 ? '+' : ''}
                        {dayChange} ({dayChange >= 0 ? '+' : ''}
                        {dayChangePercent}%)
                      </span>
                    </div>
                  </div>

                  {/* 周涨跌 */}
                  <div className="bg-[rgba(164,169,174,0.05)] rounded-lg p-3">
                    <div className="text-xs text-[#A4A9AE] mb-1">周涨跌</div>
                    <div className="flex items-center gap-1">
                      {weekChange >= 0 ? (
                        <TrendingUp size={16} className="text-[#13C999]" />
                      ) : (
                        <TrendingDown size={16} className="text-[#FF6363]" />
                      )}
                      <span className={weekChange >= 0 ? 'text-[#13C999]' : 'text-[#FF6363]'}>
                        {weekChange >= 0 ? '+' : ''}
                        {weekChange} ({weekChange >= 0 ? '+' : ''}
                        {weekChangePercent}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

     
    </div>
  );
}
