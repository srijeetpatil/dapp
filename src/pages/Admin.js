export default function Admin() {
  return (
    <>
      <label className="text-3xl font-semibold">Admin</label>
      <div className="flex flex-row mt-8 text-sm">
        <div className="border border-gray-200 rounded px-4 py-2 w-1/6 mr-4">
          <label>Verified posts</label>
          <label className="ml-2">120</label>
        </div>
        <div className="border border-gray-200 rounded px-4 py-2 w-1/6 mr-4">
          <label>Unverified posts</label>
          <label className="ml-2">12</label>
        </div>
        <div className="border border-gray-200 rounded px-4 py-2 w-1/6 mr-4">
          <label>Top posts</label>
          <label className="ml-2">34</label>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-8 bg-gray-100 px-4 py-2">
        <label className="col-span-2">Created By</label>
        <label className="col-span-2">Title</label>
        <label className="col-span-2">Status</label>
        <label className="col-span-2">Type</label>
        <label className="col-span-2">Created At</label>
      </div>

      {Array.apply(0, Array(10)).map((e, i) => (
        <div className="grid grid-cols-12 mt-2 px-4 py-2 text-sm" key={i}>
          <label className="col-span-2 font-semibold">John Doe</label>
          <label className="col-span-2">Hello world</label>
          <label className="col-span-2">Unverified</label>
          <label className="col-span-2 text-yellow-900">Donation</label>
          <label className="col-span-2">Tue 26 Feb 2021</label>
        </div>
      ))}
    </>
  );
}
