import { ArrowLeft, Phone, MapPin, Shield, Star, CheckCircle2, Share2, MessageCircle, User, Store } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MerchantDetailPageProps {
  merchantId: number;
  isLoggedIn: boolean;
  onBack: () => void;
  onLogin?: () => void;
}

// 模拟数据，实际应从API获取
const getMerchantDetail = (id: number) => {
  const suppliers = [
    {
      id: 1,
      name: '宁波金磁科技',
      logo: 'https://images.unsplash.com/photo-1766371900950-929959f2bb67?w=100&h=100&fit=crop',
      bg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
      business: ['钕铁硼', '磁组件', '磁性工具'],
      level: 'diamond',
      contact: '13968888888',
      address: '浙江省宁波市鄞州区科技园',
      intro: '宁波金磁科技有限公司是一家专业从事稀土永磁材料研发、生产和销售的高新技术企业。公司拥有先进的生产设备和检测仪器，年产烧结钕铁硼2000吨。',
      products: [
        { id: 101, name: 'N52方块磁铁', price: '280.00', image: 'https://images.unsplash.com/photo-1616353329974-9585c57b988f?w=200' },
        { id: 102, name: 'D20x3圆片', price: '150.00', image: 'https://images.unsplash.com/photo-1591543620704-580761dd6779?w=200' },
        { id: 103, name: '磁性挂钩', price: '12.50', image: 'https://images.unsplash.com/photo-1535384661725-75d95221b5eb?w=200' },
      ],
      isMember: true,
      tags: ['源头工厂', '现货充足', '极速发货']
    },
    // 其他商家的模拟数据可以复用或者简单的fallback
  ];
  return suppliers.find(s => s.id === id) || suppliers[0]; // 默认返回第一个用于演示
};

export default function MerchantDetailPage({ merchantId, isLoggedIn, onBack, onLogin }: MerchantDetailPageProps) {
  const merchant = getMerchantDetail(merchantId);

  return (
    <div className="min-h-full bg-[#F5F6F8] flex flex-col">
      {/* 顶部背景与导航 */}
      <div className="relative h-48">
        <ImageWithFallback 
          src={merchant.bg} 
          alt="background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <button onClick={onBack} className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white">
            <ArrowLeft size={20} />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* 商家基本信息卡片 */}
      <div className="mx-4 -mt-12 relative z-10 bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-3">
            <img 
              src={merchant.logo} 
              alt={merchant.name} 
              className="w-16 h-16 rounded-lg border-2 border-white shadow-md bg-white -mt-8 object-cover"
            />
            <div className="pt-1">
              <h1 className="text-lg font-bold text-[#23303B]">{merchant.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {merchant.level === 'diamond' && (
                    <span className="bg-blue-50 text-[#456EFE] text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Shield size={10} fill="currentColor" /> 钻石商家
                    </span>
                )}
                {merchant.level === 'gold' && (
                    <span className="bg-yellow-50 text-[#F59E0B] text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Star size={10} fill="currentColor" /> 金牌商家
                    </span>
                )}
                <span className="text-xs text-[#8E949A]">关注数 1.2k</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-start gap-2">
            <MapPin size={14} className="text-[#8E949A] mt-0.5" />
            <span className="text-sm text-[#23303B]">{merchant.address}</span>
          </div>
          <div className="flex items-start gap-2">
            <User size={14} className="text-[#8E949A] mt-0.5" />
            <p className="text-sm text-[#5D636A] line-clamp-2">{merchant.intro}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {merchant.tags.map((tag, i) => (
              <span key={i} className="text-[10px] text-[#456EFE] bg-[#E8F0FF] px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 热门产品 */}
      <div className="mt-4 px-4 pb-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[#23303B]">热门产品</h2>
          <span className="text-xs text-[#8E949A]">查看全部</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {merchant.products.map(product => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="h-32 bg-[#F9F9FB]">
                <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-2">
                <h3 className="text-sm text-[#23303B] font-medium truncate">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#FF4D4F] font-medium text-sm">¥{product.price}</span>
                  <span className="text-[10px] text-[#A4A9AE]">已售 100+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-4 py-3 flex items-center gap-3">
        {isLoggedIn ? (
          <a href={`tel:${merchant.contact}`} className="flex-1 bg-[#456EFE] text-white h-10 rounded-full flex items-center justify-center gap-2 text-sm font-medium active:bg-[#345CE5]">
            <Phone size={16} fill="currentColor" />
            电话联系
          </a>
        ) : (
          <button 
            onClick={onLogin}
            className="flex-1 bg-[#456EFE] text-white h-10 rounded-full flex items-center justify-center gap-2 text-sm font-medium active:bg-[#345CE5]"
          >
            <Phone size={16} fill="currentColor" />
            联系方式
          </button>
        )}
      </div>
    </div>
  );
}
