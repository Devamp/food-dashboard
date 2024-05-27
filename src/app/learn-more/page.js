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
    },
    {
      title: "Healthy Eating Habits",
      content:
        "Developing healthy eating habits involves more than just choosing nutritious foods. It’s about making balanced choices, practicing portion control, and eating mindfully.",
      link: "https://www.healthline.com/nutrition/joys-of-healthy-eating",
    },
    {
      title: "Basic Cooking Techniques",
      content:
        "Learning basic cooking techniques can make preparing healthy meals easier and more enjoyable. Some essential techniques include chopping vegetables, boiling, steaming, sautéing, and baking.",
      link: "https://www.eatingwell.com/category/4309/healthy-cooking-how-tos/",
    },
  ];

  //Video objects with tile, URL and introduction to the vidoe
  const videos = [
    {
      title: "Healthy Eating for Beginners",
      url: "https://www.youtube.com/embed/BGwb8_hbzUM",
      intro:
        "This video provides a great introduction to healthy eating for beginners, covering the basics of balanced diets and essential nutrients.",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-500">
        Nutrition Education
      </h1>
      <div className="flex flex-wrap -mx-4">
        {[...articles, ...videos].map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            {item.url ? (
              <Video title={item.title} url={item.url} intro={item.intro} />
            ) : (
              <Article
                title={item.title}
                content={item.content}
                link={item.link}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnMore;
