import React from "react";
import Image from "next/image";

const Attribution = () => {
  return (
    <div className="container mx-auto px-40 py-8 min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-3xl text-center font-bold mb-6 text-green-600">
          Attribution
        </h1>
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <Image
              src="/edamam-logo.svg"
              alt="Edamam Logo"
              width={200}
              height={50}
            />
          </div>
          <p className="text-lg mb-4 text-gray-700 text-center">
            In this web application, we have integrated the Edamam's API to
            provide comprehensive data on recipes, nutritional information, and
            food photos. As per Edamam's Terms and Conditions, we acknowledge
            and give due attribution for the use of their API services in our
            application.
          </p>
          <a
            href="https://www.edamam.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Learn More About Edamam
          </a>
        </div>
      </div>
    </div>
  );
};

export default Attribution;
