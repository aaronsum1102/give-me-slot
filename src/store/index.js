import Vue from "vue";
import Vuex from "vuex";
import moment from "moment-timezone";

Vue.use(Vuex);
moment.locale("en-SG");

const state = {
  vendors: {},
  queryStatus: {},
  errorMessge: "",
  postalCode: "",
  lastUpdate: ""
};

const mutations = {
  SET_APP_SETTINGS: function(state, payload) {
    state.vendors = Object.assign({}, payload.vendors);
    state.queryStatus = Object.assign({}, payload.queryStatus);
  },
  SET_ERROR_MESSAGE: function(state, message) {
    state.errorMessge = message;
  },
  SET_POSTAL_CODE: function(state, queryPostalCode) {
    state.postalCode = queryPostalCode;
  },
  SET_LOADING_STATUS: function(state, payload) {
    state.queryStatus[payload.id].isLoading = payload.status;
  },
  SET_QUERY_STATUS: function(state, payload) {
    state.queryStatus[payload.id] = {
      ...state.queryStatus[payload.id],
      startDateTime: payload.slot.startTime,
      endDateTime: payload.slot.endTime
    };
  },
  SET_LAST_UPDATE: function(state) {
    state.lastUpdate = moment()
      .tz("Asia/Singapore")
      .format("LLL");
  }
};

const BASE_URL = "https://give-me-slot-api.herokuapp.com";

const getOptions = function() {
  return {
    headers: {
      "Content-Type": "application/json"
    }
  };
};

const actions = {
  fetchSettings: async function({ commit }) {
    try {
      let url = `${BASE_URL}/settings`;
      let result = await fetch(url, {
        method: "GET",
        ...getOptions()
      });
      if (result.ok) {
        let settings = await result.json();
        commit("SET_APP_SETTINGS", settings);
      }
    } catch (e) {
      commit("SET_ERROR_MESSAGE", e);
    }
  },
  updateErrorMessage: function({ commit }, message) {
    commit("SET_ERROR_MESSAGE", message);
  },
  updatePostalCode: function({ commit }, queryPostalCode) {
    commit("SET_POSTAL_CODE", queryPostalCode);
  },
  fetchSlots: async function({ commit, state }, id) {
    commit("SET_LOADING_STATUS", { id: id, status: true });
    let url = `${BASE_URL}/schedules/${id.toLowerCase()}/${state.postalCode}`;
    try {
      let response = await fetch(url, {
        method: "GET",
        ...getOptions()
      });
      let result = await response.json();
      if (response.ok) {
        let earliestSlot = result.slots.find(s => s.isAvailable);
        if (!earliestSlot) {
          commit("SET_QUERY_STATUS", {
            id: result.id,
            slot: {
              startTime: "",
              endTime: ""
            }
          });
        } else {
          commit("SET_QUERY_STATUS", {
            id: result.id,
            slot: {
              startTime: earliestSlot.startTime,
              endTime: earliestSlot.endTime
            }
          });
        }
        commit("SET_LAST_UPDATE");
      } else {
        commit("SET_ERROR_MESSAGE", result);
      }
    } catch (e) {
      commit("SET_ERROR_MESSAGE", e);
    } finally {
      commit("SET_LOADING_STATUS", { id: id, status: false });
    }
  },
  fetchSlotsForAllVendors: async function({ state, dispatch }) {
    let slotRequest = [];
    for (const vendorId in state.vendors) {
      slotRequest.push(dispatch("fetchSlots", vendorId));
    }
    Promise.all(slotRequest);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
