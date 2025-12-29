import { ArrowLeft, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface DistributionRecord {
  id: string;
  type: 'commission' | 'withdraw';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  source?: string;
  date: string;
  orderNo?: string;
}

interface DistributionRecordsPageProps {
  onBack: () => void;
}

export default function DistributionRecordsPage({ onBack }: DistributionRecordsPageProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'withdraw'>('all');

  const records: DistributionRecord[] = [
    { id: '1', type: 'commission', amount: 150.00, status: 'completed', source: '用户 A** 购买了 N52方块磁铁', date: '2023-11-29 14:30', orderNo: 'ORD20231129001' },
    { id: '2', type: 'commission', amount: 45.50, status: 'pending', source: '用户 B** 购买了 磁性挂钩', date: '2023-11-28 10:15', orderNo: 'ORD20231128005' },
    { id: '3', type: 'withdraw', amount: -500.00, status: 'completed', date: '2023-11-25 18:00' },
    { id: '4', type: 'commission', amount: 12.00, status: 'completed', source: '用户 C** 购买了 圆片磁铁', date: '2023-11-24 09:20', orderNo: 'ORD20231124012' },
    { id: '5', type: 'commission', amount: 88.00, status: 'failed', source: '用户 D** 购买了 强力磁铁', date: '2023-11-20 16:45', orderNo: 'ORD20231120003' },
  ];

  const filteredRecords = records.filter(record => {
    if (activeTab === 'all') return true;
    if (activeTab === 'income') return record.type === 'commission';
    if (activeTab === 'withdraw') return record.type === 'withdraw';
    return true;
  });

  return (
    <div className="min-h-full bg-[#F5F6F8] flex flex-col">
      {/* 头部 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center -ml-2">
          <ArrowLeft size={20} className="text-[#23303B]" />
        </button>
        <h1 className="text-base font-medium text-[#23303B]">分销记录</h1>
        <div className="w-8"></div>
      </div>

      {/* 筛选Tab */}
      <div className="bg-white flex items-center justify-around px-2 border-b border-gray-100 sticky top-0 z-10">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-3 text-sm font-medium relative ${activeTab === 'all' ? 'text-[#456EFE]' : 'text-[#8E949A]'}`}
        >
          全部
          {activeTab === 'all' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#456EFE] rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('income')}
          className={`flex-1 py-3 text-sm font-medium relative ${activeTab === 'income' ? 'text-[#456EFE]' : 'text-[#8E949A]'}`}
        >
          收入
          {activeTab === 'income' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#456EFE] rounded-full" />}
        </button>
        <button 
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-3 text-sm font-medium relative ${activeTab === 'withdraw' ? 'text-[#456EFE]' : 'text-[#8E949A]'}`}
        >
          提现
          {activeTab === 'withdraw' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#456EFE] rounded-full" />}
        </button>
      </div>

      {/* 列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-[#23303B] font-medium text-sm mb-1">
                  {record.type === 'commission' ? '分销佣金' : '余额提现'}
                </h3>
                {record.source && (
                  <p className="text-xs text-[#8E949A] line-clamp-1 mb-1">{record.source}</p>
                )}
                <div className="text-xs text-[#A4A9AE]">{record.date}</div>
              </div>
              <div className="text-right">
                <div className={`text-base font-medium font-mono mb-1 ${record.amount > 0 ? 'text-[#FF4D4F]' : 'text-[#23303B]'}`}>
                  {record.amount > 0 ? '+' : ''}{record.amount.toFixed(2)}
                </div>
                <div className={`text-xs ${
                  record.status === 'completed' ? 'text-[#10B981]' : 
                  record.status === 'pending' ? 'text-[#F59E0B]' : 'text-[#EF4444]'
                }`}>
                  {record.status === 'completed' ? '已完成' : 
                   record.status === 'pending' ? '待结算' : '失败'}
                </div>
              </div>
            </div>
            {record.orderNo && (
              <div className="border-t border-gray-50 pt-2 mt-2 flex justify-between items-center">
                <span className="text-xs text-[#A4A9AE]">订单号: {record.orderNo}</span>
              </div>
            )}
          </div>
        ))}

        {filteredRecords.length === 0 && (
           <div className="flex flex-col items-center justify-center py-20 text-[#A4A9AE]">
             <FileText size={48} className="mb-4 opacity-20" />
             <p className="text-sm">暂无相关记录</p>
           </div>
        )}
      </div>
    </div>
  );
}
