<!-- yarn build -->
在yarn build打包好之后，
会有 （相关错误解析：https://www.jianshu.com/p/c14c427a6b3b）
   yarn global add serve
   serve -s build
会创建一个本地静态服务器，展示打包的文件的运行情况

可以用来上线前的本地测试（但是很少用到，几乎不用），本地使用yarn start启动的服务就可以处理绝大多数问题

<!-- react的js,jsx热更新（css热更新自带） -->
1.npm install react-hot-loader --save
2.webpack.config.dev.js:
    a.entry:[
        "react-hot-loader/patch",//添加
    ]
    b.module:{
        rules:[
            test:/\.(js|jsx|mjs)$/,
            options:{
                //添加
                plugins:[
                    "react-hot-loader/bable"
                ]
            }

        ]
    }
3.文件入口：
    a.import {AppContainer} from 'react-hot-loader'
    b.reactDom.render(<App />,document.getElementById('root'))
    ===>(变为)：
            const render=Component=>{
                reactDom.render(
                    <AppContainer>
                        <Component />
                    </AppContainer>,
                    document.getElementById('root')
                )
            }
            render(App)

            if(module.hot){
                //检测App组件的变化（其实包含了所有内容），并执行回调，render(app),实现热更新
                module.hot.accept('./components/App',()=>{
                    render(App)
                })
            }
