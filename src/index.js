import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
// import enableAxiosCE from 'tiklab-enable-axios-ce';
// import {useAccountConfig} from 'tiklab-eam-ui/es/_utils';
// import {orgStores} from 'tiklab-user-ui/es/store';
// import {privilegeStores} from 'tiklab-privilege-ui/es/store';
// import {messageModuleStores} from 'tiklab-message-ui/es/store'
// import {initFetch,createContainer} from 'tiklab-plugin-ui/es/_utils';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import {observer,Provider} from 'mobx-react';
import {useTranslation} from 'react-i18next';
import {renderRoutes} from 'react-router-config';
import routers from './routes';
import resources from './common/language/resources';
import {store} from './store';
import './index.scss';
import './assets/font_icon/iconfont';
import './common/language/i18n';

// enableAxiosCE()
const Index = observer(() => {

    const {i18n} = useTranslation()

    const [visible,setVisible] = useState(true)
    const [initPluginData,setPluginData] = useState({
        languages: resources,
        routes: routers,
        pluginStore: [],
        languageStore: []
    })

    // // 全局加载插件store
    // const PluginContainer  = createContainer()
    //
    const allStore = {
        // ...privilegeStores,
        // ...messageModuleStores,
        // ...orgStores,
        ...store
    }
    //
    // useAccountConfig()
    // useEffect(() => {
    //     initFetch('post',routers,resources).then(res => {
    //         setPluginData(res)
    //         setVisible(false)
    //     })
    // }, [])
    //
    // if (visible) return <div>加载。。。</div>

    return (
        <Provider {...allStore}>
            <ConfigProvider locale={zhCN}>
                <HashRouter >
                    {renderRoutes(initPluginData.routes)}
                </HashRouter>
            </ConfigProvider>
        </Provider>
        // <PluginContainer.Provider initialState={initPluginData}>
        //     <Provider {...allStore}>
        //         <ConfigProvider locale={zhCN}>
        //             <HashRouter >
        //                 {renderRoutes(initPluginData.routes)}
        //             </HashRouter>
        //         </ConfigProvider>
        //     </Provider>
        // </PluginContainer.Provider>
    )
})

ReactDOM.render(<Index/>, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
