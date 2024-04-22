interface FormDataModel {
  username: string;
  password: string;
  confPassWord?: string;
}

interface FormDataValidModel {
  username: boolean;
  password: boolean;
  confPassWord: boolean;
}

export type { FormDataModel, FormDataValidModel }