import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  DepositStatus,
  DepositType,
  EmployeeStatus,
  MonthlyTransferBlock,
  Types } from 'app/shared/_models/monthly-transfer-block';
import { Company } from 'app/shared/_models/company.model';
import { SelectUnitService } from 'app/shared/_services/select-unit.service';
import { NotificationService } from 'app/shared/_services/notification.service';
import { MonthlyTransferBlockService } from 'app/shared/_services/http/monthly-transfer-block';
import {ProcessService} from '../../../shared/_services/http/process.service';
import { TransferClause } from 'app/shared/_models/transfer_clause.model';
import { HelpersService } from 'app/shared/_services/helpers.service';

@Component({
  selector: 'app-edit-payments',
  templateUrl: './edit-payments.component.html',
  styleUrls: ['./edit-payments.component.css']

})
export class EditPaymentsComponent implements OnInit {

  arryMtb: MonthlyTransferBlock[] = [];
  // idsTransfer = [];
  mtb: MonthlyTransferBlock;
  employeeStatus = EmployeeStatus;
  depositType = DepositType;
  depositStatus = DepositStatus;
  products = [];
  companies: Company[] = [];
  editPaymentForm: FormGroup;
  sum= 0;
  type;

  lstTypes = Object.keys(Types).map(function(e) {
    return { id: e, name: Types[e] };
  });

  lstDepositType = Object.keys(DepositType).map(function(e) {
    return { id: e, name: DepositType[e] };
  });

  lstDepositStatus = Object.keys(DepositStatus).map(function(e) {
    return { id: e, name: DepositStatus[e] };
  });

  lstEmployeeStatus = Object.keys(EmployeeStatus).map(function(e) {
    return { id: e, name: EmployeeStatus[e] };
  });

  constructor(public route: ActivatedRoute,
              private selectUnit: SelectUnitService,
              private fb: FormBuilder,
              private mtbService: MonthlyTransferBlockService,
              private processService: ProcessService,
              private ref: ChangeDetectorRef,
              private helpers: HelpersService,
              private notificationService: NotificationService,
              private _location: Location) { }

  ngOnInit() {
    if (this.route.snapshot.data.mtb) {
      this.mtb = this.route.snapshot.data.mtb;
      this.arryMtb.push(this.route.snapshot.data.mtb);
    }
    this.type = this.route.snapshot.queryParams['type'];
    this.companies = this.selectUnit.getCompanies();
    this.initForm();

  }

  // withdraw_to_pending
  initForm(): void {
    this.editPaymentForm = this.fb.group({
      'mtb': this.fb.array([
        this.fb.group({
          'salary': [null , this.mtb.file_type !== 'withdraw_to_pending' ?  Validators.required : null],
          'working_days_in_month': [null ],
          'work_month_percentage': [null , Validators.required],
          'employee_status': [null, this.mtb.file_type !== 'withdraw_to_pending' ?  Validators.required : null],
          'employee_status_start_date': [null, this.mtb.file_type !== 'withdraw_to_pending' ?  Validators.required : null],
          'salary_month': [null,  Validators.required],
          'company_id': [null,  Validators.required],
          'product_id': [null,  Validators.required],
          'deposit_type':    [null, Validators.required],
          'deposit_status': [null,  Validators.required],
          'transfer_clause': this.fb.array([])
        })
      ]),
    });

    let m = this.editPaymentForm.get('mtb');
    m.patchValue( this.arryMtb);
    m = (<FormArray>m).controls[0];
    this.arryMtb[0].transfer_clause.forEach(transfer => {
      this.sum  += transfer.transfer_sum;
      this.addTransfer(m, transfer);

    });
  }

  addMtb(mtb?: any, clause?: TransferClause): void {
    const mtbControl = {
      'id': [mtb  ? +mtb['id'] : null],
      'salary': [mtb  ? +mtb['salary'] : null,  Validators.required],
      'working_days_in_month': [mtb  ? +mtb['working_days_in_month'] : null],
      'work_month_percentage': [mtb ? +mtb['work_month_percentage'] : null ,  Validators.required],
      'employee_status': [mtb ? mtb['employee_status'] : null,  Validators.required],
      'employee_status_start_date':  [mtb ? mtb['employee_status_start_date'] : null],
      'salary_month':  [mtb ? mtb['salary_month'] : null,  Validators.required],
      'company_id': [mtb ? +mtb['employer_company_id'] : null,  Validators.required],
      'product_id': [mtb ? +mtb['product_id'] : null,  Validators.required],
      'deposit_type': [mtb ? mtb['deposit_type'] : null,  Validators.required],
      'deposit_status': [mtb ? mtb['deposit_status'] : null,  Validators.required],
      'transfer_clause':  this.fb.array([
        this.fb.group({
          'id': [null],
          'clause_type':  [clause ? clause.clause_type : null , Validators.required],
          'transfer_sum': [clause ? clause.transfer_sum : null, [Validators.pattern('^0*[1-9][0-9]*(\\.\\d{1,2})?|0+\\.\\d{1,2}$'), Validators.required]],
          'transfer_percent':  [clause ? clause.expected_percent.toString() : null,  Validators.required],
          'exempt_sum': [0 , Validators.required],
        })
      ])
    };
    const mtbGroup = (<FormArray>this.editPaymentForm.get('mtb'));
    mtbGroup.push(this.fb.group(mtbControl));
  }

  removeMtb(index: number): void {
    const mtbGroup = (<FormArray>this.editPaymentForm.get('mtb'));
    mtbGroup.removeAt(index);
    this.calcSumSplit();
  }

  getMtbArrControls(): any[] {
    return (<FormArray>this.editPaymentForm.get('mtb')).controls;
  }

  getArrControls(m: any): any[] {
    return (<FormArray>m.get('transfer_clause')).controls;
  }

  addTransfer(m: any, transfer?: Object): any {
    const transferControl = {
      'id': [transfer  ? +transfer['id'] : null],
      'clause_type': [transfer  ? transfer['clause_type'] : '',  Validators.required],
      'transfer_sum': [transfer  ? +transfer['transfer_sum'] : null, [Validators.pattern('^0*[1-9][0-9]*(\\.\\d{1,2})?|0+\\.\\d{1,2}$'), Validators.required]],
      'transfer_percent': [transfer ? +transfer['transfer_percent'] : null, Validators.required ],
      'exempt_sum': [transfer ? +transfer['exempt_sum'] : null,  Validators.required]
    };
    const transferGroup =  (<FormArray>m.get('transfer_clause'));
    transferGroup.push(this.fb.group(transferControl));
  }

  remove(m: any, index: number): void {
    const transfer = (<FormArray>m.get('transfer_clause'));
    transfer.removeAt(index);
    this.calcSumSplit();
  }

  selectedProducts(item, product: FormGroup): void {
    this.products = this.companies.find(c => c.id === item).product;
    if (this.products.filter(n => n.id === product.value.product_id).length === 0) {
      product.patchValue({'product_id': null});
    }
  }

  submit(form: NgForm): void {
    if (this.sum !== this.mtb.amount) {
       this.notificationService.warning('' , ' סה"כ לא שווה לסהכ פיצול ');
    } else {
      if (form.valid) {
        if (this.type !== 'regular') {
          this.helpers.setPageSpinner(true);
          this.mtbService.setEditPayments(this.mtb.id, form.value).then(r => {
            this.helpers.setPageSpinner(false);
            if (!r.ok && r['result'] !== 'ok' ) {
              this.notificationService.error('הפיצול נכשל', '');
            } else {
              this.previous();
            }
          });
        } else {
          this.processService.regularFix(this.mtb.id, form.value).then(r => {
            if (r['result'] === 'false') {
              this.notificationService.error('השידור נכשל', '');
            } else {
              this.previous();
            }
          });
        }
      }
    }
  }


  sumPercent(m: any, transfer: FormGroup, index, i): void {
    const salary = m.value.salary;
    this.calcSumSplit();
    transfer.patchValue({'transfer_percent':  (transfer.value.transfer_sum / salary * 100).toFixed(2)});
    const clause = new TransferClause;
    const subSum =  this.mtb.amount - this.sum;
    if (subSum > 0) {
      clause.transfer_sum = +subSum.toFixed(2);
      clause.expected_sum = 0;
      clause.clause_type = transfer.value.clause_type;
      clause.expected_percent = +(subSum / salary * 100).toFixed(2);
      this.addMtb(this.mtb, clause);
      this.sum += +subSum;
    }
  }

  calcSumSplit(): void {
    const mtb = this.editPaymentForm.get('mtb').value;
    let sum_t = 0;


    mtb.forEach(mt => {
      mt.transfer_clause.forEach( t => {
        sum_t += t.transfer_sum;
      });
    });
    this.sum =  sum_t;
  }

  previous() {
    this._location.back();
  }


}
