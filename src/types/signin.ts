export interface login {
    userName: string,
    password: string
}

export interface signUp extends login {
    phoneNumber: number,
}