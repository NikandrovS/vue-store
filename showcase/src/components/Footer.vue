<template>
  <el-row justify="center">
    <el-col :xs="12" :sm="8" :md="6" :lg="8" :xl="6">
      <ul>
        <li><a href="#">Политика конфиденциальности</a></li>
        <li><a href="#">Договор оферты</a></li>
      </ul>
    </el-col>
    <el-col :xs="12" :sm="8" :md="6" :lg="8" :xl="6">
      <el-select v-model="this.value" placeholder="Select" @change="(v)=>clickHandler(v)">
        <el-option
            v-for="item in values"
            :key="item.id"
            :label="item.label"
            :value="item.label"
        >
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Footer",
  props: ['currency', 'update'],
  methods: {
    clickHandler(value) {
      const currency = this.values.find(currency => currency.label === value)
      this.update(currency)
    }
  },
  data() {
    return {
      value: 'Rubles',
      values: [
        {
          symbol: '&#8381;',
          label: 'Rubles'
        },
        {
          symbol: '&dollar;',
          label: 'Dollars',
          exchange: 74,
        },
        {
          symbol: '&euro;',
          label: 'Euros',
          exchange: 86,
        }
      ],
    };
  }
};
</script>

<style lang="scss" scoped>

ul {
  padding-left: 20px;
  list-style-type: circle;
  a {
    text-decoration: none;
    color: #333333;
  }
  li {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
}
.el-row {
  align-items: center;
}
.el-col {
  display: flex;
  justify-content: center;
}
.el-select {
  margin: 0 auto;
}
p{
  vertical-align: center;
}
</style>
