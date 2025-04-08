export const Types = () => {
  return (
    <div className="flex flex-col justify-center h-full text-primary text-4xl font-bold">
      <h1>3 main types of applications</h1>
      <p className="mt-4">We build applications depending on the intended audience</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col bg-primary text-white p-4 rounded-lg">
          <div className="flex h-1/2">
            <img src="/marketing.png" alt="Marketing Sites" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl font-bold text-white mt-6">Marketing Sites</h2>
          <p className="mt-2 text-2xl font-normal">To attract and convert visitors into users of our services</p>
        </div>
        <div className="flex flex-col bg-primary text-white p-4 rounded-lg">
          <div className="flex h-1/2">
            <img src="/user-portal.png" alt="User Portals" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl font-bold text-white mt-6">User portals</h2>
          <p className="mt-2 text-2xl font-normal">To provide the user the best experience possible</p>
        </div>
        <div className="flex flex-col bg-primary text-white p-4 rounded-lg">
          <div className="flex h-1/2">
            <img src="/management-portal.png" alt="Management Portals" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl font-bold text-white mt-6">Management portals</h2>
          <p className="mt-2 text-2xl font-normal">
            To provide managers best experience possible to preform admin tasks in a secure environment
          </p>
        </div>
      </div>
    </div>
  );
};
