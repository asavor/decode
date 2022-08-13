interface recaptchaPayloadEvent {
  token: string
  siteKey: string
  expectedAction: string
}

export interface recaptchaPayload {
  event: recaptchaPayloadEvent
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

export interface Event {
  token: string
  siteKey: string
  userAgent: string
  userIpAddress: string
  expectedAction: string
  hashedAccountId: string
}

export interface TokenProperties {
  valid: boolean
  invalidReason: string
  hostname: string
  action: string
  createTime: Date
}

export interface RiskAnalysis {
  score: number
  reasons: any[]
}

export interface ReCaptchaResponse {
  riskAnalysis: RiskAnalysis
  name: string
  event: Event
  tokenProperties: TokenProperties
}
