import { ArrangeBox } from './arrangeBox/arrangeBox';
import { generateRandomPlayers } from './arrangeBox/generateRandomPlayers';

const addArrangeBox = () => {
  const parent = document.querySelector<HTMLDivElement>('#arrangeBoxesContainer');
  if (parent) {
    new ArrangeBox(parent, generateRandomPlayers());
  }
}


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="arrangeBoxesContainer">  
  </div>
  <button id="addBoxButton">Add Box</button>
`

const button = document.querySelector<HTMLDivElement>('#addBoxButton');
addArrangeBox();
button?.addEventListener("click", addArrangeBox);

