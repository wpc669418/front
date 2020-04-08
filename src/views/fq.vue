<template>
  <div style="padding:30px">
    <el-row :gutter="20">
      <el-col :xs="8" :sm="8" :md="4">
        <div>
          <span style="width:200px">当前价格</span>
          <el-input v-model="price" placeholder="当前价格"></el-input>
        </div>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4">
        <span style="width:200px">期望收益</span>
        <el-input v-model="profit" placeholder="期望收益">
          <span style="line-height:40px;color:red;" slot="suffix">%</span>
        </el-input>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4">
        <span style="width:200px">智能数量</span>
        <el-input v-model="amount" placeholder="智能数量"></el-input>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4">
        <span style="width:200px">间隔差值</span>
        <el-input v-model="interval" placeholder="间隔差值"></el-input>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4">
        <span style="width:200px">阵长</span>
        <el-input v-model="step" placeholder="阵长"></el-input>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4">
        <span style="width:200px">手续费</span>
        <el-input v-model="charge" placeholder="手续费">
          <span style="line-height:40px;color:red;" slot="suffix">%</span>
        </el-input>
      </el-col>
    </el-row>

    <el-button size="medium " style="margin:20px 0;" type="primary" @click="create">生成</el-button>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" >
        <el-table stripe :data="firstList" style="width: 100%">
          <el-table-column label="涨盘">
            <el-table-column prop="inPrice" label="入" ></el-table-column>
            <el-table-column prop="outPrice" label="出" ></el-table-column>
            <el-table-column prop="amount" label="数量"></el-table-column>
            <el-table-column prop="pay" label="支出"></el-table-column>
            <el-table-column prop="income" label="收益"></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" >
        <el-table stripe :data="lastList" style="width: 100%">
          <el-table-column label="跌盘">
            <el-table-column prop="inPrice" label="入" ></el-table-column>
            <el-table-column prop="outPrice" label="出" ></el-table-column>
            <el-table-column prop="amount" label="数量"></el-table-column>
            <el-table-column prop="pay" label="支出"></el-table-column>
            <el-table-column prop="income" label="收益"></el-table-column>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      charge: 0.4, // 手续费
      price: 1.1, // 现价
      profit: 5, // 收益
      amount: 25, // 数量
      interval: 5, // 间隔差值
      step: 4, // 长度
      list: [],
      firstList: [],
      lastList: []
    }
  },
  mounted () {
    this._getValue()
    this.create()
  },
  methods: {
    create () {
      this._setValue()
      this.firstList = []
      this.lastList = []
      for (var i = 0; i < this.step; i++) {
        // 增盘入价
        let addIteminPrice = this._creatAddPrice(this.price, this.charge, this.profit, i)
        // 增盘出价
        let addItemOutPrice = this._creatAddPrice(
          this.price,
          this.charge,
          this.profit,
          i + 1
        )
        // 增盘数量
        let addItemAmount = (this.amount * 1 - i * this.interval).toFixed(2)
        // 收益
        let addIncome = (addIteminPrice * this.profit / 100 * addItemAmount * 7).toFixed(2)

        let addPay = (addIteminPrice * addItemAmount * 7).toFixed(2)

        let addItem = {
          inPrice: addIteminPrice,
          outPrice: addItemOutPrice,
          amount: addItemAmount,
          income: addIncome,
          pay: addPay
        }
        this.firstList.push(addItem)

        // 跌盘入价
        let cutIteminPrice = this._creatCutPrice(this.price, this.charge, this.profit, i)
        // 跌盘出价
        let cutItemOutPrice = this._creatCutPrice(
          this.price,
          this.charge,
          this.profit,
          i - 1
        )
        // 跌盘数量
        let cutItemAmount = (this.amount * 1 + i * this.interval).toFixed(2)
        // 碟盘收入
        let cutIncome = (cutIteminPrice * this.profit / 100 * cutItemAmount * 7).toFixed(2)
        // 跌盘支出
        let cutPay = (cutItemAmount * cutIteminPrice * 7).toFixed(2)
        let cutItem = {
          inPrice: cutIteminPrice,
          outPrice: cutItemOutPrice,
          amount: cutItemAmount,
          income: cutIncome,
          pay: cutPay
        }
        this.lastList.push(cutItem)
      }
      console.log(this.firstList, this.lastList)
    },
    _creatAddPrice (price, charge, profit, num) {
      return (
        this.price * Math.pow(1 + this.charge / 100 + this.profit / 100, num)
      ).toFixed(2)
    },
    _creatCutPrice (price, charge, profit, num) {
      return (
        this.price / Math.pow(1 + this.charge / 100 + this.profit / 100, num)
      ).toFixed(2)
    },
    _setValue () {
      localStorage.setItem('charge', this.charge)
      localStorage.setItem('price', this.price)
      localStorage.setItem('profit', this.profit)
      localStorage.setItem('amount', this.amount)
      localStorage.setItem('interval', this.interval)
      localStorage.setItem('step', this.step)
    },
    _getValue () {
      this.charge = localStorage.getItem('charge') * 1
      this.price = localStorage.getItem('price') * 1
      this.profit = localStorage.getItem('profit') * 1
      this.amount = localStorage.getItem('amount') * 1
      this.interval = localStorage.getItem('interval') * 1
      this.step = localStorage.getItem('step') * 1
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
</style>
