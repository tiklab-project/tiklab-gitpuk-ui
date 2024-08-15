import React,{useEffect,useState} from "react";
import {pluginLoader,PluginProvider} from "thoughtware-plugin-core-ui";
import {useTranslation} from "react-i18next";
import {Provider} from "mobx-react";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {HashRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import resources from "./common/language/Resources";
import "./common/language/I18n";
import "./index.scss";
import "./assets/font_icon/iconfont";
const App = ({allStore,routes}) => {
    return (
        <Provider {...allStore}>
            <ConfigProvider locale={zhCN}>
                <HashRouter>
                    { renderRoutes(routes) }
                </HashRouter>
            </ConfigProvider>
        </Provider>
    )
}

export default App
