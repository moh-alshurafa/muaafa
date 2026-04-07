import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BorderBeam } from '../ui/border-beam';

export default function FinalCTA() {
  return (
    <section dir="rtl" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <BorderBeam
            duration={8}
            size={120}
            colorFrom="#9dce5b"
            colorTo="#0f4c5c"
            borderWidth={1.5}
          />

          {/* Content */}
          <div className="relative z-10">
            <p className="text-slate-400 text-sm font-medium mb-6 tracking-wide">
              برنامج معافى
            </p>

            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-5">
              خطوة واحدة
              <br />
              <span className="text-[#0f4c5c]">تكفي للبدء</span>
            </h2>

            <p className="text-slate-500 text-base leading-relaxed max-w-sm mx-auto mb-10">
              تاكد من أهليتك لأدوية GLP-1 مجاناً — بدون زيارة عيادة، ونتيجة خلال يومين.
            </p>

            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 bg-[#0f4c5c] hover:bg-[#0d3f4e] text-white font-bold text-base px-8 py-4 rounded-2xl transition-colors duration-200"
            >
              ابدأ الآن — مجاناً
            </Link>

            <p className="mt-6 text-slate-400 text-xs">
              سري وآمن · بدون التزام مسبق
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
