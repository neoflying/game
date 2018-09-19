<style>
.account-resource__module {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px 1.5em 10px 1.5em;
}

.account-resource__module--detail {
    padding: 0.5em;
}
.account-resource__module--detail span{
    text-shadow: 0 0 0.1em rgb(27, 213, 226), -0 -0 0.1em #f87;
}
.item {
  padding: 1px 0;
  display: flex;
  flex-direction: row;
}
</style>

<template>
<div class="account-resource__module">
    <div class="account-resource__module--detail">
        <!-- <span>{{type[tIndex]}}:{{detail}}  </span> -->
        <span>{{type[tIndex]}}  </span>
        <!-- <el-button type="text" class="button" @click="buy(type)">{{btnText}}</el-button> -->
    </div>
    <el-tooltip class="item" effect="dark" :content="tip" placement="top">
        <el-progress type="circle" :percentage="percentage" :width=80 color="#8e71c7"></el-progress>
    </el-tooltip>
    
</div>
</template>

<script>
export default {
    data() {
        return {
            btnText: "购买",
            type: ["内存", "CPU", "网络"]
        };
    },
    //props 父->子，子组件自定义属性
    props: {
        detail: "",
        percentage: 0,
        tIndex: 0,
        tip: ''
    },
    mounted() {},
    methods: {
        buy(type) {
            let self = this;
            let _tIndex = self.tIndex;
            switch (_tIndex) {
                case 0:
                    console.log("这里是0");
                    break;
                case 1:
                    console.log("这里是1");
                    break;
                case 2:
                    console.log("这里是2");
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
