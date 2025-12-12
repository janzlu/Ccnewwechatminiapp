import { useState } from 'react';
import {
  MoreHorizontal,
  User,
  HelpCircle,
  Wallet,
  Truck,
  CheckCircle,
  MapPin,
  Ticket,
  Edit,
  Headphones,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface ProfilePageProps {
  onNavigate?: (page: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'payment' | 'reservation'>('payment');
  return (
    <div className="min-h-full bg-[#F9F9FB]">
      {/* 顶部渐变区域 */}
      <div className="bg-gradient-to-br from-[#5B8CFF] to-[#4A7BFF] px-4 pt-6 pb-20 relative">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-xl">个人中心</h1>
          <button className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <MoreHorizontal size={20} className="text-white" />
          </button>
        </div>

        {/* 用户信息 */}
        <div className="flex items-center gap-4 -mt-[15px]">
          <div className="w-20 h-20 rounded-full bg-white/30 border-4 border-white/40 flex items-center justify-center">
            <User size={40} className="text-white" />
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-xl mb-1">18969817289</h2>
            <p className="text-sm opacity-80">- 未有签名 -</p>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="px-4 -mt-24">
        {/* 积分卡片 */}
        <div className="bg-[#1E2530] rounded-2xl p-5 mb-4 shadow-lg relative z-10 mt-[35px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-[#FFB800] rounded-full"></div>
            <span className="text-white">我的积分</span>
            <HelpCircle size={18} className="text-white/60" />
          </div>
          <div className="text-white text-5xl text-[36px]">0.00</div>
        </div>

        {/* 订单区域 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          {/* 我的订单标题 */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#23303B]">我的订单</h3>
            <button
              onClick={() => onNavigate && onNavigate('orderList')}
              className="flex items-center gap-1 text-sm text-[#456EFE]"
            >
              全部订单
              <ChevronRight size={16} />
            </button>
          </div>

          {/* 订单标签 */}
          <div className="flex gap-3 mb-5">
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex-1 py-3 rounded-xl text-[#23303B] transition-colors ${
                activeTab === 'payment' ? 'bg-[#F5F5F5]' : 'bg-transparent'
              }`}
            >
              支付订单
            </button>
            <button
              onClick={() => setActiveTab('reservation')}
              className={`flex-1 py-3 rounded-xl text-[#23303B] transition-colors ${
                activeTab === 'reservation' ? 'bg-[#F5F5F5]' : 'bg-transparent'
              }`}
            >
              预定订单
            </button>
          </div>

          {/* 订单状态 */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate && onNavigate('orderList')}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
                <Wallet size={24} className="text-[#23303B]" />
              </div>
              <span className="text-sm text-[#23303B]">待付款</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('orderList')}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
                <Truck size={24} className="text-[#23303B]" />
              </div>
              <span className="text-sm text-[#23303B]">待收货</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('orderList')}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
                <CheckCircle size={24} className="text-[#23303B]" />
              </div>
              <span className="text-sm text-[#23303B]">已完成</span>
            </button>
          </div>
        </div>

        {/* 其他功能 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={() => onNavigate && onNavigate('address')}
            className="w-full flex items-center gap-3 px-4 py-4 border-b border-[rgba(164,169,174,0.1)]"
          >
            <MapPin size={22} className="text-[#23303B]" />
            <span className="flex-1 text-left text-[#23303B]">地址管理</span>
            <ChevronRight size={20} className="text-[#A4A9AE]" />
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-4 border-b border-[rgba(164,169,174,0.1)]">
            <Ticket size={22} className="text-[#23303B]" />
            <span className="flex-1 text-left text-[#23303B]">优惠券</span>
            <ChevronRight size={20} className="text-[#A4A9AE]" />
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-4 border-b border-[rgba(164,169,174,0.1)]">
            <Edit size={22} className="text-[#23303B]" />
            <span className="flex-1 text-left text-[#23303B]">编辑资料</span>
            <ChevronRight size={20} className="text-[#A4A9AE]" />
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-4">
            <Headphones size={22} className="text-[#23303B]" />
            <span className="flex-1 text-left text-[#23303B]">联系客服</span>
            <ChevronRight size={20} className="text-[#A4A9AE]" />
          </button>
        </div>

        {/* 底部间距 */}
        <div className="h-6"></div>
      </div>
    </div>
  );
}