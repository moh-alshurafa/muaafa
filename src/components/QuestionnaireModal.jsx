import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Phone, Lock, PhoneCall, Loader2 } from 'lucide-react';

const allQuestions = [
  {
    id: 'intro1',
    type: 'info',
    title: 'سرية المعلومات',
    text: 'نضمن لك سرية المعلومات التي تقدمها، حيث يتم الاطلاع عليها فقط من قِبل طبيب معتمد. تهدف هذه الأسئلة إلى تزويد الطبيب بالمعلومات الضرورية لاتخاذ قرار طبي مدروس بشأن العلاج الأنسب لك.\n\nصمم هذا الاستبيان بعناية لتقييم حالتك الصحية وتحديد ما إذا كانت أدوية تنزيل الوزن هي الخيار الأمثل لحالتك. لذا أجب على الأسئلة التالية بصدق لمساعدة الطبيب على اتخاذ القرار الأنسب لك.',
    buttonText: 'أوافق'
  },
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
  },
  {
    id: 'disclaimer',
    type: 'info',
    title: 'يرجى التأكيد على قراءتك وفهمك للمعلومات الآتية المتعلقة بخطة علاجك:',
    text: 'هذا البرنامج غير مخصص لإدارة أو متابعة المضاعفات الصحية المرتبطة بالوزن الزائد. إذا كنت تعاني من أي من هذه المضاعفات، فإننا نؤكد على ضرورة مراجعة طبيبك بشكل دوري (كل 3- 6 أشهر)؛ لإجراء تقييم شامل وتتأكد أن أي علاج تأخذه يُصرف بالجرعة المناسبة لحالتك.\n\nسيُراجع طبيب مختص طلبك، ويُحدد ما إذا كان برنامج فقدان الوزن يُناسب حالتك. وسيأخذ بعين الاعتبار تفضيلاتك العلاجية إلى جانب توصياته الطبية.\n\nبعض الأدوية مثل “ويجوفي” و“مونجاروا” تُحقن تحت الجلد في منطقة البطن أو الفخذ أو الجزء العلوي من الذراع.\n\nتشمل خطط العلاج أدوية قد تسبب آثاراً جانبية مثل الغثيان، والإسهال، والصداع، وقلة الشهية، والانتفاخ، والإمساك، وألم في البطن.\n\nمن الضروري أن تقرأ "كتيب معلومات المريض" المرفق مع الدواء بعناية.\n\nلقد أجبت على جميع الأسئلة بصدق ودقة.\n\nبالمتابعة، فإنك تقر وتتعهد بأن جميع المعلومات المقدمة من قبلك من خلال هذا النموذج، بما في ذلك، البيانات الديموغرافية والأعراض والتاريخ الطبي، دقيقة وكاملة.\n\nتخلي الطبي صراحةً مسؤوليته عن أي ضرر قد يلحق بك نتيجة لمعلومات غير دقيقة.\n\nبالموافقة على “المتابعة”، فإنك تقر بفهمك وتوافق عليه.',
    buttonText: 'المتابعة'
  }
];

export default function QuestionnaireModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState('QUESTIONS'); // QUESTIONS, EVALUATING, ELIGIBLE, PHONE, OTP, CALL_PENDING, REJECT
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  
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

  const reset = () => {
    setPhase('QUESTIONS');
    setCurrentIndex(0);
    setAnswers({});
    setInputValue('');
    setPhone('');
    setOtp(['', '', '', '']);
    setOtpError(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 rtl" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
      >
        <button 
          onClick={() => { onClose(); setTimeout(reset, 300); }}
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {phase === 'QUESTIONS' && currentQuestion && (
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Fixed header */}
            <div className="flex-shrink-0 px-8 md:px-10 pt-8 pb-4">
              <div className="flex gap-1.5 mb-5">
                {activeQuestions.map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= currentIndex ? 'bg-[#0f4c5c]' : 'bg-slate-100'}`} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentQuestion.id + '-title'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="text-xl font-bold text-[#0f4c5c] leading-relaxed"
                >
                  {currentQuestion.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Scrollable body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 overflow-y-auto px-8 md:px-10 py-2"
              >
                {currentQuestion.type === 'info' && (
                  <div className="text-slate-600 leading-loose whitespace-pre-wrap text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    {currentQuestion.text}
                  </div>
                )}

                {currentQuestion.type === 'single' && (
                  <div className="space-y-3 pb-2">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = answers[currentQuestion.id] === opt;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSingleSelect(opt)}
                          className={`w-full text-right p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-[#0f4c5c] bg-[#0f4c5c]/5 text-[#0f4c5c] font-bold'
                              : 'border-slate-100 hover:border-[#9dce5b] text-slate-600'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === 'multiple' && (
                  <div className="space-y-3 pb-2">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = (answers[currentQuestion.id] || []).includes(opt);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleMultipleSelect(opt)}
                          className={`w-full text-right p-4 rounded-xl border-2 transition-all ${
                            isSelected
                              ? 'border-[#0f4c5c] bg-[#0f4c5c]/5 text-[#0f4c5c] font-bold'
                              : 'border-slate-100 hover:border-[#9dce5b] text-slate-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-[#0f4c5c] border-[#0f4c5c]' : 'border-slate-300'}`}>
                              {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <span>{opt}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === 'number' && (
                  <div className="pb-2">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f4c5c] text-xl text-center"
                      autoFocus
                      required
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Fixed footer button */}
            {(currentQuestion.type === 'info' || currentQuestion.type === 'multiple' || currentQuestion.type === 'number') && (
              <div className="flex-shrink-0 px-8 md:px-10 py-5 border-t border-slate-100 bg-white">
                {currentQuestion.type === 'info' && (
                  <button onClick={() => handleNext(null)} className="w-full bg-[#0f4c5c] text-white py-4 rounded-xl font-bold hover:bg-[#0d3f4e] transition-colors">
                    {currentQuestion.buttonText}
                  </button>
                )}
                {currentQuestion.type === 'multiple' && (
                  <button onClick={submitMultiple} className="w-full bg-[#0f4c5c] text-white py-4 rounded-xl font-bold hover:bg-[#0d3f4e] transition-colors">
                    متابعة
                  </button>
                )}
                {currentQuestion.type === 'number' && (
                  <button onClick={(e) => { e.preventDefault(); if (inputValue) handleNext(inputValue); }} className="w-full bg-[#0f4c5c] text-white py-4 rounded-xl font-bold hover:bg-[#0d3f4e] transition-colors">
                    متابعة
                  </button>
                )}
              </div>
            )}

          </div>
        )}

        {phase === 'EVALUATING' && (
          <div className="p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
             <Loader2 className="w-16 h-16 text-[#9dce5b] animate-spin mb-6" />
             <h3 className="text-2xl font-bold text-[#0f4c5c] mb-2">جاري تقييم ملفك...</h3>
             <p className="text-slate-500">يقوم نظامنا بتحليل إجاباتك لتحديد مدى أهليتك للعلاج</p>
          </div>
        )}

        {phase === 'REJECT' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-[#0f4c5c] mb-4">نحتاج لمراجعة ملفك</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">بناءً على إجاباتك، لا يُمكن صرف هذا الدواء لحالتك عبر الإنترنت، لمزيد من الإرشاد، يُمكنك التحدث مع طبيبك.</p>
            <button onClick={onClose} className="w-full bg-[#0f4c5c] hover:bg-[#0a3642] text-white py-4 rounded-xl font-bold text-lg transition-colors">
              إغلاق
            </button>
          </motion.div>
        )}

        {phase === 'ELIGIBLE' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
               <CheckCircle className="w-10 h-10" />
             </div>
             <h3 className="text-3xl font-black text-[#0f4c5c] mb-4">أنت مؤهل مبدئياً!</h3>
             <p className="text-slate-600 mb-8 leading-relaxed text-lg">يسعدنا إخبارك بأن أدوية GLP-1 تعتبر خياراً آمناً ومناسباً لك. الخطوة التالية هي إنشاء حسابك لربطك بطبيب لبدء الاستشارة.</p>
             <button 
               onClick={() => setPhase('PHONE')} 
               className="w-full bg-[#9dce5b] hover:bg-[#8cb851] text-[#0f4c5c] py-4 rounded-xl font-bold text-lg transition-colors"
             >
               إنشاء حساب للمتابعة
             </button>
          </motion.div>
        )}

        {phase === 'PHONE' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10">
            <h3 className="text-2xl font-black text-[#0f4c5c] mb-2">إنشاء حساب جديد</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">يرجى إدخال رقم هاتفك لإنشاء حسابك وتأكيد استشارتك الفورية مع الطبيب.</p>
            
            <form onSubmit={handlePhoneSubmit}>
              <div className="mb-6 relative">
                <label className="block text-sm font-bold text-slate-700 mb-2">رقم الجوال</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </span>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05X XXX XXXX"
                    dir="ltr"
                    className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-[#0f4c5c] focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#0f4c5c] hover:bg-[#0a3642] text-white py-4 rounded-xl font-bold text-lg transition-colors">
                متابعة
              </button>
            </form>
          </motion.div>
        )}

        {phase === 'OTP' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-600">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#0f4c5c] mb-2">تأكيد رقم الجوال</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">أدخل رمز التحقق المكون من 4 أرقام المرسل إلى <span className="font-bold inline-block" dir="ltr">{phone}</span></p>
            
            <form onSubmit={handleOtpSubmit}>
              <div className="flex gap-4 justify-center mb-6" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-14 h-16 text-center text-2xl font-bold bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f4c5c] transition-all ${otpError ? 'border-red-500 text-red-500' : 'border-slate-200'}`}
                  />
                ))}
              </div>
              {otpError && <p className="text-red-500 text-sm text-center mb-6 font-bold">الرمز غير صحيح، جرب 0000</p>}
              
              <button type="submit" className="w-full bg-[#0f4c5c] hover:bg-[#0a3642] text-white py-4 rounded-xl font-bold text-lg transition-colors">
                تأكيد وإنشاء الحساب
              </button>
            </form>
          </motion.div>
        )}

        {phase === 'CALL_PENDING' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-10 text-center bg-gradient-to-b from-teal-50 to-white">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-[#9dce5b] rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-2 bg-[#9dce5b] rounded-full animate-pulse opacity-40"></div>
              <div className="absolute inset-4 bg-[#0f4c5c] rounded-full flex items-center justify-center text-white shadow-xl z-10">
                <PhoneCall className="w-10 h-10" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 mb-8 inline-block max-w-sm">
              <p className="text-lg text-slate-700 font-bold leading-relaxed">
                سيتصل بك الطبيب الآن — يرجى التأكد من توفر هاتفك.
              </p>
            </div>
            <p className="text-slate-500 text-sm">تم إنشاء حسابك بنجاح وجاري توصيلك بأول طبيب متاح لحجز خطتك العلاجية.</p>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
