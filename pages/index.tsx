import type { NextPage } from 'next'

const posts = [
  {
    title: 'Payload Decoder',
    link: [
      { name: 'Perimeter X', href: '/px' },
      { name: 'Akamai', href: '/akamai' },
    ],
    description: 'Encode/Decode bot protections payload.',
  },
  {
    title: 'Bot Protection Monitor',
    link: [{ name: 'Akamai', href: '/monitor/akamai' }],
    description: 'Monitors bot protection scripts versions.',
  },
  {
    title: 'Open Source Tools',
    link: [],
    description: 'Tool to help you deobfuscate bot protection scripts.',
  },
]
const Home: NextPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="relative flex-grow px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              decode.antibot.to
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Open source tools to help reversing
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.title}
                className="flex flex-col overflow-hidden rounded-lg shadow-lg"
              >
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <h1 className="text-xl font-semibold text-gray-900">
                      {post.title}
                    </h1>
                    <hr />
                    <p className="mt-3 text-base text-gray-500">
                      {post.description}
                    </p>
                    {post.link.map((bp) => {
                      return (
                        <div className="ml-3 mt-5 inline-flex rounded-md shadow">
                          <a
                            href={bp.href}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                          >
                            {bp.name}
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <a className="text-xl text-white" href="https://github.com/asavor">
          github.com/asavor
        </a>
      </div>
    </div>
  )
}

export default Home
