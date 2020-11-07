import {Action, PatientModel} from "../../registration/model/registration.model";

export interface ExamModel {
  id?: string;
  patientId?: string;
  patientRegisterNumber: string;
  symptom: string;
  physicalState: string;
  temperature: number;
  bloodPressure: number;
  heartRate: number;
  skinCondition: string;
  thoracic: string;
  other: string;
  examinedDate?: Date;
}

export interface Column {
  columnDef: string;
  header: string;
  actions?: Action[];
}

export interface ExaminationDialogData {
  title: string;
  exam?: ExamModel;
  patient?: PatientModel;
  registers?: string[];
  submit: string;
  cancel?: string;
}
