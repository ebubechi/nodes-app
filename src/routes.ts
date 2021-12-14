import { Express, Request, Response } from "express";
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from "./controller/post.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  invalidateUserSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { validateRequest, requiresUser, deserializeUser } from "./middleware";
import { createPostSchema, deletePostSchema, updatePostSchema } from "./schema/post.schema";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";

export default function (app: Express) {
  //home
  // Get
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  // Post /api/user
  app.post(
    "/api/v1/users",
    validateRequest(createUserSchema),
    createUserHandler
  );

  // Login
  // Post /api/sessions
  app.post(
    "/api/v1/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessons
  // Get /api/sessions
  app.get("/api/v1/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  // Delete /api/sessions
  app.delete("/api/v1/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a post
  // /api/v1/post
  app.post(
    "/api/v1/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // Update a post
  // /api/v1/posts/:postId
  app.put(
    "/api/v1/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // Get a post
  // /api/v1/posts/:postId
  app.get("/api/v1/posts/:postId", getPostHandler);

  // Get a post
  // /api/v1/posts/:postId
  app.delete(
    "/api/v1/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );
}
