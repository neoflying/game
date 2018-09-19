<style>
.text {
  font-size: 14px;
  color: var(--fontcolor);
}

.el-card {
  border-color: #162e74;
  border-width: 0.1em;
  background-color: transparent !important;
  margin-top: 30px;
}
.el-card__header {
  border-color: rgb(54, 49, 87);
  border-width: 0.2em;
}
/* tab 文字颜色 */
.el-tabs__item {
  color: grey;
}

.el-tabs__nav-wrap,
.el-tabs__nav-scroll,
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-color: transparent;
}
.el-table thead {
  color: rgb(248, 239, 239);
}
/* table字颜色 */
.el-table__empty-block,
.el-table th,
.el-table tr {
  background-color: #000820;
  color: rgb(252, 255, 199);
  text-shadow: 0 0 0.2em rgb(27, 213, 226), -0 -0 0.1em #f87;
}
.el-table__empty-text {
  font-size: medium;
}
.el-table_1_column_2 {
  color: rgb(237, 17, 245);
}
/* table borde */
.el-table td,
.el-table th.is-leaf {
  border-color: rgb(0, 8, 30);
  border-width: 0.1rem;
}

.el-card__header {
  font-size: medium;
  text-shadow: 0 0 0.2em rgb(27, 213, 226), -0 -0 0.2em #f87;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 0.2em solid rgb(54, 49, 87);
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-color: transparent;
}
.el-tabs__header {
  border-color: rgb(25, 22, 44);
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-color: rgb(54, 49, 87);
  border-width: 0.2em;
}
.el-table__body {
  border-color: transparent;
}
span {
  color: rgb(253, 253, 253);
  font-weight: bold;
}
/* card ::shadow */
.el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  box-shadow: 0px 0px 55px rgb(15, 90, 202);
  padding-top: 1px;
}
</style>

<style scoped>
</style>
>
<template>
<div class="container-fluid row">
    <el-card shadow="hover">
        <div slot="header" class="clearfix">
            <span>我的账户</span>
        </div>
        <span class="col-md-1">内存:</span>
        <el-progress class="col-md-3" :percentage="ram"  color="#8e71c7"></el-progress>
       
        <span class="col-md-1">cpu:</span>
        <el-progress  class="col-md-3" :percentage="cpu" color="#8e71c7"></el-progress>
        <span class="col-md-1">网络:</span>
        <el-progress  class="col-md-3" :percentage="net" color="#8e71c7"></el-progress>
        <div class="row"></div>
        <!-- <resource-module class="col-md-12" :detail="ram" :t-index=0 :percentage="20" :tip="ram"></resource-module> -->
        <!-- <resource-module class="col-md-12" :detail="cpu" :t-index=1 :percentage="20" :tip="cpu"></resource-module> -->
        <!-- <resource-module class="col-md-12" :detail="net" :t-index=2 :percentage="20" :tip="net"></resource-module> -->
    </el-card>
</div>

</template>

<script>
import ResourceModule from "./account/ResourceModule.vue";

export default {
  components: {
    ResourceModule
  },
  data() {
    return {
      ram: 10,
      cpu: 10,
      net: 10
    };
  },
  watch: {
    "$store.state.actionTime": function() {
      console.log("watch actionTime!", this.$store.state.recentRewardInfo);
      if (
        this.$store.state.userName == "" ||
        this.$store.state.userName == null
      ) {
        return;
      }
      let eos = this.$store.state.eosClient;
      eos
        .getAccount({
          account_name: this.$store.state.userName
        })
        .then(result => {
          let ram_usage = result.ram_usage;
          let ram_quota = result.ram_quota;
          let cpu_available = result.cpu_limit.available;
          let cpu_used = result.cpu_limit.used;
          let net_available = result.net_limit.available;
          let net_used = result.net_limit.used;
          if (ram_quota == -1) {
            this.ram = 100;
          } else {
            this.ram = ram_usage / ram_quota * 100;
          }
          this.cpu = cpu_used / cpu_available * 100;
          this.net = net_used / net_available * 100;
          console.log(result);
        })
        .catch(error => console.error(error));
    }
  }
};
</script>
