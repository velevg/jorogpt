import { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState(null); //value = input
  const [message, setMessage] = useState(null); //message = JoroGPT
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [startX, setStartX] = useState(null); //touch start
  const [isLoading, setIsLoading] = useState(false); //loading animation

  // Define a function that resets the state variables to their initial values.
  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };

  // Define a function that sets the current chat title and resets the input and message state variables.
  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  // Define an asynchronous function that sends a POST request to the server to get a response from JoroGPT.
  const getMessages = async () => {
    setIsLoading(true);
    // Make your API call or perform the action that triggers the loading animation here
    setTimeout(() => {
      setIsLoading(false);
    }, 2250); // Set a timeout to simulate a delay in the API call

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      //console.log(data)
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  // Define an effect hook that updates the previousChats state variable when the message or currentTitle state variables change.
  useEffect(() => {
    console.log(currentTitle, value, message);
    if (!currentTitle && value && message) {
      //if no title but value and message
      setCurrentTitle(value);
    }
    if (currentTitle && value && message) {
      setPreviousChats(
        (
          prevChats //this is how to update an array using new state
        ) => [
          ...prevChats,
          {
            title: currentTitle,
            role: "user",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content,
          },
        ]
      );
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  // Filter the previousChats array to get the current chat messages.
  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  // Get an array of unique chat titles.
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );
  console.log(uniqueTitles);

  // Define event handlers for touch events.
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const sidebar = document.querySelector(".side-bar");
    if (startX - endX > 50) {
      sidebar.style.display = "none";
    } else if (endX - startX > 50) {
      sidebar.style.display = "block";
    }
  };

  // Render the app.
  return (
    <div
      className="app"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <section className="side-bar">
        <button onClick={createNewChat}>➕ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <p>Made by Joro</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>JoroGPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        {isLoading && <div className="loading"></div>}
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              ➤
            </div>
          </div>
          <p className="info">16 March Version</p>
        </div>
      </section>
    </div>
  );
};

export default App;
