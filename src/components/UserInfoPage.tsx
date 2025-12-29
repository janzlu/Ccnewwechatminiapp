import { useState } from 'react';
import { ArrowLeft, Camera, User, ChevronRight } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserInfoPageProps {
  onBack: () => void;
  initialData?: any;
  onUpdate?: (data: any) => void;
}

export default function UserInfoPage({ onBack, initialData, onUpdate }: UserInfoPageProps) {
  const [userInfo, setUserInfo] = useState({
    avatar: initialData?.avatar || '',
    nickname: initialData?.nickname || '用户18969817289',
    phone: initialData?.phone || '18969817289',
    signature: initialData?.signature || '',
    gender: initialData?.gender || '保密',
    company: initialData?.company || '',
  });

  const handleSave = () => {
    // 这里应该是保存逻辑
    onUpdate?.(userInfo);
    toast.success('保存成功');
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  return (
    <div className="min-h-full bg-[#F9F9FB] flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 text-[#23303B]">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-[#23303B]">个人信息</h1>
        <div className="w-8" /> {/* 占位，保持标题居中 */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 头像区域 */}
        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center gap-3">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#F5F5F5] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              {userInfo.avatar ? (
                <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={48} className="text-[#A4A9AE]" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#456EFE] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              <Camera size={14} className="text-white" />
            </button>
          </div>
          <span className="text-xs text-[#8E949A]">点击修改头像</span>
        </div>

        {/* 基本信息表单 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-4 border-b border-[#F5F5F5] flex items-center justify-between">
            <span className="text-[#23303B] font-medium w-24">昵称</span>
            <input 
              type="text" 
              value={userInfo.nickname}
              onChange={(e) => setUserInfo({...userInfo, nickname: e.target.value})}
              className="flex-1 text-right text-[#8E949A] outline-none placeholder:text-[#A4A9AE]"
              placeholder="请输入昵称"
            />
            <ChevronRight size={20} className="text-[#A4A9AE] ml-2" />
          </div>

          <div className="px-4 py-4 border-b border-[#F5F5F5] flex items-center justify-between">
            <span className="text-[#23303B] font-medium w-24">手机号</span>
            <span className="flex-1 text-right text-[#8E949A]">{userInfo.phone}</span>
             <div className="w-5 ml-2" /> {/* 占位保持对齐 */}
          </div>

          <div className="px-4 py-4 border-b border-[#F5F5F5] flex items-center justify-between">
            <span className="text-[#23303B] font-medium w-24">性别</span>
            <div className="flex-1 flex justify-end gap-4">
               <label className="flex items-center gap-1 cursor-pointer">
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${userInfo.gender === '男' ? 'border-[#456EFE]' : 'border-[#A4A9AE]'}`}>
                    {userInfo.gender === '男' && <div className="w-2 h-2 rounded-full bg-[#456EFE]" />}
                 </div>
                 <input type="radio" name="gender" className="hidden" checked={userInfo.gender === '男'} onChange={() => setUserInfo({...userInfo, gender: '男'})} />
                 <span className="text-sm text-[#23303B]">男</span>
               </label>
               <label className="flex items-center gap-1 cursor-pointer">
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${userInfo.gender === '女' ? 'border-[#456EFE]' : 'border-[#A4A9AE]'}`}>
                    {userInfo.gender === '女' && <div className="w-2 h-2 rounded-full bg-[#456EFE]" />}
                 </div>
                 <input type="radio" name="gender" className="hidden" checked={userInfo.gender === '女'} onChange={() => setUserInfo({...userInfo, gender: '女'})} />
                 <span className="text-sm text-[#23303B]">女</span>
               </label>
               <label className="flex items-center gap-1 cursor-pointer">
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${userInfo.gender === '保密' ? 'border-[#456EFE]' : 'border-[#A4A9AE]'}`}>
                    {userInfo.gender === '保密' && <div className="w-2 h-2 rounded-full bg-[#456EFE]" />}
                 </div>
                 <input type="radio" name="gender" className="hidden" checked={userInfo.gender === '保密'} onChange={() => setUserInfo({...userInfo, gender: '保密'})} />
                 <span className="text-sm text-[#23303B]">保密</span>
               </label>
            </div>
          </div>

          <div className="px-4 py-4 flex items-center justify-between">
            <span className="text-[#23303B] font-medium w-24">个性签名</span>
            <input 
              type="text" 
              value={userInfo.signature}
              onChange={(e) => setUserInfo({...userInfo, signature: e.target.value})}
              className="flex-1 text-right text-[#8E949A] outline-none placeholder:text-[#A4A9AE]"
              placeholder="未设置签名"
            />
            <ChevronRight size={20} className="text-[#A4A9AE] ml-2" />
          </div>
        </div>

        {/* 其他信息 */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="px-4 py-4 flex items-center justify-between">
            <span className="text-[#23303B] font-medium w-24">公司名称</span>
            <input 
              type="text" 
              value={userInfo.company}
              onChange={(e) => setUserInfo({...userInfo, company: e.target.value})}
              className="flex-1 text-right text-[#8E949A] outline-none placeholder:text-[#A4A9AE]"
              placeholder="请输入公司名称"
            />
            <ChevronRight size={20} className="text-[#A4A9AE] ml-2" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleSave}
          className="w-full bg-[#456EFE] text-white h-12 rounded-lg font-medium active:scale-[0.98] transition-transform"
        >
          保存修改
        </button>
      </div>
    </div>
  );
}
