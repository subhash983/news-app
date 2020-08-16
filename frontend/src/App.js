import React, { useEffect, useState } from "react";
import News from "./components/news";
import "./App.css";

function App() {
  return (
    <div className="App" data-testid={"App"}>
      <header>
        <div className={"header"}>
          <h1>{"UK News"}</h1>
        </div>
      </header>
      <News />
    </div>
  );
}

export default App;
