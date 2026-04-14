import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "أكمل الاستبيان الطبي",
      desc: "أجب عن بعض الأسئلة السريعة حول تاريخك الطبي وأهدافك لمعرفة ما إذا كانت أدوية GLP-1 مناسبة لك."
    },
    {
      num: "02",
      title: "استشارة طبيب مختص",
      desc: "سيقوم أحد أطبائنا المعتمدين بمراجعة ملفك وتقديم خطة علاجية مخصصة تناسب احتياجاتك."
    },
    {
      num: "03",
      title: "توصيل العلاج لمنزلك",
      desc: "سنقوم بتوصيل أدويتك الشهرية إلى باب منزلك بكل سرية واحترافية."
    },
    {
      num: "04",
      title: "متابعة مستمرة ودعم",
      desc: "فريقنا الطبي وأخصائيو التغذية معك خطوة بخطوة لضمان وصولك لهدفك بأمان."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">كيف تبدأ رحلة نزول الوزن؟</h2>
          <p className="text-xl text-slate-600 font-medium">خطوات بسيطة تفصلك عن حياة صحية ومريحة.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 relative group"
            >
              <div className="text-6xl font-black text-slate-100 absolute -top-4 -right-2 group-hover:text-[#9dce5b]/20 transition-colors pointer-events-none">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 relative z-10">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed relative z-10 font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
