import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Language = 'ar' | 'en'
const LANGUAGE_KEY = 'violets-language'
const originalTextNodes = new WeakMap<Text, string>()
const originalElementAttributes = new WeakMap<Element, Record<string, string>>()

const arabic: Record<string, string> = {
  Home: 'الرئيسية',
  'How to Play': 'طريقة اللعب',
  Admin: 'الإدارة',
  'Exit game': 'خروج من اللعبة',
  'QUIZ ARENA': 'ساحة المسابقة',
  'THE ORIGINAL TEAM VIOLETS EXPERIENCE': 'تجربة Team Violets الأصلية',
  'Bring the room.': 'أشعل الحماس.',
  'Own the board.': 'سيطر على اللوحة.',
  'A fast, electric quiz arena built for two teams, big swings, and unforgettable answers.': 'مسابقة سريعة وممتعة لفريقين، مليئة بالمفاجآت والإجابات التي لا تُنسى.',
  'Start a new game': 'ابدأ لعبة جديدة',
  'Resume game': 'استكمال اللعبة',
  'How to play': 'طريقة اللعب',
  '2 teams': 'فريقان',
  '36 questions': '36 سؤالاً',
  '6 categories': '6 فئات',
  'Host access': 'دخول المضيف',
  'GAME CONFIGURATION': 'إعداد اللعبة',
  'Set the stage.': 'جهّز الساحة.',
  'Two teams. Six categories. One team leaves with the crown.': 'فريقان، ست فئات، وفريق واحد يخرج بالكأس.',
  'active questions': 'أسئلة مفعّلة',
  'Choose your identity': 'اختر هويتك',
  'Team name': 'اسم الفريق',
  'Team color': 'لون الفريق',
  'Team 1 categories': 'فئات الفريق 1',
  'Team 2 categories': 'فئات الفريق 2',
  'Categories cannot overlap between teams.': 'لا يمكن للفريقين اختيار الفئة نفسها.',
  'Launch arena': 'ابدأ الساحة',
  'LIVE ARENA': 'الساحة المباشرة',
  'Choose your move.': 'اختر حركتك.',
  "'s turn": ' في دوره',
  'pts': 'نقطة',
  'PLAYED': 'لُعبت',
  'OPEN': 'متاحة',
  'questions played': 'أسئلة لُعبت',
  'assists': 'المساعدات',
  'Double Points': 'مضاعفة النقاط',
  'Two Choices': 'خياران فقط',
  'Steal Question': 'سرقة السؤال',
  'Back to board': 'العودة للوحة',
  'POINTS': 'نقطة',
  'QUESTION': 'السؤال',
  'Challenge mode': 'وضع التحدي',
  'Pause timer': 'إيقاف المؤقت',
  'Resume timer': 'استكمال المؤقت',
  'Reveal answer': 'إظهار الإجابة',
  'Correct answer': 'الإجابة الصحيحة',
  'correct': 'أجاب بشكل صحيح',
  'No correct answer': 'لا توجد إجابة صحيحة',
  'Current turn': 'الدور الحالي',
  'Answer together, score separately.': 'أجيبوا معاً، وسجّلوا النقاط بشكل منفصل.',
  'FINAL RESULTS': 'النتائج النهائية',
  'takes it.': 'يفوز بالمسابقة.',
  'A perfect tie.': 'تعادل كامل.',
  'A sharp finish in a very close arena.': 'نهاية قوية في منافسة متقاربة جداً.',
  'Neither team gave an inch. Run it back?': 'لم يتنازل أي فريق. هل نعيد الجولة؟',
  'Play again': 'العب مجدداً',
  'Return home': 'العودة للرئيسية',
  'THE PLAYBOOK': 'دليل اللعب',
  'Know the rhythm.': 'اعرف إيقاع اللعبة.',
  'Everything you need to run a clean, competitive round.': 'كل ما تحتاجه لإدارة جولة ممتعة وتنافسية.',
  'Set your teams': 'جهّز فريقك',
  'Claim a tile': 'اختر مربعاً',
  'Reveal the answer': 'اكشف الإجابة',
  'Use your edge': 'استخدم مساعدتك',
  'Ready? Set up a game': 'مستعد؟ جهّز اللعبة',
  'No active game': 'لا توجد لعبة نشطة',
  'Set up a game': 'جهّز لعبة',
  'Question unavailable': 'السؤال غير متاح',
  'Return to board': 'العودة إلى اللوحة',
  'HOST CONTROL': 'تحكم المضيف',
  'Enter your access PIN.': 'أدخل رمز الدخول.',
  'Manage the question bank, active rounds, and imports.': 'أدر بنك الأسئلة والجولات والملفات المستوردة.',
  'Unlock admin': 'فتح لوحة الإدارة',
  'Configure with VITE_ADMIN_PIN in your environment.': 'يمكن تغيير الرمز من VITE_ADMIN_PIN في ملف البيئة.',
  'QUESTION CONTROL': 'إدارة الأسئلة',
  'Shape the bank.': 'طوّر بنك الأسئلة.',
  'Create, edit, and tune every question in the arena.': 'أنشئ وعدّل ونظّم كل سؤال في الساحة.',
  'Export JSON': 'تصدير JSON',
  'Import JSON': 'استيراد JSON',
  'Add question': 'إضافة سؤال',
  'Search questions...': 'ابحث في الأسئلة...',
  'All': 'الكل',
  'Ready': 'جاهز',
  'Needs review': 'يحتاج مراجعة',
  'Question Editor': 'محرر الأسئلة',
  'New question': 'سؤال جديد',
  'Edit question': 'تعديل السؤال',
  Category: 'الفئة',
  Points: 'النقاط',
  Type: 'النوع',
  Enabled: 'مفعّل',
  Question: 'السؤال',
  'Write the prompt...': 'اكتب نص السؤال...',
  Explanation: 'الشرح',
  Choices: 'الخيارات',
  'comma separated': 'افصل بينها بفواصل',
  'Image URL': 'رابط الصورة',
  'Optional image URL': 'رابط صورة اختياري',
  'Challenge instructions': 'تعليمات التحدي',
  Cancel: 'إلغاء',
  'Save question': 'حفظ السؤال',
  'No questions match your search.': 'لا توجد أسئلة تطابق بحثك.',
  'Incorrect PIN': 'رمز الدخول غير صحيح',
}

interface LanguageValue { language: Language; toggleLanguage: () => void }
const LanguageContext = createContext<LanguageValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'ar')
  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    const translatePage = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      const textNodes: Text[] = []
      let current = walker.nextNode()
      while (current) {
        const parent = (current as Text).parentElement
        if (parent && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) textNodes.push(current as Text)
        current = walker.nextNode()
      }
      textNodes.forEach(node => {
        if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue ?? '')
        node.nodeValue = language === 'ar' ? translateText(originalTextNodes.get(node) ?? '') : originalTextNodes.get(node) ?? ''
      })
      document.querySelectorAll<HTMLElement>('[placeholder],[title],[aria-label]').forEach(element => {
        if (!originalElementAttributes.has(element)) originalElementAttributes.set(element, { placeholder: element.getAttribute('placeholder') ?? '', title: element.getAttribute('title') ?? '', 'aria-label': element.getAttribute('aria-label') ?? '' })
        const originals = originalElementAttributes.get(element)!
        if (language === 'ar') {
          if (originals.placeholder) element.setAttribute('placeholder', translateText(originals.placeholder))
          if (originals.title) element.setAttribute('title', translateText(originals.title))
          if (originals['aria-label']) element.setAttribute('aria-label', translateText(originals['aria-label']))
        } else {
          if (originals.placeholder) element.setAttribute('placeholder', originals.placeholder)
          if (originals.title) element.setAttribute('title', originals.title)
          if (originals['aria-label']) element.setAttribute('aria-label', originals['aria-label'])
        }
      })
    }
    let translating = false
    const observer = new MutationObserver(() => {
      if (translating) return
      translating = true
      observer.disconnect()
      translatePage()
      observer.observe(document.body, { childList: true, subtree: true, characterData: true })
      translating = false
    })
    translatePage()
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [language])
  const value = useMemo(() => ({ language, toggleLanguage: () => setLanguage(current => current === 'ar' ? 'en' : 'ar') }), [language])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider')
  return value
}

function translateText(value: string): string {
  const leading = value.match(/^\s*/)?.[0] ?? ''
  const trailing = value.match(/\s*$/)?.[0] ?? ''
  const core = value.trim()
  if (!core) return value
  if (arabic[core]) return `${leading}${arabic[core]}${trailing}`
  if (core.endsWith("'s turn")) return `${leading}${core.slice(0, -7)} في دوره${trailing}`
  if (core.endsWith(' correct')) return `${leading}${core.slice(0, -8)} أجاب بشكل صحيح${trailing}`
  if (/^\d+ POINTS$/.test(core)) return `${leading}${core.replace(' POINTS', ' نقطة')}${trailing}`
  if (core === 'of 36 questions played') return `${leading}من أصل 36 سؤالاً لُعبت${trailing}`
  return value
}

export function LocalizedTree({ children }: { children: ReactNode }) {
  return <>{children}</>
}
