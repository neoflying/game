import EOS from "eosjs";
export default {
    appName: "Fair Party",
    mainToken: "EOS", // 主网代币，永远是EOS, 不会变
    gameToken: "FP",
    tokenContract: "eosio.token",
    gameTokenContract: "fairpartyeco",
    gameContract: "bet",
    
    version: "1.1",
    env: 'dev',
    // local testnet
    eosNetwork: {
        blockchain: 'eos',
        // host: '192.168.1.6',
        host: '39.106.185.114',
        port: 8888,
        chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
        protocol: "http"
    },

    eosOptions: {
        broadcast: true,
        sign: true,
        chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
        httpEndpoint: "http://39.106.185.114:8888"
    },

    // remote testnet
    // eosNetwork: {
    //     blockchain: 'eos',
    //     host: 'jungle.eosblocksmith.io',
    //     port: 8888,
    //     chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    //     protocol: "http"
    // },
    // eosOptions: {
    //     broadcast: true,
    //     sign: true,
    //     chainId: "cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f",
    //     httpEndpoint: "http://jungle.eosblocksmith.io:8888"
    // },

    // mainnet
    // eosNetwork: {
    //     blockchain: 'eos',
    //     // host: 'api.eosnewyork.io',
    //     host: 'api.hkeos.com',
    //     port: 80,
    //     chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    //     protocol: "http"
    // },

    // eosOptions: {
    //     broadcast: true,
    //     sign: true,
    //     chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    //     // httpEndpoint: "http://api.eosnewyork.io"
    //     httpEndpoint: "http://api.hkeos.com"
    // },
      
    // eos : EOS(config),

}


