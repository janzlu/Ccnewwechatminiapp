import { useState } from 'react';
import { ChevronLeft, CreditCard, Smartphone, Landmark, CheckCircle2 } from 'lucide-react';

interface PaymentPageProps {
  onBack: () => void;
  onPaymentSuccess: () => void;
  orderData: {
    orderNo: string;
    total: number;
  };
}

const paymentMethods = [
  { id: 'wechat', name: '微信支付', icon: Smartphone, desc: '推荐使用' },
  { id: 'alipay', name: '支付宝', icon: CreditCard, desc: '快捷支付' },
  { id: 'bank', name: '银行转账', icon: Landmark, desc: '对公转账' },
];

export default function PaymentPage({ onBack, onPaymentSuccess, orderData }: PaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState('wechat');
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = () => {
    setIsPaying(true);
    // 模拟支付过程
    setTimeout(() => {
      setIsPaying(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="min-h-full bg-[#F9F9FB]">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="p-1 cursor-pointer" type="button">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] -ml-8">收银台</h1>
      </div>

      {/* 订单金额 */}
      <div className="bg-gradient-to-br from-[#456EFE] to-[#3A5ED9] p-6 text-center">
        <p className="text-white/80 text-sm mb-2">订单号: {orderData.orderNo}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-white text-sm">¥</span>
          <span className="text-white text-4xl">{orderData.total.toFixed(2)}</span>
        </div>
      </div>

      {/* 支付方式选择 */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-[#23303B] mb-3">选择支付方式</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all cursor-pointer ${
                  selectedMethod === method.id
                    ? 'bg-[#E8F0FF] border-2 border-[#456EFE]'
                    : 'bg-[#F5F6F8] border-2 border-transparent'
                }`}
                type="button"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedMethod === method.id ? 'bg-[#456EFE]' : 'bg-white'
                  }`}
                >
                  <IconComponent
                    size={24}
                    className={selectedMethod === method.id ? 'text-white' : 'text-[#456EFE]'}
                  />
                </div>
                <div className="flex-1 text-left">
                  <h4
                    className={`${
                      selectedMethod === method.id ? 'text-[#456EFE]' : 'text-[#23303B]'
                    }`}
                  >
                    {method.name}
                  </h4>
                  <p className="text-sm text-[#A4A9AE]">{method.desc}</p>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle2 size={24} className="text-[#456EFE]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 支付说明 */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-[#23303B] mb-3">支付说明</h3>
        <ul className="space-y-2 text-sm text-[#8E949A]">
          <li className="flex items-start gap-2">
            <span className="text-[#456EFE]">•</span>
            <span>请在30分钟内完成支付，超时订单将自动取消</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#456EFE]">•</span>
            <span>支付完成后，我们将在48小时内为您发货</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#456EFE]">•</span>
            <span>如遇问题请及时联系客服：400-123-4567</span>
          </li>
        </ul>
      </div>

      {/* 底部支付按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg border-t border-[#F0F1F5]">
        <button
          onClick={handlePay}
          disabled={isPaying}
          className="w-full h-12 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] disabled:bg-[#A4A9AE] flex items-center justify-center gap-2 cursor-pointer"
          type="button"
        >
          {isPaying ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>支付中...</span>
            </>
          ) : (
            <span>立即支付 ¥{orderData.total.toFixed(2)}</span>
          )}
        </button>
      </div>
    </div>
  );
}
