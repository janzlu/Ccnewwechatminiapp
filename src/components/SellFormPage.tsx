import { ChevronLeft, Upload, X } from 'lucide-react';
import { useState } from 'react';

interface SellFormPageProps {
  onBack: () => void;
  onSellSuccess: () => void;
}

export default function SellFormPage({ onBack, onSellSuccess }: SellFormPageProps) {
  const [formData, setFormData] = useState({
    productType: '',
    materialGrade: '',
    specifications: '',
    quantity: '',
    unitPrice: '',
    totalWeight: '',
    contactPerson: '',
    contactPhone: '',
    address: '',
    description: '',
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const productTypes = [
    '方片',
    '圆片',
    '圆环',
    '同心瓦',
    '直边瓦',
    '同R瓦',
    '方磨圆',
    '其他',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 模拟图片上传
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 6)); // 最多6张
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // 验证必填项
    if (!formData.productType || !formData.quantity || !formData.contactPerson || !formData.contactPhone) {
      alert('请填写必填项！');
      return;
    }

    // 简单的手机号验证
    if (!/^1[3-9]\d{9}$/.test(formData.contactPhone)) {
      alert('请输入正确的手机号！');
      return;
    }

    // 提交成功
    onSellSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F9F9FB] flex flex-col">
      {/* 顶部导航栏 */}
      <div className="bg-white px-4 py-3 flex items-center border-b border-[rgba(164,169,174,0.15)] sticky top-0 z-10">
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft size={24} className="text-[#23303B]" />
        </button>
        <h1 className="flex-1 text-center text-[#23303B] pr-8">我要卖</h1>
      </div>

      {/* 表单内容区域 */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-4">
          {/* 产品信息 */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-[#23303B] mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#456EFE] rounded-full"></div>
              产品信息
            </h3>

            {/* 产品类型 */}
            <div className="mb-4">
              <label className="text-sm text-[#8E949A] mb-2 block">
                产品类型 <span className="text-[#FF6B6B]">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {productTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => handleInputChange('productType', type)}
                    className={`h-10 rounded-lg text-sm transition-all ${
                      formData.productType === type
                        ? 'bg-[#456EFE] text-white'
                        : 'bg-[#F9F9FB] text-[#23303B] border border-[rgba(164,169,174,0.2)]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 牌号/材质 */}
            <div className="mb-4">
              <label className="text-sm text-[#8E949A] mb-2 block">牌号/材质</label>
              <input
                type="text"
                value={formData.materialGrade}
                onChange={(e) => handleInputChange('materialGrade', e.target.value)}
                placeholder="例如：N35、N38、N42等"
                className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
              />
            </div>

            {/* 规格尺寸 */}
            <div className="mb-4">
              <label className="text-sm text-[#8E949A] mb-2 block">规格尺寸</label>
              <input
                type="text"
                value={formData.specifications}
                onChange={(e) => handleInputChange('specifications', e.target.value)}
                placeholder="例如：50*20*10mm"
                className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
              />
            </div>

            {/* 数量和重量 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-sm text-[#8E949A] mb-2 block">
                  数量(块) <span className="text-[#FF6B6B]">*</span>
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="请输入数量"
                  className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
                />
              </div>
              <div>
                <label className="text-sm text-[#8E949A] mb-2 block">总重量(kg)</label>
                <input
                  type="number"
                  value={formData.totalWeight}
                  onChange={(e) => handleInputChange('totalWeight', e.target.value)}
                  placeholder="请输入重量"
                  className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
                />
              </div>
            </div>

            {/* 期望单价 */}
            <div className="mb-4">
              <label className="text-sm text-[#8E949A] mb-2 block">期望单价(元/块)</label>
              <input
                type="number"
                value={formData.unitPrice}
                onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                placeholder="请输入期望单价"
                className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
              />
            </div>

            {/* 产品描述 */}
            <div>
              <label className="text-sm text-[#8E949A] mb-2 block">产品描述</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="请输入产品详细描述、质量情况等信息"
                rows={4}
                className="w-full px-3 py-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF] resize-none"
              />
            </div>
          </div>

          {/* 产品图片 */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-[#23303B] mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#456EFE] rounded-full"></div>
              产品图片
            </h3>
            <p className="text-xs text-[#8E949A] mb-3">最多上传6张图片</p>
            
            <div className="grid grid-cols-3 gap-3">
              {uploadedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image}
                    alt={`产品图${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF6B6B] rounded-full flex items-center justify-center"
                  >
                    <X size={14} className="text-white" />
                  </button>
                </div>
              ))}
              
              {uploadedImages.length < 6 && (
                <label className="aspect-square bg-[#F9F9FB] rounded-lg border-2 border-dashed border-[rgba(164,169,174,0.3)] flex flex-col items-center justify-center cursor-pointer hover:border-[#456EFE] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload size={24} className="text-[#8E949A] mb-1" />
                  <span className="text-xs text-[#8E949A]">上传图片</span>
                </label>
              )}
            </div>
          </div>

          {/* 联系信息 */}
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-[#23303B] mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-[#456EFE] rounded-full"></div>
              联系信息
            </h3>

            {/* 联系人 */}
            <div className="mb-4">
              <label className="text-sm text-[#8E949A] mb-2 block">
                联系人 <span className="text-[#FF6B6B]">*</span>
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                placeholder="请输入联系人姓名"
                className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
              />
            </div>

            {/* 联系电话 */}
            <div className="mb-4">
              <label className="text-sm text-[#8E949A] mb-2 block">
                联系电话 <span className="text-[#FF6B6B]">*</span>
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="请输入手机号码"
                className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
              />
            </div>

            {/* 所在地址 */}
            <div>
              <label className="text-sm text-[#8E949A] mb-2 block">所在地址</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="请输入详细地址"
                className="w-full h-12 px-3 bg-[#F9F9FB] rounded-lg text-[#23303B] border border-[rgba(164,169,174,0.2)] placeholder:text-[#BFBFBF]"
              />
            </div>
          </div>

          {/* 温馨提示 */}
          <div className="bg-[#FFF7ED] rounded-xl p-4 border border-[#FED7AA]">
            <h4 className="text-[#EA580C] mb-2">温馨提示</h4>
            <ul className="text-xs text-[#9A3412] space-y-1">
              <li>• 请确保填写的产品信息真实有效</li>
              <li>• 我们会在1-2个工作日内与您联系</li>
              <li>• 如有任何问题，请联系客服：400-123-4567</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部提交按钮 - 固定悬浮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[rgba(164,169,174,0.15)] px-4 py-3 shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-gradient-to-r from-[#456EFE] to-[#2B6CFF] text-white rounded-lg transition-all active:opacity-90"
        >
          提交信息
        </button>
      </div>
    </div>
  );
}