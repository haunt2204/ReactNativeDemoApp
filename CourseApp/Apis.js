import axios from "axios";

const HOST = "https://haunguyen.pythonanywhere.com"

export const endpoints = {
    'courses': "/courses/",
    'categories': "/categories/",
    'lessons': (course_Id) => `/courses/${course_Id}/lessons/`,
    'lessonDetail': (lessonId) => `/lessons/${lessonId}/`
}

export default axios.create({
    baseURL: HOST
})