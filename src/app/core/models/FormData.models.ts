interface FormDataModel {
  email: string;
  password: string;
  confPassWord?: string;
  uuid: string;
}

interface FormDataValidModel {
  email: boolean;
  password: boolean;
  confPassWord: boolean;
}

export type { FormDataModel, FormDataValidModel }