<style>
    .container {
        /* background-color: var(--bgcolor); */
        /* padding-top: 1%; */
        width: 99%;
    }

    .trading-section {
        min-height: 500px;
    }

    .container-fluid {
        margin-right: 80px;
        margin-left: 80px;
        margin-top: 35px !important;
    }

    @media screen and (max-width: 800px) {
        .container-fluid {
            margin-right: 0px;
            margin-left: 0px;
            margin-top: 15px;
            margin-bottom: 0px;
            padding-left: 0px;
            padding-right: 0px;
        }

        .el-carousel__item span {
            color: #ea0302;
            font-size: 14px;
            opacity: 0.9;
            line-height: 25px !important;
            /*margin: ;*/
            position: relative;
            text-align: center;
            /*top: 35%;*/
            vertical-align: middle;
            display: block;
        }

        #community_btn {
            display: none;
        }

        #howtoplay_btn {
            display: none;
        }

        #trading_btn {
            display: none;
        }
    }
</style>

<template>
    <div class="container">
        <div class="row">
            <current id="current"></current>
        </div>
        <!--<div class="row">-->
        <!--<trading-center></trading-center>-->
        <!--</div>-->
        <!--<div class="row">-->
        <!--<my-account></my-account>-->
        <!--</div>-->
        <div class="row">
            <records></records>
        </div>
    </div>
</template>

<script>
    import MyAccount from "./MyAccount.vue";
    import TradingCenter from "./TradingCenter.vue";
    import Current from "./Current.vue";
    import Records from "./Records.vue";

    export default {
        name: "app",
        components: {
            MyAccount,
            TradingCenter,
            Current,
            Records
        }
    };
</script>
