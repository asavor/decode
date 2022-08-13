import {
  recaptchaPayload,
  ReCaptchaResponse,
} from '../../../../../interface/api/monitor'

/**
 * HTTP requests to google servers to validate the Recaptcha token.
 * @param {recaptchaPayload}  payload contains the Recaptcha token.
 * @returns {Promise<any>} The data on the Recaptcha token that was submitted.
 *
 */
const checkRecaptcha = async (
  payload: recaptchaPayload
): Promise<ReCaptchaResponse> => {
  return await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/${process.env.projectName}/assessments?key=${process.env.googleApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  )
    .then((response) => {
      return response.json()
    })
    .catch((Error) => {
      console.log(Error)
      return false
    })
}

export { checkRecaptcha }
