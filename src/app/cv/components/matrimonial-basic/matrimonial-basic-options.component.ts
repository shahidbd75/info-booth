import { inject } from '@angular/core';
import { CvEnumOptionsService } from '../../services/cv-enum-options.service';

export class CvEnumOptionsComponent {
    protected service = inject(CvEnumOptionsService);
    skills$ = this.service.getSkills();
    smokingStatus$ = this.service.getSmokes();
    strengths$ = this.service.getStrengths();
    dressStyle$ = this.service.getDessStyles();
    bodyTypes$ = this.service.getBodyTypes();
    hairColors$ = this.service.getHairColors();
    eyeColors$ = this.service.getEyeColors();
    complexions$ = this.service.getComplexions();
    diets$ = this.service.getDiets();
    disabilities$ = this.service.getDisabilities();
    familyvalues$ = this.service.getFamilyValues();
    personalValues$ = this.service.getPersonalValues();
    residencyStatus$ = this.service.getResidencyStatus();
    guardianAs$ = this.service.getRelations();
    handicrafts$ = this.service.getHandicrafts();
    maritialStatus$ = this.service.getMaritialStatus();
    bodyHeights$ = this.service.getBodyHeights();
    birds$ = this.service.getBirds();
    games$ = this.service.getGames();
    musics$ = this.service.getMusics();
    reads$ =  this.service.getReads();
    tvShows$ =  this.service.getTvShows();
    cookings$ =  this.service.getCookings();
    movies$ =  this.service.getMovies();
    religiousBelieves$ = this.service.getReligiousBelieves();
    hijabTypes$ = this.service.getHijabTypes();
    prayers$ = this.service.getPrayers();
    prayerInMosque$ = this.service.getPrayerInMosque();
    quranRecitations$ = this.service.getQuranRecitations();
    tabligFrequencies$ = this.service.getTabligueFrequencies();
    familyTypes$ = this.service.getFamilyTypes();
    beardTypes$ = this.service.getBeardTypes();
    startSleepStatus$ = this.service.getStartSleeps();
    drinkingStatus$ = this.service.getDrinks();
}