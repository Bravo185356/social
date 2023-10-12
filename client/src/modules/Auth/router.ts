import Module from './Module.vue'
import LoginPage from './views/LoginPage.vue'
import RegistrationPage from './views/RegistrationPage.vue'

const moduleRoute = {
    path: '/auth',
    component: Module,
    children: [
        {
            path: 'login',
            component: LoginPage,
        },
        {
            path: 'registration',
            component: RegistrationPage,
        }
    ]
}

export const AuthRoutes = moduleRoute