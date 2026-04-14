import React from 'react';

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-slate-100 text-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-[#00A365] mb-4">معافى</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              منصتك الطبية الموثوقة لإنقاص الوزن بطرق علمية آمنة. فريق طبي محترف وخطة مخصصة لك.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">روابط سريعة</h4>
            <ul className="space-y-3">
              {[['الرئيسية', '#'], ['عن البرنامج', '#how-it-works'], ['الأسئلة الشائعة', '#faq']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-slate-500 hover:text-[#00A365] text-sm transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">قانوني</h4>
            <ul className="space-y-3">
              {[['الشروط والأحكام', '#'], ['سياسة الخصوصية', '#']].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-slate-500 hover:text-[#00A365] text-sm transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-400 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} معافى الصحية.
          </p>
          <p className="text-slate-400 text-sm">
            هذه المنصة لا تغني عن استشارة الطبيب المختص.
          </p>
        </div>

      </div>
    </footer>
  );
}
