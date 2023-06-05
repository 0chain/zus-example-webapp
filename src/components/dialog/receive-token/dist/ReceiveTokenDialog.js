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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var dialog_1 = require("components/dialog");
var copy_svg_1 = require("../../../../public/copy.svg");
var wallet_1 = require("store/wallet");
var ReceiveTokenDialog_module_scss_1 = require("./ReceiveTokenDialog.module.scss");
var ReceiveTokenDialog = function (_a) {
    var close = _a.close;
    var wallet = react_redux_1.useSelector(wallet_1.selectActiveWallet);
    var walletAddress = wallet === null || wallet === void 0 ? void 0 : wallet.id;
    var onCopy = function () { return __awaiter(void 0, void 0, void 0, function () {
        var copyTextValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('lib/utils'); })];
                case 1:
                    copyTextValue = (_a.sent()).copyTextValue;
                    copyTextValue(walletAddress);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(dialog_1.Dialog, { theme: "bolt", close: close },
        react_1["default"].createElement(dialog_1.Dialog.Header, { title: "Receive ZCN" }),
        react_1["default"].createElement("div", { className: ReceiveTokenDialog_module_scss_1["default"].walletAddressContainer, "data-testid": "walletAddress" },
            react_1["default"].createElement("div", { className: ReceiveTokenDialog_module_scss_1["default"].addressDetailsContainer },
                react_1["default"].createElement("div", { className: ReceiveTokenDialog_module_scss_1["default"].addressLabel }, "Wallet Address"),
                react_1["default"].createElement("div", { className: ReceiveTokenDialog_module_scss_1["default"].addressContent }, walletAddress)),
            react_1["default"].createElement("div", { className: ReceiveTokenDialog_module_scss_1["default"].iconContainer },
                react_1["default"].createElement("button", { onClick: onCopy },
                    react_1["default"].createElement(copy_svg_1["default"], null))))));
};
exports["default"] = ReceiveTokenDialog;
