import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MIN = 60;
const MAX = 200;
const DEFAULT = 115;

export default function WeightCalculator() {
  const [weight, setWeight] = useState(DEFAULT);

  const lossLow = Math.round(weight * 0.15);
  const lossHigh = Math.round(weight * 0.20);
  const percent = ((weight - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="py-20 bg-slate-50" dir="rtl">
      <div className="max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-black text-slate-900 leading-snug mb-10"
        >
          في المتوسط، يفقد مستخدمو أدوية GLP-1 ما بين{' '}
          <span className="text-[#9dce5b]">15–20%</span> من وزنهم
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
        >
          {/* Current weight row */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-lg font-medium leading-snug">اختر وزنك الحالي</p>
            <p className="text-4xl font-black text-[#0f4c5c] tabular-nums">
              {weight} <span className="text-lg font-semibold text-slate-400">كجم</span>
            </p>
          </div>

          {/* Slider */}
          <div className="mb-10">
            <style>{`
              .weight-slider {
                -webkit-appearance: none;
                appearance: none;
                width: 100%;
                height: 5px;
                border-radius: 9999px;
                outline: none;
                cursor: pointer;
                background: linear-gradient(
                  to left,
                  #e2e8f0 ${100 - percent}%,
                  #0f4c5c ${100 - percent}%
                );
              }
              .weight-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #0f4c5c;
                border: 3px solid white;
                box-shadow: 0 0 0 2px #0f4c5c, 0 2px 8px rgba(15,76,92,0.25);
                cursor: pointer;
              }
              .weight-slider::-moz-range-thumb {
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #0f4c5c;
                border: 3px solid white;
                box-shadow: 0 0 0 2px #0f4c5c, 0 2px 8px rgba(15,76,92,0.25);
                cursor: pointer;
              }
            `}</style>
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="weight-slider"
              dir="ltr"
            />
          </div>

        </motion.div>

        <Link
          to="/onboarding"
          className="mt-6 w-full bg-[#0f4c5c] hover:bg-[#0a3642] text-white py-4 rounded-full font-black text-lg text-center transition-all shadow-sm hover:shadow-md block"
        >
          تاكد من أهليتك مجاناً
        </Link>

      </div>
    </section>
  );
}
