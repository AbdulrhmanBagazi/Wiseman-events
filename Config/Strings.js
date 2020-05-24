import { I18nManager } from 'react-native'

const SignUpStrings = {
  login: I18nManager.isRTL ? 'تسجيل دخول' : 'SignIn',
  one: I18nManager.isRTL ? '١' : '1',
  two: I18nManager.isRTL ? '٢' : '2',
  rigister: I18nManager.isRTL ? 'إنشاء حساب' : 'SignUp',
}

export { SignUpStrings }
