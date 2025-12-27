import { ChevronLeft, Upload, CheckCircle2, Check } from 'lucide-react';
import { useState } from 'react';

interface OrderConfirmPageProps {
  onBack?: () => void;
  onConfirmOrder?: () => void;
  onViewOrderDetail?: () => void;
  onBackHome?: () => void;
}

export default function OrderConfirmPage({ onBack, onConfirmOrder, onViewOrderDetail, onBackHome }: OrderConfirmPageProps) {
  const [orderType, setOrderType] = useState<'formal' | 'sample'>('formal');
  const [uploadedFile, setUploadedFile] = useState('');
  const [remark, setRemark] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleConfirmOrder = () => {
    setIsSubmitted(true);
    // 不立即调用父组件的回调，让成功画面显示
  };

  // 成功画面
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F9F9FB] flex flex-col">
        {/* 顶部导航栏 */}
        <div className="bg-white px-4 py-3 flex items-center border-b border-[rgba(164,169,174,0.15)]">
          <button onClick={onBack} className="p-1 -ml-1">
            <ChevronLeft size={24} className="text-[#23303B]" />
          </button>
          <h1 className="flex-1 text-center text-[#23303B] pr-8">订单提交成功</h1>
        </div>

        {/* 成功内容 */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24">
          {/* 成功图标 */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#22C55E] flex items-center justify-center mb-6 shadow-lg shadow-[rgba(34,197,94,0.3)]">
            <Check size={48} className="text-white" strokeWidth={3} />
          </div>

          {/* 成功标题 */}
          <h2 className="text-2xl text-[#23303B] mb-2">订单提交成功！</h2>
          <p className="text-[#8E949A] text-center mb-8">您的订单已成功提交，我们将尽快为您处理</p>

          {/* 订单信息卡片 */}
          <div className="w-full bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">订单编号</span>
              <span className="text-[#23303B]">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">订单类型</span>
              <span className="text-[#23303B]">{orderType === 'formal' ? '正式单' : '样品单'}</span>
            </div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">订单金额</span>
              <span className="text-[#456EFE] text-xl">¥ 45,063.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8E949A]">提交时间</span>
              <span className="text-[#23303B]">{new Date().toLocaleString('zh-CN', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}</span>
            </div>
          </div>

          {/* 操作按钮组 */}
          <div className="w-full space-y-3">
            <button
              onClick={onViewOrderDetail}
              className="w-full h-14 bg-[#456EFE] text-white rounded-lg transition-all active:opacity-90"
            >
              查看订单详情
            </button>
            <button
              onClick={onBackHome}
              className="w-full h-14 bg-white text-[#456EFE] rounded-lg border-2 border-[#456EFE] transition-all active:opacity-90"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-[rgba(164,169,174,0.15)]">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] pr-8">确认下单</h1>
      </div>

      {/* 滚动内容区域 */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* 订单类型 */}
        <div className="bg-white px-4 py-4 mb-3">
          <h3 className="text-[#23303B] mb-3">订单类型</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setOrderType('formal')}
              className={`h-12 rounded-lg border-2 transition-all ${
                orderType === 'formal'
                  ? 'border-[#456EFE] bg-[#456EFE] text-white'
                  : 'border-[rgba(164,169,174,0.2)] bg-white text-[#8E949A]'
              }`}
            >
              正式单
            </button>
            <button
              onClick={() => setOrderType('sample')}
              className={`h-12 rounded-lg border-2 transition-all ${
                orderType === 'sample'
                  ? 'border-[#456EFE] bg-[#456EFE] text-white'
                  : 'border-[rgba(164,169,174,0.2)] bg-white text-[#8E949A]'
              }`}
            >
              样品单
            </button>
          </div>
        </div>

        {/* 订单详情 */}
        <div className="bg-white px-4 py-4 mb-3">
          <h3 className="text-[#23303B] mb-4">订单详情</h3>
          
          <div className="space-y-3">
            {/* 性能 */}
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">性能</span>
              <span className="text-[#23303B]">N35</span>
            </div>

            {/* 规格 */}
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">规格</span>
              <span className="text-[#23303B]">R110*R80*W30*L300</span>
            </div>

            {/* 镀层 */}
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">镀层</span>
              <span className="text-[#23303B]">镍铜镍</span>
            </div>

            {/* 数量 */}
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">数量</span>
              <span className="text-[#23303B]">100 件</span>
            </div>

            {/* 单价 */}
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">单价</span>
              <span className="text-[#23303B]">¥ 450.63</span>
            </div>

            {/* 总价 */}
            <div className="flex items-center justify-between py-3 bg-[#F9F9FB] rounded-lg px-3 mt-3">
              <span className="text-[#23303B]">订单总金额</span>
              <span className="text-[#456EFE] text-2xl">¥ 45,063.00</span>
            </div>
          </div>
        </div>

        {/* 附加信息 - 可录入表单 */}
        <div className="bg-white px-4 py-4 mb-3">
          <h3 className="text-[#23303B] mb-4">附加信息</h3>

          {/* 图纸上传 */}
          <div className="mb-4">
            <label className="text-sm text-[#8E949A] mb-2 block">图纸上传</label>
            <div className="relative">
              <input
                type="text"
                value={uploadedFile}
                onChange={(e) => setUploadedFile(e.target.value)}
                placeholder="支持PDF、CAD格式"
                className="w-full h-12 px-4 pr-12 bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#456EFE]">
                <Upload size={20} />
              </button>
            </div>
          </div>

          {/* 备注 */}
          <div className="mb-4">
            <label className="text-sm text-[#8E949A] mb-2 block">订单备注（选填）</label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="请输入订单备注信息"
              rows={3}
              className="w-full px-4 py-3 bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE] resize-none"
            />
          </div>

          {/* 期望交期 */}
          <div>
            <label className="text-sm text-[#8E949A] mb-2 block">期望交期</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full h-12 px-4 bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded-lg text-[#23303B]"
            />
          </div>
        </div>
      </div>

      {/* 底部确认按钮 - 固定 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-[rgba(164,169,174,0.15)]">
        <button
          onClick={handleConfirmOrder}
          className="w-full h-14 bg-[#456EFE] text-white rounded-lg transition-all active:opacity-90"
        >
          确认下单
        </button>
      </div>
    </div>
  );
}