import Module from './Module.vue'
import UserPage from './views/UserPage.vue'

const moduleRoute = {
    path: '/:id',
    component: Module,
    children: [
        {
            path: '',
            component: UserPage,
        }
    ]
}

export default moduleRoute