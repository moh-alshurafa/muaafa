import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Phone, Lock, PhoneCall, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CONSENTS = [
  {
    key: 'privacy',
    label: 'سرية المعلومات',
    modalTitle: 'سرية المعلومات',
    modalText: 'نضمن لك سرية المعلومات التي تقدمها، حيث يتم الاطلاع عليها فقط من قِبل طبيب معتمد. تهدف هذه الأسئلة إلى تزويد الطبيب بالمعلومات الضرورية لاتخاذ قرار طبي مدروس بشأن العلاج الأنسب لك.\n\nصمم هذا الاستبيان بعناية لتقييم حالتك الصحية وتحديد ما إذا كانت أدوية تنزيل الوزن هي الخيار الأمثل لحالتك. لذا أجب على الأسئلة التالية بصدق لمساعدة الطبيب على اتخاذ القرار الأنسب لك.',
  },
  {
    key: 'disclaimer',
    label: 'شروط برنامج العلاج',
    modalTitle: 'يرجى التأكيد على قراءتك وفهمك للمعلومات الآتية المتعلقة بخطة علاجك:',
    modalText: 'هذا البرنامج غير مخصص لإدارة أو متابعة المضاعفات الصحية المرتبطة بالوزن الزائد. إذا كنت تعاني من أي من هذه المضاعفات، فإننا نؤكد على ضرورة مراجعة طبيبك بشكل دوري (كل 3- 6 أشهر)؛ لإجراء تقييم شامل وتتأكد أن أي علاج تأخذه يُصرف بالجرعة المناسبة لحالتك.\n\nسيُراجع طبيب مختص طلبك، ويُحدد ما إذا كان برنامج فقدان الوزن يُناسب حالتك. وسيأخذ بعين الاعتبار تفضيلاتك العلاجية إلى جانب توصياته الطبية.\n\nبعض الأدوية مثل "ويجوفي" و"مونجاروا" تُحقن تحت الجلد في منطقة البطن أو الفخذ أو الجزء العلوي من الذراع.\n\nتشمل خطط العلاج أدوية قد تسبب آثاراً جانبية مثل الغثيان، والإسهال، والصداع، وقلة الشهية، والانتفاخ، والإمساك، وألم في البطن.\n\nمن الضروري أن تقرأ "كتيب معلومات المريض" المرفق مع الدواء بعناية.\n\nلقد أجبت على جميع الأسئلة بصدق ودقة.\n\nبالمتابعة، فإنك تقر وتتعهد بأن جميع المعلومات المقدمة من قبلك من خلال هذا النموذج، بما في ذلك، البيانات الديموغرافية والأعراض والتاريخ الطبي، دقيقة وكاملة.\n\nتخلي الطبي صراحةً مسؤوليته عن أي ضرر قد يلحق بك نتيجة لمعلومات غير دقيقة.\n\nبالموافقة على "المتابعة"، فإنك تقر بفهمك وتوافق عليه.',
  },
];

const allQuestions = [
  {
    id: 'q1',
    type: 'single',
    title: 'هل تستخدم حالياً أو سبق لك استخدام أي دواء من أدوية GLP-1؟',
    options: ['نعم', 'لا']
  },
  {
    id: 'q2',
    type: 'single',
    title: 'ما هو الدواء الذي تستخدمه حالياً / أو سبق لك استخدامه؟',
    options: ['مونجاروا (Mounjaro)', 'أوزيمبيك (Ozempic)', 'ساكسندا (Saxenda)', 'رايبيلسوس (Rybelsus)', 'ويجوفي (Wegovy)'],
    condition: (answers) => answers['q1'] === 'نعم'
  },
  {
    id: 'age',
    type: 'number',
    title: 'العمر بالسنوات*',
    placeholder: 'مثال: 35',
    validate: (val) => parseInt(val) < 18 ? 'REJECT' : 'PASS'
  },
  {
    id: 'gender',
    type: 'single',
    title: 'ما هو جنسك؟*',
    options: ['ذكر', 'أنثى']
  },
  {
    id: 'pregnancy',
    type: 'single',
    title: 'هل أنتِ حامل، أو مرضعة، أو تخططين للحمل خلال الشهر القادم؟',
    options: ['نعم', 'لا'],
    condition: (answers) => answers['gender'] === 'أنثى',
    validate: (val) => val === 'نعم' ? 'REJECT' : 'PASS'
  },
  {
    id: 'conditions',
    type: 'multiple',
    title: 'هل تعاني من أي من الحالات التالية؟',
    options: [
      'داء السكري من النوع الأول',
      'تاريخ من التهاب البنكرياس أو سرطان البنكرياس',
      'سرطان الغدة الدرقية النخاعي أو متلازمة MEN2 (شخصي أو عائلي)',
      'مرض الكلى من المرحلة 3a أو أعلى',
      'ضعف وظائف الكبد',
      'اضطراب تناول الطعام الحالي',
      'الاكتئاب غير المعالج أو أفكار انتحارية',
      'الخضوع حالياً لعلاج السرطان',
      'تاريخ من رد فعل تحسسي شديد لأي من ناهضات GLP-1',
      'لا أعاني من أي مما سبق'
    ]
  },
  {
    id: 'gallbladder',
    type: 'single',
    title: 'هل تعاني من أمراض المرارة أو لديك تاريخ من حصوات المرارة؟',
    options: ['نعم', 'لا']
  },
  {
    id: 'thyroid',
    type: 'single',
    title: 'هل لديك أي علامات لاضطراب في الغدة الدرقية مثل تورم الرقبة لم يتم تشخيصه أو تمييزه بعد؟',
    options: ['نعم', 'لا'],
    validate: (val) => val === 'نعم' ? 'REJECT' : 'PASS'
  },
  {
    id: 'weight',
    type: 'number',
    title: 'كم وزنك؟ بالكيلوغرام.',
    placeholder: 'مثال: 85'
  },
  {
    id: 'height',
    type: 'number',
    title: 'كم طولك؟ بالسنتيمتر.',
    placeholder: 'مثال: 175'
  },
  {
    id: 'history',
    type: 'single',
    title: 'منذ متى وأنت تعاني من مشكلة في الوزن؟',
    options: [
      'آخر 12 شهرًا',
      'آخر 5 سنوات',
      'آخر 10 سنوات',
      'معظم حياتي',
      'لم أواجه أي صعوبة في التحكم بوزني من قبل'
    ]
  }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('QUESTIONS'); // QUESTIONS, EVALUATING, ELIGIBLE, PHONE, OTP, CALL_PENDING, REJECT
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  
  const [checkedConsents, setCheckedConsents] = useState({});
  const [activeModal, setActiveModal] = useState(null); // { title, text, key }
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Filter out questions based on conditions to get the active timeline
  const activeQuestions = allQuestions.filter(q => !q.condition || q.condition(answers));
  const currentQuestion = activeQuestions[currentIndex];

  const handleNext = (val) => {
    let finalAnswers = { ...answers };
    
    // Save answer if it's an input/question type
    if (currentQuestion.type !== 'info') {
      finalAnswers[currentQuestion.id] = val;
      setAnswers(finalAnswers);
    }
    
    // Validate
    if (currentQuestion.validate) {
      const res = currentQuestion.validate(val);
      if (res === 'REJECT') {
        setPhase('REJECT');
        return;
      }
    }

    // Go next or evaluate
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInputValue(finalAnswers[activeQuestions[currentIndex + 1]?.id] || '');
    } else {
      setPhase('EVALUATING');
      setTimeout(() => {
        setPhase('ELIGIBLE');
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setInputValue(answers[activeQuestions[prevIndex]?.id] || '');
    }
  };

  const handleSingleSelect = (opt) => {
    handleNext(opt);
  };

  const handleMultipleSelect = (opt) => {
    const currentSelections = answers[currentQuestion.id] || [];
    
    if (opt === 'لا أعاني من أي مما سبق') {
      setAnswers({ ...answers, [currentQuestion.id]: [opt] });
      return;
    }

    let newSelections;
    if (currentSelections.includes(opt)) {
      newSelections = currentSelections.filter(i => i !== opt);
    } else {
      newSelections = [...currentSelections.filter(i => i !== 'لا أعاني من أي مما سبق'), opt];
    }
    setAnswers({ ...answers, [currentQuestion.id]: newSelections });
  };

  const submitMultiple = () => {
    handleNext(answers[currentQuestion.id] || []);
  };

  const submitNumber = (e) => {
    e.preventDefault();
    if (inputValue) {
      handleNext(inputValue);
    }
  };

  // Phone & OTP Handlers
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length > 5) setPhase('OTP');
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;
    setOtpError(false);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 3) otpRefs[index + 1].current.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.join('') === '0000') setPhase('CALL_PENDING');
    else setOtpError(true);
  };

  const goHome = () => navigate('/');

  const Btn = ({ onClick, disabled, children, variant = 'primary', type = 'button' }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3.5 rounded-full font-bold text-base transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        variant === 'primary'
          ? 'bg-[#0f4c5c] hover:bg-[#0d3f4e] text-white'
          : 'bg-[#9dce5b] hover:bg-[#8cb851] text-[#0f4c5c]'
      }`}
    >
      {children}
    </button>
  );

  const Checkbox = ({ checked, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${checked ? 'bg-[#0f4c5c] border-[#0f4c5c]' : 'border-slate-300 bg-white'}`}
    >
      {checked && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </button>
  );

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden" dir="rtl">

      {/* Top bar */}
      <div className="flex-shrink-0 border-b border-slate-100 px-6 py-4 flex justify-between items-center bg-white">
        <div className="flex items-center gap-2 cursor-pointer" onClick={goHome}>
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="معافى" className="h-8 w-auto" />
          <span className="text-xl font-black text-[#0f4c5c]">معافى</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPhase('ELIGIBLE')}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 border border-slate-200 hover:border-slate-300 px-2.5 py-1 rounded-lg transition-colors"
          >
            admin
          </button>
          <button onClick={goHome} className="text-slate-400 hover:text-slate-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 flex flex-col items-center overflow-y-auto ${phase !== 'QUESTIONS' ? 'justify-center px-6 py-10' : 'bg-white overflow-hidden'}`}>
        <div className={`w-full max-w-lg ${phase === 'QUESTIONS' ? 'flex-1 flex flex-col overflow-hidden' : 'border border-slate-200 rounded-2xl bg-white'}`}>

        {phase === 'QUESTIONS' && currentQuestion && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Progress + Title */}
            <div className="flex-shrink-0 px-6 pt-8 pb-4">
              {/* Step counter + bar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0f4c5c] rounded-full transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400 whitespace-nowrap tabular-nums">
                  {currentIndex + 1} / {activeQuestions.length}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentQuestion.id + '-title'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="text-2xl font-black text-slate-900 leading-snug"
                >
                  {currentQuestion.title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto px-6 pb-4"
              >
                {currentQuestion.type === 'info' && (
                  <div className="space-y-3 pt-2">
                    {currentQuestion.text && (
                      <p className="text-slate-500 text-sm leading-loose whitespace-pre-wrap">{currentQuestion.text}</p>
                    )}
                    {currentQuestion.consents && currentQuestion.consents.map((consent) => (
                      <div key={consent.key} className="flex items-center gap-3">
                        <Checkbox checked={!!checkedConsents[consent.key]} onChange={() => setCheckedConsents(prev => ({ ...prev, [consent.key]: !prev[consent.key] }))} />
                        <span className="text-sm text-slate-600">
                          أوافق على{' '}
                          <button onClick={() => setActiveModal({ title: consent.modalTitle, text: consent.modalText, key: consent.key })} className="text-[#0f4c5c] underline underline-offset-2 font-medium">
                            {consent.label}
                          </button>
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'single' && (
                  <div className="space-y-2 pt-2">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = answers[currentQuestion.id] === opt;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSingleSelect(opt)}
                          className={`w-full text-right px-4 py-3.5 rounded-2xl border transition-all text-sm font-medium ${
                            isSelected ? 'border-[#0f4c5c] bg-[#0f4c5c]/5 text-[#0f4c5c]' : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === 'multiple' && (
                  <div className="space-y-2 pt-2">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = (answers[currentQuestion.id] || []).includes(opt);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleMultipleSelect(opt)}
                          className={`w-full text-right px-4 py-3.5 rounded-2xl border transition-all text-sm font-medium ${
                            isSelected ? 'border-[#0f4c5c] bg-[#0f4c5c]/5 text-[#0f4c5c]' : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${isSelected ? 'bg-[#0f4c5c] border-[#0f4c5c]' : 'border-slate-300'}`}>
                              {isSelected && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span>{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === 'number' && (
                  <div className="pt-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder={currentQuestion.placeholder}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-[#0f4c5c] text-lg text-center font-bold placeholder:text-slate-300 placeholder:font-normal transition-colors"
                      autoFocus
                      required
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Footer CTA */}
            {(currentQuestion.type === 'info' || currentQuestion.type === 'multiple' || currentQuestion.type === 'number' || (currentQuestion.type === 'single' && currentIndex > 0)) && (
              <div className="flex-shrink-0 px-6 pt-4 pb-6 space-y-3 bg-white border-t border-slate-100">
                {currentQuestion.type === 'info' && (
                  <Btn onClick={() => handleNext(null)} disabled={!!(currentQuestion.consents && !currentQuestion.consents.every(c => checkedConsents[c.key]))}>
                    {currentQuestion.buttonText}
                  </Btn>
                )}
                {currentQuestion.type === 'multiple' && <Btn onClick={submitMultiple}>متابعة</Btn>}
                {currentQuestion.type === 'number' && <Btn onClick={(e) => { e.preventDefault(); if (inputValue) handleNext(inputValue); }}>متابعة</Btn>}
                {currentIndex > 0 && (
                  <button onClick={handleBack} className="w-full py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    رجوع
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {phase === 'EVALUATING' && (
          <div className="flex flex-col items-center text-center px-8 py-12">
            <Loader2 className="w-12 h-12 text-[#0f4c5c] animate-spin mb-6" />
            <h3 className="text-2xl font-black text-slate-900 mb-2">جاري تقييم ملفك...</h3>
            <p className="text-slate-400 text-sm">يقوم نظامنا بتحليل إجاباتك طبياً</p>
          </div>
        )}

        {phase === 'REJECT' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center px-8 py-12">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-500">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">نحتاج لمراجعة ملفك</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">بناءً على إجاباتك، لا يُمكن صرف هذا الدواء لحالتك عبر الإنترنت. لمزيد من الإرشاد يُمكنك التحدث مع طبيبك.</p>
            <div className="w-full"><Btn onClick={goHome}>العودة للرئيسية</Btn></div>
          </motion.div>
        )}

        {phase === 'ELIGIBLE' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center px-8 py-12">
            <div className="w-16 h-16 bg-[#9dce5b]/15 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#9dce5b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">أنت مؤهل — يمكنك التحدث مع طبيب</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">بناءً على إجاباتك، أنت مؤهل لبرنامج معافى. خطوة واحدة متبقية — أدخل رقم هاتفك وسيتواصل معك طبيبنا مباشرةً.</p>
            <div className="w-full"><Btn onClick={() => setPhase('PHONE')} variant="secondary">خطوة واحدة متبقية</Btn></div>
          </motion.div>
        )}

        {phase === 'PHONE' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col px-8 py-10">
            <h3 className="text-2xl font-black text-slate-900 mb-8 text-center">أدخل رقم هاتفك للتحدث مع طبيب</h3>
            <form onSubmit={handlePhoneSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">رقم الهاتف</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-left text-base focus:outline-none focus:border-[#0f4c5c] transition-colors font-medium placeholder:text-slate-300"
                  required
                />
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={!!checkedConsents['all']}
                    onChange={() => setCheckedConsents(prev => ({ ...prev, all: !prev['all'] }))}
                  />
                  <span className="text-[12px] text-slate-600">
                    أوافق على{' '}
                    <button type="button" onClick={() => setActiveModal({ title: CONSENTS[0].modalTitle, text: CONSENTS[0].modalText, key: CONSENTS[0].key })} className="text-[#0f4c5c] underline underline-offset-2 font-medium">
                      {CONSENTS[0].label}
                    </button>
                    {' '}و{' '}
                    <button type="button" onClick={() => setActiveModal({ title: CONSENTS[1].modalTitle, text: CONSENTS[1].modalText, key: CONSENTS[1].key })} className="text-[#0f4c5c] underline underline-offset-2 font-medium">
                      {CONSENTS[1].label}
                    </button>
                  </span>
                </div>
              </div>
              <Btn type="submit" disabled={!checkedConsents['all']}>متابعة</Btn>
            </form>
          </motion.div>
        )}

        {phase === 'OTP' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col px-8 py-10">
            <h3 className="text-2xl font-black text-slate-900 mb-1">تأكيد رقم الهاتف</h3>
            <p className="text-slate-500 text-sm mb-8">أدخل رمز التحقق المرسل إلى <bdi className="font-bold text-slate-700">{phone}</bdi></p>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex gap-3 justify-center" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-xl font-black bg-white border-2 rounded-xl focus:outline-none focus:border-[#0f4c5c] transition-colors ${otpError ? 'border-red-400 text-red-500 bg-red-50' : 'border-slate-200'}`}
                  />
                ))}
              </div>
              {otpError && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center">الرمز غير صحيح — للتجربة أدخل 0000</motion.p>}
              <Btn type="submit">تأكيد وإنشاء الحساب</Btn>
            </form>
          </motion.div>
        )}

        {phase === 'CALL_PENDING' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center px-8 py-12">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 bg-[#9dce5b]/20 rounded-full animate-ping" />
              <div className="absolute inset-2 bg-[#0f4c5c] rounded-full flex items-center justify-center text-white">
                <PhoneCall className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-3">سيتصل بك الطبيب الآن</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">يرجى التأكد من توفر هاتفك. جاري توصيلك بأول طبيب متاح لحجز خطتك العلاجية.</p>
          </motion.div>
        )}

        </div>
      </div>

      {/* Consent Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
                <h3 className="text-base font-black text-[#0f4c5c] leading-snug">{activeModal.title}</h3>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-700 transition-colors flex-shrink-0 mr-3">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-7 py-6 max-h-96 overflow-y-auto text-sm text-slate-600 leading-loose whitespace-pre-wrap">
                {activeModal.text}
              </div>
              <div className="px-7 py-5 border-t border-slate-100">
                <button
                  onClick={() => { setCheckedConsents(prev => ({ ...prev, [activeModal.key]: true })); setActiveModal(null); }}
                  className="w-full bg-[#0f4c5c] text-white py-3 rounded-xl font-bold hover:bg-[#0d3f4e] transition-colors"
                >
                  أوافق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
