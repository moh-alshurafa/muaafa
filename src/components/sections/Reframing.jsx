import React from 'react';
import { motion } from 'framer-motion';

export default function Reframing() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
              السمنة ليست كسلاً،<br/> إنها حالة طبية قابلة للعلاج.
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              لسنوات طويلة، تم إخبارنا بأن إنقاص الوزن يعتمد فقط على "الأكل أقل والتحرك أكثر". لكن العلم الحديث أثبت أن العوامل البيولوجية، الجينية، والهرمونية تلعب دوراً أساسياً يصعب التغلب عليه بالإرادة وحدها.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed font-bold border-r-4 border-[#9dce5b] pr-4">
              أدوية GLP-1 تقوم بإعادة ضبط هذه الإشارات البيولوجية، مما يقلل الشعور بالجوع ويساعد على الشعور بالشبع لفترات أطول، ليعمل جسمك معك، وليس ضدك.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 p-10 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#9dce5b] to-[#00A365]" />
            <h3 className="text-2xl font-bold text-slate-900 mb-6">ماذا تفعل أدوية GLP-1؟</h3>
            <ul className="space-y-6">
              {[
                'تأخير إفراغ المعدة للشعور بالشبع أسرع',
                'إرسال إشارات الامتلاء للدماغ',
                'تقليل الرغبة الشديدة في تناول الطعام',
                'تحسين استجابة الجسم للأنسولين'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#9dce5b]/20 flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-[#00A365]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-lg text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
