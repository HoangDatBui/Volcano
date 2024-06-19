import "../styling/Home.css";
import React from "react";

export default function Home() {
  return (
    <main>
      <Main />
    </main>
  );
}

// hero content
const Main = () => (
  <section
    className="hero"
    title="Sharks living in volcano is real!!"
  >
    <div>
      <h1 className="hero_title">Volcanoes Website</h1>
      <p className="hero_subtitle">
        Discover Nature's Fury: Explore Volcanoes Around The World!
      </p>
    </div>
  </section>
);
