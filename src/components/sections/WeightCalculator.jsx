import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glucoseWoman from '../../assets/glucose-woman.jpg';

const MIN = 60;
const MAX = 200;
const DEFAULT = 115;

export default function WeightCalculator() {
  const [weight, setWeight] = useState(DEFAULT);

  const lossLow = Math.round(weight * 0.15);
  const lossHigh = Math.round(weight * 0.20);
  const percent = ((weight - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="py-12 md:py-20 bg-white" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left col: Image ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[45%] flex-shrink-0"
        >
          <div className="rounded-3xl overflow-hidden aspect-[3/4]">
            <img src={glucoseWoman} alt="امرأة تتحقق من مستوى الجلوكوز" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* ── Right col: Content ── */}
        <div className="flex-1 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-black text-slate-900 leading-snug mb-10 text-center"
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
            <p className="text-4xl font-black text-[#00A365] tabular-nums">
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
                  #00A365 ${100 - percent}%
                );
              }
              .weight-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #00A365;
                border: 3px solid white;
                box-shadow: 0 0 0 2px #00A365, 0 2px 8px rgba(15,76,92,0.25);
                cursor: pointer;
              }
              .weight-slider::-moz-range-thumb {
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #00A365;
                border: 3px solid white;
                box-shadow: 0 0 0 2px #00A365, 0 2px 8px rgba(15,76,92,0.25);
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
          className="mt-6 w-full bg-[#00A365] hover:bg-[#0a3642] text-white py-4 rounded-full font-black text-lg text-center transition-all shadow-sm hover:shadow-md block"
        >
          تاكد من أهليتك مجاناً
        </Link>

        </div>{/* end right col */}

        </div>{/* end flex row */}
      </div>
    </section>
  );
}
