import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, HeartPulse } from 'lucide-react';

const items = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#9dce5b]" />,
    title: 'أدوية أصلية ومرخصة',
    desc: 'جميع أدويتنا مرخصة من هيئة الغذاء والدواء وتصلك من صيدليات معتمدة.',
  },
  {
    icon: <Award className="w-6 h-6 text-[#9dce5b]" />,
    title: 'كادر طبي مرخص',
    desc: 'أطباء وصيادلة مرخصون وذوو خبرة في إدارة السمنة والأمراض المزمنة.',
  },
  {
    icon: <HeartPulse className="w-6 h-6 text-[#9dce5b]" />,
    title: 'خصوصية تامة',
    desc: 'نحمي بياناتك الصحية بأعلى معايير التشفير والسرية.',
  },
];

export default function Trust() {
  return (
    <section dir="rtl" className="py-20 bg-[#00A365]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">
            صحتك في أيدٍ أمينة
          </h2>
          <p className="text-[#9dce5b] text-base">
            نلتزم بأعلى معايير الرعاية الصحية لتجربة آمنة وفعالة.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-8 hover:bg-white/10 transition-colors duration-200"
            >
              <div className="mb-5">{item.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
