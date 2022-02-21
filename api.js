const endpoint = "https://glo3102lab4.herokuapp.com";

export const createUser = async () => {
    if (!window.localStorage.getItem("userId")) {
        const request = new Request(
            `${endpoint}/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        const response = await fetch(request);
        const body = await response.json();
        const userId = body.id;
        window.localStorage.setItem("userId", userId);
    }
};

export const createTodo = async (todoName) => {
    const request = new Request(
        `${endpoint}/${window.localStorage.getItem("userId")}/tasks`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: todoName,
            }),
        }
    )
    const response = await fetch(request);
    console.log("Todo created");
    return response.json();
}

export const getTodos = async () => {
    const request = new Request(
        `${endpoint}/${window.localStorage.getItem("userId")}/tasks`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
    );
    const response = await fetch(request);
    return (await response.json()).tasks;
}

export const updateTodo = async ({name, id}) => {
    const request = new Request(
        `${endpoint}/${window.localStorage.getItem("userId")}/tasks/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
            }),
        }
    );
    const response = await fetch(request);
    await response.json();
    console.log("Todo updated");
}

export const deleteTodo = async (id) => {
    const request = new Request(
        `${endpoint}/${window.localStorage.getItem("userId")}/tasks/${id}`,
        {
            method: "DELETE",
        }
    );
    await fetch(request);
    console.log("Todo deleted");
}