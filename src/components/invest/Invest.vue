<style>
.invest-block {
  padding: 10px 15px;
  overflow: hidden;
}

.inveset-block__balance {
    margin-top: 15px;
}

.inveset-block__balance balance_0 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  line-height: 80px;
}

.inveset-block__balance span[balance] {
  font-size: 15px;
  color: rgb(229, 228, 238);
}

.inveset-block__balance span[label] {
  font-size: 18px;
  margin: 0 3em 0 1em;
  color: #8492a6;
}

.invest-block button {
  float: right;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 20px;
  padding-right: 20px;
}
.el-input-number__decrease,
.el-input-number__increase {
  background: #000820;
}
.my_current_cards {
  margin: 0.5em;
  font-size: 1.5em;
  text-align: center;
  text-shadow: 0 0 0.1em rgb(9, 207, 221), -0 -0 0.1em rgb(223, 9, 62);
}
</style>

<template>
<div class="container-fluid row">
    <div class="invest-block">
        <el-slider style="margin-left:10px;" v-model="invest" show-input :step="1" show-stop :min=1 :max=5> </el-slider>
    </div>
    <div class="invest-block">
        <div class="inveset-block__balance">
            <img class="balance_0" src="../../assets/images/fairicon.png" width="30" />
            <!-- <span class="balance_0" label>Balance</span> -->
            <span class="balance_0" balance> {{balance}}</span>
            <el-button class="balance_1" type="primary" @click="handleInvest">投注</el-button>
            <!-- <el-button v-if="!isLogin" disabled class="balance_1" type="primary" @click="handleInvest">请登录</el-button> -->
        </div>
        <div class="my_current_cards">
          <span>{{mycards}}</span>
        </div>
    </div>
</div>
</template>

<script>
import config from "../../config/config";
import utils from "../../utils/utils";
import EOS from "eosjs";
export default {
  data() {
    return {
      invest: 1,
      balance: "1 EOS",
      isLogin: false,
      mycards: "本局未参与！"
    };
  },
  methods: {
    handleInvest() {
      let self = this;
      self.$store.commit("setActionTime", new Date().getTime());
      if (this.$store.state.userName == "") {
        console.log("scatter is not login!");
        self.$message({
          message: "请先登录！",
          type: "warn",
          duration: 1000,
          center: true
        });
        return;
      }
      // var ref = this.$route.params;
      console.log(utils);
      let ref = utils.getUrlKey("ref");
      // hard code
      const account = window.scatter.identity.accounts.find(
        account => account.blockchain === "eos"
      );

      const options = {
        authorization: [`${account.name}@${account.authority}`]
      };
      var from = this.$store.state.userName;
      var to = config.gameContract;
      var amount = this.invest.toFixed(4) + " " + config.mainToken;
      var memo = ref == null ? "" : ref;

      // alert(this.$store.state.scatterEosClient==null)
      let eos = window.scatter.eos(config.eosNetwork, EOS, config.eosOptions);
      eos
        .transfer({ from: from, to: to, quantity: amount, memo: memo })
        .then(tx => {
          self.$message({
            message: "成功",
            type: "success",
            duration: 1000,
            center: true
          });
          self.$store.commit("setActionTime", new Date().getTime);
        })
        .catch(e => {
          self.$message({
            message: "转账失败",
            type: "error",
            duration: 1000,
            center: true
          });
        });
    }
  },
  watch: {
    "$store.state.actionTime": function() {
      if (this.$store.state.userName == "") {
        return;
      }
      this.$store.state.eosClient
        .getCurrencyBalance({
          account: this.$store.state.userName,
          code: config.tokenContract,
          symbol: config.mainToken
        })
        .then(result => {
          this.balance = result[0];
        });
    },
    "$store.state.globalInfo": function() {
      if (this.$store.state.globalInfo == "") {
        return;
      }
      let self = this;
      self.$store.state.eosClient
        .getTableRows({
          json: "true",
          code: config.gameContract,
          scope: self.$store.state.globalInfo.gameid,
          table: "round",
          limit: 20,
          lower_bound: 0
        })
        .then(data => {
          console.log(data);
          var mycardsInfo = "本局我的幸运卡:  ";
          let newDataFlag = false;
          if (data.rows && data.rows.length > 0) {
            let rounfInfo = data.rows;
            rounfInfo
              .filter(y => {
                if (y.player_name == self.$store.state.userName) {
                  newDataFlag = true;
                  return true;
                }
              })
              .map(data => {
                mycardsInfo += data.lucky_num + " | ";
              });
            self.mycards = newDataFlag ? mycardsInfo : self.mycards;
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>
