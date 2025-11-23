import { jsx, jsxs } from "react/jsx-runtime";
import { RemixServer, useLoaderData, Meta, Links, Outlet, ScrollRestoration, Scripts, useOutletContext, Form } from "@remix-run/react";
import * as isbotModule from "isbot";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { Page, Layout, Card, Text, DataTable, BlockStack, FormLayout, TextField, Button, InlineStack } from "@shopify/polaris";
import require$$0, { useState } from "react";
import require$$1 from "@shopify/app-bridge/utilities/index.js";
import require$$1$1 from "@shopify/app-bridge/actions/ContextualSaveBar/index.js";
import require$$1$2 from "@shopify/app-bridge/actions/Features/types.js";
import require$$1$3 from "@shopify/app-bridge/actions/Features/index.js";
import require$$1$5 from "@shopify/app-bridge/actions/Navigation/Redirect/index.js";
import require$$1$4 from "@shopify/app-bridge/actions/index.js";
import require$$1$6 from "@shopify/app-bridge/actions/Toast/index.js";
import require$$1$8 from "@shopify/app-bridge/actions/Modal/index.js";
import require$$0$1 from "@shopify/app-bridge/actions/Button/index.js";
import require$$1$7 from "@shopify/app-bridge/actions/ButtonGroup/index.js";
import require$$1$a from "@shopify/app-bridge/actions/Link/AppLink/index.js";
import require$$2 from "@shopify/app-bridge/actions/Menu/NavigationMenu/index.js";
import require$$1$9 from "@shopify/app-bridge";
import require$$0$2 from "@shopify/app-bridge/MessageTransport.js";
import require$$1$b from "@shopify/app-bridge/actions/ResourcePicker/index.js";
import require$$2$1 from "@shopify/app-bridge/actions/TitleBar/index.js";
import require$$1$c from "@shopify/app-bridge/actions/Picker/index.js";
async function handleRequest(request2, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request2.url }),
    {
      // If you wish to abort the rendering process, you can pass a signal here.
      // Please refer to the templates for example son how to configure this.
      // signal: controller.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  if (isBotRequest(request2.headers.get("user-agent"))) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5({ request: request2 }) {
  const url = new URL(request2.url);
  const host = url.searchParams.get("host");
  const apiKey = process.env.SHOPIFY_API_KEY || "";
  return { host, apiKey };
}
function App() {
  const { host, apiKey } = useLoaderData();
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, { context: { host, apiKey } }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var appBridgeReact = {};
var context = {};
var hasRequiredContext;
function requireContext() {
  if (hasRequiredContext) return context;
  hasRequiredContext = 1;
  Object.defineProperty(context, "__esModule", { value: true });
  context.AppBridgeContext = void 0;
  var react_1 = require$$0;
  context.AppBridgeContext = (0, react_1.createContext)(null);
  return context;
}
var useAppBridge = {};
var hasRequiredUseAppBridge;
function requireUseAppBridge() {
  if (hasRequiredUseAppBridge) return useAppBridge;
  hasRequiredUseAppBridge = 1;
  Object.defineProperty(useAppBridge, "__esModule", { value: true });
  useAppBridge.useAppBridge = void 0;
  var react_1 = require$$0;
  var context_1 = /* @__PURE__ */ requireContext();
  function useAppBridge$1() {
    var appBridge = (0, react_1.useContext)(context_1.AppBridgeContext);
    if (!appBridge) {
      throw new Error("No AppBridge context provided. Your component must be wrapped in the <Provider> component from App Bridge React.");
    }
    return appBridge;
  }
  useAppBridge.useAppBridge = useAppBridge$1;
  return useAppBridge;
}
var components = {};
var ContextualSaveBar$1 = {};
var ContextualSaveBar = {};
var hooks = {};
var useAppBridgeState$1 = {};
var useAppBridgeState = {};
var hasRequiredUseAppBridgeState$1;
function requireUseAppBridgeState$1() {
  if (hasRequiredUseAppBridgeState$1) return useAppBridgeState;
  hasRequiredUseAppBridgeState$1 = 1;
  var __awaiter = useAppBridgeState && useAppBridgeState.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = useAppBridgeState && useAppBridgeState.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(useAppBridgeState, "__esModule", { value: true });
  useAppBridgeState.useAppBridgeState = void 0;
  var react_1 = require$$0;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  var useAppBridgeState$12 = function(query) {
    var app = (0, useAppBridge_1.useAppBridge)();
    var _a = (0, react_1.useState)(), state = _a[0], setState = _a[1];
    var isUnmounted = (0, react_1.useRef)(false);
    var refresh = (0, react_1.useCallback)(function() {
      return __awaiter(void 0, void 0, void 0, function() {
        var newState, _a2;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (!query) return [3, 2];
              return [4, app.getState(query)];
            case 1:
              _a2 = _b.sent();
              return [3, 4];
            case 2:
              return [4, app.getState()];
            case 3:
              _a2 = _b.sent();
              _b.label = 4;
            case 4:
              newState = _a2;
              if (isUnmounted.current) {
                return [
                  2
                  /*return*/
                ];
              }
              setState(function(currentState) {
                if (JSON.stringify(newState) === JSON.stringify(currentState)) {
                  return currentState;
                }
                return newState;
              });
              return [
                2
                /*return*/
              ];
          }
        });
      });
    }, [app, query]);
    (0, react_1.useEffect)(function() {
      refresh();
      return app.subscribe(function() {
        refresh();
      });
    }, [app, refresh]);
    (0, react_1.useEffect)(function() {
      return function() {
        isUnmounted.current = true;
      };
    }, [app]);
    return state;
  };
  useAppBridgeState.useAppBridgeState = useAppBridgeState$12;
  return useAppBridgeState;
}
var hasRequiredUseAppBridgeState;
function requireUseAppBridgeState() {
  if (hasRequiredUseAppBridgeState) return useAppBridgeState$1;
  hasRequiredUseAppBridgeState = 1;
  (function(exports$1) {
    var __createBinding = useAppBridgeState$1 && useAppBridgeState$1.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = useAppBridgeState$1 && useAppBridgeState$1.__exportStar || function(m, exports$12) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    __exportStar(/* @__PURE__ */ requireUseAppBridgeState$1(), exports$1);
  })(useAppBridgeState$1);
  return useAppBridgeState$1;
}
var useAuthenticatedFetch$1 = {};
var useAuthenticatedFetch = {};
var hasRequiredUseAuthenticatedFetch$1;
function requireUseAuthenticatedFetch$1() {
  if (hasRequiredUseAuthenticatedFetch$1) return useAuthenticatedFetch;
  hasRequiredUseAuthenticatedFetch$1 = 1;
  Object.defineProperty(useAuthenticatedFetch, "__esModule", { value: true });
  useAuthenticatedFetch.useAuthenticatedFetch = void 0;
  var react_1 = require$$0;
  var utilities_1 = require$$1;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  function useAuthenticatedFetch$12(options) {
    if (options === void 0) {
      options = void 0;
    }
    var app = (0, useAppBridge_1.useAppBridge)();
    var fetchFunction = (0, react_1.useMemo)(function() {
      return (0, utilities_1.authenticatedFetch)(app, options);
    }, [app, options]);
    return fetchFunction;
  }
  useAuthenticatedFetch.useAuthenticatedFetch = useAuthenticatedFetch$12;
  return useAuthenticatedFetch;
}
var hasRequiredUseAuthenticatedFetch;
function requireUseAuthenticatedFetch() {
  if (hasRequiredUseAuthenticatedFetch) return useAuthenticatedFetch$1;
  hasRequiredUseAuthenticatedFetch = 1;
  (function(exports$1) {
    var __createBinding = useAuthenticatedFetch$1 && useAuthenticatedFetch$1.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = useAuthenticatedFetch$1 && useAuthenticatedFetch$1.__exportStar || function(m, exports$12) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    __exportStar(/* @__PURE__ */ requireUseAuthenticatedFetch$1(), exports$1);
  })(useAuthenticatedFetch$1);
  return useAuthenticatedFetch$1;
}
var useContextualSaveBar$1 = {};
var useContextualSaveBar = {};
var hasRequiredUseContextualSaveBar$1;
function requireUseContextualSaveBar$1() {
  if (hasRequiredUseContextualSaveBar$1) return useContextualSaveBar;
  hasRequiredUseContextualSaveBar$1 = 1;
  var __rest = useContextualSaveBar && useContextualSaveBar.__rest || function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  Object.defineProperty(useContextualSaveBar, "__esModule", { value: true });
  useContextualSaveBar.useContextualSaveBar = void 0;
  var react_1 = require$$0;
  var ContextualSaveBar_1 = require$$1$1;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  function useContextualSaveBar$12() {
    var app = (0, useAppBridge_1.useAppBridge)();
    var visibleRef = (0, react_1.useRef)(false);
    var _a = (0, react_1.useState)(), onSaveAction = _a[0], setOnSaveAction = _a[1];
    var _b = (0, react_1.useState)(), onDiscardAction = _b[0], setOnDiscardAction = _b[1];
    var contextualSaveBar = (0, react_1.useMemo)(function() {
      return (0, ContextualSaveBar_1.create)(app);
    }, [app]);
    var show = (0, react_1.useCallback)(function(options) {
      if (options) {
        contextualSaveBar.set(options, false);
      }
      contextualSaveBar.dispatch(ContextualSaveBar_1.Action.SHOW);
      visibleRef.current = true;
    }, [contextualSaveBar]);
    var hide = (0, react_1.useCallback)(function() {
      contextualSaveBar.dispatch(ContextualSaveBar_1.Action.HIDE);
      visibleRef.current = false;
    }, [contextualSaveBar]);
    var saveAction = (0, react_1.useMemo)(function() {
      return {
        setOptions: function(_a2) {
          var onAction = _a2.onAction, saveAction2 = __rest(_a2, ["onAction"]);
          var shouldUpdate = JSON.stringify(contextualSaveBar.options.saveAction) !== JSON.stringify(saveAction2) && visibleRef.current;
          setOnSaveAction(function() {
            return onAction;
          });
          contextualSaveBar.set({ saveAction: saveAction2 }, shouldUpdate);
        }
      };
    }, [contextualSaveBar]);
    var discardAction = (0, react_1.useMemo)(function() {
      return {
        setOptions: function(_a2) {
          var onAction = _a2.onAction, discardAction2 = __rest(_a2, ["onAction"]);
          var shouldUpdate = JSON.stringify(contextualSaveBar.options.discardAction) !== JSON.stringify(discardAction2) && visibleRef.current;
          setOnDiscardAction(function() {
            return onAction;
          });
          contextualSaveBar.set({ discardAction: discardAction2 }, shouldUpdate);
        }
      };
    }, [contextualSaveBar]);
    (0, react_1.useEffect)(function() {
      return function() {
        if (visibleRef.current) {
          hide();
        }
      };
    }, []);
    (0, react_1.useEffect)(function() {
      return contextualSaveBar.subscribe(ContextualSaveBar_1.Action.DISCARD, function() {
        onDiscardAction === null || onDiscardAction === void 0 ? void 0 : onDiscardAction();
      });
    }, [contextualSaveBar, onDiscardAction]);
    (0, react_1.useEffect)(function() {
      return contextualSaveBar.subscribe(ContextualSaveBar_1.Action.SAVE, function() {
        onSaveAction === null || onSaveAction === void 0 ? void 0 : onSaveAction();
      });
    }, [contextualSaveBar, onSaveAction]);
    return { show, hide, saveAction, discardAction };
  }
  useContextualSaveBar.useContextualSaveBar = useContextualSaveBar$12;
  return useContextualSaveBar;
}
var hasRequiredUseContextualSaveBar;
function requireUseContextualSaveBar() {
  if (hasRequiredUseContextualSaveBar) return useContextualSaveBar$1;
  hasRequiredUseContextualSaveBar = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useContextualSaveBar = void 0;
    var useContextualSaveBar_1 = /* @__PURE__ */ requireUseContextualSaveBar$1();
    Object.defineProperty(exports$1, "useContextualSaveBar", { enumerable: true, get: function() {
      return useContextualSaveBar_1.useContextualSaveBar;
    } });
  })(useContextualSaveBar$1);
  return useContextualSaveBar$1;
}
var useFeaturesAvailable$1 = {};
var useFeaturesAvailable = {};
var hasRequiredUseFeaturesAvailable$1;
function requireUseFeaturesAvailable$1() {
  if (hasRequiredUseFeaturesAvailable$1) return useFeaturesAvailable;
  hasRequiredUseFeaturesAvailable$1 = 1;
  var __awaiter = useFeaturesAvailable && useFeaturesAvailable.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = useFeaturesAvailable && useFeaturesAvailable.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(useFeaturesAvailable, "__esModule", { value: true });
  useFeaturesAvailable.useFeaturesAvailable = void 0;
  var react_1 = require$$0;
  var types_1 = require$$1$2;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  function useFeaturesAvailable$12() {
    var _this = this;
    var query = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      query[_i] = arguments[_i];
    }
    var app = (0, useAppBridge_1.useAppBridge)();
    var _a = (0, react_1.useState)(), state = _a[0], setState = _a[1];
    var queryRef = (0, react_1.useRef)([]);
    var refresh = (0, react_1.useCallback)(function() {
      var isUnmounted = false;
      (function() {
        return __awaiter(_this, void 0, void 0, function() {
          var features;
          return __generator(this, function(_a2) {
            switch (_a2.label) {
              case 0:
                return [4, app.featuresAvailable.apply(app, queryRef.current)];
              case 1:
                features = _a2.sent();
                if (!isUnmounted) {
                  setState(function(currentFeatures) {
                    if (JSON.stringify(currentFeatures) === JSON.stringify(features)) {
                      return currentFeatures;
                    }
                    return features;
                  });
                }
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      })();
      return function() {
        isUnmounted = true;
      };
    }, [app]);
    (0, react_1.useEffect)(function() {
      queryRef.current = query;
      return refresh();
    }, [JSON.stringify(query)]);
    (0, react_1.useEffect)(function() {
      var onRefreshCleanup;
      var unsubscribe = app.subscribe(types_1.Action.UPDATE, function() {
        onRefreshCleanup = refresh();
      });
      return function() {
        unsubscribe();
        onRefreshCleanup === null || onRefreshCleanup === void 0 ? void 0 : onRefreshCleanup();
      };
    }, [app, refresh]);
    return state;
  }
  useFeaturesAvailable.useFeaturesAvailable = useFeaturesAvailable$12;
  return useFeaturesAvailable;
}
var hasRequiredUseFeaturesAvailable;
function requireUseFeaturesAvailable() {
  if (hasRequiredUseFeaturesAvailable) return useFeaturesAvailable$1;
  hasRequiredUseFeaturesAvailable = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useFeaturesAvailable = void 0;
    var useFeaturesAvailable_1 = /* @__PURE__ */ requireUseFeaturesAvailable$1();
    Object.defineProperty(exports$1, "useFeaturesAvailable", { enumerable: true, get: function() {
      return useFeaturesAvailable_1.useFeaturesAvailable;
    } });
  })(useFeaturesAvailable$1);
  return useFeaturesAvailable$1;
}
var useFeatureRequest$1 = {};
var useFeatureRequest = {};
var hasRequiredUseFeatureRequest$1;
function requireUseFeatureRequest$1() {
  if (hasRequiredUseFeatureRequest$1) return useFeatureRequest;
  hasRequiredUseFeatureRequest$1 = 1;
  Object.defineProperty(useFeatureRequest, "__esModule", { value: true });
  useFeatureRequest.useFeatureRequest = void 0;
  var react_1 = require$$0;
  var Features_1 = require$$1$3;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  var useFeaturesAvailable_1 = /* @__PURE__ */ requireUseFeaturesAvailable();
  function useFeatureRequest$12(group, action2) {
    var app = (0, useAppBridge_1.useAppBridge)();
    var featuresAvailable = (0, useFeaturesAvailable_1.useFeaturesAvailable)();
    var _a = (0, react_1.useState)(), feature = _a[0], setFeature = _a[1];
    var handleFeatureUpdate = (0, react_1.useCallback)(function(featuresAvailable2) {
      var updatedFeatures = featuresAvailable2 === null || featuresAvailable2 === void 0 ? void 0 : featuresAvailable2[group];
      if (action2 && (updatedFeatures === null || updatedFeatures === void 0 ? void 0 : updatedFeatures[action2])) {
        var actionPermission_1 = updatedFeatures === null || updatedFeatures === void 0 ? void 0 : updatedFeatures[action2];
        setFeature(function(currentState) {
          if (JSON.stringify(actionPermission_1) !== JSON.stringify(currentState)) {
            return actionPermission_1;
          }
          return currentState;
        });
        return;
      }
      setFeature(function(currentState) {
        if (JSON.stringify(updatedFeatures) !== JSON.stringify(currentState)) {
          return updatedFeatures;
        }
        return currentState;
      });
    }, [group, action2]);
    (0, react_1.useEffect)(function() {
      (0, Features_1.create)(app).dispatch(Features_1.Action.REQUEST, { feature: group, action: action2 });
    }, [app, group, action2]);
    (0, react_1.useEffect)(function() {
      handleFeatureUpdate(featuresAvailable);
    }, [featuresAvailable, handleFeatureUpdate]);
    return feature;
  }
  useFeatureRequest.useFeatureRequest = useFeatureRequest$12;
  return useFeatureRequest;
}
var hasRequiredUseFeatureRequest;
function requireUseFeatureRequest() {
  if (hasRequiredUseFeatureRequest) return useFeatureRequest$1;
  hasRequiredUseFeatureRequest = 1;
  (function(exports$1) {
    var __createBinding = useFeatureRequest$1 && useFeatureRequest$1.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = useFeatureRequest$1 && useFeatureRequest$1.__exportStar || function(m, exports$12) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    __exportStar(/* @__PURE__ */ requireUseFeatureRequest$1(), exports$1);
  })(useFeatureRequest$1);
  return useFeatureRequest$1;
}
var useLocale$1 = {};
var useLocale = {};
var hasRequiredUseLocale$1;
function requireUseLocale$1() {
  if (hasRequiredUseLocale$1) return useLocale;
  hasRequiredUseLocale$1 = 1;
  Object.defineProperty(useLocale, "__esModule", { value: true });
  useLocale.useLocale = void 0;
  var useAppBridgeState_1 = /* @__PURE__ */ requireUseAppBridgeState();
  function useLocale$12() {
    return (0, useAppBridgeState_1.useAppBridgeState)("staffMember.locale");
  }
  useLocale.useLocale = useLocale$12;
  return useLocale;
}
var hasRequiredUseLocale;
function requireUseLocale() {
  if (hasRequiredUseLocale) return useLocale$1;
  hasRequiredUseLocale = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useLocale = void 0;
    var useLocale_1 = /* @__PURE__ */ requireUseLocale$1();
    Object.defineProperty(exports$1, "useLocale", { enumerable: true, get: function() {
      return useLocale_1.useLocale;
    } });
  })(useLocale$1);
  return useLocale$1;
}
var useNavigate$1 = {};
var useNavigate = {};
var useNavigationHistory$1 = {};
var useNavigationHistory = {};
var hasRequiredUseNavigationHistory$1;
function requireUseNavigationHistory$1() {
  if (hasRequiredUseNavigationHistory$1) return useNavigationHistory;
  hasRequiredUseNavigationHistory$1 = 1;
  Object.defineProperty(useNavigationHistory, "__esModule", { value: true });
  useNavigationHistory.useNavigationHistory = void 0;
  var react_1 = require$$0;
  var actions_1 = require$$1$4;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  function useNavigationHistory$12() {
    var app = (0, useAppBridge_1.useAppBridge)();
    return (0, react_1.useMemo)(function() {
      var history = actions_1.History.create(app);
      function push(location2) {
        history.dispatch(actions_1.History.Action.PUSH, location2.pathname);
      }
      function replace(location2) {
        history.dispatch(actions_1.History.Action.REPLACE, location2.pathname);
      }
      return { push, replace };
    }, []);
  }
  useNavigationHistory.useNavigationHistory = useNavigationHistory$12;
  return useNavigationHistory;
}
var hasRequiredUseNavigationHistory;
function requireUseNavigationHistory() {
  if (hasRequiredUseNavigationHistory) return useNavigationHistory$1;
  hasRequiredUseNavigationHistory = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useNavigationHistory = void 0;
    var useNavigationHistory_1 = /* @__PURE__ */ requireUseNavigationHistory$1();
    Object.defineProperty(exports$1, "useNavigationHistory", { enumerable: true, get: function() {
      return useNavigationHistory_1.useNavigationHistory;
    } });
  })(useNavigationHistory$1);
  return useNavigationHistory$1;
}
var hasRequiredUseNavigate$1;
function requireUseNavigate$1() {
  if (hasRequiredUseNavigate$1) return useNavigate;
  hasRequiredUseNavigate$1 = 1;
  var __assign = useNavigate && useNavigate.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  Object.defineProperty(useNavigate, "__esModule", { value: true });
  useNavigate.useNavigate = void 0;
  var react_1 = require$$0;
  var Redirect_1 = require$$1$5;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  var useNavigationHistory_1 = /* @__PURE__ */ requireUseNavigationHistory();
  function useNavigate$12() {
    var app = (0, useAppBridge_1.useAppBridge)();
    var history = (0, useNavigationHistory_1.useNavigationHistory)();
    var redirect3 = (0, react_1.useMemo)(function() {
      return (0, Redirect_1.create)(app);
    }, [app]);
    var handleRedirect = (0, react_1.useCallback)(function(to, options) {
      var url = (0, Redirect_1.normalizeUrl)(to);
      var isAppUrl = url.startsWith(app.localOrigin);
      var isHostUrl = url.startsWith(app.hostOrigin);
      var isRelative = url.startsWith("/");
      if (isAppUrl || isHostUrl || isRelative) {
        var path = (0, Redirect_1.getRelativePath)(url);
        if (isHostUrl || (options === null || options === void 0 ? void 0 : options.target) === "new" || (options === null || options === void 0 ? void 0 : options.target) === "host") {
          redirect3.dispatch(Redirect_1.Action.ADMIN_PATH, {
            path: path.replace(/^\/admin/, ""),
            newContext: (options === null || options === void 0 ? void 0 : options.target) === "new"
          });
          return;
        }
        if (((options === null || options === void 0 ? void 0 : options.target) === "self" || !(options === null || options === void 0 ? void 0 : options.target)) && (options === null || options === void 0 ? void 0 : options.replace)) {
          history.replace({ pathname: path });
          return;
        }
        redirect3.dispatch(Redirect_1.Action.APP, path);
        return;
      }
      redirect3.dispatch(Redirect_1.Action.REMOTE, {
        url,
        newContext: (options === null || options === void 0 ? void 0 : options.target) === "new"
      });
    }, [redirect3, history]);
    return (0, react_1.useCallback)(function(to, options) {
      if ((0, Redirect_1.isAdminSection)(to)) {
        var convertedSection = __assign(__assign({}, to), { name: Redirect_1.ResourceType[to.name] });
        redirect3.dispatch(Redirect_1.Action.ADMIN_SECTION, {
          section: convertedSection,
          newContext: (options === null || options === void 0 ? void 0 : options.target) === "new"
        });
        return;
      }
      handleRedirect(to, options);
    }, [handleRedirect, redirect3]);
  }
  useNavigate.useNavigate = useNavigate$12;
  return useNavigate;
}
var hasRequiredUseNavigate;
function requireUseNavigate() {
  if (hasRequiredUseNavigate) return useNavigate$1;
  hasRequiredUseNavigate = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useNavigate = void 0;
    var useNavigate_1 = /* @__PURE__ */ requireUseNavigate$1();
    Object.defineProperty(exports$1, "useNavigate", { enumerable: true, get: function() {
      return useNavigate_1.useNavigate;
    } });
  })(useNavigate$1);
  return useNavigate$1;
}
var useToast$1 = {};
var useToast = {};
var hasRequiredUseToast$1;
function requireUseToast$1() {
  if (hasRequiredUseToast$1) return useToast;
  hasRequiredUseToast$1 = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useToast = exports$1.DEFAULT_TOAST_DURATION = void 0;
    var react_1 = require$$0;
    var Toast_1 = require$$1$6;
    var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
    exports$1.DEFAULT_TOAST_DURATION = 5e3;
    function useToast2() {
      var app = (0, useAppBridge_1.useAppBridge)();
      var toastList = (0, react_1.useRef)([]);
      var show = (0, react_1.useCallback)(function(content, options) {
        var toast = (0, Toast_1.create)(app, {
          message: content,
          isError: options === null || options === void 0 ? void 0 : options.isError,
          duration: (options === null || options === void 0 ? void 0 : options.duration) || exports$1.DEFAULT_TOAST_DURATION,
          action: options === null || options === void 0 ? void 0 : options.action
        });
        toast.dispatch(Toast_1.Action.SHOW);
        toastList.current.push(toast);
        toast.subscribe(Toast_1.Action.CLEAR, function() {
          var _a;
          (_a = options === null || options === void 0 ? void 0 : options.onDismiss) === null || _a === void 0 ? void 0 : _a.call(options);
          toastList.current.splice(toastList.current.indexOf(toast), 1);
          toast.unsubscribe();
        });
        toast.subscribe(Toast_1.Action.ACTION, function() {
          var _a, _b;
          (_b = (_a = options === null || options === void 0 ? void 0 : options.action) === null || _a === void 0 ? void 0 : _a.onAction) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
      }, [app]);
      (0, react_1.useEffect)(function() {
        return function() {
          toastList.current.forEach(function(toast) {
            return toast === null || toast === void 0 ? void 0 : toast.unsubscribe();
          });
        };
      }, []);
      return { show };
    }
    exports$1.useToast = useToast2;
  })(useToast);
  return useToast;
}
var hasRequiredUseToast;
function requireUseToast() {
  if (hasRequiredUseToast) return useToast$1;
  hasRequiredUseToast = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useToast = void 0;
    var useToast_1 = /* @__PURE__ */ requireUseToast$1();
    Object.defineProperty(exports$1, "useToast", { enumerable: true, get: function() {
      return useToast_1.useToast;
    } });
  })(useToast$1);
  return useToast$1;
}
var hasRequiredHooks;
function requireHooks() {
  if (hasRequiredHooks) return hooks;
  hasRequiredHooks = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useToast = exports$1.useNavigationHistory = exports$1.useNavigate = exports$1.useLocale = exports$1.useFeatureRequest = exports$1.useFeaturesAvailable = exports$1.useContextualSaveBar = exports$1.useAuthenticatedFetch = exports$1.useAppBridgeState = void 0;
    var useAppBridgeState_1 = /* @__PURE__ */ requireUseAppBridgeState();
    Object.defineProperty(exports$1, "useAppBridgeState", { enumerable: true, get: function() {
      return useAppBridgeState_1.useAppBridgeState;
    } });
    var useAuthenticatedFetch_1 = /* @__PURE__ */ requireUseAuthenticatedFetch();
    Object.defineProperty(exports$1, "useAuthenticatedFetch", { enumerable: true, get: function() {
      return useAuthenticatedFetch_1.useAuthenticatedFetch;
    } });
    var useContextualSaveBar_1 = /* @__PURE__ */ requireUseContextualSaveBar();
    Object.defineProperty(exports$1, "useContextualSaveBar", { enumerable: true, get: function() {
      return useContextualSaveBar_1.useContextualSaveBar;
    } });
    var useFeaturesAvailable_1 = /* @__PURE__ */ requireUseFeaturesAvailable();
    Object.defineProperty(exports$1, "useFeaturesAvailable", { enumerable: true, get: function() {
      return useFeaturesAvailable_1.useFeaturesAvailable;
    } });
    var useFeatureRequest_1 = /* @__PURE__ */ requireUseFeatureRequest();
    Object.defineProperty(exports$1, "useFeatureRequest", { enumerable: true, get: function() {
      return useFeatureRequest_1.useFeatureRequest;
    } });
    var useLocale_1 = /* @__PURE__ */ requireUseLocale();
    Object.defineProperty(exports$1, "useLocale", { enumerable: true, get: function() {
      return useLocale_1.useLocale;
    } });
    var useNavigate_1 = /* @__PURE__ */ requireUseNavigate();
    Object.defineProperty(exports$1, "useNavigate", { enumerable: true, get: function() {
      return useNavigate_1.useNavigate;
    } });
    var useNavigationHistory_1 = /* @__PURE__ */ requireUseNavigationHistory();
    Object.defineProperty(exports$1, "useNavigationHistory", { enumerable: true, get: function() {
      return useNavigationHistory_1.useNavigationHistory;
    } });
    var useToast_1 = /* @__PURE__ */ requireUseToast();
    Object.defineProperty(exports$1, "useToast", { enumerable: true, get: function() {
      return useToast_1.useToast;
    } });
  })(hooks);
  return hooks;
}
var hasRequiredContextualSaveBar$1;
function requireContextualSaveBar$1() {
  if (hasRequiredContextualSaveBar$1) return ContextualSaveBar;
  hasRequiredContextualSaveBar$1 = 1;
  Object.defineProperty(ContextualSaveBar, "__esModule", { value: true });
  var react_1 = require$$0;
  var hooks_1 = /* @__PURE__ */ requireHooks();
  function ContextualSaveBar$12(_a) {
    var _b = _a.discardAction, discardAction = _b === void 0 ? {} : _b, _c = _a.saveAction, saveAction = _c === void 0 ? {} : _c, fullWidth = _a.fullWidth, leaveConfirmationDisable = _a.leaveConfirmationDisable, visible = _a.visible;
    var _d = (0, hooks_1.useContextualSaveBar)(), show = _d.show, hide = _d.hide, saveActionSetOptions = _d.saveAction.setOptions, discardActionSetOptions = _d.discardAction.setOptions;
    (0, react_1.useEffect)(function() {
      saveActionSetOptions(saveAction);
    }, [saveAction]);
    (0, react_1.useEffect)(function() {
      discardActionSetOptions(discardAction);
    }, [discardAction]);
    (0, react_1.useEffect)(function() {
      if (visible) {
        show({ fullWidth, leaveConfirmationDisable });
      } else {
        hide();
      }
    }, [fullWidth, leaveConfirmationDisable, visible]);
    return null;
  }
  ContextualSaveBar.default = ContextualSaveBar$12;
  return ContextualSaveBar;
}
var hasRequiredContextualSaveBar;
function requireContextualSaveBar() {
  if (hasRequiredContextualSaveBar) return ContextualSaveBar$1;
  hasRequiredContextualSaveBar = 1;
  var __importDefault = ContextualSaveBar$1 && ContextualSaveBar$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(ContextualSaveBar$1, "__esModule", { value: true });
  var ContextualSaveBar_1 = __importDefault(/* @__PURE__ */ requireContextualSaveBar$1());
  ContextualSaveBar$1.default = ContextualSaveBar_1.default;
  return ContextualSaveBar$1;
}
var Loading$1 = {};
var Loading = {};
var hasRequiredLoading$1;
function requireLoading$1() {
  if (hasRequiredLoading$1) return Loading;
  hasRequiredLoading$1 = 1;
  var __extends = Loading && Loading.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __importDefault = Loading && Loading.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(Loading, "__esModule", { value: true });
  var react_1 = __importDefault(require$$0);
  var actions_1 = require$$1$4;
  var context_1 = /* @__PURE__ */ requireContext();
  var Loading$12 = (
    /** @class */
    function(_super) {
      __extends(Loading2, _super);
      function Loading2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      Loading2.prototype.componentDidMount = function() {
        var app = this.context;
        this.loading = actions_1.Loading.create(app);
        if (this.loading != null) {
          this.loading.dispatch(actions_1.Loading.Action.START);
        }
      };
      Loading2.prototype.componentWillUnmount = function() {
        if (this.loading != null) {
          this.loading.dispatch(actions_1.Loading.Action.STOP);
        }
      };
      Loading2.prototype.render = function() {
        return null;
      };
      Loading2.contextType = context_1.AppBridgeContext;
      return Loading2;
    }(react_1.default.Component)
  );
  Loading.default = Loading$12;
  return Loading;
}
var hasRequiredLoading;
function requireLoading() {
  if (hasRequiredLoading) return Loading$1;
  hasRequiredLoading = 1;
  var __importDefault = Loading$1 && Loading$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(Loading$1, "__esModule", { value: true });
  var Loading_1 = __importDefault(/* @__PURE__ */ requireLoading$1());
  Loading$1.default = Loading_1.default;
  return Loading$1;
}
var Modal$1 = {};
var Modal = {};
var transformers = {};
var hasRequiredTransformers;
function requireTransformers() {
  if (hasRequiredTransformers) return transformers;
  hasRequiredTransformers = 1;
  var __createBinding = transformers && transformers.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = transformers && transformers.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = transformers && transformers.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __spreadArray = transformers && transformers.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  Object.defineProperty(transformers, "__esModule", { value: true });
  transformers.transformActions = transformers.generateRedirect = void 0;
  var Button2 = __importStar(require$$0$1);
  var ButtonGroup = __importStar(require$$1$7);
  var Redirect = __importStar(require$$1$5);
  function generateRedirect(appBridge, url, target, external) {
    if (target === void 0) {
      target = "APP";
    }
    if (url == null) {
      return void 0;
    }
    var redirect3 = Redirect.create(appBridge);
    var payload = external === true ? {
      url,
      newContext: true
    } : url;
    return function() {
      redirect3.dispatch(redirectAction(target, external), payload);
    };
  }
  transformers.generateRedirect = generateRedirect;
  function redirectAction(target, external) {
    if (external === true) {
      return Redirect.Action.REMOTE;
    }
    return Redirect.Action[target];
  }
  function transformActions(appBridge, _a) {
    var primaryAction = _a.primaryAction, secondaryActions = _a.secondaryActions, actionGroups = _a.actionGroups;
    var primary = transformPrimaryAction(appBridge, primaryAction);
    var secondary = __spreadArray(__spreadArray([], transformSecondaryActions(appBridge, secondaryActions), true), transformActionGroups(appBridge, actionGroups), true);
    return {
      primary,
      secondary
    };
  }
  transformers.transformActions = transformActions;
  function transformAction(appBridge, action2) {
    var style = action2.destructive === true ? Button2.Style.Danger : void 0;
    var button = Button2.create(appBridge, {
      label: action2.content || "",
      disabled: action2.disabled,
      loading: action2.loading,
      plain: action2.plain,
      style
    });
    if (action2.onAction) {
      button.subscribe(Button2.Action.CLICK, action2.onAction);
    }
    var redirect3 = generateRedirect(appBridge, action2.url, action2.target, action2.external);
    if (redirect3 != null) {
      button.subscribe(Button2.Action.CLICK, redirect3);
    }
    return button;
  }
  function transformPrimaryAction(appBridge, primaryAction) {
    if (primaryAction == null) {
      return void 0;
    }
    var primary = transformAction(appBridge, primaryAction);
    return primary;
  }
  function transformSecondaryActions(appBridge, secondaryActions) {
    if (secondaryActions === void 0) {
      secondaryActions = [];
    }
    var secondary = __spreadArray([], secondaryActions.map(function(secondaryAction) {
      return transformAction(appBridge, secondaryAction);
    }), true);
    return secondary;
  }
  function transformActionGroups(appBridge, actionGroups) {
    if (actionGroups === void 0) {
      actionGroups = [];
    }
    var buttonGroups = __spreadArray([], actionGroups.map(function(group) {
      var buttons = group.actions.map(function(groupAction) {
        return transformAction(appBridge, groupAction);
      });
      return ButtonGroup.create(appBridge, { label: group.title, plain: group.plain, buttons });
    }), true);
    return buttonGroups;
  }
  return transformers;
}
var useOnceEffect$1 = {};
var useOnceEffect = {};
var hasRequiredUseOnceEffect$1;
function requireUseOnceEffect$1() {
  if (hasRequiredUseOnceEffect$1) return useOnceEffect;
  hasRequiredUseOnceEffect$1 = 1;
  var __importDefault = useOnceEffect && useOnceEffect.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(useOnceEffect, "__esModule", { value: true });
  useOnceEffect.useOnceEffect = void 0;
  var react_1 = __importDefault(require$$0);
  useOnceEffect.useOnceEffect = react_1.default.useInsertionEffect || react_1.default.useLayoutEffect;
  return useOnceEffect;
}
var hasRequiredUseOnceEffect;
function requireUseOnceEffect() {
  if (hasRequiredUseOnceEffect) return useOnceEffect$1;
  hasRequiredUseOnceEffect = 1;
  (function(exports$1) {
    var __createBinding = useOnceEffect$1 && useOnceEffect$1.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = useOnceEffect$1 && useOnceEffect$1.__exportStar || function(m, exports$12) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    __exportStar(/* @__PURE__ */ requireUseOnceEffect$1(), exports$1);
  })(useOnceEffect$1);
  return useOnceEffect$1;
}
var hasRequiredModal$1;
function requireModal$1() {
  if (hasRequiredModal$1) return Modal;
  hasRequiredModal$1 = 1;
  var __assign = Modal && Modal.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __rest = Modal && Modal.__rest || function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  Object.defineProperty(Modal, "__esModule", { value: true });
  var react_1 = require$$0;
  var Modal_1 = require$$1$8;
  var transformers_1 = /* @__PURE__ */ requireTransformers();
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  var useOnceEffect_1 = /* @__PURE__ */ requireUseOnceEffect();
  function Modal$12(props) {
    var app = (0, useAppBridge_1.useAppBridge)();
    var focusReturnPoint = (0, react_1.useRef)(null);
    var prevProps = (0, react_1.useRef)({ open: false });
    var open = props.open;
    var isUnmounted = (0, react_1.useRef)(false);
    var modal = (0, react_1.useMemo)(function() {
      props.primaryAction;
      props.secondaryActions;
      var rest = __rest(props, ["primaryAction", "secondaryActions"]);
      return (0, Modal_1.create)(app, transformProps(app, rest));
    }, [app]);
    (0, react_1.useEffect)(function() {
      if (isUnmounted.current) {
        prevProps.current = props;
        return;
      }
      var wasOpen = prevProps.current.open;
      var openUpdated = wasOpen !== open;
      if (open) {
        var transformedProps = transformProps(app, props, wasOpen);
        var shouldSendUpdate = !openUpdated;
        if (isIframeModal(transformedProps)) {
          modal.set(transformedProps, shouldSendUpdate);
        } else {
          modal.set(transformedProps, shouldSendUpdate);
        }
      }
      if (openUpdated) {
        if (open) {
          modal.dispatch(Modal_1.Action.OPEN);
          focusReturnPoint.current = document.activeElement;
        } else {
          modal.dispatch(Modal_1.Action.CLOSE);
          if (focusReturnPoint.current != null && document.contains(focusReturnPoint.current)) {
            focusReturnPoint.current.focus();
            focusReturnPoint.current = null;
          }
        }
      }
      if (props.onClose != null) {
        modal.subscribe(Modal_1.Action.CLOSE, props.onClose);
      }
      prevProps.current = props;
      return function() {
        modal.unsubscribe();
      };
    }, [props, open]);
    (0, useOnceEffect_1.useOnceEffect)(function() {
      return function() {
        if (prevProps.current.open) {
          modal.dispatch(Modal_1.Action.CLOSE);
        }
      };
    }, []);
    return null;
  }
  function isIframeModal(options) {
    return typeof options.url === "string" || typeof options.path === "string";
  }
  function transformProps(app, props, wasOpen) {
    var title = props.title, size = props.size, message2 = props.message, src = props.src, primaryAction = props.primaryAction, secondaryActions = props.secondaryActions, loading = props.loading;
    var safeSize = size == null ? void 0 : Modal_1.Size[size];
    var srcPayload = {};
    if (src != null) {
      if (src.match("^https?://")) {
        srcPayload.url = src;
      } else {
        srcPayload.path = src;
      }
    }
    return __assign(__assign({ title, message: message2, size: safeSize }, srcPayload), { footer: {
      buttons: (0, transformers_1.transformActions)(app, {
        primaryAction,
        secondaryActions
      })
    }, loading: wasOpen ? void 0 : loading });
  }
  Modal.default = Modal$12;
  return Modal;
}
var ModalContent$1 = {};
var ModalContent = {};
var hasRequiredModalContent$1;
function requireModalContent$1() {
  if (hasRequiredModalContent$1) return ModalContent;
  hasRequiredModalContent$1 = 1;
  var __extends = ModalContent && ModalContent.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __importDefault = ModalContent && ModalContent.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(ModalContent, "__esModule", { value: true });
  var react_1 = __importDefault(require$$0);
  var actions_1 = require$$1$4;
  var context_1 = /* @__PURE__ */ requireContext();
  var ModalContent$12 = (
    /** @class */
    function(_super) {
      __extends(ModalContent2, _super);
      function ModalContent2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      ModalContent2.prototype.componentDidMount = function() {
        var app = this.context;
        this.modalContent = actions_1.ModalContent.create(app);
        this.syncLoadingStatus();
      };
      ModalContent2.prototype.componentDidUpdate = function() {
        this.syncLoadingStatus();
      };
      ModalContent2.prototype.syncLoadingStatus = function() {
        if (!this.modalContent)
          return;
        if (this.props.loading) {
          this.modalContent.loading();
        } else {
          this.modalContent.loaded();
        }
      };
      ModalContent2.prototype.render = function() {
        return null;
      };
      ModalContent2.contextType = context_1.AppBridgeContext;
      return ModalContent2;
    }(react_1.default.Component)
  );
  ModalContent.default = ModalContent$12;
  return ModalContent;
}
var hasRequiredModalContent;
function requireModalContent() {
  if (hasRequiredModalContent) return ModalContent$1;
  hasRequiredModalContent = 1;
  var __importDefault = ModalContent$1 && ModalContent$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(ModalContent$1, "__esModule", { value: true });
  var ModalContent_1 = __importDefault(/* @__PURE__ */ requireModalContent$1());
  ModalContent$1.default = ModalContent_1.default;
  return ModalContent$1;
}
var hasRequiredModal;
function requireModal() {
  if (hasRequiredModal) return Modal$1;
  hasRequiredModal = 1;
  (function(exports$1) {
    var __importDefault = Modal$1 && Modal$1.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.ModalContent = void 0;
    var Modal_1 = __importDefault(/* @__PURE__ */ requireModal$1());
    var ModalContent_1 = /* @__PURE__ */ requireModalContent();
    Object.defineProperty(exports$1, "ModalContent", { enumerable: true, get: function() {
      return __importDefault(ModalContent_1).default;
    } });
    exports$1.default = Modal_1.default;
  })(Modal$1);
  return Modal$1;
}
var NavigationMenu$1 = {};
var NavigationMenu = {};
var Provider$1 = {};
var ClientRouter$1 = {};
var ClientRouter = {};
var router = {};
var hasRequiredRouter;
function requireRouter() {
  if (hasRequiredRouter) return router;
  hasRequiredRouter = 1;
  Object.defineProperty(router, "__esModule", { value: true });
  router.handleRouteChange = void 0;
  var actions_1 = require$$1$4;
  function handleRouteChange(app, history) {
    return app.subscribe(actions_1.Redirect.Action.APP, function(_a) {
      var path = _a.path;
      history.replace(path);
    });
  }
  router.handleRouteChange = handleRouteChange;
  return router;
}
var hasRequiredClientRouter$1;
function requireClientRouter$1() {
  if (hasRequiredClientRouter$1) return ClientRouter;
  hasRequiredClientRouter$1 = 1;
  var __extends = ClientRouter && ClientRouter.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __importDefault = ClientRouter && ClientRouter.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(ClientRouter, "__esModule", { value: true });
  var react_1 = __importDefault(require$$0);
  var context_1 = /* @__PURE__ */ requireContext();
  var router_1 = /* @__PURE__ */ requireRouter();
  var ClientRouter$12 = (
    /** @class */
    function(_super) {
      __extends(ClientRouter2, _super);
      function ClientRouter2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      ClientRouter2.prototype.componentDidMount = function() {
        var history = this.props.history;
        this.unsubscribe = (0, router_1.handleRouteChange)(this.context, history);
      };
      ClientRouter2.prototype.componentWillUnmount = function() {
        if (this.unsubscribe) {
          this.unsubscribe();
        }
      };
      ClientRouter2.prototype.render = function() {
        return null;
      };
      ClientRouter2.contextType = context_1.AppBridgeContext;
      return ClientRouter2;
    }(react_1.default.Component)
  );
  ClientRouter.default = ClientRouter$12;
  return ClientRouter;
}
var hook$1 = {};
var hasRequiredHook$1;
function requireHook$1() {
  if (hasRequiredHook$1) return hook$1;
  hasRequiredHook$1 = 1;
  Object.defineProperty(hook$1, "__esModule", { value: true });
  var react_1 = require$$0;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  var router_1 = /* @__PURE__ */ requireRouter();
  function useClientRouting(history) {
    var app = (0, useAppBridge_1.useAppBridge)();
    (0, react_1.useEffect)(function() {
      return (0, router_1.handleRouteChange)(app, history);
    }, [app, history]);
  }
  hook$1.default = useClientRouting;
  return hook$1;
}
var hasRequiredClientRouter;
function requireClientRouter() {
  if (hasRequiredClientRouter) return ClientRouter$1;
  hasRequiredClientRouter = 1;
  (function(exports$1) {
    var __importDefault = ClientRouter$1 && ClientRouter$1.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useClientRouting = exports$1.ClientRouter = void 0;
    var ClientRouter_1 = /* @__PURE__ */ requireClientRouter$1();
    Object.defineProperty(exports$1, "ClientRouter", { enumerable: true, get: function() {
      return __importDefault(ClientRouter_1).default;
    } });
    var hook_1 = /* @__PURE__ */ requireHook$1();
    Object.defineProperty(exports$1, "useClientRouting", { enumerable: true, get: function() {
      return __importDefault(hook_1).default;
    } });
  })(ClientRouter$1);
  return ClientRouter$1;
}
var RoutePropagator$1 = {};
var RoutePropagator = {};
var routePropagator = {};
var globals = {};
var hasRequiredGlobals;
function requireGlobals() {
  if (hasRequiredGlobals) return globals;
  hasRequiredGlobals = 1;
  Object.defineProperty(globals, "__esModule", { value: true });
  globals.getOrigin = globals.getTopWindow = globals.getSelfWindow = void 0;
  function getSelfWindow() {
    return window.self;
  }
  globals.getSelfWindow = getSelfWindow;
  function getTopWindow() {
    return window.top;
  }
  globals.getTopWindow = getTopWindow;
  function getOrigin() {
    return location.origin;
  }
  globals.getOrigin = getOrigin;
  return globals;
}
var hasRequiredRoutePropagator$2;
function requireRoutePropagator$2() {
  if (hasRequiredRoutePropagator$2) return routePropagator;
  hasRequiredRoutePropagator$2 = 1;
  var __awaiter = routePropagator && routePropagator.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = routePropagator && routePropagator.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(routePropagator, "__esModule", { value: true });
  routePropagator.updateHistory = void 0;
  var MessageTransport_1 = require$$0$2;
  var actions_1 = require$$1$4;
  var globals_1 = /* @__PURE__ */ requireGlobals();
  var embeddedFrameParamsToRemove2 = [
    "hmac",
    "locale",
    "protocol",
    "session",
    "shop",
    "timestamp",
    "host"
  ];
  function updateHistory(app, location2) {
    return __awaiter(this, void 0, void 0, function() {
      var selfWindow, topWindow, renderedInTheTopWindow, renderedAsMainApp, normalizedLocation, pathname, search, hash, locationStr;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            selfWindow = (0, globals_1.getSelfWindow)();
            topWindow = (0, globals_1.getTopWindow)();
            renderedInTheTopWindow = selfWindow === topWindow;
            return [4, app.getState("context").then(function(context2) {
              return context2 === MessageTransport_1.Context.Main;
            })];
          case 1:
            renderedAsMainApp = _a.sent();
            if (renderedInTheTopWindow || !renderedAsMainApp) {
              return [
                2
                /*return*/
              ];
            }
            normalizedLocation = getNormalizedURL(location2);
            embeddedFrameParamsToRemove2.forEach(function(param) {
              return normalizedLocation.searchParams.delete(param);
            });
            pathname = normalizedLocation.pathname, search = normalizedLocation.search, hash = normalizedLocation.hash;
            locationStr = "".concat(pathname).concat(search).concat(hash);
            actions_1.History.create(app).dispatch(actions_1.History.Action.REPLACE, locationStr);
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }
  routePropagator.updateHistory = updateHistory;
  function getNormalizedURL(location2) {
    var origin = (0, globals_1.getOrigin)();
    if (typeof location2 === "string") {
      return new URL(location2, origin);
    }
    var pathname = location2.pathname, search = location2.search, hash = location2.hash;
    return new URL("".concat(pathname).concat(search).concat(hash), origin);
  }
  return routePropagator;
}
var hasRequiredRoutePropagator$1;
function requireRoutePropagator$1() {
  if (hasRequiredRoutePropagator$1) return RoutePropagator;
  hasRequiredRoutePropagator$1 = 1;
  var __extends = RoutePropagator && RoutePropagator.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __importDefault = RoutePropagator && RoutePropagator.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(RoutePropagator, "__esModule", { value: true });
  var react_1 = __importDefault(require$$0);
  var context_1 = /* @__PURE__ */ requireContext();
  var route_propagator_1 = /* @__PURE__ */ requireRoutePropagator$2();
  var RoutePropagator$12 = (
    /** @class */
    function(_super) {
      __extends(RoutePropagator2, _super);
      function RoutePropagator2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      RoutePropagator2.prototype.componentDidMount = function() {
        var location2 = this.props.location;
        (0, route_propagator_1.updateHistory)(this.context, location2);
      };
      RoutePropagator2.prototype.componentDidUpdate = function(_a) {
        var prevLocation = _a.location;
        var location2 = this.props.location;
        if (location2 !== prevLocation) {
          (0, route_propagator_1.updateHistory)(this.context, location2);
        }
      };
      RoutePropagator2.prototype.render = function() {
        return null;
      };
      RoutePropagator2.contextType = context_1.AppBridgeContext;
      return RoutePropagator2;
    }(react_1.default.Component)
  );
  RoutePropagator.default = RoutePropagator$12;
  return RoutePropagator;
}
var hook = {};
var hasRequiredHook;
function requireHook() {
  if (hasRequiredHook) return hook;
  hasRequiredHook = 1;
  Object.defineProperty(hook, "__esModule", { value: true });
  var react_1 = require$$0;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  var route_propagator_1 = /* @__PURE__ */ requireRoutePropagator$2();
  function useRoutePropagation(location2) {
    var app = (0, useAppBridge_1.useAppBridge)();
    (0, react_1.useEffect)(function() {
      (0, route_propagator_1.updateHistory)(app, location2);
    }, [app, location2]);
  }
  hook.default = useRoutePropagation;
  return hook;
}
var hasRequiredRoutePropagator;
function requireRoutePropagator() {
  if (hasRequiredRoutePropagator) return RoutePropagator$1;
  hasRequiredRoutePropagator = 1;
  (function(exports$1) {
    var __importDefault = RoutePropagator$1 && RoutePropagator$1.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useRoutePropagation = exports$1.RoutePropagator = void 0;
    var RoutePropagator_1 = /* @__PURE__ */ requireRoutePropagator$1();
    Object.defineProperty(exports$1, "RoutePropagator", { enumerable: true, get: function() {
      return __importDefault(RoutePropagator_1).default;
    } });
    var hook_1 = /* @__PURE__ */ requireHook();
    Object.defineProperty(exports$1, "useRoutePropagation", { enumerable: true, get: function() {
      return __importDefault(hook_1).default;
    } });
  })(RoutePropagator$1);
  return RoutePropagator$1;
}
const version = "3.7.11";
const require$$5 = {
  version
};
var hasRequiredProvider$1;
function requireProvider$1() {
  if (hasRequiredProvider$1) return Provider$1;
  hasRequiredProvider$1 = 1;
  (function(exports$1) {
    var __createBinding = Provider$1 && Provider$1.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = Provider$1 && Provider$1.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = Provider$1 && Provider$1.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useRouter = exports$1.setClientInterfaceHook = void 0;
    var react_1 = __importStar(require$$0);
    var app_bridge_1 = __importStar(require$$1$9);
    var context_1 = /* @__PURE__ */ requireContext();
    var ClientRouter_1 = /* @__PURE__ */ requireClientRouter();
    var RoutePropagator_1 = /* @__PURE__ */ requireRoutePropagator();
    var packageJson = require$$5;
    function Provider2(_a) {
      var config = _a.config, router2 = _a.router, children = _a.children;
      var app = (0, react_1.useMemo)(function() {
        return (0, app_bridge_1.default)(config);
      }, []);
      (0, react_1.useEffect)(function() {
        if (app === null || app === void 0 ? void 0 : app.hooks) {
          app.hooks.set(app_bridge_1.LifecycleHook.DispatchAction, exports$1.setClientInterfaceHook);
        }
      }, [app]);
      var routerMarkup = (router2 === null || router2 === void 0 ? void 0 : router2.history) && (router2 === null || router2 === void 0 ? void 0 : router2.location) ? react_1.default.createElement(Router, { router: router2 }, children) : children;
      return react_1.default.createElement(context_1.AppBridgeContext.Provider, { value: app }, routerMarkup);
    }
    var setClientInterfaceHook = function(next) {
      return function(action2) {
        action2.clientInterface = {
          name: "@shopify/app-bridge-react",
          version: packageJson.version
        };
        return next(action2);
      };
    };
    exports$1.setClientInterfaceHook = setClientInterfaceHook;
    var RouterContext = (0, react_1.createContext)(void 0);
    function useRouter() {
      return (0, react_1.useContext)(RouterContext);
    }
    exports$1.useRouter = useRouter;
    function Router(_a) {
      var router2 = _a.router, children = _a.children;
      (0, ClientRouter_1.useClientRouting)(router2.history);
      (0, RoutePropagator_1.useRoutePropagation)(router2.location);
      return react_1.default.createElement(RouterContext.Provider, { value: router2 }, children);
    }
    exports$1.default = Provider2;
  })(Provider$1);
  return Provider$1;
}
var hasRequiredNavigationMenu$1;
function requireNavigationMenu$1() {
  if (hasRequiredNavigationMenu$1) return NavigationMenu;
  hasRequiredNavigationMenu$1 = 1;
  Object.defineProperty(NavigationMenu, "__esModule", { value: true });
  var react_1 = require$$0;
  var AppLink_1 = require$$1$a;
  var NavigationMenu_1 = require$$2;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  var Provider_1 = /* @__PURE__ */ requireProvider$1();
  function defaultMatcher(link, location2) {
    var pathname = typeof location2 === "string" ? new URL(location2).pathname : location2.pathname;
    return link.destination.replace(/\/$/, "") === pathname.replace(/\/$/, "");
  }
  function NavigationMenu$12(_a) {
    var navigationLinks = _a.navigationLinks, _b = _a.matcher, matcher = _b === void 0 ? defaultMatcher : _b;
    var app = (0, useAppBridge_1.useAppBridge)();
    var _c = (0, react_1.useState)(), items = _c[0], setItems = _c[1];
    var locationOrHref = ((0, Provider_1.useRouter)() || {}).location;
    var location2 = (0, react_1.useMemo)(function() {
      return locationOrHref !== null && locationOrHref !== void 0 ? locationOrHref : window.location;
    }, [locationOrHref]);
    (0, react_1.useEffect)(function() {
      var items2 = navigationLinks.map(function(link) {
        return (0, AppLink_1.create)(app, link);
      });
      setItems(items2);
    }, [app, JSON.stringify(navigationLinks)]);
    var activeLink = (0, react_1.useMemo)(function() {
      var activeLinkIndex = (items || []).findIndex(function(link) {
        return matcher(link, location2);
      });
      if (activeLinkIndex >= 0) {
        return items === null || items === void 0 ? void 0 : items[activeLinkIndex];
      }
    }, [items, matcher, location2]);
    (0, react_1.useEffect)(function() {
      if (!items) {
        return;
      }
      (0, NavigationMenu_1.create)(app, { items, active: activeLink });
    }, [items, activeLink, app]);
    return null;
  }
  NavigationMenu.default = NavigationMenu$12;
  return NavigationMenu;
}
var hasRequiredNavigationMenu;
function requireNavigationMenu() {
  if (hasRequiredNavigationMenu) return NavigationMenu$1;
  hasRequiredNavigationMenu = 1;
  var __importDefault = NavigationMenu$1 && NavigationMenu$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(NavigationMenu$1, "__esModule", { value: true });
  var NavigationMenu_1 = __importDefault(/* @__PURE__ */ requireNavigationMenu$1());
  NavigationMenu$1.default = NavigationMenu_1.default;
  return NavigationMenu$1;
}
var Provider = {};
var hasRequiredProvider;
function requireProvider() {
  if (hasRequiredProvider) return Provider;
  hasRequiredProvider = 1;
  var __importDefault = Provider && Provider.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(Provider, "__esModule", { value: true });
  var Provider_1 = __importDefault(/* @__PURE__ */ requireProvider$1());
  Provider.default = Provider_1.default;
  return Provider;
}
var ResourcePicker$1 = {};
var ResourcePicker = {};
var hasRequiredResourcePicker$1;
function requireResourcePicker$1() {
  if (hasRequiredResourcePicker$1) return ResourcePicker;
  hasRequiredResourcePicker$1 = 1;
  (function(exports$1) {
    var __assign = ResourcePicker && ResourcePicker.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __rest = ResourcePicker && ResourcePicker.__rest || function(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
        }
      return t;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.ResourceType = exports$1.ActionVerb = void 0;
    var react_1 = require$$0;
    var ResourcePicker_1 = require$$1$b;
    Object.defineProperty(exports$1, "ActionVerb", { enumerable: true, get: function() {
      return ResourcePicker_1.ActionVerb;
    } });
    Object.defineProperty(exports$1, "ResourceType", { enumerable: true, get: function() {
      return ResourcePicker_1.ResourceType;
    } });
    var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
    function ResourcePicker$12(_a) {
      var open = _a.open, resourceType = _a.resourceType, onSelection = _a.onSelection, onCancel = _a.onCancel, allowMultiple = _a.allowMultiple, selectMultiple = _a.selectMultiple, props = __rest(_a, ["open", "resourceType", "onSelection", "onCancel", "allowMultiple", "selectMultiple"]);
      var options = (0, react_1.useMemo)(function() {
        return __assign(__assign({}, props), { selectMultiple: selectMultiple !== null && selectMultiple !== void 0 ? selectMultiple : allowMultiple });
      }, [allowMultiple, props, selectMultiple]);
      var app = (0, useAppBridge_1.useAppBridge)();
      var isUnmountedRef = (0, react_1.useRef)(false);
      (0, react_1.useEffect)(function() {
        return function() {
          isUnmountedRef.current = true;
        };
      }, []);
      var openRef = (0, react_1.useRef)(false);
      var optionsRef = (0, react_1.useRef)(options);
      var picker = (0, react_1.useMemo)(function() {
        return (0, ResourcePicker_1.create)(app, {
          resourceType: ResourcePicker_1.ResourceType[resourceType],
          options: optionsRef.current
        });
      }, [app, resourceType]);
      (0, react_1.useEffect)(function() {
        openRef.current = false;
        return function() {
          if (openRef.current && isUnmountedRef.current) {
            picker.dispatch(ResourcePicker_1.Action.CANCEL);
          }
        };
      }, [picker]);
      var focusReturnPointRef = (0, react_1.useRef)(null);
      var storeFocusReturnPoint = (0, react_1.useCallback)(function() {
        if (document.activeElement instanceof HTMLElement) {
          focusReturnPointRef.current = document.activeElement;
        }
      }, []);
      var applyFocusReturnPoint = (0, react_1.useCallback)(function() {
        var focusReturnPoint = focusReturnPointRef.current;
        focusReturnPointRef.current = null;
        if (focusReturnPoint && document.contains(focusReturnPoint)) {
          focusReturnPoint.focus();
        }
      }, []);
      (0, react_1.useEffect)(function() {
        if (open === openRef.current)
          return;
        openRef.current = open;
        if (open) {
          picker.dispatch(ResourcePicker_1.Action.OPEN);
          storeFocusReturnPoint();
        } else {
          picker.dispatch(ResourcePicker_1.Action.CLOSE);
          applyFocusReturnPoint();
        }
      }, [picker, open, storeFocusReturnPoint, applyFocusReturnPoint]);
      (0, react_1.useEffect)(function() {
        if (!onSelection)
          return;
        return picker.subscribe(ResourcePicker_1.Action.SELECT, function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          openRef.current = false;
          applyFocusReturnPoint();
          return onSelection.apply(void 0, args);
        });
      }, [picker, onSelection, applyFocusReturnPoint]);
      (0, react_1.useEffect)(function() {
        if (!onCancel)
          return;
        return picker.subscribe(ResourcePicker_1.Action.CANCEL, function() {
          openRef.current = false;
          applyFocusReturnPoint();
          return onCancel();
        });
      }, [picker, onCancel, applyFocusReturnPoint]);
      (0, react_1.useEffect)(function() {
        var shouldUpdate = JSON.stringify(options) !== JSON.stringify(optionsRef.current);
        if (!shouldUpdate)
          return;
        optionsRef.current = options;
        picker.set(options);
      }, [picker, options]);
      return null;
    }
    exports$1.default = ResourcePicker$12;
  })(ResourcePicker);
  return ResourcePicker;
}
var hasRequiredResourcePicker;
function requireResourcePicker() {
  if (hasRequiredResourcePicker) return ResourcePicker$1;
  hasRequiredResourcePicker = 1;
  var __importDefault = ResourcePicker$1 && ResourcePicker$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(ResourcePicker$1, "__esModule", { value: true });
  var ResourcePicker_1 = __importDefault(/* @__PURE__ */ requireResourcePicker$1());
  ResourcePicker$1.default = ResourcePicker_1.default;
  return ResourcePicker$1;
}
var TitleBar$1 = {};
var TitleBar = {};
var hasRequiredTitleBar$1;
function requireTitleBar$1() {
  if (hasRequiredTitleBar$1) return TitleBar;
  hasRequiredTitleBar$1 = 1;
  Object.defineProperty(TitleBar, "__esModule", { value: true });
  var react_1 = require$$0;
  var Button_1 = require$$0$1;
  var TitleBar_1 = require$$2$1;
  var ButtonGroup_1 = require$$1$7;
  var transformers_1 = /* @__PURE__ */ requireTransformers();
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  function TitleBar$12(props) {
    var app = (0, useAppBridge_1.useAppBridge)();
    var currentProps = (0, react_1.useRef)();
    var titleBar = (0, react_1.useMemo)(function() {
      return (0, TitleBar_1.create)(app, {});
    }, [app]);
    (0, react_1.useEffect)(function() {
      var _a;
      var propsChanged = JSON.stringify(currentProps.current) !== JSON.stringify(props);
      currentProps.current = props;
      if (propsChanged) {
        titleBar.set(transformProps(app, props));
      } else {
        var primaryAction = props.primaryAction, secondaryActions = props.secondaryActions, actionGroups = props.actionGroups, breadcrumbs = props.breadcrumbs;
        var breadcrumb = Array.isArray(breadcrumbs) ? breadcrumbs[breadcrumbs.length - 1] : breadcrumbs;
        updateButton(breadcrumb, titleBar.options.breadcrumbs);
        updateButton(primaryAction, (_a = titleBar.options.buttons) === null || _a === void 0 ? void 0 : _a.primary);
        updateSecondaryActions(titleBar, secondaryActions);
        updateActionGroups(titleBar, actionGroups);
      }
      return function() {
        titleBar.unsubscribe();
      };
    }, [titleBar, props]);
    return null;
  }
  TitleBar.default = TitleBar$12;
  function updateSecondaryActions(titleBar, secondaryActions) {
    var _a, _b;
    var secondaryButtons = ((_b = (_a = titleBar.options.buttons) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.filter(function(button) {
      return !(0, ButtonGroup_1.isGroupedButton)(button);
    })) || [];
    secondaryButtons === null || secondaryButtons === void 0 ? void 0 : secondaryButtons.forEach(function(secondaryButton, index) {
      return updateButton(
        secondaryActions === null || secondaryActions === void 0 ? void 0 : secondaryActions[index],
        // This needs to be casted as the React TitleBar component doesn't accept button groups for secondary actions
        secondaryButton
      );
    });
  }
  function updateActionGroups(titleBar, actionGroups) {
    var _a, _b;
    var actionGroupButtons = ((_b = (_a = titleBar.options.buttons) === null || _a === void 0 ? void 0 : _a.secondary) === null || _b === void 0 ? void 0 : _b.filter(ButtonGroup_1.isGroupedButton)) || [];
    actionGroupButtons === null || actionGroupButtons === void 0 ? void 0 : actionGroupButtons.forEach(function(actionBroupButton, index) {
      var actionGroup = actionGroups === null || actionGroups === void 0 ? void 0 : actionGroups[index];
      if (!actionGroup) {
        return;
      }
      actionBroupButton.options.buttons.forEach(function(nestedButton, nestedIndex) {
        return updateButton(actionGroup.actions[nestedIndex], nestedButton);
      });
    });
  }
  function transformProps(app, _a) {
    var actionGroups = _a.actionGroups, breadcrumbs = _a.breadcrumbs, primaryAction = _a.primaryAction, secondaryActions = _a.secondaryActions, title = _a.title;
    var breadcrumb = Array.isArray(breadcrumbs) ? breadcrumbs[breadcrumbs.length - 1] : breadcrumbs;
    return {
      title,
      buttons: (0, transformers_1.transformActions)(app, {
        primaryAction,
        secondaryActions,
        actionGroups
      }),
      breadcrumbs: breadcrumb ? transformBreadcrumb(app, breadcrumb) : void 0
    };
  }
  function transformBreadcrumb(app, breadcrumb, updateBreadcrumb) {
    var button = updateBreadcrumb || (0, Button_1.create)(app, {
      label: breadcrumb.content || ""
    });
    updateButton(breadcrumb, button);
    return button;
  }
  function updateButton(actionProps, button) {
    if (!actionProps || !button) {
      return;
    }
    var redirect3 = (0, transformers_1.generateRedirect)(button.app, actionProps.url, actionProps.target, actionProps.external);
    if (redirect3) {
      button.subscribe(Button_1.Action.CLICK, redirect3, button);
    }
    if (actionProps === null || actionProps === void 0 ? void 0 : actionProps.onAction) {
      button.subscribe(Button_1.Action.CLICK, actionProps.onAction, button);
    }
  }
  return TitleBar;
}
var hasRequiredTitleBar;
function requireTitleBar() {
  if (hasRequiredTitleBar) return TitleBar$1;
  hasRequiredTitleBar = 1;
  var __importDefault = TitleBar$1 && TitleBar$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(TitleBar$1, "__esModule", { value: true });
  var TitleBar_1 = __importDefault(/* @__PURE__ */ requireTitleBar$1());
  TitleBar$1.default = TitleBar_1.default;
  return TitleBar$1;
}
var Toast$1 = {};
var Toast = {};
var hasRequiredToast$1;
function requireToast$1() {
  if (hasRequiredToast$1) return Toast;
  hasRequiredToast$1 = 1;
  (function(exports$1) {
    var __extends = Toast && Toast.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __importDefault = Toast && Toast.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.DEFAULT_TOAST_DURATION = void 0;
    var react_1 = __importDefault(require$$0);
    var actions_1 = require$$1$4;
    var context_1 = /* @__PURE__ */ requireContext();
    exports$1.DEFAULT_TOAST_DURATION = 5e3;
    var Toast$12 = (
      /** @class */
      function(_super) {
        __extends(Toast2, _super);
        function Toast2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        Toast2.prototype.componentDidMount = function() {
          var app = this.context;
          var _a = this.props, error = _a.error, content = _a.content, _b = _a.duration, duration = _b === void 0 ? exports$1.DEFAULT_TOAST_DURATION : _b, onDismiss = _a.onDismiss, action2 = _a.action;
          this.toast = actions_1.Toast.create(app, {
            message: content,
            duration,
            isError: error,
            action: (action2 === null || action2 === void 0 ? void 0 : action2.content) ? {
              content: action2 === null || action2 === void 0 ? void 0 : action2.content
            } : void 0
          });
          if (action2 === null || action2 === void 0 ? void 0 : action2.onAction) {
            this.toast.subscribe(actions_1.Toast.Action.ACTION, action2 === null || action2 === void 0 ? void 0 : action2.onAction);
          }
          this.toast.subscribe(actions_1.Toast.Action.CLEAR, onDismiss);
          this.toast.dispatch(actions_1.Toast.Action.SHOW);
        };
        Toast2.prototype.componentWillUnmount = function() {
          this.toast.unsubscribe();
        };
        Toast2.prototype.render = function() {
          return null;
        };
        Toast2.contextType = context_1.AppBridgeContext;
        return Toast2;
      }(react_1.default.PureComponent)
    );
    exports$1.default = Toast$12;
  })(Toast);
  return Toast;
}
var hasRequiredToast;
function requireToast() {
  if (hasRequiredToast) return Toast$1;
  hasRequiredToast = 1;
  var __importDefault = Toast$1 && Toast$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(Toast$1, "__esModule", { value: true });
  var Toast_1 = __importDefault(/* @__PURE__ */ requireToast$1());
  Toast$1.default = Toast_1.default;
  return Toast$1;
}
var unstable_Picker$1 = {};
var unstable_Picker = {};
var hasRequiredUnstable_Picker$1;
function requireUnstable_Picker$1() {
  if (hasRequiredUnstable_Picker$1) return unstable_Picker;
  hasRequiredUnstable_Picker$1 = 1;
  var __rest = unstable_Picker && unstable_Picker.__rest || function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  Object.defineProperty(unstable_Picker, "__esModule", { value: true });
  var react_1 = require$$0;
  var Picker_1 = require$$1$c;
  var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
  function Picker(_a) {
    var open = _a.open, onCancel = _a.onCancel, onSelect = _a.onSelect, onSearch = _a.onSearch, onLoadMore = _a.onLoadMore, options = __rest(_a, ["open", "onCancel", "onSelect", "onSearch", "onLoadMore"]);
    var app = (0, useAppBridge_1.useAppBridge)();
    var isUnmountedRef = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(function() {
      return function() {
        isUnmountedRef.current = true;
      };
    }, []);
    var openRef = (0, react_1.useRef)(false);
    var optionsRef = (0, react_1.useRef)(options);
    var picker = (0, react_1.useMemo)(function() {
      return (0, Picker_1.create)(app, optionsRef.current);
    }, [app]);
    (0, react_1.useEffect)(function() {
      openRef.current = false;
      return function() {
        if (openRef.current && isUnmountedRef.current) {
          picker.dispatch(Picker_1.Action.CANCEL);
        }
      };
    }, [picker]);
    (0, react_1.useEffect)(function() {
      if (open === openRef.current)
        return;
      openRef.current = open;
      if (open) {
        picker.dispatch(Picker_1.Action.OPEN);
      } else {
        picker.dispatch(Picker_1.Action.CANCEL);
      }
    }, [picker, open]);
    (0, react_1.useEffect)(function() {
      if (!onSelect)
        return;
      return picker.subscribe(Picker_1.Action.SELECT, function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        openRef.current = false;
        return onSelect.apply(void 0, args);
      });
    }, [picker, onSelect]);
    (0, react_1.useEffect)(function() {
      if (!onCancel)
        return;
      return picker.subscribe(Picker_1.Action.CANCEL, function() {
        openRef.current = false;
        return onCancel();
      });
    }, [picker, onCancel]);
    (0, react_1.useEffect)(function() {
      if (!onSearch)
        return;
      return picker.subscribe(Picker_1.Action.SEARCH, onSearch);
    }, [picker, onSearch]);
    (0, react_1.useEffect)(function() {
      if (!onLoadMore)
        return;
      return picker.subscribe(Picker_1.Action.LOAD_MORE, onLoadMore);
    }, [picker, onLoadMore]);
    (0, react_1.useEffect)(function() {
      var shouldUpdate = JSON.stringify(options) !== JSON.stringify(optionsRef.current);
      if (!shouldUpdate)
        return;
      optionsRef.current = options;
      picker.set(options, openRef.current);
    }, [picker, options]);
    return null;
  }
  unstable_Picker.default = Picker;
  return unstable_Picker;
}
var hasRequiredUnstable_Picker;
function requireUnstable_Picker() {
  if (hasRequiredUnstable_Picker) return unstable_Picker$1;
  hasRequiredUnstable_Picker = 1;
  var __importDefault = unstable_Picker$1 && unstable_Picker$1.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(unstable_Picker$1, "__esModule", { value: true });
  var unstable_Picker_1 = __importDefault(/* @__PURE__ */ requireUnstable_Picker$1());
  unstable_Picker$1.default = unstable_Picker_1.default;
  return unstable_Picker$1;
}
var hasRequiredComponents;
function requireComponents() {
  if (hasRequiredComponents) return components;
  hasRequiredComponents = 1;
  (function(exports$1) {
    var __createBinding = components && components.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = components && components.__exportStar || function(m, exports$12) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
    };
    var __importDefault = components && components.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.unstable_Picker = exports$1.Toast = exports$1.TitleBar = exports$1.ResourcePicker = exports$1.Provider = exports$1.NavigationMenu = exports$1.ModalContent = exports$1.Modal = exports$1.Loading = exports$1.ContextualSaveBar = void 0;
    var ContextualSaveBar_1 = /* @__PURE__ */ requireContextualSaveBar();
    Object.defineProperty(exports$1, "ContextualSaveBar", { enumerable: true, get: function() {
      return __importDefault(ContextualSaveBar_1).default;
    } });
    var Loading_1 = /* @__PURE__ */ requireLoading();
    Object.defineProperty(exports$1, "Loading", { enumerable: true, get: function() {
      return __importDefault(Loading_1).default;
    } });
    var Modal_1 = /* @__PURE__ */ requireModal();
    Object.defineProperty(exports$1, "Modal", { enumerable: true, get: function() {
      return __importDefault(Modal_1).default;
    } });
    Object.defineProperty(exports$1, "ModalContent", { enumerable: true, get: function() {
      return Modal_1.ModalContent;
    } });
    var NavigationMenu_1 = /* @__PURE__ */ requireNavigationMenu();
    Object.defineProperty(exports$1, "NavigationMenu", { enumerable: true, get: function() {
      return __importDefault(NavigationMenu_1).default;
    } });
    var Provider_1 = /* @__PURE__ */ requireProvider();
    Object.defineProperty(exports$1, "Provider", { enumerable: true, get: function() {
      return __importDefault(Provider_1).default;
    } });
    var ResourcePicker_1 = /* @__PURE__ */ requireResourcePicker();
    Object.defineProperty(exports$1, "ResourcePicker", { enumerable: true, get: function() {
      return __importDefault(ResourcePicker_1).default;
    } });
    var TitleBar_1 = /* @__PURE__ */ requireTitleBar();
    Object.defineProperty(exports$1, "TitleBar", { enumerable: true, get: function() {
      return __importDefault(TitleBar_1).default;
    } });
    var Toast_1 = /* @__PURE__ */ requireToast();
    Object.defineProperty(exports$1, "Toast", { enumerable: true, get: function() {
      return __importDefault(Toast_1).default;
    } });
    var unstable_Picker_1 = /* @__PURE__ */ requireUnstable_Picker();
    Object.defineProperty(exports$1, "unstable_Picker", { enumerable: true, get: function() {
      return __importDefault(unstable_Picker_1).default;
    } });
    __exportStar(/* @__PURE__ */ requireRoutePropagator(), exports$1);
    __exportStar(/* @__PURE__ */ requireClientRouter(), exports$1);
  })(components);
  return components;
}
var hasRequiredAppBridgeReact;
function requireAppBridgeReact() {
  if (hasRequiredAppBridgeReact) return appBridgeReact;
  hasRequiredAppBridgeReact = 1;
  (function(exports$1) {
    var __createBinding = appBridgeReact && appBridgeReact.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = appBridgeReact && appBridgeReact.__exportStar || function(m, exports$12) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, p)) __createBinding(exports$12, m, p);
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.useAppBridge = exports$1.Context = void 0;
    var context_1 = /* @__PURE__ */ requireContext();
    Object.defineProperty(exports$1, "Context", { enumerable: true, get: function() {
      return context_1.AppBridgeContext;
    } });
    var useAppBridge_1 = /* @__PURE__ */ requireUseAppBridge();
    Object.defineProperty(exports$1, "useAppBridge", { enumerable: true, get: function() {
      return useAppBridge_1.useAppBridge;
    } });
    __exportStar(/* @__PURE__ */ requireComponents(), exports$1);
    __exportStar(/* @__PURE__ */ requireHooks(), exports$1);
  })(appBridgeReact);
  return appBridgeReact;
}
var appBridgeReactExports = /* @__PURE__ */ requireAppBridgeReact();
function ShopifyAppBridge({ children, apiKey, host }) {
  const config = {
    apiKey,
    host,
    forceRedirect: true
  };
  return /* @__PURE__ */ jsx(appBridgeReactExports.Provider, { config, children });
}
let cryptoVar;
try {
  cryptoVar = crypto;
} catch (_e) {
}
var HashFormat;
(function(HashFormat2) {
  HashFormat2["Base64"] = "base64";
  HashFormat2["Hex"] = "hex";
})(HashFormat || (HashFormat = {}));
function isOK(resp) {
  return resp.statusCode >= 200 && resp.statusCode <= 299;
}
let abstractFetch = () => {
  throw new Error("Missing adapter implementation for 'abstractFetch' - make sure to import the appropriate adapter for your platform");
};
function setAbstractFetchFunc(func) {
  abstractFetch = func;
}
let abstractConvertRequest = () => {
  throw new Error("Missing adapter implementation for 'abstractConvertRequest' - make sure to import the appropriate adapter for your platform");
};
function setAbstractConvertRequestFunc(func) {
  abstractConvertRequest = func;
}
let abstractConvertIncomingResponse = () => Promise.resolve({});
let abstractConvertResponse = () => {
  throw new Error("Missing adapter implementation for 'abstractConvertResponse' - make sure to import the appropriate adapter for your platform");
};
function setAbstractConvertResponseFunc(func) {
  abstractConvertResponse = func;
}
let abstractConvertHeaders = () => {
  throw new Error("Missing adapter implementation for 'abstractConvertHeaders' - make sure to import the appropriate adapter for your platform");
};
function setAbstractConvertHeadersFunc(func) {
  abstractConvertHeaders = func;
}
let abstractRuntimeString = () => {
  throw new Error("Missing adapter implementation for 'abstractRuntimeString' - make sure to import the appropriate adapter for your platform");
};
function setAbstractRuntimeString(func) {
  abstractRuntimeString = func;
}
function canonicalizeHeaderName(hdr) {
  return hdr.replace(/(^|-)(\w+)/g, (_fullMatch, start, letters) => start + letters.slice(0, 1).toUpperCase() + letters.slice(1).toLowerCase());
}
function getHeaders(headers, needle_) {
  const result = [];
  if (!headers)
    return result;
  const needle = canonicalizeHeaderName(needle_);
  for (const [key, values] of Object.entries(headers)) {
    if (canonicalizeHeaderName(key) !== needle)
      continue;
    if (Array.isArray(values)) {
      result.push(...values);
    } else {
      result.push(values);
    }
  }
  return result;
}
function getHeader(headers, needle) {
  if (!headers)
    return void 0;
  return getHeaders(headers, needle)?.[0];
}
function addHeader(headers, key, value) {
  canonicalizeHeaders(headers);
  const canonKey = canonicalizeHeaderName(key);
  let list = headers[canonKey];
  if (!list) {
    list = [];
  } else if (!Array.isArray(list)) {
    list = [list];
  }
  headers[canonKey] = list;
  list.push(value);
}
function canonicalizeValue(value) {
  if (typeof value === "number")
    return value.toString();
  return value;
}
function canonicalizeHeaders(hdr) {
  for (const [key, values] of Object.entries(hdr)) {
    const canonKey = canonicalizeHeaderName(key);
    if (!hdr[canonKey])
      hdr[canonKey] = [];
    if (!Array.isArray(hdr[canonKey]))
      hdr[canonKey] = [canonicalizeValue(hdr[canonKey])];
    if (key === canonKey)
      continue;
    delete hdr[key];
    hdr[canonKey].push(...[values].flat().map((value) => canonicalizeValue(value)));
  }
  return hdr;
}
function removeHeader(headers, needle) {
  canonicalizeHeaders(headers);
  const canonKey = canonicalizeHeaderName(needle);
  delete headers[canonKey];
}
function flatHeaders(headers) {
  if (!headers)
    return [];
  return Object.entries(headers).flatMap(([header, values]) => Array.isArray(values) ? values.map((value) => [header, value]) : [[header, values]]);
}
async function webApiConvertRequest(adapterArgs) {
  const request2 = adapterArgs.rawRequest;
  const headers = {};
  for (const [key, value] of request2.headers.entries()) {
    addHeader(headers, key, value);
  }
  return {
    headers,
    method: request2.method ?? "GET",
    url: new URL(request2.url).toString()
  };
}
async function webApiConvertHeaders(headers, _adapterArgs) {
  const remixHeaders = new Headers();
  flatHeaders(headers ?? {}).forEach(([key, value]) => remixHeaders.append(key, value));
  return Promise.resolve(remixHeaders);
}
async function webApiConvertResponse(resp, adapterArgs) {
  return new Response(resp.body, {
    status: resp.statusCode,
    statusText: resp.statusText,
    headers: await webApiConvertHeaders(resp.headers ?? {})
  });
}
function webApiRuntimeString() {
  return "Web API";
}
setAbstractFetchFunc(fetch);
setAbstractConvertRequestFunc(webApiConvertRequest);
setAbstractConvertResponseFunc(webApiConvertResponse);
setAbstractConvertHeadersFunc(webApiConvertHeaders);
setAbstractRuntimeString(webApiRuntimeString);
class ShopifyError extends Error {
  constructor(message2) {
    super(message2);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
class InvalidHmacError extends ShopifyError {
}
class InvalidShopError extends ShopifyError {
}
class InvalidHostError extends ShopifyError {
}
class InvalidJwtError extends ShopifyError {
}
class MissingJwtTokenError extends ShopifyError {
}
class InvalidDeliveryMethodError extends ShopifyError {
}
class SafeCompareError extends ShopifyError {
}
class PrivateAppError extends ShopifyError {
}
class HttpRequestError extends ShopifyError {
}
class HttpMaxRetriesError extends ShopifyError {
}
class HttpResponseError extends ShopifyError {
  response;
  constructor({ message: message2, code, statusText, body, headers }) {
    super(message2);
    this.response = {
      code,
      statusText,
      body,
      headers
    };
  }
}
class HttpRetriableError extends HttpResponseError {
}
class HttpInternalError extends HttpRetriableError {
}
class HttpThrottlingError extends HttpRetriableError {
  constructor({ retryAfter, ...params }) {
    super(params);
    this.response.retryAfter = retryAfter;
  }
}
class GraphqlQueryError extends ShopifyError {
  response;
  headers;
  body;
  constructor({ message: message2, response, headers, body }) {
    super(message2);
    this.response = response;
    this.headers = headers;
    this.body = body;
  }
}
class InvalidOAuthError extends ShopifyError {
}
class BotActivityDetected extends ShopifyError {
}
class CookieNotFound extends ShopifyError {
}
class InvalidSession extends ShopifyError {
}
class InvalidWebhookError extends ShopifyError {
  response;
  constructor({ message: message2, response }) {
    super(message2);
    this.response = response;
  }
}
class MissingWebhookCallbackError extends InvalidWebhookError {
}
class MissingRequiredArgument extends ShopifyError {
}
class InvalidRequestError extends ShopifyError {
}
class BillingError extends ShopifyError {
  errorData;
  constructor({ message: message2, errorData }) {
    super(message2);
    this.errorData = errorData;
  }
}
class FeatureDeprecatedError extends ShopifyError {
}
async function createSHA256HMAC(secret, payload, returnFormat = HashFormat.Base64) {
  const cryptoLib = typeof cryptoVar?.webcrypto === "undefined" ? cryptoVar : cryptoVar.webcrypto;
  const enc = new TextEncoder();
  const key = await cryptoLib.subtle.importKey("raw", enc.encode(secret), {
    name: "HMAC",
    hash: { name: "SHA-256" }
  }, false, ["sign"]);
  const signature = await cryptoLib.subtle.sign("HMAC", key, enc.encode(payload));
  return returnFormat === HashFormat.Base64 ? asBase64(signature) : asHex(signature);
}
function asHex(buffer) {
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
const LookupTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function asBase64(buffer) {
  let output = "";
  const input = new Uint8Array(buffer);
  for (let i = 0; i < input.length; ) {
    const byte1 = input[i++];
    const byte2 = input[i++];
    const byte3 = input[i++];
    const enc1 = byte1 >> 2;
    const enc2 = (byte1 & 3) << 4 | byte2 >> 4;
    let enc3 = (byte2 & 15) << 2 | byte3 >> 6;
    let enc4 = byte3 & 63;
    if (isNaN(byte2)) {
      enc3 = 64;
    }
    if (isNaN(byte3)) {
      enc4 = 64;
    }
    output += LookupTable[enc1] + LookupTable[enc2] + LookupTable[enc3] + LookupTable[enc4];
  }
  return output;
}
function hashString(str, returnFormat) {
  const buffer = new TextEncoder().encode(str);
  switch (returnFormat) {
    case HashFormat.Base64:
      return asBase64(buffer);
    case HashFormat.Hex:
      return asHex(buffer);
    default:
      throw new ShopifyError(`Unrecognized hash format '${returnFormat}'`);
  }
}
function splitN(str, sep, maxNumParts) {
  const parts = str.split(sep);
  const maxParts = Math.min(Math.abs(maxNumParts), parts.length);
  return [...parts.slice(0, maxParts - 1), parts.slice(maxParts - 1).join(sep)];
}
class Cookies {
  response;
  static parseCookies(hdrs) {
    const entries = hdrs.filter((hdr) => hdr.trim().length > 0).map((cookieDef) => {
      const [keyval, ...opts] = cookieDef.split(";");
      const [name, value] = splitN(keyval, "=", 2).map((value2) => value2.trim());
      return [
        name,
        {
          name,
          value,
          ...Object.fromEntries(opts.map((opt) => splitN(opt, "=", 2).map((value2) => value2.trim())))
        }
      ];
    });
    const jar = Object.fromEntries(entries);
    for (const cookie of Object.values(jar)) {
      if (typeof cookie.expires === "string") {
        cookie.expires = new Date(cookie.expires);
      }
    }
    return jar;
  }
  static encodeCookie(data) {
    let result = "";
    result += `${data.name}=${data.value};`;
    result += Object.entries(data).filter(([key]) => !["name", "value", "expires"].includes(key)).map(([key, value]) => `${key}=${value}`).join("; ");
    if (data.expires) {
      result += ";";
      result += `expires=${data.expires.toUTCString()}`;
    }
    return result;
  }
  receivedCookieJar = {};
  outgoingCookieJar = {};
  keys = [];
  constructor(request2, response, { keys = [] } = {}) {
    this.response = response;
    if (keys)
      this.keys = keys;
    const cookieReqHdr = getHeader(request2.headers, "Cookie") ?? "";
    this.receivedCookieJar = Cookies.parseCookies(cookieReqHdr.split(";"));
    const cookieResHdr = getHeaders(response.headers, "Set-Cookie") ?? [];
    this.outgoingCookieJar = Cookies.parseCookies(cookieResHdr);
  }
  toHeaders() {
    return Object.values(this.outgoingCookieJar).map((cookie) => Cookies.encodeCookie(cookie));
  }
  updateHeader() {
    if (!this.response.headers) {
      this.response.headers = {};
    }
    removeHeader(this.response.headers, "Set-Cookie");
    this.toHeaders().map((hdr) => addHeader(this.response.headers, "Set-Cookie", hdr));
  }
  get(name) {
    return this.receivedCookieJar[name]?.value;
  }
  deleteCookie(name) {
    this.set(name, "", {
      path: "/",
      expires: /* @__PURE__ */ new Date(0)
    });
  }
  async getAndVerify(name) {
    const value = this.get(name);
    if (!value)
      return void 0;
    if (!await this.isSignedCookieValid(name)) {
      return void 0;
    }
    return value;
  }
  get canSign() {
    return this.keys?.length > 0;
  }
  set(name, value, opts = {}) {
    this.outgoingCookieJar[name] = {
      ...opts,
      name,
      value
    };
    this.updateHeader();
  }
  async setAndSign(name, value, opts = {}) {
    if (!this.canSign) {
      throw Error("No keys provided for signing.");
    }
    this.set(name, value, opts);
    const sigName = `${name}.sig`;
    const signature = await createSHA256HMAC(this.keys[0], value);
    this.set(sigName, signature, opts);
    this.updateHeader();
  }
  async isSignedCookieValid(cookieName) {
    const signedCookieName = `${cookieName}.sig`;
    if (!this.cookieExists(cookieName) || !this.cookieExists(signedCookieName)) {
      this.deleteInvalidCookies(cookieName, signedCookieName);
      return false;
    }
    const cookieValue = this.get(cookieName);
    const signature = this.get(signedCookieName);
    if (!cookieValue || !signature) {
      this.deleteInvalidCookies(cookieName, signedCookieName);
      return false;
    }
    const allCheckSignatures = await Promise.all(this.keys.map((key) => createSHA256HMAC(key, cookieValue)));
    if (!allCheckSignatures.includes(signature)) {
      this.deleteInvalidCookies(cookieName, signedCookieName);
      return false;
    }
    return true;
  }
  cookieExists(cookieName) {
    return Boolean(this.get(cookieName));
  }
  deleteInvalidCookies(...cookieNames) {
    cookieNames.forEach((cookieName) => this.deleteCookie(cookieName));
  }
}
const semver$3 = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
const validateAndParse = (version2) => {
  if (typeof version2 !== "string") {
    throw new TypeError("Invalid argument expected string");
  }
  const match = version2.match(semver$3);
  if (!match) {
    throw new Error(`Invalid argument not valid semver ('${version2}' received)`);
  }
  match.shift();
  return match;
};
const isWildcard = (s) => s === "*" || s === "x" || s === "X";
const tryParse = (v) => {
  const n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};
const forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
const compareStrings = (a, b) => {
  if (isWildcard(a) || isWildcard(b))
    return 0;
  const [ap, bp] = forceType(tryParse(a), tryParse(b));
  if (ap > bp)
    return 1;
  if (ap < bp)
    return -1;
  return 0;
};
const compareSegments = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const r = compareStrings(a[i] || "0", b[i] || "0");
    if (r !== 0)
      return r;
  }
  return 0;
};
const compareVersions = (v1, v2) => {
  const n1 = validateAndParse(v1);
  const n2 = validateAndParse(v2);
  const p1 = n1.pop();
  const p2 = n2.pop();
  const r = compareSegments(n1, n2);
  if (r !== 0)
    return r;
  if (p1 && p2) {
    return compareSegments(p1.split("."), p2.split("."));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }
  return 0;
};
const compare = (v1, v2, operator) => {
  assertValidOperator(operator);
  const res = compareVersions(v1, v2);
  return operatorResMap[operator].includes(res);
};
const operatorResMap = {
  ">": [1],
  ">=": [0, 1],
  "=": [0],
  "<=": [-1, 0],
  "<": [-1],
  "!=": [-1, 1]
};
const allowedOperators = Object.keys(operatorResMap);
const assertValidOperator = (op) => {
  if (allowedOperators.indexOf(op) === -1) {
    throw new Error(`Invalid operator, expected one of ${allowedOperators.join("|")}`);
  }
};
var LogSeverity;
(function(LogSeverity2) {
  LogSeverity2[LogSeverity2["Error"] = 0] = "Error";
  LogSeverity2[LogSeverity2["Warning"] = 1] = "Warning";
  LogSeverity2[LogSeverity2["Info"] = 2] = "Info";
  LogSeverity2[LogSeverity2["Debug"] = 3] = "Debug";
})(LogSeverity || (LogSeverity = {}));
var ApiVersion;
(function(ApiVersion2) {
  ApiVersion2["October22"] = "2022-10";
  ApiVersion2["January23"] = "2023-01";
  ApiVersion2["April23"] = "2023-04";
  ApiVersion2["July23"] = "2023-07";
  ApiVersion2["October23"] = "2023-10";
  ApiVersion2["January24"] = "2024-01";
  ApiVersion2["April24"] = "2024-04";
  ApiVersion2["July24"] = "2024-07";
  ApiVersion2["October24"] = "2024-10";
  ApiVersion2["January25"] = "2025-01";
  ApiVersion2["April25"] = "2025-04";
  ApiVersion2["July25"] = "2025-07";
  ApiVersion2["October25"] = "2025-10";
  ApiVersion2["Unstable"] = "unstable";
})(ApiVersion || (ApiVersion = {}));
const LIBRARY_NAME = "Shopify API Library";
const LATEST_API_VERSION = ApiVersion.July25;
ApiVersion.October25;
var ShopifyHeader;
(function(ShopifyHeader2) {
  ShopifyHeader2["AccessToken"] = "X-Shopify-Access-Token";
  ShopifyHeader2["ApiVersion"] = "X-Shopify-API-Version";
  ShopifyHeader2["Domain"] = "X-Shopify-Shop-Domain";
  ShopifyHeader2["Hmac"] = "X-Shopify-Hmac-Sha256";
  ShopifyHeader2["Topic"] = "X-Shopify-Topic";
  ShopifyHeader2["SubTopic"] = "X-Shopify-Sub-Topic";
  ShopifyHeader2["WebhookId"] = "X-Shopify-Webhook-Id";
  ShopifyHeader2["StorefrontPrivateToken"] = "Shopify-Storefront-Private-Token";
  ShopifyHeader2["StorefrontSDKVariant"] = "X-SDK-Variant";
  ShopifyHeader2["StorefrontSDKVersion"] = "X-SDK-Version";
})(ShopifyHeader || (ShopifyHeader = {}));
var ClientType;
(function(ClientType2) {
  ClientType2["Rest"] = "rest";
  ClientType2["Graphql"] = "graphql";
})(ClientType || (ClientType = {}));
const privacyTopics = [
  "CUSTOMERS_DATA_REQUEST",
  "CUSTOMERS_REDACT",
  "SHOP_REDACT"
];
var BillingInterval;
(function(BillingInterval2) {
  BillingInterval2["OneTime"] = "ONE_TIME";
  BillingInterval2["Every30Days"] = "EVERY_30_DAYS";
  BillingInterval2["Annual"] = "ANNUAL";
  BillingInterval2["Usage"] = "USAGE";
})(BillingInterval || (BillingInterval = {}));
var BillingReplacementBehavior;
(function(BillingReplacementBehavior2) {
  BillingReplacementBehavior2["ApplyImmediately"] = "APPLY_IMMEDIATELY";
  BillingReplacementBehavior2["ApplyOnNextBillingCycle"] = "APPLY_ON_NEXT_BILLING_CYCLE";
  BillingReplacementBehavior2["Standard"] = "STANDARD";
})(BillingReplacementBehavior || (BillingReplacementBehavior = {}));
const SHOPIFY_API_LIBRARY_VERSION = "11.14.1";
function log(config) {
  return function(severity, message2, context2 = {}) {
    if (severity > config.logger.level) {
      return;
    }
    const prefix = [];
    if (config.logger.timestamps) {
      prefix.push(`${(/* @__PURE__ */ new Date()).toISOString().slice(0, -5)}Z`);
    }
    let packageString = context2.package || "shopify-api";
    delete context2.package;
    switch (severity) {
      case LogSeverity.Debug:
        packageString = `${packageString}/DEBUG`;
        break;
      case LogSeverity.Info:
        packageString = `${packageString}/INFO`;
        break;
      case LogSeverity.Warning:
        packageString = `${packageString}/WARNING`;
        break;
      case LogSeverity.Error:
        packageString = `${packageString}/ERROR`;
        break;
    }
    prefix.push(packageString);
    const contextParts = [];
    Object.entries(context2).forEach(([key, value]) => {
      contextParts.push(`${key}: ${value}`);
    });
    let suffix = "";
    if (contextParts.length > 0) {
      suffix = ` | {${contextParts.join(", ")}}`;
    }
    config.logger.log(severity, `[${prefix.join("] [")}] ${message2}${suffix}`);
  };
}
function logger(config) {
  const logFunction = log(config);
  return {
    log: logFunction,
    debug: async (message2, context2 = {}) => logFunction(LogSeverity.Debug, message2, context2),
    info: async (message2, context2 = {}) => logFunction(LogSeverity.Info, message2, context2),
    warning: async (message2, context2 = {}) => logFunction(LogSeverity.Warning, message2, context2),
    error: async (message2, context2 = {}) => logFunction(LogSeverity.Error, message2, context2),
    deprecated: deprecated(logFunction)
  };
}
function deprecated(logFunction) {
  return function(version2, message2) {
    if (compare(SHOPIFY_API_LIBRARY_VERSION, version2, ">=")) {
      throw new FeatureDeprecatedError(`Feature was deprecated in version ${version2}`);
    }
    return logFunction(LogSeverity.Warning, `[Deprecated | ${version2}] ${message2}`);
  };
}
function loadRestResources({ resources, config, RestClient: RestClient2 }) {
  const firstResource = Object.keys(resources)[0];
  if (config.apiVersion !== resources[firstResource].apiVersion) {
    logger(config).warning(`Loading REST resources for API version ${resources[firstResource].apiVersion}, which doesn't match the default ${config.apiVersion}`);
  }
  return Object.fromEntries(Object.entries(resources).map(([name, resource]) => {
    class NewResource extends resource {
    }
    NewResource.setClassProperties({
      Client: RestClient2,
      config
    });
    Object.entries(NewResource.hasOne).map(([_attribute, klass]) => {
      klass.setClassProperties({
        Client: RestClient2,
        config
      });
    });
    Object.entries(NewResource.hasMany).map(([_attribute, klass]) => {
      klass.setClassProperties({
        Client: RestClient2,
        config
      });
    });
    Reflect.defineProperty(NewResource, "name", {
      value: name
    });
    return [name, NewResource];
  }));
}
function logDisabledFutureFlags$1(config, logger2) {
  if (!config._logDisabledFutureFlags) {
    return;
  }
  const logFlag = (flag, message2) => logger2.info(`Future flag ${flag} is disabled.

  ${message2}
`);
  if (!config.future?.lineItemBilling) {
    logFlag("lineItemBilling", "Enable this flag to use the new billing API, that supports multiple line items per plan.");
  }
  if (config.future?.v10_lineItemBilling) {
    logger2.deprecated("12.0.0", "v10_lineItemBilling will become enabled in v11. Use flag lineItemBilling instead");
  }
  if (!config.future?.customerAddressDefaultFix) {
    logFlag("customerAddressDefaultFix", "Enable this flag to change the CustomerAddress classes to expose a 'is_default' property instead of 'default' when fetching data.");
  }
  if (!config.future?.unstable_managedPricingSupport) {
    logFlag("unstable_managedPricingSupport", "Enable this flag to support managed pricing, so apps can check for payments without needing a billing config. Learn more at https://shopify.dev/docs/apps/launch/billing/managed-pricing");
  }
}
class AuthScopes {
  static SCOPE_DELIMITER = ",";
  compressedScopes;
  expandedScopes;
  originalScopes;
  constructor(scopes) {
    let scopesArray = [];
    if (typeof scopes === "string") {
      scopesArray = scopes.split(new RegExp(`${AuthScopes.SCOPE_DELIMITER}\\s*`));
    } else if (Array.isArray(scopes)) {
      scopesArray = scopes;
    } else if (scopes) {
      scopesArray = Array.from(scopes.expandedScopes);
    }
    scopesArray = scopesArray.map((scope) => scope.trim()).filter((scope) => scope.length);
    const impliedScopes = this.getImpliedScopes(scopesArray);
    const scopeSet = new Set(scopesArray);
    const impliedSet = new Set(impliedScopes);
    this.compressedScopes = new Set([...scopeSet].filter((x) => !impliedSet.has(x)));
    this.expandedScopes = /* @__PURE__ */ new Set([...scopeSet, ...impliedSet]);
    this.originalScopes = scopeSet;
  }
  /**
   * Checks whether the current set of scopes includes the given one.
   */
  has(scope) {
    let other;
    if (scope instanceof AuthScopes) {
      other = scope;
    } else {
      other = new AuthScopes(scope);
    }
    return other.toArray().filter((x) => !this.expandedScopes.has(x)).length === 0;
  }
  /**
   * Checks whether the current set of scopes equals the given one.
   */
  equals(otherScopes) {
    let other;
    if (otherScopes instanceof AuthScopes) {
      other = otherScopes;
    } else {
      other = new AuthScopes(otherScopes);
    }
    return this.compressedScopes.size === other.compressedScopes.size && this.toArray().filter((x) => !other.has(x)).length === 0;
  }
  /**
   * Returns a comma-separated string with the current set of scopes.
   */
  toString() {
    return this.toArray().join(AuthScopes.SCOPE_DELIMITER);
  }
  /**
   * Returns an array with the current set of scopes.
   */
  toArray(returnOriginalScopes = false) {
    return returnOriginalScopes ? [...this.originalScopes] : [...this.compressedScopes];
  }
  getImpliedScopes(scopesArray) {
    return scopesArray.reduce((array, current) => {
      const matches = current.match(/^(unauthenticated_)?write_(.*)$/);
      if (matches) {
        array.push(`${matches[1] ? matches[1] : ""}read_${matches[2]}`);
      }
      return array;
    }, []);
  }
}
function validateConfig(params) {
  const config = {
    apiKey: "",
    apiSecretKey: "",
    hostName: "",
    hostScheme: "https",
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
    isCustomStoreApp: false,
    logger: {
      log: defaultLogFunction,
      level: LogSeverity.Info,
      httpRequests: false,
      timestamps: false
    },
    future: {},
    _logDisabledFutureFlags: true
  };
  const mandatory = ["apiSecretKey", "hostName"];
  if (!("isCustomStoreApp" in params) || !params.isCustomStoreApp) {
    mandatory.push("apiKey");
  }
  if ("isCustomStoreApp" in params && params.isCustomStoreApp) {
    if (!("adminApiAccessToken" in params) || params.adminApiAccessToken?.length === 0) {
      mandatory.push("adminApiAccessToken");
    }
  }
  const missing = [];
  mandatory.forEach((key) => {
    if (!notEmpty(params[key])) {
      missing.push(key);
    }
  });
  if (missing.length) {
    throw new ShopifyError(`Cannot initialize Shopify API Library. Missing values for: ${missing.join(", ")}`);
  }
  const future2 = params.future?.v10_lineItemBilling ? {
    lineItemBilling: params.future?.v10_lineItemBilling,
    ...params.future
  } : params.future;
  const { hostScheme, isCustomStoreApp, adminApiAccessToken, userAgentPrefix, logger: logger$1, privateAppStorefrontAccessToken, customShopDomains, billing, ...mandatoryParams } = params;
  let scopes;
  if (params.scopes === void 0) {
    scopes = void 0;
  } else if (params.scopes instanceof AuthScopes) {
    scopes = params.scopes;
  } else {
    scopes = new AuthScopes(params.scopes);
  }
  Object.assign(config, mandatoryParams, {
    hostName: params.hostName.replace(/\/$/, ""),
    scopes,
    hostScheme: hostScheme ?? config.hostScheme,
    isCustomStoreApp: isCustomStoreApp ?? config.isCustomStoreApp,
    adminApiAccessToken: adminApiAccessToken ?? config.adminApiAccessToken,
    userAgentPrefix: userAgentPrefix ?? config.userAgentPrefix,
    logger: { ...config.logger, ...logger$1 || {} },
    privateAppStorefrontAccessToken: privateAppStorefrontAccessToken ?? config.privateAppStorefrontAccessToken,
    customShopDomains: customShopDomains ?? config.customShopDomains,
    billing: billing ?? config.billing,
    future: future2 ?? config.future
  });
  if (config.isCustomStoreApp && params.adminApiAccessToken === params.apiSecretKey) {
    logger(config).warning("adminApiAccessToken is set to the same value as apiSecretKey. adminApiAccessToken should be set to the Admin API access token for custom store apps; apiSecretKey should be set to the custom store app's API secret key.");
  }
  return config;
}
function notEmpty(value) {
  if (value == null) {
    return false;
  }
  return typeof value === "string" || Array.isArray(value) ? value.length > 0 : true;
}
function defaultLogFunction(severity, message2) {
  switch (severity) {
    case LogSeverity.Debug:
      console.debug(message2);
      break;
    case LogSeverity.Info:
      console.log(message2);
      break;
    case LogSeverity.Warning:
      console.warn(message2);
      break;
    case LogSeverity.Error:
      console.error(message2);
      break;
  }
}
const CLIENT$2 = "GraphQL Client";
const MIN_RETRIES = 0;
const MAX_RETRIES = 3;
const GQL_API_ERROR = "An error occurred while fetching from the API. Review 'graphQLErrors' for details.";
const UNEXPECTED_CONTENT_TYPE_ERROR = "Response returned unexpected Content-Type:";
const NO_DATA_OR_ERRORS_ERROR = "An unknown error has occurred. The API did not return a data object or any errors in its response.";
const CONTENT_TYPES = {
  json: "application/json",
  multipart: "multipart/mixed"
};
const SDK_VARIANT_HEADER$1 = "X-SDK-Variant";
const SDK_VERSION_HEADER$1 = "X-SDK-Version";
const DEFAULT_SDK_VARIANT$1 = "shopify-graphql-client";
const DEFAULT_CLIENT_VERSION$2 = "1.4.1";
const RETRY_WAIT_TIME = 1e3;
const RETRIABLE_STATUS_CODES$1 = [429, 503];
const DEFER_OPERATION_REGEX = /@(defer)\b/i;
const NEWLINE_SEPARATOR = "\r\n";
const BOUNDARY_HEADER_REGEX = /boundary="?([^=";]+)"?/i;
const HEADER_SEPARATOR = NEWLINE_SEPARATOR + NEWLINE_SEPARATOR;
function formatErrorMessage(message2, client = CLIENT$2) {
  return message2.startsWith(`${client}`) ? message2 : `${client}: ${message2}`;
}
function getErrorMessage(error) {
  return error instanceof Error ? error.message : JSON.stringify(error);
}
function getErrorCause(error) {
  return error instanceof Error && error.cause ? error.cause : void 0;
}
function combineErrors(dataArray) {
  return dataArray.flatMap(({ errors }) => {
    return errors ?? [];
  });
}
function validateRetries({ client, retries }) {
  if (retries !== void 0 && (typeof retries !== "number" || retries < MIN_RETRIES || retries > MAX_RETRIES)) {
    throw new Error(`${client}: The provided "retries" value (${retries}) is invalid - it cannot be less than ${MIN_RETRIES} or greater than ${MAX_RETRIES}`);
  }
}
function getKeyValueIfValid(key, value) {
  return value && (typeof value !== "object" || Array.isArray(value) || typeof value === "object" && Object.keys(value).length > 0) ? { [key]: value } : {};
}
function buildDataObjectByPath(path, data) {
  if (path.length === 0) {
    return data;
  }
  const key = path.pop();
  const newData = {
    [key]: data
  };
  if (path.length === 0) {
    return newData;
  }
  return buildDataObjectByPath(path, newData);
}
function combineObjects(baseObject, newObject) {
  return Object.keys(newObject || {}).reduce((acc, key) => {
    if ((typeof newObject[key] === "object" || Array.isArray(newObject[key])) && baseObject[key]) {
      acc[key] = combineObjects(baseObject[key], newObject[key]);
      return acc;
    }
    acc[key] = newObject[key];
    return acc;
  }, Array.isArray(baseObject) ? [...baseObject] : { ...baseObject });
}
function buildCombinedDataObject([initialDatum, ...remainingData]) {
  return remainingData.reduce(combineObjects, { ...initialDatum });
}
function generateHttpFetch({ clientLogger, customFetchApi = fetch, client = CLIENT$2, defaultRetryWaitTime = RETRY_WAIT_TIME, retriableCodes = RETRIABLE_STATUS_CODES$1 }) {
  const httpFetch = async (requestParams, count, maxRetries) => {
    const nextCount = count + 1;
    const maxTries = maxRetries + 1;
    let response;
    try {
      response = await customFetchApi(...requestParams);
      clientLogger({
        type: "HTTP-Response",
        content: {
          requestParams,
          response
        }
      });
      if (!response.ok && retriableCodes.includes(response.status) && nextCount <= maxTries) {
        throw new Error();
      }
      const deprecationNotice = response?.headers.get("X-Shopify-API-Deprecated-Reason") || "";
      if (deprecationNotice) {
        clientLogger({
          type: "HTTP-Response-GraphQL-Deprecation-Notice",
          content: {
            requestParams,
            deprecationNotice
          }
        });
      }
      return response;
    } catch (error) {
      if (nextCount <= maxTries) {
        const retryAfter = response?.headers.get("Retry-After");
        await sleep(retryAfter ? parseInt(retryAfter, 10) : defaultRetryWaitTime);
        clientLogger({
          type: "HTTP-Retry",
          content: {
            requestParams,
            lastResponse: response,
            retryAttempt: count,
            maxRetries
          }
        });
        return httpFetch(requestParams, nextCount, maxRetries);
      }
      throw new Error(formatErrorMessage(`${maxRetries > 0 ? `Attempted maximum number of ${maxRetries} network retries. Last message - ` : ""}${getErrorMessage(error)}`, client));
    }
  };
  return httpFetch;
}
async function sleep(waitTime) {
  return new Promise((resolve) => setTimeout(resolve, waitTime));
}
function createGraphQLClient({ headers, url, customFetchApi = fetch, retries = 0, logger: logger2 }) {
  validateRetries({ client: CLIENT$2, retries });
  const config = {
    headers,
    url,
    retries
  };
  const clientLogger = generateClientLogger$1(logger2);
  const httpFetch = generateHttpFetch({
    customFetchApi,
    clientLogger,
    defaultRetryWaitTime: RETRY_WAIT_TIME
  });
  const fetchFn = generateFetch(httpFetch, config);
  const request2 = generateRequest(fetchFn);
  const requestStream = generateRequestStream(fetchFn);
  return {
    config,
    fetch: fetchFn,
    request: request2,
    requestStream
  };
}
function generateClientLogger$1(logger2) {
  return (logContent) => {
    if (logger2) {
      logger2(logContent);
    }
  };
}
async function processJSONResponse(response) {
  const { errors, data, extensions } = await response.json();
  return {
    ...getKeyValueIfValid("data", data),
    ...getKeyValueIfValid("extensions", extensions),
    headers: response.headers,
    ...errors || !data ? {
      errors: {
        networkStatusCode: response.status,
        message: formatErrorMessage(errors ? GQL_API_ERROR : NO_DATA_OR_ERRORS_ERROR),
        ...getKeyValueIfValid("graphQLErrors", errors),
        response
      }
    } : {}
  };
}
function generateFetch(httpFetch, { url, headers, retries }) {
  return async (operation, options = {}) => {
    const { variables, headers: overrideHeaders, url: overrideUrl, retries: overrideRetries, keepalive, signal } = options;
    const body = JSON.stringify({
      query: operation,
      variables
    });
    validateRetries({ client: CLIENT$2, retries: overrideRetries });
    const flatHeaders2 = Object.entries({
      ...headers,
      ...overrideHeaders
    }).reduce((headers2, [key, value]) => {
      headers2[key] = Array.isArray(value) ? value.join(", ") : value.toString();
      return headers2;
    }, {});
    if (!flatHeaders2[SDK_VARIANT_HEADER$1] && !flatHeaders2[SDK_VERSION_HEADER$1]) {
      flatHeaders2[SDK_VARIANT_HEADER$1] = DEFAULT_SDK_VARIANT$1;
      flatHeaders2[SDK_VERSION_HEADER$1] = DEFAULT_CLIENT_VERSION$2;
    }
    const fetchParams = [
      overrideUrl ?? url,
      {
        method: "POST",
        headers: flatHeaders2,
        body,
        signal,
        keepalive
      }
    ];
    return httpFetch(fetchParams, 1, overrideRetries ?? retries);
  };
}
function generateRequest(fetchFn) {
  return async (...props) => {
    if (DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation will result in a streamable response - use requestStream() instead."));
    }
    let response = null;
    try {
      response = await fetchFn(...props);
      const { status, statusText } = response;
      const contentType = response.headers.get("content-type") || "";
      if (!response.ok) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(statusText),
            response
          }
        };
      }
      if (!contentType.includes(CONTENT_TYPES.json)) {
        return {
          errors: {
            networkStatusCode: status,
            message: formatErrorMessage(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${contentType}`),
            response
          }
        };
      }
      return await processJSONResponse(response);
    } catch (error) {
      return {
        errors: {
          message: getErrorMessage(error),
          ...response == null ? {} : {
            networkStatusCode: response.status,
            response
          }
        }
      };
    }
  };
}
async function* getStreamBodyIterator(response) {
  const decoder2 = new TextDecoder();
  if (response.body[Symbol.asyncIterator]) {
    for await (const chunk of response.body) {
      yield decoder2.decode(chunk);
    }
  } else {
    const reader = response.body.getReader();
    let readResult;
    try {
      while (!(readResult = await reader.read()).done) {
        yield decoder2.decode(readResult.value);
      }
    } finally {
      reader.cancel();
    }
  }
}
function readStreamChunk(streamBodyIterator, boundary) {
  return {
    async *[Symbol.asyncIterator]() {
      try {
        let buffer = "";
        for await (const textChunk of streamBodyIterator) {
          buffer += textChunk;
          if (buffer.indexOf(boundary) > -1) {
            const lastBoundaryIndex = buffer.lastIndexOf(boundary);
            const fullResponses = buffer.slice(0, lastBoundaryIndex);
            const chunkBodies = fullResponses.split(boundary).filter((chunk) => chunk.trim().length > 0).map((chunk) => {
              const body = chunk.slice(chunk.indexOf(HEADER_SEPARATOR) + HEADER_SEPARATOR.length).trim();
              return body;
            });
            if (chunkBodies.length > 0) {
              yield chunkBodies;
            }
            buffer = buffer.slice(lastBoundaryIndex + boundary.length);
            if (buffer.trim() === `--`) {
              buffer = "";
            }
          }
        }
      } catch (error) {
        throw new Error(`Error occured while processing stream payload - ${getErrorMessage(error)}`);
      }
    }
  };
}
function createJsonResponseAsyncIterator(response) {
  return {
    async *[Symbol.asyncIterator]() {
      const processedResponse = await processJSONResponse(response);
      yield {
        ...processedResponse,
        hasNext: false
      };
    }
  };
}
function getResponseDataFromChunkBodies(chunkBodies) {
  return chunkBodies.map((value) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Error in parsing multipart response - ${getErrorMessage(error)}`);
    }
  }).map((payload) => {
    const { data, incremental, hasNext, extensions, errors } = payload;
    if (!incremental) {
      return {
        data: data || {},
        ...getKeyValueIfValid("errors", errors),
        ...getKeyValueIfValid("extensions", extensions),
        hasNext
      };
    }
    const incrementalArray = incremental.map(({ data: data2, path, errors: errors2 }) => {
      return {
        data: data2 && path ? buildDataObjectByPath(path, data2) : {},
        ...getKeyValueIfValid("errors", errors2)
      };
    });
    return {
      data: incrementalArray.length === 1 ? incrementalArray[0].data : buildCombinedDataObject([
        ...incrementalArray.map(({ data: data2 }) => data2)
      ]),
      ...getKeyValueIfValid("errors", combineErrors(incrementalArray)),
      hasNext
    };
  });
}
function validateResponseData(responseErrors, combinedData) {
  if (responseErrors.length > 0) {
    throw new Error(GQL_API_ERROR, {
      cause: {
        graphQLErrors: responseErrors
      }
    });
  }
  if (Object.keys(combinedData).length === 0) {
    throw new Error(NO_DATA_OR_ERRORS_ERROR);
  }
}
function createMultipartResponseAsyncInterator(response, responseContentType) {
  const boundaryHeader = (responseContentType ?? "").match(BOUNDARY_HEADER_REGEX);
  const boundary = `--${boundaryHeader ? boundaryHeader[1] : "-"}`;
  if (!response.body?.getReader && !response.body?.[Symbol.asyncIterator]) {
    throw new Error("API multipart response did not return an iterable body", {
      cause: response
    });
  }
  const streamBodyIterator = getStreamBodyIterator(response);
  let combinedData = {};
  let responseExtensions;
  return {
    async *[Symbol.asyncIterator]() {
      try {
        let streamHasNext = true;
        for await (const chunkBodies of readStreamChunk(streamBodyIterator, boundary)) {
          const responseData = getResponseDataFromChunkBodies(chunkBodies);
          responseExtensions = responseData.find((datum) => datum.extensions)?.extensions ?? responseExtensions;
          const responseErrors = combineErrors(responseData);
          combinedData = buildCombinedDataObject([
            combinedData,
            ...responseData.map(({ data }) => data)
          ]);
          streamHasNext = responseData.slice(-1)[0].hasNext;
          validateResponseData(responseErrors, combinedData);
          yield {
            ...getKeyValueIfValid("data", combinedData),
            ...getKeyValueIfValid("extensions", responseExtensions),
            hasNext: streamHasNext
          };
        }
        if (streamHasNext) {
          throw new Error(`Response stream terminated unexpectedly`);
        }
      } catch (error) {
        const cause = getErrorCause(error);
        yield {
          ...getKeyValueIfValid("data", combinedData),
          ...getKeyValueIfValid("extensions", responseExtensions),
          errors: {
            message: formatErrorMessage(getErrorMessage(error)),
            networkStatusCode: response.status,
            ...getKeyValueIfValid("graphQLErrors", cause?.graphQLErrors),
            response
          },
          hasNext: false
        };
      }
    }
  };
}
function generateRequestStream(fetchFn) {
  return async (...props) => {
    if (!DEFER_OPERATION_REGEX.test(props[0])) {
      throw new Error(formatErrorMessage("This operation does not result in a streamable response - use request() instead."));
    }
    try {
      const response = await fetchFn(...props);
      const { statusText } = response;
      if (!response.ok) {
        throw new Error(statusText, { cause: response });
      }
      const responseContentType = response.headers.get("content-type") || "";
      switch (true) {
        case responseContentType.includes(CONTENT_TYPES.json):
          return createJsonResponseAsyncIterator(response);
        case responseContentType.includes(CONTENT_TYPES.multipart):
          return createMultipartResponseAsyncInterator(response, responseContentType);
        default:
          throw new Error(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${responseContentType}`, { cause: response });
      }
    } catch (error) {
      return {
        async *[Symbol.asyncIterator]() {
          const response = getErrorCause(error);
          yield {
            errors: {
              message: formatErrorMessage(getErrorMessage(error)),
              ...getKeyValueIfValid("networkStatusCode", response?.status),
              ...getKeyValueIfValid("response", response)
            },
            hasNext: false
          };
        }
      };
    }
  };
}
function validateDomainAndGetStoreUrl({ client, storeDomain }) {
  try {
    if (!storeDomain || typeof storeDomain !== "string") {
      throw new Error();
    }
    const trimmedDomain = storeDomain.trim();
    const protocolUrl = trimmedDomain.match(/^https?:/) ? trimmedDomain : `https://${trimmedDomain}`;
    const url = new URL(protocolUrl);
    url.protocol = "https";
    return url.origin;
  } catch (error) {
    throw new Error(`${client}: a valid store domain ("${storeDomain}") must be provided`, { cause: error });
  }
}
function validateApiVersion({ client, currentSupportedApiVersions, apiVersion, logger: logger2 }) {
  const versionError = `${client}: the provided apiVersion ("${apiVersion}")`;
  const supportedVersion = `Currently supported API versions: ${currentSupportedApiVersions.join(", ")}`;
  if (!apiVersion || typeof apiVersion !== "string") {
    throw new Error(`${versionError} is invalid. ${supportedVersion}`);
  }
  const trimmedApiVersion = apiVersion.trim();
  if (!currentSupportedApiVersions.includes(trimmedApiVersion)) {
    if (logger2) {
      logger2({
        type: "Unsupported_Api_Version",
        content: {
          apiVersion,
          supportedApiVersions: currentSupportedApiVersions
        }
      });
    } else {
      console.warn(`${versionError} is likely deprecated or not supported. ${supportedVersion}`);
    }
  }
}
function getQuarterMonth(quarter) {
  const month = quarter * 3 - 2;
  return month === 10 ? month : `0${month}`;
}
function getPrevousVersion(year2, quarter, nQuarter) {
  const versionQuarter = quarter - nQuarter;
  if (versionQuarter <= 0) {
    return `${year2 - 1}-${getQuarterMonth(versionQuarter + 4)}`;
  }
  return `${year2}-${getQuarterMonth(versionQuarter)}`;
}
function getCurrentApiVersion() {
  const date = /* @__PURE__ */ new Date();
  const month = date.getUTCMonth();
  const year2 = date.getUTCFullYear();
  const quarter = Math.floor(month / 3 + 1);
  return {
    year: year2,
    quarter,
    version: `${year2}-${getQuarterMonth(quarter)}`
  };
}
function getCurrentSupportedApiVersions() {
  const { year: year2, quarter, version: currentVersion } = getCurrentApiVersion();
  const nextVersion = quarter === 4 ? `${year2 + 1}-01` : `${year2}-${getQuarterMonth(quarter + 1)}`;
  return [
    getPrevousVersion(year2, quarter, 3),
    getPrevousVersion(year2, quarter, 2),
    getPrevousVersion(year2, quarter, 1),
    currentVersion,
    nextVersion,
    "unstable"
  ];
}
function generateGetHeaders(config) {
  return (customHeaders) => {
    return { ...customHeaders ?? {}, ...config.headers };
  };
}
function generateGetGQLClientParams({ getHeaders: getHeaders2, getApiUrl }) {
  return (operation, options) => {
    const props = [operation];
    if (options && Object.keys(options).length > 0) {
      const { variables, apiVersion: propApiVersion, headers, retries, signal } = options;
      props.push({
        ...variables ? { variables } : {},
        ...headers ? { headers: getHeaders2(headers) } : {},
        ...propApiVersion ? { url: getApiUrl(propApiVersion) } : {},
        ...retries ? { retries } : {},
        ...signal ? { signal } : {}
      });
    }
    return props;
  };
}
const DEFAULT_CONTENT_TYPE$1 = "application/json";
const DEFAULT_CLIENT_VERSION$1 = "1.1.1";
const ACCESS_TOKEN_HEADER = "X-Shopify-Access-Token";
const CLIENT$1 = "Admin API Client";
const RETRIABLE_STATUS_CODES = [429, 500, 503];
const DEFAULT_RETRY_WAIT_TIME = 1e3;
function validateRequiredAccessToken(accessToken) {
  if (!accessToken) {
    throw new Error(`${CLIENT$1}: an access token must be provided`);
  }
}
function validateServerSideUsage(isTesting = false) {
  if (typeof window !== "undefined" && !isTesting) {
    throw new Error(`${CLIENT$1}: this client should not be used in the browser`);
  }
}
function createAdminApiClient({ storeDomain, apiVersion, accessToken, userAgentPrefix, retries = 0, customFetchApi, logger: logger2, isTesting }) {
  const currentSupportedApiVersions = getCurrentSupportedApiVersions();
  const storeUrl = validateDomainAndGetStoreUrl({
    client: CLIENT$1,
    storeDomain
  });
  const baseApiVersionValidationParams = {
    client: CLIENT$1,
    currentSupportedApiVersions,
    logger: logger2
  };
  validateServerSideUsage(isTesting);
  validateApiVersion({
    client: CLIENT$1,
    currentSupportedApiVersions,
    apiVersion,
    logger: logger2
  });
  validateRequiredAccessToken(accessToken);
  const apiUrlFormatter = generateApiUrlFormatter$2(storeUrl, apiVersion, baseApiVersionValidationParams);
  const config = {
    storeDomain: storeUrl,
    apiVersion,
    accessToken,
    headers: {
      "Content-Type": DEFAULT_CONTENT_TYPE$1,
      Accept: DEFAULT_CONTENT_TYPE$1,
      [ACCESS_TOKEN_HEADER]: accessToken,
      "User-Agent": `${userAgentPrefix ? `${userAgentPrefix} | ` : ""}${CLIENT$1} v${DEFAULT_CLIENT_VERSION$1}`
    },
    apiUrl: apiUrlFormatter(),
    userAgentPrefix
  };
  const graphqlClient = createGraphQLClient({
    headers: config.headers,
    url: config.apiUrl,
    retries,
    customFetchApi,
    logger: logger2
  });
  const getHeaders2 = generateGetHeaders(config);
  const getApiUrl = generateGetApiUrl$1(config, apiUrlFormatter);
  const getGQLClientParams = generateGetGQLClientParams({
    getHeaders: getHeaders2,
    getApiUrl
  });
  const client = {
    config,
    getHeaders: getHeaders2,
    getApiUrl,
    fetch: (...props) => {
      return graphqlClient.fetch(...getGQLClientParams(...props));
    },
    request: (...props) => {
      return graphqlClient.request(...getGQLClientParams(...props));
    }
  };
  return Object.freeze(client);
}
function generateApiUrlFormatter$2(storeUrl, defaultApiVersion, baseApiVersionValidationParams) {
  return (apiVersion) => {
    if (apiVersion) {
      validateApiVersion({
        ...baseApiVersionValidationParams,
        apiVersion
      });
    }
    const urlApiVersion = (apiVersion ?? defaultApiVersion).trim();
    return `${storeUrl}/admin/api/${urlApiVersion}/graphql.json`;
  };
}
function generateGetApiUrl$1(config, apiUrlFormatter) {
  return (propApiVersion) => {
    return propApiVersion ? apiUrlFormatter(propApiVersion) : config.apiUrl;
  };
}
var Method$1;
(function(Method2) {
  Method2["Get"] = "GET";
  Method2["Post"] = "POST";
  Method2["Put"] = "PUT";
  Method2["Delete"] = "DELETE";
})(Method$1 || (Method$1 = {}));
function createAdminRestApiClient({ storeDomain, apiVersion, accessToken, userAgentPrefix, logger: logger2, customFetchApi = fetch, retries: clientRetries = 0, scheme = "https", defaultRetryTime = DEFAULT_RETRY_WAIT_TIME, formatPaths = true, isTesting }) {
  const currentSupportedApiVersions = getCurrentSupportedApiVersions();
  const storeUrl = validateDomainAndGetStoreUrl({
    client: CLIENT$1,
    storeDomain
  }).replace("https://", `${scheme}://`);
  const baseApiVersionValidationParams = {
    client: CLIENT$1,
    currentSupportedApiVersions,
    logger: logger2
  };
  validateServerSideUsage(isTesting);
  validateApiVersion({
    client: CLIENT$1,
    currentSupportedApiVersions,
    apiVersion,
    logger: logger2
  });
  validateRequiredAccessToken(accessToken);
  validateRetries({ client: CLIENT$1, retries: clientRetries });
  const apiUrlFormatter = generateApiUrlFormatter$1(storeUrl, apiVersion, baseApiVersionValidationParams, formatPaths);
  const clientLogger = generateClientLogger(logger2);
  const httpFetch = generateHttpFetch({
    customFetchApi,
    clientLogger,
    defaultRetryWaitTime: defaultRetryTime,
    client: CLIENT$1,
    retriableCodes: RETRIABLE_STATUS_CODES
  });
  const request2 = async (path, { method, data, headers: requestHeadersObj, searchParams, retries = 0, apiVersion: apiVersion2 }) => {
    validateRetries({ client: CLIENT$1, retries });
    const url = apiUrlFormatter(path, searchParams ?? {}, apiVersion2);
    const requestHeaders = normalizedHeaders(requestHeadersObj ?? {});
    const userAgent = [
      ...requestHeaders["user-agent"] ? [requestHeaders["user-agent"]] : [],
      ...userAgentPrefix ? [userAgentPrefix] : [],
      `${CLIENT$1} v${DEFAULT_CLIENT_VERSION$1}`
    ].join(" | ");
    const headers = normalizedHeaders({
      "Content-Type": DEFAULT_CONTENT_TYPE$1,
      ...requestHeaders,
      Accept: DEFAULT_CONTENT_TYPE$1,
      [ACCESS_TOKEN_HEADER]: accessToken,
      "User-Agent": userAgent
    });
    const body = data && typeof data !== "string" ? JSON.stringify(data) : data;
    return httpFetch([url, { method, headers, ...body ? { body } : void 0 }], 1, retries ?? clientRetries);
  };
  return {
    get: (path, options) => request2(path, { method: Method$1.Get, ...options }),
    put: (path, options) => request2(path, { method: Method$1.Put, ...options }),
    post: (path, options) => request2(path, { method: Method$1.Post, ...options }),
    delete: (path, options) => request2(path, { method: Method$1.Delete, ...options })
  };
}
function generateApiUrlFormatter$1(storeUrl, defaultApiVersion, baseApiVersionValidationParams, formatPaths = true) {
  return (path, searchParams, apiVersion) => {
    if (apiVersion) {
      validateApiVersion({
        ...baseApiVersionValidationParams,
        apiVersion
      });
    }
    function convertValue(params2, key, value) {
      if (Array.isArray(value)) {
        value.forEach((arrayValue) => convertValue(params2, `${key}[]`, arrayValue));
        return;
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([objKey, objValue]) => convertValue(params2, `${key}[${objKey}]`, objValue));
        return;
      }
      params2.append(key, String(value));
    }
    const urlApiVersion = (apiVersion ?? defaultApiVersion).trim();
    let cleanPath = path.replace(/^\//, "");
    if (formatPaths) {
      if (!cleanPath.startsWith("admin")) {
        cleanPath = `admin/api/${urlApiVersion}/${cleanPath}`;
      }
      if (!cleanPath.endsWith(".json")) {
        cleanPath = `${cleanPath}.json`;
      }
    }
    const params = new URLSearchParams();
    if (searchParams) {
      for (const [key, value] of Object.entries(searchParams)) {
        convertValue(params, key, value);
      }
    }
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return `${storeUrl}/${cleanPath}${queryString}`;
  };
}
function generateClientLogger(logger2) {
  return (logContent) => {
    if (logger2) {
      logger2(logContent);
    }
  };
}
function normalizedHeaders(headersObj) {
  const normalizedHeaders2 = {};
  for (const [key, value] of Object.entries(headersObj)) {
    normalizedHeaders2[key.toLowerCase()] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  return normalizedHeaders2;
}
let Method;
(function(Method2) {
  Method2["Get"] = "GET";
  Method2["Post"] = "POST";
  Method2["Put"] = "PUT";
  Method2["Patch"] = "PATCH";
  Method2["Delete"] = "DELETE";
  Method2["Head"] = "HEAD";
  Method2["Options"] = "OPTIONS";
  Method2["Connect"] = "CONNECT";
})(Method || (Method = {}));
let StatusCode;
(function(StatusCode2) {
  StatusCode2[StatusCode2["Continue"] = 100] = "Continue";
  StatusCode2[StatusCode2["SwitchingProtocols"] = 101] = "SwitchingProtocols";
  StatusCode2[StatusCode2["Ok"] = 200] = "Ok";
  StatusCode2[StatusCode2["Created"] = 201] = "Created";
  StatusCode2[StatusCode2["Accepted"] = 202] = "Accepted";
  StatusCode2[StatusCode2["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
  StatusCode2[StatusCode2["NoContent"] = 204] = "NoContent";
  StatusCode2[StatusCode2["ResetContent"] = 205] = "ResetContent";
  StatusCode2[StatusCode2["PartialContent"] = 206] = "PartialContent";
  StatusCode2[StatusCode2["MultipleChoices"] = 300] = "MultipleChoices";
  StatusCode2[StatusCode2["MovedPermanently"] = 301] = "MovedPermanently";
  StatusCode2[StatusCode2["Found"] = 302] = "Found";
  StatusCode2[StatusCode2["SeeOther"] = 303] = "SeeOther";
  StatusCode2[StatusCode2["NotModified"] = 304] = "NotModified";
  StatusCode2[StatusCode2["UseProxy"] = 305] = "UseProxy";
  StatusCode2[StatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
  StatusCode2[StatusCode2["BadRequest"] = 400] = "BadRequest";
  StatusCode2[StatusCode2["Unauthorized"] = 401] = "Unauthorized";
  StatusCode2[StatusCode2["PaymentRequired"] = 402] = "PaymentRequired";
  StatusCode2[StatusCode2["Forbidden"] = 403] = "Forbidden";
  StatusCode2[StatusCode2["NotFound"] = 404] = "NotFound";
  StatusCode2[StatusCode2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
  StatusCode2[StatusCode2["NotAcceptable"] = 406] = "NotAcceptable";
  StatusCode2[StatusCode2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
  StatusCode2[StatusCode2["RequestTimeout"] = 408] = "RequestTimeout";
  StatusCode2[StatusCode2["Conflict"] = 409] = "Conflict";
  StatusCode2[StatusCode2["Gone"] = 410] = "Gone";
  StatusCode2[StatusCode2["LengthRequired"] = 411] = "LengthRequired";
  StatusCode2[StatusCode2["PreconditionFailed"] = 412] = "PreconditionFailed";
  StatusCode2[StatusCode2["RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
  StatusCode2[StatusCode2["RequestUriTooLong"] = 414] = "RequestUriTooLong";
  StatusCode2[StatusCode2["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
  StatusCode2[StatusCode2["RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
  StatusCode2[StatusCode2["ExpectationFailed"] = 417] = "ExpectationFailed";
  StatusCode2[StatusCode2["ImATeapot"] = 418] = "ImATeapot";
  StatusCode2[StatusCode2["UnprocessableEntity"] = 422] = "UnprocessableEntity";
  StatusCode2[StatusCode2["TooManyRequests"] = 429] = "TooManyRequests";
  StatusCode2[StatusCode2["InternalServerError"] = 500] = "InternalServerError";
  StatusCode2[StatusCode2["NotImplemented"] = 501] = "NotImplemented";
  StatusCode2[StatusCode2["BadGateway"] = 502] = "BadGateway";
  StatusCode2[StatusCode2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
  StatusCode2[StatusCode2["GatewayTimeout"] = 504] = "GatewayTimeout";
  StatusCode2[StatusCode2["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
})(StatusCode || (StatusCode = {}));
let Header;
(function(Header2) {
  Header2["Accept"] = "Accept";
  Header2["AcceptEncoding"] = "Accept-Encoding";
  Header2["AcceptLanguage"] = "Accept-Language";
  Header2["AccessControlAllowCredentials"] = "Access-Control-Allow-Credentials";
  Header2["AccessControlAllowHeaders"] = "Access-Control-Allow-Headers";
  Header2["AccessControlAllowMethods"] = "Access-Control-Allow-Methods";
  Header2["AccessControlAllowOrigin"] = "Access-Control-Allow-Origin";
  Header2["AccessControlExposeHeaders"] = "Access-Control-Expose-Headers";
  Header2["AccessControlMaxAge"] = "Access-Control-Max-Age";
  Header2["AccessControlRequestHeaders"] = "Access-Control-Request-Headers";
  Header2["AccessControlRequestMethod"] = "Access-Control-Request-Method";
  Header2["Authorization"] = "Authorization";
  Header2["CacheControl"] = "Cache-Control";
  Header2["CacheStatus"] = "Cache-Status";
  Header2["Connection"] = "Connection";
  Header2["ContentDisposition"] = "Content-Disposition";
  Header2["ContentEncoding"] = "Content-Encoding";
  Header2["ContentLength"] = "Content-Length";
  Header2["ContentSecurityPolicy"] = "Content-Security-Policy";
  Header2["ContentSecurityPolicyReportOnly"] = "Content-Security-Policy-Report-Only";
  Header2["ContentType"] = "Content-Type";
  Header2["ContentTypeOptions"] = "X-Content-Type-Options";
  Header2["Cookie"] = "Cookie";
  Header2["DownloadOptions"] = "X-Download-Options";
  Header2["ETag"] = "ETag";
  Header2["Forwarded"] = "Forwarded";
  Header2["ForwardedFor"] = "X-Forwarded-For";
  Header2["ForwardedHost"] = "X-Forwarded-Host";
  Header2["ForwardedProtocol"] = "X-Forwarded-Proto";
  Header2["FrameOptions"] = "X-Frame-Options";
  Header2["Host"] = "Host";
  Header2["IfNoneMatch"] = "If-None-Match";
  Header2["Location"] = "Location";
  Header2["Origin"] = "Origin";
  Header2["ReferrerPolicy"] = "Referrer-Policy";
  Header2["ServerTiming"] = "Server-Timing";
  Header2["StrictTransportSecurity"] = "Strict-Transport-Security";
  Header2["TimingAllowOrigin"] = "Timing-Allow-Origin";
  Header2["Trailer"] = "Trailer";
  Header2["TransferEncoding"] = "Transfer-Encoding";
  Header2["UserAgent"] = "User-Agent";
  Header2["WwwAuthenticate"] = "WWW-Authenticate";
  Header2["XhrRedirectedTo"] = "X-XHR-Redirected-To";
  Header2["XhrReferer"] = "X-XHR-Referer";
  Header2["XssProtecton"] = "X-XSS-Protection";
  Header2["XContentTypeOptions"] = "X-Content-Type-Options";
  Header2["XDownloadOptions"] = "X-Download-Options";
  Header2["XForwardedFor"] = "X-Forwarded-For";
  Header2["XForwardedHost"] = "X-Forwarded-Host";
  Header2["XForwardedProto"] = "X-Forwarded-Proto";
  Header2["XFrameOptions"] = "X-Frame-Options";
  Header2["XXhrRedirectedTo"] = "X-XHR-Redirected-To";
  Header2["XXhrReferer"] = "X-XHR-Referer";
  Header2["XXssProtecton"] = "X-XSS-Protection";
  Header2["XXssProtection"] = "X-XSS-Protection";
})(Header || (Header = {}));
let CspDirective;
(function(CspDirective2) {
  CspDirective2["ChildSrc"] = "child-src";
  CspDirective2["ConnectSrc"] = "connect-src";
  CspDirective2["DefaultSrc"] = "default-src";
  CspDirective2["FontSrc"] = "font-src";
  CspDirective2["FrameSrc"] = "frame-src";
  CspDirective2["ImgSrc"] = "img-src";
  CspDirective2["ManifestSrc"] = "manifest-src";
  CspDirective2["MediaSrc"] = "media-src";
  CspDirective2["ObjectSrc"] = "object-src";
  CspDirective2["PrefetchSrc"] = "prefetch-src";
  CspDirective2["ScriptSrc"] = "script-src";
  CspDirective2["StyleSrc"] = "style-src";
  CspDirective2["WebrtcSrc"] = "webrtc-src";
  CspDirective2["WorkerSrc"] = "worker-src";
  CspDirective2["BaseUri"] = "base-uri";
  CspDirective2["PluginTypes"] = "plugin-types";
  CspDirective2["Sandbox"] = "sandbox";
  CspDirective2["FormAction"] = "form-action";
  CspDirective2["FrameAncestors"] = "frame-ancestors";
  CspDirective2["ReportUri"] = "report-uri";
  CspDirective2["BlockAllMixedContent"] = "block-all-mixed-content";
  CspDirective2["RequireSriFor"] = "require-sri-for";
  CspDirective2["UpgradeInsecureRequests"] = "upgrade-insecure-requests";
})(CspDirective || (CspDirective = {}));
let CspSandboxAllow;
(function(CspSandboxAllow2) {
  CspSandboxAllow2["Forms"] = "allow-forms";
  CspSandboxAllow2["SameOrigin"] = "allow-same-origin";
  CspSandboxAllow2["Scripts"] = "allow-scripts";
  CspSandboxAllow2["Popups"] = "allow-popups";
  CspSandboxAllow2["Modals"] = "allow-modals";
  CspSandboxAllow2["OrientationLock"] = "allow-orientation-lock";
  CspSandboxAllow2["PointerLock"] = "allow-pointer-lock";
  CspSandboxAllow2["Presentation"] = "allow-presentation";
  CspSandboxAllow2["PopupsToEscapeSandbox"] = "allow-popups-to-escape-sandbox";
  CspSandboxAllow2["TopNavigation"] = "allow-top-navigation";
})(CspSandboxAllow || (CspSandboxAllow = {}));
let SpecialSource;
(function(SpecialSource2) {
  SpecialSource2["Any"] = "*";
  SpecialSource2["Self"] = "'self'";
  SpecialSource2["UnsafeInline"] = "'unsafe-inline'";
  SpecialSource2["UnsafeEval"] = "'unsafe-eval'";
  SpecialSource2["None"] = "'none'";
  SpecialSource2["StrictDynamic"] = "'strict-dynamic'";
  SpecialSource2["ReportSample"] = "'report-sample'";
  SpecialSource2["Data"] = "data:";
  SpecialSource2["Blob"] = "blob:";
  SpecialSource2["FileSystem"] = "filesystem:";
})(SpecialSource || (SpecialSource = {}));
let SriAsset;
(function(SriAsset2) {
  SriAsset2["Script"] = "script";
  SriAsset2["Style"] = "style";
})(SriAsset || (SriAsset = {}));
let HashAlgorithm;
(function(HashAlgorithm2) {
  HashAlgorithm2["Sha256"] = "sha256";
  HashAlgorithm2["Sha384"] = "sha384";
  HashAlgorithm2["Sha512"] = "sha512";
})(HashAlgorithm || (HashAlgorithm = {}));
let ResponseType;
(function(ResponseType2) {
  ResponseType2["Informational"] = "1xx";
  ResponseType2["Success"] = "2xx";
  ResponseType2["Redirection"] = "3xx";
  ResponseType2["ClientError"] = "4xx";
  ResponseType2["ServerError"] = "5xx";
  ResponseType2["Unknown"] = "Unknown";
})(ResponseType || (ResponseType = {}));
let CacheControl;
(function(CacheControl2) {
  CacheControl2["NoCache"] = "no-cache";
  CacheControl2["NoStore"] = "no-store";
  CacheControl2["MustRevalidate"] = "must-revalidate";
  CacheControl2["MaxAge"] = "max-age";
})(CacheControl || (CacheControl = {}));
`${CacheControl.NoCache},${CacheControl.NoStore},${CacheControl.MustRevalidate},${CacheControl.MaxAge}=0`;
function getUserAgent(config) {
  let userAgentPrefix = `${LIBRARY_NAME} v${SHOPIFY_API_LIBRARY_VERSION} | ${abstractRuntimeString()}`;
  if (config.userAgentPrefix) {
    userAgentPrefix = `${config.userAgentPrefix} | ${userAgentPrefix}`;
  }
  return userAgentPrefix;
}
function serializeResponse(response) {
  if (!response) {
    return { error: "No response object provided" };
  }
  try {
    const { status, statusText, ok, redirected, type, url, headers } = response;
    const serialized = {
      status,
      statusText,
      ok,
      redirected,
      type,
      url
    };
    if (headers?.entries) {
      serialized.headers = Object.fromEntries(headers.entries());
    } else if (headers) {
      serialized.headers = headers;
    }
    return serialized;
  } catch {
    return response;
  }
}
function clientLoggerFactory(config) {
  return (logContent) => {
    if (config.logger.httpRequests) {
      switch (logContent.type) {
        case "HTTP-Response": {
          const responseLog = logContent.content;
          logger(config).debug("Received response for HTTP request", {
            requestParams: JSON.stringify(responseLog.requestParams),
            response: JSON.stringify(serializeResponse(responseLog.response))
          });
          break;
        }
        case "HTTP-Retry": {
          const responseLog = logContent.content;
          logger(config).debug("Retrying HTTP request", {
            requestParams: JSON.stringify(responseLog.requestParams),
            retryAttempt: responseLog.retryAttempt,
            maxRetries: responseLog.maxRetries,
            response: responseLog.lastResponse ? JSON.stringify(serializeResponse(responseLog.lastResponse)) : "undefined"
          });
          break;
        }
        case "HTTP-Response-GraphQL-Deprecation-Notice": {
          const responseLog = logContent.content;
          logger(config).debug("Received response containing Deprecated GraphQL Notice", {
            requestParams: JSON.stringify(responseLog.requestParams),
            deprecationNotice: responseLog.deprecationNotice
          });
          break;
        }
        default: {
          logger(config).debug(`HTTP request event: ${logContent.content}`);
          break;
        }
      }
    }
  };
}
function throwFailedRequest(body, atMaxRetries, response) {
  if (typeof response === "undefined") {
    const message2 = body?.errors?.message ?? "";
    throw new HttpRequestError(`Http request error, no response available: ${message2}`);
  }
  const responseHeaders = canonicalizeHeaders(Object.fromEntries(response.headers.entries() ?? []));
  if (response.status === StatusCode.Ok && body.errors.graphQLErrors) {
    throw new GraphqlQueryError({
      message: body.errors.graphQLErrors?.[0].message ?? "GraphQL operation failed",
      response,
      headers: responseHeaders,
      body
    });
  }
  const errorMessages = [];
  if (body.errors) {
    errorMessages.push(JSON.stringify(body.errors, null, 2));
  }
  const xRequestId = getHeader(responseHeaders, "x-request-id");
  if (xRequestId) {
    errorMessages.push(`If you report this error, please include this id: ${xRequestId}`);
  }
  const errorMessage = errorMessages.length ? `:
${errorMessages.join("\n")}` : "";
  const code = response.status;
  const statusText = response.statusText;
  switch (true) {
    case response.status === StatusCode.TooManyRequests: {
      if (atMaxRetries) {
        throw new HttpMaxRetriesError("Attempted the maximum number of retries for HTTP request.");
      } else {
        const retryAfter = getHeader(responseHeaders, "Retry-After");
        throw new HttpThrottlingError({
          message: `Shopify is throttling requests ${errorMessage}`,
          code,
          statusText,
          body,
          headers: responseHeaders,
          retryAfter: retryAfter ? parseFloat(retryAfter) : void 0
        });
      }
    }
    case response.status >= StatusCode.InternalServerError:
      if (atMaxRetries) {
        throw new HttpMaxRetriesError("Attempted the maximum number of retries for HTTP request.");
      } else {
        throw new HttpInternalError({
          message: `Shopify internal error${errorMessage}`,
          code,
          statusText,
          body,
          headers: responseHeaders
        });
      }
    default:
      throw new HttpResponseError({
        message: `Received an error response (${response.status} ${response.statusText}) from Shopify${errorMessage}`,
        code,
        statusText,
        body,
        headers: responseHeaders
      });
  }
}
class GraphqlClient {
  static config;
  session;
  client;
  apiVersion;
  constructor(params) {
    const config = this.graphqlClass().config;
    if (!config.isCustomStoreApp && !params.session.accessToken) {
      throw new MissingRequiredArgument("Missing access token when creating GraphQL client");
    }
    if (params.apiVersion) {
      const message2 = params.apiVersion === config.apiVersion ? `Admin client has a redundant API version override to the default ${params.apiVersion}` : `Admin client overriding default API version ${config.apiVersion} with ${params.apiVersion}`;
      logger(config).debug(message2);
    }
    this.session = params.session;
    this.apiVersion = params.apiVersion;
    this.client = createAdminApiClient({
      accessToken: config.adminApiAccessToken ?? this.session.accessToken,
      apiVersion: this.apiVersion ?? config.apiVersion,
      storeDomain: this.session.shop,
      customFetchApi: abstractFetch,
      logger: clientLoggerFactory(config),
      userAgentPrefix: getUserAgent(config),
      isTesting: config.isTesting
    });
  }
  async query(params) {
    logger(this.graphqlClass().config).deprecated("12.0.0", "The query method is deprecated, and was replaced with the request method.\nSee the migration guide: https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-api/docs/migrating-to-v9.md#using-the-new-clients.");
    if (typeof params.data === "string" && params.data.length === 0 || Object.entries(params.data).length === 0) {
      throw new MissingRequiredArgument("Query missing.");
    }
    let operation;
    let variables;
    if (typeof params.data === "string") {
      operation = params.data;
    } else {
      operation = params.data.query;
      variables = params.data.variables;
    }
    const headers = Object.fromEntries(Object.entries(params?.extraHeaders ?? {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(", ") : value.toString()
    ]));
    const response = await this.request(operation, {
      headers,
      retries: params.tries ? params.tries - 1 : void 0,
      variables
    });
    return { body: response, headers: {} };
  }
  async request(operation, options) {
    const response = await this.client.request(operation, {
      apiVersion: this.apiVersion || this.graphqlClass().config.apiVersion,
      ...options
    });
    if (response.errors) {
      const fetchResponse = response.errors.response;
      throwFailedRequest(response, (options?.retries ?? 0) > 0, fetchResponse);
    }
    const headerObject = Object.fromEntries(response.headers ? response.headers.entries() : []);
    return {
      ...response,
      headers: canonicalizeHeaders(headerObject ?? {})
    };
  }
  graphqlClass() {
    return this.constructor;
  }
}
function graphqlClientClass({ config }) {
  class NewGraphqlClient extends GraphqlClient {
    static config = config;
  }
  Reflect.defineProperty(NewGraphqlClient, "name", {
    value: "GraphqlClient"
  });
  return NewGraphqlClient;
}
class RestClient {
  static config;
  static formatPaths;
  static LINK_HEADER_REGEXP = /<([^<]+)>; rel="([^"]+)"/;
  static DEFAULT_LIMIT = "50";
  static RETRY_WAIT_TIME = 1e3;
  static DEPRECATION_ALERT_DELAY = 3e5;
  loggedDeprecations = {};
  client;
  session;
  apiVersion;
  constructor({ session, apiVersion }) {
    const config = this.restClass().config;
    if (!config.isCustomStoreApp && !session.accessToken) {
      throw new MissingRequiredArgument("Missing access token when creating REST client");
    }
    if (apiVersion) {
      const message2 = apiVersion === config.apiVersion ? `REST client has a redundant API version override to the default ${apiVersion}` : `REST client overriding default API version ${config.apiVersion} with ${apiVersion}`;
      logger(config).debug(message2);
    }
    const customStoreAppAccessToken = config.adminApiAccessToken ?? config.apiSecretKey;
    this.session = session;
    this.apiVersion = apiVersion ?? config.apiVersion;
    this.client = createAdminRestApiClient({
      scheme: config.hostScheme,
      storeDomain: session.shop,
      apiVersion: apiVersion ?? config.apiVersion,
      accessToken: config.isCustomStoreApp ? customStoreAppAccessToken : session.accessToken,
      customFetchApi: abstractFetch,
      logger: clientLoggerFactory(config),
      userAgentPrefix: getUserAgent(config),
      defaultRetryTime: this.restClass().RETRY_WAIT_TIME,
      formatPaths: this.restClass().formatPaths,
      isTesting: config.isTesting
    });
  }
  /**
   * Performs a GET request on the given path.
   */
  async get(params) {
    return this.request({ method: Method.Get, ...params });
  }
  /**
   * Performs a POST request on the given path.
   */
  async post(params) {
    return this.request({ method: Method.Post, ...params });
  }
  /**
   * Performs a PUT request on the given path.
   */
  async put(params) {
    return this.request({ method: Method.Put, ...params });
  }
  /**
   * Performs a DELETE request on the given path.
   */
  async delete(params) {
    return this.request({ method: Method.Delete, ...params });
  }
  async request(params) {
    const requestParams = {
      headers: {
        ...params.extraHeaders,
        ...params.type ? { "Content-Type": params.type.toString() } : {}
      },
      retries: params.tries ? params.tries - 1 : void 0,
      searchParams: params.query
    };
    let response;
    switch (params.method) {
      case Method.Get:
        response = await this.client.get(params.path, requestParams);
        break;
      case Method.Put:
        response = await this.client.put(params.path, {
          ...requestParams,
          data: params.data
        });
        break;
      case Method.Post:
        response = await this.client.post(params.path, {
          ...requestParams,
          data: params.data
        });
        break;
      case Method.Delete:
        response = await this.client.delete(params.path, requestParams);
        break;
      default:
        throw new InvalidRequestError(`Unsupported request method '${params.method}'`);
    }
    const bodyString = await response.text();
    const body = params.method === Method.Delete && bodyString === "" ? {} : JSON.parse(bodyString);
    const responseHeaders = canonicalizeHeaders(Object.fromEntries(response.headers.entries()));
    if (!response.ok) {
      throwFailedRequest(body, (params.tries ?? 1) > 1, response);
    }
    const requestReturn = {
      body,
      headers: responseHeaders
    };
    await this.logDeprecations({
      method: params.method,
      url: params.path,
      headers: requestParams.headers,
      body: params.data ? JSON.stringify(params.data) : void 0
    }, requestReturn);
    const link = response.headers.get("Link");
    if (link !== void 0) {
      const pageInfo = {
        limit: params.query?.limit ? params.query?.limit.toString() : RestClient.DEFAULT_LIMIT
      };
      if (link) {
        const links = link.split(", ");
        for (const link2 of links) {
          const parsedLink = link2.match(RestClient.LINK_HEADER_REGEXP);
          if (!parsedLink) {
            continue;
          }
          const linkRel = parsedLink[2];
          const linkUrl = new URL(parsedLink[1]);
          const linkFields = linkUrl.searchParams.get("fields");
          const linkPageToken = linkUrl.searchParams.get("page_info");
          if (!pageInfo.fields && linkFields) {
            pageInfo.fields = linkFields.split(",");
          }
          if (linkPageToken) {
            switch (linkRel) {
              case "previous":
                pageInfo.previousPageUrl = parsedLink[1];
                pageInfo.prevPage = this.buildRequestParams(parsedLink[1]);
                break;
              case "next":
                pageInfo.nextPageUrl = parsedLink[1];
                pageInfo.nextPage = this.buildRequestParams(parsedLink[1]);
                break;
            }
          }
        }
      }
      requestReturn.pageInfo = pageInfo;
    }
    return requestReturn;
  }
  restClass() {
    return this.constructor;
  }
  buildRequestParams(newPageUrl) {
    const pattern = `^/admin/api/[^/]+/(.*).json$`;
    const url = new URL(newPageUrl);
    const path = url.pathname.replace(new RegExp(pattern), "$1");
    return {
      path,
      query: Object.fromEntries(url.searchParams.entries())
    };
  }
  async logDeprecations(request2, response) {
    const config = this.restClass().config;
    const deprecationReason = getHeader(response.headers, "X-Shopify-API-Deprecated-Reason");
    if (deprecationReason) {
      const deprecation = {
        message: deprecationReason,
        path: request2.url
      };
      if (request2.body) {
        deprecation.body = `${request2.body.substring(0, 100)}...`;
      }
      const depHash = await createSHA256HMAC(config.apiSecretKey, JSON.stringify(deprecation), HashFormat.Hex);
      if (!Object.keys(this.loggedDeprecations).includes(depHash) || Date.now() - this.loggedDeprecations[depHash] >= RestClient.DEPRECATION_ALERT_DELAY) {
        this.loggedDeprecations[depHash] = Date.now();
        const stack = new Error().stack;
        const message2 = `API Deprecation Notice ${(/* @__PURE__ */ new Date()).toLocaleString()} : ${JSON.stringify(deprecation)}  -  Stack Trace: ${stack}`;
        await logger(config).warning(message2);
      }
    }
  }
}
function restClientClass(params) {
  const { config, formatPaths } = params;
  class NewRestClient extends RestClient {
    static config = config;
    static formatPaths = formatPaths === void 0 ? true : formatPaths;
  }
  Reflect.defineProperty(NewRestClient, "name", {
    value: "RestClient"
  });
  return NewRestClient;
}
const DEFAULT_CONTENT_TYPE = "application/json";
const DEFAULT_SDK_VARIANT = "storefront-api-client";
const DEFAULT_CLIENT_VERSION = "1.0.9";
const PUBLIC_ACCESS_TOKEN_HEADER = "X-Shopify-Storefront-Access-Token";
const PRIVATE_ACCESS_TOKEN_HEADER = "Shopify-Storefront-Private-Token";
const SDK_VARIANT_HEADER = "X-SDK-Variant";
const SDK_VERSION_HEADER = "X-SDK-Version";
const SDK_VARIANT_SOURCE_HEADER = "X-SDK-Variant-Source";
const CLIENT = "Storefront API Client";
function validatePrivateAccessTokenUsage(privateAccessToken) {
  if (privateAccessToken && typeof window !== "undefined") {
    throw new Error(`${CLIENT}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`);
  }
}
function validateRequiredAccessTokens(publicAccessToken, privateAccessToken) {
  if (!publicAccessToken && !privateAccessToken) {
    throw new Error(`${CLIENT}: a public or private access token must be provided`);
  }
  if (publicAccessToken && privateAccessToken) {
    throw new Error(`${CLIENT}: only provide either a public or private access token`);
  }
}
function createStorefrontApiClient({ storeDomain, apiVersion, publicAccessToken, privateAccessToken, clientName, retries = 0, customFetchApi, logger: logger2 }) {
  const currentSupportedApiVersions = getCurrentSupportedApiVersions();
  const storeUrl = validateDomainAndGetStoreUrl({
    client: CLIENT,
    storeDomain
  });
  const baseApiVersionValidationParams = {
    client: CLIENT,
    currentSupportedApiVersions,
    logger: logger2
  };
  validateApiVersion({ ...baseApiVersionValidationParams, apiVersion });
  validateRequiredAccessTokens(publicAccessToken, privateAccessToken);
  validatePrivateAccessTokenUsage(privateAccessToken);
  const apiUrlFormatter = generateApiUrlFormatter(storeUrl, apiVersion, baseApiVersionValidationParams);
  const config = {
    storeDomain: storeUrl,
    apiVersion,
    ...publicAccessToken ? { publicAccessToken } : {
      privateAccessToken
    },
    headers: {
      "Content-Type": DEFAULT_CONTENT_TYPE,
      Accept: DEFAULT_CONTENT_TYPE,
      [SDK_VARIANT_HEADER]: DEFAULT_SDK_VARIANT,
      [SDK_VERSION_HEADER]: DEFAULT_CLIENT_VERSION,
      ...clientName ? { [SDK_VARIANT_SOURCE_HEADER]: clientName } : {},
      ...publicAccessToken ? { [PUBLIC_ACCESS_TOKEN_HEADER]: publicAccessToken } : { [PRIVATE_ACCESS_TOKEN_HEADER]: privateAccessToken }
    },
    apiUrl: apiUrlFormatter(),
    clientName
  };
  const graphqlClient = createGraphQLClient({
    headers: config.headers,
    url: config.apiUrl,
    retries,
    customFetchApi,
    logger: logger2
  });
  const getHeaders2 = generateGetHeaders(config);
  const getApiUrl = generateGetApiUrl(config, apiUrlFormatter);
  const getGQLClientParams = generateGetGQLClientParams({
    getHeaders: getHeaders2,
    getApiUrl
  });
  const client = {
    config,
    getHeaders: getHeaders2,
    getApiUrl,
    fetch: (...props) => {
      return graphqlClient.fetch(...getGQLClientParams(...props));
    },
    request: (...props) => {
      return graphqlClient.request(...getGQLClientParams(...props));
    },
    requestStream: (...props) => {
      return graphqlClient.requestStream(...getGQLClientParams(...props));
    }
  };
  return Object.freeze(client);
}
function generateApiUrlFormatter(storeUrl, defaultApiVersion, baseApiVersionValidationParams) {
  return (apiVersion) => {
    if (apiVersion) {
      validateApiVersion({
        ...baseApiVersionValidationParams,
        apiVersion
      });
    }
    const urlApiVersion = (apiVersion ?? defaultApiVersion).trim();
    return `${storeUrl}/api/${urlApiVersion}/graphql.json`;
  };
}
function generateGetApiUrl(config, apiUrlFormatter) {
  return (propApiVersion) => {
    return propApiVersion ? apiUrlFormatter(propApiVersion) : config.apiUrl;
  };
}
class StorefrontClient {
  static config;
  session;
  client;
  apiVersion;
  constructor(params) {
    const config = this.storefrontClass().config;
    if (!config.isCustomStoreApp && !params.session.accessToken) {
      throw new MissingRequiredArgument("Missing access token when creating GraphQL client");
    }
    if (params.apiVersion) {
      const message2 = params.apiVersion === config.apiVersion ? `Storefront client has a redundant API version override to the default ${params.apiVersion}` : `Storefront client overriding default API version ${config.apiVersion} with ${params.apiVersion}`;
      logger(config).debug(message2);
    }
    let accessToken;
    if (config.isCustomStoreApp) {
      accessToken = config.privateAppStorefrontAccessToken;
      if (!accessToken) {
        throw new MissingRequiredArgument("Custom store apps must set the privateAppStorefrontAccessToken property to call the Storefront API.");
      }
    } else {
      accessToken = params.session.accessToken;
      if (!accessToken) {
        throw new MissingRequiredArgument("Session missing access token.");
      }
    }
    this.session = params.session;
    this.apiVersion = params.apiVersion;
    this.client = createStorefrontApiClient({
      privateAccessToken: accessToken,
      apiVersion: this.apiVersion ?? config.apiVersion,
      storeDomain: this.session.shop,
      customFetchApi: abstractFetch,
      logger: clientLoggerFactory(config),
      clientName: getUserAgent(config)
    });
  }
  async query(params) {
    logger(this.storefrontClass().config).deprecated("12.0.0", "The query method is deprecated, and was replaced with the request method.\nSee the migration guide: https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-api/docs/migrating-to-v9.md#using-the-new-clients.");
    if (typeof params.data === "string" && params.data.length === 0 || Object.entries(params.data).length === 0) {
      throw new MissingRequiredArgument("Query missing.");
    }
    let operation;
    let variables;
    if (typeof params.data === "string") {
      operation = params.data;
    } else {
      operation = params.data.query;
      variables = params.data.variables;
    }
    const headers = Object.fromEntries(Object.entries(params?.extraHeaders ?? {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(", ") : value.toString()
    ]));
    const response = await this.request(operation, {
      headers,
      retries: params.tries ? params.tries - 1 : void 0,
      variables
    });
    return { body: response, headers: {} };
  }
  async request(operation, options) {
    const response = await this.client.request(operation, {
      apiVersion: this.apiVersion || this.storefrontClass().config.apiVersion,
      ...options
    });
    if (response.errors) {
      const fetchResponse = response.errors.response;
      throwFailedRequest(response, (options?.retries ?? 0) > 0, fetchResponse);
    }
    return response;
  }
  storefrontClass() {
    return this.constructor;
  }
}
function storefrontClientClass(params) {
  const { config } = params;
  class NewStorefrontClient extends StorefrontClient {
    static config = config;
  }
  Reflect.defineProperty(NewStorefrontClient, "name", {
    value: "StorefrontClient"
  });
  return NewStorefrontClient;
}
function graphqlProxy(config) {
  return async ({ session, rawBody }) => {
    if (!session.accessToken) {
      throw new InvalidSession("Cannot proxy query. Session not authenticated.");
    }
    const GraphqlClient2 = graphqlClientClass({ config });
    const client = new GraphqlClient2({ session });
    let query;
    let variables;
    if (typeof rawBody === "string") {
      query = rawBody;
    } else {
      query = rawBody.query;
      variables = rawBody.variables;
    }
    if (!query) {
      throw new MissingRequiredArgument("Query missing.");
    }
    const response = await client.request(query, { variables });
    return { body: response, headers: {} };
  };
}
function clientClasses(config) {
  return {
    // We don't pass in the HttpClient because the RestClient inherits from it, and goes through the same setup process
    Rest: restClientClass({ config }),
    Graphql: graphqlClientClass({ config }),
    Storefront: storefrontClientClass({ config }),
    graphqlProxy: graphqlProxy(config)
  };
}
class ProcessedQuery {
  static stringify(keyValuePairs) {
    if (!keyValuePairs || Object.keys(keyValuePairs).length === 0)
      return "";
    return new ProcessedQuery().putAll(keyValuePairs).stringify();
  }
  processedQuery;
  constructor() {
    this.processedQuery = new URLSearchParams();
  }
  putAll(keyValuePairs) {
    Object.entries(keyValuePairs).forEach(([key, value]) => this.put(key, value));
    return this;
  }
  put(key, value) {
    if (Array.isArray(value)) {
      this.putArray(key, value);
    } else if (value?.constructor === Object) {
      this.putObject(key, value);
    } else {
      this.putSimple(key, value);
    }
  }
  putArray(key, value) {
    value.forEach((arrayValue) => this.processedQuery.append(`${key}[]`, `${arrayValue}`));
  }
  putObject(key, value) {
    Object.entries(value).forEach(([entry2, entryValue]) => {
      this.processedQuery.append(`${key}[${entry2}]`, `${entryValue}`);
    });
  }
  putSimple(key, value) {
    this.processedQuery.append(key, `${value}`);
  }
  stringify(omitQuestionMark = false) {
    const queryString = this.processedQuery.toString();
    return omitQuestionMark ? queryString : `?${queryString}`;
  }
}
const safeCompare = (strA, strB) => {
  if (typeof strA === typeof strB) {
    const enc = new TextEncoder();
    const buffA = enc.encode(JSON.stringify(strA));
    const buffB = enc.encode(JSON.stringify(strB));
    if (buffA.length === buffB.length) {
      return timingSafeEqual(buffA, buffB);
    }
  } else {
    throw new SafeCompareError(`Mismatched data types provided: ${typeof strA} and ${typeof strB}`);
  }
  return false;
};
function timingSafeEqual(bufA, bufB) {
  const viewA = new Uint8Array(bufA);
  const viewB = new Uint8Array(bufB);
  let out = 0;
  for (let i = 0; i < viewA.length; i++) {
    out |= viewA[i] ^ viewB[i];
  }
  return out === 0;
}
var HmacValidationType;
(function(HmacValidationType2) {
  HmacValidationType2["Flow"] = "flow";
  HmacValidationType2["Webhook"] = "webhook";
  HmacValidationType2["FulfillmentService"] = "fulfillment_service";
})(HmacValidationType || (HmacValidationType = {}));
const ValidationErrorReason = {
  MissingBody: "missing_body",
  InvalidHmac: "invalid_hmac",
  MissingHmac: "missing_hmac"
};
const HMAC_TIMESTAMP_PERMITTED_CLOCK_TOLERANCE_SEC = 90;
function stringifyQueryForAdmin(query) {
  const processedQuery = new ProcessedQuery();
  Object.keys(query).sort((val1, val2) => val1.localeCompare(val2)).forEach((key) => processedQuery.put(key, query[key]));
  return processedQuery.stringify(true);
}
function stringifyQueryForAppProxy(query) {
  return Object.entries(query).sort(([val1], [val2]) => val1.localeCompare(val2)).reduce((acc, [key, value]) => {
    return `${acc}${key}=${Array.isArray(value) ? value.join(",") : value}`;
  }, "");
}
function generateLocalHmac(config) {
  return async (params, signator = "admin") => {
    const { hmac, signature, ...query } = params;
    const queryString = signator === "admin" ? stringifyQueryForAdmin(query) : stringifyQueryForAppProxy(query);
    return createSHA256HMAC(config.apiSecretKey, queryString, HashFormat.Hex);
  };
}
function validateHmac(config) {
  return async (query, { signator } = { signator: "admin" }) => {
    if (signator === "admin" && !query.hmac) {
      throw new InvalidHmacError("Query does not contain an HMAC value.");
    }
    if (signator === "appProxy" && !query.signature) {
      throw new InvalidHmacError("Query does not contain a signature value.");
    }
    validateHmacTimestamp(query);
    const hmac = signator === "appProxy" ? query.signature : query.hmac;
    const localHmac = await generateLocalHmac(config)(query, signator);
    return safeCompare(hmac, localHmac);
  };
}
async function validateHmacString(config, data, hmac, format) {
  const localHmac = await createSHA256HMAC(config.apiSecretKey, data, format);
  return safeCompare(hmac, localHmac);
}
function getCurrentTimeInSec() {
  return Math.trunc(Date.now() / 1e3);
}
function validateHmacFromRequestFactory(config) {
  return async function validateHmacFromRequest({ type, rawBody, ...adapterArgs }) {
    const request2 = await abstractConvertRequest(adapterArgs);
    if (!rawBody.length) {
      return fail(ValidationErrorReason.MissingBody, type, config);
    }
    const hmac = getHeader(request2.headers, ShopifyHeader.Hmac);
    if (!hmac) {
      return fail(ValidationErrorReason.MissingHmac, type, config);
    }
    const validHmac = await validateHmacString(config, rawBody, hmac, HashFormat.Base64);
    if (!validHmac) {
      return fail(ValidationErrorReason.InvalidHmac, type, config);
    }
    return succeed(type, config);
  };
}
function validateHmacTimestamp(query) {
  if (Math.abs(getCurrentTimeInSec() - Number(query.timestamp)) > HMAC_TIMESTAMP_PERMITTED_CLOCK_TOLERANCE_SEC) {
    throw new InvalidHmacError("HMAC timestamp is outside of the tolerance range");
  }
}
async function fail(reason, type, config) {
  const log2 = logger(config);
  await log2.debug(`${type} request is not valid`, { reason });
  return {
    valid: false,
    reason
  };
}
async function succeed(type, config) {
  const log2 = logger(config);
  await log2.debug(`${type} request is valid`);
  return {
    valid: true
  };
}
function decodeHost(host) {
  return atob(host);
}
function shopAdminUrlToLegacyUrl(shopAdminUrl) {
  const shopUrl = removeProtocol(shopAdminUrl);
  const isShopAdminUrl = shopUrl.split(".")[0] === "admin";
  if (!isShopAdminUrl) {
    return null;
  }
  const regex = new RegExp(`admin\\..+/store/([^/]+)`);
  const matches = shopUrl.match(regex);
  if (matches && matches.length === 2) {
    const shopName = matches[1];
    const isSpinUrl = shopUrl.includes("spin.dev/store/");
    const isLocalUrl = shopUrl.includes("shop.dev/store/");
    if (isSpinUrl) {
      return spinAdminUrlToLegacyUrl(shopUrl);
    } else if (isLocalUrl) {
      return localAdminUrlToLegacyUrl(shopUrl);
    } else {
      return `${shopName}.myshopify.com`;
    }
  } else {
    return null;
  }
}
function legacyUrlToShopAdminUrl(legacyAdminUrl) {
  const shopUrl = removeProtocol(legacyAdminUrl);
  const regex = new RegExp(`(.+)\\.myshopify\\.com$`);
  const matches = shopUrl.match(regex);
  if (matches && matches.length === 2) {
    const shopName = matches[1];
    return `admin.shopify.com/store/${shopName}`;
  } else {
    const isSpinUrl = shopUrl.endsWith("spin.dev");
    const isLocalUrl = shopUrl.endsWith("shop.dev");
    if (isSpinUrl) {
      return spinLegacyUrlToAdminUrl(shopUrl);
    } else if (isLocalUrl) {
      return localLegacyUrlToAdminUrl(shopUrl);
    } else {
      return null;
    }
  }
}
function spinAdminUrlToLegacyUrl(shopAdminUrl) {
  const spinRegex = new RegExp(`admin\\.web\\.(.+\\.spin\\.dev)/store/(.+)`);
  const spinMatches = shopAdminUrl.match(spinRegex);
  if (spinMatches && spinMatches.length === 3) {
    const spinUrl = spinMatches[1];
    const shopName = spinMatches[2];
    return `${shopName}.shopify.${spinUrl}`;
  } else {
    return null;
  }
}
function localAdminUrlToLegacyUrl(shopAdminUrl) {
  const localRegex = new RegExp(`admin\\.shop\\.dev/store/(.+)`);
  const localMatches = shopAdminUrl.match(localRegex);
  if (localMatches && localMatches.length === 2) {
    const shopName = localMatches[1];
    return `${shopName}.shop.dev`;
  } else {
    return null;
  }
}
function spinLegacyUrlToAdminUrl(legacyAdminUrl) {
  const spinRegex = new RegExp(`(.+)\\.shopify\\.(.+\\.spin\\.dev)`);
  const spinMatches = legacyAdminUrl.match(spinRegex);
  if (spinMatches && spinMatches.length === 3) {
    const shopName = spinMatches[1];
    const spinUrl = spinMatches[2];
    return `admin.web.${spinUrl}/store/${shopName}`;
  } else {
    return null;
  }
}
function localLegacyUrlToAdminUrl(legacyAdminUrl) {
  const localRegex = new RegExp(`(.+)\\.shop\\.dev$`);
  const localMatches = legacyAdminUrl.match(localRegex);
  if (localMatches && localMatches.length === 2) {
    const shopName = localMatches[1];
    return `admin.shop.dev/store/${shopName}`;
  } else {
    return null;
  }
}
function removeProtocol(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
function sanitizeShop(config) {
  return (shop, throwOnInvalid = false) => {
    let shopUrl = shop;
    const domainsRegex = [
      "myshopify\\.com",
      "shopify\\.com",
      "myshopify\\.io",
      "shop\\.dev"
    ];
    if (config.customShopDomains) {
      domainsRegex.push(...config.customShopDomains.map((regex) => typeof regex === "string" ? regex : regex.source));
    }
    const shopUrlRegex = new RegExp(`^[a-zA-Z0-9][a-zA-Z0-9-_]*\\.(${domainsRegex.join("|")})[/]*$`);
    const shopAdminRegex = new RegExp(`^admin\\.(${domainsRegex.join("|")})/store/([a-zA-Z0-9][a-zA-Z0-9-_]*)$`);
    const isShopAdminUrl = shopAdminRegex.test(shopUrl);
    if (isShopAdminUrl) {
      shopUrl = shopAdminUrlToLegacyUrl(shopUrl) || "";
    }
    const sanitizedShop = shopUrlRegex.test(shopUrl) ? shopUrl : null;
    if (!sanitizedShop && throwOnInvalid) {
      throw new InvalidShopError("Received invalid shop argument");
    }
    return sanitizedShop;
  };
}
function sanitizeHost() {
  return (host, throwOnInvalid = false) => {
    const base64regex = /^[0-9a-zA-Z+/]+={0,2}$/;
    let sanitizedHost = base64regex.test(host) ? host : null;
    if (sanitizedHost) {
      const { hostname } = new URL(`https://${decodeHost(sanitizedHost)}`);
      const originsRegex = [
        "myshopify\\.com",
        "shopify\\.com",
        "myshopify\\.io",
        "spin\\.dev",
        "shop\\.dev"
      ];
      const hostRegex = new RegExp(`\\.(${originsRegex.join("|")})$`);
      if (!hostRegex.test(hostname)) {
        sanitizedHost = null;
      }
    }
    if (!sanitizedHost && throwOnInvalid) {
      throw new InvalidHostError("Received invalid host argument");
    }
    return sanitizedHost;
  };
}
var DataType;
(function(DataType2) {
  DataType2["JSON"] = "application/json";
  DataType2["GraphQL"] = "application/graphql";
  DataType2["URLEncoded"] = "application/x-www-form-urlencoded";
})(DataType || (DataType = {}));
function fetchRequestFactory(config) {
  return async function fetchRequest(url, options) {
    const log2 = logger(config);
    const doLog = config.logger.httpRequests && config.logger.level === LogSeverity.Debug;
    if (doLog) {
      log2.debug("Making HTTP request", {
        method: options?.method || "GET",
        url,
        ...options?.body && { body: options?.body }
      });
    }
    const response = await abstractFetch(url, options);
    if (doLog) {
      log2.debug("HTTP request completed", {
        method: options?.method || "GET",
        url,
        status: response.status
      });
    }
    return response;
  };
}
const SESSION_COOKIE_NAME = "shopify_app_session";
const STATE_COOKIE_NAME = "shopify_app_state";
function nonce() {
  const length = 15;
  const bytes = cryptoVar.getRandomValues(new Uint8Array(length));
  const nonce2 = bytes.map((byte) => {
    return byte % 10;
  }).join("");
  return nonce2;
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    if (typeof crypto === "undefined" || !crypto.getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
    getRandomValues = crypto.getRandomValues.bind(crypto);
  }
  return getRandomValues(rnds8);
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = { randomUUID };
function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error("Random bytes length must be >= 16");
  }
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return unsafeStringify(rnds);
}
const propertiesToSave = [
  "id",
  "shop",
  "state",
  "isOnline",
  "scope",
  "accessToken",
  "expires",
  "onlineAccessInfo"
];
class Session {
  static fromPropertyArray(entries, returnUserData = false) {
    if (!Array.isArray(entries)) {
      throw new InvalidSession("The parameter is not an array: a Session cannot be created from this object.");
    }
    const obj = Object.fromEntries(entries.filter(([_key, value]) => value !== null && value !== void 0).map(([key, value]) => {
      switch (key.toLowerCase()) {
        case "isonline":
          return ["isOnline", value];
        case "accesstoken":
          return ["accessToken", value];
        case "onlineaccessinfo":
          return ["onlineAccessInfo", value];
        case "userid":
          return ["userId", value];
        case "firstname":
          return ["firstName", value];
        case "lastname":
          return ["lastName", value];
        case "accountowner":
          return ["accountOwner", value];
        case "emailverified":
          return ["emailVerified", value];
        default:
          return [key.toLowerCase(), value];
      }
    }));
    const sessionData = {};
    const onlineAccessInfo = {
      associated_user: {}
    };
    Object.entries(obj).forEach(([key, value]) => {
      switch (key) {
        case "isOnline":
          if (typeof value === "string") {
            sessionData[key] = value.toString().toLowerCase() === "true";
          } else if (typeof value === "number") {
            sessionData[key] = Boolean(value);
          } else {
            sessionData[key] = value;
          }
          break;
        case "scope":
          sessionData[key] = value.toString();
          break;
        case "expires":
          sessionData[key] = value ? new Date(Number(value)) : void 0;
          break;
        case "onlineAccessInfo":
          onlineAccessInfo.associated_user.id = Number(value);
          break;
        case "userId":
          if (returnUserData) {
            onlineAccessInfo.associated_user.id = Number(value);
            break;
          }
        case "firstName":
          if (returnUserData) {
            onlineAccessInfo.associated_user.first_name = String(value);
            break;
          }
        case "lastName":
          if (returnUserData) {
            onlineAccessInfo.associated_user.last_name = String(value);
            break;
          }
        case "email":
          if (returnUserData) {
            onlineAccessInfo.associated_user.email = String(value);
            break;
          }
        case "accountOwner":
          if (returnUserData) {
            onlineAccessInfo.associated_user.account_owner = Boolean(value);
            break;
          }
        case "locale":
          if (returnUserData) {
            onlineAccessInfo.associated_user.locale = String(value);
            break;
          }
        case "collaborator":
          if (returnUserData) {
            onlineAccessInfo.associated_user.collaborator = Boolean(value);
            break;
          }
        case "emailVerified":
          if (returnUserData) {
            onlineAccessInfo.associated_user.email_verified = Boolean(value);
            break;
          }
        // Return any user keys as passed in
        default:
          sessionData[key] = value;
      }
    });
    if (sessionData.isOnline) {
      sessionData.onlineAccessInfo = onlineAccessInfo;
    }
    const session = new Session(sessionData);
    return session;
  }
  /**
   * The unique identifier for the session.
   */
  id;
  /**
   * The Shopify shop domain, such as `example.myshopify.com`.
   */
  shop;
  /**
   * The state of the session. Used for the OAuth authentication code flow.
   */
  state;
  /**
   * Whether the access token in the session is online or offline.
   */
  isOnline;
  /**
   * The desired scopes for the access token, at the time the session was created.
   */
  scope;
  /**
   * The date the access token expires.
   */
  expires;
  /**
   * The access token for the session.
   */
  accessToken;
  /**
   * Information on the user for the session. Only present for online sessions.
   */
  onlineAccessInfo;
  constructor(params) {
    Object.assign(this, params);
  }
  /**
   * Whether the session is active. Active sessions have an access token that is not expired, and has has the given
   * scopes if scopes is equal to a truthy value.
   */
  isActive(scopes, withinMillisecondsOfExpiry = 500) {
    const hasAccessToken = Boolean(this.accessToken);
    const isTokenNotExpired = !this.isExpired(withinMillisecondsOfExpiry);
    const isScopeChanged = this.isScopeChanged(scopes);
    return !isScopeChanged && hasAccessToken && isTokenNotExpired;
  }
  /**
   * Whether the access token includes the given scopes if they are provided.
   */
  isScopeChanged(scopes) {
    if (typeof scopes === "undefined") {
      return false;
    }
    return !this.isScopeIncluded(scopes);
  }
  /**
   * Whether the access token includes the given scopes.
   */
  isScopeIncluded(scopes) {
    const requiredScopes = scopes instanceof AuthScopes ? scopes : new AuthScopes(scopes);
    const sessionScopes = new AuthScopes(this.scope);
    return sessionScopes.has(requiredScopes);
  }
  /**
   * Whether the access token is expired.
   */
  isExpired(withinMillisecondsOfExpiry = 0) {
    return Boolean(this.expires && this.expires.getTime() - withinMillisecondsOfExpiry < Date.now());
  }
  /**
   * Converts an object with data into a Session.
   */
  toObject() {
    const object = {
      id: this.id,
      shop: this.shop,
      state: this.state,
      isOnline: this.isOnline
    };
    if (this.scope) {
      object.scope = this.scope;
    }
    if (this.expires) {
      object.expires = this.expires;
    }
    if (this.accessToken) {
      object.accessToken = this.accessToken;
    }
    if (this.onlineAccessInfo) {
      object.onlineAccessInfo = this.onlineAccessInfo;
    }
    return object;
  }
  /**
   * Checks whether the given session is equal to this session.
   */
  equals(other) {
    if (!other)
      return false;
    const mandatoryPropsMatch = this.id === other.id && this.shop === other.shop && this.state === other.state && this.isOnline === other.isOnline;
    if (!mandatoryPropsMatch)
      return false;
    const copyA = this.toPropertyArray(true);
    copyA.sort(([k1], [k2]) => k1 < k2 ? -1 : 1);
    const copyB = other.toPropertyArray(true);
    copyB.sort(([k1], [k2]) => k1 < k2 ? -1 : 1);
    return JSON.stringify(copyA) === JSON.stringify(copyB);
  }
  /**
   * Converts the session into an array of key-value pairs.
   */
  toPropertyArray(returnUserData = false) {
    return Object.entries(this).filter(([key, value]) => propertiesToSave.includes(key) && value !== void 0 && value !== null).flatMap(([key, value]) => {
      switch (key) {
        case "expires":
          return [[key, value ? value.getTime() : void 0]];
        case "onlineAccessInfo":
          if (!returnUserData) {
            return [[key, value.associated_user.id]];
          } else {
            return [
              ["userId", value?.associated_user?.id],
              ["firstName", value?.associated_user?.first_name],
              ["lastName", value?.associated_user?.last_name],
              ["email", value?.associated_user?.email],
              ["locale", value?.associated_user?.locale],
              ["emailVerified", value?.associated_user?.email_verified],
              ["accountOwner", value?.associated_user?.account_owner],
              ["collaborator", value?.associated_user?.collaborator]
            ];
          }
        default:
          return [[key, value]];
      }
    }).filter(([_key, value]) => value !== void 0);
  }
}
const crypto$1 = crypto;
const isCryptoKey = (key) => key instanceof CryptoKey;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function concat(...buffers) {
  const size = buffers.reduce((acc, { length }) => acc + length, 0);
  const buf = new Uint8Array(size);
  let i = 0;
  for (const buffer of buffers) {
    buf.set(buffer, i);
    i += buffer.length;
  }
  return buf;
}
const decodeBase64 = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};
const decode = (input) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = decoder.decode(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return decodeBase64(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};
class JOSEError extends Error {
  constructor(message2, options) {
    super(message2, options);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
}
JOSEError.code = "ERR_JOSE_GENERIC";
class JWTClaimValidationFailed extends JOSEError {
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
}
JWTClaimValidationFailed.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
class JWTExpired extends JOSEError {
  constructor(message2, payload, claim = "unspecified", reason = "unspecified") {
    super(message2, { cause: { claim, reason, payload } });
    this.code = "ERR_JWT_EXPIRED";
    this.claim = claim;
    this.reason = reason;
    this.payload = payload;
  }
}
JWTExpired.code = "ERR_JWT_EXPIRED";
class JOSEAlgNotAllowed extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
}
JOSEAlgNotAllowed.code = "ERR_JOSE_ALG_NOT_ALLOWED";
class JOSENotSupported extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
}
JOSENotSupported.code = "ERR_JOSE_NOT_SUPPORTED";
class JWEDecryptionFailed extends JOSEError {
  constructor(message2 = "decryption operation failed", options) {
    super(message2, options);
    this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
}
JWEDecryptionFailed.code = "ERR_JWE_DECRYPTION_FAILED";
class JWEInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWE_INVALID";
  }
}
JWEInvalid.code = "ERR_JWE_INVALID";
class JWSInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWS_INVALID";
  }
}
JWSInvalid.code = "ERR_JWS_INVALID";
class JWTInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWT_INVALID";
  }
}
JWTInvalid.code = "ERR_JWT_INVALID";
class JWKInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWK_INVALID";
  }
}
JWKInvalid.code = "ERR_JWK_INVALID";
class JWKSInvalid extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JWKS_INVALID";
  }
}
JWKSInvalid.code = "ERR_JWKS_INVALID";
class JWKSNoMatchingKey extends JOSEError {
  constructor(message2 = "no applicable key found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
}
JWKSNoMatchingKey.code = "ERR_JWKS_NO_MATCHING_KEY";
class JWKSMultipleMatchingKeys extends JOSEError {
  constructor(message2 = "multiple matching keys found in the JSON Web Key Set", options) {
    super(message2, options);
    this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
}
JWKSMultipleMatchingKeys.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
class JWKSTimeout extends JOSEError {
  constructor(message2 = "request timed out", options) {
    super(message2, options);
    this.code = "ERR_JWKS_TIMEOUT";
  }
}
JWKSTimeout.code = "ERR_JWKS_TIMEOUT";
class JWSSignatureVerificationFailed extends JOSEError {
  constructor(message2 = "signature verification failed", options) {
    super(message2, options);
    this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
}
JWSSignatureVerificationFailed.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash) {
  return parseInt(hash.name.slice(4), 10);
}
function getNamedCurve(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkSigCryptoKey(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "Ed25519": {
      if (!isAlgorithm(key.algorithm, "Ed25519"))
        throw unusable("Ed25519");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}
function message(msg, actual, ...types2) {
  types2 = types2.filter(Boolean);
  if (types2.length > 2) {
    const last = types2.pop();
    msg += `one of type ${types2.join(", ")}, or ${last}.`;
  } else if (types2.length === 2) {
    msg += `one of type ${types2[0]} or ${types2[1]}.`;
  } else {
    msg += `of type ${types2[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor?.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
const invalidKeyInput = (actual, ...types2) => {
  return message("Key must be ", actual, ...types2);
};
function withAlg(alg, actual, ...types2) {
  return message(`Key for the ${alg} algorithm must be `, actual, ...types2);
}
const isKeyLike = (key) => {
  if (isCryptoKey(key)) {
    return true;
  }
  return key?.[Symbol.toStringTag] === "KeyObject";
};
const types = ["CryptoKey"];
const isDisjoint = (...headers) => {
  const sources = headers.filter(Boolean);
  if (sources.length === 0 || sources.length === 1) {
    return true;
  }
  let acc;
  for (const header of sources) {
    const parameters = Object.keys(header);
    if (!acc || acc.size === 0) {
      acc = new Set(parameters);
      continue;
    }
    for (const parameter of parameters) {
      if (acc.has(parameter)) {
        return false;
      }
      acc.add(parameter);
    }
  }
  return true;
};
function isObjectLike(value) {
  return typeof value === "object" && value !== null;
}
function isObject(input) {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(input) === null) {
    return true;
  }
  let proto = input;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(input) === proto;
}
const checkKeyLength = (alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
};
function isJWK(key) {
  return isObject(key) && typeof key.kty === "string";
}
function isPrivateJWK(key) {
  return key.kty !== "oct" && typeof key.d === "string";
}
function isPublicJWK(key) {
  return key.kty !== "oct" && typeof key.d === "undefined";
}
function isSecretJWK(key) {
  return isJWK(key) && key.kty === "oct" && typeof key.k === "string";
}
function subtleMapping(jwk) {
  let algorithm;
  let keyUsages;
  switch (jwk.kty) {
    case "RSA": {
      switch (jwk.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          algorithm = { name: "RSA-PSS", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${jwk.alg.slice(-3)}` };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          algorithm = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
          };
          keyUsages = jwk.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (jwk.alg) {
        case "ES256":
          algorithm = { name: "ECDSA", namedCurve: "P-256" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          algorithm = { name: "ECDSA", namedCurve: "P-384" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          algorithm = { name: "ECDSA", namedCurve: "P-521" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: "ECDH", namedCurve: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (jwk.alg) {
        case "Ed25519":
          algorithm = { name: "Ed25519" };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "EdDSA":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          algorithm = { name: jwk.crv };
          keyUsages = jwk.d ? ["deriveBits"] : [];
          break;
        default:
          throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm, keyUsages };
}
const parse = async (jwk) => {
  if (!jwk.alg) {
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  }
  const { algorithm, keyUsages } = subtleMapping(jwk);
  const rest = [
    algorithm,
    jwk.ext ?? false,
    jwk.key_ops ?? keyUsages
  ];
  const keyData = { ...jwk };
  delete keyData.alg;
  delete keyData.use;
  return crypto$1.subtle.importKey("jwk", keyData, ...rest);
};
const exportKeyValue = (k) => decode(k);
let privCache;
let pubCache;
const isKeyObject = (key) => {
  return key?.[Symbol.toStringTag] === "KeyObject";
};
const importAndCache = async (cache, key, jwk, alg, freeze = false) => {
  let cached = cache.get(key);
  if (cached?.[alg]) {
    return cached[alg];
  }
  const cryptoKey = await parse({ ...jwk, alg });
  if (freeze)
    Object.freeze(key);
  if (!cached) {
    cache.set(key, { [alg]: cryptoKey });
  } else {
    cached[alg] = cryptoKey;
  }
  return cryptoKey;
};
const normalizePublicKey = (key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    delete jwk.d;
    delete jwk.dp;
    delete jwk.dq;
    delete jwk.p;
    delete jwk.q;
    delete jwk.qi;
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(pubCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode(key.k);
    pubCache || (pubCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(pubCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
};
const normalizePrivateKey = (key, alg) => {
  if (isKeyObject(key)) {
    let jwk = key.export({ format: "jwk" });
    if (jwk.k) {
      return exportKeyValue(jwk.k);
    }
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    return importAndCache(privCache, key, jwk, alg);
  }
  if (isJWK(key)) {
    if (key.k)
      return decode(key.k);
    privCache || (privCache = /* @__PURE__ */ new WeakMap());
    const cryptoKey = importAndCache(privCache, key, key, alg, true);
    return cryptoKey;
  }
  return key;
};
const normalize = { normalizePublicKey, normalizePrivateKey };
async function importJWK(jwk, alg) {
  if (!isObject(jwk)) {
    throw new TypeError("JWK must be an object");
  }
  alg || (alg = jwk.alg);
  switch (jwk.kty) {
    case "oct":
      if (typeof jwk.k !== "string" || !jwk.k) {
        throw new TypeError('missing "k" (Key Value) Parameter value');
      }
      return decode(jwk.k);
    case "RSA":
      if ("oth" in jwk && jwk.oth !== void 0) {
        throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
      }
    case "EC":
    case "OKP":
      return parse({ ...jwk, alg });
    default:
      throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
  }
}
const tag = (key) => key?.[Symbol.toStringTag];
const jwkMatchesOp = (alg, key, usage) => {
  if (key.use !== void 0 && key.use !== "sig") {
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  }
  if (key.key_ops !== void 0 && key.key_ops.includes?.(usage) !== true) {
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${usage}`);
  }
  if (key.alg !== void 0 && key.alg !== alg) {
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${alg}`);
  }
  return true;
};
const symmetricTypeCheck = (alg, key, usage, allowJwk) => {
  if (key instanceof Uint8Array)
    return;
  if (allowJwk && isJWK(key)) {
    if (isSecretJWK(key) && jwkMatchesOp(alg, key, usage))
      return;
    throw new TypeError(`JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present`);
  }
  if (!isKeyLike(key)) {
    throw new TypeError(withAlg(alg, key, ...types, "Uint8Array", allowJwk ? "JSON Web Key" : null));
  }
  if (key.type !== "secret") {
    throw new TypeError(`${tag(key)} instances for symmetric algorithms must be of type "secret"`);
  }
};
const asymmetricTypeCheck = (alg, key, usage, allowJwk) => {
  if (allowJwk && isJWK(key)) {
    switch (usage) {
      case "sign":
        if (isPrivateJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a private JWK`);
      case "verify":
        if (isPublicJWK(key) && jwkMatchesOp(alg, key, usage))
          return;
        throw new TypeError(`JSON Web Key for this operation be a public JWK`);
    }
  }
  if (!isKeyLike(key)) {
    throw new TypeError(withAlg(alg, key, ...types, allowJwk ? "JSON Web Key" : null));
  }
  if (key.type === "secret") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithms must not be of type "secret"`);
  }
  if (usage === "sign" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm signing must be of type "private"`);
  }
  if (usage === "decrypt" && key.type === "public") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm decryption must be of type "private"`);
  }
  if (key.algorithm && usage === "verify" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm verifying must be of type "public"`);
  }
  if (key.algorithm && usage === "encrypt" && key.type === "private") {
    throw new TypeError(`${tag(key)} instances for asymmetric algorithm encryption must be of type "public"`);
  }
};
function checkKeyType(allowJwk, alg, key, usage) {
  const symmetric = alg.startsWith("HS") || alg === "dir" || alg.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(alg);
  if (symmetric) {
    symmetricTypeCheck(alg, key, usage, allowJwk);
  } else {
    asymmetricTypeCheck(alg, key, usage, allowJwk);
  }
}
checkKeyType.bind(void 0, false);
const checkKeyTypeWithJwk = checkKeyType.bind(void 0, true);
function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
  if (joseHeader.crit !== void 0 && protectedHeader?.crit === void 0) {
    throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
  }
  if (!protectedHeader || protectedHeader.crit === void 0) {
    return /* @__PURE__ */ new Set();
  }
  if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input) => typeof input !== "string" || input.length === 0)) {
    throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  }
  let recognized;
  if (recognizedOption !== void 0) {
    recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
  } else {
    recognized = recognizedDefault;
  }
  for (const parameter of protectedHeader.crit) {
    if (!recognized.has(parameter)) {
      throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
    }
    if (joseHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" is missing`);
    }
    if (recognized.get(parameter) && protectedHeader[parameter] === void 0) {
      throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
    }
  }
  return new Set(protectedHeader.crit);
}
const validateAlgorithms = (option, algorithms) => {
  if (algorithms !== void 0 && (!Array.isArray(algorithms) || algorithms.some((s) => typeof s !== "string"))) {
    throw new TypeError(`"${option}" option must be an array of strings`);
  }
  if (!algorithms) {
    return void 0;
  }
  return new Set(algorithms);
};
function subtleDsa(alg, algorithm) {
  const hash = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "Ed25519":
      return { name: "Ed25519" };
    case "EdDSA":
      return { name: algorithm.name };
    default:
      throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}
async function getCryptoKey(alg, key, usage) {
  {
    key = await normalize.normalizePublicKey(key, alg);
  }
  if (isCryptoKey(key)) {
    checkSigCryptoKey(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalidKeyInput(key, ...types));
    }
    return crypto$1.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  throw new TypeError(invalidKeyInput(key, ...types, "Uint8Array", "JSON Web Key"));
}
const verify = async (alg, key, signature, data) => {
  const cryptoKey = await getCryptoKey(alg, key, "verify");
  checkKeyLength(alg, cryptoKey);
  const algorithm = subtleDsa(alg, cryptoKey.algorithm);
  try {
    return await crypto$1.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch {
    return false;
  }
};
async function flattenedVerify(jws, key, options) {
  if (!isObject(jws)) {
    throw new JWSInvalid("Flattened JWS must be an object");
  }
  if (jws.protected === void 0 && jws.header === void 0) {
    throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
  }
  if (jws.protected !== void 0 && typeof jws.protected !== "string") {
    throw new JWSInvalid("JWS Protected Header incorrect type");
  }
  if (jws.payload === void 0) {
    throw new JWSInvalid("JWS Payload missing");
  }
  if (typeof jws.signature !== "string") {
    throw new JWSInvalid("JWS Signature missing or incorrect type");
  }
  if (jws.header !== void 0 && !isObject(jws.header)) {
    throw new JWSInvalid("JWS Unprotected Header incorrect type");
  }
  let parsedProt = {};
  if (jws.protected) {
    try {
      const protectedHeader = decode(jws.protected);
      parsedProt = JSON.parse(decoder.decode(protectedHeader));
    } catch {
      throw new JWSInvalid("JWS Protected Header is invalid");
    }
  }
  if (!isDisjoint(parsedProt, jws.header)) {
    throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
  }
  const joseHeader = {
    ...parsedProt,
    ...jws.header
  };
  const extensions = validateCrit(JWSInvalid, /* @__PURE__ */ new Map([["b64", true]]), options?.crit, parsedProt, joseHeader);
  let b64 = true;
  if (extensions.has("b64")) {
    b64 = parsedProt.b64;
    if (typeof b64 !== "boolean") {
      throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    }
  }
  const { alg } = joseHeader;
  if (typeof alg !== "string" || !alg) {
    throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
  }
  const algorithms = options && validateAlgorithms("algorithms", options.algorithms);
  if (algorithms && !algorithms.has(alg)) {
    throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter value not allowed');
  }
  if (b64) {
    if (typeof jws.payload !== "string") {
      throw new JWSInvalid("JWS Payload must be a string");
    }
  } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
    throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
  }
  let resolvedKey = false;
  if (typeof key === "function") {
    key = await key(parsedProt, jws);
    resolvedKey = true;
    checkKeyTypeWithJwk(alg, key, "verify");
    if (isJWK(key)) {
      key = await importJWK(key, alg);
    }
  } else {
    checkKeyTypeWithJwk(alg, key, "verify");
  }
  const data = concat(encoder.encode(jws.protected ?? ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
  let signature;
  try {
    signature = decode(jws.signature);
  } catch {
    throw new JWSInvalid("Failed to base64url decode the signature");
  }
  const verified = await verify(alg, key, signature, data);
  if (!verified) {
    throw new JWSSignatureVerificationFailed();
  }
  let payload;
  if (b64) {
    try {
      payload = decode(jws.payload);
    } catch {
      throw new JWSInvalid("Failed to base64url decode the payload");
    }
  } else if (typeof jws.payload === "string") {
    payload = encoder.encode(jws.payload);
  } else {
    payload = jws.payload;
  }
  const result = { payload };
  if (jws.protected !== void 0) {
    result.protectedHeader = parsedProt;
  }
  if (jws.header !== void 0) {
    result.unprotectedHeader = jws.header;
  }
  if (resolvedKey) {
    return { ...result, key };
  }
  return result;
}
async function compactVerify(jws, key, options) {
  if (jws instanceof Uint8Array) {
    jws = decoder.decode(jws);
  }
  if (typeof jws !== "string") {
    throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
  }
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
  if (length !== 3) {
    throw new JWSInvalid("Invalid Compact JWS");
  }
  const verified = await flattenedVerify({ payload, protected: protectedHeader, signature }, key, options);
  const result = { payload: verified.payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
const epoch = (date) => Math.floor(date.getTime() / 1e3);
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
const secs = (str) => {
  const matched = REGEX.exec(str);
  if (!matched || matched[4] && matched[1]) {
    throw new TypeError("Invalid time period format");
  }
  const value = parseFloat(matched[2]);
  const unit = matched[3].toLowerCase();
  let numericDate;
  switch (unit) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      numericDate = Math.round(value);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      numericDate = Math.round(value * minute);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      numericDate = Math.round(value * hour);
      break;
    case "day":
    case "days":
    case "d":
      numericDate = Math.round(value * day);
      break;
    case "week":
    case "weeks":
    case "w":
      numericDate = Math.round(value * week);
      break;
    default:
      numericDate = Math.round(value * year);
      break;
  }
  if (matched[1] === "-" || matched[4] === "ago") {
    return -numericDate;
  }
  return numericDate;
};
const normalizeTyp = (value) => value.toLowerCase().replace(/^application\//, "");
const checkAudiencePresence = (audPayload, audOption) => {
  if (typeof audPayload === "string") {
    return audOption.includes(audPayload);
  }
  if (Array.isArray(audPayload)) {
    return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
  }
  return false;
};
const jwtPayload = (protectedHeader, encodedPayload, options = {}) => {
  let payload;
  try {
    payload = JSON.parse(decoder.decode(encodedPayload));
  } catch {
  }
  if (!isObject(payload)) {
    throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
  }
  const { typ } = options;
  if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
    throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', payload, "typ", "check_failed");
  }
  const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
  const presenceCheck = [...requiredClaims];
  if (maxTokenAge !== void 0)
    presenceCheck.push("iat");
  if (audience !== void 0)
    presenceCheck.push("aud");
  if (subject !== void 0)
    presenceCheck.push("sub");
  if (issuer !== void 0)
    presenceCheck.push("iss");
  for (const claim of new Set(presenceCheck.reverse())) {
    if (!(claim in payload)) {
      throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, payload, claim, "missing");
    }
  }
  if (issuer && !(Array.isArray(issuer) ? issuer : [issuer]).includes(payload.iss)) {
    throw new JWTClaimValidationFailed('unexpected "iss" claim value', payload, "iss", "check_failed");
  }
  if (subject && payload.sub !== subject) {
    throw new JWTClaimValidationFailed('unexpected "sub" claim value', payload, "sub", "check_failed");
  }
  if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [audience] : audience)) {
    throw new JWTClaimValidationFailed('unexpected "aud" claim value', payload, "aud", "check_failed");
  }
  let tolerance;
  switch (typeof options.clockTolerance) {
    case "string":
      tolerance = secs(options.clockTolerance);
      break;
    case "number":
      tolerance = options.clockTolerance;
      break;
    case "undefined":
      tolerance = 0;
      break;
    default:
      throw new TypeError("Invalid clockTolerance option type");
  }
  const { currentDate } = options;
  const now = epoch(currentDate || /* @__PURE__ */ new Date());
  if ((payload.iat !== void 0 || maxTokenAge) && typeof payload.iat !== "number") {
    throw new JWTClaimValidationFailed('"iat" claim must be a number', payload, "iat", "invalid");
  }
  if (payload.nbf !== void 0) {
    if (typeof payload.nbf !== "number") {
      throw new JWTClaimValidationFailed('"nbf" claim must be a number', payload, "nbf", "invalid");
    }
    if (payload.nbf > now + tolerance) {
      throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', payload, "nbf", "check_failed");
    }
  }
  if (payload.exp !== void 0) {
    if (typeof payload.exp !== "number") {
      throw new JWTClaimValidationFailed('"exp" claim must be a number', payload, "exp", "invalid");
    }
    if (payload.exp <= now - tolerance) {
      throw new JWTExpired('"exp" claim timestamp check failed', payload, "exp", "check_failed");
    }
  }
  if (maxTokenAge) {
    const age = now - payload.iat;
    const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
    if (age - tolerance > max) {
      throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', payload, "iat", "check_failed");
    }
    if (age < 0 - tolerance) {
      throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', payload, "iat", "check_failed");
    }
  }
  return payload;
};
async function jwtVerify(jwt, key, options) {
  const verified = await compactVerify(jwt, key, options);
  if (verified.protectedHeader.crit?.includes("b64") && verified.protectedHeader.b64 === false) {
    throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
  }
  const payload = jwtPayload(verified.protectedHeader, verified.payload, options);
  const result = { payload, protectedHeader: verified.protectedHeader };
  if (typeof key === "function") {
    return { ...result, key: verified.key };
  }
  return result;
}
function getHMACKey(key) {
  const arrayBuffer = new Uint8Array(key.length);
  for (let i = 0, keyLen = key.length; i < keyLen; i++) {
    arrayBuffer[i] = key.charCodeAt(i);
  }
  return arrayBuffer;
}
const JWT_PERMITTED_CLOCK_TOLERANCE = 10;
function decodeSessionToken(config) {
  return async (token, { checkAudience = true } = {}) => {
    let payload;
    try {
      payload = (await jwtVerify(token, getHMACKey(config.apiSecretKey), {
        algorithms: ["HS256"],
        clockTolerance: JWT_PERMITTED_CLOCK_TOLERANCE
      })).payload;
    } catch (error) {
      throw new InvalidJwtError(`Failed to parse session token '${token}': ${error.message}`);
    }
    if (checkAudience && payload.aud !== config.apiKey) {
      throw new InvalidJwtError("Session token had invalid API key");
    }
    return payload;
  };
}
function getJwtSessionId(config) {
  return (shop, userId) => {
    return `${sanitizeShop(config)(shop, true)}_${userId}`;
  };
}
function getOfflineId(config) {
  return (shop) => {
    return `offline_${sanitizeShop(config)(shop, true)}`;
  };
}
function getCurrentSessionId(config) {
  return async function getCurrentSessionId2({ isOnline, ...adapterArgs }) {
    const request2 = await abstractConvertRequest(adapterArgs);
    const log2 = logger(config);
    if (config.isEmbeddedApp) {
      log2.debug("App is embedded, looking for session id in JWT payload", {
        isOnline
      });
      const authHeader = request2.headers.Authorization;
      if (authHeader) {
        const matches = (typeof authHeader === "string" ? authHeader : authHeader[0]).match(/^Bearer (.+)$/);
        if (!matches) {
          log2.error("Missing Bearer token in authorization header", { isOnline });
          throw new MissingJwtTokenError("Missing Bearer token in authorization header");
        }
        const jwtPayload2 = await decodeSessionToken(config)(matches[1]);
        const shop = jwtPayload2.dest.replace(/^https:\/\//, "");
        log2.debug("Found valid JWT payload", { shop, isOnline });
        if (isOnline) {
          return getJwtSessionId(config)(shop, jwtPayload2.sub);
        } else {
          return getOfflineId(config)(shop);
        }
      } else {
        log2.error("Missing Authorization header, was the request made with authenticatedFetch?", { isOnline });
      }
    } else {
      log2.debug("App is not embedded, looking for session id in cookies", {
        isOnline
      });
      const cookies = new Cookies(request2, {}, {
        keys: [config.apiSecretKey]
      });
      return cookies.getAndVerify(SESSION_COOKIE_NAME);
    }
    return void 0;
  };
}
function customAppSession(config) {
  return (shop) => {
    return new Session({
      id: "",
      shop: `${sanitizeShop(config)(shop, true)}`,
      state: "",
      isOnline: false
    });
  };
}
function createSession({ config, accessTokenResponse, shop, state }) {
  const associatedUser = accessTokenResponse.associated_user;
  const isOnline = Boolean(associatedUser);
  logger(config).info("Creating new session", { shop, isOnline });
  const getSessionExpiration = (expires_in) => new Date(Date.now() + expires_in * 1e3);
  const getOnlineSessionProperties = (responseBody) => {
    const { access_token, scope, ...rest } = responseBody;
    const sessionId = config.isEmbeddedApp ? getJwtSessionId(config)(shop, `${rest.associated_user.id}`) : v4();
    return {
      id: sessionId,
      onlineAccessInfo: rest,
      expires: getSessionExpiration(rest.expires_in)
    };
  };
  const getOfflineSessionProperties = (responseBody) => {
    const { expires_in } = responseBody;
    return {
      id: getOfflineId(config)(shop),
      ...expires_in && { expires: getSessionExpiration(expires_in) }
    };
  };
  return new Session({
    shop,
    state,
    isOnline,
    accessToken: accessTokenResponse.access_token,
    scope: accessTokenResponse.scope,
    ...isOnline ? getOnlineSessionProperties(accessTokenResponse) : getOfflineSessionProperties(accessTokenResponse)
  });
}
const logForBot = ({ request: request2, log: log2, func }) => {
  log2.debug(`Possible bot request to auth ${func}: `, {
    userAgent: request2.headers["User-Agent"]
  });
};
function begin(config) {
  return async ({ shop, callbackPath, isOnline, ...adapterArgs }) => {
    throwIfCustomStoreApp(config.isCustomStoreApp, "Cannot perform OAuth for private apps");
    const log2 = logger(config);
    log2.info("Beginning OAuth", { shop, isOnline, callbackPath });
    const request2 = await abstractConvertRequest(adapterArgs);
    const response = await abstractConvertIncomingResponse();
    let userAgent = request2.headers["User-Agent"];
    if (Array.isArray(userAgent)) {
      userAgent = userAgent[0];
    }
    if (isbot(userAgent)) {
      logForBot({ request: request2, log: log2, func: "begin" });
      response.statusCode = 410;
      return abstractConvertResponse(response, adapterArgs);
    }
    const cookies = new Cookies(request2, response, {
      keys: [config.apiSecretKey],
      secure: true
    });
    const state = nonce();
    await cookies.setAndSign(STATE_COOKIE_NAME, state, {
      expires: new Date(Date.now() + 6e4),
      sameSite: "lax",
      secure: true,
      path: callbackPath
    });
    const scopes = config.scopes ? config.scopes.toString() : "";
    const query = {
      client_id: config.apiKey,
      scope: scopes,
      redirect_uri: `${config.hostScheme}://${config.hostName}${callbackPath}`,
      state,
      "grant_options[]": isOnline ? "per-user" : ""
    };
    const processedQuery = new ProcessedQuery();
    processedQuery.putAll(query);
    const cleanShop = sanitizeShop(config)(shop, true);
    const redirectUrl = `https://${cleanShop}/admin/oauth/authorize${processedQuery.stringify()}`;
    response.statusCode = 302;
    response.statusText = "Found";
    response.headers = {
      ...response.headers,
      ...cookies.response.headers,
      Location: redirectUrl
    };
    log2.debug(`OAuth started, redirecting to ${redirectUrl}`, { shop, isOnline });
    return abstractConvertResponse(response, adapterArgs);
  };
}
function callback(config) {
  return async function callback2({ ...adapterArgs }) {
    throwIfCustomStoreApp(config.isCustomStoreApp, "Cannot perform OAuth for private apps");
    const log2 = logger(config);
    const request2 = await abstractConvertRequest(adapterArgs);
    const query = new URL(request2.url, `${config.hostScheme}://${config.hostName}`).searchParams;
    const shop = query.get("shop");
    const response = {};
    let userAgent = request2.headers["User-Agent"];
    if (Array.isArray(userAgent)) {
      userAgent = userAgent[0];
    }
    if (isbot(userAgent)) {
      logForBot({ request: request2, log: log2, func: "callback" });
      throw new BotActivityDetected("Invalid OAuth callback initiated by bot");
    }
    log2.info("Completing OAuth", { shop });
    const cookies = new Cookies(request2, response, {
      keys: [config.apiSecretKey],
      secure: true
    });
    const stateFromCookie = await cookies.getAndVerify(STATE_COOKIE_NAME);
    cookies.deleteCookie(STATE_COOKIE_NAME);
    if (!stateFromCookie) {
      log2.error("Could not find OAuth cookie", { shop });
      throw new CookieNotFound(`Cannot complete OAuth process. Could not find an OAuth cookie for shop url: ${shop}`);
    }
    const authQuery = Object.fromEntries(query.entries());
    if (!await validQuery({ config, query: authQuery, stateFromCookie })) {
      log2.error("Invalid OAuth callback", { shop, stateFromCookie });
      throw new InvalidOAuthError("Invalid OAuth callback.");
    }
    log2.debug("OAuth request is valid, requesting access token", { shop });
    const body = {
      client_id: config.apiKey,
      client_secret: config.apiSecretKey,
      code: query.get("code")
    };
    const cleanShop = sanitizeShop(config)(query.get("shop"), true);
    const postResponse = await fetchRequestFactory(config)(`https://${cleanShop}/admin/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": DataType.JSON,
        Accept: DataType.JSON
      }
    });
    if (!postResponse.ok) {
      throwFailedRequest(await postResponse.json(), false, postResponse);
    }
    const session = createSession({
      accessTokenResponse: await postResponse.json(),
      shop: cleanShop,
      state: stateFromCookie,
      config
    });
    if (!config.isEmbeddedApp) {
      await cookies.setAndSign(SESSION_COOKIE_NAME, session.id, {
        expires: session.expires,
        sameSite: "lax",
        secure: true,
        path: "/"
      });
    }
    return {
      headers: await abstractConvertHeaders(cookies.response.headers, adapterArgs),
      session
    };
  };
}
async function validQuery({ config, query, stateFromCookie }) {
  return await validateHmac(config)(query) && safeCompare(query.state, stateFromCookie);
}
function throwIfCustomStoreApp(isCustomStoreApp, message2) {
  if (isCustomStoreApp) {
    throw new PrivateAppError(message2);
  }
}
function getEmbeddedAppUrl(config) {
  return async ({ ...adapterArgs }) => {
    const request2 = await abstractConvertRequest(adapterArgs);
    if (!request2) {
      throw new MissingRequiredArgument("getEmbeddedAppUrl requires a request object argument");
    }
    if (!request2.url) {
      throw new InvalidRequestError("Request does not contain a URL");
    }
    const url = new URL(request2.url, `https://${request2.headers.host}`);
    const host = url.searchParams.get("host");
    if (typeof host !== "string") {
      throw new InvalidRequestError("Request does not contain a host query parameter");
    }
    return buildEmbeddedAppUrl(config)(host);
  };
}
function buildEmbeddedAppUrl(config) {
  return (host) => {
    sanitizeHost()(host, true);
    const decodedHost = decodeHost(host);
    return `https://${decodedHost}/apps/${config.apiKey}`;
  };
}
var RequestedTokenType;
(function(RequestedTokenType2) {
  RequestedTokenType2["OnlineAccessToken"] = "urn:shopify:params:oauth:token-type:online-access-token";
  RequestedTokenType2["OfflineAccessToken"] = "urn:shopify:params:oauth:token-type:offline-access-token";
})(RequestedTokenType || (RequestedTokenType = {}));
const TokenExchangeGrantType = "urn:ietf:params:oauth:grant-type:token-exchange";
const IdTokenType = "urn:ietf:params:oauth:token-type:id_token";
function tokenExchange(config) {
  return async ({ shop, sessionToken, requestedTokenType }) => {
    await decodeSessionToken(config)(sessionToken);
    const body = {
      client_id: config.apiKey,
      client_secret: config.apiSecretKey,
      grant_type: TokenExchangeGrantType,
      subject_token: sessionToken,
      subject_token_type: IdTokenType,
      requested_token_type: requestedTokenType
    };
    const cleanShop = sanitizeShop(config)(shop, true);
    const postResponse = await fetchRequestFactory(config)(`https://${cleanShop}/admin/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": DataType.JSON,
        Accept: DataType.JSON
      }
    });
    if (!postResponse.ok) {
      throwFailedRequest(await postResponse.json(), false, postResponse);
    }
    return {
      session: createSession({
        accessTokenResponse: await postResponse.json(),
        shop: cleanShop,
        // We need to keep this as an empty string as our template DB schemas have this required
        state: "",
        config
      })
    };
  };
}
const ClientCredentialsGrantType = "client_credentials";
function clientCredentials(config) {
  return async ({ shop }) => {
    const cleanShop = sanitizeShop(config)(shop, true);
    const requestConfig = {
      method: "POST",
      body: JSON.stringify({
        client_id: config.apiKey,
        client_secret: config.apiSecretKey,
        grant_type: ClientCredentialsGrantType
      }),
      headers: {
        "Content-Type": DataType.JSON,
        Accept: DataType.JSON
      }
    };
    const postResponse = await fetchRequestFactory(config)(`https://${cleanShop}/admin/oauth/access_token`, requestConfig);
    const responseData = await postResponse.json();
    if (!postResponse.ok) {
      throwFailedRequest(responseData, false, postResponse);
    }
    return {
      session: createSession({
        accessTokenResponse: responseData,
        shop: cleanShop,
        // We need to keep this as an empty string as our template DB schemas have this required
        state: "",
        config
      })
    };
  };
}
function shopifyAuth(config) {
  const shopify = {
    begin: begin(config),
    callback: callback(config),
    nonce,
    safeCompare,
    getEmbeddedAppUrl: getEmbeddedAppUrl(config),
    buildEmbeddedAppUrl: buildEmbeddedAppUrl(config),
    tokenExchange: tokenExchange(config),
    clientCredentials: clientCredentials(config)
  };
  return shopify;
}
function shopifySession(config) {
  return {
    customAppSession: customAppSession(config),
    getCurrentId: getCurrentSessionId(config),
    getOfflineId: getOfflineId(config),
    getJwtSessionId: getJwtSessionId(config),
    decodeSessionToken: decodeSessionToken(config)
  };
}
function versionCompatible(config) {
  return (referenceVersion, currentVersion = config.apiVersion) => {
    if (currentVersion === ApiVersion.Unstable) {
      return true;
    }
    const numericVersion = (version2) => parseInt(version2.replace("-", ""), 10);
    const current = numericVersion(currentVersion);
    const reference = numericVersion(referenceVersion);
    return current >= reference;
  };
}
function versionPriorTo(config) {
  return (referenceVersion, currentVersion = config.apiVersion) => {
    return !versionCompatible(config)(referenceVersion, currentVersion);
  };
}
function shopifyUtils(config) {
  return {
    sanitizeShop: sanitizeShop(config),
    sanitizeHost: sanitizeHost(),
    validateHmac: validateHmac(config),
    versionCompatible: versionCompatible(config),
    versionPriorTo: versionPriorTo(config),
    shopAdminUrlToLegacyUrl,
    legacyUrlToShopAdminUrl
  };
}
var DeliveryMethod;
(function(DeliveryMethod2) {
  DeliveryMethod2["Http"] = "http";
  DeliveryMethod2["EventBridge"] = "eventbridge";
  DeliveryMethod2["PubSub"] = "pubsub";
})(DeliveryMethod || (DeliveryMethod = {}));
var WebhookOperation;
(function(WebhookOperation2) {
  WebhookOperation2["Create"] = "create";
  WebhookOperation2["Update"] = "update";
  WebhookOperation2["Delete"] = "delete";
})(WebhookOperation || (WebhookOperation = {}));
const WebhookValidationErrorReason = {
  ...ValidationErrorReason,
  MissingHeaders: "missing_headers"
};
function registry() {
  return {};
}
function topicForStorage(topic) {
  return topic.toUpperCase().replace(/\/|\./g, "_");
}
function addHandlers(config, webhookRegistry) {
  return function addHandlers2(handlersToAdd) {
    for (const [topic, handlers] of Object.entries(handlersToAdd)) {
      const topicKey = topicForStorage(topic);
      if (Array.isArray(handlers)) {
        for (const handler of handlers) {
          mergeOrAddHandler(config, webhookRegistry, topicKey, handler);
        }
      } else {
        mergeOrAddHandler(config, webhookRegistry, topicKey, handlers);
      }
    }
  };
}
function getTopicsAdded(webhookRegistry) {
  return function getTopicsAdded2() {
    return Object.keys(webhookRegistry);
  };
}
function getHandlers(webhookRegistry) {
  return function getHandlers2(topic) {
    return webhookRegistry[topicForStorage(topic)] || [];
  };
}
function handlerIdentifier(config, handler) {
  const prefix = handler.deliveryMethod;
  switch (handler.deliveryMethod) {
    case DeliveryMethod.Http:
      return `${prefix}_${addHostToCallbackUrl(config, handler.callbackUrl)}`;
    case DeliveryMethod.EventBridge:
      return `${prefix}_${handler.arn}`;
    case DeliveryMethod.PubSub:
      return `${prefix}_${handler.pubSubProject}:${handler.pubSubTopic}`;
    default:
      throw new InvalidDeliveryMethodError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
  }
}
function addHostToCallbackUrl(config, callbackUrl) {
  if (callbackUrl.startsWith("/")) {
    return `${config.hostScheme}://${config.hostName}${callbackUrl}`;
  } else {
    return callbackUrl;
  }
}
function mergeOrAddHandler(config, webhookRegistry, topic, handler) {
  const log2 = logger(config);
  handler.includeFields?.sort();
  handler.metafieldNamespaces?.sort();
  if (!(topic in webhookRegistry)) {
    webhookRegistry[topic] = [handler];
    return;
  }
  const identifier = handlerIdentifier(config, handler);
  for (const index in webhookRegistry[topic]) {
    if (!Object.prototype.hasOwnProperty.call(webhookRegistry[topic], index)) {
      continue;
    }
    const existingHandler = webhookRegistry[topic][index];
    const existingIdentifier = handlerIdentifier(config, existingHandler);
    if (identifier !== existingIdentifier) {
      continue;
    }
    if (handler.deliveryMethod === DeliveryMethod.Http) {
      log2.info(`Detected multiple handlers for '${topic}', webhooks.process will call them sequentially`);
      break;
    } else {
      throw new InvalidDeliveryMethodError(`Can only add multiple handlers for a topic when deliveryMethod is Http. Please be sure that you used addHandler method once after creating ShopifyApi instance in your app.  Invalid handler: ${JSON.stringify(handler)}`);
    }
  }
  webhookRegistry[topic].push(handler);
}
function queryTemplate(template, params) {
  let query = template;
  Object.entries(params).forEach(([key, value]) => {
    query = query.replace(`{{${key}}}`, value);
  });
  return query;
}
function register(config, webhookRegistry) {
  return async function register2({ session }) {
    const log2 = logger(config);
    log2.info("Registering webhooks", { shop: session.shop });
    const registerReturn = Object.keys(webhookRegistry).reduce((acc, topic) => {
      acc[topic] = [];
      return acc;
    }, {});
    const existingHandlers = await getExistingHandlers(config, session);
    log2.debug(`Existing topics: [${Object.keys(existingHandlers).join(", ")}]`, { shop: session.shop });
    for (const topic in webhookRegistry) {
      if (!Object.prototype.hasOwnProperty.call(webhookRegistry, topic)) {
        continue;
      }
      if (privacyTopics.includes(topic)) {
        continue;
      }
      registerReturn[topic] = await registerTopic({
        config,
        session,
        topic,
        existingHandlers: existingHandlers[topic] || [],
        handlers: getHandlers(webhookRegistry)(topic)
      });
      delete existingHandlers[topic];
    }
    for (const topic in existingHandlers) {
      if (!Object.prototype.hasOwnProperty.call(existingHandlers, topic)) {
        continue;
      }
      const GraphqlClient2 = graphqlClientClass({ config });
      const client = new GraphqlClient2({ session });
      registerReturn[topic] = await runMutations({
        config,
        client,
        topic,
        handlers: existingHandlers[topic],
        operation: WebhookOperation.Delete
      });
    }
    return registerReturn;
  };
}
async function getExistingHandlers(config, session) {
  const GraphqlClient2 = graphqlClientClass({ config });
  const client = new GraphqlClient2({ session });
  const existingHandlers = {};
  let hasNextPage;
  let endCursor = null;
  do {
    const query = buildCheckQuery(endCursor);
    const response = await client.request(query);
    response.data?.webhookSubscriptions?.edges.forEach((edge) => {
      const handler = buildHandlerFromNode(edge);
      if (!existingHandlers[edge.node.topic]) {
        existingHandlers[edge.node.topic] = [];
      }
      existingHandlers[edge.node.topic].push(handler);
    });
    endCursor = response.data?.webhookSubscriptions?.pageInfo.endCursor;
    hasNextPage = response.data?.webhookSubscriptions?.pageInfo.hasNextPage;
  } while (hasNextPage);
  return existingHandlers;
}
function buildCheckQuery(endCursor) {
  return queryTemplate(TEMPLATE_GET_HANDLERS, {
    END_CURSOR: JSON.stringify(endCursor)
  });
}
function buildHandlerFromNode(edge) {
  const endpoint = edge.node.endpoint;
  let handler;
  switch (endpoint.__typename) {
    case "WebhookHttpEndpoint":
      handler = {
        deliveryMethod: DeliveryMethod.Http,
        callbackUrl: endpoint.callbackUrl,
        // This is a dummy for now because we don't really care about it
        callback: async () => {
        }
      };
      break;
    case "WebhookEventBridgeEndpoint":
      handler = {
        deliveryMethod: DeliveryMethod.EventBridge,
        arn: endpoint.arn
      };
      break;
    case "WebhookPubSubEndpoint":
      handler = {
        deliveryMethod: DeliveryMethod.PubSub,
        pubSubProject: endpoint.pubSubProject,
        pubSubTopic: endpoint.pubSubTopic
      };
      break;
  }
  handler.id = edge.node.id;
  handler.includeFields = edge.node.includeFields;
  handler.metafieldNamespaces = edge.node.metafieldNamespaces;
  handler.includeFields?.sort();
  handler.metafieldNamespaces?.sort();
  return handler;
}
async function registerTopic({ config, session, topic, existingHandlers, handlers }) {
  let registerResults = [];
  const { toCreate, toUpdate, toDelete } = categorizeHandlers(config, existingHandlers, handlers);
  const GraphqlClient2 = graphqlClientClass({ config });
  const client = new GraphqlClient2({ session });
  let operation = WebhookOperation.Create;
  registerResults = registerResults.concat(await runMutations({ config, client, topic, operation, handlers: toCreate }));
  operation = WebhookOperation.Update;
  registerResults = registerResults.concat(await runMutations({ config, client, topic, operation, handlers: toUpdate }));
  operation = WebhookOperation.Delete;
  registerResults = registerResults.concat(await runMutations({ config, client, topic, operation, handlers: toDelete }));
  return registerResults;
}
function categorizeHandlers(config, existingHandlers, handlers) {
  const handlersByKey = handlers.reduce((acc, value) => {
    acc[handlerIdentifier(config, value)] = value;
    return acc;
  }, {});
  const existingHandlersByKey = existingHandlers.reduce((acc, value) => {
    acc[handlerIdentifier(config, value)] = value;
    return acc;
  }, {});
  const toCreate = { ...handlersByKey };
  const toUpdate = {};
  const toDelete = {};
  for (const existingKey in existingHandlersByKey) {
    if (!Object.prototype.hasOwnProperty.call(existingHandlersByKey, existingKey)) {
      continue;
    }
    const existingHandler = existingHandlersByKey[existingKey];
    const handler = handlersByKey[existingKey];
    if (existingKey in handlersByKey) {
      delete toCreate[existingKey];
      if (!areHandlerFieldsEqual(existingHandler, handler)) {
        toUpdate[existingKey] = handler;
        toUpdate[existingKey].id = existingHandler.id;
      }
    } else {
      toDelete[existingKey] = existingHandler;
    }
  }
  return {
    toCreate: Object.values(toCreate),
    toUpdate: Object.values(toUpdate),
    toDelete: Object.values(toDelete)
  };
}
function areHandlerFieldsEqual(arr1, arr2) {
  const includeFieldsEqual = arraysEqual(arr1.includeFields || [], arr2.includeFields || []);
  const metafieldNamespacesEqual = arraysEqual(arr1.metafieldNamespaces || [], arr2.metafieldNamespaces || []);
  return includeFieldsEqual && metafieldNamespacesEqual;
}
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
async function runMutations({ config, client, topic, handlers, operation }) {
  const registerResults = [];
  for (const handler of handlers) {
    registerResults.push(await runMutation({ config, client, topic, handler, operation }));
  }
  return registerResults;
}
async function runMutation({ config, client, topic, handler, operation }) {
  let registerResult;
  logger(config).debug(`Running webhook mutation`, { topic, operation });
  try {
    const query = buildMutation(config, topic, handler, operation);
    const result = await client.request(query);
    registerResult = {
      deliveryMethod: handler.deliveryMethod,
      success: isSuccess(result, handler, operation),
      result,
      operation
    };
  } catch (error) {
    if (error instanceof InvalidDeliveryMethodError) {
      registerResult = {
        deliveryMethod: handler.deliveryMethod,
        success: false,
        result: { message: error.message },
        operation
      };
    } else {
      throw error;
    }
  }
  return registerResult;
}
function buildMutation(config, topic, handler, operation) {
  const params = {};
  let identifier;
  if (handler.id) {
    identifier = `id: "${handler.id}"`;
  } else {
    identifier = `topic: ${topic}`;
  }
  const mutationArguments = {
    MUTATION_NAME: getMutationName(handler, operation),
    IDENTIFIER: identifier,
    MUTATION_PARAMS: ""
  };
  if (operation !== WebhookOperation.Delete) {
    switch (handler.deliveryMethod) {
      case DeliveryMethod.Http:
        params.callbackUrl = `"${addHostToCallbackUrl(config, handler.callbackUrl)}"`;
        break;
      case DeliveryMethod.EventBridge:
        params.arn = `"${handler.arn}"`;
        break;
      case DeliveryMethod.PubSub:
        params.pubSubProject = `"${handler.pubSubProject}"`;
        params.pubSubTopic = `"${handler.pubSubTopic}"`;
        break;
      default:
        throw new InvalidDeliveryMethodError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
    }
    if (handler.includeFields) {
      params.includeFields = JSON.stringify(handler.includeFields);
    }
    if (handler.metafieldNamespaces) {
      params.metafieldNamespaces = JSON.stringify(handler.metafieldNamespaces);
    }
    if (handler.subTopic) {
      const subTopicString = `subTopic: "${handler.subTopic}",`;
      mutationArguments.MUTATION_PARAMS = subTopicString;
    }
    const paramsString = Object.entries(params).map(([key, value]) => `${key}: ${value}`).join(", ");
    mutationArguments.MUTATION_PARAMS += `webhookSubscription: {${paramsString}}`;
  }
  return queryTemplate(TEMPLATE_MUTATION, mutationArguments);
}
function getMutationName(handler, operation) {
  switch (operation) {
    case WebhookOperation.Create:
      return `${getEndpoint(handler)}Create`;
    case WebhookOperation.Update:
      return `${getEndpoint(handler)}Update`;
    case WebhookOperation.Delete:
      return "webhookSubscriptionDelete";
    default:
      throw new ShopifyError(`Unrecognized operation '${operation}'`);
  }
}
function getEndpoint(handler) {
  switch (handler.deliveryMethod) {
    case DeliveryMethod.Http:
      return "webhookSubscription";
    case DeliveryMethod.EventBridge:
      return "eventBridgeWebhookSubscription";
    case DeliveryMethod.PubSub:
      return "pubSubWebhookSubscription";
    default:
      throw new ShopifyError(`Unrecognized delivery method '${handler.deliveryMethod}'`);
  }
}
function isSuccess(result, handler, operation) {
  const mutationName = getMutationName(handler, operation);
  return Boolean(result.data && result.data[mutationName] && result.data[mutationName].userErrors.length === 0);
}
const TEMPLATE_GET_HANDLERS = `query shopifyApiReadWebhookSubscriptions {
  webhookSubscriptions(
    first: 250,
    after: {{END_CURSOR}},
  ) {
    edges {
      node {
        id
        topic
        includeFields
        metafieldNamespaces
        endpoint {
          __typename
          ... on WebhookHttpEndpoint {
            callbackUrl
          }
          ... on WebhookEventBridgeEndpoint {
            arn
          }
          ... on WebhookPubSubEndpoint {
            pubSubProject
            pubSubTopic
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`;
const TEMPLATE_MUTATION = `
  mutation shopifyApiCreateWebhookSubscription {
    {{MUTATION_NAME}}(
      {{IDENTIFIER}},
      {{MUTATION_PARAMS}}
    ) {
      userErrors {
        field
        message
      }
    }
  }
`;
const OPTIONAL_HANDLER_PROPERTIES = {
  subTopic: ShopifyHeader.SubTopic
};
const HANDLER_PROPERTIES = {
  apiVersion: ShopifyHeader.ApiVersion,
  domain: ShopifyHeader.Domain,
  hmac: ShopifyHeader.Hmac,
  topic: ShopifyHeader.Topic,
  webhookId: ShopifyHeader.WebhookId,
  ...OPTIONAL_HANDLER_PROPERTIES
};
function validateFactory$2(config) {
  return async function validate({ rawBody, ...adapterArgs }) {
    const request2 = await abstractConvertRequest(adapterArgs);
    const validHmacResult = await validateHmacFromRequestFactory(config)({
      type: HmacValidationType.Webhook,
      rawBody,
      ...adapterArgs
    });
    if (!validHmacResult.valid) {
      if (validHmacResult.reason === ValidationErrorReason.InvalidHmac) {
        const log2 = logger(config);
        await log2.debug("Webhook HMAC validation failed. Please note that events manually triggered from a store's Notifications settings will fail this validation. To test this, please use the CLI or trigger the actual event in a development store.");
      }
      return validHmacResult;
    }
    return checkWebhookHeaders(request2.headers);
  };
}
function checkWebhookHeaders(headers) {
  const missingHeaders = [];
  const entries = Object.entries(HANDLER_PROPERTIES);
  const headerValues = entries.reduce((acc, [property, headerName]) => {
    const headerValue = getHeader(headers, headerName);
    if (headerValue) {
      acc[property] = headerValue;
    } else if (!(property in OPTIONAL_HANDLER_PROPERTIES)) {
      missingHeaders.push(headerName);
    }
    return acc;
  }, {});
  if (missingHeaders.length) {
    return {
      valid: false,
      reason: WebhookValidationErrorReason.MissingHeaders,
      missingHeaders
    };
  } else {
    return {
      valid: true,
      ...headerValues,
      ...headerValues.subTopic ? { subTopic: headerValues.subTopic } : {},
      topic: topicForStorage(headerValues.topic)
    };
  }
}
const STATUS_TEXT_LOOKUP = {
  [StatusCode.Ok]: "OK",
  [StatusCode.BadRequest]: "Bad Request",
  [StatusCode.Unauthorized]: "Unauthorized",
  [StatusCode.NotFound]: "Not Found",
  [StatusCode.InternalServerError]: "Internal Server Error"
};
function process$1(config, webhookRegistry) {
  return async function process2({ context: context2, rawBody, ...adapterArgs }) {
    const response = {
      statusCode: StatusCode.Ok,
      statusText: STATUS_TEXT_LOOKUP[StatusCode.Ok],
      headers: {}
    };
    await logger(config).info("Receiving webhook request");
    const webhookCheck = await validateFactory$2(config)({
      rawBody,
      ...adapterArgs
    });
    let errorMessage = "Unknown error while handling webhook";
    if (webhookCheck.valid) {
      const handlerResult = await callWebhookHandlers(config, webhookRegistry, webhookCheck, rawBody, context2);
      response.statusCode = handlerResult.statusCode;
      if (!isOK(response)) {
        errorMessage = handlerResult.errorMessage || errorMessage;
      }
    } else {
      const errorResult = await handleInvalidWebhook(config, webhookCheck);
      response.statusCode = errorResult.statusCode;
      response.statusText = STATUS_TEXT_LOOKUP[response.statusCode];
      errorMessage = errorResult.errorMessage;
    }
    const returnResponse = await abstractConvertResponse(response, adapterArgs);
    if (!isOK(response)) {
      throw new InvalidWebhookError({
        message: errorMessage,
        response: returnResponse
      });
    }
    return Promise.resolve(returnResponse);
  };
}
async function callWebhookHandlers(config, webhookRegistry, webhookCheck, rawBody, context2) {
  const log2 = logger(config);
  const { hmac: _hmac, valid: _valid, ...loggingContext } = webhookCheck;
  await log2.debug("Webhook request is valid, looking for HTTP handlers to call", loggingContext);
  const handlers = webhookRegistry[webhookCheck.topic] || [];
  const response = { statusCode: StatusCode.Ok };
  let found = false;
  for (const handler of handlers) {
    if (handler.deliveryMethod !== DeliveryMethod.Http) {
      continue;
    }
    if (!handler.callback) {
      response.statusCode = StatusCode.InternalServerError;
      response.errorMessage = "Cannot call webhooks.process with a webhook handler that doesn't have a callback";
      throw new MissingWebhookCallbackError({
        message: response.errorMessage,
        response
      });
    }
    found = true;
    await log2.debug("Found HTTP handler, triggering it", loggingContext);
    try {
      await handler.callback(webhookCheck.topic, webhookCheck.domain, rawBody, webhookCheck.webhookId, webhookCheck.apiVersion, ...webhookCheck?.subTopic ? webhookCheck.subTopic : "", context2);
    } catch (error) {
      response.statusCode = StatusCode.InternalServerError;
      response.errorMessage = error.message;
    }
  }
  if (!found) {
    await log2.debug("No HTTP handlers found", loggingContext);
    response.statusCode = StatusCode.NotFound;
    response.errorMessage = `No HTTP webhooks registered for topic ${webhookCheck.topic}`;
  }
  return response;
}
async function handleInvalidWebhook(config, webhookCheck) {
  const response = {
    statusCode: StatusCode.InternalServerError,
    errorMessage: "Unknown error while handling webhook"
  };
  switch (webhookCheck.reason) {
    case WebhookValidationErrorReason.MissingHeaders:
      response.statusCode = StatusCode.BadRequest;
      response.errorMessage = `Missing one or more of the required HTTP headers to process webhooks: [${webhookCheck.missingHeaders.join(", ")}]`;
      break;
    case WebhookValidationErrorReason.MissingBody:
      response.statusCode = StatusCode.BadRequest;
      response.errorMessage = "No body was received when processing webhook";
      break;
    case WebhookValidationErrorReason.MissingHmac:
      response.statusCode = StatusCode.BadRequest;
      response.errorMessage = `Missing HMAC header in request`;
      break;
    case WebhookValidationErrorReason.InvalidHmac:
      response.statusCode = StatusCode.Unauthorized;
      response.errorMessage = `Could not validate request HMAC`;
      break;
  }
  await logger(config).debug(`Webhook request is invalid, returning ${response.statusCode}: ${response.errorMessage}`);
  return response;
}
function shopifyWebhooks(config) {
  const webhookRegistry = registry();
  return {
    addHandlers: addHandlers(config, webhookRegistry),
    getTopicsAdded: getTopicsAdded(webhookRegistry),
    getHandlers: getHandlers(webhookRegistry),
    register: register(config, webhookRegistry),
    process: process$1(config, webhookRegistry),
    validate: validateFactory$2(config)
  };
}
const APP_SUBSCRIPTION_FRAGMENT = `
  fragment AppSubscriptionFragment on AppSubscription {
    id
    name
    test
    status
    trialDays
    createdAt
    currentPeriodEnd
    returnUrl
    lineItems {
      id
      plan {
        pricingDetails {
          ... on AppRecurringPricing {
            price {
              amount
              currencyCode
            }
            interval
            discount {
              durationLimitInIntervals
              remainingDurationInIntervals
              priceAfterDiscount {
                amount
              }
              value {
                ... on AppSubscriptionDiscountAmount {
                  amount {
                    amount
                    currencyCode
                  }
                }
                ... on AppSubscriptionDiscountPercentage {
                  percentage
                }
              }
            }
          }
          ... on AppUsagePricing {
            balanceUsed {
              amount
              currencyCode
            }
            cappedAmount {
              amount
              currencyCode
            }
            terms
          }
        }
      }
    }
  }
`;
function convertMoneyAmount(data) {
  if (!data)
    return data;
  convertAppUsagePricingMoney(data);
  convertAppRecurringPricingMoney(data);
  convertAppDiscountMoney(data);
  return data;
}
function convertAppRecurringPricingMoney(data) {
  if (!data)
    return;
  if (data.price?.amount && typeof data.price.amount === "string") {
    data.price.amount = parseFloat(data.price.amount);
  }
}
function convertAppDiscountMoney(data) {
  if (!data)
    return;
  if (data.discount?.priceAfterDiscount?.amount && typeof data.discount.priceAfterDiscount.amount === "string") {
    data.discount.priceAfterDiscount.amount = parseFloat(data.discount.priceAfterDiscount.amount);
  }
  if (data.discount?.value?.amount?.amount && typeof data.discount.value.amount.amount === "string") {
    data.discount.value.amount.amount = parseFloat(data.discount.value.amount.amount);
  }
}
function convertAppUsagePricingMoney(data) {
  if (!data)
    return;
  if (data.balanceUsed?.amount && typeof data.balanceUsed.amount === "string") {
    data.balanceUsed.amount = parseFloat(data.balanceUsed.amount);
  }
  if (data.cappedAmount?.amount && typeof data.cappedAmount.amount === "string") {
    data.cappedAmount.amount = parseFloat(data.cappedAmount.amount);
  }
}
function convertLineItems(lineItems) {
  return lineItems.map((item) => {
    if (item.plan?.pricingDetails) {
      item.plan.pricingDetails = convertMoneyAmount(item.plan.pricingDetails);
    }
    return item;
  });
}
function check(config) {
  return async function check2(params) {
    if (!config.future?.unstable_managedPricingSupport && !config.billing) {
      throw new BillingError({
        message: "Attempted to look for purchases without billing configs",
        errorData: []
      });
    }
    const { session, isTest = true, plans } = params;
    const returnObject = params.returnObject ?? false;
    const GraphqlClient2 = graphqlClientClass({ config });
    const client = new GraphqlClient2({ session });
    const payments = await assessPayments({ client, isTest, plans });
    if (config.future?.unstable_managedPricingSupport || returnObject) {
      return payments;
    } else {
      return payments.hasActivePayment;
    }
  };
}
async function assessPayments({ client, isTest, plans }) {
  const returnValue = {
    hasActivePayment: false,
    oneTimePurchases: [],
    appSubscriptions: []
  };
  let installation;
  let endCursor = null;
  do {
    const currentInstallations = await client.request(HAS_PAYMENTS_QUERY, { variables: { endCursor } });
    installation = currentInstallations.data?.currentAppInstallation;
    installation.activeSubscriptions.forEach((subscription) => {
      if (subscriptionMeetsCriteria({ subscription, isTest, plans })) {
        returnValue.hasActivePayment = true;
        if (subscription.lineItems) {
          subscription.lineItems = convertLineItems(subscription.lineItems);
        }
        returnValue.appSubscriptions.push(subscription);
      }
    });
    installation.oneTimePurchases.edges.forEach(({ node: purchase }) => {
      if (purchaseMeetsCriteria({ purchase, isTest, plans })) {
        returnValue.hasActivePayment = true;
        returnValue.oneTimePurchases.push(purchase);
      }
    });
    endCursor = installation.oneTimePurchases.pageInfo.endCursor;
  } while (installation?.oneTimePurchases.pageInfo.hasNextPage);
  return returnValue;
}
function subscriptionMeetsCriteria({ subscription, isTest, plans }) {
  return (typeof plans === "undefined" || plans.includes(subscription.name)) && (isTest || !subscription.test);
}
function purchaseMeetsCriteria({ purchase, isTest, plans }) {
  return (typeof plans === "undefined" || plans.includes(purchase.name)) && (isTest || !purchase.test) && purchase.status === "ACTIVE";
}
const HAS_PAYMENTS_QUERY = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  query appSubscription($endCursor: String) {
    currentAppInstallation {
      activeSubscriptions {
        ...AppSubscriptionFragment
      }
      oneTimePurchases(first: 250, sortKey: CREATED_AT, after: $endCursor) {
        edges {
          node {
            id
            name
            test
            status
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
const RECURRING_PURCHASE_MUTATION = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  mutation AppSubscriptionCreate(
    $name: String!
    $returnUrl: URL!
    $test: Boolean
    $trialDays: Int
    $replacementBehavior: AppSubscriptionReplacementBehavior
    $lineItems: [AppSubscriptionLineItemInput!]!
  ) {
    appSubscriptionCreate(
      name: $name
      returnUrl: $returnUrl
      test: $test
      trialDays: $trialDays
      replacementBehavior: $replacementBehavior
      lineItems: $lineItems
    ) {
      appSubscription {
        ...AppSubscriptionFragment
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
const ONE_TIME_PURCHASE_MUTATION = `
  mutation test(
    $name: String!
    $price: MoneyInput!
    $returnUrl: URL!
    $test: Boolean
  ) {
    appPurchaseOneTimeCreate(
      name: $name
      price: $price
      returnUrl: $returnUrl
      test: $test
    ) {
      appPurchaseOneTime {
        id
        name
        test
      }
      confirmationUrl
      userErrors {
        field
        message
      }
    }
  }
`;
function request(config) {
  return async function({ session, plan, isTest = true, returnUrl: returnUrlParam, returnObject = false, ...overrides }) {
    if (!config.billing || !config.billing[plan]) {
      throw new BillingError({
        message: `Could not find plan ${plan} in billing settings`,
        errorData: []
      });
    }
    const billingConfig = {
      ...config.billing[plan]
    };
    const filteredOverrides = Object.fromEntries(Object.entries(overrides).filter(([_key, value]) => value !== void 0));
    const cleanShopName = session.shop.replace(".myshopify.com", "");
    const embeddedAppUrl = buildEmbeddedAppUrl(config)(hashString(`admin.shopify.com/store/${cleanShopName}`, HashFormat.Base64));
    const appUrl = `${config.hostScheme}://${config.hostName}?shop=${session.shop}`;
    const returnUrl = returnUrlParam || (config.isEmbeddedApp ? embeddedAppUrl : appUrl);
    const GraphqlClient2 = graphqlClientClass({ config });
    const client = new GraphqlClient2({ session });
    function isLineItemPlan(billingConfig2) {
      return "lineItems" in billingConfig2;
    }
    function isOneTimePlan(billingConfig2) {
      return billingConfig2.interval === BillingInterval.OneTime;
    }
    let data;
    if (isLineItemPlan(billingConfig)) {
      const mergedBillingConfigs = mergeBillingConfigs(billingConfig, filteredOverrides);
      const mutationRecurringResponse = await requestSubscriptionPayment({
        billingConfig: mergedBillingConfigs,
        plan,
        client,
        returnUrl,
        isTest
      });
      data = mutationRecurringResponse.appSubscriptionCreate;
    } else if (isOneTimePlan(billingConfig)) {
      const mutationOneTimeResponse = await requestSinglePayment({
        billingConfig: { ...billingConfig, ...filteredOverrides },
        plan,
        client,
        returnUrl,
        isTest
      });
      data = mutationOneTimeResponse.appPurchaseOneTimeCreate;
    } else {
      switch (billingConfig.interval) {
        case BillingInterval.Usage: {
          const mutationUsageResponse = await requestUsagePayment({
            billingConfig: { ...billingConfig, ...filteredOverrides },
            plan,
            client,
            returnUrl,
            isTest
          });
          data = mutationUsageResponse.appSubscriptionCreate;
          break;
        }
        default: {
          const mutationRecurringResponse = await requestRecurringPayment({
            billingConfig: { ...billingConfig, ...filteredOverrides },
            plan,
            client,
            returnUrl,
            isTest
          });
          data = mutationRecurringResponse.appSubscriptionCreate;
        }
      }
    }
    if (data.userErrors?.length) {
      throw new BillingError({
        message: "Error while billing the store",
        errorData: data.userErrors
      });
    }
    if (returnObject) {
      return data;
    } else {
      return data.confirmationUrl;
    }
  };
}
async function requestSubscriptionPayment({ billingConfig, plan, client, returnUrl, isTest }) {
  const lineItems = billingConfig.lineItems.map((item) => {
    if (item.interval === BillingInterval.Every30Days || item.interval === BillingInterval.Annual) {
      const appRecurringPricingDetails = {
        interval: item.interval,
        price: {
          amount: item.amount,
          currencyCode: item.currencyCode
        }
      };
      if (item.discount) {
        appRecurringPricingDetails.discount = {
          durationLimitInIntervals: item.discount.durationLimitInIntervals,
          value: {
            amount: item.discount.value.amount,
            percentage: item.discount.value.percentage
          }
        };
      }
      return {
        plan: {
          appRecurringPricingDetails
        }
      };
    } else if (item.interval === BillingInterval.Usage) {
      const appUsagePricingDetails = {
        terms: item.terms,
        cappedAmount: {
          amount: item.amount,
          currencyCode: item.currencyCode
        }
      };
      return {
        plan: {
          appUsagePricingDetails
        }
      };
    } else {
      throw new BillingError({
        message: "Invalid interval provided",
        errorData: [item]
      });
    }
  });
  const mutationResponse = await client.request(RECURRING_PURCHASE_MUTATION, {
    variables: {
      name: plan,
      trialDays: billingConfig.trialDays,
      replacementBehavior: billingConfig.replacementBehavior,
      returnUrl,
      test: isTest,
      lineItems
    }
  });
  if (mutationResponse.errors) {
    throw new BillingError({
      message: "Error while billing the store",
      errorData: mutationResponse.errors
    });
  }
  return mutationResponse.data;
}
async function requestRecurringPayment({ billingConfig, plan, client, returnUrl, isTest }) {
  const mutationResponse = await client.request(RECURRING_PURCHASE_MUTATION, {
    variables: {
      name: plan,
      returnUrl,
      test: isTest,
      trialDays: billingConfig.trialDays,
      replacementBehavior: billingConfig.replacementBehavior,
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              interval: billingConfig.interval,
              price: {
                amount: billingConfig.amount,
                currencyCode: billingConfig.currencyCode
              },
              discount: billingConfig.discount ? {
                durationLimitInIntervals: billingConfig.discount?.durationLimitInIntervals,
                value: {
                  amount: billingConfig.discount?.value?.amount,
                  percentage: billingConfig.discount?.value?.percentage
                }
              } : void 0
            }
          }
        }
      ]
    }
  });
  if (mutationResponse.data?.appSubscriptionCreate?.userErrors.length) {
    throw new BillingError({
      message: "Error while creating a subscription",
      errorData: mutationResponse.data?.appSubscriptionCreate?.userErrors
    });
  }
  return mutationResponse.data;
}
async function requestUsagePayment({ billingConfig, plan, client, returnUrl, isTest }) {
  const mutationResponse = await client.request(RECURRING_PURCHASE_MUTATION, {
    variables: {
      name: plan,
      returnUrl,
      test: isTest,
      trialDays: billingConfig.trialDays,
      replacementBehavior: billingConfig.replacementBehavior,
      lineItems: [
        {
          plan: {
            appUsagePricingDetails: {
              terms: billingConfig.usageTerms,
              cappedAmount: {
                amount: billingConfig.amount,
                currencyCode: billingConfig.currencyCode
              }
            }
          }
        }
      ]
    }
  });
  if (mutationResponse.data?.appSubscriptionCreate?.userErrors.length) {
    throw new BillingError({
      message: "Error while creating a subscription",
      errorData: mutationResponse.data?.appSubscriptionCreate?.userErrors
    });
  }
  return mutationResponse.data;
}
async function requestSinglePayment({ billingConfig, plan, client, returnUrl, isTest }) {
  const mutationResponse = await client.request(ONE_TIME_PURCHASE_MUTATION, {
    variables: {
      name: plan,
      returnUrl,
      test: isTest,
      price: {
        amount: billingConfig.amount,
        currencyCode: billingConfig.currencyCode
      }
    }
  });
  if (mutationResponse.errors) {
    throw new BillingError({
      message: "Error while billing the store",
      errorData: mutationResponse.errors
    });
  }
  return mutationResponse.data;
}
function mergeBillingConfigs(billingConfig, overrides) {
  const mergedConfig = { ...billingConfig, ...overrides };
  const mergedLineItems = [];
  if (billingConfig.lineItems && overrides.lineItems) {
    for (const i of billingConfig.lineItems) {
      let found = false;
      for (const j of overrides.lineItems) {
        if (i.interval === j.interval) {
          mergedLineItems.push({ ...i, ...j });
          found = true;
          break;
        }
      }
      if (!found) {
        mergedLineItems.push(i);
      }
    }
    mergedConfig.lineItems = mergedLineItems;
  }
  return mergedConfig;
}
const CANCEL_MUTATION = `
  ${APP_SUBSCRIPTION_FRAGMENT}
  mutation appSubscriptionCancel($id: ID!, $prorate: Boolean) {
    appSubscriptionCancel(id: $id, prorate: $prorate) {
      appSubscription {
        ...AppSubscriptionFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;
function cancel(config) {
  return async function(subscriptionInfo) {
    const { session, subscriptionId, prorate = true } = subscriptionInfo;
    const GraphqlClient2 = graphqlClientClass({ config });
    const client = new GraphqlClient2({ session });
    try {
      const response = await client.request(CANCEL_MUTATION, {
        variables: { id: subscriptionId, prorate }
      });
      if (response.data?.appSubscriptionCancel?.userErrors.length) {
        throw new BillingError({
          message: "Error while canceling a subscription",
          errorData: response.data?.appSubscriptionCancel?.userErrors
        });
      }
      return response.data?.appSubscriptionCancel?.appSubscription;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new BillingError({
          message: error.message,
          errorData: error.response?.errors
        });
      } else {
        throw error;
      }
    }
  };
}
const SUBSCRIPTION_QUERY = `
${APP_SUBSCRIPTION_FRAGMENT}
query appSubscription {
  currentAppInstallation {
    activeSubscriptions {
      ...AppSubscriptionFragment
    }
  }
}
`;
function subscriptions(config) {
  return async function({ session }) {
    if (!config.future?.unstable_managedPricingSupport && !config.billing) {
      throw new BillingError({
        message: "Attempted to look for purchases without billing configs",
        errorData: []
      });
    }
    const GraphqlClient2 = graphqlClientClass({ config });
    const client = new GraphqlClient2({ session });
    const response = await client.request(SUBSCRIPTION_QUERY);
    if (!response.data?.currentAppInstallation?.activeSubscriptions) {
      return { activeSubscriptions: [] };
    }
    const activeSubscriptions = response.data.currentAppInstallation.activeSubscriptions;
    activeSubscriptions.forEach((subscription) => {
      if (subscription.lineItems) {
        subscription.lineItems = convertLineItems(subscription.lineItems);
      }
    });
    return {
      activeSubscriptions
    };
  };
}
const CREATE_USAGE_RECORD_MUTATION = `
mutation appUsageRecordCreate($description: String!, $price: MoneyInput!, $subscriptionLineItemId: ID!) {
  appUsageRecordCreate(description: $description, price: $price, subscriptionLineItemId: $subscriptionLineItemId) {
    userErrors {
      field
      message
    }
    appUsageRecord {
      id
      description
      idempotencyKey
      price {
        amount
        currencyCode
      }
      subscriptionLineItem {
        id
        plan {
          pricingDetails {
            ... on AppUsagePricing {
              balanceUsed {
                amount
                currencyCode
              }
              cappedAmount {
                amount
                currencyCode
              }
              terms
            }
          }
        }
      }
    }
  }
}
`;
function createUsageRecord(config) {
  return async function createUsageRecord2(usageRecordInfo) {
    const { session, subscriptionLineItemId, description, price, idempotencyKey, isTest = true } = usageRecordInfo;
    const GraphqlClient2 = graphqlClientClass({ config });
    const client = new GraphqlClient2({ session });
    const usageSubscriptionLineItemId = subscriptionLineItemId ? subscriptionLineItemId : await getUsageRecordSubscriptionLineItemId({ client, isTest });
    const variables = {
      description,
      price,
      subscriptionLineItemId: usageSubscriptionLineItemId
    };
    if (idempotencyKey) {
      variables.idempotencyKey = idempotencyKey;
    }
    try {
      const response = await client.request(CREATE_USAGE_RECORD_MUTATION, {
        variables
      });
      if (response.data?.appUsageRecordCreate?.userErrors.length) {
        throw new BillingError({
          message: "Error while creating a usage record",
          errorData: response.data?.appUsageRecordCreate?.userErrors
        });
      }
      const appUsageRecord = response.data?.appUsageRecordCreate?.appUsageRecord;
      convertAppRecurringPricingMoney(appUsageRecord.price);
      convertAppUsagePricingMoney(appUsageRecord.subscriptionLineItem.plan.pricingDetails);
      return appUsageRecord;
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new BillingError({
          message: error.message,
          errorData: error.response?.errors
        });
      } else {
        throw error;
      }
    }
  };
}
async function getUsageRecordSubscriptionLineItemId({ client, isTest }) {
  const payments = await assessPayments({ client, isTest });
  if (!payments.hasActivePayment) {
    throw new BillingError({
      message: "No active payment found",
      errorData: []
    });
  }
  if (!payments.appSubscriptions.length) {
    throw new BillingError({
      message: "No active subscriptions found",
      errorData: []
    });
  }
  if (payments.appSubscriptions) {
    const usageSubscriptionLineItemId = getUsageLineItemId(payments.appSubscriptions);
    return usageSubscriptionLineItemId;
  }
  throw new BillingError({
    message: "Unable to find active subscription line item",
    errorData: []
  });
}
function getUsageLineItemId(subscriptions2) {
  for (const subscription of subscriptions2) {
    if (subscription.status === "ACTIVE" && subscription.lineItems) {
      for (const lineItem of subscription.lineItems) {
        if ("balanceUsed" in lineItem.plan.pricingDetails) {
          return lineItem.id;
        }
      }
    }
  }
  throw new BillingError({
    message: "No active usage subscription found",
    errorData: []
  });
}
const UPDATE_USAGE_CAPPED_AMOUNT_MUTATION = `
${APP_SUBSCRIPTION_FRAGMENT}
mutation appSubscriptionLineItemUpdate($cappedAmount: MoneyInput!, $id: ID!) {
  appSubscriptionLineItemUpdate(cappedAmount: $cappedAmount, id: $id) {
    userErrors {
      field
      message
    }
    confirmationUrl
    appSubscription {
      ...AppSubscriptionFragment
    }
  }
}
`;
function updateUsageCappedAmount(config) {
  return async function updateUsageCappedAmount2(params) {
    if (!config.billing) {
      throw new BillingError({
        message: "Attempted to update line item without billing configs",
        errorData: []
      });
    }
    const { session, subscriptionLineItemId, cappedAmount: { amount, currencyCode } } = params;
    const GraphqlClient2 = graphqlClientClass({ config });
    const client = new GraphqlClient2({ session });
    try {
      const response = await client.request(UPDATE_USAGE_CAPPED_AMOUNT_MUTATION, {
        variables: {
          id: subscriptionLineItemId,
          cappedAmount: {
            amount,
            currencyCode
          }
        }
      });
      if (response.data?.appSubscriptionLineItemUpdate?.userErrors.length) {
        throw new BillingError({
          message: "Error while updating usage subscription capped amount",
          errorData: response.data?.appSubscriptionLineItemUpdate?.userErrors
        });
      }
      const appSubscription = response.data?.appSubscriptionLineItemUpdate?.appSubscription;
      if (appSubscription && appSubscription.lineItems) {
        appSubscription.lineItems = convertLineItems(appSubscription.lineItems);
      }
      return {
        confirmationUrl: response.data?.appSubscriptionLineItemUpdate?.confirmationUrl,
        appSubscription
      };
    } catch (error) {
      if (error instanceof GraphqlQueryError) {
        throw new BillingError({
          message: error.message,
          errorData: error.response?.errors
        });
      }
      throw error;
    }
  };
}
function shopifyBilling(config) {
  return {
    check: check(config),
    request: request(config),
    cancel: cancel(config),
    subscriptions: subscriptions(config),
    createUsageRecord: createUsageRecord(config),
    updateUsageCappedAmount: updateUsageCappedAmount(config)
  };
}
function validateFactory$1(config) {
  return async function validate({ rawBody, ...adapterArgs }) {
    return validateHmacFromRequestFactory(config)({
      type: HmacValidationType.Flow,
      rawBody,
      ...adapterArgs
    });
  };
}
function shopifyFlow(config) {
  return {
    validate: validateFactory$1(config)
  };
}
function validateFactory(config) {
  return async function validate({ rawBody, ...adapterArgs }) {
    return validateHmacFromRequestFactory(config)({
      type: HmacValidationType.FulfillmentService,
      rawBody,
      ...adapterArgs
    });
  };
}
function fulfillmentService(config) {
  return {
    validate: validateFactory(config)
  };
}
function shopifyApi({ future: future2, restResources, ...config }) {
  const libConfig = { ...config, future: future2, restResources };
  const validatedConfig = validateConfig(libConfig);
  const shopify = {
    config: validatedConfig,
    clients: clientClasses(validatedConfig),
    auth: shopifyAuth(validatedConfig),
    session: shopifySession(validatedConfig),
    utils: shopifyUtils(validatedConfig),
    webhooks: shopifyWebhooks(validatedConfig),
    billing: shopifyBilling(validatedConfig),
    flow: shopifyFlow(validatedConfig),
    fulfillmentService: fulfillmentService(validatedConfig),
    logger: logger(validatedConfig),
    rest: {}
  };
  if (restResources) {
    shopify.rest = loadRestResources({
      resources: restResources,
      config: validatedConfig,
      RestClient: restClientClass({ config: validatedConfig })
    });
  }
  shopify.logger.info(`version ${SHOPIFY_API_LIBRARY_VERSION}, environment ${abstractRuntimeString()}`).catch((err) => console.log(err));
  logDisabledFutureFlags$1(validatedConfig, shopify.logger);
  return shopify;
}
var AppDistribution;
(function(AppDistribution2) {
  AppDistribution2["AppStore"] = "app_store";
  AppDistribution2["SingleMerchant"] = "single_merchant";
  AppDistribution2["ShopifyAdmin"] = "shopify_admin";
})(AppDistribution || (AppDistribution = {}));
var LoginErrorType;
(function(LoginErrorType2) {
  LoginErrorType2["MissingShop"] = "MISSING_SHOP";
  LoginErrorType2["InvalidShop"] = "INVALID_SHOP";
})(LoginErrorType || (LoginErrorType = {}));
const SHOPIFY_REMIX_LIBRARY_VERSION = "3.8.5";
function registerWebhooksFactory({ api, logger: logger2 }) {
  return async function registerWebhooks({ session }) {
    return api.webhooks.register({ session }).then((response) => {
      Object.entries(response).forEach(([topic, topicResults]) => {
        topicResults.forEach(({ success, ...rest }) => {
          if (success) {
            logger2.debug("Registered webhook", {
              topic,
              shop: session.shop,
              operation: rest.operation
            });
          } else {
            logger2.error("Failed to register webhook", {
              topic,
              shop: session.shop,
              result: JSON.stringify(rest.result)
            });
          }
        });
      });
      return response;
    }).catch((error) => {
      const graphQLErrors = error.body?.errors?.graphQLErrors || [];
      const throttled = graphQLErrors.find(({ extensions: { code } }) => code === "THROTTLED");
      if (throttled) {
        logger2.error("Failed to register webhooks", {
          shop: session.shop,
          error: JSON.stringify(error)
        });
      } else {
        throw error;
      }
    });
  };
}
const APP_BRIDGE_URL = "https://cdn.shopify.com/shopifycloud/app-bridge.js";
const REAUTH_URL_HEADER = "X-Shopify-API-Request-Failure-Reauthorize-Url";
const RETRY_INVALID_SESSION_HEADER = {
  "X-Shopify-Retry-Invalid-Session-Request": "1"
};
function ensureCORSHeadersFactory(params, request2, corsHeaders = []) {
  const { logger: logger2, config } = params;
  return function ensureCORSHeaders(response) {
    const origin = request2.headers.get("Origin");
    if (origin && origin !== config.appUrl) {
      logger2.debug("Request comes from a different origin, adding CORS headers");
      const corsHeadersSet = /* @__PURE__ */ new Set([
        "Authorization",
        "Content-Type",
        ...corsHeaders
      ]);
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Headers", [...corsHeadersSet].join(", "));
      response.headers.set("Access-Control-Expose-Headers", REAUTH_URL_HEADER);
    }
    return response;
  };
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
const redirect$1 = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
const redirect2 = (url, init = 302) => {
  return redirect$1(url, init);
};
const redirectToBouncePage = (params, url) => {
  const { config } = params;
  const searchParams = url.searchParams;
  searchParams.delete("id_token");
  searchParams.set("shopify-reload", `${config.appUrl}${url.pathname}?${searchParams.toString()}`);
  throw redirect2(`${config.auth.patchSessionTokenPath}?${searchParams.toString()}`);
};
function respondToInvalidSessionToken({ params, request: request2, retryRequest = false }) {
  const { api, logger: logger2, config } = params;
  const isDocumentRequest = !request2.headers.get("authorization");
  if (isDocumentRequest) {
    return redirectToBouncePage({ config }, new URL(request2.url));
  }
  throw new Response(void 0, {
    status: 401,
    statusText: "Unauthorized",
    headers: retryRequest ? RETRY_INVALID_SESSION_HEADER : {}
  });
}
function getShopFromRequest(request2) {
  const url = new URL(request2.url);
  return url.searchParams.get("shop");
}
async function validateSessionToken(params, request2, token, { checkAudience = true, retryRequest = true } = {}) {
  const { api, logger: logger2 } = params;
  const shop = getShopFromRequest(request2);
  logger2.debug("Validating session token", { shop });
  try {
    const payload = await api.session.decodeSessionToken(token, {
      checkAudience
    });
    logger2.debug("Session token is valid - validated", {
      shop,
      payload: JSON.stringify(payload)
    });
    return payload;
  } catch (error) {
    logger2.debug(`Failed to validate session token: ${error.message}`, {
      shop
    });
    throw respondToInvalidSessionToken({ params, request: request2, retryRequest });
  }
}
const SESSION_TOKEN_PARAM$1 = "id_token";
function getSessionTokenHeader(request2) {
  return request2.headers.get("authorization")?.replace("Bearer ", "");
}
function getSessionTokenFromUrlParam(request2) {
  const url = new URL(request2.url);
  return url.searchParams.get(SESSION_TOKEN_PARAM$1);
}
const SHOPIFY_POS_USER_AGENT = /Shopify POS\//;
const SHOPIFY_MOBILE_USER_AGENT = /Shopify Mobile\//;
const SHOPIFY_USER_AGENTS = [SHOPIFY_POS_USER_AGENT, SHOPIFY_MOBILE_USER_AGENT];
function respondToBotRequest({ logger: logger2 }, request2) {
  const userAgent = request2.headers.get("User-Agent") ?? "";
  if (SHOPIFY_USER_AGENTS.some((agent) => agent.test(userAgent))) {
    logger2.debug("Request is from a Shopify agent, allow");
    return;
  }
  if (isbot(userAgent)) {
    logger2.debug("Request is from a bot, skipping auth");
    throw new Response(void 0, { status: 410, statusText: "Gone" });
  }
}
function respondToOptionsRequest(params, request2, corsHeaders) {
  if (request2.method === "OPTIONS") {
    const ensureCORSHeaders = ensureCORSHeadersFactory(params, request2, corsHeaders);
    throw ensureCORSHeaders(new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Max-Age": "7200"
      }
    }));
  }
}
async function beginAuth(params, request2, isOnline, shop) {
  const { api, config } = params;
  throw await api.auth.begin({
    shop,
    callbackPath: config.auth.callbackPath,
    isOnline,
    rawRequest: request2
  });
}
function redirectWithExitIframe(params, request2, shop) {
  const { api, config } = params;
  const url = new URL(request2.url);
  const queryParams = url.searchParams;
  const host = api.utils.sanitizeHost(queryParams.get("host"));
  queryParams.set("shop", shop);
  let destination = `${config.auth.path}?shop=${shop}`;
  if (host) {
    queryParams.set("host", host);
    destination = `${destination}&host=${host}`;
  }
  queryParams.set("exitIframe", destination);
  throw redirect2(`${config.auth.exitIframePath}?${queryParams.toString()}`);
}
function redirectWithAppBridgeHeaders(redirectUri) {
  throw new Response(void 0, {
    status: 401,
    statusText: "Unauthorized",
    headers: getAppBridgeHeaders(redirectUri)
  });
}
function getAppBridgeHeaders(url) {
  return new Headers({ [REAUTH_URL_HEADER]: url });
}
async function redirectToAuthPage(params, request2, shop, isOnline = false) {
  const { config } = params;
  const url = new URL(request2.url);
  const isEmbeddedRequest2 = url.searchParams.get("embedded") === "1";
  const isXhrRequest = request2.headers.get("authorization");
  if (isXhrRequest) {
    const redirectUri = new URL(config.auth.path, config.appUrl);
    redirectUri.searchParams.set("shop", shop);
    redirectWithAppBridgeHeaders(redirectUri.toString());
  } else if (isEmbeddedRequest2) {
    redirectWithExitIframe(params, request2, shop);
  } else {
    throw await beginAuth(params, request2, isOnline, shop);
  }
}
async function invalidateAccessToken(params, session) {
  const { logger: logger2, config } = params;
  logger2.debug(`Invalidating access token for session - ${session.id}`, {
    shop: session.shop
  });
  session.accessToken = void 0;
  await config.sessionStorage.storeSession(session);
}
function cancelBillingFactory(params, request2, session) {
  return async function cancelBilling(options) {
    const { api, logger: logger2 } = params;
    logger2.debug("Cancelling billing", { shop: session.shop, ...options });
    try {
      return await api.billing.cancel({
        session,
        subscriptionId: options.subscriptionId,
        isTest: options.isTest,
        prorate: options.prorate
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, redirecting to OAuth", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw await redirectToAuthPage(params, request2, session.shop);
      } else {
        throw error;
      }
    }
  };
}
function requireBillingFactory(params, request2, session) {
  const { api, logger: logger2 } = params;
  return async function requireBilling(options) {
    const logContext = {
      shop: session.shop,
      plans: options.plans,
      isTest: options.isTest
    };
    logger2.debug("Checking billing for the shop", logContext);
    let data;
    try {
      data = await api.billing.check({
        session,
        plans: options.plans,
        isTest: options.isTest,
        returnObject: true
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, redirecting to OAuth", logContext);
        await invalidateAccessToken(params, session);
        throw await redirectToAuthPage(params, request2, session.shop);
      } else {
        throw error;
      }
    }
    if (!data.hasActivePayment) {
      logger2.debug("Billing check failed", logContext);
      throw await options.onFailure(new Error("Billing check failed"));
    }
    logger2.debug("Billing check succeeded", logContext);
    return data;
  };
}
function redirectOutOfApp(params, request2, url, shop) {
  const { config, logger: logger2 } = params;
  logger2.debug("Redirecting out of app", { shop, url });
  const requestUrl = new URL(request2.url);
  const isEmbeddedRequest2 = requestUrl.searchParams.get("embedded") === "1";
  const isXhrRequest = request2.headers.get("authorization");
  if (isXhrRequest) {
    throw new Response(void 0, {
      status: 401,
      statusText: "Unauthorized",
      headers: getAppBridgeHeaders(url)
    });
  } else if (isEmbeddedRequest2) {
    const params2 = new URLSearchParams({
      shop,
      host: requestUrl.searchParams.get("host"),
      exitIframe: url
    });
    throw redirect2(`${config.auth.exitIframePath}?${params2.toString()}`);
  } else {
    throw redirect2(url);
  }
}
function requestBillingFactory(params, request2, session) {
  return async function requestBilling({ plan, isTest, returnUrl, ...overrides }) {
    const { api, logger: logger2 } = params;
    logger2.info("Requesting billing", {
      shop: session.shop,
      plan,
      isTest,
      returnUrl
    });
    let result;
    try {
      result = await api.billing.request({
        plan,
        session,
        isTest,
        returnUrl,
        returnObject: true,
        ...overrides
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, redirecting to OAuth", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw await redirectToAuthPage(params, request2, session.shop);
      } else {
        throw error;
      }
    }
    throw redirectOutOfApp(params, request2, result.confirmationUrl, session.shop);
  };
}
function checkBillingFactory(params, request2, session) {
  return async function checkBilling(options = {}) {
    const { api, logger: logger2 } = params;
    logger2.debug("Checking billing plans", { shop: session.shop, ...options });
    try {
      return await api.billing.check({
        session,
        plans: options.plans,
        isTest: options.isTest,
        returnObject: true
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, redirecting to OAuth", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw await redirectToAuthPage(params, request2, session.shop);
      } else {
        throw error;
      }
    }
  };
}
function createUsageRecordFactory(params, request2, session) {
  return async function createUsageRecord2(options) {
    const { api, logger: logger2 } = params;
    logger2.debug("Create usage record", { shop: session.shop, ...options });
    try {
      return await api.billing.createUsageRecord({
        ...options,
        session
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, redirecting to OAuth", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw await redirectToAuthPage(params, request2, session.shop);
      } else {
        throw error;
      }
    }
  };
}
function updateUsageCappedAmountFactory(params, request2, session) {
  return async function updateUsageCappedAmount2(options) {
    const { api, logger: logger2 } = params;
    logger2.debug("Updating usage subscription capped amount", {
      shop: session.shop,
      ...options
    });
    let result;
    try {
      result = await api.billing.updateUsageCappedAmount({
        session,
        subscriptionLineItemId: options.subscriptionLineItemId,
        cappedAmount: options.cappedAmount
      });
    } catch (error) {
      if (error instanceof HttpResponseError && error.response.code === 401) {
        logger2.debug("API token was invalid, redirecting to OAuth", {
          shop: session.shop
        });
        await invalidateAccessToken(params, session);
        throw await redirectToAuthPage(params, request2, session.shop);
      } else {
        throw error;
      }
    }
    throw redirectOutOfApp(params, request2, result.confirmationUrl, session.shop);
  };
}
function graphqlClientFactory({ params, handleClientError, session }) {
  return async function query(operation, options) {
    const client = new params.api.clients.Graphql({
      session,
      apiVersion: options?.apiVersion
    });
    try {
      const apiResponse = await client.request(operation, {
        variables: options?.variables,
        retries: options?.tries ? options.tries - 1 : 0,
        headers: options?.headers,
        signal: options?.signal
      });
      return new Response(JSON.stringify(apiResponse));
    } catch (error) {
      if (handleClientError) {
        throw await handleClientError({ error, params, session });
      }
      throw error;
    }
  };
}
function restClientFactory({ params, handleClientError, session }) {
  const { api } = params;
  const client = new RemixRestClient({
    params,
    handleClientError,
    session
  });
  if (api.rest) {
    client.resources = {};
    const RestResourceClient = restResourceClientFactory({
      params,
      handleClientError,
      session
    });
    Object.entries(api.rest).forEach(([name, resource]) => {
      class RemixResource extends resource {
        static Client = RestResourceClient;
      }
      Reflect.defineProperty(RemixResource, "name", {
        value: name
      });
      Reflect.set(client.resources, name, RemixResource);
    });
  }
  return client;
}
class RemixRestClient {
  session;
  params;
  handleClientError;
  constructor({ params, session, handleClientError }) {
    this.params = params;
    this.handleClientError = handleClientError;
    this.session = session;
  }
  /**
   * Performs a GET request on the given path.
   *
   * @deprecated In a future major release REST will be removed from this package. Please see [all-in on graphql](https://www.shopify.com/ca/partners/blog/all-in-on-graphql).
   */
  async get(params) {
    return this.makeRequest({
      method: "GET",
      ...params
    });
  }
  /**
   * Performs a POST request on the given path.
   *
   * @deprecated In a future major release REST will be removed from this package. Please see [all-in on graphql](https://www.shopify.com/ca/partners/blog/all-in-on-graphql).
   */
  async post(params) {
    return this.makeRequest({
      method: "POST",
      ...params
    });
  }
  /**
   * Performs a PUT request on the given path.
   *
   * @deprecated In a future major release REST will be removed from this package. Please see [all-in on graphql](https://www.shopify.com/ca/partners/blog/all-in-on-graphql).
   */
  async put(params) {
    return this.makeRequest({
      method: "PUT",
      ...params
    });
  }
  /**
   * Performs a DELETE request on the given path.
   *
   * @deprecated In a future major release REST will be removed from this package. Please see [all-in on graphql](https://www.shopify.com/ca/partners/blog/all-in-on-graphql).
   */
  async delete(params) {
    return this.makeRequest({
      method: "DELETE",
      ...params
    });
  }
  async makeRequest(params) {
    const originalClient = new this.params.api.clients.Rest({
      session: this.session
    });
    const originalRequest = Reflect.get(originalClient, "request");
    try {
      const apiResponse = await originalRequest.call(originalClient, params);
      return new Response(JSON.stringify(apiResponse.body), {
        headers: apiResponse.headers
      });
    } catch (error) {
      if (this.handleClientError) {
        throw await this.handleClientError({
          error,
          session: this.session,
          params: this.params
        });
      } else
        throw new Error(error);
    }
  }
}
function restResourceClientFactory({ params, handleClientError, session }) {
  const { api } = params;
  const ApiClient = api.clients.Rest;
  return class RestResourceClient extends ApiClient {
    async request(requestParams) {
      const originalClient = new api.clients.Rest({ session });
      const originalRequest = Reflect.get(originalClient, "request");
      try {
        return await originalRequest.call(originalClient, requestParams);
      } catch (error) {
        if (handleClientError) {
          throw await handleClientError({ error, params, session });
        } else
          throw new Error(error);
      }
    }
  };
}
function adminClientFactory({ params, handleClientError, session }) {
  if (params.config.future.removeRest) {
    return {
      graphql: graphqlClientFactory({ params, session, handleClientError })
    };
  }
  return {
    rest: restClientFactory({
      params,
      session,
      handleClientError
    }),
    graphql: graphqlClientFactory({ params, session, handleClientError })
  };
}
function createAdminApiContext(session, params, handleClientError) {
  return adminClientFactory({
    session,
    params,
    handleClientError
  });
}
async function redirectToShopifyOrAppRoot(request2, params, responseHeaders) {
  const { api } = params;
  const url = new URL(request2.url);
  const host = api.utils.sanitizeHost(url.searchParams.get("host"));
  const shop = api.utils.sanitizeShop(url.searchParams.get("shop"));
  const redirectUrl = api.config.isEmbeddedApp ? await api.auth.getEmbeddedAppUrl({ rawRequest: request2 }) : `/?shop=${shop}&host=${encodeURIComponent(host)}`;
  throw redirect2(redirectUrl, { headers: responseHeaders });
}
const ensureAppIsEmbeddedIfRequired = async (params, request2) => {
  const { api, logger: logger2, config } = params;
  const url = new URL(request2.url);
  const shop = url.searchParams.get("shop");
  if (api.config.isEmbeddedApp && url.searchParams.get("embedded") !== "1") {
    logger2.debug("App is not embedded, redirecting to Shopify", { shop });
    await redirectToShopifyOrAppRoot(request2, { api });
  }
};
const SESSION_TOKEN_PARAM = "id_token";
const ensureSessionTokenSearchParamIfRequired = async (params, request2) => {
  const { api, logger: logger2 } = params;
  const url = new URL(request2.url);
  const shop = url.searchParams.get("shop");
  const searchParamSessionToken = url.searchParams.get(SESSION_TOKEN_PARAM);
  const isEmbedded = url.searchParams.get("embedded") === "1";
  if (api.config.isEmbeddedApp && isEmbedded && !searchParamSessionToken) {
    logger2.debug("Missing session token in search params, going to bounce page", { shop });
    redirectToBouncePage(params, url);
  }
};
function appBridgeUrl() {
  return APP_BRIDGE_URL;
}
function addDocumentResponseHeadersFactory(params) {
  const { api, config } = params;
  return function(request2, headers) {
    const { searchParams } = new URL(request2.url);
    const shop = api.utils.sanitizeShop(searchParams.get("shop"));
    addDocumentResponseHeaders(headers, config.isEmbeddedApp, shop);
  };
}
function addDocumentResponseHeaders(headers, isEmbeddedApp, shop) {
  if (shop) {
    headers.set("Link", '<https://cdn.shopify.com/shopifycloud/app-bridge.js>; rel="preload"; as="script";');
  }
  if (isEmbeddedApp) {
    if (shop) {
      headers.set("Content-Security-Policy", `frame-ancestors https://${shop} https://admin.shopify.com https://*.spin.dev https://admin.myshopify.io https://admin.shop.dev;`);
    }
  } else {
    headers.set("Content-Security-Policy", `frame-ancestors 'none';`);
  }
}
const FILE_URI_MATCH = /\/\/\//;
const INVALID_RELATIVE_URL = /[/\\][/\\]/;
const WHITESPACE_CHARACTER = /\s/;
const VALID_PROTOCOLS = ["https:", "http:"];
function isSafe(domain, redirectUrl, requireSSL = true) {
  if (typeof redirectUrl !== "string") {
    return false;
  }
  if (FILE_URI_MATCH.test(redirectUrl) || WHITESPACE_CHARACTER.test(redirectUrl)) {
    return false;
  }
  let url;
  try {
    url = new URL(redirectUrl, domain);
  } catch (error) {
    return false;
  }
  if (INVALID_RELATIVE_URL.test(url.pathname)) {
    return false;
  }
  if (!VALID_PROTOCOLS.includes(url.protocol)) {
    return false;
  }
  if (requireSSL && url.protocol !== "https:") {
    return false;
  }
  return true;
}
function sanitizeRedirectUrl(domain, redirectUrl, options = {}) {
  if (isSafe(domain, redirectUrl, options.requireSSL)) {
    return new URL(redirectUrl, domain);
  } else if (options.throwOnInvalid === false) {
    return void 0;
  } else {
    throw new ShopifyError("Invalid URL. Refusing to redirect");
  }
}
function renderAppBridge({ config }, request2, redirectTo) {
  let redirectToScript = "";
  if (redirectTo) {
    const destination = sanitizeRedirectUrl(config.appUrl, redirectTo.url);
    const target = redirectTo.target ?? "_top";
    redirectToScript = `<script>window.open(${JSON.stringify(destination.toString())}, ${JSON.stringify(target)})<\/script>`;
  }
  const responseHeaders = new Headers({
    "content-type": "text/html;charset=utf-8"
  });
  addDocumentResponseHeaders(responseHeaders, config.isEmbeddedApp, new URL(request2.url).searchParams.get("shop"));
  throw new Response(`
      <script data-api-key="${config.apiKey}" src="${appBridgeUrl()}"><\/script>
      ${redirectToScript}
    `, { headers: responseHeaders });
}
function redirectFactory(params, request2, shop) {
  const { config, logger: logger2 } = params;
  return function redirect$12(url, init) {
    const { searchParams } = new URL(request2.url);
    const { url: parsedUrl, target } = parseURL({
      params,
      url,
      base: config.appUrl,
      shop,
      init
    });
    logger2.debug("Redirecting", { shop, url: parsedUrl.toString() });
    const isSameOrigin = parsedUrl.origin === config.appUrl;
    if (isSameOrigin || url.startsWith("/")) {
      searchParams.forEach((value, key) => {
        if (!parsedUrl.searchParams.has(key)) {
          parsedUrl.searchParams.set(key, value);
        }
      });
    }
    if (target === "_self") {
      if (isBounceRequest(request2)) {
        throw renderAppBridge(params, request2, {
          url: parsedUrl.toString(),
          target
        });
      } else {
        return redirect2(parsedUrl.toString(), init);
      }
    } else if (isDataRequest(request2)) {
      throw redirectWithAppBridgeHeaders(parsedUrl.toString());
    } else if (isEmbeddedRequest(request2)) {
      throw renderAppBridge(params, request2, {
        url: parsedUrl.toString(),
        target
      });
    }
    return redirect2(url, init);
  };
}
function isBounceRequest(request2) {
  return Boolean(getSessionTokenHeader(request2)) && request2.headers.has("X-Shopify-Bounce");
}
function isDataRequest(request2) {
  const isGet = request2.method === "GET";
  const sessionTokenHeader = Boolean(getSessionTokenHeader(request2));
  return sessionTokenHeader && !isBounceRequest(request2) && (!isEmbeddedRequest(request2) || !isGet);
}
function isEmbeddedRequest(request2) {
  const { searchParams } = new URL(request2.url);
  return searchParams.get("embedded") === "1";
}
function parseURL({ params, base, init, shop, url }) {
  let target = typeof init !== "number" && init?.target ? init.target : void 0;
  if (isAdminRemotePath(url)) {
    const { config } = params;
    const adminPath = getAdminRemotePath(url);
    const cleanShopName = shop.replace(".myshopify.com", "");
    if (!target) {
      target = config.isEmbeddedApp ? "_parent" : "_self";
    }
    return {
      url: new URL(`https://admin.shopify.com/store/${cleanShopName}${adminPath}`),
      target
    };
  } else {
    return {
      url: new URL(url, base),
      target: target ?? "_self"
    };
  }
}
const ADMIN_REGEX = /^shopify:\/*admin\//i;
function isAdminRemotePath(url) {
  return ADMIN_REGEX.test(url);
}
function getAdminRemotePath(url) {
  const parsedUrl = removeRestrictedParams(new URL(url)).href;
  return parsedUrl.replace(ADMIN_REGEX, "/");
}
const embeddedFrameParamsToRemove = [
  "hmac",
  "locale",
  "protocol",
  "session",
  "id_token",
  "shop",
  "timestamp",
  "host",
  "embedded",
  // sent when clicking rel="home" nav item
  "appLoadId"
];
function removeRestrictedParams(url) {
  const newUrl = new URL(url);
  embeddedFrameParamsToRemove.forEach((param) => newUrl.searchParams.delete(param));
  return newUrl;
}
function validateShopAndHostParams(params, request2) {
  const { api, config, logger: logger2 } = params;
  if (config.isEmbeddedApp) {
    const url = new URL(request2.url);
    const shop = api.utils.sanitizeShop(url.searchParams.get("shop"));
    if (!shop) {
      logger2.debug("Missing or invalid shop, redirecting to login path", {
        shop
      });
      throw redirectToLoginPath(request2, params);
    }
    const host = api.utils.sanitizeHost(url.searchParams.get("host"));
    if (!host) {
      logger2.debug("Invalid host, redirecting to login path", {
        shop,
        host: url.searchParams.get("host")
      });
      throw redirectToLoginPath(request2, params);
    }
  }
}
function redirectToLoginPath(request2, params) {
  const { config, logger: logger2 } = params;
  const { pathname } = new URL(request2.url);
  if (pathname === config.auth.loginPath) {
    const message2 = `Detected call to shopify.authenticate.admin() from configured login path ('${config.auth.loginPath}'), please make sure to call shopify.login() from that route instead.`;
    logger2.debug(message2);
    throw new Response(message2, { status: 500 });
  }
  throw redirect2(config.auth.loginPath);
}
async function redirectToInstallPage(params, shop, optionalScopes = []) {
  const installUrl = buildInstallUrl(params, shop, optionalScopes);
  if (params.config.isEmbeddedApp) {
    throw redirectWithAppBridgeHeaders(installUrl);
  } else {
    throw redirect2(installUrl);
  }
}
function buildInstallUrl(params, shop, optionalScopes = []) {
  const baseInstallUrl = buildBaseInstallUrl(params, shop);
  baseInstallUrl.search = buildParamsInstallUrl(params, optionalScopes).toString();
  return baseInstallUrl.href;
}
function buildBaseInstallUrl({ api }, shop) {
  const cleanShop = api.utils.sanitizeShop(shop, true);
  return new URL(`https://${cleanShop}/admin/oauth/install`);
}
function buildParamsInstallUrl({ config }, optionalScopes = []) {
  const optionalScopesParam = optionalScopes && optionalScopes.length > 0 ? { optional_scopes: optionalScopes.join(",") } : void 0;
  const query = {
    client_id: config.apiKey,
    scope: config.scopes?.toString() || "",
    ...optionalScopesParam
  };
  return new URLSearchParams(query);
}
const FETCH_SCOPES_DETAIL_QUERY = `#graphql
query FetchAccessScopes{
  app {
    requestedAccessScopes {
      handle
    }
    optionalAccessScopes {
      handle
    }
    installation {
      accessScopes {
        handle
      }
    }
  }
}`;
async function fetchScopeDetail(admin) {
  const fetchScopeDetailResult = await admin.graphql(FETCH_SCOPES_DETAIL_QUERY);
  const resultContent = await fetchScopeDetailResult.json();
  return resultContent.data;
}
function requestScopesFactory(params, session, admin) {
  return async function requestScopes(scopes) {
    const { logger: logger2 } = params;
    logger2.debug("Requesting optional scopes: ", { shop: session.shop, scopes });
    if (scopes.length === 0)
      return;
    if (await alreadyGranted(scopes, admin))
      return;
    throw await redirectToInstallPage(params, session.shop, scopes);
  };
  async function alreadyGranted(scopes, admin2) {
    const scopesDetail = await fetchScopeDetail(admin2);
    const grantedScopes = scopesDetail.app.installation.accessScopes.map((scope) => scope.handle);
    return new AuthScopes(grantedScopes).has(scopes);
  }
}
function queryScopesFactory(params, session, admin) {
  return async function queryScopes() {
    const { logger: logger2 } = params;
    logger2.debug("Querying scopes details: ", {
      shop: session.shop
    });
    const scopesDetail = await fetchScopeDetail(admin);
    return mapFetchScopeDetail(scopesDetail);
  };
}
function mapFetchScopeDetail(scopesDetailResponse) {
  const appInformation = scopesDetailResponse.app;
  const granted = new AuthScopes(appInformation.installation.accessScopes.map((scope) => scope.handle)).toArray(true);
  const required = new AuthScopes(appInformation.requestedAccessScopes.map((scope) => scope.handle)).toArray(true);
  const optional = new AuthScopes(appInformation.optionalAccessScopes.map((scope) => scope.handle)).toArray(true);
  return {
    granted,
    required,
    optional
  };
}
const REVOKE_SCOPE_MUTATION = `#graphql
mutation AppRevokeAccessScopes($scopes: [String!]!) {
  appRevokeAccessScopes(scopes: $scopes){
    revoked {
      handle
    }
    userErrors {
      field
      message
    }
  }
}`;
async function revokeScopes(admin, scopes) {
  const revokeScopesResult = await admin.graphql(REVOKE_SCOPE_MUTATION, {
    variables: {
      scopes
    }
  });
  const resultContent = await revokeScopesResult.json();
  return resultContent.data.appRevokeAccessScopes;
}
function revokeScopesFactory(params, session, admin) {
  return async function revoke(scopes) {
    const { logger: logger2 } = params;
    await validateScopes(scopes);
    logger2.debug("Revoke scopes: ", {
      shop: session.shop,
      scopes
    });
    const revokeScopesResult = await revokeScopes(admin, scopes);
    if (revokeScopesResult.userErrors?.length > 0) {
      logger2.error("Failed to revoke scopes: ", {
        shop: session.shop,
        errors: revokeScopesResult.userErrors
      });
      throw new Response(JSON.stringify(revokeScopesResult.userErrors), {
        status: 422,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    return {
      revoked: revokeScopesResult.revoked.map((scope) => scope.handle)
    };
  };
}
async function validateScopes(scopes) {
  if (!scopes || scopes.length === 0) {
    throw new Response("No scopes provided", { status: 400 });
  }
}
function scopesApiFactory(params, session, admin) {
  return {
    query: queryScopesFactory(params, session, admin),
    request: requestScopesFactory(params, session, admin),
    revoke: revokeScopesFactory(params, session, admin)
  };
}
function authStrategyFactory({ strategy, ...params }) {
  const { api, logger: logger2, config } = params;
  async function respondToBouncePageRequest(request2) {
    const url = new URL(request2.url);
    if (url.pathname === config.auth.patchSessionTokenPath) {
      logger2.debug("Rendering bounce page", {
        shop: getShopFromRequest(request2)
      });
      throw renderAppBridge({ config }, request2);
    }
  }
  async function respondToExitIframeRequest(request2) {
    const url = new URL(request2.url);
    if (url.pathname === config.auth.exitIframePath) {
      const destination = url.searchParams.get("exitIframe");
      logger2.debug("Rendering exit iframe page", {
        shop: getShopFromRequest(request2),
        destination
      });
      throw renderAppBridge({ config }, request2, { url: destination });
    }
  }
  function createContext(request2, session, authStrategy, sessionToken) {
    let context2 = {
      admin: createAdminApiContext(session, params, authStrategy.handleClientError(request2)),
      billing: {
        require: requireBillingFactory(params, request2, session),
        check: checkBillingFactory(params, request2, session),
        request: requestBillingFactory(params, request2, session),
        cancel: cancelBillingFactory(params, request2, session),
        createUsageRecord: createUsageRecordFactory(params, request2, session),
        updateUsageCappedAmount: updateUsageCappedAmountFactory(params, request2, session)
      },
      session,
      cors: ensureCORSHeadersFactory(params, request2)
    };
    context2 = addEmbeddedFeatures(context2, request2, session, sessionToken);
    context2 = addScopesFeatures(context2);
    return context2;
  }
  function addEmbeddedFeatures(context2, request2, session, sessionToken) {
    if (config.isEmbeddedApp) {
      return {
        ...context2,
        sessionToken,
        redirect: redirectFactory(params, request2, session.shop)
      };
    }
    return context2;
  }
  function addScopesFeatures(context2) {
    return {
      ...context2,
      scopes: scopesApiFactory(params, context2.session, context2.admin)
    };
  }
  return async function authenticateAdmin(request2) {
    try {
      respondToBotRequest(params, request2);
      respondToOptionsRequest(params, request2);
      await respondToBouncePageRequest(request2);
      await respondToExitIframeRequest(request2);
      await strategy.respondToOAuthRequests(request2);
      if (!getSessionTokenHeader(request2)) {
        validateShopAndHostParams(params, request2);
        await ensureAppIsEmbeddedIfRequired(params, request2);
        await ensureSessionTokenSearchParamIfRequired(params, request2);
      }
      logger2.info("Authenticating admin request", {
        shop: getShopFromRequest(request2)
      });
      const { payload, shop, sessionId, sessionToken } = await getSessionTokenContext(params, request2);
      logger2.debug("Loading session from storage", { shop, sessionId });
      const existingSession = sessionId ? await config.sessionStorage.loadSession(sessionId) : void 0;
      const session = await strategy.authenticate(request2, {
        session: existingSession,
        sessionToken,
        shop
      });
      return createContext(request2, session, strategy, payload);
    } catch (errorOrResponse) {
      if (errorOrResponse instanceof Response) {
        logger2.debug("Authenticate returned a response", {
          shop: getShopFromRequest(request2)
        });
        ensureCORSHeadersFactory(params, request2)(errorOrResponse);
      }
      throw errorOrResponse;
    }
  };
}
async function getSessionTokenContext(params, request2) {
  const { api, config, logger: logger2 } = params;
  const headerSessionToken = getSessionTokenHeader(request2);
  const searchParamSessionToken = getSessionTokenFromUrlParam(request2);
  const sessionToken = headerSessionToken || searchParamSessionToken;
  logger2.debug("Attempting to authenticate session token", {
    shop: getShopFromRequest(request2),
    sessionToken: JSON.stringify({
      header: headerSessionToken,
      search: searchParamSessionToken
    })
  });
  if (config.isEmbeddedApp) {
    const payload = await validateSessionToken(params, request2, sessionToken);
    const dest = new URL(payload.dest);
    const shop2 = dest.hostname;
    logger2.debug("Session token is valid - authenticated", { shop: shop2, payload });
    const sessionId2 = config.useOnlineTokens ? api.session.getJwtSessionId(shop2, payload.sub) : api.session.getOfflineId(shop2);
    return { shop: shop2, payload, sessionId: sessionId2, sessionToken };
  }
  const url = new URL(request2.url);
  const shop = url.searchParams.get("shop");
  const sessionId = await api.session.getCurrentId({
    isOnline: config.useOnlineTokens,
    rawRequest: request2
  });
  return { shop, sessionId, payload: void 0, sessionToken };
}
function handleClientErrorFactory({ request: request2, onError }) {
  return async function handleClientError({ error, params, session }) {
    if (error instanceof HttpResponseError !== true) {
      params.logger.debug(`Got a response error from the API: ${error.message}`, { shop: session.shop });
      throw error;
    }
    params.logger.debug(`Got an HTTP response error from the API: ${error.message}`, {
      shop: session.shop,
      code: error.response.code,
      statusText: error.response.statusText,
      body: JSON.stringify(error.response.body)
    });
    if (onError) {
      await onError({ request: request2, session, error });
    }
    throw new Response(JSON.stringify(error.response.body), {
      status: error.response.code,
      headers: {
        "Content-Type": error.response.headers["Content-Type"]
      }
    });
  };
}
async function createOrLoadOfflineSession(shop, { api, config, logger: logger2 }) {
  if (config.distribution === AppDistribution.ShopifyAdmin) {
    logger2.debug("Creating custom app session from configured access token", {
      shop
    });
    return api.session.customAppSession(shop);
  } else {
    logger2.debug("Loading offline session from session storage", { shop });
    const offlineSessionId = api.session.getOfflineId(shop);
    const session = await config.sessionStorage.loadSession(offlineSessionId);
    return session;
  }
}
function authenticateWebhookFactory(params) {
  const { api, logger: logger2 } = params;
  return async function authenticate2(request2) {
    if (request2.method !== "POST") {
      logger2.debug("Received a non-POST request for a webhook. Only POST requests are allowed.", { url: request2.url, method: request2.method });
      throw new Response(void 0, {
        status: 405,
        statusText: "Method not allowed"
      });
    }
    const rawBody = await request2.text();
    const check2 = await api.webhooks.validate({
      rawBody,
      rawRequest: request2
    });
    if (!check2.valid) {
      if (check2.reason === WebhookValidationErrorReason.InvalidHmac) {
        logger2.debug("Webhook HMAC validation failed", check2);
        throw new Response(void 0, {
          status: 401,
          statusText: "Unauthorized"
        });
      } else {
        logger2.debug("Webhook validation failed", check2);
        throw new Response(void 0, { status: 400, statusText: "Bad Request" });
      }
    }
    const session = await createOrLoadOfflineSession(check2.domain, params);
    const webhookContext = {
      apiVersion: check2.apiVersion,
      shop: check2.domain,
      topic: check2.topic,
      webhookId: check2.webhookId,
      payload: JSON.parse(rawBody),
      subTopic: check2.subTopic || void 0,
      session: void 0,
      admin: void 0
    };
    if (!session) {
      return webhookContext;
    }
    const admin = adminClientFactory({
      params,
      session,
      handleClientError: handleClientErrorFactory({ request: request2 })
    });
    return {
      ...webhookContext,
      session,
      admin
    };
  };
}
var re = { exports: {} };
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  constants = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  return constants;
}
var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  const debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  debug_1 = debug;
  return debug_1;
}
var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return re.exports;
  hasRequiredRe = 1;
  (function(module, exports$1) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants();
    const debug = requireDebug();
    exports$1 = module.exports = {};
    const re2 = exports$1.re = [];
    const safeRe = exports$1.safeRe = [];
    const src = exports$1.src = [];
    const safeSrc = exports$1.safeSrc = [];
    const t = exports$1.t = {};
    let R = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports$1.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports$1.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports$1.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re, re.exports);
  return re.exports;
}
var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  parseOptions_1 = parseOptions;
  return parseOptions_1;
}
var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a === b ? 0 : a < b ? -1 : 1;
    }
    const anum = numeric.test(a);
    const bnum = numeric.test(b);
    if (anum && bnum) {
      a = +a;
      b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
  };
  const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
  identifiers = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers;
}
var semver$2;
var hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$2;
  hasRequiredSemver$1 = 1;
  const debug = requireDebug();
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
  const { safeRe: re2, t } = requireRe();
  const parseOptions = requireParseOptions();
  const { compareIdentifiers } = requireIdentifiers();
  class SemVer {
    constructor(version2, options) {
      options = parseOptions(options);
      if (version2 instanceof SemVer) {
        if (version2.loose === !!options.loose && version2.includePrerelease === !!options.includePrerelease) {
          return version2;
        } else {
          version2 = version2.version;
        }
      } else if (typeof version2 !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version2}".`);
      }
      if (version2.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version2, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m = version2.trim().match(options.loose ? re2[t.LOOSE] : re2[t.FULL]);
      if (!m) {
        throw new TypeError(`Invalid Version: ${version2}`);
      }
      this.raw = version2;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.major < other.major) {
        return -1;
      }
      if (this.major > other.major) {
        return 1;
      }
      if (this.minor < other.minor) {
        return -1;
      }
      if (this.minor > other.minor) {
        return 1;
      }
      if (this.patch < other.patch) {
        return -1;
      }
      if (this.patch > other.patch) {
        return 1;
      }
      return 0;
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i = 0;
      do {
        const a = this.prerelease[i];
        const b = other.prerelease[i];
        debug("prerelease compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i = 0;
      do {
        const a = this.build[i];
        const b = other.build[i];
        debug("build compare", i, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      if (release.startsWith("pre")) {
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (identifier) {
          const match = `-${identifier}`.match(this.options.loose ? re2[t.PRERELEASELOOSE] : re2[t.PRERELEASE]);
          if (!match || match[1] !== identifier) {
            throw new Error(`invalid identifier: ${identifier}`);
          }
        }
      }
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "release":
          if (this.prerelease.length === 0) {
            throw new Error(`version ${this.raw} is not a prerelease`);
          }
          this.prerelease.length = 0;
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === "number") {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  }
  semver$2 = SemVer;
  return semver$2;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const SemVer = requireSemver$1();
  const parse2 = (version2, options, throwErrors = false) => {
    if (version2 instanceof SemVer) {
      return version2;
    }
    try {
      return new SemVer(version2, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1 = parse2;
  return parse_1;
}
var valid_1;
var hasRequiredValid$1;
function requireValid$1() {
  if (hasRequiredValid$1) return valid_1;
  hasRequiredValid$1 = 1;
  const parse2 = requireParse();
  const valid2 = (version2, options) => {
    const v = parse2(version2, options);
    return v ? v.version : null;
  };
  valid_1 = valid2;
  return valid_1;
}
var clean_1;
var hasRequiredClean;
function requireClean() {
  if (hasRequiredClean) return clean_1;
  hasRequiredClean = 1;
  const parse2 = requireParse();
  const clean = (version2, options) => {
    const s = parse2(version2.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
  };
  clean_1 = clean;
  return clean_1;
}
var inc_1;
var hasRequiredInc;
function requireInc() {
  if (hasRequiredInc) return inc_1;
  hasRequiredInc = 1;
  const SemVer = requireSemver$1();
  const inc = (version2, release, options, identifier, identifierBase) => {
    if (typeof options === "string") {
      identifierBase = identifier;
      identifier = options;
      options = void 0;
    }
    try {
      return new SemVer(
        version2 instanceof SemVer ? version2.version : version2,
        options
      ).inc(release, identifier, identifierBase).version;
    } catch (er) {
      return null;
    }
  };
  inc_1 = inc;
  return inc_1;
}
var diff_1;
var hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff_1;
  hasRequiredDiff = 1;
  const parse2 = requireParse();
  const diff = (version1, version2) => {
    const v1 = parse2(version1, null, true);
    const v2 = parse2(version2, null, true);
    const comparison = v1.compare(v2);
    if (comparison === 0) {
      return null;
    }
    const v1Higher = comparison > 0;
    const highVersion = v1Higher ? v1 : v2;
    const lowVersion = v1Higher ? v2 : v1;
    const highHasPre = !!highVersion.prerelease.length;
    const lowHasPre = !!lowVersion.prerelease.length;
    if (lowHasPre && !highHasPre) {
      if (!lowVersion.patch && !lowVersion.minor) {
        return "major";
      }
      if (lowVersion.compareMain(highVersion) === 0) {
        if (lowVersion.minor && !lowVersion.patch) {
          return "minor";
        }
        return "patch";
      }
    }
    const prefix = highHasPre ? "pre" : "";
    if (v1.major !== v2.major) {
      return prefix + "major";
    }
    if (v1.minor !== v2.minor) {
      return prefix + "minor";
    }
    if (v1.patch !== v2.patch) {
      return prefix + "patch";
    }
    return "prerelease";
  };
  diff_1 = diff;
  return diff_1;
}
var major_1;
var hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const SemVer = requireSemver$1();
  const major = (a, loose) => new SemVer(a, loose).major;
  major_1 = major;
  return major_1;
}
var minor_1;
var hasRequiredMinor;
function requireMinor() {
  if (hasRequiredMinor) return minor_1;
  hasRequiredMinor = 1;
  const SemVer = requireSemver$1();
  const minor = (a, loose) => new SemVer(a, loose).minor;
  minor_1 = minor;
  return minor_1;
}
var patch_1;
var hasRequiredPatch;
function requirePatch() {
  if (hasRequiredPatch) return patch_1;
  hasRequiredPatch = 1;
  const SemVer = requireSemver$1();
  const patch = (a, loose) => new SemVer(a, loose).patch;
  patch_1 = patch;
  return patch_1;
}
var prerelease_1;
var hasRequiredPrerelease;
function requirePrerelease() {
  if (hasRequiredPrerelease) return prerelease_1;
  hasRequiredPrerelease = 1;
  const parse2 = requireParse();
  const prerelease = (version2, options) => {
    const parsed = parse2(version2, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
  };
  prerelease_1 = prerelease;
  return prerelease_1;
}
var compare_1;
var hasRequiredCompare;
function requireCompare() {
  if (hasRequiredCompare) return compare_1;
  hasRequiredCompare = 1;
  const SemVer = requireSemver$1();
  const compare2 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
  compare_1 = compare2;
  return compare_1;
}
var rcompare_1;
var hasRequiredRcompare;
function requireRcompare() {
  if (hasRequiredRcompare) return rcompare_1;
  hasRequiredRcompare = 1;
  const compare2 = requireCompare();
  const rcompare = (a, b, loose) => compare2(b, a, loose);
  rcompare_1 = rcompare;
  return rcompare_1;
}
var compareLoose_1;
var hasRequiredCompareLoose;
function requireCompareLoose() {
  if (hasRequiredCompareLoose) return compareLoose_1;
  hasRequiredCompareLoose = 1;
  const compare2 = requireCompare();
  const compareLoose = (a, b) => compare2(a, b, true);
  compareLoose_1 = compareLoose;
  return compareLoose_1;
}
var compareBuild_1;
var hasRequiredCompareBuild;
function requireCompareBuild() {
  if (hasRequiredCompareBuild) return compareBuild_1;
  hasRequiredCompareBuild = 1;
  const SemVer = requireSemver$1();
  const compareBuild = (a, b, loose) => {
    const versionA = new SemVer(a, loose);
    const versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
  };
  compareBuild_1 = compareBuild;
  return compareBuild_1;
}
var sort_1;
var hasRequiredSort;
function requireSort() {
  if (hasRequiredSort) return sort_1;
  hasRequiredSort = 1;
  const compareBuild = requireCompareBuild();
  const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
  sort_1 = sort;
  return sort_1;
}
var rsort_1;
var hasRequiredRsort;
function requireRsort() {
  if (hasRequiredRsort) return rsort_1;
  hasRequiredRsort = 1;
  const compareBuild = requireCompareBuild();
  const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
  rsort_1 = rsort;
  return rsort_1;
}
var gt_1;
var hasRequiredGt;
function requireGt() {
  if (hasRequiredGt) return gt_1;
  hasRequiredGt = 1;
  const compare2 = requireCompare();
  const gt = (a, b, loose) => compare2(a, b, loose) > 0;
  gt_1 = gt;
  return gt_1;
}
var lt_1;
var hasRequiredLt;
function requireLt() {
  if (hasRequiredLt) return lt_1;
  hasRequiredLt = 1;
  const compare2 = requireCompare();
  const lt = (a, b, loose) => compare2(a, b, loose) < 0;
  lt_1 = lt;
  return lt_1;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  const compare2 = requireCompare();
  const eq = (a, b, loose) => compare2(a, b, loose) === 0;
  eq_1 = eq;
  return eq_1;
}
var neq_1;
var hasRequiredNeq;
function requireNeq() {
  if (hasRequiredNeq) return neq_1;
  hasRequiredNeq = 1;
  const compare2 = requireCompare();
  const neq = (a, b, loose) => compare2(a, b, loose) !== 0;
  neq_1 = neq;
  return neq_1;
}
var gte_1;
var hasRequiredGte;
function requireGte() {
  if (hasRequiredGte) return gte_1;
  hasRequiredGte = 1;
  const compare2 = requireCompare();
  const gte = (a, b, loose) => compare2(a, b, loose) >= 0;
  gte_1 = gte;
  return gte_1;
}
var lte_1;
var hasRequiredLte;
function requireLte() {
  if (hasRequiredLte) return lte_1;
  hasRequiredLte = 1;
  const compare2 = requireCompare();
  const lte = (a, b, loose) => compare2(a, b, loose) <= 0;
  lte_1 = lte;
  return lte_1;
}
var cmp_1;
var hasRequiredCmp;
function requireCmp() {
  if (hasRequiredCmp) return cmp_1;
  hasRequiredCmp = 1;
  const eq = requireEq();
  const neq = requireNeq();
  const gt = requireGt();
  const gte = requireGte();
  const lt = requireLt();
  const lte = requireLte();
  const cmp = (a, op, b, loose) => {
    switch (op) {
      case "===":
        if (typeof a === "object") {
          a = a.version;
        }
        if (typeof b === "object") {
          b = b.version;
        }
        return a === b;
      case "!==":
        if (typeof a === "object") {
          a = a.version;
        }
        if (typeof b === "object") {
          b = b.version;
        }
        return a !== b;
      case "":
      case "=":
      case "==":
        return eq(a, b, loose);
      case "!=":
        return neq(a, b, loose);
      case ">":
        return gt(a, b, loose);
      case ">=":
        return gte(a, b, loose);
      case "<":
        return lt(a, b, loose);
      case "<=":
        return lte(a, b, loose);
      default:
        throw new TypeError(`Invalid operator: ${op}`);
    }
  };
  cmp_1 = cmp;
  return cmp_1;
}
var coerce_1;
var hasRequiredCoerce;
function requireCoerce() {
  if (hasRequiredCoerce) return coerce_1;
  hasRequiredCoerce = 1;
  const SemVer = requireSemver$1();
  const parse2 = requireParse();
  const { safeRe: re2, t } = requireRe();
  const coerce = (version2, options) => {
    if (version2 instanceof SemVer) {
      return version2;
    }
    if (typeof version2 === "number") {
      version2 = String(version2);
    }
    if (typeof version2 !== "string") {
      return null;
    }
    options = options || {};
    let match = null;
    if (!options.rtl) {
      match = version2.match(options.includePrerelease ? re2[t.COERCEFULL] : re2[t.COERCE]);
    } else {
      const coerceRtlRegex = options.includePrerelease ? re2[t.COERCERTLFULL] : re2[t.COERCERTL];
      let next;
      while ((next = coerceRtlRegex.exec(version2)) && (!match || match.index + match[0].length !== version2.length)) {
        if (!match || next.index + next[0].length !== match.index + match[0].length) {
          match = next;
        }
        coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
      }
      coerceRtlRegex.lastIndex = -1;
    }
    if (match === null) {
      return null;
    }
    const major = match[2];
    const minor = match[3] || "0";
    const patch = match[4] || "0";
    const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
    const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
    return parse2(`${major}.${minor}.${patch}${prerelease}${build}`, options);
  };
  coerce_1 = coerce;
  return coerce_1;
}
var lrucache;
var hasRequiredLrucache;
function requireLrucache() {
  if (hasRequiredLrucache) return lrucache;
  hasRequiredLrucache = 1;
  class LRUCache {
    constructor() {
      this.max = 1e3;
      this.map = /* @__PURE__ */ new Map();
    }
    get(key) {
      const value = this.map.get(key);
      if (value === void 0) {
        return void 0;
      } else {
        this.map.delete(key);
        this.map.set(key, value);
        return value;
      }
    }
    delete(key) {
      return this.map.delete(key);
    }
    set(key, value) {
      const deleted = this.delete(key);
      if (!deleted && value !== void 0) {
        if (this.map.size >= this.max) {
          const firstKey = this.map.keys().next().value;
          this.delete(firstKey);
        }
        this.map.set(key, value);
      }
      return this;
    }
  }
  lrucache = LRUCache;
  return lrucache;
}
var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  const SPACE_CHARACTERS = /\s+/g;
  class Range {
    constructor(range2, options) {
      options = parseOptions(options);
      if (range2 instanceof Range) {
        if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
          return range2;
        } else {
          return new Range(range2.raw, options);
        }
      }
      if (range2 instanceof Comparator) {
        this.raw = range2.value;
        this.set = [[range2]];
        this.formatted = void 0;
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range2.trim().replace(SPACE_CHARACTERS, " ");
      this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }
      if (this.set.length > 1) {
        const first = this.set[0];
        this.set = this.set.filter((c) => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let i = 0; i < this.set.length; i++) {
          if (i > 0) {
            this.formatted += "||";
          }
          const comps = this.set[i];
          for (let k = 0; k < comps.length; k++) {
            if (k > 0) {
              this.formatted += " ";
            }
            this.formatted += comps[k].toString().trim();
          }
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range2) {
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ":" + range2;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      const hr = loose ? re2[t.HYPHENRANGELOOSE] : re2[t.HYPHENRANGE];
      range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug("hyphen replace", range2);
      range2 = range2.replace(re2[t.COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range2);
      range2 = range2.replace(re2[t.TILDETRIM], tildeTrimReplace);
      debug("tilde trim", range2);
      range2 = range2.replace(re2[t.CARETTRIM], caretTrimReplace);
      debug("caret trim", range2);
      let rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
      if (loose) {
        rangeList = rangeList.filter((comp) => {
          debug("loose invalid filter", comp, this.options);
          return !!comp.match(re2[t.COMPARATORLOOSE]);
        });
      }
      debug("range list", rangeList);
      const rangeMap = /* @__PURE__ */ new Map();
      const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has("")) {
        rangeMap.delete("");
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range2, options) {
      if (!(range2 instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some((thisComparators) => {
        return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
            return rangeComparators.every((rangeComparator) => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version2) {
      if (!version2) {
        return false;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer(version2, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version2, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range;
  const LRU = requireLrucache();
  const cache = new LRU();
  const parseOptions = requireParseOptions();
  const Comparator = requireComparator();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const {
    safeRe: re2,
    t,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = requireRe();
  const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = requireConstants();
  const isNullSet = (c) => c.value === "<0.0.0-0";
  const isAny = (c) => c.value === "";
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };
  const parseComparator = (comp, options) => {
    comp = comp.replace(re2[t.BUILD], "");
    debug("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug("caret", comp);
    comp = replaceTildes(comp, options);
    debug("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug("xrange", comp);
    comp = replaceStars(comp, options);
    debug("stars", comp);
    return comp;
  };
  const isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re2[t.TILDELOOSE] : re2[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("tilde", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug("replaceTilde pr", pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug("tilde return", ret);
      return ret;
    });
  };
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
  };
  const replaceCaret = (comp, options) => {
    debug("caret", comp, options);
    const r = options.loose ? re2[t.CARETLOOSE] : re2[t.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr) => {
      debug("caret", comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = "";
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === "0") {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug("replaceCaret pr", pr);
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug("no pr");
        if (M === "0") {
          if (m === "0") {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug("caret return", ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re2[t.XRANGELOOSE] : re2[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug("xRange", comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === "=" && anyX) {
        gtlt = "";
      }
      pr = options.includePrerelease ? "-0" : "";
      if (xM) {
        if (gtlt === ">" || gtlt === "<") {
          ret = "<0.0.0-0";
        } else {
          ret = "*";
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === ">") {
          gtlt = ">=";
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === "<=") {
          gtlt = "<";
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === "<") {
          pr = "-0";
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug("xRange return", ret);
      return ret;
    });
  };
  const replaceStars = (comp, options) => {
    debug("replaceStars", comp, options);
    return comp.trim().replace(re2[t.STAR], "");
  };
  const replaceGTE0 = (comp, options) => {
    debug("replaceGTE0", comp, options);
    return comp.trim().replace(re2[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
  };
  const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
    if (isX(fM)) {
      from = "";
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? "-0" : ""}`;
    }
    if (isX(tM)) {
      to = "";
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version2, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version2)) {
        return false;
      }
    }
    if (version2.prerelease.length && !options.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === Comparator.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
            return true;
          }
        }
      }
      return false;
    }
    return true;
  };
  return range;
}
var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const ANY = Symbol("SemVer ANY");
  class Comparator {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      options = parseOptions(options);
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(" ");
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    parse(comp) {
      const r = this.options.loose ? re2[t.COMPARATORLOOSE] : re2[t.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== void 0 ? m[1] : "";
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version2) {
      debug("Comparator.test", version2, this.options.loose);
      if (this.semver === ANY || version2 === ANY) {
        return true;
      }
      if (typeof version2 === "string") {
        try {
          version2 = new SemVer(version2, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp(version2, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (this.operator === "") {
        if (this.value === "") {
          return true;
        }
        return new Range(comp.value, options).test(this.value);
      } else if (comp.operator === "") {
        if (comp.value === "") {
          return true;
        }
        return new Range(this.value, options).test(comp.semver);
      }
      options = parseOptions(options);
      if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
        return false;
      }
      if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
        return true;
      }
      if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
        return true;
      }
      if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
        return true;
      }
      if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
        return true;
      }
      if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator;
  const parseOptions = requireParseOptions();
  const { safeRe: re2, t } = requireRe();
  const cmp = requireCmp();
  const debug = requireDebug();
  const SemVer = requireSemver$1();
  const Range = requireRange();
  return comparator;
}
var satisfies_1;
var hasRequiredSatisfies;
function requireSatisfies() {
  if (hasRequiredSatisfies) return satisfies_1;
  hasRequiredSatisfies = 1;
  const Range = requireRange();
  const satisfies = (version2, range2, options) => {
    try {
      range2 = new Range(range2, options);
    } catch (er) {
      return false;
    }
    return range2.test(version2);
  };
  satisfies_1 = satisfies;
  return satisfies_1;
}
var toComparators_1;
var hasRequiredToComparators;
function requireToComparators() {
  if (hasRequiredToComparators) return toComparators_1;
  hasRequiredToComparators = 1;
  const Range = requireRange();
  const toComparators = (range2, options) => new Range(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
  toComparators_1 = toComparators;
  return toComparators_1;
}
var maxSatisfying_1;
var hasRequiredMaxSatisfying;
function requireMaxSatisfying() {
  if (hasRequiredMaxSatisfying) return maxSatisfying_1;
  hasRequiredMaxSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const maxSatisfying = (versions, range2, options) => {
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range2, options);
    } catch (er) {
      return null;
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v;
          maxSV = new SemVer(max, options);
        }
      }
    });
    return max;
  };
  maxSatisfying_1 = maxSatisfying;
  return maxSatisfying_1;
}
var minSatisfying_1;
var hasRequiredMinSatisfying;
function requireMinSatisfying() {
  if (hasRequiredMinSatisfying) return minSatisfying_1;
  hasRequiredMinSatisfying = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const minSatisfying = (versions, range2, options) => {
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
      rangeObj = new Range(range2, options);
    } catch (er) {
      return null;
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v;
          minSV = new SemVer(min, options);
        }
      }
    });
    return min;
  };
  minSatisfying_1 = minSatisfying;
  return minSatisfying_1;
}
var minVersion_1;
var hasRequiredMinVersion;
function requireMinVersion() {
  if (hasRequiredMinVersion) return minVersion_1;
  hasRequiredMinVersion = 1;
  const SemVer = requireSemver$1();
  const Range = requireRange();
  const gt = requireGt();
  const minVersion = (range2, loose) => {
    range2 = new Range(range2, loose);
    let minver = new SemVer("0.0.0");
    if (range2.test(minver)) {
      return minver;
    }
    minver = new SemVer("0.0.0-0");
    if (range2.test(minver)) {
      return minver;
    }
    minver = null;
    for (let i = 0; i < range2.set.length; ++i) {
      const comparators = range2.set[i];
      let setMin = null;
      comparators.forEach((comparator2) => {
        const compver = new SemVer(comparator2.semver.version);
        switch (comparator2.operator) {
          case ">":
            if (compver.prerelease.length === 0) {
              compver.patch++;
            } else {
              compver.prerelease.push(0);
            }
            compver.raw = compver.format();
          /* fallthrough */
          case "":
          case ">=":
            if (!setMin || gt(compver, setMin)) {
              setMin = compver;
            }
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${comparator2.operator}`);
        }
      });
      if (setMin && (!minver || gt(minver, setMin))) {
        minver = setMin;
      }
    }
    if (minver && range2.test(minver)) {
      return minver;
    }
    return null;
  };
  minVersion_1 = minVersion;
  return minVersion_1;
}
var valid;
var hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid;
  hasRequiredValid = 1;
  const Range = requireRange();
  const validRange = (range2, options) => {
    try {
      return new Range(range2, options).range || "*";
    } catch (er) {
      return null;
    }
  };
  valid = validRange;
  return valid;
}
var outside_1;
var hasRequiredOutside;
function requireOutside() {
  if (hasRequiredOutside) return outside_1;
  hasRequiredOutside = 1;
  const SemVer = requireSemver$1();
  const Comparator = requireComparator();
  const { ANY } = Comparator;
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const gt = requireGt();
  const lt = requireLt();
  const lte = requireLte();
  const gte = requireGte();
  const outside = (version2, range2, hilo, options) => {
    version2 = new SemVer(version2, options);
    range2 = new Range(range2, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch (hilo) {
      case ">":
        gtfn = gt;
        ltefn = lte;
        ltfn = lt;
        comp = ">";
        ecomp = ">=";
        break;
      case "<":
        gtfn = lt;
        ltefn = gte;
        ltfn = gt;
        comp = "<";
        ecomp = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (satisfies(version2, range2, options)) {
      return false;
    }
    for (let i = 0; i < range2.set.length; ++i) {
      const comparators = range2.set[i];
      let high = null;
      let low = null;
      comparators.forEach((comparator2) => {
        if (comparator2.semver === ANY) {
          comparator2 = new Comparator(">=0.0.0");
        }
        high = high || comparator2;
        low = low || comparator2;
        if (gtfn(comparator2.semver, high.semver, options)) {
          high = comparator2;
        } else if (ltfn(comparator2.semver, low.semver, options)) {
          low = comparator2;
        }
      });
      if (high.operator === comp || high.operator === ecomp) {
        return false;
      }
      if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
        return false;
      } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
        return false;
      }
    }
    return true;
  };
  outside_1 = outside;
  return outside_1;
}
var gtr_1;
var hasRequiredGtr;
function requireGtr() {
  if (hasRequiredGtr) return gtr_1;
  hasRequiredGtr = 1;
  const outside = requireOutside();
  const gtr = (version2, range2, options) => outside(version2, range2, ">", options);
  gtr_1 = gtr;
  return gtr_1;
}
var ltr_1;
var hasRequiredLtr;
function requireLtr() {
  if (hasRequiredLtr) return ltr_1;
  hasRequiredLtr = 1;
  const outside = requireOutside();
  const ltr = (version2, range2, options) => outside(version2, range2, "<", options);
  ltr_1 = ltr;
  return ltr_1;
}
var intersects_1;
var hasRequiredIntersects;
function requireIntersects() {
  if (hasRequiredIntersects) return intersects_1;
  hasRequiredIntersects = 1;
  const Range = requireRange();
  const intersects = (r1, r2, options) => {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2, options);
  };
  intersects_1 = intersects;
  return intersects_1;
}
var simplify;
var hasRequiredSimplify;
function requireSimplify() {
  if (hasRequiredSimplify) return simplify;
  hasRequiredSimplify = 1;
  const satisfies = requireSatisfies();
  const compare2 = requireCompare();
  simplify = (versions, range2, options) => {
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b) => compare2(a, b, options));
    for (const version2 of v) {
      const included = satisfies(version2, range2, options);
      if (included) {
        prev = version2;
        if (!first) {
          first = version2;
        }
      } else {
        if (prev) {
          set.push([first, prev]);
        }
        prev = null;
        first = null;
      }
    }
    if (first) {
      set.push([first, null]);
    }
    const ranges = [];
    for (const [min, max] of set) {
      if (min === max) {
        ranges.push(min);
      } else if (!max && min === v[0]) {
        ranges.push("*");
      } else if (!max) {
        ranges.push(`>=${min}`);
      } else if (min === v[0]) {
        ranges.push(`<=${max}`);
      } else {
        ranges.push(`${min} - ${max}`);
      }
    }
    const simplified = ranges.join(" || ");
    const original = typeof range2.raw === "string" ? range2.raw : String(range2);
    return simplified.length < original.length ? simplified : range2;
  };
  return simplify;
}
var subset_1;
var hasRequiredSubset;
function requireSubset() {
  if (hasRequiredSubset) return subset_1;
  hasRequiredSubset = 1;
  const Range = requireRange();
  const Comparator = requireComparator();
  const { ANY } = Comparator;
  const satisfies = requireSatisfies();
  const compare2 = requireCompare();
  const subset = (sub, dom, options = {}) => {
    if (sub === dom) {
      return true;
    }
    sub = new Range(sub, options);
    dom = new Range(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub) {
          continue OUTER;
        }
      }
      if (sawNonNull) {
        return false;
      }
    }
    return true;
  };
  const minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
  const minimumVersion = [new Comparator(">=0.0.0")];
  const simpleSubset = (sub, dom, options) => {
    if (sub === dom) {
      return true;
    }
    if (sub.length === 1 && sub[0].semver === ANY) {
      if (dom.length === 1 && dom[0].semver === ANY) {
        return true;
      } else if (options.includePrerelease) {
        sub = minimumVersionWithPreRelease;
      } else {
        sub = minimumVersion;
      }
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
      if (options.includePrerelease) {
        return true;
      } else {
        dom = minimumVersion;
      }
    }
    const eqSet = /* @__PURE__ */ new Set();
    let gt, lt;
    for (const c of sub) {
      if (c.operator === ">" || c.operator === ">=") {
        gt = higherGT(gt, c, options);
      } else if (c.operator === "<" || c.operator === "<=") {
        lt = lowerLT(lt, c, options);
      } else {
        eqSet.add(c.semver);
      }
    }
    if (eqSet.size > 1) {
      return null;
    }
    let gtltComp;
    if (gt && lt) {
      gtltComp = compare2(gt.semver, lt.semver, options);
      if (gtltComp > 0) {
        return null;
      } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
        return null;
      }
    }
    for (const eq of eqSet) {
      if (gt && !satisfies(eq, String(gt), options)) {
        return null;
      }
      if (lt && !satisfies(eq, String(lt), options)) {
        return null;
      }
      for (const c of dom) {
        if (!satisfies(eq, String(c), options)) {
          return false;
        }
      }
      return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
      needDomLTPre = false;
    }
    for (const c of dom) {
      hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
      hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
      if (gt) {
        if (needDomGTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
            needDomGTPre = false;
          }
        }
        if (c.operator === ">" || c.operator === ">=") {
          higher = higherGT(gt, c, options);
          if (higher === c && higher !== gt) {
            return false;
          }
        } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
          return false;
        }
      }
      if (lt) {
        if (needDomLTPre) {
          if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
            needDomLTPre = false;
          }
        }
        if (c.operator === "<" || c.operator === "<=") {
          lower = lowerLT(lt, c, options);
          if (lower === c && lower !== lt) {
            return false;
          }
        } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
          return false;
        }
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0) {
        return false;
      }
    }
    if (gt && hasDomLT && !lt && gtltComp !== 0) {
      return false;
    }
    if (lt && hasDomGT && !gt && gtltComp !== 0) {
      return false;
    }
    if (needDomGTPre || needDomLTPre) {
      return false;
    }
    return true;
  };
  const higherGT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare2(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
  };
  const lowerLT = (a, b, options) => {
    if (!a) {
      return b;
    }
    const comp = compare2(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
  };
  subset_1 = subset;
  return subset_1;
}
var semver$1;
var hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver$1;
  hasRequiredSemver = 1;
  const internalRe = requireRe();
  const constants2 = requireConstants();
  const SemVer = requireSemver$1();
  const identifiers2 = requireIdentifiers();
  const parse2 = requireParse();
  const valid2 = requireValid$1();
  const clean = requireClean();
  const inc = requireInc();
  const diff = requireDiff();
  const major = requireMajor();
  const minor = requireMinor();
  const patch = requirePatch();
  const prerelease = requirePrerelease();
  const compare2 = requireCompare();
  const rcompare = requireRcompare();
  const compareLoose = requireCompareLoose();
  const compareBuild = requireCompareBuild();
  const sort = requireSort();
  const rsort = requireRsort();
  const gt = requireGt();
  const lt = requireLt();
  const eq = requireEq();
  const neq = requireNeq();
  const gte = requireGte();
  const lte = requireLte();
  const cmp = requireCmp();
  const coerce = requireCoerce();
  const Comparator = requireComparator();
  const Range = requireRange();
  const satisfies = requireSatisfies();
  const toComparators = requireToComparators();
  const maxSatisfying = requireMaxSatisfying();
  const minSatisfying = requireMinSatisfying();
  const minVersion = requireMinVersion();
  const validRange = requireValid();
  const outside = requireOutside();
  const gtr = requireGtr();
  const ltr = requireLtr();
  const intersects = requireIntersects();
  const simplifyRange = requireSimplify();
  const subset = requireSubset();
  semver$1 = {
    parse: parse2,
    valid: valid2,
    clean,
    inc,
    diff,
    major,
    minor,
    patch,
    prerelease,
    compare: compare2,
    rcompare,
    compareLoose,
    compareBuild,
    sort,
    rsort,
    gt,
    lt,
    eq,
    neq,
    gte,
    lte,
    cmp,
    coerce,
    Comparator,
    Range,
    satisfies,
    toComparators,
    maxSatisfying,
    minSatisfying,
    minVersion,
    validRange,
    outside,
    gtr,
    ltr,
    intersects,
    simplifyRange,
    subset,
    SemVer,
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: constants2.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: constants2.RELEASE_TYPES,
    compareIdentifiers: identifiers2.compareIdentifiers,
    rcompareIdentifiers: identifiers2.rcompareIdentifiers
  };
  return semver$1;
}
var semverExports = requireSemver();
const semver = /* @__PURE__ */ getDefaultExportFromCjs(semverExports);
function overrideLogger(logger2) {
  const baseContext = { package: "shopify-app" };
  const warningFunction = (message2, context2 = {}) => logger2.warning(message2, { ...baseContext, ...context2 });
  function deprecated2(warningFunction2) {
    return function(version2, message2) {
      if (semver.gte(SHOPIFY_REMIX_LIBRARY_VERSION, version2)) {
        throw new FeatureDeprecatedError(`Feature was deprecated in version ${version2}`);
      }
      return warningFunction2(`[Deprecated | ${version2}] ${message2}`);
    };
  }
  return {
    ...logger2,
    log: (severity, message2, context2 = {}) => logger2.log(severity, message2, { ...baseContext, ...context2 }),
    debug: (message2, context2 = {}) => logger2.debug(message2, { ...baseContext, ...context2 }),
    info: (message2, context2 = {}) => logger2.info(message2, { ...baseContext, ...context2 }),
    warning: warningFunction,
    error: (message2, context2 = {}) => logger2.error(message2, { ...baseContext, ...context2 }),
    deprecated: deprecated2(warningFunction)
  };
}
function loginFactory(params) {
  const { api, config, logger: logger2 } = params;
  return async function login2(request2) {
    const url = new URL(request2.url);
    const shopParam = url.searchParams.get("shop");
    if (request2.method === "GET" && !shopParam) {
      return {};
    }
    const shop = shopParam || (await request2.formData()).get("shop");
    if (!shop) {
      logger2.debug("Missing shop parameter", { shop });
      return { shop: LoginErrorType.MissingShop };
    }
    const shopWithoutProtocol = shop.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const shopWithDomain = shop?.indexOf(".") === -1 ? `${shopWithoutProtocol}.myshopify.com` : shopWithoutProtocol;
    const sanitizedShop = api.utils.sanitizeShop(shopWithDomain);
    if (!sanitizedShop) {
      logger2.debug("Invalid shop parameter", { shop });
      return { shop: LoginErrorType.InvalidShop };
    }
    const authPath = `${config.appUrl}${config.auth.path}?shop=${sanitizedShop}`;
    const adminPath = api.utils.legacyUrlToShopAdminUrl(sanitizedShop);
    const installPath = `https://${adminPath}/oauth/install?client_id=${config.apiKey}`;
    const shouldInstall = config.isEmbeddedApp && config.future.unstable_newEmbeddedAuthStrategy;
    const redirectUrl = shouldInstall ? installPath : authPath;
    logger2.info(`Redirecting login request to ${redirectUrl}`, {
      shop: sanitizedShop
    });
    throw redirect2(redirectUrl);
  };
}
class SessionNotFoundError extends ShopifyError {
}
function unauthenticatedAdminContextFactory(params) {
  return async (shop) => {
    const session = await createOrLoadOfflineSession(shop, params);
    if (!session) {
      throw new SessionNotFoundError(`Could not find a session for shop ${shop} when creating unauthenticated admin context`);
    }
    return {
      session,
      admin: adminClientFactory({ params, session })
    };
  };
}
function authenticateExtensionFactory(params, requestType) {
  return async function authenticateExtension(request2, options = {}) {
    const { logger: logger2 } = params;
    const corsHeaders = options.corsHeaders ?? [];
    respondToBotRequest(params, request2);
    respondToOptionsRequest(params, request2, corsHeaders);
    const sessionTokenHeader = getSessionTokenHeader(request2);
    logger2.info(`Authenticating ${requestType} request`, {
      shop: getShopFromRequest(request2)
    });
    if (!sessionTokenHeader) {
      logger2.debug("Request did not contain a session token", {
        shop: getShopFromRequest(request2)
      });
      throw new Response(void 0, {
        status: 401,
        statusText: "Unauthorized"
      });
    }
    return {
      sessionToken: await validateSessionToken(params, request2, sessionTokenHeader, { checkAudience: false, retryRequest: false }),
      cors: ensureCORSHeadersFactory(params, request2, corsHeaders)
    };
  };
}
function authenticateCheckoutFactory(params) {
  return authenticateExtensionFactory(params, "checkout");
}
function storefrontClientFactory({ params, session }) {
  const { api } = params;
  return {
    graphql: async (query, options = {}) => {
      const client = new api.clients.Storefront({
        session,
        apiVersion: options.apiVersion
      });
      const apiResponse = await client.request(query, {
        variables: options?.variables,
        retries: options?.tries ? options.tries - 1 : 0,
        headers: options?.headers
      });
      return new Response(JSON.stringify(apiResponse));
    }
  };
}
function authenticateAppProxyFactory(params) {
  const { api, config, logger: logger2 } = params;
  return async function authenticate2(request2) {
    const url = new URL(request2.url);
    const shop = url.searchParams.get("shop");
    logger2.info("Authenticating app proxy request", { shop });
    if (!await validateAppProxyHmac(params, url)) {
      logger2.info("App proxy request has invalid signature", { shop });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    const sessionId = api.session.getOfflineId(shop);
    const session = await config.sessionStorage.loadSession(sessionId);
    if (!session) {
      logger2.debug("Could not find offline session, returning empty context", {
        shop,
        ...Object.fromEntries(url.searchParams.entries())
      });
      const context3 = {
        liquid,
        session: void 0,
        admin: void 0,
        storefront: void 0
      };
      return context3;
    }
    const context2 = {
      liquid,
      session,
      admin: adminClientFactory({ params, session }),
      storefront: storefrontClientFactory({ params, session })
    };
    return context2;
  };
}
const liquid = (body, initAndOptions) => {
  const processedBody = processLiquidBody(body);
  if (typeof initAndOptions !== "object") {
    return new Response(processedBody, {
      status: initAndOptions || 200,
      headers: {
        "Content-Type": "application/liquid"
      }
    });
  }
  const { layout, ...responseInit } = initAndOptions || {};
  const responseBody = layout === false ? `{% layout none %} ${processedBody}` : processedBody;
  const headers = new Headers(responseInit.headers);
  headers.set("Content-Type", "application/liquid");
  return new Response(responseBody, {
    ...responseInit,
    headers
  });
};
async function validateAppProxyHmac(params, url) {
  const { api, logger: logger2 } = params;
  try {
    let searchParams = new URLSearchParams(url.search);
    if (!searchParams.get("index")) {
      searchParams.delete("index");
    }
    let isValid = await api.utils.validateHmac(Object.fromEntries(searchParams.entries()), { signator: "appProxy" });
    if (!isValid) {
      const cleanPath = url.pathname.replace(/^\//, "").replace(/\/$/, "").replaceAll("/", ".");
      const data = `routes%2F${cleanPath}`;
      searchParams = new URLSearchParams(`?_data=${data}&${searchParams.toString().replace(/^\?/, "")}`);
      isValid = await api.utils.validateHmac(Object.fromEntries(searchParams.entries()), { signator: "appProxy" });
      if (!isValid) {
        const searchParams2 = new URLSearchParams(`?_data=${data}._index&${url.search.replace(/^\?/, "")}`);
        isValid = await api.utils.validateHmac(Object.fromEntries(searchParams2.entries()), { signator: "appProxy" });
      }
    }
    return isValid;
  } catch (error) {
    const shop = url.searchParams.get("shop");
    logger2.info(error.message, { shop });
    throw new Response(void 0, { status: 400, statusText: "Bad Request" });
  }
}
function processLiquidBody(body) {
  return body.replaceAll(/<(form[^>]+)action="(\/[^"?]+)(\?[^"]+)?">/g, '<$1action="$2/$3">').replaceAll(/<(a[^>]+)href="(\/[^"?]+)(\?[^"]+)?">/g, '<$1href="$2/$3">');
}
function authenticateCustomerAccountFactory(params) {
  return authenticateExtensionFactory(params, "customer account");
}
function authenticatePOSFactory(params) {
  return authenticateExtensionFactory(params, "pos");
}
function authenticatePublicFactory(params) {
  const authenticateCheckout = authenticateCheckoutFactory(params);
  const authenticateAppProxy = authenticateAppProxyFactory(params);
  const authenticateCustomerAccount = authenticateCustomerAccountFactory(params);
  const authenticatePOS = authenticatePOSFactory(params);
  const context2 = {
    checkout: authenticateCheckout,
    appProxy: authenticateAppProxy,
    customerAccount: authenticateCustomerAccount,
    pos: authenticatePOS
  };
  return context2;
}
function unauthenticatedStorefrontContextFactory(params) {
  return async (shop) => {
    const session = await createOrLoadOfflineSession(shop, params);
    if (!session) {
      throw new SessionNotFoundError(`Could not find a session for shop ${shop} when creating unauthenticated storefront context`);
    }
    return {
      session,
      storefront: storefrontClientFactory({ params, session })
    };
  };
}
async function triggerAfterAuthHook(params, session, request2, authStrategy) {
  const { config, logger: logger2 } = params;
  if (config.hooks.afterAuth) {
    logger2.info("Running afterAuth hook", { shop: session.shop });
    const admin = createAdminApiContext(session, params, authStrategy.handleClientError(request2));
    await config.hooks.afterAuth({
      session,
      admin
    });
  }
}
class AuthCodeFlowStrategy {
  api;
  config;
  logger;
  constructor({ api, config, logger: logger2 }) {
    this.api = api;
    this.config = config;
    this.logger = logger2;
  }
  async respondToOAuthRequests(request2) {
    const { api, config } = this;
    const url = new URL(request2.url);
    const isAuthRequest = url.pathname === config.auth.path;
    const isAuthCallbackRequest = url.pathname === config.auth.callbackPath;
    if (isAuthRequest || isAuthCallbackRequest) {
      const shop = api.utils.sanitizeShop(url.searchParams.get("shop"));
      if (!shop)
        throw new Response("Shop param is invalid", { status: 400 });
      if (isAuthRequest) {
        throw await this.handleAuthBeginRequest(request2, shop);
      } else {
        throw await this.handleAuthCallbackRequest(request2, shop);
      }
    }
    if (!getSessionTokenHeader(request2)) {
      await this.ensureInstalledOnShop(request2);
    }
  }
  async authenticate(request2, sessionContext) {
    const { api, config, logger: logger2 } = this;
    const { shop, session } = sessionContext;
    if (!session) {
      logger2.debug("No session found, redirecting to OAuth", { shop });
      await redirectToAuthPage({ config, api }, request2, shop);
    } else if (!session.isActive(config.scopes)) {
      logger2.debug("Found a session, but it has expired, redirecting to OAuth", { shop });
      await redirectToAuthPage({ config, api }, request2, shop);
    }
    logger2.debug("Found a valid session", { shop });
    return session;
  }
  handleClientError(request2) {
    const { api, config, logger: logger2 } = this;
    return handleClientErrorFactory({
      request: request2,
      onError: async ({ session, error }) => {
        if (error.response.code === 401) {
          throw await redirectToAuthPage({ api, config }, request2, session.shop);
        }
      }
    });
  }
  async ensureInstalledOnShop(request2) {
    const { api, config, logger: logger2 } = this;
    validateShopAndHostParams({ api, config, logger: logger2 }, request2);
    const url = new URL(request2.url);
    let shop = url.searchParams.get("shop");
    logger2.debug("Ensuring app is installed on shop", { shop });
    if (!await this.hasValidOfflineId(request2)) {
      logger2.info("Could not find a shop, can't authenticate request");
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    const offlineSession = await this.getOfflineSession(request2);
    const isEmbedded = url.searchParams.get("embedded") === "1";
    if (!offlineSession) {
      logger2.info("Shop hasn't installed app yet, redirecting to OAuth", {
        shop
      });
      if (isEmbedded) {
        redirectWithExitIframe({ api, config }, request2, shop);
      } else {
        throw await beginAuth({ api, config }, request2, false, shop);
      }
    }
    shop = shop || offlineSession.shop;
    if (config.isEmbeddedApp && !isEmbedded) {
      try {
        logger2.debug("Ensuring offline session is valid before embedding", {
          shop
        });
        await this.testSession(offlineSession);
        logger2.debug("Offline session is still valid, embedding app", { shop });
      } catch (error) {
        await this.handleInvalidOfflineSession(error, request2, shop);
      }
    }
  }
  async handleAuthBeginRequest(request2, shop) {
    const { api, config, logger: logger2 } = this;
    logger2.info("Handling OAuth begin request", { shop });
    if (config.isEmbeddedApp && request2.headers.get("Sec-Fetch-Dest") === "iframe") {
      logger2.debug("Auth request in iframe detected, exiting iframe", { shop });
      throw redirectWithExitIframe({ api, config }, request2, shop);
    } else {
      throw await beginAuth({ api, config }, request2, false, shop);
    }
  }
  async handleAuthCallbackRequest(request2, shop) {
    const { api, config, logger: logger2 } = this;
    logger2.info("Handling OAuth callback request", { shop });
    try {
      const { session, headers: responseHeaders } = await api.auth.callback({
        rawRequest: request2
      });
      await config.sessionStorage.storeSession(session);
      if (config.useOnlineTokens && !session.isOnline) {
        logger2.info("Requesting online access token for offline session", {
          shop
        });
        await beginAuth({ api, config, logger: logger2 }, request2, true, shop);
      }
      logger2.debug("Request is valid, loaded session from OAuth callback", {
        shop: session.shop,
        isOnline: session.isOnline
      });
      await triggerAfterAuthHook({ api, config, logger: logger2 }, session, request2, this);
      throw await redirectToShopifyOrAppRoot(request2, { api, config, logger: logger2 }, responseHeaders);
    } catch (error) {
      if (error instanceof Response)
        throw error;
      throw await this.oauthCallbackError(error, request2, shop);
    }
  }
  async getOfflineSession(request2) {
    const offlineId = await this.getOfflineSessionId(request2);
    return this.config.sessionStorage.loadSession(offlineId);
  }
  async hasValidOfflineId(request2) {
    return Boolean(await this.getOfflineSessionId(request2));
  }
  async getOfflineSessionId(request2) {
    const { api } = this;
    const url = new URL(request2.url);
    const shop = url.searchParams.get("shop");
    return shop ? api.session.getOfflineId(shop) : api.session.getCurrentId({ isOnline: false, rawRequest: request2 });
  }
  async testSession(session) {
    const { api } = this;
    const client = new api.clients.Graphql({
      session
    });
    await client.request(`#graphql
      query shopifyAppShopName {
        shop {
          name
        }
      }
    `);
  }
  async oauthCallbackError(error, request2, shop) {
    const { logger: logger2 } = this;
    logger2.error("Error during OAuth callback", { shop, error: error.message });
    if (error instanceof CookieNotFound) {
      return this.handleAuthBeginRequest(request2, shop);
    }
    if (error instanceof InvalidHmacError || error instanceof InvalidOAuthError) {
      return new Response(void 0, {
        status: 400,
        statusText: "Invalid OAuth Request"
      });
    }
    return new Response(void 0, {
      status: 500,
      statusText: "Internal Server Error"
    });
  }
  async handleInvalidOfflineSession(error, request2, shop) {
    const { api, logger: logger2, config } = this;
    if (error instanceof HttpResponseError) {
      if (error.response.code === 401) {
        logger2.info("Shop session is no longer valid, redirecting to OAuth", {
          shop
        });
        throw await beginAuth({ api, config }, request2, false, shop);
      } else {
        const message2 = JSON.stringify(error.response.body, null, 2);
        logger2.error(`Unexpected error during session validation: ${message2}`, {
          shop
        });
        throw new Response(void 0, {
          status: error.response.code,
          statusText: error.response.statusText
        });
      }
    } else if (error instanceof GraphqlQueryError) {
      const context2 = { shop };
      if (error.response) {
        context2.response = JSON.stringify(error.body);
      }
      logger2.error(`Unexpected error during session validation: ${error.message}`, context2);
      throw new Response(void 0, {
        status: 500,
        statusText: "Internal Server Error"
      });
    }
  }
}
class TokenExchangeStrategy {
  api;
  config;
  logger;
  constructor({ api, config, logger: logger2 }) {
    this.api = api;
    this.config = config;
    this.logger = logger2;
  }
  async respondToOAuthRequests(_request) {
  }
  async authenticate(request2, sessionContext) {
    const { api, config, logger: logger2 } = this;
    const { shop, session, sessionToken } = sessionContext;
    if (!sessionToken)
      throw new InvalidJwtError();
    if (!session || !session.isActive(void 0)) {
      logger2.info("No valid session found", { shop });
      logger2.info("Requesting offline access token", { shop });
      const { session: offlineSession } = await this.exchangeToken({
        request: request2,
        sessionToken,
        shop,
        requestedTokenType: RequestedTokenType.OfflineAccessToken
      });
      await config.sessionStorage.storeSession(offlineSession);
      let newSession = offlineSession;
      if (config.useOnlineTokens) {
        logger2.info("Requesting online access token", { shop });
        const { session: onlineSession } = await this.exchangeToken({
          request: request2,
          sessionToken,
          shop,
          requestedTokenType: RequestedTokenType.OnlineAccessToken
        });
        await config.sessionStorage.storeSession(onlineSession);
        newSession = onlineSession;
      }
      logger2.debug("Request is valid, loaded session from session token", {
        shop: newSession.shop,
        isOnline: newSession.isOnline
      });
      try {
        await this.handleAfterAuthHook({ api, config, logger: logger2 }, newSession, request2, sessionToken);
      } catch (errorOrResponse) {
        if (errorOrResponse instanceof Response) {
          throw errorOrResponse;
        }
        throw new Response(void 0, {
          status: 500,
          statusText: "Internal Server Error"
        });
      }
      return newSession;
    }
    return session;
  }
  handleClientError(request2) {
    const { api, config, logger: logger2 } = this;
    return handleClientErrorFactory({
      request: request2,
      onError: async ({ session, error }) => {
        if (error.response.code === 401) {
          logger2.debug("Responding to invalid access token", {
            shop: getShopFromRequest(request2)
          });
          await invalidateAccessToken({ config, logger: logger2 }, session);
          respondToInvalidSessionToken({
            params: { config, api, logger: logger2 },
            request: request2
          });
        }
      }
    });
  }
  async exchangeToken({ request: request2, shop, sessionToken, requestedTokenType }) {
    const { api, config, logger: logger2 } = this;
    try {
      return await api.auth.tokenExchange({
        sessionToken,
        shop,
        requestedTokenType
      });
    } catch (error) {
      if (error instanceof InvalidJwtError || error instanceof HttpResponseError && error.response.code === 400 && error.response.body?.error === "invalid_subject_token") {
        throw respondToInvalidSessionToken({
          params: { api, config, logger: logger2 },
          request: request2,
          retryRequest: true
        });
      }
      throw new Response(void 0, {
        status: 500,
        statusText: "Internal Server Error"
      });
    }
  }
  async handleAfterAuthHook(params, session, request2, sessionToken) {
    const { config } = params;
    await config.idempotentPromiseHandler.handlePromise({
      promiseFunction: () => {
        return triggerAfterAuthHook(params, session, request2, this);
      },
      identifier: sessionToken
    });
  }
}
class MerchantCustomAuth {
  api;
  config;
  logger;
  constructor({ api, config, logger: logger2 }) {
    this.api = api;
    this.config = config;
    this.logger = logger2;
  }
  async respondToOAuthRequests(request2) {
    this.logger.debug("Skipping OAuth request for merchant custom app", {
      shop: getShopFromRequest(request2)
    });
  }
  async authenticate(_request, sessionContext) {
    const { shop } = sessionContext;
    this.logger.debug("Building session from configured access token for merchant custom app", { shop });
    const session = this.api.session.customAppSession(shop);
    return session;
  }
  handleClientError(request2) {
    return handleClientErrorFactory({
      request: request2,
      onError: async ({ error }) => {
        if (error.response.code === 401) {
          this.logger.info("Request failed with 401. Review your API credentials or generate new tokens. https://shopify.dev/docs/apps/build/authentication-authorization/access-token-types/generate-app-access-tokens-admin#rotating-api-credentials-for-admin-created-apps ");
          throw new ShopifyError("Unauthorized: Access token has been revoked.");
        }
      }
    });
  }
}
const IDENTIFIER_TTL_MS = 6e4;
class IdempotentPromiseHandler {
  identifiers;
  constructor() {
    this.identifiers = /* @__PURE__ */ new Map();
  }
  async handlePromise({ promiseFunction, identifier }) {
    try {
      if (this.isPromiseRunnable(identifier)) {
        await promiseFunction();
      }
    } finally {
      this.clearStaleIdentifiers();
    }
    return Promise.resolve();
  }
  isPromiseRunnable(identifier) {
    if (!this.identifiers.has(identifier)) {
      this.identifiers.set(identifier, Date.now());
      return true;
    }
    return false;
  }
  async clearStaleIdentifiers() {
    this.identifiers.forEach((date, identifier, map) => {
      if (Date.now() - date > IDENTIFIER_TTL_MS) {
        map.delete(identifier);
      }
    });
  }
}
function authenticateFlowFactory(params) {
  const { api, config, logger: logger2 } = params;
  return async function authenticate2(request2) {
    logger2.info("Authenticating flow request");
    if (request2.method !== "POST") {
      logger2.debug("Received a non-POST request for flow. Only POST requests are allowed.", { url: request2.url, method: request2.method });
      throw new Response(void 0, {
        status: 405,
        statusText: "Method not allowed"
      });
    }
    const rawBody = await request2.text();
    const result = await api.flow.validate({
      rawBody,
      rawRequest: request2
    });
    if (!result.valid) {
      logger2.error("Received an invalid flow request", { reason: result.reason });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    const payload = JSON.parse(rawBody);
    logger2.debug("Flow request is valid, looking for an offline session", {
      shop: payload.shopify_domain
    });
    const sessionId = api.session.getOfflineId(payload.shopify_domain);
    const session = await config.sessionStorage.loadSession(sessionId);
    if (!session) {
      logger2.info("Flow request could not find session", {
        shop: payload.shopify_domain
      });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    logger2.debug("Found a session for the flow request", { shop: session.shop });
    return {
      session,
      payload,
      admin: adminClientFactory({ params, session })
    };
  };
}
function authenticateFulfillmentServiceFactory(params) {
  const { api, logger: logger2 } = params;
  return async function authenticate2(request2) {
    logger2.info("Authenticating fulfillment service request");
    if (request2.method !== "POST") {
      logger2.debug("Received a non-POST request for fulfillment service. Only POST requests are allowed.", { url: request2.url, method: request2.method });
      throw new Response(void 0, {
        status: 405,
        statusText: "Method not allowed"
      });
    }
    const rawBody = await request2.text();
    const result = await api.fulfillmentService.validate({
      rawBody,
      rawRequest: request2
    });
    if (!result.valid) {
      logger2.error("Received an invalid fulfillment service request", {
        reason: result.reason
      });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    const payload = JSON.parse(rawBody);
    const shop = request2.headers.get(ShopifyHeader.Domain) || "";
    logger2.debug("Fulfillment service request is valid, looking for an offline session", {
      shop
    });
    const session = await createOrLoadOfflineSession(shop, params);
    if (!session) {
      logger2.info("Fulfillment service request could not find session", {
        shop
      });
      throw new Response(void 0, {
        status: 400,
        statusText: "Bad Request"
      });
    }
    logger2.debug("Found a session for the fulfillment service request", {
      shop
    });
    return {
      session,
      payload,
      admin: adminClientFactory({ params, session })
    };
  };
}
function logDisabledFutureFlags(config, logger2) {
  const logFlag = (flag, message2) => logger2.info(`Future flag ${flag} is disabled.

  ${message2}
`);
  if (!config.future.unstable_newEmbeddedAuthStrategy) {
    logFlag("unstable_newEmbeddedAuthStrategy", "Enable this to use OAuth token exchange instead of auth code to generate API access tokens.\n  Your app must be using Shopify managed install: https://shopify.dev/docs/apps/auth/installation");
  }
}
function shopifyApp(appConfig) {
  const api = deriveApi(appConfig);
  const config = deriveConfig(appConfig, api.config);
  const logger2 = overrideLogger(api.logger);
  if (appConfig.webhooks) {
    api.webhooks.addHandlers(appConfig.webhooks);
  }
  const params = { api, config, logger: logger2 };
  let strategy;
  if (config.distribution === AppDistribution.ShopifyAdmin) {
    strategy = new MerchantCustomAuth(params);
  } else if (config.future.unstable_newEmbeddedAuthStrategy && config.isEmbeddedApp) {
    strategy = new TokenExchangeStrategy(params);
  } else {
    strategy = new AuthCodeFlowStrategy(params);
  }
  const authStrategy = authStrategyFactory({
    ...params,
    strategy
  });
  const shopify = {
    sessionStorage: config.sessionStorage,
    addDocumentResponseHeaders: addDocumentResponseHeadersFactory(params),
    registerWebhooks: registerWebhooksFactory(params),
    authenticate: {
      admin: authStrategy,
      flow: authenticateFlowFactory(params),
      public: authenticatePublicFactory(params),
      fulfillmentService: authenticateFulfillmentServiceFactory(params),
      webhook: authenticateWebhookFactory(params)
    },
    unauthenticated: {
      admin: unauthenticatedAdminContextFactory(params),
      storefront: unauthenticatedStorefrontContextFactory(params)
    }
  };
  if (isAppStoreApp(shopify, appConfig) || isSingleMerchantApp(shopify, appConfig)) {
    shopify.login = loginFactory(params);
  }
  logDisabledFutureFlags(config, logger2);
  return shopify;
}
function isAppStoreApp(_shopify, config) {
  return config.distribution === AppDistribution.AppStore;
}
function isSingleMerchantApp(_shopify, config) {
  return config.distribution === AppDistribution.SingleMerchant;
}
function deriveApi(appConfig) {
  let appUrl;
  try {
    appUrl = new URL(appConfig.appUrl);
  } catch (error) {
    const message2 = appConfig.appUrl === "" ? `Detected an empty appUrl configuration, please make sure to set the necessary environment variables.
If you're deploying your app, you can find more information at https://shopify.dev/docs/apps/launch/deployment/deploy-web-app/deploy-to-hosting-service#step-4-set-up-environment-variables` : `Invalid appUrl configuration '${appConfig.appUrl}', please provide a valid URL.`;
    throw new ShopifyError(message2);
  }
  if (appUrl.hostname === "localhost" && !appUrl.port && process.env.PORT) {
    appUrl.port = process.env.PORT;
  }
  appConfig.appUrl = appUrl.origin;
  let userAgentPrefix = `Shopify Remix Library v${SHOPIFY_REMIX_LIBRARY_VERSION}`;
  if (appConfig.userAgentPrefix) {
    userAgentPrefix = `${appConfig.userAgentPrefix} | ${userAgentPrefix}`;
  }
  return shopifyApi({
    ...appConfig,
    hostName: appUrl.host,
    hostScheme: appUrl.protocol.replace(":", ""),
    userAgentPrefix,
    isEmbeddedApp: appConfig.isEmbeddedApp ?? true,
    apiVersion: appConfig.apiVersion ?? LATEST_API_VERSION,
    isCustomStoreApp: appConfig.distribution === AppDistribution.ShopifyAdmin,
    billing: appConfig.billing,
    future: {
      lineItemBilling: true,
      unstable_managedPricingSupport: true
    },
    _logDisabledFutureFlags: false
  });
}
function deriveConfig(appConfig, apiConfig) {
  if (!appConfig.sessionStorage && appConfig.distribution !== AppDistribution.ShopifyAdmin) {
    throw new ShopifyError("Please provide a valid session storage. Refer to https://github.com/Shopify/shopify-app-js/blob/main/README.md#session-storage-options for options.");
  }
  const authPathPrefix = appConfig.authPathPrefix || "/auth";
  appConfig.distribution = appConfig.distribution ?? AppDistribution.AppStore;
  return {
    ...appConfig,
    ...apiConfig,
    billing: appConfig.billing,
    scopes: apiConfig.scopes,
    idempotentPromiseHandler: new IdempotentPromiseHandler(),
    canUseLoginForm: appConfig.distribution !== AppDistribution.ShopifyAdmin,
    useOnlineTokens: appConfig.useOnlineTokens ?? false,
    hooks: appConfig.hooks ?? {},
    sessionStorage: appConfig.sessionStorage,
    future: appConfig.future ?? {},
    auth: {
      path: authPathPrefix,
      callbackPath: `${authPathPrefix}/callback`,
      patchSessionTokenPath: `${authPathPrefix}/session-token`,
      exitIframePath: `${authPathPrefix}/exit-iframe`,
      loginPath: `${authPathPrefix}/login`
    },
    distribution: appConfig.distribution
  };
}
setAbstractRuntimeString(() => {
  return `Remix`;
});
function createKVSessionStorage(kv) {
  return {
    async loadSession(id) {
      const data = await kv.get(`session:${id}`, "json");
      return data || void 0;
    },
    async storeSession(session) {
      const id = session.id;
      await kv.put(`session:${id}`, JSON.stringify(session), {
        expirationTtl: 60 * 60 * 24 * 30
        // 30 days in seconds
      });
      return true;
    },
    async deleteSession(id) {
      await kv.delete(`session:${id}`);
      return true;
    },
    async deleteSessions(ids) {
      await Promise.all(ids.map((id) => kv.delete(`session:${id}`)));
      return true;
    },
    async findSessionsByShop(shop) {
      const shopIndexKey = `shop:${shop}:sessions`;
      const sessionIds = await kv.get(shopIndexKey, "json");
      if (!sessionIds || !Array.isArray(sessionIds)) {
        return [];
      }
      const sessions = await Promise.all(
        sessionIds.map(async (id) => {
          const session = await kv.get(`session:${id}`, "json");
          return session;
        })
      );
      return sessions.filter(Boolean);
    }
  };
}
let shopifyInstance = null;
function getShopify(env) {
  if (!shopifyInstance) {
    shopifyInstance = shopifyApp({
      apiKey: env.SHOPIFY_API_KEY || "SHOPIFY_API_KEY",
      apiSecretKey: env.SHOPIFY_API_SECRET || "SHOPIFY_API_SECRET",
      apiVersion: ApiVersion.October24,
      scopes: env.SCOPES?.split(",") || ["read_products"],
      appUrl: env.SHOPIFY_APP_URL || "https://shopapp.cloudcache.ai",
      authPathPrefix: "/auth",
      sessionStorage: createKVSessionStorage(env.APP_KV),
      distribution: AppDistribution.AppStore,
      future: {
        unstable_newEmbeddedAuthStrategy: true
      }
    });
  }
  return shopifyInstance;
}
function authenticate(env) {
  return getShopify(env).authenticate;
}
function login(env) {
  return getShopify(env).login;
}
const loader$4 = async ({ request: request2, context: context2 }) => {
  const env = context2.env;
  const { admin } = await authenticate(env).admin(request2);
  const response = await admin.graphql(
    `#graphql
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              status
              totalInventory
            }
          }
        }
      }`
  );
  const data = await response.json();
  const products = data.data?.products?.edges?.map((edge) => edge.node) || [];
  return { products };
};
function Products() {
  const { products } = useLoaderData();
  const { host, apiKey } = useOutletContext();
  const rows = products.map((product) => [
    product.title,
    product.handle,
    product.status,
    product.totalInventory?.toString() || "0"
  ]);
  const content = /* @__PURE__ */ jsx(
    Page,
    {
      title: "Products",
      backAction: { url: "/" },
      children: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Layout.Section, { children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(Text, { as: "h2", variant: "headingMd", children: "Product List" }),
        /* @__PURE__ */ jsx(
          DataTable,
          {
            columnContentTypes: ["text", "text", "text", "numeric"],
            headings: ["Title", "Handle", "Status", "Inventory"],
            rows
          }
        )
      ] }) }) })
    }
  );
  if (host && apiKey) {
    return /* @__PURE__ */ jsx(ShopifyAppBridge, { apiKey, host, children: content });
  }
  return content;
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Products,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request: request2, context: context2 }) => {
  const env = context2.env;
  const { session } = await authenticate(env).admin(request2);
  return { shop: session?.shop || "Unknown" };
};
const action$1 = async ({ request: request2, context: context2 }) => {
  const env = context2.env;
  await authenticate(env).admin(request2);
  const formData = await request2.formData();
  const setting = formData.get("setting");
  console.log("Settings updated:", setting);
  return { success: true };
};
function Settings() {
  const { shop } = useLoaderData();
  const { host, apiKey } = useOutletContext();
  const [settingValue, setSettingValue] = useState("");
  const content = /* @__PURE__ */ jsx(
    Page,
    {
      title: "Settings",
      backAction: { url: "/" },
      children: /* @__PURE__ */ jsxs(Layout, { children: [
        /* @__PURE__ */ jsx(Layout.Section, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(BlockStack, { gap: "400", children: /* @__PURE__ */ jsxs(FormLayout, { children: [
          /* @__PURE__ */ jsx(
            TextField,
            {
              label: "App Setting",
              value: settingValue,
              onChange: setSettingValue,
              autoComplete: "off",
              helpText: "Configure your app settings here"
            }
          ),
          /* @__PURE__ */ jsxs(Form, { method: "post", children: [
            /* @__PURE__ */ jsx("input", { type: "hidden", name: "setting", value: settingValue }),
            /* @__PURE__ */ jsx(Button, { submit: true, children: "Save Settings" })
          ] })
        ] }) }) }) }),
        /* @__PURE__ */ jsx(Layout.Section, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "200", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Shop:" }),
            " ",
            shop
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Status:" }),
            " Connected"
          ] })
        ] }) }) })
      ] })
    }
  );
  if (host && apiKey) {
    return /* @__PURE__ */ jsx(ShopifyAppBridge, { apiKey, host, children: content });
  }
  return content;
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Settings,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ request: request2, context: context2 }) => {
  const env = context2.env;
  const url = new URL(request2.url);
  const shop = url.searchParams.get("shop");
  if (!shop) {
    throw new Response("Missing shop parameter", { status: 400 });
  }
  return await login(env)(request2);
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const action = async ({ request: request2, context: context2 }) => {
  const env = context2.env;
  const { topic, shop, session, admin } = await authenticate(env).webhook(request2);
  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await env.APP_KV.delete(`session:${session.id}`);
      }
      console.log(`App uninstalled from shop: ${shop}`);
      break;
    case "SHOP_UPDATE":
      console.log(`Shop updated: ${shop}`);
      break;
    default:
      console.log(`Unhandled webhook topic: ${topic}`);
  }
  return new Response(null, { status: 200 });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "CloudCache ShopApp" },
    { name: "description", content: "Shopify app powered by CloudCache" }
  ];
};
const loader$1 = async ({ request: request2, context: context2 }) => {
  const env = context2.env;
  try {
    const { session } = await authenticate(env).admin(request2);
    return { shop: session?.shop || "Unknown", authenticated: true };
  } catch (error) {
    return { shop: "Unknown", authenticated: false };
  }
};
function Index() {
  const { shop, authenticated } = useLoaderData();
  const { host, apiKey } = useOutletContext();
  const content = /* @__PURE__ */ jsx(Page, { title: "Dashboard", children: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Layout.Section, { children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(BlockStack, { gap: "400", children: [
    /* @__PURE__ */ jsx(Text, { as: "h2", variant: "headingMd", children: "Welcome to CloudCache ShopApp" }),
    /* @__PURE__ */ jsx(Text, { as: "p", variant: "bodyMd", children: authenticated ? `Connected to shop: ${shop}` : "Not authenticated" }),
    /* @__PURE__ */ jsxs(InlineStack, { gap: "300", children: [
      /* @__PURE__ */ jsx(Button, { url: "/app/products", children: "Manage Products" }),
      /* @__PURE__ */ jsx(Button, { url: "/app/settings", children: "Settings" })
    ] })
  ] }) }) }) }) });
  if (host && apiKey) {
    return /* @__PURE__ */ jsx(ShopifyAppBridge, { apiKey, host, children: content });
  }
  return content;
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request: request2, context: context2 }) => {
  const env = context2.env;
  await authenticate(env).admin(request2);
  return null;
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CIPMhcl9.js", "imports": ["/assets/components-pL6DFRjL.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-B1pO8Diw.js", "imports": ["/assets/components-pL6DFRjL.js"], "css": ["/assets/root-Cst8-6Q9.css"] }, "routes/app.products": { "id": "routes/app.products", "parentId": "root", "path": "app/products", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app.products-BAyMXZJD.js", "imports": ["/assets/components-pL6DFRjL.js", "/assets/AppBridgeProvider-7j6ZGZU_.js"], "css": [] }, "routes/app.settings": { "id": "routes/app.settings", "parentId": "root", "path": "app/settings", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/app.settings-D1yDm4Qb.js", "imports": ["/assets/components-pL6DFRjL.js", "/assets/AppBridgeProvider-7j6ZGZU_.js"], "css": [] }, "routes/auth.login": { "id": "routes/auth.login", "parentId": "root", "path": "auth/login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth.login-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/webhooks": { "id": "routes/webhooks", "parentId": "root", "path": "webhooks", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/webhooks-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-_iiVQ1UM.js", "imports": ["/assets/components-pL6DFRjL.js", "/assets/AppBridgeProvider-7j6ZGZU_.js"], "css": [] }, "routes/auth.$": { "id": "routes/auth.$", "parentId": "root", "path": "auth/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/auth._-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-db496436.js", "version": "db496436" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/app.products": {
    id: "routes/app.products",
    parentId: "root",
    path: "app/products",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/app.settings": {
    id: "routes/app.settings",
    parentId: "root",
    path: "app/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
