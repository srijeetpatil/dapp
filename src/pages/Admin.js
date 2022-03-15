export default function Admin(props) {
  const { requests, user } = props;

  return (
    <div className="container mx-auto mt-8">
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
        <label className="col-span-2">Action</label>
      </div>

      {requests?.map((req, i) => (
        <div className="grid grid-cols-12 mt-2 px-4 py-2 text-sm" key={i}>
          <label className="col-span-2 font-semibold flex items-center">
            <img
              src={
                req.created_by.picture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
              }
              className="w-8 h-8 rounded-full mr-2"
            ></img>
            {req.created_by.username}
          </label>
          <label className="col-span-2">{req.title.substring(0, 50)}...</label>
          {req.verified ? (
            <label className="col-span-2 px-2 py-1 bg-green-100 rounded-xl w-max self-start">
              Verified
            </label>
          ) : (
            <label className="col-span-2 px-2 py-1 bg-red-100 rounded-xl w-max self-start">
              Unverified
            </label>
          )}
          <label className="col-span-2 text-yellow-900">
            {parseInt(req.type) === 1
              ? "Donation"
              : parseInt(req.type) === 2
              ? "Fundraiser"
              : "Personal"}
          </label>
          <label className="col-span-2">{req.created_at}</label>
        </div>
      ))}
    </div>
  );
}
