// 模拟数据服务
// 统一管理所有模拟数据和伪造的异步请求

// 类型定义
export interface MarketTrendItem {
  date: string;
  price: number;
}

export interface MarketQuote {
  id: number;
  name: string;
  price: number;
  unit: string;
  dayChange: number; // 涨跌值
  dayPct: number;    // 涨跌幅 %
  weekChange: number;
  weekPct: number;
}

export interface Product {
  id: number;
  name: string;
  grade: string;
  coating: string;
  temp: string;
  price: number;
  minOrder: number;
  sales: number;
  tags: string[];
  image: string;
  category?: string;
}

// ------------------------------------------------------------------
// 静态数据源
// ------------------------------------------------------------------

const MARKET_TRENDS_DATA: Record<string, MarketTrendItem[]> = {
  '镨钕金属': [
    { date: '12/09', price: 200 },
    { date: '12/10', price: 400 },
    { date: '12/11', price: 600 },
    { date: '12/12', price: 180 },
    { date: '12/13', price: 520 },
    { date: '12/14', price: 280 },
    { date: '12/15', price: 673 },
  ],
  '镨钕氧化物': [
    { date: '12/09', price: 180 },
    { date: '12/10', price: 350 },
    { date: '12/11', price: 550 },
    { date: '12/12', price: 160 },
    { date: '12/13', price: 480 },
    { date: '12/14', price: 250 },
    { date: '12/15', price: 620 },
  ],
  '金属镝': [
    { date: '12/09', price: 250 },
    { date: '12/10', price: 420 },
    { date: '12/11', price: 630 },
    { date: '12/12', price: 200 },
    { date: '12/13', price: 550 },
    { date: '12/14', price: 300 },
    { date: '12/15', price: 700 },
  ],
  '镝铁合金': [
    { date: '12/09', price: 220 },
    { date: '12/10', price: 380 },
    { date: '12/11', price: 580 },
    { date: '12/12', price: 190 },
    { date: '12/13', price: 500 },
    { date: '12/14', price: 270 },
    { date: '12/15', price: 650 },
  ],
};

const MARKET_QUOTES_DATA: MarketQuote[] = [
  { id: 1, name: '钕铁硼', price: 498, unit: '元/kg', dayChange: -4, dayPct: -0.80, weekChange: 8, weekPct: 1.63 },
  { id: 2, name: '镨钕氧化物', price: 430, unit: '元/kg', dayChange: -2, dayPct: -0.46, weekChange: 5, weekPct: 1.18 },
  { id: 3, name: '金属镝', price: 2910, unit: '元/kg', dayChange: -10, dayPct: -0.34, weekChange: 30, weekPct: 1.04 },
  { id: 4, name: '氧化铽', price: 5850, unit: '元/kg', dayChange: 20, dayPct: 0.34, weekChange: 150, weekPct: 2.63 },
  { id: 5, name: '铁红', price: 4.5, unit: '元/kg', dayChange: 0, dayPct: 0.00, weekChange: 0.1, weekPct: 2.27 },
];

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'N35 方形磁铁 20x10x2mm',
    grade: 'N35',
    coating: '镍铜镍',
    temp: '80℃',
    price: 0.45,
    minOrder: 1000,
    sales: 5200,
    tags: ['现货', '高性能'],
    image: 'https://images.unsplash.com/photo-1629804263740-1d8f58356193?w=200&h=200&fit=crop&q=80',
    category: 'square'
  },
  {
    id: 2,
    name: 'N52 强力圆片磁铁 D10x3mm',
    grade: 'N52',
    coating: '镀锌',
    temp: '60℃',
    price: 0.85,
    minOrder: 500,
    sales: 1200,
    tags: ['强磁', '热销'],
    image: 'https://images.unsplash.com/photo-1597423244037-519742d0a9f0?w=200&h=200&fit=crop&q=80',
    category: 'disc'
  },
  {
    id: 3,
    name: '35H 耐高温方块 50x20x5mm',
    grade: '35H',
    coating: '环氧树脂',
    temp: '120℃',
    price: 12.50,
    minOrder: 100,
    sales: 340,
    tags: ['耐高温', '黑环氧'],
    image: 'https://images.unsplash.com/photo-1599581971764-4e357e62a98f?w=200&h=200&fit=crop&q=80',
    category: 'square'
  },
  {
    id: 4,
    name: 'N35 沉头孔圆环 D20-D5x3mm',
    grade: 'N35',
    coating: '镍铜镍',
    temp: '80℃',
    price: 1.20,
    minOrder: 500,
    sales: 890,
    tags: ['沉头孔'],
    image: 'https://images.unsplash.com/photo-1616353995804-d7d457685652?w=200&h=200&fit=crop&q=80',
    category: 'ring'
  },
  {
    id: 5,
    name: 'N45 细长圆柱 D3x10mm',
    grade: 'N45',
    coating: '镍铜镍',
    temp: '80℃',
    price: 0.15,
    minOrder: 5000,
    sales: 15000,
    tags: ['精密'],
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=200&h=200&fit=crop&q=80',
    category: 'cylinder'
  }
];

// ------------------------------------------------------------------
// 辅助函数
// ------------------------------------------------------------------

// 模拟网络延迟 (300ms - 800ms)
const delay = (min = 300, max = 800) => {
  const time = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, time));
};

// ------------------------------------------------------------------
// API 方法
// ------------------------------------------------------------------

export const mockApi = {
  /**
   * 获取行情趋势数据
   */
  getMarketTrends: async (): Promise<Record<string, MarketTrendItem[]>> => {
    await delay();
    return MARKET_TRENDS_DATA;
  },

  /**
   * 获取最新市场报价
   */
  getMarketQuotes: async (): Promise<MarketQuote[]> => {
    await delay(200, 500);
    return MARKET_QUOTES_DATA;
  },

  /**
   * 搜索产品
   */
  searchProducts: async (query: string = '', filters?: any): Promise<Product[]> => {
    await delay(400, 900);
    
    let results = [...PRODUCTS_DATA];

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.grade.toLowerCase().includes(lowerQuery) ||
        p.tags.some(t => t.toLowerCase().includes(lowerQuery))
      );
    }

    // 可以在这里处理 filters
    
    return results;
  },

  /**
   * 获取产品详情
   */
  getProductDetail: async (id: number): Promise<Product | undefined> => {
    await delay(200, 400);
    return PRODUCTS_DATA.find(p => p.id === id);
  },

  /**
   * 提交订单
   */
  submitOrder: async (orderData: any) => {
    await delay(1000, 2000);
    return { success: true, orderId: `ORD-${Date.now()}` };
  }
};
