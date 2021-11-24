const express = require("express");

const {
    registerActor
} = require("../controllers/actor");

const router = express.Router();

/**
 * @swagger
 * /actors/:
 *   post:
 *     summary: Register a new actor
 *     tags:
 *       - actors
 *     description: Signup a new company in the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: api-key
 *         in: header
 *         description: API-Key
 *         schema:
 *           type: string
 *           format: uuid
 *           required: true
 *       - name: id
 *         in: body
 *         description: Actor's id
 *         schema:
 *           type: string
 *           required: true
 *       - name: name
 *         in: body
 *         description: Actor's name
 *         schema:
 *           type: string
 *           required: true
 *       - name: email
 *         in: body
 *         description: Actor's email
 *         schema:
 *           type: string
 *           format: email
 *           required: true
 *       - name: password
 *         in: body
 *         description: Actor's password
 *         schema:
 *           type: string
 *           format: password
 *           required: true
 *       - name: type
 *         in: body
 *         description: Actor's type
 *         schema:
 *           type: string
 *           required: true
 *       - name: latitude
 *         in: body
 *         description: Actor's latitude
 *         schema:
 *           type: number
 *           format: double
 *           required: true
 *       - name: longitude
 *         in: body
 *         description: Actor's longitudes
 *         schema:
 *           type: number
 *           format: double
 *           required: true
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: An actor with the specified email already exist
 */
router.route("/").post(registerActor);

module.exports = router;