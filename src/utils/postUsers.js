export default function postUsers(data) {
    return fetch("/users", {
        method: "POST",
        mode: "cors",
        cahce: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        referrer: "no-referrer",
        redirect: "manual",
        body: JSON.stringify(data)
    });
}