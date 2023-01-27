import { createAsyncThunk } from "@reduxjs/toolkit";
import Sessions from "utils/Sessions";
import ApiService from "../ApiService/ApiService";

const dummyThunk = createAsyncThunk("dummy/api", async () => {
  const res = await ApiService.get("/products/1");
  return res.data;
});

export const loginThunk = createAsyncThunk("login/api", async (body) => {
  const res = await ApiService.post("/auth/login", {
    ...body,
    requestedRole: process.env.REACT_APP_REQUEST_ROLE,
  });
  return res.data;
});

export const logoutThunk = createAsyncThunk("logout/api", async () => {
  const res = await ApiService.get("/auth/logout", {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  });
  return res.data;
});

export const configThunk = createAsyncThunk("config/api", async () => {
  const res = await ApiService.get("config/file", {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  });
  return res.data;
});

export const createSafetyCardThunk = createAsyncThunk("safetycard/api", async (body) => {
  const res = await ApiService.post(
    "safety-card/create",
    { ...body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  );
  return res.data;
});

export const getAllSafetyThunk = createAsyncThunk("getSafetyCard/api", async () => {
  const res = await ApiService.get("safety-card/cardlist", {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  });
  return res.data;
});
export const getAllFieldsThunk = createAsyncThunk("getallfields/api", async () => {
  const res = await ApiService.get("form-builder/list", {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  });
  return res.data;
});

export const deleteFieldsThunk = createAsyncThunk("deletefields/api", async (id) => {
  const res = await ApiService.delete(`form-builder/delete/${id}`, {
    headers: { Authorization: `Bearer ${Sessions.userToken}` },
  });
  return res.data;
});

export const createQuestionThunk = createAsyncThunk("createquestion/api", async (body) => {
  const res = await ApiService.post(
    "form-builder/create",
    { ...body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  );
  return res.data;
});

export const updateSafetyCardThunk = createAsyncThunk("updatesafetycard/api", async (body) => {
  const res = await ApiService.put(
    `safety-card/update/${body.id}`,
    { ...body.body },
    {
      headers: { Authorization: `Bearer ${Sessions.userToken}` },
    }
  );
  return res.data;
});

export default dummyThunk;
