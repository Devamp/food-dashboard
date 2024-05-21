import React from "react";
import Article from "./components/Article";
import Video from "./components/Video";

const LearnMore = () => {
  const articles = [
    {
      title: "Understanding Macronutrients",
      content:
        "Macronutrients are the nutrients that our bodies need in large amounts. They include carbohydrates, proteins, and fats. Each plays a crucial role in maintaining our health and well-being. Carbohydrates are the body's main source of energy, proteins are essential for growth and repair, and fats provide energy and support cell function.",
    },
    {
      title: "Healthy Eating Habits",
      content:
        "Developing healthy eating habits involves more than just choosing nutritious foods. It’s about making balanced choices, practicing portion control, and eating mindfully. Start by incorporating more fruits, vegetables, whole grains, and lean proteins into your diet. Avoid processed foods and sugary drinks, and remember to stay hydrated.",
    },
    {
      title: "Basic Cooking Techniques",
      content:
        "Learning basic cooking techniques can make preparing healthy meals easier and more enjoyable. Some essential techniques include chopping vegetables, boiling, steaming, sautéing, and baking. Mastering these basics can help you create a variety of delicious and nutritious meals at home.",
    },
  ];

  const videos = [
    {
      title: "Healthy Eating for Beginners",
      url: "https://www.youtube.com/embed/BGwb8_hbzUM",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-green-600">
        Nutrition Education
      </h1>
      <div className="space-y-10">
        {articles.map((article, index) => (
          <Article
            key={index}
            title={article.title}
            content={article.content}
          />
        ))}
        {videos.map((video, index) => (
          <Video key={index} title={video.title} url={video.url} />
        ))}
      </div>
    </div>
  );
};

export default LearnMore;
