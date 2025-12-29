import { useState } from 'react';
import { ChevronLeft, Heart, Share2, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  productId: number;
  onBack: () => void;
  onBuyNow: (productId: number, quantity: number) => void;
}

// 模拟商品详情数据
const productDetail = {
  id: 1,
  name: 'N35 钕铁硼方片',
  specs: '10×10×5mm',
  price: 0.85, // 基础价格，由于现在有阶梯价格，这个字段可能主要用于列表页显示或作为默认值
  tieredPrices: [
    { min: 1, max: 100, price: 0.85 },
    { min: 101, max: 500, price: 0.80 },
    { min: 501, max: 1000, price: 0.75 },
    { min: 1001, max: Infinity, price: 0.70 },
  ],
  unit: '件',
  stock: 10000,
  category: 'finished',
  subCategory: '方片',
  images: [
    'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=600',
    'https://images.unsplash.com/photo-1640184713828-5de60cad7a2c?w=600',
    'https://images.unsplash.com/photo-1655890954744-c9650a3b570d?w=600',
  ],
  description: '高性能钕铁硼永磁材料，适用于各种工业和消费电子产品。具有优异的磁性能和稳定性。',
  parameters: {
    性能等级: 'N35',
    材质: '钕铁硼',
    形状: '方片',
    尺寸: '10×10×5mm',
    表面处理: '镀镍',
    磁化方向: '厚度方向',
    工作温度: '≤80°C',
    剩磁: '11.7-12.2 kGs',
    矫顽力: '≥11.0 kOe',
  },
  services: [
    { icon: Shield, text: '品质保证' },
    { icon: Truck, text: '按约定时间发货' },
    { icon: RotateCcw, text: '质量问题退换' },
  ],
};

export default function ProductDetailPage({ productId, onBack, onBuyNow }: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= productDetail.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-full bg-[#F9F9FB] pb-20">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="p-1 cursor-pointer" type="button">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] -ml-8">商品详情</h1>
        <div className="flex items-center gap-2">
        </div>
      </div>

      {/* 商品图片轮播 */}
      <div className="bg-white">
        <div className="relative aspect-square">
          <ImageWithFallback
            src={productDetail.images[currentImageIndex]}
            alt={productDetail.name}
            className="w-full h-full object-cover"
          />
          {/* 图片指示器 */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {productDetail.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === index ? 'bg-[#456EFE] w-6' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 商品基本信息 */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-[#23303B] text-lg mb-2">{productDetail.name}</h2>
            <p className="text-sm text-[#A4A9AE]">规格: {productDetail.specs}</p>
          </div>
          
        </div>

        {/* 阶梯价格展示 */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {productDetail.tieredPrices.map((tier, index) => {
            const isCurrentTier = quantity >= tier.min && (tier.max === Infinity ? true : quantity <= tier.max);
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-colors ${
                  isCurrentTier 
                    ? 'bg-[#E8F0FF] border-[#456EFE]' 
                    : 'bg-[#F9F9FB] border-transparent'
                }`}
              >
                <span className={`text-xs mb-1 ${isCurrentTier ? 'text-[#456EFE]' : 'text-[#8E949A]'}`}>
                  {tier.max === Infinity ? `> ${tier.min - 1}` : `${tier.min}-${tier.max}`}
                </span>
                <span className={`text-sm font-bold font-mono ${isCurrentTier ? 'text-[#456EFE]' : 'text-[#23303B]'}`}>
                  ¥{tier.price}
                </span>
              </div>
            );
          })}
        </div>
        
        <p className="text-sm text-[#A4A9AE] mt-2">库存: {productDetail.stock.toLocaleString()}{productDetail.unit}</p>
      </div>

      {/* 服务保障 */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-around">
          {productDetail.services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="flex flex-col items-center gap-1">
                <IconComponent size={20} className="text-[#456EFE]" />
                <span className="text-xs text-[#8E949A]">{service.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 商品描述 */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-[#23303B] mb-3">商品描述</h3>
        <p className="text-sm text-[#8E949A] leading-relaxed">{productDetail.description}</p>
      </div>

      {/* 商品参数 */}
      <div className="bg-white mt-2 p-4 mb-2">
        <h3 className="text-[#23303B] mb-3">商品参数</h3>
        <div className="space-y-2">
          {Object.entries(productDetail.parameters).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-[#F0F1F5] last:border-0">
              <span className="text-sm text-[#8E949A]">{key}</span>
              <span className="text-sm text-[#23303B]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-lg border-t border-[#F0F1F5]">
        <div className="flex items-center gap-3">
          {/* 数量选择器 */}
          <div className="flex items-center gap-2 bg-[#F5F6F8] rounded-lg px-3 py-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-6 h-6 flex items-center justify-center text-[#8E949A] disabled:opacity-30 cursor-pointer"
              type="button"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              value={quantity === 0 ? '' : quantity}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  setQuantity(0);
                } else {
                  const num = parseInt(val);
                  if (!isNaN(num)) setQuantity(num);
                }
              }}
              onBlur={() => {
                if (quantity < 1) setQuantity(1);
                else if (quantity > productDetail.stock) setQuantity(productDetail.stock);
              }}
              className="w-12 text-center text-[#23303B] bg-transparent outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= productDetail.stock}
              className="w-6 h-6 flex items-center justify-center text-[#456EFE] disabled:opacity-30 cursor-pointer"
              type="button"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* 操作按钮 */}
          <button
            onClick={() => onBuyNow(productDetail.id, quantity)}
            className="flex-1 h-11 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] cursor-pointer"
            type="button"
          >
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
}
