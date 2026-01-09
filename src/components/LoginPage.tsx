import { useState } from 'react';
import { MessageCircle, ShieldCheck, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import image_2b4a1f80dae4b65e27749e20d72265b207e0fc5e from 'figma:asset/2b4a1f80dae4b65e27749e20d72265b207e0fc5e.png';

interface LoginPageProps {
  onLoginSuccess: (userInfo: any) => void;
  onCancel: () => void;
  onPhoneLoginClick?: () => void;
}

export default function LoginPage({ onLoginSuccess, onCancel, onPhoneLoginClick }: LoginPageProps) {
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWechatLogin = () => {
    if (!agreed) {
      // 震动或提示
      const checkbox = document.getElementById('agreement-checkbox');
      checkbox?.classList.add('animate-pulse');
      setTimeout(() => checkbox?.classList.remove('animate-pulse'), 500);
      return;
    }

    setIsLoading(true);

    // 模拟微信登录过程
    setTimeout(() => {
      setIsLoading(false);
      // 模拟获取到的微信用户信息
      const mockWechatUser = {
        nickname: '微信用户',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400', // 模拟头像
        phone: '138****8888', // 微信手机号通常需要额外授权，这里模拟已获取
        gender: '男',
        signature: '让交易更简单',
        isWechatBound: true,
      };
      onLoginSuccess(mockWechatUser);
    }, 1500);
  };

  return (
    <div className="min-h-full bg-white flex flex-col relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[30%] bg-[#456EFE]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-10%] w-[50%] h-[25%] bg-[#456EFE]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 取消/跳过按钮 */}
      <div className="flex justify-end p-4 z-10">
        <button 
          onClick={onCancel}
          className="text-[#8E949A] text-sm px-3 py-1 bg-[#F9F9FB] rounded-full"
        >
          暂不登录
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-20">
        {/* Logo区域 */}
        <div className="w-24 h-24 rounded-2xl bg-white shadow-xl shadow-[#456EFE]/10 flex items-center justify-center mb-6 overflow-hidden">
           <ImageWithFallback 
             src={image_2b4a1f80dae4b65e27749e20d72265b207e0fc5e}
             alt="磁材购Logo"
             className="w-full h-full object-cover"
           />
        </div>
        <h1 className="text-2xl font-bold text-[#23303B] mb-2">磁材购</h1>
        <p className="text-[#8E949A] text-center mb-12">
          专业的磁性材料交易与工具平台<br/>
          <span className="text-xs text-[#A4A9AE]">交易 · 工具 · 资讯</span>
        </p>

        {/* 登录按钮区域 */}
        <div className="w-full space-y-4">
          <button
            onClick={handleWechatLogin}
            className={`w-full h-12 rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              agreed ? 'bg-[#07C160] shadow-lg shadow-[#07C160]/20 text-white' : 'bg-[#07C160]/60 text-white/90 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />  
            ) : (
              <>
                <MessageCircle size={20} fill="currentColor" className="text-white" />
                <span className="font-medium">微信一键登录</span>
              </>
            )}
          </button>

          <button 
            onClick={onPhoneLoginClick}
            className="w-full h-12 rounded-full bg-white border border-[#E5E7EB] text-[#23303B] font-medium flex items-center justify-center gap-2 active:bg-gray-50"
          >
            手机号码登录
          </button>
        </div>
      </div>

      {/* 底部协议 */}
      <div className="px-8 pb-10">
        <div className="flex items-start gap-2" onClick={() => setAgreed(!agreed)}>
          <div 
            id="agreement-checkbox"
            className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors flex-shrink-0 ${
              agreed ? 'bg-[#456EFE] border-[#456EFE]' : 'border-[#cccccc] bg-white'  
            }`}
          >
            {agreed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">  
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <p className="text-xs text-[#8E949A] leading-5">
            登录即代表您已同意
            <span className="text-[#456EFE]">《用户服务协议》</span>
            和
            <span className="text-[#456EFE]">《隐私权政策》</span>
            ，并授权使用您的微信账号信息（头像、昵称等）以便为您提供服务。
          </p>
        </div>
      </div>
    </div>
  );
}