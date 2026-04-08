import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import glpDrugs from '../../assets/glp-drugs.png';
import patient from '../../assets/patient.jpg';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const trust = ['إشراف طبي كامل', 'خصوصية مضمونة', 'جرّب 30 يوم مجاناً'];

const bullets = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#0f4c5c] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    highlight: 'إشراف طبي كامل',
    rest: 'يشرف على برنامجك أطباء متخصصون في طب السمنة والتغذية.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#0f4c5c] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    highlight: 'خصوصيتك مضمونة',
    rest: 'بياناتك محمية بالكامل ولا تُشارك مع أي جهة خارجية.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#0f4c5c] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    highlight: 'جرّب 30 يومًا مجانًا',
    rest: 'ابدأ رحلتك دون أي التزام مالي في الشهر الأول.',
  },
];

const imagePanels = [
  { bg: '#f1f5f9', accent: '#0f4c5c', label: 'مريض معافى', sublabel: 'قصة نجاح حقيقية' },
  { bg: '#e8f5e9', accent: '#9dce5b', label: 'أدوية GLP-1', sublabel: 'معتمدة طبيًا' },
  { bg: '#e0f2fe', accent: '#0f4c5c', label: 'متابعة مستمرة', sublabel: 'طوال رحلتك' },
];

const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-[#0f4c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: 'استشارة طبية شخصية',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#9dce5b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'وصفة طبية معتمدة',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#0f4c5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    label: 'دعم ومتابعة مستمرة',
  },
];

export default function Hero() {
  return (
    <section dir="rtl" className="bg-white pt-28">
      {/* ── Top two-column ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* Right col: Heading + CTAs */}
          <div className="flex-1 lg:max-w-2xl">
            <motion.h1
              {...fadeUp(0.05)}
              className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-tight mb-8"
            >
              احصل على وصفة طبية لأدوية<br />
              إنقاص الوزن بثقة وأمان
            </motion.h1>

            <motion.div {...fadeUp(0.15)}>
              <Link
                to="/onboarding"
                className="bg-slate-900 hover:bg-[#0f4c5c] text-white font-semibold text-base px-7 py-3.5 rounded-full transition-all duration-250"
              >
                ابدأ الآن مجانا              </Link>
            </motion.div>
          </div>

          {/* Left col: Bullet points */}
          <motion.div {...fadeUp(0.2)} className="lg:w-[380px] flex flex-col divide-y divide-slate-100">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                {b.icon}
                <p className="text-sm text-slate-600 leading-relaxed">
                  <span className="text-[#0f4c5c] font-bold">{b.highlight}</span>{' '}
                  {b.rest}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Three image panels ── */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-0 rounded-2xl overflow-hidden">
            {imagePanels.map((panel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative overflow-hidden h-[220px] sm:h-[320px] lg:h-[420px]"
                style={{ background: panel.bg }}
              >
                {i === 1 ? (
                  <img src={glpDrugs} alt="أدوية GLP-1" className="absolute inset-0 w-full h-full object-cover object-center" />
                ) : i === 0 ? (
                  <img src={patient} alt="مريض معافى" className="absolute inset-0 w-full h-full object-cover object-top" />
                ) : (
                  /* Placeholder content */
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ background: `${panel.accent}20` }}
                    >
                      <svg className="w-9 h-9" style={{ color: panel.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <p className="font-semibold text-sm" style={{ color: panel.accent }}>{panel.label}</p>
                    <p className="text-xs text-slate-400">{panel.sublabel}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Feature labels — overlaps bottom of images ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative -mt-16 z-10">
          <div className="grid grid-cols-3 gap-0 bg-white rounded-2xl shadow-sm">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                className="flex flex-col items-center text-center gap-2 px-3 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 border-l border-slate-100 first:border-l-0"
              >
                {f.icon}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-[180px]">{f.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
