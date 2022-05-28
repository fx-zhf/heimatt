import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { NavBar, Field, CellGroup, ConfigProvider, Form, Button, Loading, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Col, Row, Badge, Grid, GridItem, Search } from 'vant'
createApp(App).use(store).use(router).use(NavBar).use(Field).use(CellGroup).use(ConfigProvider).use(Form).use(Button).use(Icon).use(Loading).use(Tabbar).use(TabbarItem).use(Tab).use(Tabs).use(Cell).use(List).use(PullRefresh).use(ActionSheet)
  . use(Popup).use(Col).use(Row).use(Badge).use(Grid).use(GridItem).use(Search).mount('#app')
