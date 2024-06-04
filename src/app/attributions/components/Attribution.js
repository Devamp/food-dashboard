import React from "react";
import Image from "next/image";

//  Attribution component to credit tech stack used to build our website.
const Attribution = () => {
  const techStack = [
    {
      name: "Edamam",
      logo: "/edamam-logo.svg",
      description:
        "In this web application, we have integrated the Edamam's API to provide comprehensive data on recipes, nutritional information, and food photos. As per Edamam's Terms and Conditions, we acknowledge and give due attribution for the use of their API services in our application.",
      link: "https://www.edamam.com/",
    },
    {
      name: "React.js",
      logo: "/react.jpg",
      description:
        "React.js was the core library used for building the user interface of the application.",
      link: "https://reactjs.org/",
    },
    {
      name: "Tailwind CSS",
      logo: "/tailwind.png",
      description:
        "Tailwind CSS was used for styling the application with utility-first CSS framework.",
      link: "https://tailwindcss.com/",
    },
    {
      name: "Next.js",
      logo: "/next.svg",
      description:
        "Next.js was used for page routing and as the React framework for building the web application.",
      link: "https://nextjs.org/",
    },
    {
      name: "Chart.js",
      logo: "/chart.svg",
      description:
        "Chart.js was used to create interactive charts and graphs within the application.",
      link: "https://www.chartjs.org/",
    },
  ];

  return (
    <div className="container mx-auto px-40 py-8 min-h-screen">
      <h1 className="text-3xl text-center font-bold mb-10 text-green-600">
        Attributions
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="shadow-lg rounded-xl max-w-3xl w-full flex flex-col items-center p-6"
          >
            <div className="mb-6">
              <Image
                src={tech.logo}
                alt={`${tech.name} Logo`}
                width={200}
                height={50}
              />
            </div>
            <p className="text-lg mb-4 text-gray-700 text-center">
              {tech.description}
            </p>
            <div className="flex justify-center w-full">
              <a
                href={tech.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
              >
                Learn More About {tech.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attribution;
