import { I18nManager } from 'react-native'

const SignInStrings = {
  Login: I18nManager.isRTL ? 'تسجيل دخول' : 'Log In',
  Register: I18nManager.isRTL ? 'تسجيل' : 'Register',
  Member: I18nManager.isRTL ? 'لست عضوا حتى الآن؟' : 'Not a member yet?',
  Forgot: I18nManager.isRTL ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?',
  Phone: I18nManager.isRTL ? 'رقم الجوال' : 'Phone Number',
  Password: I18nManager.isRTL ? 'كلمة المرور' : 'Password',
}

const HeaderTitles = {
  Home: I18nManager.isRTL ? 'الصفحة الرئيسية' : 'Home',
  Profile: I18nManager.isRTL ? 'الملف الشخصي' : 'Profile',
  SignIn: I18nManager.isRTL ? 'تسجيل دخول' : 'Sign In',
  SignUp: I18nManager.isRTL ? 'إنشاء حساب' : 'Sign Up',
  Language: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
}

const LanguageChangeStrings = {
  Select: I18nManager.isRTL ? 'إختيار اللغة' : 'Select Language',
}

export { SignInStrings, HeaderTitles, LanguageChangeStrings }
