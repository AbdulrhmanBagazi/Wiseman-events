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
  Home: I18nManager.isRTL ? 'الصفحة الرئيسية' : 'Home',
  AllJobs: I18nManager.isRTL ? 'جميع الوظائف' : 'All Jobs',
  SingleJobs: I18nManager.isRTL ? 'تفاصيل' : 'Details',
  Profile: I18nManager.isRTL ? 'الملف الشخصي' : 'Profile',
  History: I18nManager.isRTL ? 'السجل' : 'Job History',
  Notifications: I18nManager.isRTL ? 'إشعارات' : 'Notifications',
  SignIn: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  SignUp: I18nManager.isRTL ? 'إنشاء حساب' : 'Register',
  Language: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
  Reset: I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot Password',
  GetCode: I18nManager.isRTL ? 'استعادة كلمة المرور' : 'Password Recovery',
  OTP: I18nManager.isRTL ? 'التحقق' : 'Verification',
  CreateProfile: I18nManager.isRTL ? 'إنشاء ملف تعريف' : 'Create Profile',
  Application: I18nManager.isRTL ? 'تقديم' : 'Apply',
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
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
  RePassword: I18nManager.isRTL ? 'اعادة ادخال كلمة السر' : 'Re-enter password',
  Continue: I18nManager.isRTL ? 'إستمرار' : 'Continue',
  HaveAccount: I18nManager.isRTL ? 'لديك حساب؟' : 'Already have an account?',
  Log: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  Match: I18nManager.isRTL ? 'تتطابق كلمتا المرور' : 'Both passwords match',
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
  Nationality: I18nManager.isRTL ? 'الجنسية' : 'Nationality',
  Birth: I18nManager.isRTL ? 'تاريخ الميلاد' : 'Date Of Birth',
  Male: I18nManager.isRTL ? 'ذكر' : 'Male',
  Female: I18nManager.isRTL ? 'أنثى' : 'Female',
  City: I18nManager.isRTL ? 'المدينة' : 'City',
  location: I18nManager.isRTL ? 'موقع العمل / المنزل' : 'Home/Work location',
  Search: I18nManager.isRTL ? 'بحث' : 'Search',
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
  Description: I18nManager.isRTL ? 'الوصف' : 'Description',
  Rules: I18nManager.isRTL ? 'شروط' : 'Rules',
  Tranining: I18nManager.isRTL ? 'تدريب' : 'Training',
  date: I18nManager.isRTL ? 'تاريخ الحدث: ' : 'Event Date: ',
  Vacancy: I18nManager.isRTL ? 'العدد' : 'Vacancy',
  Salary: I18nManager.isRTL ? 'راتب' : 'Salary',
  Shifts: I18nManager.isRTL ? 'المناوبات' : 'Shifts',
  About: I18nManager.isRTL ? 'عن العمل' : 'About the job',
  Responsibility: I18nManager.isRTL ? 'مسؤوليات العمل' : 'Job responsibilities ',
  CompanyRules: I18nManager.isRTL ? 'شروط العمل' : 'Job Rules',
  TraniningRules: I18nManager.isRTL ? 'شروط التريب' : 'Training Rules',
  ShiftSelect: I18nManager.isRTL ? 'تحديد المناوبة' : 'Select Shift',
  ShiftTime: I18nManager.isRTL ? 'وقت المناوبة: ' : 'Shift Time: ',
  ShiftAtta: I18nManager.isRTL ? 'وقت الحضور: ' : 'Attendance Time: ',
  Impor: I18nManager.isRTL ? 'مهم' : 'Important',
  successful: I18nManager.isRTL ? 'تم التقديم بنجاح' : 'submission successful',
  submitted: I18nManager.isRTL
    ? 'تم تقديم طلبك إلى العميل. سوف تحصل على إشعار لمزيد من المعلومات. شكرا.'
    : 'Your request has been submitted to the customer. You will get a notification for more information. Thank you.',
  Done: I18nManager.isRTL ? 'تم' : 'Done',
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
}
