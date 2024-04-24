import { FormDataModel } from "../models/FormData.models";

export function ApiSignUp(date: FormDataModel): Promise<FormDataModel | boolean> {
  return new Promise((resolve, reject) => {
    const  getUsers: FormDataModel[] =  JSON.parse(localStorage.getItem('users') || '[]');
    const checkUsers = getUsers.find(users => users.email === date.email)
    if (typeof checkUsers === 'undefined') {
      const nuwUsers = [...getUsers, date];
      localStorage.setItem('users', JSON.stringify(nuwUsers));
      setTimeout(() => {
        resolve(date);
      }, 2000);
    } else {
      setTimeout(() => {
        reject(true);
      }, 2000);
    }    
  });
};