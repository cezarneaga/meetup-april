export const Sso = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-12 text-center">
      <div className="relative h-auto col-span-4 mt-24 text-center border-b-4 border-gray-300 border-dashed">
        <h1 className="gap-2 p-4 mx-auto mb-12 ">SSO (our flavour so far)</h1>
        <div className="gap-2 p-4 mx-auto mb-24 text-white w-86 bg-primary rounded-4xl">
          <div className="text-2xl font-bold">fusionauth api</div>
          <div className="text-xl font-bold"></div>
        </div>
      </div>
      <div className="col-span-4 text-2xl font-bold text-left">login to one app, enable access to all</div>
      <div className="relative col-span-1 py-24 bg-gray-100 rounded-4xl">
        app1
        <div className="absolute w-auto h-12 px-4 py-2 text-xl font-bold text-white bottom-4 right-4 bg-primary rounded-4xl">
          auth
        </div>
      </div>
      <div className="relative col-span-1 py-24 bg-gray-100 rounded-4xl">
        app2
        <div className="absolute w-auto h-12 px-4 py-2 text-xl font-bold text-white bottom-4 right-4 bg-primary rounded-4xl">
          auth
        </div>
      </div>
      <div className="relative col-span-1 py-24 bg-gray-100 rounded-4xl">
        app3
        <div className="absolute w-auto h-12 px-4 py-2 text-xl font-bold text-white bottom-4 right-4 bg-primary rounded-4xl">
          auth
        </div>
      </div>
      <div className="relative col-span-1 py-24 bg-gray-100 rounded-4xl">
        app4
        <div className="absolute w-auto h-12 px-4 py-2 text-xl font-bold text-white bottom-4 right-4 bg-primary rounded-4xl">
          auth
        </div>
      </div>
    </div>
  );
};
