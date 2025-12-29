import { ArrowLeft, Users, FileText, Banknote, QrCode, ChevronRight, Wallet } from 'lucide-react';

interface DistributionCenterPageProps {
  onBack: () => void;
  onNavigateToRecords: () => void;
  onNavigateToTeam: () => void;
  onNavigateToPoster: () => void;
  onNavigateToWithdraw: () => void;
}

export default function DistributionCenterPage({ 
  onBack, 
  onNavigateToRecords,
  onNavigateToTeam,
  onNavigateToPoster,
  onNavigateToWithdraw
}: DistributionCenterPageProps) {
  return (
    <div className="min-h-full bg-[#F5F6F8] flex flex-col">
      {/* 顶部背景 */}
      <div className="bg-[#456EFE] text-white pt-6 pb-12 px-4 relative">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-medium">分销中心</h1>
        </div>

        {/* 佣金卡片 */}
        <div className="flex flex-col items-center">
          <span className="text-white/80 text-sm mb-1">可提现佣金(元)</span>
          <span className="text-4xl font-bold mb-4">1,280.00</span>
          <button 
            onClick={onNavigateToWithdraw}
            className="px-6 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30"
          >
            立即提现
          </button>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="mx-4 -mt-6 bg-white rounded-xl shadow-sm p-4 flex justify-between relative z-10 mb-4">
        <div className="flex flex-col items-center flex-1 border-r border-gray-100">
          <span className="text-[#8E949A] text-xs mb-1">累计佣金</span>
          <span className="text-[#23303B] font-semibold">¥3,580.00</span>
        </div>
        <div className="flex flex-col items-center flex-1 border-r border-gray-100">
          <span className="text-[#8E949A] text-xs mb-1">待结算</span>
          <span className="text-[#23303B] font-semibold">¥450.00</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="text-[#8E949A] text-xs mb-1">成功提现</span>
          <span className="text-[#23303B] font-semibold">¥1,850.00</span>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="mx-4 bg-white rounded-xl shadow-sm overflow-hidden mb-4">
        <div className="grid grid-cols-2">
          <button 
            onClick={onNavigateToRecords}
            className="p-4 border-r border-b border-gray-50 flex flex-col items-center gap-2 active:bg-gray-50"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#456EFE]">
              <FileText size={20} />
            </div>
            <span className="text-[#23303B] text-sm">分销记录</span>
          </button>
          <button 
            onClick={onNavigateToTeam}
            className="p-4 border-b border-gray-50 flex flex-col items-center gap-2 active:bg-gray-50"
          >
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#F59E0B]">
              <Users size={20} />
            </div>
            <span className="text-[#23303B] text-sm">我的团队</span>
          </button>
          <button 
            onClick={onNavigateToPoster}
            className="p-4 border-r border-gray-50 flex flex-col items-center gap-2 active:bg-gray-50"
          >
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#8B5CF6]">
              <QrCode size={20} />
            </div>
            <span className="text-[#23303B] text-sm">推广海报</span>
          </button>
          <button 
            onClick={onNavigateToWithdraw}
            className="p-4 flex flex-col items-center gap-2 active:bg-gray-50"
          >
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#10B981]">
              <Banknote size={20} />
            </div>
            <span className="text-[#23303B] text-sm">佣金提现</span>
          </button>
        </div>
      </div>

      {/* 最新动态 */}
      <div className="mx-4">
        <h3 className="text-[#23303B] font-medium mb-3">最新动态</h3>
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-start justify-between pb-3 border-b border-gray-50 last:border-0 last:pb-0">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Wallet size={14} className="text-[#8E949A]" />
                </div>
                <div>
                  <div className="text-sm text-[#23303B]">获得佣金</div>
                  <div className="text-xs text-[#8E949A] mt-0.5">2023-11-29 14:30</div>
                </div>
              </div>
              <div className="text-[#456EFE] font-medium">+15.00</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
