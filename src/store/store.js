const stores = {
    state: {
        userName: "",
        balance:"",
        userInfo: {},
        scatterEosClient: null,
        eosClient: '',
        recentRewardInfo:"",
        actionTime:0,
        globalInfo:'',
        lowerBound:0

    },
    mutations: {
        setScatterClient(state, scatterEosClient) {
            state.scatterEosClient = scatterEosClient;
        },
        setEosClient(state, client) {
            state.eosClient = client;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setUserName(state, userName) {
            state.userName = userName;
        },
        setBalance(state, balance) {
            state.balance = balance;
        },
        setRecentRewardInfo(state, recentRewardInfo) {
            state.recentRewardInfo = recentRewardInfo;
        },
        setActionTime(state, actionTime) {
            state.actionTime = actionTime;
        },
        setGlobalInfo(state, globalInfo) {
            state.globalInfo = globalInfo;
        },
        setLowerBound(state, lowerBound) {
            state.lowerBound = lowerBound;
        },
    }
};
export default stores;