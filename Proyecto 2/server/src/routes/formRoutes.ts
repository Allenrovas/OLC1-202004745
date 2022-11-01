import { Router } from "express";

class FormRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", (req, res) => res.send("Form"));
  }
}

const formRoutes = new FormRoutes();
export default formRoutes.router;