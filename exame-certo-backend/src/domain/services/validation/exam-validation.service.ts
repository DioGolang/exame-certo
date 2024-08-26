import { Exam } from "../../entites/exam.entity";
import { InvalidExamException } from "../../exceptions/invalid-exam.exception";


export class ExamValidationService{
  validate(exam: Exam): void {
    this.validateName(exam.type);
  }

  private validateName(type: string): void {
    if (!type || type.trim().length === 0){
      throw new InvalidExamException("Name is required")
    }
  }

}