<style>
.navbar-inverse{
    background-color:#000820;
}


.navbar-brand {
  height: 55px;
  
}
.navbar-brand img {
  width: 35px;
  height: 35px;

}
</style>

<template>
<div>
    <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header nav-title ">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        
          <a  class="navbar-brand" href="index.html"><img src="../../public/fairicon.png" /></a>
      
        </div>
        <div class="collapse navbar-collapse navbar-right is-collapse">
          <ul class="nav navbar-nav">
            <!-- <li class="active"><a href="index.html"><span class="glyphicon glyphicon-home">首页</span></a></li> -->
            <!-- <li><a href="#"><span class="glyphicon glyphicon-list">资讯</span></a></li> -->
            <li><a href="#"><span class="glyphicon glyphicon-link">签到</span></a></li>
            
            <li><a href="#"><span class="glyphicon glyphicon-user" style="text-shadow: black 5px 3px 3px;" @click="login">登陆</span></a></li>
          </ul>
        </div><!-- /.nav-collapse -->
      </div><!-- /.container -->
 </div>
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
      interval: null
    };
  },
  methods: {
    community() {},
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
      url.replace(pattern, function(attr, key, value) {
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
