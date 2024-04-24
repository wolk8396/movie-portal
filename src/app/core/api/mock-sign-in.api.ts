import { FormDataModel } from "../models/FormData.models";

export function ApiSignIn(date: FormDataModel): Promise<FormDataModel | boolean> {
  return new Promise((resolve, reject) => {
    const  getUsers: FormDataModel[] =  JSON.parse(localStorage.getItem('users') || '[]');
    const checkUsers = getUsers.find(users => users.email === date.email);
    console.log(checkUsers);
    
    if (checkUsers && checkUsers.password === date.password) {
      setTimeout(() => resolve(checkUsers), 1000);
    } else {
      setTimeout(() => reject(true), 1000);
    };
  });
};