import { ChevronLeft, Package, MapPin, Phone, User, FileText, Calendar, Clock, MessageSquare, Download } from 'lucide-react';
import { useState } from 'react';

interface OrderDetailPageProps {
  orderId?: string;
  onBack?: () => void;
  onCancelOrder?: () => void;
}

// 模拟订单详情数据
const mockOrderDetail = {
  id: '1',
  orderNumber: 'ORD20241201001',
  type: 'formal' as const,
  status: 'processing' as const,
  amount: 45063.00,
  quantity: 100,
  unitPrice: 450.63,
  performance: 'N35',
  spec: 'R110*R80*W30*L300',
  coating: '镍铜镍',
  createTime: '2024-12-01 14:30',
  deliveryDate: '2024-12-15',
  remark: '请注意包装，避免磕碰',
  
  // 收货信息
  recipient: {
    name: '张三',
    phone: '138****8888',
    address: '广东省深圳市南山区科技园南区深圳湾科技生态园10栋A座',
  },

  // 生产进度
  progress: [
    { status: 'submitted', label: '订单提交', time: '2024-12-01 14:30', completed: true },
    { status: 'confirmed', label: '订单确认', time: '2024-12-01 15:20', completed: true },
    { status: 'production', label: '生产中', time: '2024-12-02 09:00', completed: true },
    { status: 'quality', label: '质检中', time: '', completed: false },
    { status: 'shipping', label: '待发货', time: '', completed: false },
  ],

  // 产品详情
  productDetails: {
    category: '方片',
    magnetizationHeight: '30',
    density: '7.6',
    profitRate: '10%',
    qualifiedRate: '97%',
  },

  // 附件
  attachments: [
    { name: '产品图纸.pdf', size: '2.3 MB', url: '#' },
  ],
};

const statusConfig = {
  pending: { label: '待确认', color: 'text-[#F59E0B]', bgColor: 'bg-[#FEF3C7]' },
  processing: { label: '生产中', color: 'text-[#3B82F6]', bgColor: 'bg-[#DBEAFE]' },
  shipping: { label: '配送中', color: 'text-[#8B5CF6]', bgColor: 'bg-[#EDE9FE]' },
  completed: { label: '已完成', color: 'text-[#10B981]', bgColor: 'bg-[#D1FAE5]' },
  cancelled: { label: '已取消', color: 'text-[#EF4444]', bgColor: 'bg-[#FEE2E2]' },
};

export default function OrderDetailPage({ orderId, onBack, onCancelOrder }: OrderDetailPageProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const order = mockOrderDetail;
  const statusInfo = statusConfig[order.status];

  const handleCancelOrder = () => {
    setShowCancelDialog(false);
    onCancelOrder?.();
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col pb-24">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-[rgba(164,169,174,0.15)]">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] pr-8">订单详情</h1>
      </div>

      {/* 滚动内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {/* 订单状态卡片 */}
        <div className="bg-white px-4 py-5 mb-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl text-[#23303B] mb-1">{order.orderNumber}</h2>
              <p className="text-sm text-[#8E949A]">{order.createTime}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${statusInfo.bgColor}`}>
              <span className={`text-sm ${statusInfo.color}`}>{statusInfo.label}</span>
            </div>
          </div>

          {/* 生产进度 */}
          <div className="bg-[#F9F9FB] rounded-xl p-4">
            <h3 className="text-[#23303B] mb-4 flex items-center gap-2">
              <Package size={18} className="text-[#456EFE]" />
              生产进度
            </h3>
            <div className="space-y-3">
              {order.progress.map((item, index) => (
                <div key={item.status} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.completed ? 'bg-[#456EFE]' : 'bg-[rgba(164,169,174,0.2)]'
                    }`}>
                      {item.completed && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    {index < order.progress.length - 1 && (
                      <div className={`w-[2px] h-8 ${
                        item.completed ? 'bg-[#456EFE]' : 'bg-[rgba(164,169,174,0.2)]'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className={`text-sm ${item.completed ? 'text-[#23303B]' : 'text-[#A4A9AE]'}`}>
                      {item.label}
                    </div>
                    {item.time && (
                      <div className="text-xs text-[#8E949A] mt-1">{item.time}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 订单信息 */}
        <div className="bg-white px-4 py-4 mb-3">
          <h3 className="text-[#23303B] mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#456EFE]" />
            订单信息
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">订单类型</span>
              <span className={`px-2 py-1 rounded text-xs ${
                order.type === 'formal' ? 'bg-[#DBEAFE] text-[#3B82F6]' : 'bg-[#FEF3C7] text-[#F59E0B]'
              }`}>
                {order.type === 'formal' ? '正式单' : '样品单'}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">性能</span>
              <span className="text-[#23303B]">{order.performance}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">规格</span>
              <span className="text-[#23303B]">{order.spec}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">镀层</span>
              <span className="text-[#23303B]">{order.coating}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">数量</span>
              <span className="text-[#23303B]">{order.quantity} 件</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
              <span className="text-[#8E949A]">单价</span>
              <span className="text-[#23303B]">¥ {order.unitPrice}</span>
            </div>
            {order.deliveryDate && (
              <div className="flex items-center justify-between py-2 border-b border-[rgba(164,169,174,0.1)]">
                <span className="text-[#8E949A]">期望交期</span>
                <span className="text-[#23303B]">{order.deliveryDate}</span>
              </div>
            )}
            {order.remark && (
              <div className="py-2">
                <div className="text-[#8E949A] mb-2">订单备注</div>
                <div className="text-[#23303B] bg-[#F9F9FB] rounded-lg p-3 text-sm">
                  {order.remark}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 收货信息 */}
        <div className="bg-white px-4 py-4 mb-3">
          <h3 className="text-[#23303B] mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-[#456EFE]" />
            收货信息
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User size={18} className="text-[#8E949A] mt-0.5" />
              <div>
                <div className="text-[#23303B]">{order.recipient.name}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={18} className="text-[#8E949A] mt-0.5" />
              <div>
                <div className="text-[#23303B]">{order.recipient.phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#8E949A] mt-0.5" />
              <div>
                <div className="text-[#23303B]">{order.recipient.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 附件 */}
        {order.attachments.length > 0 && (
          <div className="bg-white px-4 py-4 mb-3">
            <h3 className="text-[#23303B] mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#456EFE]" />
              订单附件
            </h3>
            
            <div className="space-y-2">
              {order.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-[#F9F9FB] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      <FileText size={20} className="text-[#456EFE]" />
                    </div>
                    <div>
                      <div className="text-sm text-[#23303B]">{file.name}</div>
                      <div className="text-xs text-[#8E949A]">{file.size}</div>
                    </div>
                  </div>
                  <button className="text-[#456EFE]">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 金额汇总 */}
        <div className="bg-white px-4 py-4 mb-3">
          <div className="flex items-center justify-between py-3 border-t border-[rgba(164,169,174,0.1)]">
            <span className="text-[#23303B]">订单总金额</span>
            <span className="text-[#456EFE] text-2xl">¥ {order.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      {/* 底部操作按钮 */}
      {order.status === 'pending' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-[rgba(164,169,174,0.15)]">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowCancelDialog(true)}
              className="h-14 bg-white text-[#EF4444] rounded-lg border-2 border-[#EF4444] transition-all active:opacity-90"
            >
              取消订单
            </button>
            <button
              className="h-14 bg-[#456EFE] text-white rounded-lg transition-all active:opacity-90"
            >
              联系客服
            </button>
          </div>
        </div>
      )}

      {order.status === 'processing' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-[rgba(164,169,174,0.15)]">
          <button
            className="w-full h-14 bg-[#456EFE] text-white rounded-lg transition-all active:opacity-90"
          >
            联系客服
          </button>
        </div>
      )}

      {order.status === 'shipping' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-4 border-t border-[rgba(164,169,174,0.15)]">
          <div className="grid grid-cols-2 gap-3">
            <button
              className="h-14 bg-white text-[#456EFE] rounded-lg border-2 border-[#456EFE] transition-all active:opacity-90"
            >
              查看物流
            </button>
            <button
              className="h-14 bg-[#456EFE] text-white rounded-lg transition-all active:opacity-90"
            >
              确认收货
            </button>
          </div>
        </div>
      )}

      {/* 取消订单对话框 */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-xl text-[#23303B] mb-2 text-center">确认取消订单？</h3>
            <p className="text-[#8E949A] text-center mb-6">取消后订单将无法恢复</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowCancelDialog(false)}
                className="h-12 bg-[#F9F9FB] text-[#23303B] rounded-lg transition-all active:opacity-90"
              >
                我再想想
              </button>
              <button
                onClick={handleCancelOrder}
                className="h-12 bg-[#EF4444] text-white rounded-lg transition-all active:opacity-90"
              >
                确认取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
