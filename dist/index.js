"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var planetscale_serverless_1 = require("drizzle-orm/planetscale-serverless");
var database_1 = require("@planetscale/database");
var schema = require("./schema");
var connection = (0, database_1.connect)({
    url: process.env.DATABASE_URL
});
var db = (0, planetscale_serverless_1.drizzle)(connection, { schema: schema });
exports.db = db;
