"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.getPostHandler = exports.updatePostHandler = exports.createPostHandler = void 0;
const lodash_1 = require("lodash");
const post_service_1 = require("../service/post.service");
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, "user._id");
        const body = req.body;
        const post = yield (0, post_service_1.createPost)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(post);
    });
}
exports.createPostHandler = createPostHandler;
function updatePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, "user._id");
        const postId = (0, lodash_1.get)(req, "params.postId");
        const update = req.body;
        const post = yield (0, post_service_1.findPost)({ postId });
        if (!post) {
            return res.sendStatus(404);
        }
        if (String(post.user) !== userId) {
            return res.sendStatus(401);
        }
        const updatedPost = yield (0, post_service_1.findAndUpdate)({ postId }, update, { new: true });
        return res.send(updatedPost);
    });
}
exports.updatePostHandler = updatePostHandler;
function getPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postId = (0, lodash_1.get)(req, "params.postId");
        const post = yield (0, post_service_1.findPost)({ postId });
        if (!post) {
            return res.sendStatus(404);
        }
        return res.send(post);
    });
}
exports.getPostHandler = getPostHandler;
function deletePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (0, lodash_1.get)(req, "user._id");
        const postId = (0, lodash_1.get)(req, "params.postId");
        const post = yield (0, post_service_1.findPost)({ postId });
        if (!post) {
            return res.sendStatus(404);
        }
        if (String(post.user) !== String(userId)) {
            return res.sendStatus(401);
        }
        yield (0, post_service_1.deletePost)({ postId });
        return res.sendStatus(200);
    });
}
exports.deletePostHandler = deletePostHandler;
//# sourceMappingURL=post.controller.js.map