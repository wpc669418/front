import { Validator } from 'vee-validate'
const dictionary = {
  'zh-CN': {
    messages: {
      required: field => '请输入' + field,
      email: () => '请输入正确的邮箱格式',
      password: () => '密码长度不符合',
      code: () => '验证码长度不符合',
      max: () => '超过最大长度',
      min: () => '不符合最小长度要求'

    },
    attributes: {
      email: '邮箱',
      password: '密码',
      name: '账号',
      code: '验证码'
    }
  }
}

Validator.localize(dictionary)
