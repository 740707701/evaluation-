import api from "../../api/index";
import config from "../../api/config";

const ORDER_SET = "ORDER_SET"

const CREATEORDER = 'CREATEORDER'
const ORDERLIST = "ORDERLIST"
const NOPAYORDER = 'NOPAYORDER'
const ORDERINFO = "ORDERINFO"
const DELETEORDER = "DELETEORDER"
const ADDCART = 'ADDCART'
const DELETECART = 'DELETECART'
const CARTLIST = 'CARTLIST'
const ALIPAY = 'ALIPAY'
const WECHATPAY = 'WECHATPAY'
const REFUND = 'REFUND'
const WXQUERY = 'WXQUERY'

export default {
  state: {
		orderList: [],
		nopayOrder: [],
		orderInfo: {},
		cartList: [],
		cartInfo: {},
		buyInfo: {},
		refundInfo: {},
		wxqueryInfo: {}
  },
  mutations: {
    [ORDER_SET](state, data) {
      state[data["target"]] = data.data;
    }
  },
  actions: {
		//创建订单
		[CREATEORDER]({ commit }, data){
			return api.post(config.url.createOrder, data).then(res => {
				commit('ORDER_SET', {
					target: 'orderInfo',
					data: res.data
				})
				return res
			})
		},
		//订单列表
		//全部
		[ORDERLIST]({ commit }, params){
			return api.get(config.url.orderList, params).then(res => {
				commit('ORDER_SET', {
					target: 'orderList',
					data: res.data
				})
				return res
			})
		},
		//待付款
		[NOPAYORDER]({ commit }, params){
			return api.get(config.url.nopayOrder, params).then(res => {
				commit('ORDER_SET', {
					target: 'nopayOrder',
					data: res.data
				})
				return res
			})
		},
		//订单删除
		[DELETEORDER]({ commit }, params){
			return api.delete(config.url.deleteOrder, params).then(res => {
				commit('ORDER_SET', {
					target: 'orderInfo',
					data: res.data
				})
				return res
			})
		},
		//加入购物车
		[ADDCART]({ commit }, data){
			return api.post(config.url.addCart.replace('{cepingId}', data.cepingId), data).then(res => {
				commit('ORDER_SET', {
					target: 'cartInfo',
					data: res.data
				})
				return res
			})
		},
		//购物车删除
		[DELETECART]({commit}, params){
			return api.delete(config.url.deleteCart, params).then(res => {
				commit('ORDER_SET', {
					target: 'cartInfo',
					data: res.data
				})
				return res
			})
		},
		//购物车列表
		[CARTLIST]({ commit }, params){
			return api.get(config.url.cartList, params).then(res => {
				commit('ORDER_SET', {
					target: 'cartList',
					data: res.data
				})
				return res
			})
		},
		//购买
		//支付宝支付
		[ALIPAY]({ commit }, data) {
      return api.post(config.url.alipay, data).then(res => {
        commit('ORDER_SET', {
          target: 'buyInfo',
          data: res.data
        })
        return res
      })
		},
		//微信支付
		[WECHATPAY]({ commit }, data) {
      return api.post(config.url.WeChatPay, data).then(res => {
        commit('ORDER_SET', {
          target: 'buyInfo',
          data: res.data
        })
        return res
      })
		},
		[WXQUERY]({ commit }, data){
			return api.get(config.url.wxquery.replace('{orderNo}', data.orderNo)).then(res => {
				commit('ORDER_SET', {
					target: 'wxqueryInfo',
					data: res.data
				})
				return res
			})
		},
		//退款
		[REFUND]({ commit }, data){
			return api.post(config.url.refund, data).then(res => {
				commit('ORDER_SET', {
					target: 'refundInfo',
					data: res.data
				})
				return res
			})
		}
	}
};
