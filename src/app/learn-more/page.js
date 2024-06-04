import React from "react";
import Article from "./components/Article";
import Video from "./components/Video";

const LearnMore = () => {
  //articles objects with title, content and a link to the article to read more
  const articles = [
    {
      title: "Understanding Macronutrients",
      content:
        "Macronutrients are the nutrients that our bodies need in large amounts. They include carbohydrates, proteins, and fats. Each plays a crucial role in maintaining our health and well-being.",
      link: "https://www.healthline.com/nutrition",
      image: "/macronutrient.jpeg",
    },
    {
      title: "Healthy Eating Habits",
      content:
        "Developing healthy eating habits involves more than just choosing nutritious foods. It’s about making balanced choices, practicing portion control, and eating mindfully.",
      link: "https://www.healthline.com/nutrition/joys-of-healthy-eating",
      image: "/healthy-eating.webp",
    },
    {
      title: "Basic Cooking Techniques",
      content:
        "Learning basic cooking techniques can make preparing healthy meals easier and more enjoyable. Some essential techniques include chopping vegetables, boiling, steaming, sautéing, and baking.",
      link: "https://www.eatingwell.com/category/4309/healthy-cooking-how-tos/",
      image: "/basic-cooking-techniques.webp",
    },
    {
      title: "Motivations to Eat Right",
      content:
        "Eating healthy boosts overall well-being. A balanced diet with fruits, vegetables, whole grains, and lean proteins increases energy, improves mental clarity, and prevents chronic diseases. Mindful food choices support long-term health and an active lifestyle.",
      link: "https://www.christushealth.org/connect/your-health/care-for-kids/motivation-to-eat-right#:~:text=Build%20a%20Healthy%20Eating%20Group&text=For%20example%2C%20swapping%20healthy%20recipes,friends%20to%20look%20forward%20to.",
      image: "/motivation-eat.webp",
    },
  ];

  //Video objects with tile, URL and introduction to the vidoe
  const videos = [
    {
      title:
        "Centers for Disease Control and Prevention(CDC) on Healthy Eating",
      url: "https://www.youtube.com/embed/3PZQSSpprfM",
      intro:
        "What is healthy eating anyway? It’s when you eat nutritious foods in amounts that lead to better health and wellness. And it has a big impact on managing your diabetes. With a meal plan, healthy eating doesn’t have to be a challenge. Your health care team can help you create a meal plan that fits your goals, tastes, lifestyle, and any medicines you’re taking. Watch the video below to learn more:",
    },
    {
      title: "Healthy Eating for Beginners",
      url: "https://www.youtube.com/embed/BGwb8_hbzUM",
      intro:
        "This video provides a great introduction to healthy eating for beginners, covering the basics of balanced diets and essential nutrients. Watch the video below to learn more:",
    },
  ];

  return (
    <div className="flex flex-col items-center w-screen h-fit m-5">
      <div className="container mx-auto py-10 px-10 ">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-center mb-1 text-green-600">
            Nutrition Education
          </h1>
        </div>
        <p className="block text-l font-semibold pl-20 pb-4 pt-1">
          Educate yourself with these free articles and videos on topics related
          to nutrition, healthy eating habits and cooking techniques
        </p>
        <div className="flex flex-wrap -mx-4">
          {[...articles, ...videos].map((item, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
              <div className="h-full flex flex-col justify-between bg-white p-4 rounded shadow">
                {item.url ? (
                  <Video title={item.title} url={item.url} intro={item.intro} />
                ) : (
                  <Article
                    title={item.title}
                    content={item.content}
                    link={item.link}
                    image={item.image}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
