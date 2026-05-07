const express = require("express");
const AuthController = require("../controllers/crud.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

//protected
router.post(
  "/createNote",
  AuthMiddleware.authMiddlewareUser,
  AuthController.createNote,
);

router.get('/getAllNotes', AuthMiddleware.authMiddlewareUser, AuthController.getAllNotes);

router.delete('/deleteNote/:id', AuthMiddleware.authMiddlewareUser, AuthController.deleteNote);
router.patch('/updateNote/:id',AuthMiddleware.authMiddlewareUser, AuthController.updateNote)

module.exports = router;
