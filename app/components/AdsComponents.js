import React from 'react'

const AdsSection = () => {
  return (
    <div className="lg:w-1/3 lg:pl-8 hidden lg:block">
      <div className="sticky top-20 p-4">
        <h3 className="text-xl font-bold mb-4">Sponsored Ads</h3>
        <div className="bg-gray-100 border rounded-lg p-4 mb-6">
          <p>Ad Space 1</p>
        </div>
        <div className="bg-gray-100 border rounded-lg p-4 mb-6">
          <p>Ad Space 2</p>
        </div>
        <div className="bg-gray-100 border rounded-lg p-4">
          <p>Ad Space 3</p>
        </div>
      </div>
    </div>
  );
};

export default AdsSection;

