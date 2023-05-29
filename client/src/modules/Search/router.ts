import Module from './Module.vue'
import SearchPage from './views/SearchPage.vue'

const moduleRoute = {
    path: '/search',
    component: Module,
    children: [
        {
            path: '',
            component: SearchPage,
        }
    ]
}

export default moduleRoute