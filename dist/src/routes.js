"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_controller_1 = require("./controller/post.controller");
const session_controller_1 = require("./controller/session.controller");
const user_controller_1 = require("./controller/user.controller");
const middleware_1 = require("./middleware");
const post_schema_1 = require("./schema/post.schema");
const user_schema_1 = require("./schema/user.schema");
function default_1(app) {
    //home
    // Get
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // Register user
    // Post /api/user
    app.post("/api/v1/users", (0, middleware_1.validateRequest)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // Login
    // Post /api/sessions
    app.post("/api/v1/sessions", (0, middleware_1.validateRequest)(user_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    // Get the user's sessons
    // Get /api/sessions
    app.get("/api/v1/sessions", middleware_1.requiresUser, session_controller_1.getUserSessionsHandler);
    // Logout
    // Delete /api/sessions
    app.delete("/api/v1/sessions", middleware_1.requiresUser, session_controller_1.invalidateUserSessionHandler);
    // Create a post
    // /api/v1/post
    app.post("/api/v1/posts", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.createPostSchema)], post_controller_1.createPostHandler);
    // Update a post
    // /api/v1/posts/:postId
    app.put("/api/v1/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.updatePostSchema)], post_controller_1.updatePostHandler);
    // Get a post
    // /api/v1/posts/:postId
    app.get("/api/v1/posts/:postId", post_controller_1.getPostHandler);
    // Get a post
    // /api/v1/posts/:postId
    app.delete("/api/v1/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.deletePostSchema)], post_controller_1.deletePostHandler);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map