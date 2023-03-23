const URL = "http://localhost:3001/todos";

export const getTodos = () => {
    return fetch(URL).then((res) => res.json());
};

export const addTodo = (newTodo) => {
    return fetch(URL, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
};

export const updateTodo = (id, updatedTodo) => {
    return fetch(URL + `/${id}`, {
        method: "PUT",
        body: updatedTodo,
        headers: { "Content-type": "application/json" },
    }).then((res) => res.json());
};

export const deleteTodo = (id) => {
    return fetch(URL + `/${id}`, {
        method: "DELETE",
    }).then((res) => res.json());
}