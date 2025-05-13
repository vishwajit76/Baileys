"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTRATION_PUBLIC_KEY = exports.DEVICE_INFO = exports.MOBILE_USERAGENT = exports.FALLBACK_REGISTRATION_ENDPOINT = exports.MOBILE_REGISTRATION_ENDPOINT = exports.MOBILE_TOKEN = exports.MOBILE_PORT = exports.MOBILE_ENDPOINT = exports.PHONENUMBER_MCC = exports.DEFAULT_CACHE_TTLS = exports.INITIAL_PREKEY_COUNT = exports.MIN_PREKEY_COUNT = exports.MEDIA_KEYS = exports.MEDIA_HKDF_KEY_MAPPING = exports.MEDIA_PATH_MAP = exports.DEFAULT_CONNECTION_CONFIG = exports.PROCESSABLE_HISTORY_TYPES = exports.WA_CERT_DETAILS = exports.URL_REGEX = exports.MOBILE_NOISE_HEADER = exports.NOISE_WA_HEADER = exports.KEY_BUNDLE_TYPE = exports.DICT_VERSION = exports.NOISE_MODE = exports.WA_DEFAULT_EPHEMERAL = exports.PHONE_CONNECTION_CB = exports.DEF_TAG_PREFIX = exports.DEF_CALLBACK_PREFIX = exports.DEFAULT_ORIGIN = exports.UNAUTHORIZED_CODES = void 0;
const crypto_1 = require("crypto");
const WAProto_1 = require("../../WAProto");
const libsignal_1 = require("../Signal/libsignal");
const Utils_1 = require("../Utils");
const logger_1 = __importDefault(require("../Utils/logger"));
const baileys_version_json_1 = require("./baileys-version.json");
const phonenumber_mcc_json_1 = __importDefault(require("./phonenumber-mcc.json"));
exports.UNAUTHORIZED_CODES = [401, 403, 419];
exports.DEFAULT_ORIGIN = 'https://web.whatsapp.com';
exports.DEF_CALLBACK_PREFIX = 'CB:';
exports.DEF_TAG_PREFIX = 'TAG:';
exports.PHONE_CONNECTION_CB = 'CB:Pong';
exports.WA_DEFAULT_EPHEMERAL = 7 * 24 * 60 * 60;
exports.NOISE_MODE = 'Noise_XX_25519_AESGCM_SHA256\0\0\0\0';
exports.DICT_VERSION = 2;
exports.KEY_BUNDLE_TYPE = Buffer.from([5]);
exports.NOISE_WA_HEADER = Buffer.from([87, 65, 6, exports.DICT_VERSION]); // last is "DICT_VERSION"
exports.MOBILE_NOISE_HEADER = Buffer.from([87, 65, 2, exports.DICT_VERSION]);
/** from: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url */
exports.URL_REGEX = /https:\/\/(?![^:@\/\s]+:[^:@\/\s]+@)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?/g;
exports.WA_CERT_DETAILS = {
    SERIAL: 0,
};
exports.PROCESSABLE_HISTORY_TYPES = [
    WAProto_1.proto.Message.HistorySyncNotification.HistorySyncType.INITIAL_BOOTSTRAP,
    WAProto_1.proto.Message.HistorySyncNotification.HistorySyncType.PUSH_NAME,
    WAProto_1.proto.Message.HistorySyncNotification.HistorySyncType.RECENT,
    WAProto_1.proto.Message.HistorySyncNotification.HistorySyncType.FULL,
    WAProto_1.proto.Message.HistorySyncNotification.HistorySyncType.ON_DEMAND,
];
exports.DEFAULT_CONNECTION_CONFIG = {
    version: baileys_version_json_1.version,
    browser: Utils_1.Browsers.ubuntu('Chrome'),
    waWebSocketUrl: 'wss://web.whatsapp.com/ws/chat',
    connectTimeoutMs: 20000,
    keepAliveIntervalMs: 30000,
    logger: logger_1.default.child({ class: 'baileys' }),
    emitOwnEvents: true,
    defaultQueryTimeoutMs: 60000,
    customUploadHosts: [],
    retryRequestDelayMs: 250,
    maxMsgRetryCount: 5,
    fireInitQueries: true,
    auth: undefined,
    markOnlineOnConnect: true,
    syncFullHistory: false,
    patchMessageBeforeSending: msg => msg,
    shouldSyncHistoryMessage: () => true,
    shouldIgnoreJid: () => false,
    linkPreviewImageThumbnailWidth: 192,
    transactionOpts: { maxCommitRetries: 10, delayBetweenTriesMs: 3000 },
    generateHighQualityLinkPreview: false,
    options: {},
    appStateMacVerification: {
        patch: false,
        snapshot: false,
    },
    countryCode: 'US',
    getMessage: async () => undefined,
    cachedGroupMetadata: async () => undefined,
    makeSignalRepository: libsignal_1.makeLibSignalRepository
};
exports.MEDIA_PATH_MAP = {
    image: '/mms/image',
    video: '/mms/video',
    document: '/mms/document',
    audio: '/mms/audio',
    sticker: '/mms/image',
    'thumbnail-link': '/mms/image',
    'product-catalog-image': '/product/image',
    'md-app-state': '',
    'md-msg-hist': '/mms/md-app-state',
};
exports.MEDIA_HKDF_KEY_MAPPING = {
    'audio': 'Audio',
    'document': 'Document',
    'gif': 'Video',
    'image': 'Image',
    'ppic': '',
    'product': 'Image',
    'ptt': 'Audio',
    'sticker': 'Image',
    'video': 'Video',
    'thumbnail-document': 'Document Thumbnail',
    'thumbnail-image': 'Image Thumbnail',
    'thumbnail-video': 'Video Thumbnail',
    'thumbnail-link': 'Link Thumbnail',
    'md-msg-hist': 'History',
    'md-app-state': 'App State',
    'product-catalog-image': '',
    'payment-bg-image': 'Payment Background',
    'ptv': 'Video'
};
exports.MEDIA_KEYS = Object.keys(exports.MEDIA_PATH_MAP);
exports.MIN_PREKEY_COUNT = 5;
exports.INITIAL_PREKEY_COUNT = 30;
exports.DEFAULT_CACHE_TTLS = {
    SIGNAL_STORE: 5 * 60, // 5 minutes
    MSG_RETRY: 60 * 60, // 1 hour
    CALL_OFFER: 5 * 60, // 5 minutes
    USER_DEVICES: 5 * 60, // 5 minutes
};
exports.PHONENUMBER_MCC = phonenumber_mcc_json_1.default;
exports.MOBILE_ENDPOINT = 'g.whatsapp.net';
exports.MOBILE_PORT = 443;
const WA_VERSION = '2.25.10.72';
const WA_VERSION_HASH = (0, crypto_1.createHash)('sha256').update(WA_VERSION).digest('hex');
exports.MOBILE_TOKEN = Buffer.from('USUDuDYDeQhY4RF2fCSp5m3F6kJ1M2J8wS7bbNA2' + WA_VERSION_HASH);
exports.MOBILE_REGISTRATION_ENDPOINT = 'https://v.whatsapp.net/v2';
exports.FALLBACK_REGISTRATION_ENDPOINT = 'https://v-eu.whatsapp.net/v2';
exports.MOBILE_USERAGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1";
exports.DEVICE_INFO = {
    os: 'iOS',
    osVersion: '18.0',
    deviceModel: 'Apple-iPhone_14',
    appVersion: WA_VERSION,
    language: 'en-US',
    buildNumber: '12345',
};
exports.REGISTRATION_PUBLIC_KEY = Buffer.from('8e8c0f74c3ebc5d7a6865c6c3c843856b06121cce8ea774d22fb6f122512302d', 'hex');
