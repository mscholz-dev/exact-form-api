import express, {
  Request,
  Response,
  NextFunction,
} from "express";
const router = express.Router();
import tryCatch from "../utils/tryCatch.js";
import FormControllerClass from "./form.controller.js";
import AuthMiddlewareClass from "../auth/auth.middleware.js";

// classes
const FormController = new FormControllerClass();
const AuthMiddleware = new AuthMiddlewareClass();

// route: create
router.route("/").post(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.create(req, res),
  ),
);

// route: get all form
router.route("/").get(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.getAll(req, res),
  ),
);

// route: get a specific form
router.route("/:key").get(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.getSpecificForm(req, res),
  ),
);

// route: create a form item
router
  .route("/:key")
  .post(
    tryCatch(
      async (req: Request, res: Response) =>
        FormController.createItem(req, res),
    ),
  );

// route: delete many form items
router.route("/:key/items").delete(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.deleteManyItem(req, res),
  ),
);

// route: delete a form item
router.route("/:key/:id").delete(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.deleteItem(req, res),
  ),
);

// route: recover many form items
router.route("/:key/recover").put(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.recoverManyItem(req, res),
  ),
);

// route: edit a form item
router.route("/:key/:id").put(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.editItem(req, res),
  ),
);

// route: delete a form
router.route("/:key").delete(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.deleteForm(req, res),
  ),
);

// route: recover a form
router.route("/recover").put(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.recoverForm(req, res),
  ),
);

// route: update a form
router.route("/:key").put(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.updateForm(req, res),
  ),
);

// route: recover a form item
router.route("/:key/recover/:id").put(
  tryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => AuthMiddleware.index(req, res, next),
  ),
  tryCatch(async (req: Request, res: Response) =>
    FormController.recoverItem(req, res),
  ),
);

export default router;
