"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Defaults_1 = require("../Defaults");
const business_1 = require("./business");
const registration_1 = require("./registration");
// export the last socket layer
const makeWASocket = (config) => ((config.mobile ? registration_1.makeRegistrationSocket : business_1.makeBusinessSocket)({
    ...Defaults_1.DEFAULT_CONNECTION_CONFIG,
    ...config
}));
exports.default = makeWASocket;
