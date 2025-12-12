import { useState } from 'react';
import { ChevronLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

interface ShoppingCartPageProps {
  onBack: () => void;
  onCheckout: (selectedItems: any[]) => void;
}

// 模拟购物车数据
const initialCartItems = [
  {
    id: 1,
    name: 'N35 钕铁硼方片',
    specs: '10×10×5mm',
    price: 0.85,
    quantity: 100,
    stock: 10000,
    image: 'https://images.unsplash.com/photo-1596877454778-9103606a5349?w=200',
    selected: true,
  },
  {
    id: 2,
    name: 'N52 钕铁硼圆片',
    specs: 'D20×3mm',
    price: 1.2,
    quantity: 50,
    stock: 8500,
    image: 'https://images.unsplash.com/photo-1733309730239-1d2b723eb807?w=200',
    selected: true,
  },
  {
    id: 3,
    name: 'N38 钕铁硼圆环',
    specs: 'D30×D15×5mm',
    price: 2.5,
    quantity: 30,
    stock: 5000,
    image: 'https://images.unsplash.com/photo-1640184713828-5de60cad7a2c?w=200',
    selected: false,
  },
];

export default function ShoppingCartPage({ onBack, onCheckout }: ShoppingCartPageProps) {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // 更新数量
  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + delta;
          if (newQuantity >= 1 && newQuantity <= item.stock) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  // 切换选中状态
  const toggleItemSelection = (id: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  // 全选/取消全选
  const toggleAllSelection = () => {
    const newSelectedState = !isAllSelected;
    setIsAllSelected(newSelectedState);
    setCartItems((items) => items.map((item) => ({ ...item, selected: newSelectedState })));
  };

  // 删除商品
  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // 计算总价
  const selectedItems = cartItems.filter((item) => item.selected);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-full bg-[#F9F9FB] pb-32">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="p-1 cursor-pointer" type="button">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] -ml-8">购物车</h1>
        <span className="text-sm text-[#A4A9AE]">({cartItems.length})</span>
      </div>

      {cartItems.length === 0 ? (
        /* 空购物车 */
        <div className="flex flex-col items-center justify-center h-96">
          <ShoppingBag size={80} className="text-[#A4A9AE] mb-4" />
          <p className="text-[#A4A9AE] mb-6">购物车空空如也</p>
          <button
            onClick={onBack}
            className="px-8 h-11 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] cursor-pointer"
            type="button"
          >
            去逛逛
          </button>
        </div>
      ) : (
        <>
          {/* 购物车列表 */}
          <div className="p-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-4">
                <div className="flex gap-3">
                  {/* 选择框 */}
                  <button
                    onClick={() => toggleItemSelection(item.id)}
                    className="w-6 h-6 flex-none cursor-pointer"
                    type="button"
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.selected
                          ? 'bg-[#456EFE] border-[#456EFE]'
                          : 'border-[#A4A9AE]'
                      }`}
                    >
                      {item.selected && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {/* 商品图片 */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[#F5F6F8]"
                  />

                  {/* 商品信息 */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#23303B] mb-1 truncate">{item.name}</h4>
                    <p className="text-sm text-[#A4A9AE] mb-2">规格: {item.specs}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#456EFE]">¥{item.price}</span>
                      {/* 数量控制 */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 rounded-full bg-[#F5F6F8] flex items-center justify-center text-[#8E949A] disabled:opacity-30 cursor-pointer"
                          type="button"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-12 text-center text-[#23303B] text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-7 h-7 rounded-full bg-[#456EFE] flex items-center justify-center text-white disabled:opacity-30 cursor-pointer"
                          type="button"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 删除按钮 */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 cursor-pointer"
                    type="button"
                  >
                    <Trash2 size={18} className="text-[#A4A9AE]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 底部结算栏 */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-lg border-t border-[#F0F1F5]">
          <div className="flex items-center gap-4 mb-3">
            {/* 全选 */}
            <button
              onClick={toggleAllSelection}
              className="flex items-center gap-2 cursor-pointer"
              type="button"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isAllSelected
                    ? 'bg-[#456EFE] border-[#456EFE]'
                    : 'border-[#A4A9AE]'
                }`}
              >
                {isAllSelected && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-[#23303B]">全选</span>
            </button>

            {/* 总价 */}
            <div className="flex-1 text-right">
              <div className="text-xs text-[#8E949A] mb-1">
                已选 {selectedItems.length} 件商品，共 {totalQuantity} 个
              </div>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-sm text-[#23303B]">合计:</span>
                <span className="text-[#456EFE] text-xl">¥{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* 结算按钮 */}
            <button
              onClick={() => onCheckout(selectedItems)}
              disabled={selectedItems.length === 0}
              className="px-6 h-11 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] disabled:bg-[#A4A9AE] disabled:cursor-not-allowed cursor-pointer"
              type="button"
            >
              结算
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
