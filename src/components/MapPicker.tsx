import { useState, useEffect } from 'react';
import { MapPin, X, Navigation } from 'lucide-react';

interface MapPickerProps {
  onConfirm: (location: {
    province: string;
    city: string;
    district: string;
    detail: string;
  }) => void;
  onCancel: () => void;
}

// 模拟的地图位置数据
const mockLocations = [
  {
    lat: 22.5431,
    lng: 114.0579,
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园南区深圳湾科技生态园10栋A座',
  },
  {
    lat: 22.5451,
    lng: 114.0599,
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '高新南四道18号创维半导体设计大厦',
  },
  {
    lat: 22.5471,
    lng: 114.0619,
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技南路16号深圳湾创业投资大厦',
  },
  {
    lat: 23.1291,
    lng: 113.2644,
    province: '广东省',
    city: '广州市',
    district: '天河区',
    detail: '珠江新城花城大道88号',
  },
  {
    lat: 23.1311,
    lng: 113.2664,
    province: '广东省',
    city: '广州市',
    district: '天河区',
    detail: '天河路208号天河城广场',
  },
];

export default function MapPicker({ onConfirm, onCancel }: MapPickerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const currentLocation = mockLocations[selectedIndex];

  // 模拟拖动地图
  const handleMapMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMapMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setMapPosition({
        x: mapPosition.x + e.movementX,
        y: mapPosition.y + e.movementY,
      });
      
      // 根据拖动距离模拟切换位置
      const totalMovement = Math.abs(mapPosition.x) + Math.abs(mapPosition.y);
      if (totalMovement > 50) {
        const newIndex = Math.floor(Math.random() * mockLocations.length);
        setSelectedIndex(newIndex);
        setMapPosition({ x: 0, y: 0 });
      }
    }
  };

  const handleMapMouseUp = () => {
    setIsDragging(false);
  };

  const handleConfirm = () => {
    onConfirm({
      province: currentLocation.province,
      city: currentLocation.city,
      district: currentLocation.district,
      detail: currentLocation.detail,
    });
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="flex-none bg-white px-4 py-4 flex items-center shadow-sm">
        <button onClick={onCancel} className="p-1">
          <X size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] -ml-8">选择位置</h1>
      </div>

      {/* 地图区域 */}
      <div className="flex-1 relative bg-[#F0F3F5] overflow-hidden">
        {/* 模拟地图背景 */}
        <div
          className="absolute inset-0 cursor-move select-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(69, 110, 254, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(69, 110, 254, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
            transform: `translate(${mapPosition.x}px, ${mapPosition.y}px)`,
          }}
          onMouseDown={handleMapMouseDown}
          onMouseMove={handleMapMouseMove}
          onMouseUp={handleMapMouseUp}
          onMouseLeave={handleMapMouseUp}
        >
          {/* 模拟地图元素 */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[rgba(76,175,80,0.2)] rounded-lg border-2 border-[rgba(76,175,80,0.4)]"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-[rgba(33,150,243,0.2)] rounded-full border-2 border-[rgba(33,150,243,0.4)]"></div>
          <div className="absolute bottom-1/4 left-1/2 w-40 h-20 bg-[rgba(255,193,7,0.2)] rounded-lg border-2 border-[rgba(255,193,7,0.4)]"></div>
          
          {/* 模拟道路 */}
          <div className="absolute top-0 left-1/2 w-2 h-full bg-[rgba(158,158,158,0.3)]"></div>
          <div className="absolute top-1/2 left-0 w-full h-2 bg-[rgba(158,158,158,0.3)]"></div>
        </div>

        {/* 中心定位图标 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <MapPin size={48} className="text-[#456EFE] drop-shadow-lg" fill="#456EFE" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-white px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
              <div className="text-xs text-[#8E949A]">当前位置</div>
              <div className="text-sm text-[#23303B] max-w-[200px] truncate">
                {currentLocation.detail}
              </div>
            </div>
          </div>
        </div>

        {/* 重新定位按钮 */}
        <button
          onClick={() => {
            const newIndex = (selectedIndex + 1) % mockLocations.length;
            setSelectedIndex(newIndex);
            setMapPosition({ x: 0, y: 0 });
          }}
          className="absolute bottom-32 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Navigation size={24} className="text-[#456EFE]" />
        </button>

        {/* 操作提示 */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          <p className="text-xs text-[#8E949A]">拖动地图选择位置</p>
        </div>
      </div>

      {/* 底部地址信息和确认按钮 */}
      <div className="flex-none bg-white shadow-lg">
        <div className="p-4 space-y-3">
          {/* 地址信息 */}
          <div className="bg-[rgba(164,169,174,0.08)] rounded-lg p-4">
            <div className="flex items-start gap-2">
              <MapPin size={20} className="text-[#456EFE] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-[#8E949A] mb-1">
                  {currentLocation.province} {currentLocation.city} {currentLocation.district}
                </div>
                <div className="text-[#23303B]">{currentLocation.detail}</div>
              </div>
            </div>
          </div>

          {/* 确认按钮 */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 h-12 bg-[rgba(164,169,174,0.15)] text-[#23303B] rounded-lg transition-all active:scale-98"
            >
              取消
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 h-12 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] active:scale-98"
            >
              确认选择
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
