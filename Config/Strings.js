import { I18nManager } from 'react-native'

const SignInStrings = {
  Login: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  Register: I18nManager.isRTL ? 'تسجيل' : 'Register',
  Member: I18nManager.isRTL ? 'لست عضوا حتى الآن؟' : 'Not a member yet?',
  Forgot: I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?',
  Phone: I18nManager.isRTL ? 'رقم الجوال' : 'Phone Number',
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
}

const HeaderTitles = {
  Home: I18nManager.isRTL ? 'الصفحة الرئيسية' : 'Home',
  Profile: I18nManager.isRTL ? 'الملف الشخصي' : 'Profile',
  SignIn: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  SignUp: I18nManager.isRTL ? 'إنشاء حساب' : 'Register',
  Language: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
  Reset: I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot Password',
  GetCode: I18nManager.isRTL ? 'استعادة كلمة المرور' : 'Password Recovery',
  OTP: I18nManager.isRTL ? 'التحقق' : 'Verification',
  CreateProfile: I18nManager.isRTL ? 'إنشاء ملف تعريف' : 'Create Profile',
}

const LanguageChangeStrings = {
  Select: I18nManager.isRTL ? 'إختيار اللغة' : 'Select Language',
}

const Register = {
  Register: I18nManager.isRTL ? 'تسجيل' : 'Register',
  ResetSlogan: I18nManager.isRTL
    ? 'مرحبًا بك في اسم التطبيق. قم بإدخال المعلومات التالية ،لإنشاء حسابك.'
    : 'Welcome to app name. Please provice the information below, set your account.',
  Phone: I18nManager.isRTL ? 'رقم الجوال' : 'Phone Number',
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
  RePassword: I18nManager.isRTL ? 'اعادة ادخال كلمة السر' : 'Re-enter password',
  Continue: I18nManager.isRTL ? 'إستمرار' : 'Continue',
  HaveAccount: I18nManager.isRTL ? 'لديك حساب؟' : 'Already have an account?',
  Log: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
}

const ResetPasswordString = {
  title: I18nManager.isRTL ? 'إستعادة كلمة المرور' : 'Recover Password',
  ResetSlogan: I18nManager.isRTL
    ? 'قم بإدخل رقم الجوال الخاص بحسابك لإستعادة كلمة المرور الخاصة بك. ستحصل على رمز OTP.'
    : 'Enter your phone number to recover your password. You will get an OTP code.',
  Phone: I18nManager.isRTL ? 'رقم الجوال' : 'Phone Number',
  OTP: I18nManager.isRTL ? 'رمز OTP' : 'OTP code',
  Continue: I18nManager.isRTL ? 'إستمرار' : 'Continue',
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
  RePassword: I18nManager.isRTL ? 'اعادة ادخال كلمة السر' : 'Re-enter password',
  CodeTitle: I18nManager.isRTL ? 'إعادة تعيين كلمة المرور' : 'Reset Password',
  CodeSlogan: I18nManager.isRTL ? 'تم إرسال رمز OTP إلى' : 'An OTP code has been sent to',
  Resend: I18nManager.isRTL ? 'إعادة إرسال الرمز' : 'Resend code',
  Resendmessage: I18nManager.isRTL ? 'لم تحصل على الرمز؟' : "Didn't get the code?",
  Log: I18nManager.isRTL ? 'تسجيل دخول' : 'LogIn',
  ResetSuccessful: I18nManager.isRTL ? 'تمت إعادة التعيين بنجاح' : 'Reset Successful',
  ResetSuccessfulSlogan: I18nManager.isRTL
    ? 'تم إعادة تعيين كلمة المرور الخاصة بك بنجاح.'
    : 'Your password has been reset successfully.',
  Resetbutton: I18nManager.isRTL ? 'إعادة تعيين' : 'Reset',
}

const OTPStrings = {
  Title: I18nManager.isRTL ? 'التحقق من OTP' : 'OTP Verification',
  Slogan: I18nManager.isRTL
    ? 'يرجى التحقق من رسائل SMS الخاصة بك. لقد أرسلنا لك كود مكون من 4 أرقام.'
    : 'Please check your SMS messages. We have sent you 4 digits code.',
  Verify: I18nManager.isRTL ? 'تحقق الآن' : 'Verify now',
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
}

export {
  SignInStrings,
  HeaderTitles,
  LanguageChangeStrings,
  Register,
  ResetPasswordString,
  OTPStrings,
  ProfileStrings,
}
