import React,{useEffect,useState} from "react";
import {Provider} from "mobx-react";
import {ConfigProvider} from "antd";
import zhCN from "antd/es/locale/zh_CN";
import {HashRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import "./common/language/I18n";
import "./index.scss";
import "./assets/font_icon/iconfont";
import {InitInstallProvider} from "tiklab-eam-ui";
const App = ({allStore,routes}) => {
    return (
        <InitInstallProvider bgroup={'gitpuk'}>
            <Provider {...allStore}>
                <ConfigProvider locale={zhCN}>
                    <HashRouter>
                        { renderRoutes(routes) }
                    </HashRouter>
                </ConfigProvider>
            </Provider>
        </InitInstallProvider>
    )
}

export default App
