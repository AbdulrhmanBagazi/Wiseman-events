import { I18nManager } from 'react-native'

const SignInStrings = {
  Login: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  Register: I18nManager.isRTL ? 'تسجيل' : 'Register',
  Member: I18nManager.isRTL ? 'لست عضوا حتى الآن؟' : 'Not a member yet?',
  Forgot: I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?',
  Phone: I18nManager.isRTL ? 'رقم الجوال(05XXXXXXXX)' : 'Mobile Number (05XXXXXXXX)',
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
  Terms: I18nManager.isRTL ? 'شروط الاستخدام' : 'Terms of Use',
  Privacy: I18nManager.isRTL ? 'سياسة الخصوصية' : 'Privacy Policy',
}

const HeaderTitles = {
  Home: I18nManager.isRTL ? 'الرئيسية' : 'Home',
  AllJobs: I18nManager.isRTL ? 'جميع الوظائف' : 'All Jobs',
  SingleJobs: I18nManager.isRTL ? 'تفاصيل' : 'Details',
  WorkSchedule: I18nManager.isRTL ? 'الجدول الزمني للفعاليات' : 'Event Schedule',
  WorkScheduleUser: I18nManager.isRTL ? 'جدول عملك' : 'Your work schedule',
  Profile: I18nManager.isRTL ? 'الملف الشخصي' : 'Profile',
  History: I18nManager.isRTL ? 'السجل' : 'Job History',
  Notifications: I18nManager.isRTL ? 'التنبيهات' : 'Alerts',
  SignIn: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  SignUp: I18nManager.isRTL ? 'إنشاء حساب' : 'Register',
  Language: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
  Reset: I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot Password',
  GetCode: I18nManager.isRTL ? 'استعادة كلمة المرور' : 'Password Recovery',
  OTP: I18nManager.isRTL ? 'التحقق' : 'Verification',
  CreateProfile: I18nManager.isRTL ? 'إنشاء ملف تعريف' : 'Create Profile',
  Application: I18nManager.isRTL ? 'تقديم' : 'Apply',
  NotificationSettings: I18nManager.isRTL ? 'إشعارات' : 'Notifications',
  LanguageSettings: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
  Rateus: I18nManager.isRTL ? 'قيمنا' : 'Rate us',
  status: I18nManager.isRTL ? 'الحالة' : 'Job status',
  Earnings: I18nManager.isRTL ? 'أرباح' : 'Earnings',
  Levels: I18nManager.isRTL ? 'المستوى' : 'Levels',
  IBAN: I18nManager.isRTL ? 'أضف IBAN' : 'Add IBAN',
  Invite: I18nManager.isRTL ? 'دعوة أصدقاء' : 'Invite friends',
  Support: I18nManager.isRTL ? 'الدعم' : 'Support',
  Settings: I18nManager.isRTL ? 'الإعدادات' : 'Settings',
  CompleteDetails: I18nManager.isRTL ? 'تفاصيل العمل' : 'Work Details',
}

const LanguageChangeStrings = {
  Select: I18nManager.isRTL ? 'إختيار اللغة' : 'Select Language',
  Done: I18nManager.isRTL ? 'البدء' : 'Get Started',
}

const Register = {
  Register: I18nManager.isRTL ? 'تسجيل' : 'Register',
  ResetSlogan: I18nManager.isRTL
    ? 'مرحبًا بك في اسم التطبيق. قم بإدخال المعلومات التالية ،لإنشاء حسابك.'
    : 'Welcome to app name. Please provice the information below, set your account.',
  Phone: I18nManager.isRTL ? 'رقم الجوال(05XXXXXXXX)' : 'Mobile Number (05XXXXXXXX)',
  nID: I18nManager.isRTL ? 'رقم الهوية الوطنية/الإقامة' : 'National ID / Iqama number',
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
  RePassword: I18nManager.isRTL ? 'اعادة ادخال كلمة السر' : 'Re-enter password',
  Continue: I18nManager.isRTL ? 'إستمرار' : 'Continue',
  HaveAccount: I18nManager.isRTL ? 'لديك حساب؟' : 'Already have an account?',
  Log: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  Match: I18nManager.isRTL ? 'تتطابق كلمتا المرور' : 'Both passwords match',
  Terms: I18nManager.isRTL ? 'شروط الاستخدام' : 'Terms of Use',
  Privacy: I18nManager.isRTL ? 'سياسة الخصوصية' : 'Privacy Policy',
  Iagreeto: I18nManager.isRTL
    ? 'تحقق هنا للإشارة إلى أنك قرأت ووافقت على'
    : 'Check here to indicate that you have read and agree to',
}

const ResetPasswordString = {
  title: I18nManager.isRTL ? 'إستعادة كلمة المرور' : 'Recover Password',
  ResetSlogan: I18nManager.isRTL
    ? 'قم بإدخل رقم الجوال الخاص بحسابك لإستعادة كلمة المرور الخاصة بك. ستحصل على رمز OTP.'
    : 'Enter your Mobile number to recover your password. You will get an OTP code.',
  Phone: I18nManager.isRTL ? 'رقم الجوال(05XXXXXXXX)' : 'Mobile Number (05XXXXXXXX)',
  OTP: I18nManager.isRTL ? 'رمز OTP' : 'OTP code',
  Continue: I18nManager.isRTL ? 'إستمرار' : 'Continue',
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
  RePassword: I18nManager.isRTL ? 'اعادة ادخال كلمة السر' : 'Re-enter password',
  CodeTitle: I18nManager.isRTL ? 'إعادة تعيين كلمة المرور' : 'Reset Password',
  CodeSlogan: I18nManager.isRTL ? 'تم إرسال رمز OTP' : 'An OTP code has been sent',
  Resend: I18nManager.isRTL ? 'إعادة إرسال الرمز' : 'Resend code',
  Resendmessage: I18nManager.isRTL ? 'لم تحصل على الرمز؟' : "Didn't get the code?",
  Log: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  ResetSuccessful: I18nManager.isRTL ? 'تمت إعادة التعيين بنجاح' : 'Reset Successful',
  ResetSuccessfulSlogan: I18nManager.isRTL
    ? 'تم إعادة تعيين كلمة المرور الخاصة بك بنجاح.'
    : 'Your password has been reset successfully.',
  Resetbutton: I18nManager.isRTL ? 'إعادة تعيين' : 'Reset',
  Match: I18nManager.isRTL ? 'تتطابق كلمتا المرور' : 'Both passwords match',
  Length: I18nManager.isRTL
    ? 'يجب أن تتكون كلمة المرور من 8 أحرف أو أكثر ، وتحتوي على أحرف كبيرة وصغيرة ورقم.'
    : 'Your password must be 8 or more characters long, contain both uppercase and lowercase letter & number.',
  GotTheCodeMe: I18nManager.isRTL ? 'حصلت على الرمز؟' : 'Got the code?',
  GotTheCode: I18nManager.isRTL ? 'إعادة تعيين' : 'Reset',
}

const OTPStrings = {
  Title: I18nManager.isRTL ? 'التحقق من OTP' : 'OTP Verification',
  Slogan: I18nManager.isRTL
    ? 'يرجى التحقق من رسائل SMS الخاصة بك. لقد أرسلنا لك كود مكون من 4 أرقام.'
    : 'Please check your SMS messages. We have sent you 4 digits code.',
  Verify: I18nManager.isRTL ? 'تحقق الآن' : 'Verify now',
  Resend: I18nManager.isRTL ? 'إعادة إرسال' : 'Resend',
}

const ProfileStrings = {
  Title: I18nManager.isRTL ? 'معلومات الملف الشخصي' : 'Profile Information',
  Done: I18nManager.isRTL ? 'تم' : 'Done',
  Full: I18nManager.isRTL ? 'الإسم الثلاثي' : 'Full Name',
  First: I18nManager.isRTL ? 'الاسم الآول' : 'First Name',
  Last: I18nManager.isRTL ? 'الاسم الآخير' : 'Last Name',
  height: I18nManager.isRTL ? 'طولك بالسنتيمتر' : 'Your height in centimeters',
  Nationality: I18nManager.isRTL ? 'الجنسية' : 'Nationality',
  Birth: I18nManager.isRTL ? 'تاريخ الميلاد' : 'Date Of Birth',
  Male: I18nManager.isRTL ? 'ذكر' : 'Male',
  Female: I18nManager.isRTL ? 'أنثى' : 'Female',
  City: I18nManager.isRTL ? 'المدينة' : 'City',
  location: I18nManager.isRTL ? 'تعيين موقع المنزل/العمل' : 'set Home/Work location',
  locationset: I18nManager.isRTL ? 'تم تحديد الموقع' : 'The location has been determined',
  Search: I18nManager.isRTL ? 'بحث' : 'Search',
  Save: I18nManager.isRTL ? 'حفظ' : 'Save',
}

const NotificationStrings = {
  Title: I18nManager.isRTL ? 'إشعارات' : 'Notifications',
  Allow: I18nManager.isRTL ? 'السماح' : 'Allow',
  Not: I18nManager.isRTL ? 'ليس الان' : 'Not Now',
  Slogan: I18nManager.isRTL
    ? 'السماح لاسم التطبيق بإرسال إشعارات إليك عند التعيين في وظيفة وتحديثات الدفع والوظيفة الجديدة وما إلى ذلك.'
    : 'Allow app name to send you notifications when you get hired on a job, payment updates,  new job etc.',
  Congrats: I18nManager.isRTL ? 'تهانينا!' : 'Congratulations!',
  CongratsSlogan: I18nManager.isRTL
    ? 'تم تعيين ملف التعريف الخاص بك ، يمكنك الآن تصفح الوظائف في مدينتك والبدء في التقديم ، والتوظيف ، وكسب أموال إضافية عندما تكون حرًا.'
    : 'Your profile is set, you can now browse the jobs in your city and start applying, get hired, and earn extra money while you are free.',
  Started: I18nManager.isRTL ? 'البدء' : 'Get Started',
  Done: I18nManager.isRTL ? 'تم' : 'Done',
  Setting: I18nManager.isRTL ? 'إعدادات الإشعار' : 'Notification settings',
  SettingSlogan: I18nManager.isRTL
    ? 'يمكنك تغيير هذا الإعداد لاحقًا في ملف الشخصي - إعدادات - الإشعارات - السماح بالإشعارات.'
    : 'You can change this setting later at profile-settings-notification-allow notification.',
}

const ErrorsStrings = {
  MobileUsed: I18nManager.isRTL ? 'رقم الجوال مستخدم' : 'The mobile number is used',
  nIDUsed: I18nManager.isRTL ? 'رقم الهوية الوطنية/الإقامة مستخدم' : 'The national ID / Iqama number is used',
  MobileNotFound: I18nManager.isRTL
    ? 'لا يوجد حساب مرتبط برقم الجوال'
    : 'No account associated with the mobile number',
  ErrorOccurred: I18nManager.isRTL ? 'حدث خطأ ، حاول مرة أخرى' : 'An error occurred, try again',
  OTPCode: I18nManager.isRTL ? 'حدث خطأ أثناء إرسال الرمز' : 'An error occurred while sending code',
  WrongCode: I18nManager.isRTL ? 'رمز خاطئ' : 'Wrong code',
  WrongCodeCheck: I18nManager.isRTL
    ? 'حدث خطأ أثناء التحقق من الرمز'
    : 'An error occurred while checking code',
  Required: I18nManager.isRTL ? 'جميع الحقول مطلوبة!' : 'All fields required!',
  LoginError: I18nManager.isRTL
    ? 'رقم الهاتف المحمول أو كلمة المرور التي أدخلتها غير صحيحة'
    : 'The mobile number or password you entered is incorrect',
  cantReset: I18nManager.isRTL
    ? 'يمكنك طلب إعادة تعيين كلمة المرور كل 24 ساعة ، وقد تم إرسال رمز OTP إلى هذا الرقم'
    : 'You can request a password reset every 24 hours, an OTP code has been sent to this number',
}

const SingleJobStrings = {
  Application: I18nManager.isRTL ? 'قدم الطلب' : 'Submit Application',
  EventEnded: I18nManager.isRTL ? 'انتهت الفعالية' : 'Event Ended',
  Description: I18nManager.isRTL ? 'الوصف' : 'Description',
  Rules: I18nManager.isRTL ? 'شروط' : 'Terms',
  Tranining: I18nManager.isRTL ? 'تدريب' : 'Training',
  date: I18nManager.isRTL ? 'تاريخ الفعالية: ' : 'Event Date: ',
  StartDate: I18nManager.isRTL ? 'تاريخ المباشرة: ' : 'Start Date: ',
  StartDateString: I18nManager.isRTL
    ? 'في حال قبولك، سيتم تحديد تاريخ المباشرة'
    : 'If accepted, the start date will be determined',
  Vacancy: I18nManager.isRTL ? 'العدد' : 'Vacancy',
  Salary: I18nManager.isRTL ? 'راتب' : 'Salary',
  Shifts: I18nManager.isRTL ? 'الورديات' : 'Shifts',
  About: I18nManager.isRTL ? 'عن العمل' : 'About the job',
  Responsibility: I18nManager.isRTL ? 'مسؤوليات العمل' : 'Job responsibilities ',
  CompanyRules: I18nManager.isRTL ? 'شروط العمل' : 'Job terms',
  TraniningRules: I18nManager.isRTL ? 'شروط التريب' : 'Training terms',
  ShiftSelect: I18nManager.isRTL ? 'تحديد الوردية' : 'Select Shift',
  ShiftTime: I18nManager.isRTL ? 'وقت الوردية: ' : 'Shift Time: ',
  ShiftAtta: I18nManager.isRTL ? 'وقت الحضور: ' : 'Attendance Time: ',
  Impor: I18nManager.isRTL ? 'مهم' : 'Important',
  successful: I18nManager.isRTL ? 'تم التقديم بنجاح' : 'submission successful',
  submitted: I18nManager.isRTL
    ? 'تم تقديم طلبك إلى العميل. سوف تحصل على إشعار لمزيد من المعلومات. شكرا.'
    : 'Your request has been submitted to the customer. You will get a notification for more information. Thank you.',
  Done: I18nManager.isRTL ? 'تم' : 'Done',
  Apply: I18nManager.isRTL ? 'تقديم' : 'Apply',
  Full: I18nManager.isRTL ? 'مكتمل' : 'Full',
  Shift: I18nManager.isRTL ? 'الوردية' : 'Shift',
  Attendance: I18nManager.isRTL ? 'الحضور' : 'Attendance',
  Time: I18nManager.isRTL ? 'وقت الوردية' : 'Shift Time',
  withdrawal: I18nManager.isRTL ? 'إنسحاب' : 'withdrawal',
  Cancel: I18nManager.isRTL ? 'إلغاء' : 'Cancel',
  Details: I18nManager.isRTL ? 'تفاصيل' : 'Details',
  ApplyingAs: I18nManager.isRTL ? 'تحديد الوظيفة' : 'Select Job',
  SelectOneOrMore: I18nManager.isRTL ? 'حدد واحدًا أو أكثر' : 'Select one or more',
  notRequired: I18nManager.isRTL ? 'غير مطلوب' : 'Not Required',
  organizer: I18nManager.isRTL ? 'المنظم' : 'Organizer',
  supervisor: I18nManager.isRTL ? 'المشرف' : 'Supervisor',
  Meal: I18nManager.isRTL ? 'وجبة' : 'Meal',
  Note: I18nManager.isRTL ? 'ملاحظة:' : 'Note:',
  Mealallowance: I18nManager.isRTL ? 'بدل وجبة عن كل يوم دوام' : 'Meal allowance for each working day',
  Applyingfor: I18nManager.isRTL ? 'التقديم' : 'Applying',
}

const HomePageStrings = {
  Error: I18nManager.isRTL ? 'حدث خطأ أثناء تحميل المهام!' : 'An error occurred while loading jobs!',
  Soon: I18nManager.isRTL ? 'قريبا' : 'Coming soon',
  Status: I18nManager.isRTL
    ? 'قم بتحديث حالتك لزيادة فرصتك في القبول'
    : 'Update your status to increase your chance to get accepted',
}

const ProfilePageStrings = {
  status: I18nManager.isRTL ? 'الحالة' : 'Status',
  Earnings: I18nManager.isRTL ? 'أرباح' : 'Earnings',
  Levels: I18nManager.isRTL ? 'المستوى' : 'Levels',
  IBAN: I18nManager.isRTL ? 'أضف IBAN' : 'Add IBAN',
  Invite: I18nManager.isRTL ? 'شارك التطبيق' : 'Share App',
  Support: I18nManager.isRTL ? 'الدعم' : 'Support',
  notspecifiedyet: I18nManager.isRTL ? 'غير محدد' : 'Not specified',
}

const SettingsPageStrings = {
  Notifications: I18nManager.isRTL ? 'إشعارات' : 'Notifications',
  PrivacyPolicy: I18nManager.isRTL ? 'سياسة الخصوصية' : 'Privacy Policy',
  Terms: I18nManager.isRTL ? 'أحكام وشروط' : 'Terms & Condition',
  Language: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
  Rateus: I18nManager.isRTL ? 'قيمنا' : 'Rate us',
  Logout: I18nManager.isRTL ? 'تسجيل خروج' : 'Logout',
}

const LevelsPageStrings = {
  Title: I18nManager.isRTL ? 'كيف تعمل المستويات؟' : 'How do Levels work?',
  About: I18nManager.isRTL
    ? 'للحصول على المستوى وتصبح موظفًا أعلى ، تحتاج إلى الحفاظ على معايير معينة لكل مستوى ، للترقية على المستوى التالي. سيؤدي ذلك إلى زيادة فرصتك في الحصول على مزيد من الوظائف.'
    : 'To gain the level and become a top employee you need to maintain certain criteria for each level, to upgrade on next level. This will increase your chance to be hired on more job.',
  LevelText: I18nManager.isRTL
    ? 'ستحصل على المستوى الأول عند التسجيل.'
    : 'You will get level one when you register.',
}

const SupportPageStrings = {
  Title: I18nManager.isRTL ? 'الدعم' : 'Help & Support',
  About: I18nManager.isRTL
    ? 'أخبرنا بمشكلتك ، وسوف نتصل بك في أقرب وقت ممكن. نحن دائما سعداء للمساعدة.'
    : 'Tell us your problem, we will contact you as soon as possible. We are always happy to help.',
  Message: I18nManager.isRTL ? 'رسالة' : 'Message',
  PlaceHolder: I18nManager.isRTL ? 'أخبرنا عن مشكلتك ...' : 'Tell us about your problem...',
  Send: I18nManager.isRTL ? 'إرسال' : 'Send',
  Done: I18nManager.isRTL ? 'تم' : 'Ok',
  ModalAbout: I18nManager.isRTL
    ? 'وصلتنا شكواك. سنعود إليك قريبًا ، شكرًا.'
    : 'We got your complaint. We will come back to you very soon, thank you for your patients.',
}

const IBANPageStrings = {
  Title: I18nManager.isRTL ? 'معلومات IBAN' : 'IBAN Info',
  About: I18nManager.isRTL
    ? 'لم تقم بإضافة أي رقم IBAN حتى الآن. أضف حسابك البنكي لتتلقى دفعات مباشرة إلى حسابك.'
    : "You haven't added any IBAN yet. Add your BANK account to get paid directly to your account.",
  Button: I18nManager.isRTL ? 'أضف IBAN' : 'Add IBAN',
  IBAN: I18nManager.isRTL ? 'IBAN' : 'IBAN',
  RepeatIBAN: I18nManager.isRTL ? 'كرر IBAN' : 'Repeat IBAN',
  AccountName: I18nManager.isRTL ? 'اسم صاحب الحساب' : 'Name of the account holder',
  Save: I18nManager.isRTL ? 'حفظ' : 'Save',
  New: I18nManager.isRTL ? '+ تعديل IBAN' : '+Edit IBAN',
  Cancel: I18nManager.isRTL ? 'إلغاء' : 'Cancel',
  Match: I18nManager.isRTL ? 'تتطابق' : 'Matched',
}

const StatusPageStrings = {
  Status: I18nManager.isRTL ? 'حالة المرشح' : 'Candidate status',
  notspecifiedyet: I18nManager.isRTL ? 'غير محدد' : 'Not specified',
  Cancel: I18nManager.isRTL ? 'إلغاء' : 'Cancel',
  New: I18nManager.isRTL ? '+ تعديل الحالة' : '+Edit Status',
  Save: I18nManager.isRTL ? 'حفظ' : 'Save',
  Done: I18nManager.isRTL ? 'تم' : 'Done',
}

const CompleteDetailsStrings = {
  Attended: I18nManager.isRTL ? 'آيام العمل (منظم)' : 'Work days (Organizer)',
  AttendedSuper: I18nManager.isRTL ? 'آيام العمل (مشرف)' : 'Work days (Supervisor)',
  TotalhoursO: I18nManager.isRTL ? 'إجمالي الساعات (منظم)' : 'Total Hours (Organizer)',
  TotalhoursS: I18nManager.isRTL ? 'إجمالي الساعات (مشرف)' : 'Total Hours (Supervisor)',
  Totalearning: I18nManager.isRTL ? 'إجمالي الآرباح' : 'Total Earning',
  Paymentstatus: I18nManager.isRTL ? 'حالة الدفع' : 'Payment Status',
  Paymentmethod: I18nManager.isRTL ? 'طريقة الدفع او السداد' : 'Payment Method',
  Start: I18nManager.isRTL ? 'تاريخ البدء' : 'Event Started',
  Ended: I18nManager.isRTL ? 'تاريخ الإنتهاء' : 'Event Ended',
  Salary: I18nManager.isRTL ? 'راتب المشرف' : 'Supervisor Salary',
  SalaryOrganizer: I18nManager.isRTL ? 'راتب المنظم' : 'Organizer Salary',
  msg: I18nManager.isRTL
    ? 'فيما يتعلق بالدفع النقدي ، ستتلقى إشعارًا بشأن وقت ومكان الدفع.'
    : 'About cash payment you will get notification about when and where for payment.',
  workHistory: I18nManager.isRTL ? 'سجل العمل' : 'Work History',
  PaymentAppointments: I18nManager.isRTL ? 'مواعيد الدفع' : 'Payment Appointments',
  noDate: I18nManager.isRTL ? 'لم يتم تحديد موعد' : 'No date has been set',
  organizer: I18nManager.isRTL ? 'المنظم' : 'Organizer',
  supervisor: I18nManager.isRTL ? 'المشرف' : 'Supervisor',
}

const HistoryPageStrings = {
  RefreshText: I18nManager.isRTL ? 'للتحديث اسحب للأسفل' : 'Pull down to refresh',
  Soon: I18nManager.isRTL ? 'قريبا سوف تحصل على جدول عملك' : 'Soon you will get your work schedule',
  WorkSchedule: I18nManager.isRTL ? 'جدول العمل' : 'Work Schedule',
}

const AnimatedButtonSelectStrings = {
  organizer: I18nManager.isRTL ? 'منظم' : 'Organizer',
  supervisor: I18nManager.isRTL ? 'مشرف' : 'Supervisor',
}

const AlertStrings = {
  Accept: I18nManager.isRTL ? 'قبول' : 'Accept',
  Decline: I18nManager.isRTL ? 'رفض' : 'Decline',
}

const WorkScheduleUserString = {
  Work: I18nManager.isRTL ? 'أيام العمل' : 'Work Days',
  incomplete: I18nManager.isRTL ? 'غير مكتمل' : 'Incomplete',
  active: I18nManager.isRTL ? 'نشط أو مكتمل' : 'Active or Completed',
  Absence: I18nManager.isRTL ? 'غياب' : 'Absence',
  Today: I18nManager.isRTL ? 'اليوم' : 'Today',
}

export {
  SignInStrings,
  HeaderTitles,
  LanguageChangeStrings,
  Register,
  ResetPasswordString,
  OTPStrings,
  ProfileStrings,
  NotificationStrings,
  ErrorsStrings,
  SingleJobStrings,
  HomePageStrings,
  ProfilePageStrings,
  SettingsPageStrings,
  LevelsPageStrings,
  SupportPageStrings,
  IBANPageStrings,
  StatusPageStrings,
  CompleteDetailsStrings,
  HistoryPageStrings,
  AnimatedButtonSelectStrings,
  AlertStrings,
  WorkScheduleUserString,
}
