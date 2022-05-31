import { SiteListButton, version, website } from '../../interface/api/monitor'

import timeConverter from './formatTime'

export default function AkamaiVersion(props: SiteListButton) {
  return (
    <div className=" overflow-y-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className='"mb-4 mt-5  text-3xl text-white'>Version List</div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-min py-2 align-middle md:px-6 lg:px-8">
              <div className=" overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-min  divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Identifier
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Check Sum
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Detected at
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        download
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {props.list.map((site: version) => (
                      <tr
                        key={site.checkSum}

                        //   className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}
                      >
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {site.identifier}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {site.checkSum}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {timeConverter(site.time)}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <a href={site.downloadUrl}>{'download'}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
