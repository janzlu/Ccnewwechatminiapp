import { CheckCircle, Phone, Home } from 'lucide-react';

interface SellSuccessPageProps {
  onBackHome: () => void;
}

export default function SellSuccessPage({ onBackHome }: SellSuccessPageProps) {
  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col items-center justify-center px-4">
      {/* 成功图标 */}
      <div className="mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#13C999] to-[#0EA976] rounded-full flex items-center justify-center shadow-lg">
          <CheckCircle size={48} className="text-white" strokeWidth={2.5} />
        </div>
      </div>

      {/* 成功标题 */}
      <h1 className="text-2xl text-[#23303B] mb-3">提交成功！</h1>
      <p className="text-[#8E949A] text-center mb-8">
        您的卖货信息已成功提交<br />
        我们将在1-2个工作日内与您联系
      </p>

      {/* 信息卡片 */}
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#E8F0FF] rounded-full flex items-center justify-center">
            <Phone size={24} className="text-[#456EFE]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[#23303B] mb-1">客服热线</h3>
            <p className="text-[#456EFE] text-lg">400-123-4567</p>
          </div>
        </div>
        
        <div className="bg-[#F9F9FB] rounded-lg p-4">
          <h4 className="text-sm text-[#23303B] mb-2">后续流程</h4>
          <div className="space-y-2 text-xs text-[#8E949A]">
            <div className="flex gap-2">
              <span className="flex-shrink-0">1.</span>
              <span>客服人员将会审核您提交的产品信息</span>
            </div>
            <div className="flex gap-2">
              <span className="flex-shrink-0">2.</span>
              <span>审核通过后，客服会联系您确认详细信息</span>
            </div>
            <div className="flex gap-2">
              <span className="flex-shrink-0">3.</span>
              <span>双方确认无误后，进行交易对接</span>
            </div>
          </div>
        </div>
      </div>

      {/* 温馨提示 */}
      <div className="w-full max-w-sm bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] rounded-xl p-4 mb-8 border border-[#FED7AA]">
        <h4 className="text-[#EA580C] mb-2 text-sm">温馨提示</h4>
        <p className="text-xs text-[#9A3412]">
          请保持手机畅通，以便我们及时与您联系。如需修改信息或有任何疑问，请拨打客服热线。
        </p>
      </div>

      {/* 底部按钮 */}
      <div className="w-full max-w-sm space-y-3">
        <button
          onClick={onBackHome}
          className="w-full h-12 bg-gradient-to-r from-[#456EFE] to-[#2B6CFF] text-white rounded-lg transition-all active:opacity-90 flex items-center justify-center gap-2"
        >
          <Home size={20} />
          返回首页
        </button>
      </div>
    </div>
  );
}
