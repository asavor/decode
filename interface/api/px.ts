export interface NextRequest {
  method: string
  body: { payload: string; uuid: string; sts: string }
}
export interface NextResponse {
  status: (arg0: number) => {
    (): any
    new (): any
    json: {
      (arg0: {
        decodedPayload?: string
        encodedPayload?: string
        uuid?: string
        error?: string
      }): void
      new (): any
    }
  }
}
