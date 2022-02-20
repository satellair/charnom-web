export const GET_PROFILE = 'GET_PROFILE';

export const updateProfile = (profile:any) => {
  return {
    type: GET_PROFILE,
    payload: {
      profile: profile,
    },
  };
};
