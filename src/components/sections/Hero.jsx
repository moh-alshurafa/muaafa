import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const trust = ['إشراف طبي كامل', 'خصوصية مضمونة', 'جرّب 30 يوم مجاناً'];

export default function Hero() {
  return (
    <section dir="rtl" className="bg-white pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Right col: Text ── */}
          <div className="flex-1 lg:max-w-[54%]">

            {/* Heading */}
            <motion.h1
              {...fadeUp(0.06)}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-5"
            >
              مرحباً بك في برنامج معافى <span className="text-[#0f4c5c]">لإنقاص الوزن</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.12)}
              className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 max-w-md"
            >
              رحلتك نحو وزن صحي بإشراف طبي كامل<br />
              نتائج آمنة ومضمونة مع فريق طبي متخصص يرافقك في كل خطوة
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.17)} className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                to="/onboarding"
                className="text-center bg-[#0f4c5c] hover:bg-[#0d3f4e] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-colors duration-200"
              >
                ابدأ الآن مجاناً
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2">
              {trust.map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <svg className="w-4 h-4 text-[#9dce5b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
