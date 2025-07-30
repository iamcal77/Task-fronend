const CooperativeDetail = ({ data }) => {
      const { data: cooperative } = data;

  const { members, orders, leader } = cooperative;

  return (
    <div className="max-h-80 overflow-y-auto bg-white p-4 rounded-lg border border-gray-200">
      {/* Leader */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800">Leader</h4>
        <p className="text-sm text-gray-600">{leader?.name || 'N/A'} - {leader?.email || 'N/A'}</p>
      </div>

      {/* Members */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800">Members</h4>
        {members?.length ? (
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {members.map((m, i) => (
              <li key={i}>{m.name} - {m.email}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic text-gray-400">No members</p>
        )}
      </div>

      {/* Orders */}
      <div>
        <h4 className="font-semibold text-gray-800">Orders</h4>
        {orders?.length ? (
          <table className="w-full text-sm border mt-2">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-2 py-1">Product</th>
                <th className="border px-2 py-1">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{order.productName}</td>
                  <td className="border px-2 py-1">{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm italic text-gray-400">No orders</p>
        )}
      </div>
    </div>
  );
};
export default CooperativeDetail;