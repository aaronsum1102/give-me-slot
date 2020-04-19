import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  vendors: {
    NTUC : {
      id: "NTUC",
      name: "Fairprice",
      link: "https://www.fairprice.com.sg/cart",
    },
    ShengSiong: {
      id: "ShengSiong",
      name: "Sheng Siong",
      link: "https://www.allforyou.sg/cart"
    }
  },
  queryStatus: {
    NTUC : {
      isLoading: false,
      startDateTime: "2020-04-22T16:00:00+08:00",
      endDateTime: "2020-04-22T17:00:00+08:00"
    },
    ShengSiong : {
      isLoading: true,
      startDateTime: "",
      endDateTime: ""
    }
  }
}

const mutations = {

}

const actions = {
  
}

export default new Vuex.Store({
  state
});
