import { ActionFunction } from 'react-router-dom';
import AMAApi from './AMAApi';

export const signIn: ActionFunction = async ({ request }) => {
  try {
    const data = await AMAApi.getDataFromFromRequest(request);
    const signInResponse = await AMAApi.signIn(data);
    AMAApi.setToken(signInResponse.data.token);
    const logInResponse = await AMAApi.getUserMe();
    return logInResponse.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return null;
    }
    throw error;
  }
};

export const signUp: ActionFunction = async ({ request }) => {
  try {
    const data = await AMAApi.getDataFromFromRequest(request);
    const signUpResponse = await AMAApi.signUp(data);
    return signUpResponse.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};

export const sendQuestion: ActionFunction = async ({ request, params }) => {
  try {
    const data = await AMAApi.getDataFromFromRequest(request);
    data.anonim = Boolean(data.anonim);
    data.owner = params.userID;
    const response = await AMAApi.postQuestion(data);
    return response.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};

export const sendAnswer: ActionFunction = async ({ request, params }) => {
  try {
    const data = await AMAApi.getDataFromFromRequest(request);
    data.question = params.questionId;
    const response = await AMAApi.postAnswer(data);
    return response.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};
