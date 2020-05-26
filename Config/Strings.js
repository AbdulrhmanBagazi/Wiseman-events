import { I18nManager } from 'react-native'

const SignInStrings = {
  login: I18nManager.isRTL ? 'تسجيل دخول' : 'SignIn',
  one: I18nManager.isRTL ? '١' : '1',
  two: I18nManager.isRTL ? '٢' : '2',
  register: I18nManager.isRTL ? 'إنشاء حساب' : 'SignUp',
  Language: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
}

const HeaderTitles = {
  Home: I18nManager.isRTL ? 'الصفحة الرئيسية' : 'Home',
  Profile: I18nManager.isRTL ? 'الملف الشخصي' : 'Profile',
  SignIn: I18nManager.isRTL ? 'تسجيل دخول' : 'Sign In',
  SignUp: I18nManager.isRTL ? 'إنشاء حساب' : 'Sign Up',
  Language: I18nManager.isRTL ? 'تغير اللغة' : 'Change Language',
}

export { SignInStrings, HeaderTitles }
