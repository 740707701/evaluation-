/**
 * port: 9088 为 java本机地址 java电脑关机即不可连接(没部署测试环境) 'http://192.168.0.177:9088'
 * port:37 为 线上环境 供u我派和其他学校调用地址，dist文件部署在37文件下 也可作为测试环境但不包括更改了测评的数据
 * port: 21 为 线上环境 供内蒙、菏泽(目前就两所学校)收费学校调用地址， dist文件部署在21文件夹下
 */
export const BASE_API = process.env.NODE_ENV === 'development' ? 'http://101.132.166.37:8080' // 'http://192.168.0.177:9088'
 : process.env.NODE_ENV === 'production' && process.env.ENV_CONFIG === 'prod21' ? 'http://101.132.100.21:8080'
  : process.env.NODE_ENV === 'production' && process.env.ENV_CONFIG === 'prod37' ? 'http://101.132.166.37:8080'
   : process.env.NODE_ENV === 'production' && process.env.ENV_CONFIG === 'prodtest' ? 'http://192.168.0.177:9088' : ''