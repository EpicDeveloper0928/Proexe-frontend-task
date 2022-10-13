import {RootState} from "..";

export const selectPersonalData = (state: RootState) =>
  state.manage.personalData;
export const selectPersonalDataStatus = (state: RootState) =>
  state.manage.personalDataStatus;
