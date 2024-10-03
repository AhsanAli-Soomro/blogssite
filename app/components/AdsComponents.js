import React from 'react'

const AdsSection = () => {
  return (
    <div className="lg:w-1/4 lg:pl-8 hidden lg:block">
      <div className="sticky top-36 p-2">
        <h1 className="font-bold mb-4">Sponsored Ads</h1>
        <div className=" border rounded-lg p-4 mb-6">
          <p>Ad Space 1</p>
        </div>
        <div className=" border rounded-lg p-4 mb-6">
          <p>Ad Space 2</p>
        </div>
        <div className=" border rounded-lg p-4 mb-6">
          <p>Ad Space 3</p>
        </div>
      </div>
    </div>
  );
};

export default AdsSection;

