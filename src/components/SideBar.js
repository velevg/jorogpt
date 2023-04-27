const SideBar = () => {
  return (
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
  );
};
export default SideBar;
