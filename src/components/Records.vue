<style>
    .el-table{
        background-color: transparent;
    }
    .el-table__empty-block, .el-table th, .el-table tr{
        background-color: transparent;
    }
</style>

<template>
<div class="container-fluid" >
    <el-card shadow="hover">
        <div slot="header">
            <span>交易记录</span>
        </div>
        <el-tabs height="250" highlight-current-row stripe v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane  label="我的记录" name="myRecord">
                <el-table :default-sort = "{prop: 'gameid', order: 'descending'}" :data="myRecord" :highlight-current-row="highlight" style="width: 100%">
                    <el-table-column align="center" header-align="center" prop="gameid" label="期号">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="myCurrentCards" label="我的幸运号">
                    </el-table-column>
                    <!-- <el-table-column align="center" header-align="center" prop="lucky_man_2" label="当期开奖">
                    </el-table-column> -->
                    
                    <el-table-column align="center" header-align="center" prop="last_action_time" label="结束时间">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="历史中奖记录" name="history">
                <el-table :data="history" :highlight-current-row="highlight" style="width: 100%">
                    <el-table-column align="center" header-align="center" prop="gameid" label="期号">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="lucky_man_1" label="第一名">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="lucky_man_2" label="第二名">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="lucky_man_3" label="第三名">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="end_time" label="结束时间">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <!-- <el-tab-pane label="售卖记录" name="sold">
                <el-table :data="sold" :highlight-current-row="highlight" style="width: 100%">
                    <el-table-column align="center" header-align="center" prop="date" label="日期">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="name" label="投注者">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="number" label="彩票号">
                    </el-table-column>
                    <el-table-column align="center" header-align="center" prop="payout" label="支付">
                    </el-table-column>
                </el-table>
            </el-tab-pane> -->
        </el-tabs>
    </el-card>
</div>
</template>

<script>
import config from "../config/config";
import utils from "../utils/utils";
export default {
  data() {
    return {
      activeName: "history",
      highlight: false,
      interVal: null,
      myRecord: [],
      myuniqRecord: {},
      history: [],
      sold: [
        {
          date: new Date().getTime(),
          name: "zhangsantest",
          number: "123456",
          payout: "3.0000"
        },
        {
          date: new Date().getTime(),
          name: "zhangsantest",
          number: "123456",
          payout: "3.0000"
        },
        {
          date: new Date().getTime(),
          name: "zhangsantest",
          number: "123456",
          payout: "3.0000"
        },
        {
          date: new Date().getTime(),
          name: "zhangsantest",
          number: "123456",
          payout: "3.0000"
        },
        {
          date: new Date().getTime(),
          name: "zhangsantest",
          number: "123456",
          payout: "3.0000"
        },
        {
          date: new Date().getTime(),
          name: "zhangsantest",
          number: "123456",
          payout: "3.0000"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {},
    getGameRecord() {
      let self = this;
      let eos = self.$store.state.eosClient;
      eos
        .getActions({
          account_name: config.gameContract,
          pos: -1, // INT sequence number of action for this account, -1 for last . default -1
          offset: -100 // INT get actions [pos,pos+offset] for positive offset or [pos-offset,pos) for negative offset
        })
        .then(
          res => {
            self.sold = res.actions
              .map(x => {
                return x.action_trace.act;
              })
              .filter(y => {
                // console.log(y);
                // buy record
                if (
                  y.account == config.tokenContract &&
                  y.name == "transfer" &&
                  y.data.to == config.gameContract
                ) {
                  return true;
                }
                // sell record
                if (y.account == config.gameContract && y.name == "sell") {
                  return true;
                }
                // destroy record
                if (y.account == config.gameContract && y.name == "destroy") {
                  return true;
                }
                return false;
              });
          },
          res => {
            console.log(res);
          }
        );
      let gameid = self.$store.state.globalInfo.gameid;
      if (!gameid) {
        return;
      }
      let lower_bound = gameid - 9 > 0 ? gameid - 9 : 0;
      eos
        .getTableRows({
          json: "true",
          code: config.gameContract,
          scope: config.gameContract,
          table: "game",
          limit: 10,
          lower_bound: lower_bound
        })
        .then(data => {
          console.log(data);
          if (data.rows.length < 2) {
            console.log("no history record!");
          } else {
            // reverse()
            let dataInfo = data.rows;
            let this_game = dataInfo.pop();
            let recent = dataInfo[dataInfo.length - 1];
            let recentInfo = {
              1: recent.lucky_man_1 + "/" + recent.lucky_id_1,
              2: recent.lucky_man_2 + "/" + recent.lucky_id_2,
              3: recent.lucky_man_3 + "/" + recent.lucky_id_3
            };
            self.$store.commit("setRecentRewardInfo", recentInfo);
            self.history = dataInfo
              .map(data => {
                data.end_time = new Date(data.end_time * 1000)
                  .toLocaleString()
                  .replace(/:\d{1,2}$/, " ");
                return data;
              })
              .reverse();
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    getMyRecord() {
      let self = this;
      let eos = self.$store.state.eosClient;
      if (self.$store.state.userName == "") {
        self.$message({
          message: "请登陆",
          type: "warning",
          duration: 1000,
          center: true
        });
        return;
      }
      let gameid = self.$store.state.globalInfo.gameid;
      if (!gameid) {
        return;
      }
      let lower_bound = gameid - 9 > 0 ? gameid - 9 : 0;
      eos
        .getTableRows({
          json: "true",
          code: config.gameContract,
          scope: self.$store.state.userName,
          table: "usergames",
          limit: 10,
          lower_bound: lower_bound
        })
        .then(data => {
          console.log(data);
          if (data.rows.length < 1) {
            console.log("no history record!");
          } else {
            // reverse()
            let dataInfo = data.rows;
            dataInfo.map(data => {
              data.last_action_time = new Date(data.last_action_time * 1000)
                .toLocaleString()
                .replace(/:\d{1,2}$/, " ");
              if (!self.myuniqRecord[data.gameid]) {
                self.getRoundInfo(data);
              }
              return data;
            });
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    // 倒排序

    getRoundInfo(roundInfo) {
      let self = this;
      self.$store.state.eosClient
        .getTableRows({
          json: "true",
          code: config.gameContract,
          scope: roundInfo.gameid,
          table: "round",
          limit: 100,
          lower_bound: 0
        })
        .then(data => {
          console.log(data);
          var mycardsInfo = "本局未参与！";
          let newDataFlag = false;
          if (data.rows && data.rows.length > 0) {
            let rounds = data.rows;
            rounds
              .filter(y => {
                if (y.player_name == self.$store.state.userName) {
                  newDataFlag = true;
                  mycardsInfo = "";
                  return true;
                }
              })
              .map(data => {
                mycardsInfo += data.lucky_num + " | ";
              });
            roundInfo.myCurrentCards = newDataFlag ? mycardsInfo : self.mycards;
            self.myuniqRecord[roundInfo.gameid] = roundInfo;
            let myrecordsDummy = [];
            for (var key in self.myuniqRecord) {
              myrecordsDummy.push(self.myuniqRecord[key]); //Coding, 100
            }
            self.myRecord = myrecordsDummy.sort(utils.compareAsc);
          }
        })
        .catch(e => {
          console.error(e);
        });
    }
  },
  // mounted() {
  //   this.getMyRecord();
  // },
  watch: {
    "$store.state.globalInfo": function() {
      this.getGameRecord();
      this.getMyRecord();
    },
    "$store.state.actionTime": function() {
      if (this.$store.state.userName == "") {
        return;
      }
      this.getMyRecord();
    }
  },
  beforeDestory() {
    // clearInterval(this.interVal);
  }
};
</script>
