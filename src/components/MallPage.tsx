import { Search, SlidersHorizontal, Heart, ShoppingCart, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MallPageProps {
  onProductClick?: (productId: number) => void;
  onCartClick?: () => void;
}

const mainCategories = [
  { id: 'finished', name: '成品' },
  { id: 'blank', name: '毛坯' },
  { id: 'material', name: '原料' },
];

const subCategories = {
  finished: ['方片', '圆片', '圆环', '同心瓦', '直边瓦', '同R瓦', '方磨圆', '异形'],
  blank: ['方块', '圆柱', '环形', '瓦形', '其他'],
  material: ['N系列', 'M系列', 'H系列', 'SH系列', 'UH系列', 'EH系列', 'AH系列'],
};

// 原料报价数据
const materialPricing = {
  'N系列': [
    {
      grade: 'N35',
      br: '12',
      hcj: '12',
      blankPrice: 150000,
      prices: [
        { range: '> D25', price: 160 },
        { range: 'D20-D24.9', price: 165 },
        { range: 'D16-D19.9', price: 170 },
        { range: 'D13-D15.9', price: 174 },
        { range: 'D10-D12.9', price: 180 },
        { range: 'D8-D9.9', price: 200 },
        { range: 'D7-D7.9', price: 210 },
        { range: 'D6-D6.9', price: 215 },
        { range: 'D5-D5.9', price: 224 },
        { range: 'D4-D4.9', price: 230 },
        { range: 'D3-D3.9', price: 237 },
        { range: 'D2-D2.9', price: 315 },
        { range: 'D1-D1.9', price: 750 },
        { range: 'D0.5-D0.9', price: 1060 },
      ],
    },
    {
      grade: 'N38',
      br: '12.4',
      hcj: '12',
      blankPrice: 155000,
      prices: [
        { range: '> D25', price: 166 },
        { range: 'D20-D24.9', price: 171 },
        { range: 'D16-D19.9', price: 176 },
        { range: 'D13-D15.9', price: 180 },
        { range: 'D10-D12.9', price: 186 },
        { range: 'D8-D9.9', price: 206 },
        { range: 'D7-D7.9', price: 216 },
        { range: 'D6-D6.9', price: 221 },
        { range: 'D5-D5.9', price: 230 },
        { range: 'D4-D4.9', price: 236 },
        { range: 'D3-D3.9', price: 243 },
        { range: 'D2-D2.9', price: 321 },
        { range: 'D1-D1.9', price: 756 },
        { range: 'D0.5-D0.9', price: 1066 },
      ],
    },
    {
      grade: 'N42',
      br: '13',
      hcj: '12',
      blankPrice: 160000,
      prices: [
        { range: '> D25', price: 172 },
        { range: 'D20-D24.9', price: 177 },
        { range: 'D16-D19.9', price: 182 },
        { range: 'D13-D15.9', price: 186 },
        { range: 'D10-D12.9', price: 192 },
        { range: 'D8-D9.9', price: 212 },
        { range: 'D7-D7.9', price: 222 },
        { range: 'D6-D6.9', price: 227 },
        { range: 'D5-D5.9', price: 236 },
        { range: 'D4-D4.9', price: 242 },
        { range: 'D3-D3.9', price: 249 },
        { range: 'D2-D2.9', price: 327 },
        { range: 'D1-D1.9', price: 762 },
        { range: 'D0.5-D0.9', price: 1072 },
      ],
    },
  ],
  'M系列': [
    {
      grade: 'M38',
      br: '12.5',
      hcj: '13',
      blankPrice: 155000,
      prices: [
        { range: '> D25', price: 165 },
        { range: 'D20-D24.9', price: 170 },
        { range: 'D16-D19.9', price: 175 },
        { range: 'D13-D15.9', price: 179 },
        { range: 'D10-D12.9', price: 185 },
        { range: 'D8-D9.9', price: 205 },
        { range: 'D7-D7.9', price: 215 },
        { range: 'D6-D6.9', price: 220 },
      ],
    },
    {
      grade: 'M42',
      br: '13',
      hcj: '13',
      blankPrice: 162000,
      prices: [
        { range: '> D25', price: 173 },
        { range: 'D20-D24.9', price: 178 },
        { range: 'D16-D19.9', price: 183 },
        { range: 'D13-D15.9', price: 187 },
        { range: 'D10-D12.9', price: 193 },
        { range: 'D8-D9.9', price: 213 },
        { range: 'D7-D7.9', price: 223 },
        { range: 'D6-D6.9', price: 228 },
      ],
    },
    {
      grade: 'M45',
      br: '13.5',
      hcj: '13',
      blankPrice: 168000,
      prices: [
        { range: '> D25', price: 179 },
        { range: 'D20-D24.9', price: 184 },
        { range: 'D16-D19.9', price: 189 },
        { range: 'D13-D15.9', price: 193 },
        { range: 'D10-D12.9', price: 199 },
        { range: 'D8-D9.9', price: 219 },
        { range: 'D7-D7.9', price: 229 },
        { range: 'D6-D6.9', price: 234 },
      ],
    },
  ],
  'H系列': [
    {
      grade: 'H38',
      br: '12.5',
      hcj: '14',
      blankPrice: 160000,
      prices: [
        { range: '> D25', price: 170 },
        { range: 'D20-D24.9', price: 175 },
        { range: 'D16-D19.9', price: 180 },
        { range: 'D13-D15.9', price: 184 },
        { range: 'D10-D12.9', price: 190 },
        { range: 'D8-D9.9', price: 210 },
      ],
    },
    {
      grade: 'H42',
      br: '13',
      hcj: '14',
      blankPrice: 167000,
      prices: [
        { range: '> D25', price: 178 },
        { range: 'D20-D24.9', price: 183 },
        { range: 'D16-D19.9', price: 188 },
        { range: 'D13-D15.9', price: 192 },
        { range: 'D10-D12.9', price: 198 },
        { range: 'D8-D9.9', price: 218 },
      ],
    },
    {
      grade: 'H45',
      br: '13.5',
      hcj: '14',
      blankPrice: 173000,
      prices: [
        { range: '> D25', price: 184 },
        { range: 'D20-D24.9', price: 189 },
        { range: 'D16-D19.9', price: 194 },
        { range: 'D13-D15.9', price: 198 },
        { range: 'D10-D12.9', price: 204 },
        { range: 'D8-D9.9', price: 224 },
      ],
    },
  ],
  'SH系列': [
    {
      grade: 'SH35',
      br: '12',
      hcj: '15',
      blankPrice: 165000,
      prices: [
        { range: '> D25', price: 175 },
        { range: 'D20-D24.9', price: 180 },
        { range: 'D16-D19.9', price: 185 },
        { range: 'D13-D15.9', price: 189 },
        { range: 'D10-D12.9', price: 195 },
        { range: 'D8-D9.9', price: 215 },
      ],
    },
    {
      grade: 'SH38',
      br: '12.5',
      hcj: '15',
      blankPrice: 171000,
      prices: [
        { range: '> D25', price: 182 },
        { range: 'D20-D24.9', price: 187 },
        { range: 'D16-D19.9', price: 192 },
        { range: 'D13-D15.9', price: 196 },
        { range: 'D10-D12.9', price: 202 },
        { range: 'D8-D9.9', price: 222 },
      ],
    },
    {
      grade: 'SH42',
      br: '13',
      hcj: '15',
      blankPrice: 178000,
      prices: [
        { range: '> D25', price: 189 },
        { range: 'D20-D24.9', price: 194 },
        { range: 'D16-D19.9', price: 199 },
        { range: 'D13-D15.9', price: 203 },
        { range: 'D10-D12.9', price: 209 },
        { range: 'D8-D9.9', price: 229 },
      ],
    },
  ],
  'UH系列': [
    {
      grade: 'UH35',
      br: '12',
      hcj: '16',
      blankPrice: 170000,
      prices: [
        { range: '> D25', price: 180 },
        { range: 'D20-D24.9', price: 185 },
        { range: 'D16-D19.9', price: 190 },
        { range: 'D13-D15.9', price: 194 },
        { range: 'D10-D12.9', price: 200 },
        { range: 'D8-D9.9', price: 220 },
      ],
    },
    {
      grade: 'UH38',
      br: '12.5',
      hcj: '16',
      blankPrice: 177000,
      prices: [
        { range: '> D25', price: 188 },
        { range: 'D20-D24.9', price: 193 },
        { range: 'D16-D19.9', price: 198 },
        { range: 'D13-D15.9', price: 202 },
        { range: 'D10-D12.9', price: 208 },
        { range: 'D8-D9.9', price: 228 },
      ],
    },
    {
      grade: 'UH42',
      br: '13',
      hcj: '16',
      blankPrice: 184000,
      prices: [
        { range: '> D25', price: 195 },
        { range: 'D20-D24.9', price: 200 },
        { range: 'D16-D19.9', price: 205 },
        { range: 'D13-D15.9', price: 209 },
        { range: 'D10-D12.9', price: 215 },
        { range: 'D8-D9.9', price: 235 },
      ],
    },
  ],
  'EH系列': [
    {
      grade: 'EH35',
      br: '12',
      hcj: '17',
      blankPrice: 175000,
      prices: [
        { range: '> D25', price: 185 },
        { range: 'D20-D24.9', price: 190 },
        { range: 'D16-D19.9', price: 195 },
        { range: 'D13-D15.9', price: 199 },
        { range: 'D10-D12.9', price: 205 },
        { range: 'D8-D9.9', price: 225 },
      ],
    },
    {
      grade: 'EH38',
      br: '12.5',
      hcj: '17',
      blankPrice: 182000,
      prices: [
        { range: '> D25', price: 193 },
        { range: 'D20-D24.9', price: 198 },
        { range: 'D16-D19.9', price: 203 },
        { range: 'D13-D15.9', price: 207 },
        { range: 'D10-D12.9', price: 213 },
        { range: 'D8-D9.9', price: 233 },
      ],
    },
    {
      grade: 'EH42',
      br: '13',
      hcj: '17',
      blankPrice: 189000,
      prices: [
        { range: '> D25', price: 200 },
        { range: 'D20-D24.9', price: 205 },
        { range: 'D16-D19.9', price: 210 },
        { range: 'D13-D15.9', price: 214 },
        { range: 'D10-D12.9', price: 220 },
        { range: 'D8-D9.9', price: 240 },
      ],
    },
  ],
  'AH系列': [
    {
      grade: 'AH35',
      br: '12',
      hcj: '18',
      blankPrice: 180000,
      prices: [
        { range: '> D25', price: 191 },
        { range: 'D20-D24.9', price: 196 },
        { range: 'D16-D19.9', price: 201 },
        { range: 'D13-D15.9', price: 205 },
      ],
    },
    {
      grade: 'AH38',
      br: '12.5',
      hcj: '18',
      blankPrice: 187000,
      prices: [
        { range: '> D25', price: 199 },
        { range: 'D20-D24.9', price: 204 },
        { range: 'D16-D19.9', price: 209 },
        { range: 'D13-D15.9', price: 213 },
      ],
    },
    {
      grade: 'AH42',
      br: '13',
      hcj: '18',
      blankPrice: 194000,
      prices: [
        { range: '> D25', price: 206 },
        { range: 'D20-D24.9', price: 211 },
        { range: 'D16-D19.9', price: 216 },
        { range: 'D13-D15.9', price: 220 },
      ],
    },
  ],
};

const products = [
  {
    id: 1,
    name: 'N35 钕铁硼方片',
    specs: '10×10×5mm',
    price: 0.85,
    unit: '件',
    stock: 10000,
    category: 'finished',
    subCategory: '方片',
    image: 'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=400',
  },
  {
    id: 2,
    name: 'N52 钕铁硼圆片',
    specs: 'D20×3mm',
    price: 1.2,
    unit: '件',
    stock: 8500,
    category: 'finished',
    subCategory: '圆片',
    image: 'https://images.unsplash.com/photo-1733309730239-1d2b723eb807?w=400',
  },
  {
    id: 3,
    name: 'N38 钕铁硼圆环',
    specs: 'D30×D15×5mm',
    price: 2.5,
    unit: '件',
    stock: 5000,
    category: 'finished',
    subCategory: '圆环',
    image: 'https://images.unsplash.com/photo-1640184713828-5de60cad7a2c?w=400',
  },
  {
    id: 4,
    name: 'N42 同心瓦磁铁',
    specs: '弧度90°×R20×5mm',
    price: 3.8,
    unit: '件',
    stock: 3200,
    category: 'finished',
    subCategory: '同心瓦',
    image: 'https://images.unsplash.com/photo-1655890954744-c9650a3b570d?w=400',
  },
  {
    id: 5,
    name: '钕铁硼方块毛坯',
    specs: '50×50×25mm',
    price: 45,
    unit: '块',
    stock: 1200,
    category: 'blank',
    subCategory: '方块',
    image: 'https://images.unsplash.com/photo-1745449562896-71ba57d1e2b3?w=400',
  },
  {
    id: 6,
    name: '钕铁硼圆柱毛坯',
    specs: 'D50×30mm',
    price: 52,
    unit: '块',
    stock: 800,
    category: 'blank',
    subCategory: '圆柱',
    image: 'https://images.unsplash.com/photo-1758467700651-b0cdd3346cc7?w=400',
  },
  {
    id: 7,
    name: '镨钕氧化物',
    specs: '纯度99.5%',
    price: 430,
    unit: 'kg',
    stock: 500,
    category: 'material',
    subCategory: '镨钕',
    image: 'https://images.unsplash.com/photo-1758873263528-6dbd0422cf84?w=400',
  },
  {
    id: 8,
    name: '金属镝',
    specs: '纯度99%',
    price: 2910,
    unit: 'kg',
    stock: 200,
    category: 'material',
    subCategory: '金属镝',
    image: 'https://images.unsplash.com/photo-1758691463569-66de91d76452?w=400',
  },
];

export default function MallPage({ onProductClick, onCartClick }: MallPageProps) {
  const [selectedMainCategory, setSelectedMainCategory] = useState('finished');
  const [selectedSubCategory, setSelectedSubCategory] = useState('方片');

  const currentSubCategories = subCategories[selectedMainCategory as keyof typeof subCategories];
  const filteredProducts = products.filter(
    (p) => p.category === selectedMainCategory && p.subCategory === selectedSubCategory
  );

  // 获取当前原料系列的报价数据
  const currentMaterialPricings = selectedMainCategory === 'material' 
    ? materialPricing[selectedSubCategory as keyof typeof materialPricing] || []
    : [];

  return (
    <div className="min-h-full bg-[#F9F9FB] flex flex-col">
      {/* 搜索框和分类切换 */}
      <div className="bg-white px-4 py-3 space-y-3">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4A9AE]" size={20} />
          <input
            type="text"
            placeholder="搜索商品..."
            className="w-full h-12 pl-11 pr-24 bg-[rgba(164,169,174,0.15)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button 
              onClick={onCartClick}
              className="text-[#A4A9AE] p-1 cursor-pointer"
              type="button"
            >
              <ShoppingCart size={20} />
            </button>
            <button className="text-[#A4A9AE] p-1 cursor-pointer" type="button">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* 大类切换 */}
        <div className="flex gap-2">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedMainCategory(category.id);
                setSelectedSubCategory(subCategories[category.id as keyof typeof subCategories][0]);
              }}
              className={`flex-1 h-10 transition-all relative ${
                selectedMainCategory === category.id
                  ? 'text-[#456EFE] font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[24px] after:h-[2px] after:bg-[#456EFE] after:rounded-full'
                  : 'text-[#8E949A]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 子类目和产品列表 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧子类目 */}
        <div className="w-24 bg-white overflow-y-auto flex-none">
          {currentSubCategories.map((subCat) => (
            <button
              key={subCat}
              onClick={() => setSelectedSubCategory(subCat)}
              className={`w-full py-4 px-2 text-sm border-l-2 transition-all ${
                selectedSubCategory === subCat
                  ? 'bg-[#F9F9FB] border-[#456EFE] text-[#456EFE]'
                  : 'border-transparent text-[#8E949A]'
              }`}
            >
              {subCat}
            </button>
          ))}
        </div>

        {/* 右侧内容区域 */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedMainCategory === 'material' && currentMaterialPricings.length > 0 ? (
            // 原料报价展示 - 循环显示多个牌号
            <div className="space-y-4">
              {currentMaterialPricings.map((pricing, pricingIndex) => (
                <div key={pricingIndex} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="px-2">
                    {/* 顶部牌号和参数 */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[rgba(164,169,174,0.15)]">
                      <div className="flex items-center gap-2">
                        <Bookmark size={16} className="text-[#456EFE]" />
                        <span className="text-[#8E949A] text-xs">牌号:</span>
                        <span className="text-[#23303B] text-sm text-[15px] font-bold">{pricing.grade}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-[#8E949A] text-[11px]">Br(kGs): <span className="text-[#23303B]">{pricing.br}</span></span>
                        <span className="text-[#8E949A] text-[11px]">Hcj(kOe): <span className="text-[#23303B]">{pricing.hcj}</span></span>
                      </div>
                    </div>

                    {/* 毛坯价 */}
                    <div className="mb-4">
                      <div className="text-[#8E949A] text-xs mb-1">毛坯价</div>
                      <div className="text-[#456EFE] text-xl text-[16px] font-bold font-normal">¥ {pricing.blankPrice.toLocaleString()}</div>
                    </div>

                    {/* 价格表格 - 2列布局 */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {pricing.prices.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-1.5 px-2 rounded bg-[rgba(164,169,174,0.05)]">
                          <span className="text-[#8E949A] text-xs text-[11px]">{item.range}</span>
                          <span className="text-[#23303B] text-xs">¥ {item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 成品和毛坯的商品列表展示
            <>
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-[#A4A9AE]">
                  <p>暂无商品</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm">
                      <div 
                        className="flex gap-3 cursor-pointer"
                        onClick={() => onProductClick?.(product.id)}
                      >
                        {/* 商品图片 */}
                        <div className="w-24 h-24 bg-[rgba(164,169,174,0.15)] rounded-lg flex-none overflow-hidden">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* 商品信息 */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[#23303B] mb-1 truncate">{product.name}</h4>
                          <p className="text-sm text-[#A4A9AE] mb-2">规格: {product.specs}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[#456EFE] text-xl">¥{product.price}</span>
                              <span className="text-sm text-[#A4A9AE] ml-1">/{product.unit}</span>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // TODO: 收藏功能
                              }}
                              className="w-8 h-8 rounded-full bg-[rgba(69,110,254,0.1)] flex items-center justify-center text-[#456EFE] cursor-pointer"
                              type="button"
                            >
                              <Heart size={18} />
                            </button>
                          </div>
                          <p className="text-xs text-[#A4A9AE] mt-2">库存: {product.stock.toLocaleString()}{product.unit}</p>
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: 加入购物车
                            alert('已加入购物车');
                          }}
                          className="flex-1 h-9 bg-[rgba(69,110,254,0.1)] text-[#456EFE] rounded-lg transition-all hover:bg-[rgba(69,110,254,0.2)] cursor-pointer"
                          type="button"
                        >
                          加入购物车
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onProductClick?.(product.id);
                          }}
                          className="flex-1 h-9 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] cursor-pointer"
                          type="button"
                        >
                          立即购买
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}