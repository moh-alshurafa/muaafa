import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    num: 1,
    title: 'مراجعة طبية',
    detail: 'مراجعة شاملة لحالتك الصحية من قبل فريقنا الطبي. يقوم الطبيب بتقييم ملفك وتحديد الدواء الأنسب لك وفق معايير طبية دقيقة.',
  },
  {
    num: 2,
    title: 'خطة مخصصة',
    detail: 'خطة علاجية وغذائية مصممة خصيصاً لك. تشمل الوصفة الطبية وإرشادات التغذية والتمارين الموافقة لاحتياجاتك وأهدافك.',
  },
  {
    num: 3,
    title: 'المتابعة المستمرة',
    detail: 'متابعة مستمرة من فريقنا الطبي وأخصائيي التغذية لضمان وصولك لهدفك بأمان.',
  },
];

// Dot size in px — used to perfectly centre the timeline line
const DOT = 20; // w-5 = 20px
const LINE_OFFSET = DOT / 2; // 10px from the right edge

export default function HowItWorksTimeline() {
  const [open, setOpen] = useState(0);

  return (
    <section id="how-it-works" dir="rtl" className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* ── Heading + subtitle ── */}
          <div className="lg:w-[380px] lg:flex-shrink-0 lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
                كيف يعمل البرنامج؟
              </h2>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                ابدأ استشارتك المجانية في 3 خطوات بسيطة
              </p>
            </motion.div>
          </div>

          {/* ── Accordion + timeline ── */}
          <div className="flex-1 min-w-0">

            {/* Steps list with vertical line */}
            <div className="relative">
              {/* Vertical line — centred on the dot (LINE_OFFSET px from right) */}
              <div
                className="absolute top-3 bottom-3 w-px bg-slate-200"
                style={{ right: `${LINE_OFFSET}px` }}
              />

              {steps.map((step, i) => {
                const isOpen = open === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                  >
                    {/* Step header row */}
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full flex items-center gap-4 py-5 text-right group"
                    >
                      {/* Dot — first in RTL = appears on the right */}
                      <div className="relative flex-shrink-0 z-10">
                        <div
                          className={`rounded-full border-2 transition-all duration-300`}
                          style={{
                            width: DOT, height: DOT,
                            background: isOpen ? '#9dce5b' : '#fff',
                            borderColor: isOpen ? '#9dce5b' : '#cbd5e1',
                          }}
                        />
                      </div>

                      {/* Title */}
                      <span
                        className={`flex-1 text-right font-semibold text-base md:text-lg transition-colors duration-200 ${isOpen ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                          }`}
                      >
                        {step.num}. {step.title}
                      </span>

                      {/* Chevron — last in RTL = appears on the left */}
                      <svg
                        className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                          }`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expanded body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          {/* Indent matches dot width + gap (DOT + gap-4 = 20 + 16 = 36px) */}
                          <div className="pb-6" style={{ paddingRight: `${DOT + 16}px` }}>
                            <p className="text-slate-500 text-base leading-relaxed mb-5 font-medium">
                              {step.detail}
                            </p>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Divider — full width so it crosses the dot column too */}
                    {i < steps.length - 1 && (
                      <div className="border-t border-slate-100" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
