<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{name:'reg'}">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                  <ValidationProvider rules="required|email" name="name" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        id="L_email"
                        name="email"
                        v-model="username"
                        autocomplete="off"
                        placeholder="请输入用户名"
                        class="layui-input"
                      />
                    </div>
                    <div class="errors layui-form-mid">{{errors[0]}}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <ValidationProvider rules="required|mix:6" name="password" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        id="L_pass"
                        name="pass"
                        v-model="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="errors layui-form-mid">{{errors[0]}}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <ValidationProvider rules="required|max:4" name="code" v-slot="{errors}">
                    <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_vercode"
                          name="vercode"
                          v-model="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="">
                        <span @click="_getCode" class="svg-label" style="color: #c00;" v-html="svg"></span>
                      </div>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" lay-submit>立即登录</button>
                  <span style="padding-left:20px;">
                    <router-link :to="{name:'forget'}">忘记密码？</router-link>
                  </span>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a
                    href
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode } from '../modules/login'
export default {
  data () {
    return {
      username: '',
      password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()

    const observe = (data, callback) => {
      return new Proxy(data, {
        get (target, key, value) {
          // return Reflect.get(target, key)
          return target[key]
        },
        set (target, key, value, proxy) {
          callback(key, value)
          target[key] = value
          return Reflect.set(target, key, value, proxy)
        }
      })
    }

    const FooBar = { open: 1 }
    const FooBarObserver = observe(FooBar, (property, value) => {
      property === 'open' && value
        ? console.log('FooBar is open!!!')
        : console.log('keep waiting')
    })
    console.log(FooBarObserver.open) // false
    FooBarObserver.open = true // FooBar is open!!!
  },
  methods: {
    async _getCode () {
      const res = await getCode()
      this.svg = res.data
    }
  }
}
</script>

<style>
.errors {
  color: red;
}
.svg-label{
  /* position: relative; */
  top: -3px;
}
</style>
