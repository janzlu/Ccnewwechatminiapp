import { Search, SlidersHorizontal, Heart, Bookmark, Square, Circle, CircleDot, Hexagon, RectangleHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MallPageProps {
  onProductClick?: (productId: number) => void;
}

// 形状图标映射
const shapeIcons = {
  '方片': Square,
  '圆片': Circle,
  '圆环': CircleDot,
  '同心瓦': Hexagon,
  '直边瓦': RectangleHorizontal,
  '同R瓦': Circle, // 半圆形用Circle代替
  '方磨圆': Square, // 圆角方形
  '异形': Hexagon,
  '方块': Square,
  '圆柱': Circle,
  '环形': CircleDot,
  '瓦形': Hexagon,
  '其他': Square,
};

const mainCategories = [
  { id: 'finished', name: '成品' },
  { id: 'blank', name: '毛坯' },
  { id: 'material', name: '原料' },
];

const subCategories = {
  finished: ['方片', '圆片', '圆环', '同心瓦', '直边瓦', '同R瓦', '方磨圆', '异形'],
  blank: ['方片', '圆片', '圆环', '同心瓦', '直边瓦', '同R瓦', '方磨圆', '异形'],
  material: ['方片', '圆片', '圆环', '同心瓦', '直边瓦', '同R瓦', '方磨圆', '异形'],
};

// 成品的系列分类
const finishedSeries = ['N系列', 'M系列', 'H系列', 'SH系列', 'UH系列'];

// 毛坯的系列分类
const blankSeries = ['N系列', 'M系列', 'H系列'];

// 原料的系列分类
const materialSeries = ['N系列', 'M系列', 'H系列', 'SH系列', 'UH系列', 'EH系列', 'AH系列'];

// 原料报价数据
const materialPricing = {
  'N系列': [
    {
      grade: 'N35',
      br: '12',
      hcj: '12',
      blankPrice: 150000,
      prices: [
        { range: '> D25', price: 160 },
        { range: 'D20-D24.9', price: 165 },
        { range: 'D16-D19.9', price: 170 },
        { range: 'D13-D15.9', price: 174 },
        { range: 'D10-D12.9', price: 180 },
        { range: 'D8-D9.9', price: 200 },
        { range: 'D7-D7.9', price: 210 },
        { range: 'D6-D6.9', price: 215 },
        { range: 'D5-D5.9', price: 224 },
        { range: 'D4-D4.9', price: 230 },
        { range: 'D3-D3.9', price: 237 },
        { range: 'D2-D2.9', price: 315 },
        { range: 'D1-D1.9', price: 750 },
        { range: 'D0.5-D0.9', price: 1060 },
      ],
    },
    {
      grade: 'N38',
      br: '12.4',
      hcj: '12',
      blankPrice: 155000,
      prices: [
        { range: '> D25', price: 166 },
        { range: 'D20-D24.9', price: 171 },
        { range: 'D16-D19.9', price: 176 },
        { range: 'D13-D15.9', price: 180 },
        { range: 'D10-D12.9', price: 186 },
        { range: 'D8-D9.9', price: 206 },
        { range: 'D7-D7.9', price: 216 },
        { range: 'D6-D6.9', price: 221 },
        { range: 'D5-D5.9', price: 230 },
        { range: 'D4-D4.9', price: 236 },
        { range: 'D3-D3.9', price: 243 },
        { range: 'D2-D2.9', price: 321 },
        { range: 'D1-D1.9', price: 756 },
        { range: 'D0.5-D0.9', price: 1066 },
      ],
    },
    {
      grade: 'N42',
      br: '13',
      hcj: '12',
      blankPrice: 160000,
      prices: [
        { range: '> D25', price: 172 },
        { range: 'D20-D24.9', price: 177 },
        { range: 'D16-D19.9', price: 182 },
        { range: 'D13-D15.9', price: 186 },
        { range: 'D10-D12.9', price: 192 },
        { range: 'D8-D9.9', price: 212 },
        { range: 'D7-D7.9', price: 222 },
        { range: 'D6-D6.9', price: 227 },
        { range: 'D5-D5.9', price: 236 },
        { range: 'D4-D4.9', price: 242 },
        { range: 'D3-D3.9', price: 249 },
        { range: 'D2-D2.9', price: 327 },
        { range: 'D1-D1.9', price: 762 },
        { range: 'D0.5-D0.9', price: 1072 },
      ],
    },
  ],
  'M系列': [
    {
      grade: 'M38',
      br: '12.5',
      hcj: '13',
      blankPrice: 155000,
      prices: [
        { range: '> D25', price: 165 },
        { range: 'D20-D24.9', price: 170 },
        { range: 'D16-D19.9', price: 175 },
        { range: 'D13-D15.9', price: 179 },
        { range: 'D10-D12.9', price: 185 },
        { range: 'D8-D9.9', price: 205 },
        { range: 'D7-D7.9', price: 215 },
        { range: 'D6-D6.9', price: 220 },
      ],
    },
    {
      grade: 'M42',
      br: '13',
      hcj: '13',
      blankPrice: 162000,
      prices: [
        { range: '> D25', price: 173 },
        { range: 'D20-D24.9', price: 178 },
        { range: 'D16-D19.9', price: 183 },
        { range: 'D13-D15.9', price: 187 },
        { range: 'D10-D12.9', price: 193 },
        { range: 'D8-D9.9', price: 213 },
        { range: 'D7-D7.9', price: 223 },
        { range: 'D6-D6.9', price: 228 },
      ],
    },
    {
      grade: 'M45',
      br: '13.5',
      hcj: '13',
      blankPrice: 168000,
      prices: [
        { range: '> D25', price: 179 },
        { range: 'D20-D24.9', price: 184 },
        { range: 'D16-D19.9', price: 189 },
        { range: 'D13-D15.9', price: 193 },
        { range: 'D10-D12.9', price: 199 },
        { range: 'D8-D9.9', price: 219 },
        { range: 'D7-D7.9', price: 229 },
        { range: 'D6-D6.9', price: 234 },
      ],
    },
  ],
  'H系列': [
    {
      grade: 'H38',
      br: '12.5',
      hcj: '14',
      blankPrice: 160000,
      prices: [
        { range: '> D25', price: 170 },
        { range: 'D20-D24.9', price: 175 },
        { range: 'D16-D19.9', price: 180 },
        { range: 'D13-D15.9', price: 184 },
        { range: 'D10-D12.9', price: 190 },
        { range: 'D8-D9.9', price: 210 },
      ],
    },
    {
      grade: 'H42',
      br: '13',
      hcj: '14',
      blankPrice: 167000,
      prices: [
        { range: '> D25', price: 178 },
        { range: 'D20-D24.9', price: 183 },
        { range: 'D16-D19.9', price: 188 },
        { range: 'D13-D15.9', price: 192 },
        { range: 'D10-D12.9', price: 198 },
        { range: 'D8-D9.9', price: 218 },
      ],
    },
    {
      grade: 'H45',
      br: '13.5',
      hcj: '14',
      blankPrice: 173000,
      prices: [
        { range: '> D25', price: 184 },
        { range: 'D20-D24.9', price: 189 },
        { range: 'D16-D19.9', price: 194 },
        { range: 'D13-D15.9', price: 198 },
        { range: 'D10-D12.9', price: 204 },
        { range: 'D8-D9.9', price: 224 },
      ],
    },
  ],
  'SH系列': [
    {
      grade: 'SH35',
      br: '12',
      hcj: '15',
      blankPrice: 165000,
      prices: [
        { range: '> D25', price: 175 },
        { range: 'D20-D24.9', price: 180 },
        { range: 'D16-D19.9', price: 185 },
        { range: 'D13-D15.9', price: 189 },
        { range: 'D10-D12.9', price: 195 },
        { range: 'D8-D9.9', price: 215 },
      ],
    },
    {
      grade: 'SH38',
      br: '12.5',
      hcj: '15',
      blankPrice: 171000,
      prices: [
        { range: '> D25', price: 182 },
        { range: 'D20-D24.9', price: 187 },
        { range: 'D16-D19.9', price: 192 },
        { range: 'D13-D15.9', price: 196 },
        { range: 'D10-D12.9', price: 202 },
        { range: 'D8-D9.9', price: 222 },
      ],
    },
    {
      grade: 'SH42',
      br: '13',
      hcj: '15',
      blankPrice: 178000,
      prices: [
        { range: '> D25', price: 189 },
        { range: 'D20-D24.9', price: 194 },
        { range: 'D16-D19.9', price: 199 },
        { range: 'D13-D15.9', price: 203 },
        { range: 'D10-D12.9', price: 209 },
        { range: 'D8-D9.9', price: 229 },
      ],
    },
  ],
  'UH系列': [
    {
      grade: 'UH35',
      br: '12',
      hcj: '16',
      blankPrice: 170000,
      prices: [
        { range: '> D25', price: 180 },
        { range: 'D20-D24.9', price: 185 },
        { range: 'D16-D19.9', price: 190 },
        { range: 'D13-D15.9', price: 194 },
        { range: 'D10-D12.9', price: 200 },
        { range: 'D8-D9.9', price: 220 },
      ],
    },
    {
      grade: 'UH38',
      br: '12.5',
      hcj: '16',
      blankPrice: 177000,
      prices: [
        { range: '> D25', price: 188 },
        { range: 'D20-D24.9', price: 193 },
        { range: 'D16-D19.9', price: 198 },
        { range: 'D13-D15.9', price: 202 },
        { range: 'D10-D12.9', price: 208 },
        { range: 'D8-D9.9', price: 228 },
      ],
    },
    {
      grade: 'UH42',
      br: '13',
      hcj: '16',
      blankPrice: 184000,
      prices: [
        { range: '> D25', price: 195 },
        { range: 'D20-D24.9', price: 200 },
        { range: 'D16-D19.9', price: 205 },
        { range: 'D13-D15.9', price: 209 },
        { range: 'D10-D12.9', price: 215 },
        { range: 'D8-D9.9', price: 235 },
      ],
    },
  ],
  'EH系列': [
    {
      grade: 'EH35',
      br: '12',
      hcj: '17',
      blankPrice: 175000,
      prices: [
        { range: '> D25', price: 185 },
        { range: 'D20-D24.9', price: 190 },
        { range: 'D16-D19.9', price: 195 },
        { range: 'D13-D15.9', price: 199 },
        { range: 'D10-D12.9', price: 205 },
        { range: 'D8-D9.9', price: 225 },
      ],
    },
    {
      grade: 'EH38',
      br: '12.5',
      hcj: '17',
      blankPrice: 182000,
      prices: [
        { range: '> D25', price: 193 },
        { range: 'D20-D24.9', price: 198 },
        { range: 'D16-D19.9', price: 203 },
        { range: 'D13-D15.9', price: 207 },
        { range: 'D10-D12.9', price: 213 },
        { range: 'D8-D9.9', price: 233 },
      ],
    },
    {
      grade: 'EH42',
      br: '13',
      hcj: '17',
      blankPrice: 189000,
      prices: [
        { range: '> D25', price: 200 },
        { range: 'D20-D24.9', price: 205 },
        { range: 'D16-D19.9', price: 210 },
        { range: 'D13-D15.9', price: 214 },
        { range: 'D10-D12.9', price: 220 },
        { range: 'D8-D9.9', price: 240 },
      ],
    },
  ],
  'AH系列': [
    {
      grade: 'AH35',
      br: '12',
      hcj: '18',
      blankPrice: 180000,
      prices: [
        { range: '> D25', price: 191 },
        { range: 'D20-D24.9', price: 196 },
        { range: 'D16-D19.9', price: 201 },
        { range: 'D13-D15.9', price: 205 },
      ],
    },
    {
      grade: 'AH38',
      br: '12.5',
      hcj: '18',
      blankPrice: 187000,
      prices: [
        { range: '> D25', price: 199 },
        { range: 'D20-D24.9', price: 204 },
        { range: 'D16-D19.9', price: 209 },
        { range: 'D13-D15.9', price: 213 },
      ],
    },
    {
      grade: 'AH42',
      br: '13',
      hcj: '18',
      blankPrice: 194000,
      prices: [
        { range: '> D25', price: 206 },
        { range: 'D20-D24.9', price: 211 },
        { range: 'D16-D19.9', price: 216 },
        { range: 'D13-D15.9', price: 220 },
      ],
    },
  ],
};

const products = [
  {
    id: 1,
    name: 'N52H 钕铁硼方片',
    specs: '72.8×50.8×19.8mm',
    price: 173,
    unit: 'kg',
    stock: 5000,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N52H',
    material: '钕铁硼',
    surface: '镀镍',
    supplier: '江西',
    delivery: '当前到货',
    weight: 1548.643,
    totalWeight: 7744.16,
    br: 7.6,
    hcj: 13.5,
    bh: 15.6,
  },
  {
    id: 2,
    name: 'N50H 钕铁硼方片',
    specs: '72.8×50.8×19.8mm',
    price: 173,
    unit: 'kg',
    stock: 30,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N50H',
    material: '钕铁硼',
    surface: '镀镍',
    supplier: '江西',
    delivery: '当前到货',
    weight: 1548.643,
    totalWeight: 51.47,
    br: 7.6,
    hcj: 13.5,
    bh: 15.6,
  },
  {
    id: 3,
    name: 'N52H 钕铁硼方片',
    specs: '65.5×51.3×30.7mm',
    price: 277,
    unit: 'kg',
    stock: 30,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N52H',
    material: '钕铁硼',
    surface: '镀镍',
    supplier: '江西',
    delivery: '预订中',
    weight: 700.119,
    totalWeight: 21.201,
    br: 7.6,
    hcj: 14.5,
    bh: 16.6,
  },
  {
    id: 4,
    name: 'N48H 钕铁硼方片',
    specs: '53.7×51×41.5mm',
    price: 258,
    unit: 'kg',
    stock: 147,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N48H',
    material: '钕铁硼',
    surface: '镀镍',
    supplier: '粤通',
    delivery: '预订中',
    weight: 858.104,
    totalWeight: 126.142,
    br: 7.58,
    hcj: 15.5,
    bh: 17.6,
  },
  {
    id: 5,
    name: 'N42H 钕铁硼方片',
    specs: '65×54×20mm',
    price: 224,
    unit: 'kg',
    stock: 254,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N42H',
    material: '钕铁硼',
    surface: '镀镍',
    supplier: '粤通',
    delivery: '预订中',
    weight: 1024.530,
    totalWeight: 2596.918,
    br: 7.6,
    hcj: 16.5,
    bh: 18.6,
  },
  {
    id: 6,
    name: 'N42H 钕铁硼方片',
    specs: '62.7×53.5×59.9mm',
    price: 224,
    unit: 'kg',
    stock: 760,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N42H',
    material: '钕铁硼',
    surface: '镀镍',
    supplier: '粤通',
    delivery: '预订中',
    weight: 1539.427,
    totalWeight: 791.098,
    br: 7.6,
    hcj: 13.5,
    bh: 14.6,
  },
  {
    id: 101,
    name: 'N35 钕铁硼方片 (小)',
    specs: '5×5×2mm',
    price: 0.45,
    unit: '件',
    stock: 20000,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N35',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 102,
    name: 'N42 钕铁硼方片',
    specs: '20×10×5mm',
    price: 1.85,
    unit: '件',
    stock: 5000,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N42',
    material: '钕铁硼',
    surface: '镀锌',
  },
  {
    id: 103,
    name: 'N52 强磁方片',
    specs: '15×15×5mm',
    price: 2.20,
    unit: '件',
    stock: 3000,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N52',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 104,
    name: 'N38 沉孔方片',
    specs: '30×10×5mm',
    price: 3.50,
    unit: '件',
    stock: 4500,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N38',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 105,
    name: 'N45 钕铁硼长方条',
    specs: '50×10×3mm',
    price: 4.80,
    unit: '件',
    stock: 2800,
    category: 'finished',
    subCategory: '方片',
    series: 'N系列',
    grade: 'N45',
    material: '钕铁硼',
    surface: '环氧树脂',
  },
  {
    id: 106,
    name: 'M42 钕铁硼方片',
    specs: '12×12×6mm',
    price: 1.65,
    unit: '件',
    stock: 6000,
    category: 'finished',
    subCategory: '方片',
    series: 'M系列',
    grade: 'M42',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 107,
    name: 'H45 钕铁硼方片',
    specs: '15×15×8mm',
    price: 2.85,
    unit: '件',
    stock: 4200,
    category: 'finished',
    subCategory: '方片',
    series: 'H系列',
    grade: 'H45',
    material: '钕铁硼',
    surface: '镀锌',
  },
  {
    id: 2,
    name: 'N52 钕铁硼圆片',
    specs: 'D20×3mm',
    price: 1.2,
    unit: '件',
    stock: 8500,
    category: 'finished',
    subCategory: '圆片',
    series: 'N系列',
    grade: 'N52',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 201,
    name: 'M38 钕铁硼圆片',
    specs: 'D15×2mm',
    price: 0.92,
    unit: '件',
    stock: 12000,
    category: 'finished',
    subCategory: '圆片',
    series: 'M系列',
    grade: 'M38',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 3,
    name: 'N38 钕铁硼圆环',
    specs: 'D30×D15×5mm',
    price: 2.5,
    unit: '件',
    stock: 5000,
    category: 'finished',
    subCategory: '圆环',
    series: 'N系列',
    grade: 'N38',
    material: '钕铁硼',
    surface: '镀镍',
  },
  {
    id: 4,
    name: 'N42 同心瓦磁铁',
    specs: '弧度90°×R20×5mm',
    price: 3.8,
    unit: '件',
    stock: 3200,
    category: 'finished',
    subCategory: '同心瓦',
    series: 'N系列',
    grade: 'N42',
    material: '钕铁硼',
    surface: '镀锌',
  },
  {
    id: 5,
    name: '钕铁硼方块毛坯',
    specs: '50×50×25mm',
    price: 45,
    unit: '块',
    stock: 1200,
    category: 'blank',
    subCategory: '方块',
    series: 'N系列',
    grade: 'N40',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 6,
    name: '钕铁硼圆柱毛坯',
    specs: 'D50×30mm',
    price: 52,
    unit: '块',
    stock: 800,
    category: 'blank',
    subCategory: '圆柱',
    series: 'N系列',
    grade: 'N42',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 7,
    name: '镨钕氧化物',
    specs: '纯度99.5%',
    price: 430,
    unit: 'kg',
    stock: 500,
    category: 'material',
    subCategory: 'N系列',
    series: 'N35',
    grade: '99.5%',
    material: '镨钕氧化物',
    surface: '无',
  },
  {
    id: 701,
    name: 'N35 钕铁硼毛坯',
    specs: 'Br: 12kGs, Hcj: 12kOe',
    price: 150000,
    unit: '吨',
    stock: 50,
    category: 'material',
    subCategory: 'N系列',
    series: 'N35',
    grade: 'N35',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 702,
    name: 'N38 钕铁硼毛坯',
    specs: 'Br: 12.4kGs, Hcj: 12kOe',
    price: 155000,
    unit: '吨',
    stock: 45,
    category: 'material',
    subCategory: 'N系列',
    series: 'N38',
    grade: 'N38',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 703,
    name: 'N42 钕铁硼毛坯',
    specs: 'Br: 13kGs, Hcj: 12kOe',
    price: 160000,
    unit: '吨',
    stock: 40,
    category: 'material',
    subCategory: 'N系列',
    series: 'N42',
    grade: 'N42',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 704,
    name: 'M38 钕铁硼毛坯',
    specs: 'Br: 12.5kGs, Hcj: 13kOe',
    price: 155000,
    unit: '吨',
    stock: 35,
    category: 'material',
    subCategory: 'M系列',
    series: 'M38',
    grade: 'M38',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 705,
    name: 'M42 钕铁硼毛坯',
    specs: 'Br: 13kGs, Hcj: 13kOe',
    price: 162000,
    unit: '吨',
    stock: 30,
    category: 'material',
    subCategory: 'M系列',
    series: 'M42',
    grade: 'M42',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 706,
    name: 'H38 钕铁硼毛坯',
    specs: 'Br: 12.5kGs, Hcj: 14kOe',
    price: 160000,
    unit: '吨',
    stock: 38,
    category: 'material',
    subCategory: 'H系列',
    series: 'H38',
    grade: 'H38',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 707,
    name: 'H42 钕铁硼毛坯',
    specs: 'Br: 13kGs, Hcj: 14kOe',
    price: 167000,
    unit: '吨',
    stock: 32,
    category: 'material',
    subCategory: 'H系列',
    series: 'H42',
    grade: 'H42',
    material: '钕铁硼',
    surface: '无',
  },
  {
    id: 8,
    name: '金属镝',
    specs: '纯度99%',
    price: 2910,
    unit: 'kg',
    stock: 200,
    category: 'material',
    subCategory: 'SH系列',
    series: 'SH35',
    grade: '99%',
    material: '金属镝',
    surface: '无',
  },
];

export default function MallPage({ onProductClick }: MallPageProps) {
  const [selectedMainCategory, setSelectedMainCategory] = useState('finished');
  const [selectedSubCategory, setSelectedSubCategory] = useState('方片');
  const [selectedSeries, setSelectedSeries] = useState('N系列'); // 新增：选中的系列
  const [selectedGrade, setSelectedGrade] = useState<string>('');

  const currentSubCategories = subCategories[selectedMainCategory as keyof typeof subCategories];
  
  // 判断各种分类逻辑
  const isMaterial = selectedMainCategory === 'material';
  const isFinished = selectedMainCategory === 'finished';
  const isBlank = selectedMainCategory === 'blank';
  
  // 根据不同分类确定系列列表
  const currentSeries = isFinished ? finishedSeries : isBlank ? blankSeries : isMaterial ? materialSeries : [];

  // 筛选产品（仅用于成品和毛坯）
  const filteredProducts = products.filter((p) => {
    if (p.category !== selectedMainCategory) return false;
    if (isMaterial) return false; // 原料不使用商品列表
    // 成品和毛坯：按顶部形状和左侧系列筛选
    if (p.subCategory !== selectedSubCategory) return false;
    if (p.series !== selectedSeries) return false;
    return true;
  });

  // 获取当前原料系列的报价数据
  const currentMaterialPricings = isMaterial
    ? materialPricing[selectedSeries as keyof typeof materialPricing] || []
    : [];

  // 获取当前选中的牌号数据（原料价格表使用）
  const activeGradeData = currentMaterialPricings.find(p => p.grade === selectedGrade) || currentMaterialPricings[0];
  
  // 确定左侧显示的列表项
  const leftSidebarItems = isMaterial 
    ? materialSeries  // 原料左侧显示系列
    : currentSeries;

  return (
    <div className="min-h-full bg-[#F9F9FB] flex flex-col">
      {/* 搜索框和分类切换 */}
      <div className="bg-white px-4 py-3 space-y-3 shadow-sm z-10">
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4A9AE]" size={20} />
          <input
            type="text"
            placeholder="搜索商品..."
            className="w-full h-12 pl-11 pr-24 bg-[rgba(164,169,174,0.15)] rounded-lg text-[#23303B] placeholder:text-[#A4A9AE]"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="text-[#A4A9AE] p-1 cursor-pointer" type="button">
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* 大类切换 */}
        <div className="flex gap-2 justify-around">
          {mainCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedMainCategory(category.id);
                const firstSub = subCategories[category.id as keyof typeof subCategories][0];
                setSelectedSubCategory(firstSub);
                // 如果切换到原料，重置选中的牌号
                if (category.id === 'material') {
                   setSelectedGrade(''); 
                }
              }}
              className={`pb-2 px-4 transition-all relative font-medium ${
                selectedMainCategory === category.id
                  ? 'text-[#456EFE] after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[20px] after:h-[3px] after:bg-[#456EFE] after:rounded-full'
                  : 'text-[#8E949A]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部形状/系列选择横向滚动栏 */}
        {(isFinished || isBlank || isMaterial) && (
          <div className="w-full px-4 pt-3 pb-1 flex-none z-[5] bg-[#F9F9FB]">
             <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {currentSubCategories.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedSubCategory(item);
                      if (isMaterial) {
                        setSelectedGrade(''); // 原料：牌号
                      }
                    }}
                    className={`px-4 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors flex-none ${
                      selectedSubCategory === item
                        ? 'bg-[#E8F0FF] text-[#456EFE] font-medium'
                        : 'bg-white text-[#8E949A]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
             </div>
          </div>
        )}

        <div className="flex-1 flex overflow-hidden">
          {/* 左侧侧边栏 */}
          <div className="w-16 bg-white overflow-y-auto flex-none pb-20 border-r border-gray-100">
            {leftSidebarItems.map((item) => {
              const isSelected = selectedSeries === item;
                
              return (
                <button
                  key={item}
                  onClick={() => {
                    setSelectedSeries(item); // 统一设置系列
                  }}
                  className={`w-full py-4 px-1 text-sm transition-all text-center ${
                    isSelected
                      ? 'text-[#23303B] font-medium bg-[#F9F9FB] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-[16px] before:bg-[#456EFE] before:rounded-r'
                      : 'text-[#8E949A] bg-white'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1 overflow-y-auto p-4 pb-24">
            {isMaterial ? (
              // 原料页面：和成品一样的格式
              <>
                {currentMaterialPricings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-[#A4A9AE]">  
                    <p>暂无商品</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentMaterialPricings.map((material) => {
                      const ShapeIcon = shapeIcons[selectedSubCategory as keyof typeof shapeIcons] || Square;
                      
                      // 根据系列和牌号查找对应的商品ID
                      const matchedProduct = products.find(p => 
                        p.category === 'material' && 
                        p.grade === material.grade
                      );
                      
                      return (
                        <div key={material.grade} className="bg-white rounded-xl p-4 shadow-sm">
                          <div 
                            className="cursor-pointer"
                            onClick={() => matchedProduct && onProductClick?.(matchedProduct.id)}
                          >
                            {/* 标题行：图标 + 牌号 + 价格 */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <ShapeIcon size={20} className="text-[#456EFE] flex-none" strokeWidth={2} />
                                <h4 className="text-[#23303B] text-base font-medium truncate font-bold">
                                  {material.grade}
                                </h4>
                              </div>
                              <div className="flex-none">
                                <span className="text-[#456EFE] text-2xl text-[16px] font-normal font-bold">¥{material.prices[0].price}</span>
                                <span className="text-sm text-[#A4A9AE] ml-1">/个</span>
                              </div>
                            </div>
                            
                            {/* 详细参数 */}
                            <div className="space-y-1.5">
                              <p className="text-sm text-[#8E949A]">
                                原料密度: <span className="text-[#23303B]">7.6</span>
                                <span className="ml-4">数量: <span className="text-[#23303B]">{material.prices[0].range === '> D25' ? '7700' : '21'}</span></span>
                              </p>
                              <p className="text-sm text-[#8E949A]">
                                尺寸：<span className="text-[#23303B]">{material.prices[0].range === '> D25' ? '72.8×50.8×19.8mm' : '65.5×51.3×30.7mm'}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              // 成品和毛坯：显示商品列表
              <>
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-[#A4A9AE]">
                    <p>暂无商品</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredProducts.map((product) => {
                      const ShapeIcon = shapeIcons[product.subCategory as keyof typeof shapeIcons] || Square;
                      
                      return (
                        <div key={product.id} className="bg-white rounded-xl p-4 shadow-sm">
                          <div
                            className="cursor-pointer"
                            onClick={() => onProductClick?.(product.id)}
                          >
                            {/* 标题行：图标 + 性能等级 + 产品名 + 价格 */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <ShapeIcon size={20} className="text-[#456EFE] flex-none" strokeWidth={2} />
                                <h4 className="text-[#23303B] text-base font-medium truncate font-bold">
                                  {product.grade}
                                </h4>
                              </div>
                              <div className="flex-none">
                                <span className="text-[#456EFE] text-2xl text-[16px] font-normal font-bold">¥{product.price.toLocaleString()}</span>
                                <span className="text-sm text-[#A4A9AE] ml-1">/个</span>
                              </div>
                            </div>
                            
                            {/* 详细参数 */}
                            <div className="space-y-1.5">
                              <p className="text-sm text-[#8E949A]">
                                原料密度：<span className="text-[#23303B]">{product.br || '-'}</span>
                                <span className="ml-4">表面处理：<span className="text-[#23303B]">{product.surface || '-'}</span></span>
                              </p>
                              <p className="text-sm text-[#8E949A]">
                                尺寸：<span className="text-[#23303B]">{product.specs}</span>
                                <span className="ml-4">数量：<span className="text-[#23303B]">{(product.totalWeight || product.stock) ? Math.round(product.totalWeight || product.stock) : '-'}</span></span>
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )
              }
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}