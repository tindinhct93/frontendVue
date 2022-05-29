import { createRouter, createWebHistory } from 'vue-router';

//import components
import FileUpload from "@/components/FileUpload";
import TheHistory from "@/components/TheHistory";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component:FileUpload },
        { path: '/history', component: TheHistory },
    ]
})








export default router;