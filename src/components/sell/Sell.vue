<style>
.el-input__inner {
    background-color: transparent;
    color: #f19f23;
}

</style>

<template>
<div>
    <el-slider v-model="sell" show-input :step="10" show-stop :min=1 :max=1000> </el-slider>
    <img src="../../../public/favicon.png" />
    <span style="padding:3% 2%;">{{listenbalance}}</span>
    <el-button type="success" @click="handleSell" style="float:right;margin:2%; padding:2% 10%;">卖出</el-button>
</div>
</template>

<script>
export default {
    data() {
        return {
            sell: 1
        };
    },
    methods: {
        handleSell() {
            let self = this;
            console.log(self.sell);
        }
    },
    computed: {
        listenbalance() {
            return this.$store.state.balance;
        }
    }
};
</script>
