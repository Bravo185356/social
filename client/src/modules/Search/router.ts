import SearchApi from './API/SearchApi';
import Module from './Module.vue'
import SearchPage from './views/SearchPage.vue'

const moduleRoute = {
    path: '/search',
    component: Module,
    children: [
        {
            path: '',
            component: SearchPage,
            props: true,
            beforeEnter: async (to: any) => {
                const userList = await SearchApi.getAllUsers(to.query);
                to.params.users = userList
            }
        }
    ]
}

export default moduleRoute