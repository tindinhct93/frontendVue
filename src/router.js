import { createRouter, createWebHistory } from 'vue-router';

//import components
import FileUpload from "@/components/FileUpload";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component:FileUpload },
        //{ path: '/coaches', component: CoachesList },
    ]
})








export default router;