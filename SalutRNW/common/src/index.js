"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Counter_1 = require("./screens/Counter");
var Router_1 = require("./Router");
var RootStore_1 = require("./stores/RootStore");
var Content_1 = require("./screens/Content");
var mobx_react_lite_1 = require("mobx-react-lite");
exports.App = (0, mobx_react_lite_1.observer)(function () {
    var rootStore = react_1.default.useContext(RootStore_1.RootStoreContext);
    var _a = (0, react_1.useState)(rootStore.authStore.authorized), contentVisible = _a[0], setContentVisible = _a[1];
    var handleButtonClick = function (result) {
        console.log('Button click result: ', result);
    };
    (0, react_1.useEffect)(function () {
        init();
    });
    var init = function () {
        if (rootStore.authStore.authorized) {
            rootStore.routerStore.changeScreen('UserInfo');
        }
        else {
            rootStore.routerStore.changeScreen('Login');
        }
        setContentVisible(rootStore.authStore.authorized);
    };
    return (<react_native_1.SafeAreaView>
			<react_native_1.ScrollView>
				<react_native_1.View style={styles.container}>
					<react_native_1.View style={styles.counterView}>
						<Counter_1.Counter />
					</react_native_1.View>
					<react_native_1.View style={styles.appView}>
						<Router_1.Router />
					</react_native_1.View>
					{!!contentVisible && (<react_native_1.View style={styles.contentView}>
							<Content_1.Content />
						</react_native_1.View>)}
					{/* <Card text='Test card' onButtonClick={(result) => {handleButtonClick(result)}}/> */}
				</react_native_1.View>
			</react_native_1.ScrollView>
		</react_native_1.SafeAreaView>);
});
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
    },
    counterView: {
        padding: 40,
        margin: 20,
        borderWidth: 2,
    },
    appView: {
        padding: 40,
        margin: 20,
        borderWidth: 2,
    },
    contentView: {
        padding: 40,
        margin: 20,
        minWidth: 200,
    },
});
