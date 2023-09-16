import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  workerForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private router: Router, private workerService: WorkerService) {

  }
  ngOnInit(): void {
    this.initializeFormGroup();
  }
  initializeFormGroup() {
    this.workerForm = this.fb.group({
      name: [null, [Validators.required]]
    });
  }

  onWorkerSave() {
    console.log('asd')
  }

  onWorkerUpdate() {
    console.log('update')
  }

  resetForm() {
    this.router.navigate(['..']);
  }
}
