export enum AuthType {
  SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN',
  SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT'
}

interface Set_user_logged_in {
  type: AuthType.SET_USER_LOGGED_IN,
  payload: boolean
}

interface Set_user_logged_out {
  type: AuthType.SET_USER_LOGGED_OUT,
  payload: boolean
}

export type Action = Set_user_logged_in | Set_user_logged_out

const auth = {
  setUserLoggedIn: (value: boolean) => ({
    type: AuthType.SET_USER_LOGGED_IN,
    payload: value
  }),

  setUserLoggedOut: (value: boolean) => ({
    type: AuthType.SET_USER_LOGGED_OUT,
    payload: value
  })
}

export default auth