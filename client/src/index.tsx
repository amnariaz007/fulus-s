import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./store/store";
import './css/style.css';
import {WebAppProvider} from "@vkruglikov/react-telegram-web-app";
import {NextUIProvider} from "@nextui-org/react";
import './i18n';
//import './eruda';
import './firebase';
import ErrorBoundary from "./components/ErrorBoundary";
import './touch';

// @ts-ignore
const tg = window['Telegram'].WebApp;
console.log(tg)

tg.setHeaderColor('#08121D');
tg.setBackgroundColor('#08121D');
tg.enableClosingConfirmation();
tg.ready();
tg.expand();



// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <WebAppProvider options={{ smoothButtonsTransition: false }}>
            <NextUIProvider>
                <main className="dark text-foreground">
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </main>
            </NextUIProvider>
        </WebAppProvider>
    </Provider>
);