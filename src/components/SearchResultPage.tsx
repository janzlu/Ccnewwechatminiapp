import { useState, useEffect } from 'react';
import { Search, ArrowLeft, Filter, ChevronDown, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockApi, Product } from '../services/mockApi';

interface SearchResultPageProps {
  initialQuery?: string;
  onBack: () => void;
  onProductClick: (productId: number) => void;
}

export default function SearchResultPage({ initialQuery = '', onBack, onProductClick }: SearchResultPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [activeSort, setActiveSort] = useState<'default' | 'sales' | 'price'>('default');
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc'>('asc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  // 模拟搜索加载
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.searchProducts(query);
        // 这里可以根据 activeSort 和 priceOrder 在前端再次排序
        let sortedData = [...data];
        
        if (activeSort === 'sales') {
          sortedData.sort((a, b) => b.sales - a.sales);
        } else if (activeSort === 'price') {
          sortedData.sort((a, b) => priceOrder === 'asc' ? a.price - b.price : b.price - a.price);
        }
        
        setResults(sortedData);
      } catch (error) {
        console.error('Search failed', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [query, activeSort, priceOrder]);

  const handlePriceSort = () => {
    if (activeSort === 'price') {
      setPriceOrder(priceOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setActiveSort('price');
      setPriceOrder('asc');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F5F6F8]">
      {/* 顶部搜索栏 */}
      <div className="flex-none bg-white px-4 py-2 border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-2 text-[#23303B]">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4A9AE]" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索产品名称/牌号/规格"
            className="w-full h-9 pl-9 pr-4 bg-[#F5F6F8] rounded-full text-[#23303B] placeholder:text-[#BFBFBF] text-sm focus:outline-none focus:ring-1 focus:ring-[#456EFE]"
          />
        </div>
        <button className="text-sm font-medium text-[#456EFE]" onClick={() => setIsLoading(true)}>
          搜索
        </button>
      </div>

      {/* 排序筛选栏 */}
      <div className="flex-none bg-white px-2 py-3 shadow-sm z-10">
        <div className="flex items-center justify-between text-sm text-[#8E949A]">
          <button 
            className={`flex-1 flex items-center justify-center gap-1 ${activeSort === 'default' ? 'text-[#456EFE] font-medium' : ''}`}
            onClick={() => setActiveSort('default')}
          >
            综合
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-1 ${activeSort === 'sales' ? 'text-[#456EFE] font-medium' : ''}`}
            onClick={() => setActiveSort('sales')}
          >
            销量
          </button>
          <button 
            className={`flex-1 flex items-center justify-center gap-1 ${activeSort === 'price' ? 'text-[#456EFE] font-medium' : ''}`}
            onClick={handlePriceSort}
          >
            价格
            <div className="flex flex-col -gap-1">
              <ArrowUp size={10} className={activeSort === 'price' && priceOrder === 'asc' ? 'text-[#456EFE]' : 'text-[#D1D5DB]'} />
              <ArrowDown size={10} className={`-mt-[4px] ${activeSort === 'price' && priceOrder === 'desc' ? 'text-[#456EFE]' : 'text-[#D1D5DB]'}`} />
            </div>
          </button>
          <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
          <button 
            className="flex-1 flex items-center justify-center gap-1 text-[#23303B]"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            筛选 <Filter size={14} />
          </button>
        </div>
      </div>

      {/* 筛选面板 (模拟) */}
      {isFilterOpen && (
        <div className="absolute top-[105px] left-0 right-0 bg-white shadow-lg p-4 z-20 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-[#23303B] mb-2">牌号</h4>
              <div className="flex flex-wrap gap-2">
                {['N35', 'N38', 'N45', 'N52', '35H', '35M'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#F5F6F8] rounded text-xs text-[#5E656F]">{tag}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-[#23303B] mb-2">镀层</h4>
              <div className="flex flex-wrap gap-2">
                {['镍铜镍', '蓝白锌', '彩锌', '环氧树脂', '磷化'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#F5F6F8] rounded text-xs text-[#5E656F]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-2 bg-[#F5F6F8] text-[#5E656F] rounded-lg text-sm"
              >
                重置
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 py-2 bg-[#456EFE] text-white rounded-lg text-sm"
              >
                确认
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 遮罩 */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/20 z-10" onClick={() => setIsFilterOpen(false)} style={{ top: '105px' }} />
      )}

      {/* 结果列表 */}
      <div className="flex-1 overflow-y-auto p-3">
        {isLoading ? (
          // Loading Skeleton
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-3 rounded-lg shadow-sm flex gap-3">
                <div className="w-24 h-24 bg-gray-100 rounded animate-pulse" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded w-1/3 animate-pulse" />
                  <div className="h-6 bg-gray-100 rounded w-1/4 mt-2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((product) => (
              <div 
                key={product.id} 
                onClick={() => onProductClick(product.id)}
                className="bg-white p-3 rounded-lg shadow-sm flex gap-3 active:scale-[0.99] transition-transform"
              >
                <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-50 flex-none relative">
                   {/* 替换为真实 ImageWithFallback 或 img */}
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[#23303B] text-sm font-medium leading-tight mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-[#E8F0FF] text-[#456EFE] rounded">
                          {tag}
                        </span>
                      ))}
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#F5F6F8] text-[#8E949A] rounded">
                        {product.temp}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-[#FF6363] font-medium">¥</span>
                        <span className="text-lg text-[#FF6363] font-bold font-mono">{product.price.toFixed(2)}</span>
                        <span className="text-[10px] text-[#8E949A]">/个</span>
                      </div>
                      <div className="text-[10px] text-[#A4A9AE]">
                        {product.minOrder}个起订 · 销量 {product.sales > 1000 ? (product.sales/1000).toFixed(1)+'k' : product.sales}
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#F5F6F8] text-[#456EFE] flex items-center justify-center">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="py-6 text-center">
              <span className="text-xs text-[#D1D5DB]">没有更多结果了</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}