import { ArrowLeft, Users, ChevronRight } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
}

interface DistributionRecordsPageProps {
  onBack: () => void;
}

export default function DistributionRecordsPage({ onBack }: DistributionRecordsPageProps) {
  const teamMembers: TeamMember[] = [
    { id: '1', name: '张明', avatar: '', joinDate: '2023-10-15' },
    { id: '2', name: '李华', avatar: '', joinDate: '2023-10-20' },
    { id: '3', name: '王芳', avatar: '', joinDate: '2023-09-05' },
    { id: '4', name: '赵强', avatar: '', joinDate: '2023-11-01' },
    { id: '5', name: '刘洋', avatar: '', joinDate: '2023-11-10' },
    { id: '6', name: '陈杰', avatar: '', joinDate: '2023-10-28' },
  ];

  const totalMembers = teamMembers.length;

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

      {/* 团队成员列表 */}
      <div className="flex-1 overflow-y-auto bg-[#F5F6F8]">
        <div className="px-4 py-3 flex items-center justify-between">
          <h3 className="text-[#23303B] font-medium">团队成员</h3>
          <span className="text-sm text-[#8E949A]">{totalMembers}人</span>
        </div>

        <div className="px-4 space-y-3 pb-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                {/* 头像 */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#456EFE] to-[#5B7EFF] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-lg">{member.name.charAt(0)}</span>
                </div>

                {/* 成员信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-[#23303B] font-medium">{member.name}</h4>
                    <button className="ml-auto flex items-center gap-0.5 text-sm text-[#8E949A]">
                      <span>详情</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  
                  <div className="text-sm text-[#8E949A]">
                    加入时间: {member.joinDate}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {teamMembers.length === 0 && (
             <div className="flex flex-col items-center justify-center py-20 text-[#A4A9AE]">
               <Users size={48} className="mb-4 opacity-20" />
               <p className="text-sm">暂无团队成员</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}