const api =  "http://192.168.10.9:8090";
const base_url = JSON.stringify(api);
const plugin_url = "http://192.168.10.9:3020";
const webpackGlobal = {
    // 判断是否是用户环境， 如果是用户环境收到切换为true， 如果是内部公司手动切换为false
    userProduction: true,
    base_url: base_url,
    plugin_base_url : base_url,
   /* plugin_base_url :JSON.stringify(plugin_url),*/
    // 这个不是固定的
    //plugin_url: JSON.stringify( plugin_url+"/plugin.json"),
    plugin_url: JSON.stringify( `/pluginConfig/getPluginConfig`),
    fetchMethod:JSON.stringify('post'),

    appKey: JSON.stringify('appKey-1'),
    appSecret: JSON.stringify('appSecret-1'),
    version: JSON.stringify('ce'),
    client: JSON.stringify('web'),

    tenant_type: JSON.stringify('single'), // mult  参数带tenant

    acc_url: JSON.stringify(''),
    mobile: JSON.stringify(''),
    devProduction: true,
    node_env: true,

}

module.exports =  {
    webpackGlobal,
}
