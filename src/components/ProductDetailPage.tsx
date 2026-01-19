import { useState } from "react";
import {
  ChevronLeft,
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  Shield,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductDetailPageProps {
  productId: number;
  onBack: () => void;
  onBuyNow: (productId: number, quantity: number) => void;
}

// 模拟商品详情数据
const productDetail = {
  id: 1,
  name: "N35",
  specs: "64×54×39mm",
  price: 173, // 基础价格
  tieredPrices: [
    { min: 1, max: 100, price: 0.85 },
    { min: 101, max: 500, price: 0.8 },
    { min: 501, max: 1000, price: 0.75 },
    { min: 1001, max: Infinity, price: 0.7 },
  ],
  // 规格价格表（按尺寸范围）
  specPriceTable: [
    { range: "> D25", price: 171 },
    { range: "D20-D24.9", price: 176 },
    { range: "D16-D19.9", price: 181 },
    { range: "D13-D15.9", price: 192 },
    { range: "D10-D12.9", price: 198 },
    { range: "D8-D9.9", price: 213 },
    { range: "D7-D7.9", price: 224 },
    { range: "D6-D6.9", price: 229 },
    { range: "D5-D5.9", price: 239 },
    { range: "D4-D4.9", price: 245 },
    { range: "D3-D3.9", price: 253 },
    { range: "D2-D2.9", price: 332 },
    { range: "D1-D1.9", price: 770 },
    { range: "D0.5-D0.9", price: 1084 },
  ],
  unit: "件",
  stock: 5600,
  category: "finished",
  subCategory: "方片",
  images: [
    "https://images.unsplash.com/photo-1596877454778-9103606a5349?w=600",
    "https://images.unsplash.com/photo-1640184713828-5de60cad7a2c?w=600",
    "https://images.unsplash.com/photo-1655890954744-c9650a3b570d?w=600",
  ],
  description:
    "高性能钕铁硼永磁材料，适用于各种工业和消费电子产品。具有优异的磁性能和稳定性。",
  parameters: {
    牌号: "N35",
    长度: "64mm",
    宽度: "54mm",
    磁化高度: "39mm",
    数量: "5600个",
    单重: "1024.359g",
    "总重量（公斤）": "3134.337kg",
    "单价（单个/元）": "172元",
    "单价（公斤/元）": "171.215元/kg",
    原料密度: "7.6",
    "Br": "12.5 kGs",
    "Hcj": "14.6 kOe",
    BH: "37.3",
    HK: "98.60%",
  },
  services: [
    { icon: Shield, text: "量大价优" },
    { icon: Truck, text: "现货供应" },
    { icon: Check, text: "按时交付" },
  ],
};

export default function ProductDetailPage({
  productId,
  onBack,
  onBuyNow,
}: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<
    string | null
  >(null); // 改为单选

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (
      newQuantity >= 1 &&
      newQuantity <= productDetail.stock
    ) {
      setQuantity(newQuantity);
    }
  };

  // 选择规格（单选）
  const selectSpec = (range: string) => {
    setSelectedSpec(range);
  };

  // 计算当前价格和总金额
  const getCurrentPrice = () => {
    if (selectedSpec) {
      const spec = productDetail.specPriceTable.find(
        (s) => s.range === selectedSpec,
      );
      return spec ? spec.price : 173;
    }
    return 173; // 默认价格
  };

  const totalAmount = getCurrentPrice() * quantity;

  return (
    <div className="min-h-full bg-[#F9F9FB] pb-20">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-2 -ml-2 cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px] relative z-30"
          type="button"
        >
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] -ml-8">
          商品详情
        </h1>
        <div className="flex items-center gap-2"></div>
      </div>

      {/* 商品基本信息 */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-[#23303B] text-lg mb-2 font-bold border-l-4 border-[#456EFE] pl-3 py-1 bg-gradient-to-r from-[#456EFE]/5 to-transparent">
              {productDetail.name}
            </h2>
            <p className="text-sm text-[#A4A9AE]">
              规格: {productDetail.specs}
            </p>
          </div>
          <div className="text-[#456EFE] text-2xl ml-4 text-[16px] font-normal font-bold flex items-baseline gap-1">
            <span>¥ 173</span>
            <span className="text-xs text-[#A4A9AE] font-normal">毛坯价</span>
          </div>
        </div>

        {/* 可选规格（替换原来的阶梯价格） */}
        <div className="mb-3">
          <h3 className="text-[#23303B] mb-2 text-sm font-medium">定制选择</h3>
          <div className="grid grid-cols-3 gap-2">
            {productDetail.specPriceTable.map((item, index) => {
              const isSelected = selectedSpec === item.range;
              return (
                <button
                  key={index}
                  onClick={() => selectSpec(item.range)}
                  className={`relative flex flex-col items-center justify-center py-2 px-2 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#E8F0FF] border-[#456EFE]"
                      : "bg-[#F9F9FB] border-[#F0F1F5] hover:border-[#456EFE]/30"
                  }`}
                  type="button"
                >
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-[#456EFE] rounded-full flex items-center justify-center">
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                  )}
                  <span
                    className={`text-xs ${isSelected ? "text-[#456EFE]" : "text-[#8E949A]"}`}
                  >
                    {item.range}
                  </span>
                  <span
                    className={`text-xs font-medium mt-0.5 ${isSelected ? "text-[#456EFE]" : "text-[#23303B]"}`}
                  >
                    ¥ {item.price}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-sm text-[#A4A9AE] mt-2">
          库存: {productDetail.stock.toLocaleString()}
          {productDetail.unit}
        </p>
      </div>

      {/* 商品参数 */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-[#23303B] mb-3">商品参数</h3>
        <div className="space-y-2">
          {Object.entries(productDetail.parameters).map(
            ([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-[#F0F1F5] last:border-0"
              >
                <span className="text-sm text-[#8E949A]">
                  {key}
                </span>
                <span className="text-sm text-[#23303B]">
                  {value}
                </span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* 测试报告 */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-[#23303B] mb-3">测试报告</h3>
        <div className="w-full rounded-lg overflow-hidden bg-white border border-[#E8EAED] p-4">
          <svg
            width="100%"
            height="240"
            viewBox="0 0 400 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            {/* 网格线 */}
            <line
              x1="40"
              y1="200"
              x2="40"
              y2="20"
              stroke="#E8EAED"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="200"
              x2="380"
              y2="200"
              stroke="#E8EAED"
              strokeWidth="1"
            />

            {/* 水平网格线 */}
            <line
              x1="40"
              y1="50"
              x2="380"
              y2="50"
              stroke="#F0F1F5"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="40"
              y1="100"
              x2="380"
              y2="100"
              stroke="#F0F1F5"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="40"
              y1="150"
              x2="380"
              y2="150"
              stroke="#F0F1F5"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Y轴刻度文字 */}
            <text
              x="25"
              y="55"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="end"
            >
              1.2
            </text>
            <text
              x="25"
              y="105"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="end"
            >
              0.8
            </text>
            <text
              x="25"
              y="155"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="end"
            >
              0.4
            </text>
            <text
              x="25"
              y="205"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="end"
            >
              0
            </text>

            {/* X轴刻度文字 */}
            <text
              x="80"
              y="220"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="middle"
            >
              200
            </text>
            <text
              x="160"
              y="220"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="middle"
            >
              400
            </text>
            <text
              x="240"
              y="220"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="middle"
            >
              600
            </text>
            <text
              x="320"
              y="220"
              fill="#A4A9AE"
              fontSize="12"
              textAnchor="middle"
            >
              800
            </text>

            {/* 曲线路径 */}
            <path
              d="M 50 180 L 100 140 L 150 80 L 200 40 L 250 45 L 300 70 L 350 90"
              stroke="#456EFE"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 数据点 */}
            <circle cx="50" cy="180" r="5" fill="#456EFE" />
            <circle cx="100" cy="140" r="5" fill="#456EFE" />
            <circle cx="150" cy="80" r="5" fill="#456EFE" />
            <circle cx="200" cy="40" r="5" fill="#456EFE" />
            <circle cx="250" cy="45" r="5" fill="#456EFE" />
            <circle cx="300" cy="70" r="5" fill="#456EFE" />
            <circle cx="350" cy="90" r="5" fill="#456EFE" />

            {/* 轴标签 */}
            <text
              x="200"
              y="235"
              fill="#8E949A"
              fontSize="13"
              textAnchor="middle"
            >
              H (kA/m)
            </text>
            <text
              x="15"
              y="120"
              fill="#8E949A"
              fontSize="13"
              textAnchor="middle"
              transform="rotate(-90 15 120)"
            >
              B (T)
            </text>
          </svg>
        </div>
        <p className="text-xs text-[#8E949A] mt-2 text-center">
          磁化曲线测试报告
        </p>
      </div>

      {/* 服务保障 */}
      <div className="bg-white mt-2 p-4 mb-28">
        <div className="flex items-center justify-around">
          {productDetail.services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-1"
              >
                <IconComponent
                  size={20}
                  className="text-[#456EFE]"
                />
                <span className="text-xs text-[#8E949A]">
                  {service.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-lg border-t border-[#F0F1F5]">
        {/* 数量和总金额 */}
        <div className="flex items-center justify-between mb-3">
          {/* 数量选择器 */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8E949A]">数量</span>
            <div className="flex items-center border border-[#E8EAED] rounded-lg overflow-hidden">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-10 h-10 flex items-center justify-center text-[#8E949A] disabled:opacity-30 cursor-pointer bg-[#F9F9FB] border-r border-[#E8EAED]"
                type="button"
              >
                <Minus size={16} />
              </button>
              <input
                type="number"
                value={quantity === 0 ? "" : quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setQuantity(0);
                  } else {
                    const num = parseInt(val);
                    if (!isNaN(num)) setQuantity(num);
                  }
                }}
                onBlur={() => {
                  if (quantity < 1) setQuantity(1);
                  else if (quantity > productDetail.stock)
                    setQuantity(productDetail.stock);
                }}
                className="w-16 h-10 text-center text-[#23303B] bg-white outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= productDetail.stock}
                className="w-10 h-10 flex items-center justify-center text-[#456EFE] disabled:opacity-30 cursor-pointer bg-[#F9F9FB] border-l border-[#E8EAED]"
                type="button"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* 总金额 */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm text-[#8E949A]">总计</span>
            <span className="text-2xl text-[#456EFE] text-[18px] font-bold font-normal">
              ¥{totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* 操作按钮 */}
        <button
          onClick={() => onBuyNow(productDetail.id, quantity)}
          className="w-full h-11 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] cursor-pointer font-medium"
          type="button"
        >
          立即购买
        </button>
      </div>
    </div>
  );
}