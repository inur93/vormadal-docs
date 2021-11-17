import { App } from "./app";
import { Setup } from "./setup";


(async () => {
  const app = new App();
  await app.connectDb();
  await new Setup().initializeApp();
  app.listen();
})()
