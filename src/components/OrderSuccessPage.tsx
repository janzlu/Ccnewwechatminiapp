import { CheckCircle2, Package, Home } from 'lucide-react';

interface OrderSuccessPageProps {
  onViewOrder: () => void;
  onBackHome: () => void;
  orderNo: string;
}

export default function OrderSuccessPage({ onViewOrder, onBackHome, orderNo }: OrderSuccessPageProps) {
  return (
    <div className="min-h-full bg-[#F9F9FB] flex flex-col items-center justify-center p-4">
      {/* 成功图标 */}
      <div className="w-24 h-24 rounded-full bg-[#E8F0FF] flex items-center justify-center mb-6">
        <CheckCircle2 size={64} className="text-[#456EFE]" />
      </div>

      {/* 成功信息 */}
      <h1 className="text-[#23303B] text-xl mb-2">支付成功</h1>
      <p className="text-[#8E949A] text-sm mb-8">订单号: {orderNo}</p>

      {/* 提示信息 */}
      <div className="w-full max-w-md bg-white rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Package size={20} className="text-[#456EFE] flex-none mt-0.5" />
          <div>
            <h3 className="text-[#23303B] mb-1">订单已提交</h3>
            <p className="text-sm text-[#8E949A]">我们将在48小时内为您发货，请耐心等待</p>
          </div>
        </div>
        <div className="border-t border-[#F0F1F5] pt-4">
          <p className="text-sm text-[#8E949A]">
            您可以在"我的订单"中查看订单详情和物流信息
          </p>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="w-full max-w-md space-y-3">
        <button
          onClick={onViewOrder}
          className="w-full h-12 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] cursor-pointer"
          type="button"
        >
          查看订单
        </button>
        <button
          onClick={onBackHome}
          className="w-full h-12 bg-white text-[#456EFE] rounded-lg border-2 border-[#456EFE] transition-all hover:bg-[#E8F0FF] flex items-center justify-center gap-2 cursor-pointer"
          type="button"
        >
          <Home size={20} />
          返回首页
        </button>
      </div>
    </div>
  );
}
