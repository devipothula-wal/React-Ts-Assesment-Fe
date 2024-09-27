export const doLogout = () => {
    if (localStorage.getItem('token')) {
        localStorage.clear()
    }
}