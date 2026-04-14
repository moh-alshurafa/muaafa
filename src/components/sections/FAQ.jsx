import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'ما هي أدوية GLP-1؟',
    a: 'هي أدوية معتمدة طبياً تحاكي هرموناً طبيعياً في الجسم، تعمل على تنظيم الشهية، تقليل الشعور بالجوع، وإبطاء إفراغ المعدة مما يساعد في نزول الوزن بشكل فعال.',
  },
  {
    q: 'هل تناسبني هذه الأدوية؟',
    a: 'يعتمد ذلك على تقييم الطبيب لمؤشر كتلة الجسم (BMI) الخاص بك والتاريخ الطبي. ابدأ الاستبيان المجاني لمعرفة مبدئية لمدى أهليتك.',
  },
  {
    q: 'هل لها آثار جانبية؟',
    a: 'كأي دواء، قد تظهر بعض الآثار الجانبية البسيطة مثل الغثيان أو اضطراب المعدة في البداية، وعادة ما تزول مع تأقلم الجسم. طبيبك سيتابعك خطوة بخطوة.',
  },
  {
    q: 'كم من الوزن سأفقد؟',
    a: 'النتائج تختلف من شخص لآخر، لكن الدراسات أظهرت فقدان حوالي ١٠٪-١٥٪ من وزن الجسم عند الالتزام بالدواء مع التغييرات السلوكية.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section dir="rtl" id="faq" className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            الأسئلة الشائعة
          </h2>
          <p className="text-slate-500 text-base font-medium">كل ما تريد معرفته عن برنامج معافى.</p>
        </motion.div>

        {/* Items */}
        <div className="divide-y divide-slate-100">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-right group"
                >
                  <span className={`font-semibold text-base transition-colors duration-200 ${isOpen ? 'text-[#00A365]' : 'text-slate-800 group-hover:text-[#00A365]'}`}>
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-slate-500 text-sm leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
