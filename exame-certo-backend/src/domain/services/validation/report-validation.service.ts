import { InvalidReportException } from "../../exceptions/invalid-report.exception";
import { Report } from "../../entites/report.entity";


export class ReportValidationService{
  validate(report: Report): void {
    this.validateDoctorId(report.doctor.id);
    this.validateDate(report.date);
  }

  private validateDoctorId(doctorId: string): void {
    if (!doctorId || doctorId.trim().length === 0) {
      throw new InvalidReportException("Doctor ID is required");
    }
  }

  private validateDate(date: Date): void {
    if (!date || date > new Date()) {
      throw new InvalidReportException("Date is required");
    }
  }

}