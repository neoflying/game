<style>
    .el-menu--horizontal {
        border-right: none;
        border-bottom: 0;
    }

    .el-menu-demo img {
        width: 35px;
        height: 35px;
    }

    .el-menu-demo {
        position: fixed;
        z-index: 102;
        width: 100%;
    }

    svg:not(:root).svg-inline--fa:hover {
        background-color: #6C2DED;
    }

    svg:not(:root).svg-inline--fa {
        border-radius: 25%;
        border-width: medium;
        /*padding: 10px;*/
        cursor: pointer;
        font-size: 1.2em;
        transition: background-color ease 200ms;
    }
    .el-dialog{
        background: #00040d !important;
    }
    .el-dialog__header{
        color: #f8f7ff !important;
    }


</style>
<style scoped>
    .el-col-6 {
        text-align: center;
    }
</style>
<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#000819"
                 text-color="#fff" active-text-color="#66b1ff">
            <el-menu-item index="0">
                <img src="../../public/fairicon.png"/>
            </el-menu-item>
            <!--<el-menu-item id="trading_btn" index="1">交易</el-menu-item>-->
            <el-menu-item index="1" @click="checkIn">签到</el-menu-item>
            <el-menu-item id="community_btn" index="2" @click="showSocial=true">社区</el-menu-item>
            <el-menu-item id="howtoplay_btn" index="3" @click="showHow=true">玩法说明</el-menu-item>
            <el-menu-item v-if="!islogin" @click="login" style="float:right" index="4">登录</el-menu-item>
            <el-submenu v-if="islogin" index="4" style="float:right">
                <template slot="title">{{username}}</template>
                <el-menu-item index="4-1" @click="logout">退出</el-menu-item>
            </el-submenu>
        </el-menu>

        <el-dialog id="community_dialog" width="60%"
                   :visible.sync="showSocial">
            <p slot="title" style="color: #fafafa;text-shadow: 0 0 0.1em rgb(27, 213, 226), -0 -0 0.1em #f87;">加入社区</p>
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <span @click="navigate('twitter')">
                        <font-awesome-icon :icon="['fab', 'twitter']"/>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span @click="navigate('github')">
                        <font-awesome-icon :icon="['fab', 'github']"/>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span @click="navigate('medium')">
                        <font-awesome-icon :icon="['fab', 'medium-m']"/>
                    </span>
                </el-col>
                <el-col :span="6">
                    <span @click="navigate('discord')">
                        <font-awesome-icon :icon="['fab', 'discord']"/>
                    </span>
                </el-col>
            </el-row>
        </el-dialog>


        <el-dialog
                width="60%"
                :visible.sync="showHow">
            <p slot="title">How To Play</p>
            <ol>
                <li>Make sure you have an EOS account. For more information on how to create one, <a
                        href="//medium.com/dapppub/create-your-own-eos-account-easily-using-the-non-service-fee-dapp-signupeoseos-b15c5347f2fc"
                        target="_blank">click here</a>.
                </li>
                <li>If you haven’t already, download and install <a href="//get-scatter.com/"
                                                                       target="_blank">Scatter</a>, an EOS wallet that
                    facilitates interaction between users and dApps.
                </li>
                <li>Set your BET AMOUNT. This is the amount of EOS you will be wagering.</li>
                <li>Adjust the slider to change your chance of winning.</li>
                <li>Click ROLL DICE to place your bet.</li>
                <li>If your number is lower than your ROLL UNDER TO WIN number, you win!</li>
                <li>If you get a notice that your transaction failed, please check that you have enough CPU &
                    bandwidth to make the transaction! Please use <a href="//eostoolkit.io/home" target="_blank">EOSToolkit</a>
                    to make any changes to your account!
                </li>
            </ol>
            <p>You can view your EOS balance next to the ROLL DICE button. The table below the slider bar shows recent
                bets from all players across the world.</p>
            <p>Still have questions? Reach out to us at <a
                    href="//discordapp.com/channels/482077322070196225/487187255065313292" target="_blank">Discord</a>
                and we’ll be happy to help!</p>
        </el-dialog>
        <!-- <el-dialog :title="alertTitle" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>{{alertInfo}}</span>
        </el-dialog> -->
    </div>
</template>

<script>
    import EOS from "eosjs";
    import config from "../config/config";

    export default {
        data() {
            return {
                activeIndex: "1",
                userName: "",
                islogin: false,
                dialogVisible: false,
                alertInfo: "",
                alertTitle: "",
                eosClient: null,
                scatterEosClient: null,
                interval: null,
                showSocial: false,
                showHow: false
            };
        },
        methods: {
            navigate(brand) {
                switch (brand) {
                    case 'twitter':
                        window.open('//twitter.com/dappPub');
                        break;
                    case 'medium':
                        window.open('//medium.com/dapppub');
                        break;
                    case 'github':
                        window.open('//github.com/dappub');
                        break;
                    case 'discord':
                        window.open('//discordapp.com/channels/482077322070196225/487187255065313292');
                        break;
                }
            },
            login() {
                console.log("login");
                let self = this;
                if (window.scatter == null) {
                    self.$message({
                        message: "请安装scatter！",
                        type: "warning",
                        duration: 3500,
                        center: true
                    });
                    window.open(
                        "https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle"
                    );
                }
                let clientType = this.getClientType();
                console.log(clientType);
                window.scatter
                    .getIdentity({
                        accounts: [config.eosNetwork]
                    })
                    .then(identity => {
                        console.log(identity);
                        if (identity && identity.accounts.length > 0) {
                            this.account = identity.accounts.find(
                                account => account.blockchain === "eos"
                            );
                            console.log("current login user is ", this.account.name);
                            self.username = this.account.name;
                            self.islogin = true;
                            self.$store.state.userName = self.account.name;
                            self.$store.state.actionTime = new Date().getTime();
                            self.$message({
                                message: "登录成功",
                                type: "success",
                                duration: 1500,
                                center: true
                            });
                        }
                    })
                    .catch(error => {
                        self.$message({
                            message: error,
                            type: "error",
                            duration: 1500,
                            center: true
                        });
                    });
            },
            logout() {
                let self = this;
                window.scatter.forgetIdentity().then(() => {
                    console.log("forget");
                    self.islogin = false;
                    self.$message({
                        message: "退出成功！",
                        type: "success",
                        duration: 1000,
                        center: true
                    });
                });
                self.$store.commit("setUserName", "");
            },
            checkIn() {
                var self = this;

                function login_event(event) {
                    self.login();
                }

                console.log("check");
                if (self.$store.state.userName == "") {
                    console.log("scatter is not login!");
                    self.$message({
                        message: "请先登录！",
                        type: "warning",
                        duration: 1000,
                        center: true,
                        onClose: login_event
                    });
                    return;
                }
                const account = window.scatter.identity.accounts.find(
                    account => account.blockchain === "eos"
                );

                // const options = {
                //   authorization: [`${account.name}@${account.authority}`]
                // };
                // hard code
                let eos = window.scatter.eos(config.eosNetwork, EOS, config.eosOptions);
                eos
                    .transaction({
                        actions: [
                            {
                                account: config.gameContract,
                                name: "check",
                                authorization: [
                                    {
                                        actor: account.name,
                                        permission: account.authority
                                    }
                                ],
                                data: {
                                    account: account.name
                                }
                            }
                        ]
                    })
                    .then(tx => {
                        console.log(tx);
                        self.$message({
                            message: "签到成功！",
                            type: "success",
                            duration: 1000,
                            center: true
                        });
                        self.$store.commit("setActionTime", new Date().getTime());
                    })
                    .catch(error => {
                        // alert(error)
                        console.log(error);
                        // let msg = "签到失败，";
                        // if (error.indexOf("play") != -1) {
                        //   msg += "请投注一次再签到！";
                        // } else if (error.indexOf("next day") != -1) {
                        //   msg += "签到冷却中！";
                        // }
                        self.$message({
                            message: error,
                            type: "error",
                            duration: 10000,
                            center: true
                        });
                    });
            },
            handleClose(done) {
                done();
                console.log("close!");
                // this.$confirm("确认关闭？")
                //   .then(_ => {
                //     done();
                //   })
                //   .catch(_ => {});
            },
            getClientType() {
                var u = navigator.userAgent,
                    w = window.location.href,
                    t = this.parseUrl(w);
                if (u.match(/Windows|/i) != null) {
                    return "window";
                }
                if (u.match(/Android/i) != null) {
                    //android设备
                    return "Android";
                } else if (u.match(/iPhone|iPod/i) != null) {
                    //IOS
                    return "IOS";
                } else {
                    return "WP";
                }
            },
            //取p值
            parseUrl(url) {
                var pattern = /(\w+)=([^\#&]*)/gi,
                    parames = {};
                url = url || window.location.href;
                url.replace(pattern, function (attr, key, value) {
                    parames[key] = decodeURI(value);
                });
                return parames;
            }
        },
        created() {
            let self = this;
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
                self.$store.commit("setActionTime", new Date().getTime());
            }, 10000);
            self.eosClient = EOS(config.eosOptions);
            self.$store.commit("setEosClient", EOS(config.eosOptions));
            document.addEventListener("scatterLoaded", scatterExtension => {
                let scatter = window.scatter;
                scatter.requireVersion(3.0);
                self.scatterEosClient = scatter.eos(
                    config.eosNetwork,
                    EOS,
                    config.eosOptions
                );
                self.$store.commit("setScatterClient", self.scatterEosClient);
            });
        }
    };
</script>
