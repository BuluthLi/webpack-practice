let startId = 1;
const state = {
    todos: [
        {
            id: 1,
            text: 'this jis first job'
        }
    ]
}
const getters = {
    value: (state, getters, rootStates) => {
        return state.todos
    }
}
const actions = {
    // {commit,state}是上下文相关，不是调用时传递的参数，todo才是调用函数时需要传递的参数
    acAddTodo: ({ commit, state }, todo) => {
        commit('addTodo', todo);
    },
    acDelTodo: ({ commit, state }, todo) => {
        commit('delTodo', todo);
    }
}
const mutations = {
    addTodo: (state, todo) => {
        if (!todo.id) {
            todo.id = ++startId;
        }
        state.todos.push(todo);
    },
    delTodo: (state, todo) => {
        state.todos.forEach((item, index) => {
            if (item.id === todo.id) {
                state.todos.splice(index, 1)
            }
        })
    }
}
export default {
    // 暴露命名空间
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}