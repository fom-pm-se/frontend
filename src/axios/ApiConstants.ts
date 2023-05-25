export const API_SIGN_UP = '/v1/auth/signup'
export const API_SIGN_IN = '/v1/auth/signin'

export const API_GET_CURRENT_USER = '/v1/user/me';
export const API_GET_ALL_USER = '/v1/user/all';
export const API_EXISTS_USER = '/v1/auth/exists?username=';
export const API_LOCK_CURRENT_USER = '/v1/user/lock/me';

export const API_LOCK_USER = '/v1/user/lock?username=';
export const API_CHANGE_PASSWORD = '/v1/user/change-password';
export const API_CHANGE_CURRENT_USER_INFO = '/v1/user/change';
export const API_GET_ALL_SETTINGS_SHORT = "/v1/settings/all"
export const API_GET_ALL_SETTINGS_LONG = "/v1/settings/all/long"
export const API_SET_SINGLE_SETTING = "/v1/settings/set"
export const API_GET_PARTNER_LIST = "/v1/partner"
export const API_GET_PARTNER_TYPES = "/v1/partner/types"

export const API_GET_NOTES = "/v1/notes"
export const API_UPDATE_NOTE = API_GET_NOTES
export const API_CREATE_NOTE = API_GET_NOTES


export const API_GET_NOTIFICATIONS_COUNT = "/v1/notification/unread/count"
export const API_GET_NOTIFICATIONS = "/v1/notification/unread/"

export const API_SET_NOTIFICATION_READ = "/v1/notification/"
