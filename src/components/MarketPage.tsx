import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { mockApi, MarketTrendItem, MarketQuote } from '../services/mockApi';

export default function MarketPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('镨钕金属');
  const [timeRange, setTimeRange] = useState('1月');
  
  // 状态管理
  const [trendData, setTrendData] = useState<Record<string, MarketTrendItem[]>>({});
  const [priceList, setPriceList] = useState<MarketQuote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const [trends, marketQuotes] = await Promise.all([
          mockApi.getMarketTrends(),
          mockApi.getMarketQuotes()
        ]);
        setTrendData(trends);
        setPriceList(marketQuotes);
      } catch (error) {
        console.error('Failed to load market data', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const currentData = trendData[selectedMaterial] || [];
  const currentPrice = currentData.length > 0 ? (currentData[currentData.length - 1].price / 10).toFixed(1) : '0.0';
  const previousPrice = currentData.length > 1 ? currentData[currentData.length - 2].price / 10 : 0;
  const priceChange = parseFloat(currentPrice) - previousPrice;
  const priceChangePercent = previousPrice !== 0 ? ((priceChange / previousPrice) * 100).toFixed(2) : '0.00';

  return (
    <div className="min-h-full bg-[#F9F9FB] pb-6">
      {/* 行情趋势图 */}
      <div className="bg-white p-4 shadow-sm min-h-[300px]">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 py-10">
            <div className="w-full h-8 bg-gray-100 rounded animate-pulse" />
            <div className="w-full h-12 bg-gray-100 rounded animate-pulse" />
            <div className="w-full h-40 bg-gray-100 rounded animate-pulse" />
          </div>
        ) : (
          <>
            {/* 材料切换 */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {Object.keys(trendData).map((material) => (
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
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-[36px] text-[#23303B] leading-none font-mono font-medium">{currentPrice}</span>
                  <span className={`text-lg font-mono font-medium ${parseFloat(priceChangePercent) >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                    {parseFloat(priceChangePercent) >= 0 ? '+' : ''}
                    {priceChangePercent}%
                  </span>
                </div>
                <div className="flex border border-[#E5E7EB] rounded-lg overflow-hidden h-7">
                  {['1月', '3月', '半年'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 text-xs flex items-center justify-center transition-colors ${
                        timeRange === range 
                          ? 'bg-[#456EFE] text-white' 
                          : 'bg-white text-[#8E949A] hover:bg-gray-50'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-[#8E949A]">万元/吨</span>
                <span className="text-[#8E949A]">
                  涨跌值: <span className="text-[#23303B] font-mono">{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}</span>
                </span>
                <span className="text-[#8E949A]">
                  涨跌幅: <span className={`font-mono ${parseFloat(priceChangePercent) >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>{parseFloat(priceChangePercent) >= 0 ? '+' : ''}{priceChangePercent}%</span>
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
                  domain={[0, 'auto']}
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
          </>
        )}
      </div>

      {/* 市场价格列表 */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-[8px] px-[5px] py-[0px] mt-[12px] mr-[0px] ml-[0px]">
          <h3 className="text-[#23303B] text-sm font-medium text-[20px]">市场报价</h3>
          <span className="text-xs text-[#A4A9AE]">更新: 11-29 14:30</span>
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-lg p-3 h-24 animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {priceList.map((item) => {
              return (
                <div key={item.id} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#23303B] text-sm font-medium">{item.name}</h4>
                    <div className="text-right flex items-baseline gap-1">
                      <div className="text-base font-semibold text-[#23303B] font-mono">¥{item.price}</div>
                      <div className="text-[10px] text-[#A4A9AE]">{item.unit}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* 日涨跌 */}
                    <div className="bg-[rgba(164,169,174,0.05)] rounded-md p-1.5 flex items-center justify-between">
                      <span className="text-[10px] text-[#A4A9AE]">日涨跌</span>
                      <div className="flex items-center gap-0.5">
                        {item.dayChange >= 0 ? (
                          <TrendingUp size={12} className="text-[#FF6363]" />
                        ) : (
                          <TrendingDown size={12} className="text-[#13C999]" />
                        )}
                        <span className={`text-xs font-medium font-mono ${item.dayChange >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                          {item.dayPct}%
                        </span>
                      </div>
                    </div>

                    {/* 周涨跌 */}
                    <div className="bg-[rgba(164,169,174,0.05)] rounded-md p-1.5 flex items-center justify-between">
                      <span className="text-[10px] text-[#A4A9AE]">周涨跌</span>
                      <div className="flex items-center gap-0.5">
                        {item.weekChange >= 0 ? (
                          <TrendingUp size={12} className="text-[#FF6363]" />
                        ) : (
                          <TrendingDown size={12} className="text-[#13C999]" />
                        )}
                        <span className={`text-xs font-medium font-mono ${item.weekChange >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                          {item.weekPct}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

     
    </div>
  );
}
