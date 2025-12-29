import { Search, SlidersHorizontal, Heart, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MallPageProps {
  onProductClick?: (productId: number) => void;
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
    grade: 'N35',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 101,
    name: 'N35 钕铁硼方片 (小)',
    specs: '5×5×2mm',
    price: 0.45,
    unit: '件',
    stock: 20000,
    category: 'finished',
    subCategory: '方片',
    image: 'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=400',
    grade: 'N35',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 102,
    name: 'N42 钕铁硼方片',
    specs: '20×10×5mm',
    price: 1.85,
    unit: '件',
    stock: 5000,
    category: 'finished',
    subCategory: '方片',
    image: 'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=400',
    grade: 'N42',
    material: '钕铁硼',
    surface: '镀锌',
  },
  {
    id: 103,
    name: 'N52 强磁方片',
    specs: '15×15×5mm',
    price: 2.20,
    unit: '件',
    stock: 3000,
    category: 'finished',
    subCategory: '方片',
    image: 'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=400',
    grade: 'N52',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 104,
    name: 'N38 沉孔方片',
    specs: '30×10×5mm',
    price: 3.50,
    unit: '件',
    stock: 4500,
    category: 'finished',
    subCategory: '方片',
    image: 'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=400',
    grade: 'N38',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 105,
    name: 'N45 钕铁硼长方条',
    specs: '50×10×3mm',
    price: 4.80,
    unit: '件',
    stock: 2800,
    category: 'finished',
    subCategory: '方片',
    image: 'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=400',
    grade: 'N45',
    material: '钕铁硼',
    surface: '环氧树脂',
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
    grade: 'N52',
    material: '钕铁硼',
    surface: '镀镍',
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
    grade: 'N38',
    material: '钕铁硼',
    surface: '镀镍',
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
    grade: 'N42',
    material: '钕铁硼',
    surface: '镀锌',
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
    grade: 'N40',
    material: '钕铁硼',
    surface: '无',
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
    grade: 'N42',
    material: '钕铁硼',
    surface: '无',
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
    grade: '99.5%',
    material: '镨钕氧化物',
    surface: '无',
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
    grade: '99%',
    material: '金属镝',
    surface: '无',
  },
];

export default function MallPage({ onProductClick }: MallPageProps) {
  const [selectedMainCategory, setSelectedMainCategory] = useState('finished');
  const [selectedSubCategory, setSelectedSubCategory] = useState('方片');
  const [selectedGrade, setSelectedGrade] = useState<string>('');

  const currentSubCategories = subCategories[selectedMainCategory as keyof typeof subCategories];
  
  // 处理原料分类的逻辑
  const isMaterial = selectedMainCategory === 'material';
  
  // 如果是原料，默认选中 N系列
  if (isMaterial && !subCategories.material.includes(selectedSubCategory)) {
    // 这种副作用在渲染中直接处理不太好，最好在点击大类时重置
    // 这里只用来做数据获取的fallback
  }

  const filteredProducts = products.filter(
    (p) => p.category === selectedMainCategory && p.subCategory === selectedSubCategory
  );

  // 获取当前原料系列的报价数据
  const currentMaterialPricings = isMaterial
    ? materialPricing[selectedSubCategory as keyof typeof materialPricing] || []
    : [];

  // 获取当前选中的牌号数据
  const activeGradeData = currentMaterialPricings.find(p => p.grade === selectedGrade) || currentMaterialPricings[0];
  
  // 确定左侧显示的列表项
  const leftSidebarItems = isMaterial 
    ? currentMaterialPricings.map(p => p.grade)
    : currentSubCategories;

  return (
    <div className="min-h-full bg-[#F9F9FB] flex flex-col">
      {/* 搜索框和分类切换 */}
      <div className="bg-white px-4 py-3 space-y-3 shadow-sm z-10">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4A9AE]" size={20} />
          <input
            type="text"
            placeholder="搜索商品..."
            className="w-full h-12 pl-11 pr-24 bg-[rgba(164,169,174,0.15)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="text-[#A4A9AE] p-1 cursor-pointer" type="button">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* 大类切换 */}
        <div className="flex gap-2 justify-around">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedMainCategory(category.id);
                const firstSub = subCategories[category.id as keyof typeof subCategories][0];
                setSelectedSubCategory(firstSub);
                // 如果切换到原料，重置选中的牌号
                if (category.id === 'material') {
                   setSelectedGrade(''); 
                }
              }}
              className={`pb-2 px-4 transition-all relative font-medium ${
                selectedMainCategory === category.id
                  ? 'text-[#456EFE] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[20px] after:h-[3px] after:bg-[#456EFE] after:rounded-full'
                  : 'text-[#8E949A]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 如果是原料，系列选择全宽显示在顶部 */}
        {isMaterial && (
          <div className="w-full px-4 pt-3 pb-1 flex-none z-[5]">
             <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {subCategories.material.map((series) => (
                  <button
                    key={series}
                    onClick={() => {
                      setSelectedSubCategory(series);
                      setSelectedGrade(''); // 重置牌号，默认选中第一个
                    }}
                    className={`px-4 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors flex-none ${
                      selectedSubCategory === series
                        ? 'bg-[#E8F0FF] text-[#456EFE] font-medium'
                        : 'bg-white text-[#8E949A]'
                    }`}
                  >
                    {series}
                  </button>
                ))}
             </div>
          </div>
        )}

        <div className="flex-1 flex overflow-hidden">
          {/* 左侧侧边栏 */}
          <div className="w-16 bg-white overflow-y-auto flex-none pb-20 border-r border-gray-100">
            {leftSidebarItems.map((item) => {
              const isSelected = isMaterial 
                ? (activeGradeData?.grade === item)
                : (selectedSubCategory === item);
                
              return (
                <button
                  key={item}
                  onClick={() => {
                    if (isMaterial) {
                      setSelectedGrade(item);
                    } else {
                      setSelectedSubCategory(item);
                    }
                  }}
                  className={`w-full py-4 px-1 text-sm transition-all text-center ${
                    isSelected
                      ? 'text-[#23303B] font-medium bg-[#F9F9FB] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[16px] before:bg-[#456EFE] before:rounded-r'
                      : 'text-[#8E949A] bg-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1 overflow-y-auto p-4 pb-24">
            {isMaterial ? (
              // 原料页面布局
              <div className="flex flex-col h-full">
                {/* 选中牌号详情 */}
                {activeGradeData && (
                  <div className="bg-white rounded-2xl p-5 shadow-sm flex-1">
                    {/* 参数 */}
                    <div className="flex items-center gap-4 text-sm text-[#8E949A] mb-4">
                      <span>Br(kGs): <span className="text-[#23303B]">{activeGradeData.br}</span></span>
                      <span>Hcj(kOe): <span className="text-[#23303B]">{activeGradeData.hcj}</span></span>
                    </div>

                    {/* 毛坯价 */}
                    <div className="mb-6">
                      <div className="text-[#8E949A] text-sm mb-1">毛坯价</div>
                      <div className="text-[#456EFE] text-[24px] font-bold">¥ {activeGradeData.blankPrice.toLocaleString()}</div>
                    </div>

                    {/* 价格列表 */}
                    <div className="grid grid-cols-2 gap-3">
                      {activeGradeData.prices.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 rounded bg-[#F9F9FB]">
                          <span className="text-[#8E949A] text-xs">{item.range}</span>
                          <span className="text-[#23303B] text-sm font-medium">¥ {item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                          <h4 className="text-[#23303B] mb-2 truncate font-medium">{product.name}</h4>
                          <div className="space-y-1 mb-2">
                             <div className="flex items-center gap-2">
                               <p className="text-xs text-[#8E949A]">性能等级：<span className="text-[#23303B]">{product.grade || '-'}</span></p>
                               <p className="text-xs text-[#8E949A]">材质：<span className="text-[#23303B]">{product.material || '-'}</span></p>
                             </div>
                             <p className="text-xs text-[#8E949A]">尺寸：<span className="text-[#23303B]">{product.specs}</span></p>
                             <p className="text-xs text-[#8E949A]">表面处理：<span className="text-[#23303B]">{product.surface || '-'}</span></p>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div>
                              <span className="text-[#456EFE] text-lg font-bold">¥{product.price}</span>
                              <span className="text-xs text-[#A4A9AE] ml-0.5">/{product.unit}</span>
                            </div>
                          </div>
                        </div>
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
    </div>
  );
}