import { LoaderFunction } from 'react-router-dom';
import AMAApi from './AMAApi';

export const tokenLoader: LoaderFunction = async () => {
  if (AMAApi.getToken() !== undefined) {
    try {
      const response = await AMAApi.getUserMe();
      return response.data;
    } catch (error: any) {
      if (error.code !== 'ERR_NETWORK') {
        AMAApi.removeToken();
      }
      return null;
    }
  }
  return null;
};

export const searchLoader: LoaderFunction = async ({ request }) => {
  try {
    const searchParams = new URL(request.url).searchParams;
    const response = await AMAApi.getUsers(searchParams);
    return response.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};

export const userLoader: LoaderFunction = async ({ params }) => {
  try {
    const response = await AMAApi.getUser(params.userID ?? '');
    return response.data;
  } catch (error: any) {
    if (error.code === 'ERR_BAD_REQUEST') {
      throw error.response.data;
    }

    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};

export const answersLoader: LoaderFunction = async ({ request, params }) => {
  try {
    const searchParams = new URL(request.url).searchParams;
    const response = await AMAApi.getAnswers(params.userID, searchParams);
    return response.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};

export const questionsLoader: LoaderFunction = async () => {
  try {
    const response = await AMAApi.getQuestions();
    return response.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};

export const signOutLoader: LoaderFunction = () => {
  AMAApi.removeToken();
  return null;
};

export const likeLoader: LoaderFunction = async ({ params }) => {
  try {
    const response = await AMAApi.putAnswerLike(params.answerId ?? '');
    console.log(response.data, 123);

    return response.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};

export const dislikeLoader: LoaderFunction = async ({ params }) => {
  try {
    const response = await AMAApi.deleteAnswerDislike(params.answerId ?? '');
    return response.data;
  } catch (error: any) {
    if (error.code !== 'ERR_NETWORK') {
      return error.response.data;
    }
    throw error;
  }
};
