import { Search, Filter, ChevronRight, Package, Clock, CheckCircle, XCircle, Truck, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface Order {
  id: string;
  orderNumber: string;
  type: 'formal' | 'sample';
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  amount: number;
  quantity: number;
  performance: string;
  spec: string;
  coating: string;
  createTime: string;
  deliveryDate?: string;
}

interface OrderListPageProps {
  onViewDetail?: (orderId: string) => void;
  onBack?: () => void;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD20241201001',
    type: 'formal',
    status: 'processing',
    amount: 45063.00,
    quantity: 100,
    performance: 'N35',
    spec: 'R110*R80*W30*L300',
    coating: '镍铜镍',
    createTime: '2024-12-01 14:30',
    deliveryDate: '2024-12-15',
  },
  {
    id: '2',
    orderNumber: 'ORD20241130002',
    type: 'sample',
    status: 'shipping',
    amount: 8520.50,
    quantity: 50,
    performance: 'N42',
    spec: 'D50*H20',
    coating: '镀锌',
    createTime: '2024-11-30 10:20',
    deliveryDate: '2024-12-10',
  },
  {
    id: '3',
    orderNumber: 'ORD20241129003',
    type: 'formal',
    status: 'completed',
    amount: 125800.00,
    quantity: 500,
    performance: 'N48',
    spec: 'R80*R60*W25*L200',
    coating: '镀金',
    createTime: '2024-11-29 16:45',
    deliveryDate: '2024-12-05',
  },
  {
    id: '4',
    orderNumber: 'ORD20241128004',
    type: 'formal',
    status: 'pending',
    amount: 32400.00,
    quantity: 80,
    performance: 'N38',
    spec: 'D40*H15',
    coating: '环氧树脂',
    createTime: '2024-11-28 09:15',
  },
];

const statusConfig = {
  pending: { label: '待确认', color: 'text-[#F59E0B]', bgColor: 'bg-[#FEF3C7]', icon: Clock },
  processing: { label: '生产中', color: 'text-[#3B82F6]', bgColor: 'bg-[#DBEAFE]', icon: Package },
  shipping: { label: '配送中', color: 'text-[#8B5CF6]', bgColor: 'bg-[#EDE9FE]', icon: Truck },
  completed: { label: '已完成', color: 'text-[#10B981]', bgColor: 'bg-[#D1FAE5]', icon: CheckCircle },
  cancelled: { label: '已取消', color: 'text-[#EF4444]', bgColor: 'bg-[#FEE2E2]', icon: XCircle },
};

export default function OrderListPage({ onViewDetail, onBack }: OrderListPageProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilter, setShowFilter] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    const matchSearch = order.orderNumber.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                       order.performance.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-full bg-[#F9F9FB] pb-4">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-[rgba(164,169,174,0.15)] mb-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] pr-8">我的订单</h1>
      </div>

      {/* 搜索栏 */}
      <div className="bg-white px-4 py-4 mb-3">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A4A9AE]" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="搜索订单号或性能型号"
            className="w-full h-12 pl-12 pr-12 bg-[#F9F9FB] border border-[rgba(164,169,174,0.2)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
          />
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#456EFE]"
          >
            <Filter size={20} />
          </button>
        </div>

        {/* 筛选标签 */}
        {showFilter && (
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                selectedStatus === 'all'
                  ? 'bg-[#456EFE] text-white'
                  : 'bg-[#F9F9FB] text-[#8E949A]'
              }`}
            >
              全部
            </button>
            {Object.entries(statusConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedStatus(key)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedStatus === key
                    ? 'bg-[#456EFE] text-white'
                    : 'bg-[#F9F9FB] text-[#8E949A]'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 订单列表 */}
      <div className="px-4 space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F9F9FB] flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-[#A4A9AE]" />
            </div>
            <p className="text-[#8E949A]">暂无订单</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const statusInfo = statusConfig[order.status];
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={order.id}
                onClick={() => onViewDetail?.(order.id)}
                className="bg-white rounded-2xl p-4 active:opacity-80 transition-all"
              >
                {/* 订单头部 */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-[rgba(164,169,174,0.1)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#23303B]">{order.orderNumber}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.type === 'formal' ? 'bg-[#DBEAFE] text-[#3B82F6]' : 'bg-[#FEF3C7] text-[#F59E0B]'
                    }`}>
                      {order.type === 'formal' ? '正式单' : '样品单'}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${statusInfo.bgColor}`}>
                    <StatusIcon size={14} className={statusInfo.color} />
                    <span className={`text-xs ${statusInfo.color}`}>{statusInfo.label}</span>
                  </div>
                </div>

                {/* 订单内容 */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8E949A]">性能</span>
                    <span className="text-[#23303B]">{order.performance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8E949A]">规格</span>
                    <span className="text-[#23303B]">{order.spec}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8E949A]">数量</span>
                    <span className="text-[#23303B]">{order.quantity} 件</span>
                  </div>
                </div>

                {/* 订单底部 */}
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(164,169,174,0.1)]">
                  <div>
                    <div className="text-xs text-[#8E949A] mb-1">订单金额</div>
                    <div className="text-[#456EFE] text-lg">¥ {order.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</div>
                  </div>
                  <button className="flex items-center gap-1 text-[#456EFE] text-sm">
                    查看详情
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}