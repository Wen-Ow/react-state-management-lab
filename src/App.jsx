import { useState } from "react"; // Import React's useState Hook
import "./App.css"; // Import CSS styles for the application

// This is the main React component handling all the logic and UI
function App() {
  // Define state variables using useState Hook
  const [team, setTeam] = useState([]); // Stores the list of characters currently selected by the user.
  const [money, setMoney] = useState(100); // Stores the amount of money the user has. Starts at $100 and updates when adding/removing team members.
  const [noMoney, setNoMoney] = useState(false); // Stores a boolean value to check if the user has enough money to add a team member.
  const [zombieFighters, setZombieFighters] = useState([
    // Stores the list of available zombie fighters or characters with unique properties.
    {
      id: 1,
      name: "Survivor",
      price: 12,
      strength: 6,
      agility: 4,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png",
    },
    {
      id: 2,
      name: "Scavenger",
      price: 10,
      strength: 5,
      agility: 5,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png",
    },
    {
      id: 3,
      name: "Shadow",
      price: 18,
      strength: 7,
      agility: 8,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png",
    },
    {
      id: 4,
      name: "Tracker",
      price: 14,
      strength: 7,
      agility: 6,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png",
    },
    {
      id: 5,
      name: "Sharpshooter",
      price: 20,
      strength: 6,
      agility: 8,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png",
    },
    {
      id: 6,
      name: "Medic",
      price: 15,
      strength: 5,
      agility: 7,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png",
    },
    {
      id: 7,
      name: "Engineer",
      price: 16,
      strength: 6,
      agility: 5,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png",
    },
    {
      id: 8,
      name: "Brawler",
      price: 11,
      strength: 8,
      agility: 3,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png",
    },
    {
      id: 9,
      name: "Infiltrator",
      price: 17,
      strength: 5,
      agility: 9,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png",
    },
    {
      id: 10,
      name: "Leader",
      price: 22,
      strength: 7,
      agility: 6,
      img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png",
    },
  ]);

  // Calculate the total strength of the selected team
  const totalStrength = team.reduce((accumulator, fighter) => {
    return (accumulator += fighter.price);
  }, 0);

  // Calculate the total agility of the selected team
  const totalAgility = team.reduce((accumulator, fighter) => {
    return (accumulator += fighter.agility);
  }, 0);

  // Function to handle adding a fighter to the team
  const handleAddFighter = (fighter) => {
    if (fighter.price > money) {
      // Check if the user has enough money to add the fighter
      setNoMoney(true); // Display a message if the user doesn't have enough money
      return console.log("Not enough money");
    } else {
      setTeam([...team, fighter]); // Add the fighter to the team
      setMoney(money - fighter.price); // Deduct the fighter's cost from the user's budget
      removeFighter(fighter.id); // Remove the fighter from the available fighters list
      setNoMoney(false); // Reset money warning
    }
  };

  // Function to remove a fighter from the available options after selection
  const removeFighter = (fighterId) => {
    // Accepts the fighter ID as an argument
    const newFighters = zombieFighters.filter((fighter) => fighter.id !== fighterId); // Filter out the selected fighter from the available fighters list
    setZombieFighters(newFighters);
  };

  // Function to handle removing a fighter from the team
  const handleRemoveFighter = (removefighter) => {
    // Accepts the fighter to be removed as an argument
    const newTeam = team.filter((fighter) => fighter.id !== removefighter.id); // Filter out the selected fighter from the team
    setTeam(newTeam); // Update the team with the new list of fighters
    setZombieFighters([...zombieFighters, removefighter]); // Add the removed fighter back to the available fighters list
    setMoney(money + removefighter.price); // Refund the fighter's cost to the user's budget
    setNoMoney(false); // Reset money warning
  };

  return (
    <>
      <h1>Zombie Fighters</h1>
      <h3>
        Money: {money} <span>{noMoney ? "- Not Enough Money" : ""}</span>{" "}
      </h3>

      <h3>Team Strength: {totalStrength}</h3>

      <h3>Team Agility: {totalAgility}</h3>

      <h3>My Team</h3>
      <p>{team.length === 0 ? "Pick some team members." : ""} </p>

      <ul>
        {team.map(
          (
            fighter // Map through the team array to display each fighter
          ) => (
            <li className="onTeam">
              <img src={fighter.img} />
              <h3>{fighter.name}</h3>
              <p>
                <span>Price: </span>
                {fighter.price}
              </p>
              <p>
                <span>Strength: </span>
                {fighter.strength}{" "}
              </p>
              <p>
                <span>Agility: </span>
                {fighter.agility}{" "}
              </p>
              <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
            </li>
          )
        )}
      </ul>
      <h3>Fighters</h3>

      <ul>
        {zombieFighters.map(
          (
            zombie // Render the available fighters list
          ) => (
            <li>
              <img src={zombie.img} />
              <h3>{zombie.name}</h3>
              <p>
                <span>Price: </span>
                {zombie.price}
              </p>
              <p>
                <span>Strength: </span>
                {zombie.strength}{" "}
              </p>
              <p>
                <span>Agility: </span>
                {zombie.agility}{" "}
              </p>
              <button onClick={() => handleAddFighter(zombie)}>Add</button>
            </li>
          )
        )}
      </ul>
    </>
  );
}

export default App;
