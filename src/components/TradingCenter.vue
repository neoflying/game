<style>

</style>

<template>
<div class="trading-container container-fluid row">
    <el-card class="card" shadow="hover">
        <div slot="header" class="clearfix">
            <span>投资</span>
        </div>
        <invest></invest>
    </el-card>
</div>
</template>

<script>
import Invest from "./invest/Invest.vue";
import Sell from "./sell/Sell.vue";

export default {
    name: "app",
    components: {
        Invest,
        Sell
    },
    data() {
        return {
            activeName: "invest"
        };
    },
    methods: {
        handleClick(tab, event) {}
    }
};
</script>
