interface Event {
  token: string
  siteKey: string
  expectedAction: string
}

export interface recaptchaPayload {
  event: Event
}

export interface AkamaiVersion {
  identifier: string
  checkSum: string
  time: number
}

export interface website {
  website: string
  akamaiSiteVersion: AkamaiVersion[]
}
export interface version {
  identifier: string
  version: string
  checkSum: string
  downloadUrl: string
  time: number
}

export interface SiteListButton {
  list: any
}

export interface errorResponse {
  success: boolean
  message: string
}

export interface link {
  buttonText: string
}
