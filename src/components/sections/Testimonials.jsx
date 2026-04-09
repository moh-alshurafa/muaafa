import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'سارة م.',
    loss: 'فقدت ١٥ كجم في ٤ أشهر',
    text: 'كنت أعتقد أن المشكلة في إرادتي، حتى بدأت مع معافى واكتشفت أن وزني الزائد كان بسبب مقاومة الأنسولين. الأدوية غيرت حياتي والمتابعة ممتازة.',
  },
  {
    name: 'أحمد ك.',
    loss: 'فقد ٢٢ كجم في ٦ أشهر',
    text: 'أفضل استثمار في صحتي. خدمة التوصيل مريحة والأطباء مستمعون جيدون ولا يصدرون أحكاماً.',
  },
  {
    name: 'نورة ع.',
    loss: 'فقدت ١٠ كجم في ٣ أشهر',
    text: 'لم أشعر يوماً بالجوع أو الحرمان. الدواء مع خطة التغذية الخاصة بي جعل الرحلة سهلة جداً. شكراً معافى!',
  },
];

export default function Testimonials() {
  return (
    <section dir="rtl" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            قصص نجاح أبطالنا
          </h2>
          <p className="text-slate-500 text-base font-medium">
            انضم إلى الآلاف الذين غيروا حياتهم مع معافى.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-slate-50 rounded-3xl p-8 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} fill="currentColor" size={16} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed flex-1 font-medium">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                <p className="text-[#9dce5b] text-sm font-semibold mt-0.5">{review.loss}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
