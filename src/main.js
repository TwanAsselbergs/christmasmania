import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";

async function main() {
  const room1Data = await (await fetch("./maps/room1.json")).json();
  const room2Data = await (await fetch("./maps/room2.json")).json();

  k.scene("room1", (previousSceneData) => {
    room1(k, room1Data, previousSceneData);
  });
  k.scene("room2", (previousSceneData) => {
    room2(k, room2Data, previousSceneData);
  });

  k.scene("final-exit", () => {
    setBackgroundColor(k, "#20214a");
    k.add(
      makeNotificationBox(
        k,
        "Je ontsnapt uit de fabriek!\n\nBedankt voor het spelen!"
      )
    );
  });
}

k.scene("intro", () => {
  setBackgroundColor(k, "#20214a");
  k.add(
    makeNotificationBox(
      k,
      "Ontsnap uit de fabriek!\n\n\n\nGebruik WASD om te bewegen, Spacebar om te springen\n\nen Left Click om aan te vallen.\n\n\n\nDruk Enter om te starten!"
    )
  );
  k.onKeyPress("enter", () => {
    const context = new AudioContext();
    context.resume();
    k.go("room1", { exitName: null });
  });
});

k.go("intro");

main();
