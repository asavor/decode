import React, { useEffect, useState, ChangeEvent } from 'react'
import { GlobalMode, Dropdown } from './dropdown'
import { json, tempPayload } from './data'
import obfuscatePayload from '../../module/px/encode'
import deobfuscate from '../../module/px/decode'

export interface propsTypes {
  trigger: number
}
function PayloadBox(prop: propsTypes) {
  var Decode = GlobalMode().mode

  const [Uuid, setUuid] = useState('')

  const [Sts, setSts] = useState('')
  const [FinalPayload, setFinalPayload] = useState('')
  const [Payload, setPayload] = useState('')

  const updateUuid = (props?: ChangeEvent<HTMLInputElement>, sent?: string) => {
    if (sent) {
      setUuid(() => sent)
    } else {
      setUuid(() => props!.target.value)
    }
  }

  const updateSts = (props?: ChangeEvent<HTMLInputElement>, sent?: string) => {
    if (sent) {
      setSts(() => sent)
    } else {
      setSts(() => props!.target.value)
    }
  }
  const updateFinalPayload = async (value: string) => {
    await setFinalPayload(() => value)
  }

  useEffect(() => {
    setPayload(() => '')
    setFinalPayload(() => '')
    setSts(() => '')
    setUuid(() => '')
  }, [prop.trigger])

  useEffect(() => {
    if (Decode) {
      try {
        console.log(Uuid)
        if (Payload == '') {
          updateFinalPayload('')
        }
        const value = JSON.parse(deobfuscate(Payload, Uuid, Sts))
        const parse = JSON.stringify(value, null, 4)
        updateFinalPayload(parse)
      } catch (error) {
        updateFinalPayload(deobfuscate(Payload, Uuid, Sts))
      }
    } else {
      try {
        updateFinalPayload(
          obfuscatePayload(JSON.stringify(JSON.parse(Payload)), Uuid, Sts)
        )
      } catch (error) {
        if (Payload == '') {
        } else {
          updateFinalPayload('Invalid Json')
        }
      }
    }
  }, [Payload, Uuid, Sts])

  const updatePayload = (props: any) => {
    const InputPayload = props.target.value
    if (Decode) {
      if (InputPayload.includes('payload')) {
        try {
          const ParsedUuid = InputPayload.match(`uuid=(.*)&ft`)
          updateUuid(undefined, ParsedUuid[1])
          const ParsedPayload = InputPayload.match(`payload=(.*)&appId`)
          setPayload(() => ParsedPayload[1])
        } catch (error) {}
      } else {
        console.log(InputPayload)
        setPayload(() => InputPayload)
      }
    } else {
      try {
        const payload = InputPayload

        setPayload(() => payload)
        const regex = /"PX10206":"(.*?)","/gm
        let m
        while (
          (m = regex.exec(JSON.stringify(JSON.parse(InputPayload)))) !== null
        ) {
          if (m.index === regex.lastIndex) {
            regex.lastIndex++
          }

          m.forEach((match) => {
            if (match.length === 36) {
              updateUuid(undefined, match)
              return
            }
          })
        }
      } catch (error) {
        updateFinalPayload('')
      }
    }
  }

  return (
    <div className="h-full">
      <div className="flex justify-center  ">
        <div>
          <Dropdown></Dropdown>
        </div>
        <div className="px-3">
          <div className="flex justify-start ">
            <label
              htmlFor={'uuid'}
              className="mr-3 block text-lg font-medium text-white "
            >
              {'uuid'}
            </label>
            <div className="relative  rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                type="text"
                name={'uuid'}
                id={'uuid'}
                className="block w-full rounded-md border-gray-300 bg-slate-900 py-1 px-1 text-white"
                placeholder={'dd810700-ca5e-11ec-a5f3-f133c8040726'}
                value={Uuid}
                onChange={updateUuid}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-start ">
          <label
            htmlFor={'sts'}
            className="mr-3 block text-lg font-medium text-white "
          >
            {'sts'}
          </label>
          <div className="relative  rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
            <input
              type="text"
              name={'sts'}
              id={'sts'}
              className="block w-full rounded-md border-gray-300 bg-slate-900 py-1 px-1 text-white"
              placeholder={'1651526936831'}
              value={Sts}
              onChange={updateSts}
            />
          </div>
        </div>
      </div>
      <div className="grid h-full grid-cols-2 gap-6 pb-9 pt-4">
        <textarea
          onChange={updatePayload}
          placeholder={Decode ? tempPayload : json}
          className={' resize-none  bg-slate-900 text-white focus:outline-none'}
          disabled={false}
          value={Payload}
        ></textarea>
        <textarea
          placeholder={Decode ? json : tempPayload}
          className={'resize-none bg-slate-900  text-white focus:outline-none'}
          disabled={true}
          value={FinalPayload}
        ></textarea>
      </div>
    </div>
  )
}

export { PayloadBox }
