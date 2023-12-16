import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT_CONST } from 'src/app/shared/constants/endpoints';
import { OptionsModel } from 'src/app/shared/models/options-model';

@Injectable()
export class CvEnumOptionsService {
  constructor(private http: HttpClient) { }

  getSkills(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_SKILLS);
   }

   getStrengths(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_STRENGTHS);
   }

  getRelations(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_PROFILE_CREATED_BY);
  }

  getAcceptances(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_ACCEPTANCES);
  }

  getBodyTypes(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_BODY_TYPES);
  }
  getCastes(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_CASTE);
  }

  getColors(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_COLORS);
  }
  getComplexions(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_COMPLEXIONS);
  }

  getCookings(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_COOKINGS);
  }

  getDiets(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_DIETS);
  }

  getDisabilities(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_DISABILITIES);
  }

  getDessStyles(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_DREES_STYLES);
  }

  getDrinks(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_DRINKS);
  }

  getEmployeeStatus(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_EMPLOYEE_STATUS);
  }

  getEyeColors(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_EYE_COLORS);
  }

  getFamilyTypes(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_FAMILY_TYPES);
  }

  getFamilyValues(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_FAMILY_VALUES);
  }

  getGames(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_GAMES);
  }

  getHairColors(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_HAIR_COLORS);
  }

  getHaveChildrens(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_HAVE_CHILDRENS);
  }

  getLikes(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_LIKES);
  }

  getMovies(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_MOVIES);
  }

  getMusics(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_MUSICS);
  }

  getPartnerFamilyTypes(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_PARTNER_FAMILY_TYPES);
  }

  getPersonalValues(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_PERSONAL_VALUES);
  }

  getReads(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_READS);
  }

  getReligiousBelieves(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_RELIGIOUS_BELIEFS);
  }

  getResidencyStatus(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_RESIDENCY_STATUS);
  }

  getSmokes(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_SMOKES);
  }

  getTvShows(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_TV_SHOWS);
  }

  getZodiacSigns(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_ZODIAC_SIGNS);
  }

  getHandicrafts(): Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_HANDICRAFTS);
  }

  getMaritialStatus(): Observable<OptionsModel[]>  {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_MARITIAL_STATUS);
  }

  getBodyHeights() {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_BODY_HEIGHTS);
  }

  getBirds(): Observable<OptionsModel[]>  {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_BIRDS);
  }
  
  getPrayerInMosque() : Observable<OptionsModel[]> {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_PRAYERS_IN_MOSQUE);
  }

  getQuranRecitations(): Observable<OptionsModel[]>  {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_READING_QURANS);
  }

  getTabligueFrequencies(): Observable<OptionsModel[]>  {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_TABLIGUE_FREQUENCIES);
  }

  getPrayers(): Observable<OptionsModel[]>  {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_PRAYERS);
  }

  getHijabTypes(): Observable<OptionsModel[]>  {
    return this.http.get<OptionsModel[]>(API_ENDPOINT_CONST.CV_ENUM_OPTIONS.GET_HIJAB_TYPES);
  }
}
