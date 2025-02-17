import React from 'react';

const CustomerCard = ({
  name,
  username,
  originalPrice,
  finalPrice,
  sport,
  batchType,
  timeToExpire,
  message,
  status,
  statusDate,
  avatar,
  counterPrice
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-gray-600">@{username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 line-through">£{originalPrice}</span>
          <span className="text-xl font-semibold">£{finalPrice}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          {sport}
        </span>
        <span className="text-gray-600">{batchType}</span>
        <span className="text-gray-600">{timeToExpire} to expire</span>
      </div>

      <p className="mt-4 text-gray-700">{message}</p>

      {status && (
        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="font-medium">{status}</span>
            <span className="text-gray-500 text-sm">{statusDate}</span>
          </div>
        </div>
      )}

      {!status && (
        <div className="mt-4 flex gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Accept
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
            Counter
          </button>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <span className="sr-only">Dismiss</span>
            ⊘
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerCard;
