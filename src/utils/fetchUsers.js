export default function fetchUsers() {
    return fetch("/users").then((res) => res.json());
}