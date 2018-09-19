<style>
    .current-block {
        /* padding: 1px 1px; */
        overflow: hidden;
        display: flex;
        align-items: center;
        margin: 1px;
    }

    .current-block .demonstration {
        font-size: 14px;
        line-height: 35px;
        /* display: inline-flex; */
        /* margin-right: 1%; */
        /* margin-left: 1%; */
        margin-top: 1px;
    }

    .el-dialog {
        background: #000820;
    }

    .current-block .demonstration + .el-progress {
        width: 60%;
    }

    .eco-fun-balance {
        font-size: 20px;
    }

    .last-luckyinfo {
        font-size: 20px;
        color: #fe5000;
    }

    .drop-rate {
        font-size: 20px;
    }

    /* .col-md-2 {
      width: 30%;
    }
    .col-md-10 {
      width: 100%;
    } */
    .current {
        margin-top: 65px !important;
    }

    .el-table__body tr.hover-row > td {
        background-color: #1e3579 !important;
    }

    .my_current_cards {
        margin: 0.5em;
        font-size: 1em;
        text-align: center;
        text-shadow: 0 0 0.1em rgb(9, 207, 221), -0 -0 0.1em rgb(223, 9, 62);
    }
</style>
<style scoped>
    .el-dialog__title {
        color: #dfe4ef;
    }

    .claim span {
        color: #dfe4ef !important;
        text-shadow: 0 0 0.1em rgb(27, 213, 226), -0 -0 0.1em #f87;
    }

    .el-carousel__item span {
        align-items: center;
        color: #ea0302;
        font-size: 14px;
        opacity: 0.9;
        line-height: 50px;
        /*margin: ;*/
        position: relative;
        text-align: center;
        /*top: 35%;*/
        vertical-align: middle;
        display: block;
    }

    .el-carousel__item:nth-child(1) {
        background-color: #FFD700;
    }

    .el-carousel__item:nth-child(2) {
        background-color: rgb(233, 233, 216);
    }

    .el-carousel__item:nth-child(3) {
        background-color: #B87333;
    }

    .el-carousel {
        margin: 1px 1%;
    }

    .el-carousel__item {
        border-radius: 10px;
    }

    .el-carousel__container {
        height: 30px !important;
    }

    .invest-block {
        border-color: rgb(54, 49, 87);
        border-width: 2px !important;
        border-radius: 5px;
    }

    .el-progress-bar {
        color: rgb(255, 119, 75) !important;
    }

    .el-progress-bar__outer{
        box-shadow: 0px 0px 12px 1px #f213d9 !important;
    }
    .el-button--text span{
        color: aqua !important;
    }
    .el-slider__button{
        border-radius:30%;
        background-color:#409eff;
    }
    .el-input-number__decrease, .el-input-number__increase{
        background: transparent !important;
    }
</style>


<template>
    <div class="container-fluid  row current">
        <el-card shadow="hover">
            <div slot="header" class="clearfix">
                <span>游戏中心</span>
            </div>
            <div class="container-fluid">
                <el-carousel arrow="never" indicator-position="none" :interval="3000" type="card" height="50px">
                    <el-carousel-item v-for="item in 3" :key="item">
                        <span>{{lastLuckyInfo[item]}}</span>
                        <!--<span> 88 EOS </span>-->
                    </el-carousel-item>
                </el-carousel>
                <!--<div class="current-block row">-->
                <!--<span class="last-luckyinfo col-md-12">一等奖：{{lastLuckyInfo[1]}}</span>-->
                <!--</div>-->
                <!--<div class="current-block row">-->
                <!--<span class="last-luckyinfo col-md-12">二等奖：{{lastLuckyInfo[2]}}</span>-->
                <!--</div>-->
                <!--<div class="current-block row">-->
                <!--<span class="last-luckyinfo col-md-12">三等奖：{{lastLuckyInfo[3]}}</span>-->
                <!--</div>-->
                <div class="current-block row">
                    <span class="demonstration col-md-2">第{{global.gameid}}局进度</span>
                    <el-progress :text-inside="false" :stroke-width="18" :percentage="progress"
                    ></el-progress>
                </div>
                <div class="current-block row">
                    <span class="demonstration col-md-3">空投概率</span>
                    <span class="drop-rate col-md-3">{{air_drop_prob}}%</span>
                    <span class="demonstration col-md-3">空投次数</span>
                    <span class="drop-rate col-md-3">{{air_drop_count}}</span>
                </div>
                <div class="current-block row">
                    <span class="demonstration col-md-3">下一次分红</span>
                    <span class="col-md-3">{{next_profit_sharing_time}}</span>
                    <!-- <a href="#sharesstips"><el-button type="success" round>领取</el-button></a> -->
                    <!-- <span class="demonstration col-md-2">分红池</span> -->
                    <!-- <span class="eco-fun-balance  col-md-4">{{eco_fund_balance}}</span> -->
                    <el-button type="text" @click="getShares" class="claim" style="color:green">领取</el-button>

                    <el-dialog title="分红" :visible.sync="dialogTableVisible" width="80%">
                        <el-table :data="shares">
                            <el-table-column property="id" label="期号"></el-table-column>
                            <el-table-column property="end_time" label="结束时间"></el-table-column>
                            <el-table-column property="eco_fund_snapshoot" label="分红池"></el-table-column>
                            <el-table-column property="reward" label="我的奖励"></el-table-column>
                            <el-table-column fixed="right" label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="handleClaim(scope.row)" type="text" size="small">领取</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-dialog>

                </div>

                <div class="invest-block" style="border-style: solid;border-width: 10px;margin-top: 5px;">
                    <el-slider style="margin-left:10px;" v-model="invest" show-input :step="1" show-stop :min=1
                               :max=100></el-slider>

                    <div class="inveset-block__balance">
                        <img class="balance_0" src="../assets/images/eos.png" width="15px"/>
                        <!-- <span class="balance_0" label>Balance</span> -->
                        <span class="balance_0" balance> {{balance}}</span>
                        <el-button class="balance_1" type="primary" @click="handleInvest">投注</el-button>
                        <!--<div class="col-md-4">-->
                        <!--<img class="balance_0" src="../assets/images/fairicon.png" width="30"/>-->
                        <!--&lt;!&ndash; <span class="balance_0" label>Balance</span> &ndash;&gt;-->
                        <!--<span class="balance_0" balance> {{balance}}</span>-->
                        <!--</div>-->
                        <!-- <el-button v-if="!isLogin" disabled class="balance_1" type="primary" @click="handleInvest">请登录</el-button> -->
                    </div>
                    <!--<div class="current-block row my_current_cards">-->
                    <!--<span>{{mycards}}</span>-->
                    <!--</div>-->
                </div>

            </div>

        </el-card>
    </div>
</template>

<script>
    import config from "../config/config";
    import utils from "../utils/utils";
    import EOS from "eosjs";

    export default {
        data() {
            return {
                invest: 1,
                balance: 10,
                lastLuckyInfo: "",
                airDropRate: 0,
                interVal: null,
                global: "",
                progress: 0,
                air_drop_count: 0,
                air_drop_prob: 0,
                eco_fund_balance: "0 EOS",
                next_profit_sharing_time: "",
                total_dapp_token_hold: 0,
                shares: [],
                dialogTableVisible: false,
                myuniqueInfo: {},
                mycards: "本局未参与！",
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
                let ref = utils.getUrlKey("ref");

                var from = this.$store.state.userName;
                var to = config.gameContract;
                var amount = this.invest.toFixed(4) + " " + config.mainToken;
                var memo = ref == null ? "" : ref;

                // alert(this.$store.state.scatterEosClient==null)
                let eos = window.scatter.eos(config.eosNetwork, EOS, config.eosOptions);
                eos
                    .transfer({from: from, to: to, quantity: amount, memo: memo})
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
            },
            handleClaim(row) {
                let self = this;
                if (self.$store.state.userName == "") {
                    self.$message({
                        message: "请登陆",
                        type: "warning",
                        duration: 2000,
                        center: true
                    });
                    return;
                }
                const account = window.scatter.identity.accounts.find(
                    account => account.blockchain === "eos"
                );
                let eos = window.scatter.eos(config.eosNetwork, EOS, config.eosOptions);
                eos
                    .transaction({
                        actions: [
                            {
                                account: config.gameContract,
                                name: "claim",
                                authorization: [
                                    {
                                        actor: account.name,
                                        permission: account.authority
                                    }
                                ],
                                data: {
                                    account: account.name,
                                    shareid: row.id
                                }
                            }
                        ]
                    })
                    .then(tx => {
                        self.$message({
                            message: "成功",
                            type: "success",
                            duration: 1000,
                            center: true
                        });
                        self.getClaim();
                    })
                    .catch(e => {
                        console.error(e);
                        self.$message({
                            message: "失败！",
                            type: "error",
                            duration: 1000,
                            center: true
                        });
                    });
            },
            getClaim() {
                let self = this;
                let eos = self.$store.state.eosClient;
                eos
                    .getTableRows({
                        json: "true",
                        code: config.gameContract,
                        scope: self.$store.state.userName,
                        table: "claims",
                        limit: 10,
                        lower_bound: 0
                    })
                    .then(data => {
                        var dataRows = data.rows;
                        if (dataRows.length > 0) {
                            let myrecordsDummy = [];
                            for (let index in dataRows) {
                                let dataInfo = dataRows[index];
                                let dataTmp = self.myuniqueInfo[dataInfo.share_id];
                                if (dataTmp) {
                                    dataTmp.reward = dataInfo.reward;
                                }
                            }

                            for (let items in self.myuniqueInfo) {
                                myrecordsDummy.push(self.myuniqueInfo[items]);
                            }
                            self.shares = myrecordsDummy.reverse();
                            // self.shares.sort(utils.compare);
                        } else {
                            console.log("claim is net exist!");
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            },
            getShares() {
                this.dialogTableVisible = true;
                let self = this;
                let eos = self.$store.state.eosClient;
                eos
                    .getTableRows({
                        json: "true",
                        code: config.gameContract,
                        scope: config.gameContract,
                        table: "shares",
                        limit: 10,
                        lower_bound: 0
                    })
                    .then(data => {
                        if (data.rows.length < 1) {
                            console.log("no history record!");
                        } else {
                            // reverse()
                            let dataInfo = data.rows;
                            self.shares = dataInfo
                                .map(data => {
                                    data.end_time = new Date(data.end_time * 1000)
                                        .toLocaleString()
                                        .replace(/:\d{1,2}$/, " ");
                                    if (!self.myuniqueInfo[data.id]) {
                                        self.myuniqueInfo[data.id] = data;
                                    }
                                    return data;
                                })
                                .reverse();
                            self.getClaim();
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            },
            getGlobalInfo() {
                let self = this;
                let eos = self.$store.state.eosClient;
                eos
                    .getTableRows({
                        json: "true",
                        code: config.gameContract,
                        scope: config.gameContract,
                        table: "global",
                        limit: 10,
                        lower_bound: 0
                    })
                    .then(data => {
                        if (data.rows && data.rows.length > 0) {
                            let globalData = data.rows[0];
                            self.global = globalData;
                            self.$store.commit("setGlobalInfo", self.global);
                            self.progress = (globalData.operator_count) % 100;
                            self.air_drop_count = globalData.air_drop_count;
                            self.air_drop_prob = globalData.air_drop_prob;
                            self.eco_fund_balance = globalData.eco_fund_balance;
                            self.next_profit_sharing_time = new Date(
                                globalData.next_profit_sharing_time * 1000
                            )
                                .toLocaleString()
                                .replace(/:\d{1,2}$/, " ");
                            self.total_dapp_token_hold = globalData.total_dapp_token_hold;

                            eos
                                .getTableRows({
                                    json: "true",
                                    code: config.gameContract,
                                    scope: config.gameContract,
                                    table: "game",
                                    upper_bound: globalData.gameid,
                                    lower_bound: globalData.gameid - 1 //now 20 ,just get 19,because 20 is not open reward
                                })
                                .then(data => {
                                    let recent = data.rows[0];
                                    let recentInfo = {
                                        // 1: "一等奖: "+parseFloat(recent.lucky_reward_1)+"EOS/"+recent.lucky_man_1 + "/" + recent.lucky_id_1,
                                        1: "一等奖:\n"+parseFloat(recent.lucky_reward_1)+"EOS/"+recent.lucky_man_1 ,
                                        2: "二等奖: \n"+parseFloat(recent.lucky_reward_2)+"EOS/"+recent.lucky_man_2 ,
                                        3: "三等奖: \n"+parseFloat(recent.lucky_reward_3)+"EOS/"+recent.lucky_man_3 ,
                                    };

                                    self.lastLuckyInfo = recentInfo;
                                })
                                .catch(e => {
                                    console.error(e);
                                });
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        },
        created() {
            var self = this;
            self.getGlobalInfo();
            // self.interVal = setInterval(() => {
            //   self.getGlobalInfo();
            // }, 20000);
        },
        watch: {
            "$store.state.actionTime": function () {
                this.getGlobalInfo();
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
            "$store.state.globalInfo": function () {
                this.lastLuckyInfo = this.$store.state.recentRewardInfo;
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
                        var mycardsInfo = "本局幸运卡: ";
                        var mycards = [];

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
                                    mycards.push(data.lucky_num);
                                });
                            self.mycards = newDataFlag ? mycardsInfo + mycards.join() : self.mycards;
                        }
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        },
        beforeDestory() {
            clearInterval(this.interVal);
        }
    };
</script>
