import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { OptionsModel } from 'src/app/shared/models/options-model';
import { CvOptionsService } from '../../services/cv-options.service';
import { CvEnumOptionsService } from '../../services/cv-enum-options.service';
import { OccupationService } from 'src/app/personnel/services/occupation.service';
import { FamilyMemberCreateRequestModel, FamilyMemberResponseType, FamilyMemberTableResponseType, FamilyMemberUpdateRequestModel } from '../../types/family-member-type';
import { FamilyMerberService } from '../../services/family-merber.service';
import { NotificationMessage } from 'src/app/shared/constants/notification-message';
import { NotificationService } from 'src/app/lib/material/notification/services/notification.service';

@Component({
  selector: 'app-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  columns: string[] = ['name','occupation','designation','relation','phone', 'actions'];
  dataSource: MatTableDataSource<FamilyMemberTableResponseType>;
  subscription: Subscription = new Subscription();
  designations$ : Observable<OptionsModel[]> = this.cvOptionsService.getDesignations();
  occupations$ : Observable<OptionsModel[]> = this.occupationService.getOccupationsOption();
  relations$ : Observable<OptionsModel[]> = this.enumOptionService.getRelations();
  constructor(private fb: FormBuilder, private cvOptionsService: CvOptionsService, private familyMemberService: FamilyMerberService,
    private enumOptionService: CvEnumOptionsService, private occupationService: OccupationService,
    private activatedRoute: ActivatedRoute,  private notificationService: NotificationService,) {}

  ngOnInit(): void {
    this.initializeForm();

    this.LoadListData();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSave() {
    const personId = this.activatedRoute.snapshot.paramMap.get('id');

    if(personId && personId !== '') {
      const requestModel: FamilyMemberUpdateRequestModel = this.mapRequestData(personId);
      console.log(requestModel);

      if(requestModel.id) {
        this.subscription.add(
          this.familyMemberService.update<FamilyMemberUpdateRequestModel, unknown>(requestModel).subscribe({
            next: ()=> {
              this.notificationService.success(NotificationMessage.UpdatedSuccessfully);
              this.LoadListData();
              this.formGroup.reset();
            }, error: (err) => {
              this.notificationService.error(NotificationMessage.UpdatedFailure);
              console.log('Failed',err)
            }
          })
        );
      } else {
        this.subscription.add(
          this.familyMemberService.save<FamilyMemberCreateRequestModel, unknown>(requestModel).subscribe({
            next: ()=> {
              this.notificationService.success(NotificationMessage.SavedSuccessfully);
              this.LoadListData();
              this.formGroup.reset();
            }, error: (err) => {
              this.notificationService.error(NotificationMessage.SavedFailure);
              console.log('Failed',err)
            }
          })
        );
      }
    }
  }

  onClear() {
    this.formGroup.reset();
  }

  LoadListData() : void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const personId = params['id'];
      if(personId !== '') {
        this.subscription.add(
          this.familyMemberService.getFamilyMemerbersByPersonId(personId)
          .subscribe({ next: (response: FamilyMemberTableResponseType[]) => {
            this.dataSource = new MatTableDataSource(response);
          },error: err => console.log(err)
        })
        );
      }
    });
     
  }

  onEdit(data: FamilyMemberTableResponseType) {
    const { id } = data;
    this.familyMemberService.getById<FamilyMemberResponseType>(id).subscribe({next:(response: FamilyMemberResponseType) => {
      this.formGroup.setValue({ ...response});
    }, error: (error) => console.log(error)});
  }

  onDelete(data:FamilyMemberTableResponseType) {
    if(confirm('Do you want to delete') && data.id !== '') {
      this.subscription.add(this.familyMemberService.remove(data.id).subscribe({ next: () => {
        this.notificationService.success(NotificationMessage.DeletedSuccessfully);
        this.LoadListData();
      }, error: (err) => {
        this.notificationService.error(NotificationMessage.DeleteFailure);
        console.log(err);
      }}));
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      id: [null],
      personId: [null],
      name: [null,[Validators.required]],
      occupationId: [null],
      designationId: [null],
      relation: [''],
      contactNumber: ['',[Validators.maxLength(15)]],
      email: ['',[Validators.email]],
      address: ['',[Validators.maxLength(500)]],
      otherDetail: [''],
    });
  }

  private mapRequestData(personId: string) : FamilyMemberUpdateRequestModel {
    const formData = this.formGroup.value;

    return {
      id: formData.id,
      personId: personId,
      name: formData.name,
      relation: formData.relation,
      address: formData.address,
      email: formData.email,
      contactNumber: formData.contactNumber,
      designationId: formData.designationId,
      occupationId: formData.occupationId,
      otherDetail: formData.otherDetail,
    }
  }

  private isNullOrEmpty(str: string | null | undefined): boolean {
    return str == null || str.trim().length === 0;
  }
}
