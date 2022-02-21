import {
    createUser,
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
} from "./api.js";

new Vue({
    el: "#app",
    data: {
        inputValue: "",
        todos: [],
    },
    methods: {
        async createTodo() {
            await createTodo(this.inputValue);
            this.inputValue = "";
            this.todos = await getTodos();
        },
        async updateTodo(todo) {
            await updateTodo(todo);
            this.todos = await getTodos();
        },
        async deleteTodo(todo) {
            await deleteTodo(todo.id);
            this.todos = await getTodos();
        },
    },
    beforeCreate(){
        createUser();
    },
    async mounted(){
        this.todos = await getTodos();
    },
});
