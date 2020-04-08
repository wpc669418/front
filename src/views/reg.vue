<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name:'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <ValidationProvider rules="required|email" v-slot="{errors}">
                    <div class="layui-row">
                      <label for="L_email" class="layui-form-label">用户名</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_email"
                          name="email"
                          v-model="username"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                    </div>
                    <div class="errors-text">{{errors[0]}}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <ValidationProvider rules="required|min:3" v-slot="{errors}">
                  <div class="layui-row">
                    <label for="L_nickname" class="layui-form-label">昵称</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        id="L_nickname"
                        name="nickname"
                        required
                        v-model="nickname"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="errors-text layui-form-mid">{{errors[0]}}</div>
                  </div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <ValidationProvider  rules="required|min:4|max:6|confirmed:confirmation" v-slot="{errors}">
                    <div class="layui-row">
                      <label for="L_password" class="layui-form-label">密码</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_password"
                          name="密码"
                          v-model="password"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">长度为4-6位</div>
                    </div>
                    <div class="errors-text">{{errors[0]}}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <ValidationProvider vid="confirmation" rules="required|min:4|max:6" v-slot="{errors}">
                    <div class="layui-row">
                      <label for="L_confirmation" class="layui-form-label">确认密码</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_confirmation"
                          name="密码"
                          v-model="confirmation"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid layui-word-aux">两次输入保持一致</div>
                    </div>
                    <div class="errors-text">{{errors[0]}}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                 <ValidationProvider rules="required|length:4" v-slot="{errors}">
                    <div class="layui-row">
                      <label for="L_code" class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          id="L_code"
                          name="code"
                          v-model="code"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class=" layui-word-aux svg-label" v-html="svg"></div>
                    </div>
                    <div class="errors-text">{{errors[0]}}</div>
                  </ValidationProvider>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" lay-submit>立即注册</button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
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
      nickname: '',
      password: '',
      twice_password: '',
      code: '',
      svg: ''
    }
  },
  mounted () {
    this._getCode()
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
.errors-text {
  color: red;
}
.svg-label{
  position: relative;
  top: -3px;
}
</style>
