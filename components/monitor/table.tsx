import { SiteListButton, website } from '../../interface/api/monitor'
import timeConverter from './formatTime'

export default function SiteList(props: SiteListButton) {
  return (
    <div className=" overflow-y-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block  min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className=" overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full table-auto divide-y divide-gray-300 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Website
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Akamai Version Identifier
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Akamai Version Checksum
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last Checked
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {props.list.map((site: website) => (
                      <tr
                        key={site.website}
                        //   className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <a href={site.website} target="_blank">
                            {site.website}
                          </a>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {
                            site.akamaiSiteVersion[
                              site.akamaiSiteVersion.length - 1
                            ].identifier
                          }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {
                            site.akamaiSiteVersion[
                              site.akamaiSiteVersion.length - 1
                            ].checkSum
                          }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {timeConverter(
                            site.akamaiSiteVersion[
                              site.akamaiSiteVersion.length - 1
                            ].time
                          )}
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
