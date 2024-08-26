export type Employee = {
    empid: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    gender: string,
    photo?: string
};

export type NewEmployee = {
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    gender: string,
    photo?: string
};