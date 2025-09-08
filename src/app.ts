import express from 'express';
import dotenv from "dotenv";

class App {

  public app: express.Application;
  public port: number;

  constructor(controllers: any[], port: any) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  // Initialize middlewares
  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  // Initialize controllers
  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  // Start the server
  public listen() {
    this.app.listen(this.port, () => {
      // Log a message when the server is successfully running
      console.log(`Server is running on http://localhost:${this.port}`);
    })
  }
}

export default App;