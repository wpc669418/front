import Vue from 'vue'
import { ValidationProvider, extend, localize } from 'vee-validate'
import { length, required, email, max, min, confirmed } from 'vee-validate/dist/rules'

extend('required', required)
extend('email', email)
extend('max', max)
extend('confirmed', confirmed)
extend('min', min)
extend('length', length)

localize('zh_CN', {
  name: 'zh_CN',
  names: {
    name: '账号',
    password: '密码',
    code: '验证码',
    nickname: '昵称'
  },
  messages: {
    length: (field) => `${field}要求长度为4位`,
    required: (field) => `请输入${field}`,
    confirmed: (field) => `${field}不一致`,
    min: (field, { length }) => `${field}必须至少有${length}个字符`,
    email: () => `不是一个有效的邮箱`,
    max: (field, { length }) => `${field}不能超过${length}个字符`
  }
})

// 手机号码验证
extend('mobile', {
  message: () => `请输入正确的手机号码`,
  validate: value => value.length === 11 && /^(((13[0-9]{1})|(14[57]{1})|(15[012356789]{1})|(17[03678]{1})|(18[0-9]{1})|(19[89]{1})|(16[6]{1}))+\d{8})$/.test(value)
})

Vue.component('ValidationProvider', ValidationProvider)
