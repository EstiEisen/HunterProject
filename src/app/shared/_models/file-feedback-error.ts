import { FileFeedback } from './file-feedback.model';

export class FileFeedbackError extends FileFeedback {
  applicationsId:number;
  applicationsSubject: number;
  createdAtApplications: string;
  UpdateAtApplications:string;
  passedTo: number;
  ApplicationStatus:number;
  passedToText: string;
  applicationsSubjectText: string;
  ApplicationStatusText:Text;
  Comments:Text;
}
