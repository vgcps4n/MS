import {Column} from "./examinaiton.model";

export const EXAM_TABLE_COLUMNS: Column[] = [
  {columnDef: 'patientRegisterNumber', header: 'Регистрийн дугаар'},
  {columnDef: 'symptom', header: 'Онош'},
  {columnDef: 'physicalState', header: 'Биеийн байдал'},
  {columnDef: 'examinedDate', header: 'Үзлэг хийсэн'},
  {columnDef: 'other', header: 'Бусад'},
]
