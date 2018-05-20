import api from '../../api/index'
import config from '../../api/config'

const EVALUATION_SET = 'EVALUATION_SET'
const EVALUATION_LIST = 'EVALUATION_LIST'
const HOT_LIST = 'HOT_LIST'
const EVALUATION_DETAIL = 'EVALUATION_DETAIL'
const FINISHED = 'FINISHED'
const UNFINISHED = 'UNFINISHED'

export default {
  state: {
    evaluationList: [],
    hotList: [],
    evaluationInfo: {},
    finished: [],
    unfinished: []
  },
  mutations: {
    [EVALUATION_SET](state, data) {
      state[data['target']] = data.data
    }
  },
  actions: {
    [EVALUATION_LIST]({ commit }, params) {
      return api.get(config.url.cepingList, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'evaluationList',
          data: res.data
        })
        return res
      })
    },
    [HOT_LIST]({ commit }, params) {
      return api.get(config.url.hotList, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'hotList',
          data: res.data
        })
        return res
      })
    },
    [EVALUATION_DETAIL]({ commit }, params) {
      return api.get(config.url.cepingInfo, params).then(res => {
        commit('EVALUATION_SET', {
          target: 'evaluationInfo',
          data: res.data
        })
        return res
      })
    },
    [FINISHED]({ commit }, params) {
      return api.get(config.url.finished.replace('{creator}', params)).then(res => {
        commit('EVALUATION_SET', {
          target: 'finished',
          data: res.data
        })
        return res
      })
    },
    [UNFINISHED]({ commit }, params) {
      return api.get(config.url.unfinished.replace('{creator}', params)).then(res => {
        commit('EVALUATION_SET', {
          target: 'unfinished',
          data: res.data
        })
        return res
      })
    }
  },
  modules: {}
}