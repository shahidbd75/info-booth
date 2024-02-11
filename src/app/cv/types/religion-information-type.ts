export interface ReligionInformationRequest {
  personId: string;
  religiousBeliefId: number;
  casteId: number;
  prayerId: number;
  prayerInMosqueId: number;
  hijabTypeId: number;
  quranRecitationId: number;
  tabligueFrequencyId: number;
  religionParameters: number[];
}
