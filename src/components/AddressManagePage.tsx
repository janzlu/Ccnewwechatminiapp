import { useState } from 'react';
import { ChevronLeft, Plus, MapPin, Phone, Edit2, Trash2, CheckCircle } from 'lucide-react';
import MapPicker from './MapPicker';

interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

interface AddressManagePageProps {
  onBack: () => void;
}

export default function AddressManagePage({ onBack }: AddressManagePageProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: '张三',
      phone: '138****8888',
      province: '广东省',
      city: '深圳市',
      district: '南山区',
      detail: '科技园南区深圳湾科技生态园10栋A座',
      isDefault: true,
    },
    {
      id: '2',
      name: '李四',
      phone: '139****6666',
      province: '广东省',
      city: '广州市',
      district: '天河区',
      detail: '珠江新城花城大道88号',
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    province: '',
    city: '',
    district: '',
    detail: '',
  });

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData({
      name: address.name,
      phone: address.phone,
      province: address.province,
      city: address.city,
      district: address.district,
      detail: address.detail,
    });
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.detail) {
      alert('请填写完整信息');
      return;
    }

    if (editingId) {
      // 编辑现有地址
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId
            ? { ...addr, ...formData }
            : addr
        )
      );
    } else {
      // 添加新地址
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses([...addresses, newAddress]);
    }

    // 重置表单
    setFormData({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
    });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleMapConfirm = (location: {
    province: string;
    city: string;
    district: string;
    detail: string;
  }) => {
    setFormData({
      ...formData,
      province: location.province,
      city: location.city,
      district: location.district,
      detail: location.detail,
    });
    setShowMapPicker(false);
  };

  return (
    <>
      {showMapPicker && (
        <MapPicker
          onConfirm={handleMapConfirm}
          onCancel={() => setShowMapPicker(false)}
        />
      )}
    <div className="min-h-full bg-[#F9F9FB] pb-24">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
        <button onClick={onBack} className="p-1 cursor-pointer" type="button">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] -ml-8">地址管理</h1>
      </div>

      {!showAddForm ? (
        <>
          {/* 地址列表 */}
          <div className="p-4 space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-2xl p-4 shadow-sm relative"
              >
                {address.isDefault && (
                  <div className="absolute top-4 right-4 bg-[#456EFE] text-white text-xs px-2 py-1 rounded">
                    默认
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-[#23303B]">{address.name}</span>
                    <span className="text-[#8E949A]">{address.phone}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-[#8E949A] text-sm">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                    <span>
                      {address.province} {address.city} {address.district} {address.detail}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[rgba(164,169,174,0.1)]">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="flex items-center gap-1 text-[#8E949A] text-sm"
                    >
                      <CheckCircle size={16} />
                      设为默认
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(address)}
                    className="flex items-center gap-1 text-[#456EFE] text-sm"
                  >
                    <Edit2 size={16} />
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-1 text-[#FF5656] text-sm ml-auto"
                  >
                    <Trash2 size={16} />
                    删除
                  </button>
                </div>
              </div>
            ))}

            {addresses.length === 0 && (
              <div className="text-center py-20">
                <MapPin size={48} className="text-[#A4A9AE] mx-auto mb-3" />
                <p className="text-[#A4A9AE]">暂无收货地址</p>
              </div>
            )}
          </div>

          {/* 添加新地址按钮 */}
          <div className="fixed bottom-20 left-0 right-0 bg-white px-4 py-3 shadow-lg">
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full h-12 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] active:scale-98 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              添加新地址
            </button>
          </div>
        </>
      ) : (
        <>
          {/* 添加/编辑地址表单 */}
          <div className="p-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
              <div>
                <label className="text-sm text-[#8E949A] mb-2 block">收货人</label>
                <input
                  type="text"
                  placeholder="请输入收货人姓名"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-12 px-4 bg-[rgba(164,169,174,0.08)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
                />
              </div>

              <div>
                <label className="text-sm text-[#8E949A] mb-2 block">手机号码</label>
                <input
                  type="tel"
                  placeholder="请输入手机号码"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-12 px-4 bg-[rgba(164,169,174,0.08)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
                />
              </div>

              {/* 地图选点按钮 */}
              <div>
                <label className="text-sm text-[#8E949A] mb-2 block">选择位置</label>
                <button
                  type="button"
                  onClick={() => setShowMapPicker(true)}
                  className="w-full h-12 px-4 bg-[rgba(69,110,254,0.1)] rounded-lg text-[#456EFE] flex items-center justify-center gap-2 transition-all hover:bg-[rgba(69,110,254,0.15)]"
                >
                  <MapPin size={20} />
                  地图选点
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-[#8E949A] mb-2 block">省份</label>
                  <input
                    type="text"
                    placeholder="省"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full h-12 px-4 bg-[rgba(164,169,174,0.08)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#8E949A] mb-2 block">城市</label>
                  <input
                    type="text"
                    placeholder="市"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-12 px-4 bg-[rgba(164,169,174,0.08)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
                  />
                </div>
                <div>
                  <label className="text-sm text-[#8E949A] mb-2 block">区县</label>
                  <input
                    type="text"
                    placeholder="区"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full h-12 px-4 bg-[rgba(164,169,174,0.08)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-[#8E949A] mb-2 block">详细地址</label>
                <textarea
                  placeholder="请输入详细地址（街道、楼牌号等）"
                  value={formData.detail}
                  onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
                  className="w-full h-24 px-4 py-3 bg-[rgba(164,169,174,0.08)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE] resize-none"
                />
              </div>
            </div>
          </div>

          {/* 保存和取消按钮 */}
          <div className="fixed bottom-20 left-0 right-0 bg-white px-4 py-3 shadow-lg">
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 h-12 bg-[rgba(164,169,174,0.15)] text-[#23303B] rounded-lg transition-all active:scale-98"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="flex-1 h-12 bg-[#456EFE] text-white rounded-lg transition-all hover:bg-[#3A5ED9] active:scale-98"
              >
                保存
              </button>
            </div>
          </div>
        </>
      )}
      </div>
    </>
  );
}
