import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function ProfilePage ()  {
    const userInfor= await auth();
    if(!userInfor?.user){
        redirect("/login");
    }

  return (
    <div className="p-4 md:p-6 lg:p-2 flex items-start justify-center bg-gray-100 ">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md ">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">User</h1>
            <div className="relative h-12 w-12">
              <Image
                src={userInfor?.user?.image || "/avatar-default.jpg"}
                alt="Profile picture"
                className="rounded-full object-cover"
                fill
                priority
                sizes="(max-width: 48px) 100vw"
              />
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  readOnly
                  type="text"
                  id="firstName"
                  placeholder={userInfor?.user?.name || "GemeniAI"}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  readOnly
                  type="text"
                  id="lastName"
                  placeholder={userInfor?.user?.name || "GemeniAI"}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <input
                  readOnly
                  type="email"
                  id="email"
                  placeholder={userInfor?.user?.email || "gemini@gmail.com"}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 bg-green-500 checked:bg-white rounded border-gray-300 accent-green-500"
                  />
                </div>
              </div>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                className="px-8 py-2 bg-[#F7F2FA] text-[#C180E5] border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 sm:order-1 order-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2 bg-[#C180E5] text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 sm:order-2 order-1"
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

