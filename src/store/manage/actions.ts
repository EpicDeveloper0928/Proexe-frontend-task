import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";

import {getDataAPI} from "../../api";

const getPersonalData = createAsyncThunk("personal/get", async () => {
  const response: AxiosResponse<Array<IPersonalData>> = await getDataAPI();
  return response.data;
});

export {getPersonalData};
