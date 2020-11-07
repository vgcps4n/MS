export interface PatientModel {
  id: string;
  registerNumber: string;
  createdDate: string;
  sisiId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  age?: string;
  profession: string;
  education: string;
  phoneNumber: string;
  email: string;
  homeAddress: string;
  workAddress: string;
}

export enum Gender {
  MALE, FEMALE, NOT_ASSIGNED
}

export const PATIENT_TABLE_COLUMNS: Column[] = [
  {columnDef: 'registerNumber', header: 'Регистрийн дугаар'},
  {columnDef: 'firstName', header: 'Нэр'},
  {columnDef: 'lastName', header: 'Овог'},
  {columnDef: 'age', header: 'Нас'},
  {columnDef: 'gender', header: 'Хүйс'},
  {columnDef: 'sisiId', header: 'СИСИ дугаар'},
  {columnDef: 'phoneNumber', header: 'Утасны дугаар'},
]

export interface Column {
  columnDef: string;
  header: string;
  actions?: Action[];
}

export interface Action {
  type: string;
  icon: string;
  tooltip: string;
}

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
  action?: string;
}

export interface RegistrationDialogData {
  title: string;
  patient?: PatientModel;
  submit: string;
  cancel?: string;
}
