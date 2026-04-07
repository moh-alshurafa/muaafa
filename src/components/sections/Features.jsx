import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Apple, Activity } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "مستشارك الطبي معك دائماً",
      desc: "فريق طبي متخصص يتابع حالتك ويجيب على مدار الساعة على جميع استفساراتك",
      icon: <Stethoscope className="w-8 h-8 text-blue-400" />,
      bg: "bg-blue-50"
    },
    {
      title: "مراقبة حيوية ذكية",
      desc: "تتبع دقيق لتقدمك مع تقارير أسبوعية وتعديلات فورية على خطتك العلاجية",
      icon: <Activity className="w-8 h-8 text-[#0f4c5c]" />,
      bg: "bg-emerald-50"
    },
    {
      title: "دليل التغذية المتخصص",
      desc: "خطة غذائية مخصصة لك تماماً، تشمل بروتوكول رمضان وجميع المناسبات",
      icon: <Apple className="w-8 h-8 text-orange-400" />,
      bg: "bg-orange-50"
    },
  ];

  return (
    <section dir="rtl" id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-black text-[#0f4c5c] mb-4">علاج السمنة ليس مجرد دواء</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl">
            نحن في معافى نؤمن بالحلول الشاملة. الدواء هو مجرد أداة لتسهيل الرحلة، لكن النجاح الحقيقي يكمن في الرعاية المتكاملة التي نقدمها لتغيير أسلوب حياتك.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100">
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-[#0f4c5c] mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
