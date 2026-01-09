import { useState, useEffect } from 'react';
import { ArrowLeft, Smartphone, ShieldCheck, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import image_2b4a1f80dae4b65e27749e20d72265b207e0fc5e from 'figma:asset/2b4a1f80dae4b65e27749e20d72265b207e0fc5e.png';

interface PhoneLoginPageProps {
  onBack: () => void;
  onLoginSuccess: (userInfo: any) => void;
}

export default function PhoneLoginPage({ onBack, onLoginSuccess }: PhoneLoginPageProps) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendCode = () => {
    if (!phone) {
      toast.error('请输入手机号码');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error('手机号码格式不正确');
      return;
    }
    
    setCountdown(60);
    toast.success('验证码已发送：123456');
  };

  const handleLogin = () => {
    if (!phone) {
      toast.error('请输入手机号码');
      return;
    }
    if (!code) {
      toast.error('请输入验证码');
      return;
    }
    if (!agreed) {
      const checkbox = document.getElementById('agreement-checkbox');
      checkbox?.classList.add('animate-pulse');
      setTimeout(() => checkbox?.classList.remove('animate-pulse'), 500);
      toast.error('请阅读并同意用户协议');
      return;
    }

    setIsLoading(true);

    // 模拟登录请求
    setTimeout(() => {
      setIsLoading(false);
      if (code !== '123456') {
        toast.error('验证码错误');
        return;
      }
      
      // 模拟用户信息
      const mockUser = {
        nickname: `用户${phone.slice(-4)}`,
        phone: phone,
        avatar: '', // 默认头像
        gender: '保密',
        signature: '让交易更简单',
        isWechatBound: false,
      };
      
      toast.success('登录成功');
      onLoginSuccess(mockUser);
    }, 1500);
  };

  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-1 -ml-1 text-[#23303B]">
          <ArrowLeft size={24} />
        </button>
        <div className="w-8" />
      </div>

      <div className="flex-1 px-8 pt-4">
        <h1 className="text-2xl font-bold text-[#23303B] mb-2">手机号登录</h1>
        <p className="text-[#8E949A] text-sm mb-10">未注册手机号验证通过后将自动注册</p>

        {/* 表单区域 */}
        <div className="space-y-6">
          <div className="relative border-b border-[#E5E7EB] py-3">
            <span className="text-[#23303B] font-medium text-lg mr-3">+86</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                setPhone(val);
              }}
              className="outline-none text-lg text-[#23303B] placeholder:text-[#C4C9CE] w-48"
              placeholder="请输入手机号码"
            />
            {phone && (
              <button 
                onClick={() => setPhone('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#C4C9CE]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative border-b border-[#E5E7EB] py-3 flex items-center justify-between">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setCode(val);
              }}
              className="outline-none text-lg text-[#23303B] placeholder:text-[#C4C9CE] flex-1"
              placeholder="请输入验证码"
            />
            <button
              onClick={handleSendCode}
              disabled={countdown > 0 || !phone}
              className={`text-sm font-medium transition-colors ${
                countdown > 0 || !phone
                  ? 'text-[#C4C9CE]'
                  : 'text-[#456EFE]'
              }`}
            >
              {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
            </button>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleLogin}
            disabled={!phone || !code || isLoading}
            className={`w-full h-12 rounded-full flex items-center justify-center transition-all active:scale-[0.98] ${
              !phone || !code
                ? 'bg-[#456EFE]/40 text-white/90 cursor-not-allowed'
                : 'bg-[#456EFE] shadow-lg shadow-[#456EFE]/20 text-white'
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="font-medium">登录</span>
            )}
          </button>
        </div>
        
        {/* 协议勾选 */}
        <div className="mt-6 flex items-start gap-2" onClick={() => setAgreed(!agreed)}>
          <div 
            id="agreement-checkbox"
            className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors flex-shrink-0 ${
              agreed ? 'bg-[#456EFE] border-[#456EFE]' : 'border-[#FF4D4F] bg-white'
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
          </p>
        </div>
      </div>
    </div>
  );
}