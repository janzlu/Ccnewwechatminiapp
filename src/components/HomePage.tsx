import { Search, Store, Package, Square, Circle, CircleDot, Shapes, RectangleHorizontal, Waypoints, Disc, MoreHorizontal, Phone, Shield, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';  
import { useState, useEffect } from 'react';
import heroBackground from 'figma:asset/b82b2255591ef730519442050caab0cc10ea8edb.png';
import { mockApi, MarketTrendItem, MarketQuote } from '../services/mockApi';

interface Supplier {
  id: number;
  name: string;
  logo: string;
  business: string[];
  level: 'diamond' | 'gold' | 'silver';
  contact: string;
  isMember: boolean;
}

const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: '宁波金磁科技',
    logo: 'https://images.unsplash.com/photo-1766371900950-929959f2bb67?w=100&h=100&fit=crop',
    business: ['钕铁硼', '磁组件'],
    level: 'diamond',
    contact: '139****8888',
    isMember: true
  },
  {
    id: 2,
    name: '强力磁材集团',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    business: ['烧结钕铁硼', '钐钴'],
    level: 'gold',
    contact: '137****6666',
    isMember: true
  },
  {
    id: 3,
    name: '中科三环',
    logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=100&h=100&fit=crop',
    business: ['稀土永磁', '电机磁钢'],
    level: 'diamond',
    contact: '136****9999',
    isMember: false
  },
  {
    id: 4,
    name: '大地熊新材料',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    business: ['橡胶磁', '铁氧体'],
    level: 'silver',
    contact: '135****1111',
    isMember: true
  },
  {
    id: 5,
    name: '安泰科技',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    business: ['非晶带材', '磁粉芯'],
    level: 'gold',
    contact: '133****2222',
    isMember: false
  },
  {
    id: 6,
    name: '横店东磁',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    business: ['软磁', '塑磁'],
    level: 'diamond',
    contact: '131****5555',
    isMember: true
  },
];

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
  onNavigateToSupplier?: (supplierId: number) => void;
  onSearch?: (query: string) => void;
}

export default function HomePage({ onNavigateToCalculator, onNavigateToMall, onNavigateToSell, onNavigateToMarket, onNavigateToSupplier, onSearch }: HomePageProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('镨钕金属');
  const [timeRange, setTimeRange] = useState('1月');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 状态管理
  const [trendData, setTrendData] = useState<Record<string, MarketTrendItem[]>>({});
  const [quotes, setQuotes] = useState<MarketQuote[]>([]);
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
        setQuotes(marketQuotes);
      } catch (error) {
        console.error('Failed to load market data', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const currentData = trendData[selectedMaterial] || [];
  const currentPrice = currentData.length > 0 ? (currentData[currentData.length - 1].price / 10).toFixed(1) : '0.0';
  const previousPrice = currentData.length > 1 ? currentData[currentData.length - 2].price / 10 : 0;
  const priceChange = parseFloat(currentPrice) - previousPrice;
  const priceChangePercent = previousPrice !== 0 ? ((priceChange / previousPrice) * 100).toFixed(2) : '0.00';
  
  // 涨跌幅度（示例数据 - 实际应从API获取）
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="请输入产品名称/牌号"
            className="w-full h-11 pl-11 pr-4 bg-[#F5F6F8] rounded-lg text-[#23303B] placeholder:text-[#BFBFBF] text-sm focus:outline-none focus:ring-1 focus:ring-[#456EFE] transition-all"
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
              <Store size={20} />
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
      <div className="mx-3 mt-3 bg-white rounded-2xl p-4 shadow-sm min-h-[300px]">
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
                  <span className="text-[24px] text-[#23303B] leading-none font-[Verdana] font-medium">{currentPrice}</span>
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

      {/* 市场报价 */}
      <div className="mx-3 mt-3">
        <div className="flex items-center justify-between mb-[8px] px-1 mt-[20px] mr-[0px] ml-[0px]">
          <h3 className="text-[#23303B] text-sm font-medium text-[20px]">市场报价</h3>
          <span className="text-xs text-[#A4A9AE]">更新: 11-29 14:30</span>
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
             {[1,2,3].map(i => (
               <div key={i} className="bg-white rounded-lg p-3 h-24 animate-pulse shadow-sm" />
             ))}
          </div>
        ) : (
          <div className="space-y-2">
            {quotes.slice(0, 3).map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[#23303B] text-sm font-medium">{item.name}</h4>
                  <div className="text-right flex items-baseline gap-1">
                    <div className="text-base text-[#23303B] font-semibold font-mono">¥{item.price}</div>
                    <div className="text-[10px] text-[#A4A9AE]">{item.unit}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[rgba(164,169,174,0.05)] rounded-md p-1.5 flex items-center justify-between">
                    <div className="text-[10px] text-[#A4A9AE]">日涨跌</div>
                    <div className={`flex items-center gap-0.5 text-xs font-medium font-mono ${item.dayChange >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                      {item.dayChange >= 0 ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
                      )}
                      <span>{item.dayPct > 0 ? '+' : ''}{item.dayPct.toFixed(2)}%</span>
                    </div>
                  </div>
                  <div className="bg-[rgba(164,169,174,0.05)] rounded-md p-1.5 flex items-center justify-between">
                    <div className="text-[10px] text-[#A4A9AE]">周涨跌</div>
                    <div className={`flex items-center gap-0.5 text-xs font-medium font-mono ${item.weekChange >= 0 ? 'text-[#FF6363]' : 'text-[#13C999]'}`}>
                      {item.weekChange >= 0 ? (
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
        )}
      </div>

      {/* 商家推荐 */}
      <div className="mx-3 mt-3">
        <div className="flex items-center justify-between mb-[8px] px-1 mt-[20px] mr-[0px] ml-[0px]">
          <h3 className="text-[#23303B] text-sm font-medium text-[20px]">商家推荐</h3>
          <button className="flex items-center text-xs text-[#A4A9AE]">
            更多
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 -mx-3 px-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {mockSuppliers.map((supplier) => (
            <div 
              key={supplier.id}
              onClick={() => onNavigateToSupplier && onNavigateToSupplier(supplier.id)}
              className="flex-none w-[160px] bg-white rounded-xl p-3 shadow-sm border border-transparent active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <img 
                  src={supplier.logo} 
                  alt={supplier.name} 
                  className="w-8 h-8 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[#23303B] text-sm font-medium truncate">{supplier.name}</h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    {supplier.level === 'diamond' && (
                       <span className="bg-blue-50 text-[#456EFE] text-[10px] px-1 rounded flex items-center gap-0.5 whitespace-nowrap">
                         <Shield size={10} fill="currentColor" /> 钻石商家
                       </span>
                    )}
                    {supplier.level === 'gold' && (
                       <span className="bg-yellow-50 text-[#F59E0B] text-[10px] px-1 rounded flex items-center gap-0.5 whitespace-nowrap">
                         <Star size={10} fill="currentColor" /> 金牌商家
                       </span>
                    )}
                    {supplier.level === 'silver' && (
                       <span className="bg-gray-50 text-[#8E949A] text-[10px] px-1 rounded flex items-center gap-0.5 whitespace-nowrap">
                         <CheckCircle2 size={10} /> 认证商家
                       </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="h-12 mb-2 overflow-hidden">
                <div className="flex flex-wrap gap-1">
                  {supplier.business.map((item, idx) => (
                    <span key={idx} className="bg-[#F5F6F8] text-[#8E949A] text-[10px] px-1.5 py-0.5 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F5F6F8]">
                 {supplier.isMember ? (
                   <div className="flex items-center gap-1 text-[#23303B] text-xs font-medium">
                     <Phone size={12} className="text-[#456EFE]" />
                     {supplier.contact}
                   </div>
                 ) : (
                   <div className="flex items-center gap-1 text-[#A4A9AE] text-xs">
                     <Phone size={12} />
                     查看联系方式
                   </div>
                 )}
              </div>
            </div>
          ))}
          
          {/* 查看更多卡片 */}
          <div 
             className="flex-none w-[60px] bg-[#F5F6F8] rounded-xl flex flex-col items-center justify-center gap-2 text-[#8E949A] active:scale-[0.98] transition-transform"
          >
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
               <ChevronRight size={16} />
             </div>
             <span className="text-xs [writing-mode:vertical-rl]">查看更多</span>
          </div>
        </div>
      </div>

      {/* 磁材8个分类 */}
      <div className="mx-3 mt-3">
        <h3 className="text-[#23303B] mb-[12px] text-[20px] font-normal mt-[0px] mr-[0px] ml-[10px]">磁材计算器</h3>
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