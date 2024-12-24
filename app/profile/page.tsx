import { auth } from '@/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
export default async function ProfilePage() {
  const userInfor = await auth();
  if (!userInfor?.user) {
    redirect('/login');
  }

  return (
    <div className="flex items-start justify-center bg-gray-100 p-4 md:p-6 lg:p-2">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-md">
        <div className="p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">User</h1>
            <div className="relative h-12 w-12">
              <Image
                src={userInfor?.user?.image || '/avatar-default.jpg'}
                alt="Profile picture"
                className="rounded-full object-cover"
                fill
                priority
                sizes="(max-width: 48px) 100vw"
              />
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  readOnly
                  type="text"
                  id="firstName"
                  placeholder={userInfor?.user?.name || 'GemeniAI'}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  readOnly
                  type="text"
                  id="lastName"
                  placeholder={userInfor?.user?.name || 'GemeniAI'}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <input
                  readOnly
                  type="email"
                  id="email"
                  placeholder={userInfor?.user?.email || 'gemini@gmail.com'}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-green-500 accent-green-500 checked:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <button
                type="button"
                className="order-2 rounded-md border border-gray-300 bg-[#F7F2FA] px-8 py-2 text-[#C180E5] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="order-1 rounded-md bg-[#C180E5] px-8 py-2 text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 sm:order-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
