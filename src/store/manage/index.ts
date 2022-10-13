import {createSlice, PayloadAction, Action} from "@reduxjs/toolkit";

import {getPersonalData} from "./actions";
import {ManageState} from "./types";
import {STATUSES} from "../../constants/redux";

const initialState: ManageState = {
  personalDataStatus: STATUSES.INITIAL,
  personalData: [],
};

const isPersonalDataPendingAction = (action: Action) =>
  action.type.startsWith("personal/get") && action.type.endsWith("pending");

const isPersonalDataRejectedAction = (action: Action) =>
  action.type.startsWith("personal/get") && action.type.endsWith("rejected");

export const manageSlice = createSlice({
  name: "manage",
  initialState,
  reducers: {
    addPersonalData: (state, {payload}: {payload: TTableData}) => {
      state.personalData.push({...payload, address: {city: payload.city}});
    },
    editPersonalData: (state, {payload}: {payload: TTableData}) => {
      const index = state.personalData.findIndex(
        (item) => item.id === payload.id
      );
      if (~index) {
        state.personalData.splice(index, 1, {
          ...payload,
          address: {city: payload.city},
        });
      }
    },
    removePersonalData: (state, {payload}: {payload: number}) => {
      state.personalData = state.personalData.filter(
        (item) => item.id !== payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getPersonalData.fulfilled.type,
        (state: ManageState, action: PayloadAction<IPersonalData[]>) => {
          state.personalDataStatus = STATUSES.FULFILLED;
          state.personalData = action.payload;
        }
      )
      .addMatcher(isPersonalDataPendingAction, (state: ManageState) => {
        state.personalDataStatus = STATUSES.PENDING;
      })
      .addMatcher(isPersonalDataRejectedAction, (state: ManageState) => {
        state.personalDataStatus = STATUSES.REJECTED;
        state.personalData = [];
      });
  },
});

export const {addPersonalData, editPersonalData, removePersonalData} =
  manageSlice.actions;

export default manageSlice.reducer;
