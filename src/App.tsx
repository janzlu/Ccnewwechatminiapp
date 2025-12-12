import { useState } from 'react';
import { Home, ShoppingCart, Calculator, TrendingUp, User, Magnet } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import image_2b4a1f80dae4b65e27749e20d72265b207e0fc5e from 'figma:asset/2b4a1f80dae4b65e27749e20d72265b207e0fc5e.png';
import HomePage from './components/HomePage';
import MallPage from './components/MallPage';
import CalculatorPage from './components/CalculatorPage';
import MarketPage from './components/MarketPage';
import ProfilePage from './components/ProfilePage';
import AddressManagePage from './components/AddressManagePage';
import ProductDetailPage from './components/ProductDetailPage';
import ShoppingCartPage from './components/ShoppingCartPage';
import OrderConfirmPage from './components/OrderConfirmPage';
import PaymentPage from './components/PaymentPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import MagneticCalculatorDetail from './components/MagneticCalculatorDetail';
import OrderListPage from './components/OrderListPage';
import OrderDetailPage from './components/OrderDetailPage';
import SellFormPage from './components/SellFormPage';
import SellSuccessPage from './components/SellSuccessPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subPage, setSubPage] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);

  const tabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'mall', label: '商城', icon: ShoppingCart },
    { id: 'calculator', label: '磁材计算', icon: Calculator },
    { id: 'market', label: '市场行情', icon: TrendingUp },
    { id: 'profile', label: '我的', icon: User },
  ];

  const renderPage = () => {
    // 如果有子页面，优先显示子页面
    if (subPage === 'address') {
      return <AddressManagePage onBack={() => setSubPage(null)} />;
    }
    
    if (subPage === 'productDetail' && selectedProductId) {
      return (
        <ProductDetailPage
          productId={selectedProductId}
          onBack={() => setSubPage(null)}
          onBuyNow={(productId, quantity) => {
            setOrderData({ productId, quantity, items: [{ id: productId, quantity }] });
            setSubPage('orderConfirm');
          }}
          onAddToCart={(productId, quantity) => {
            // TODO: 实际项目中这里应该添加到购物车状态
            alert(`已添加 ${quantity} 件商品到购物车`);
          }}
        />
      );
    }
    
    if (subPage === 'shoppingCart') {
      return (
        <ShoppingCartPage
          onBack={() => setSubPage(null)}
          onCheckout={(selectedItems) => {
            setOrderData({ items: selectedItems });
            setSubPage('orderConfirm');
          }}
        />
      );
    }
    
    if (subPage === 'orderConfirm') {
      return (
        <OrderConfirmPage
          onBack={() => setSubPage(null)}
          onViewOrderDetail={() => {
            // 查看订单详情 - 跳转到订单列表
            setSubPage('orderList');
          }}
          onBackHome={() => {
            // 返回首页
            setSubPage(null);
            setActiveTab('home');
          }}
        />
      );
    }
    
    if (subPage === 'payment' && orderData) {
      return (
        <PaymentPage
          onBack={() => setSubPage('orderConfirm')}
          onPaymentSuccess={() => {
            setSubPage('orderSuccess');
          }}
          orderData={{
            orderNo: 'ORD' + Date.now(),
            total: orderData.total || 0,
          }}
        />
      );
    }
    
    if (subPage === 'orderSuccess') {
      return (
        <OrderSuccessPage
          onViewOrder={() => {
            setSubPage('orderList');
          }}
          onBackHome={() => {
            setSubPage(null);
            setActiveTab('home');
          }}
          orderNo={'ORD' + Date.now()}
        />
      );
    }

    if (subPage === 'calculatorDetail') {
      return (
        <MagneticCalculatorDetail
          onBack={() => setSubPage(null)}
          onConfirmOrder={() => {
            setSubPage('calculatorOrderConfirm');
          }}
        />
      );
    }

    if (subPage === 'calculatorOrderConfirm') {
      return (
        <OrderConfirmPage
          onBack={() => setSubPage('calculatorDetail')}
          onViewOrderDetail={() => {
            // 查看订单详情 - 跳转到订单列表
            setSubPage('orderList');
          }}
          onBackHome={() => {
            // 返回首页
            setSubPage(null);
            setActiveTab('home');
          }}
        />
      );
    }

    if (subPage === 'orderList') {
      return (
        <OrderListPage
          onBack={() => setSubPage(null)}
          onViewDetail={(orderId) => {
            setSelectedOrderId(orderId);
            setSubPage('orderDetail');
          }}
        />
      );
    }

    if (subPage === 'orderDetail') {
      return (
        <OrderDetailPage
          orderId={selectedOrderId || undefined}
          onBack={() => setSubPage('orderList')}
          onCancelOrder={() => {
            // 取消订单后返回订单列表
            setSubPage('orderList');
          }}
        />
      );
    }

    if (subPage === 'sellForm') {
      return (
        <SellFormPage
          onBack={() => setSubPage(null)}
          onSellSuccess={() => {
            setSubPage('sellSuccess');
          }}
        />
      );
    }

    if (subPage === 'sellSuccess') {
      return (
        <SellSuccessPage
          onBackHome={() => {
            setSubPage(null);
            setActiveTab('home');
          }}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <HomePage 
          onNavigateToCalculator={(category) => {
            setSelectedCategory(category);
            setActiveTab('calculator');
          }}
          onNavigateToMall={() => {
            setActiveTab('mall');
          }}
          onNavigateToSell={() => {
            setSubPage('sellForm');
          }}
        />; 
      case 'mall':
        return (
          <MallPage
            onProductClick={(productId) => {
              setSelectedProductId(productId);
              setSubPage('productDetail');
            }}
            onCartClick={() => setSubPage('shoppingCart')}
          />
        );
      case 'calculator':
        return (
          <CalculatorPage
            onStartCalculate={() => setSubPage('calculatorDetail')}
            initialCategory={selectedCategory || undefined}
          />
        );
      case 'market':
        return <MarketPage />;
      case 'profile':
        return <ProfilePage onNavigate={(page) => setSubPage(page)} />;
      default:
        return <HomePage 
          onNavigateToCalculator={(category) => {
            setSelectedCategory(category);
            setActiveTab('calculator');
          }}
          onNavigateToMall={() => {
            setActiveTab('mall');
          }}
          onNavigateToSell={() => {
            setSubPage('sellForm');
          }}
        />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9F9FB] overflow-hidden">
      {/* 固定顶部标题栏 */}
      {!subPage && (
        <div className="flex-none bg-white shadow-sm">
          <div className="flex items-center h-14 px-4 gap-3">
            {activeTab === 'home' ? (
              <>
                <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                  <ImageWithFallback 
                    src={image_2b4a1f80dae4b65e27749e20d72265b207e0fc5e}
                    alt="磁材购Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-[#23303B] text-xl">磁材购</h1>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <h1 className="flex-1 text-center text-[#23303B] text-xl -ml-10">
                  {activeTab === 'mall' && '商城'}
                  {activeTab === 'calculator' && '磁材计算'}
                  {activeTab === 'market' && '市场行情'}
                  {activeTab === 'profile' && '我的'}
                </h1>
              </>
            )}
          </div>
        </div>
      )}

      {/* 可滚动内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {renderPage()}
      </div>

      {/* 固定底部Tabbar */}
      {!subPage && (
        <div className="flex-none bg-white shadow-[0px_-11px_44px_19px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-around h-20 px-2">
            {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const iconColor = isActive ? '#456EFE' : '#8E949A';
            
            const getTabIcon = (tabId: string) => {
              switch(tabId) {
                case 'home':
                  return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
                      <path d="M12 3L4 9V21H9V15H15V21H20V9L12 3Z"/>
                    </svg>
                  );
                case 'mall':
                  return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
                      <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"/>
                      <path d="M3 6H21" stroke="white" strokeWidth="1.5"/>
                      <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="white" strokeWidth="1.5" fill="none"/>
                    </svg>
                  );
                case 'calculator':
                  return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
                      <rect x="4" y="2" width="16" height="20" rx="2"/>
                      <rect x="7" y="5" width="10" height="3" rx="1" fill="white"/>
                      <rect x="7" y="11" width="2" height="2" rx="0.5" fill="white"/>
                      <rect x="11" y="11" width="2" height="2" rx="0.5" fill="white"/>
                      <rect x="15" y="11" width="2" height="2" rx="0.5" fill="white"/>
                      <rect x="7" y="15" width="2" height="2" rx="0.5" fill="white"/>
                      <rect x="11" y="15" width="2" height="2" rx="0.5" fill="white"/>
                      <rect x="15" y="15" width="2" height="2" rx="0.5" fill="white"/>
                    </svg>
                  );
                case 'market':
                  return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
                      <path d="M3 20H21V22H3V20Z"/>
                      <path d="M5 18V10L9 6L13 10L17 4L21 8V18H5Z"/>
                    </svg>
                  );
                case 'profile':
                  return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={iconColor}>
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V20Z"/>
                    </svg>
                  );
                default:
                  return null;
              }
            };
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // 切换标签时清除选中的分类，除非点击的是计算器标签本身
                  if (tab.id !== 'calculator') {
                    setSelectedCategory(null);
                  }
                }}
                className="flex flex-col items-center justify-center flex-1 gap-1 transition-colors"
              >
                {getTabIcon(tab.id)}
                <span
                  className={`text-xs ${
                    isActive ? 'text-[#456EFE]' : 'text-[#8E949A]'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
          </div>
        </div>
      )}
    </div>
  );
}