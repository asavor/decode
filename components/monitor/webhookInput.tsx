import { Fragment, useRef, useState, useEffect } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import Script from 'next/script'
import { toast } from 'react-toastify'

import { errorResponse, link } from '../../interface/api/monitor'

const handleError = (error: errorResponse) => {
  return toast(error.message)
}

export default function DiscordWebHookInput(props: link) {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  const [discordWebhook, setDiscordWebhook] = useState('')
  const [captcha, SetCaptcha] = useState('')

  useEffect(() => {
    if (captcha == '') return
    const data = {
      webhook: discordWebhook,
      captcha: captcha,
    }

    fetch('/api/akamai/webhook', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(async (response) => {
      const responseFromserver = await response.json()
      await handleError(responseFromserver)
    })
  }, [captcha])

  function submitWebhook(props: any) {
    props.preventDefault()

    grecaptcha.enterprise.ready(async () => {
      const token = await grecaptcha.enterprise.execute(
        '6LcX1zAgAAAAAMQaC4uvchrwyWAO7CGSIS0JI0bE',
        {
          action: 'discord',
        }
      )
      SetCaptcha(() => token)
    })
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="text-xl text-white hover:text-slate-400"
      >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.buttonText}{' '}
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LcX1zAgAAAAAMQaC4uvchrwyWAO7CGSIS0JI0bE"></Script>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <form action="" onSubmit={submitWebhook}>
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <BellIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Discord Webhook
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          required
                          className="w-full border-gray-900"
                          type="text"
                          placeholder="https://discord.com/api/webhooks/975453781234567890/RojnYXCCqnuSJoW-i0b9YoU3v7skUequT212345678910O5B0dOSexAwO51234567890"
                          onChange={(event) =>
                            setDiscordWebhook(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
