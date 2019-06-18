import {Component, OnDestroy, OnInit} from '@angular/core';
import { NotificationService } from '../../../../shared/_services/notification.service';
import { MatDialog } from '@angular/material';
import { SkipTaskComponent } from './skip-task/skip-task.component';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import { PlanService } from '../../../../shared/_services/http/plan.service';
import { PlanTask } from '../../../../shared/_models/plan-task';
import { SelectUnitService } from '../../../../shared/_services/select-unit.service';
import { TimerService } from '../../../../shared/_services/http/timer';
import {TaskTimer, TaskTimerLabels} from '../../../../shared/_models/timer.model';
import { OperatorTasksService } from '../../../../shared/_services/http/operator-tasks';
import {ProcessDataService} from '../../../../shared/_services/process-data-service';
import {Process} from '../../../../shared/_models/process.model';

@Component({
  selector: 'app-ongoing-operation',
  templateUrl: './ongoing-operation.component.html',
  styleUrls: ['./ongoing-operation.component.css']
})
export class OngoingOperationComponent implements OnInit, OnDestroy {
  text: string;
  plan: PlanTask;
  path: string;
  task_timer_id: any;
  taskObj = new TaskTimer;
  seconds: string;
  minutes: string;
  hours: string;


  constructor(protected route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              protected notificationService: NotificationService,
              public processDataService: ProcessDataService,
              private planService: PlanService,
              private selectUnit: SelectUnitService,
              private timerService: TimerService,
              private operatorTasks: OperatorTasksService) { }

  ngOnInit() {
    this.text = (this.route.snapshot.routeConfig.path) ? this.route.snapshot.routeConfig.path : '';
    this.timerService.reset();
    this.newTaskTimer('ongoing_operation');
    this.planService.getSinglePlan().then(response => {
      this.plan = response['data'];
    });

  }
  taskCompletedDialog(ownerType: string): void {
    // const title = 'המשימה סומנה כטופלה';
    // this.notificationService.success(title);
    // const ownerType = this.plan.error.owner.type;
    if (ownerType === 'records') {
      this.processDataService.activeProcess = new Process();
      const data = {'processId': 14};
      this.processDataService.setProcess(data);
      this.router.navigate(['/platform', 'process', 'new', 1, 'details', 'records', 401]);
      // this.router.navigate(['/platform', 'process', 'new', 1, 'details']);
    } else if (ownerType === 'files') {
      this.processDataService.activeProcess = new Process();
      const data = {'processId': 14, 'highlightFileId': 401};
      this.processDataService.setProcess(data);
      this.router.navigate(['/platform', 'process', 'new', 1, 'details', 'files']);
    } else if (ownerType === 'compensation') {
      this.router.navigate(['/platform', 'compensations', 'process', 94]);
    }
  }

  skipTaskDialog(): void {
    this.dialog.open(SkipTaskComponent, {
      width: '660px',
      height: '240px'
    });
  }

  newTaskTimer(taskType: string): void {
    this.operatorTasks.newTaskTimer(taskType).then(
      response => {
        if (response > 0 ) {
          this.task_timer_id = response;
          this.taskObj.id = response;
          this.selectUnit.setTaskTimer(this.taskObj);
        }
      });
  }
  updateTaskTimer(duration: string): void {
    if (this.task_timer_id > 0) {
      this.operatorTasks.updateTaskTimer(this.task_timer_id, duration).then(
        response => response);
    }
  }

  ngOnDestroy() {
    this.router.events.subscribe(a => {
      if (a instanceof NavigationStart) {
        if (Object.values(TaskTimerLabels).some(c => c === a.url)) {
          const time = this.hours + ':' + this.minutes + ':' + this.seconds;
          this.updateTaskTimer(time);
          this.selectUnit.clearTaskTimer();
        }
      }
    });


  }
}
