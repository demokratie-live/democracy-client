'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var styled = require('styled-components/native');
var React = require('react');
var Svg$1 = require('react-native-svg');
var reactNative = require('react-native');
var d3Shape = require('d3-shape');
var d3Scale = require('d3-scale');
var d3Array = require('d3-array');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var Svg__default = /*#__PURE__*/_interopDefaultLegacy(Svg$1);

const lightColors = {
    primary: '#4494d3',
    secondary: '#1C659F',
    background: {
        primary: '#FFFFFF',
        secondary: '#EFEFF4',
        pushBox: '#00000088',
    },
    text: {
        primary: '#030303',
        secondary: '#FFFFFF',
        tertiary: '#8F8E94',
        colored: '#4494D3',
        danger: '#EC3E31',
        seperator: '#6D6D72',
        badge: '#FFAB21',
        date: {
            future: '#44DB5E',
            current: '#F5A623',
            past: '#FE3824',
        },
    },
    vote: {
        community: {
            yes: '#16C063',
            abstination: '#2882E4',
            no: '#EC3E31',
        },
        government: {
            yes: '#99C93E',
            abstination: '#4CB0D8',
            no: '#D43194',
            notVoted: '#B1B3B4',
        },
        notVoted: {
            yes: '#C7C7CC',
            abstination: '#D8D8D8',
            no: '#B0AFB7',
        },
        wom: {
            match: '#F5A623',
            missmatch: '#B1B3B4',
        },
    },
    party: {
        Union: {
            background: '#32302e',
            text: '#dad9d4',
        },
        SPD: {
            background: '#E3000F',
            text: '#fff',
        },
        AfD: {
            background: '#009ee0',
            text: '#fff',
        },
        FDP: {
            background: '#ffed00',
            text: '#e5007d',
        },
        Linke: {
            background: '#CE2C55',
            text: '#fff',
        },
        Grüne: {
            background: '#46962b',
            text: '#fff',
        },
        ohne: {
            background: '#aaa',
            text: 'white',
        },
    },
};
const darkColors = {
    primary: '#29608B',
    secondary: '#B5B5B5',
    background: {
        primary: '#424242',
        secondary: '#B5B5B5',
        pushBox: '#FFFFFF88',
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#424242',
        tertiary: '#B5B5B5',
        colored: '#4494D3',
        danger: '#EC3E31',
        seperator: '#B5B5B5',
        badge: '#FFAB21',
        date: {
            future: '#44DB5E',
            current: '#F5A623',
            past: '#FE3824',
        },
    },
    vote: {
        community: {
            yes: '#16C063',
            abstination: '#2882E4',
            no: '#EC3E31',
        },
        government: {
            yes: '#99C93E',
            abstination: '#4CB0D8',
            no: '#D43194',
            notVoted: '#B1B3B4',
        },
        notVoted: {
            yes: '#C7C7CC',
            abstination: '#D8D8D8',
            no: '#B0AFB7',
        },
        wom: {
            match: '#F5A623',
            missmatch: '#B1B3B4',
        },
    },
    party: {
        Union: {
            background: '#32302e',
            text: '#dad9d4',
        },
        SPD: {
            background: '#E3000F',
            text: '#fff',
        },
        AfD: {
            background: '#009ee0',
            text: '#fff',
        },
        FDP: {
            background: '#ffed00',
            text: '#e5007d',
        },
        Linke: {
            background: '#CE2C55',
            text: '#fff',
        },
        Grüne: {
            background: '#46962b',
            text: '#fff',
        },
        ohne: {
            background: '#aaa',
            text: 'white',
        },
    },
};

const fontSizes = {
    default: '14px',
};

const spaces = {
    default: '11px',
};

const lightTheme = {
    name: 'Light',
    colors: lightColors,
    textStyles: {
        button: {
            primary: styled.css `
        font-size: ${fontSizes.default};
        color: ${lightColors.text.primary};
      `,
        },
    },
    fontSizes,
    spaces,
};
const darkTheme = {
    name: 'Dark',
    colors: darkColors,
    textStyles: {
        button: {
            primary: styled.css `
        font-size: ${fontSizes.default};
        color: ${darkColors.text.secondary};
      `,
        },
    },
    fontSizes,
    spaces,
};

const Button$1 = styled__default['default'].TouchableOpacity.withConfig({ displayName: "Button", componentId: "sc-4ecn3o" }) `
  width: 100%;
  height: 40px;

  align-items: center;
  justify-content: center;
  border-color: ${({ color }) => `${color}CC`};
  background-color: ${({ color }) => `${color}`};
`;
const Label = styled__default['default'].Text.withConfig({ displayName: "Label", componentId: "sc-b4s8hs" }) `
  font-size: ${({ theme }) => theme.fontSizes.default};
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;

  color: ${({ color }) => `${color}`};
`;

const getVariant = (variant, theme) => {
    const variants = {
        primary: {
            colors: {
                background: theme.colors.primary,
                label: theme.colors.text.secondary,
            },
        },
        secondary: {
            colors: {
                background: theme.colors.background.primary,
                label: theme.colors.text.colored,
            },
        },
        danger: {
            colors: {
                background: theme.colors.text.danger,
                label: theme.colors.text.secondary,
            },
        },
        'danger-secondary': {
            colors: {
                background: theme.colors.background.primary,
                label: theme.colors.text.danger,
            },
        },
    };
    return variants[variant];
};
const Button = ({ children, variant = 'primary', ...props }) => {
    const theme = styled.useTheme();
    const variantData = getVariant(variant, theme);
    return (React__default['default'].createElement(Button$1, Object.assign({ color: variantData.colors.background }, props),
        React__default['default'].createElement(Label, { color: variantData.colors.label }, children)));
};

const ThumbUpIcon = ({ color, ...props }) => {
    return (React__namespace.createElement(Svg__default['default'], Object.assign({ width: "1em", height: "1em", viewBox: "0 0 44 51" }, props),
        React__namespace.createElement(Svg$1.Defs, null,
            React__namespace.createElement(Svg$1.Path, { d: "M12.32 46.942c.775-.03 1.267-.05 1.78-.068 3.832-.133 6.231-.096 7.964.22 2.463.452 5.675.908 8.463 1.162 3.567.324 6.248.305 7.488-.108.852-.284 1.307-.74 1.51-1.345.15-.453.15-.966.054-1.447a2.764 2.764 0 00-.043-.184c-.133-.406.004-.805.323-1.018l.11-.077a10.54 10.54 0 001.296-1.097c.814-.813 1.286-1.6 1.286-2.212 0-.76-.16-1.397-.422-1.922a2.926 2.926 0 00-.272-.446c-.08-.1-.085-.104-.087-.107a.85.85 0 01.363-1.41c.147-.056.24-.098.341-.151.3-.157.6-.369.883-.642.643-.624 1.088-1.471 1.249-2.605.18-1.26-.127-2.107-.738-2.687a2.472 2.472 0 00-.701-.466c-1.034-.34-.658-1.834.372-1.66a.68.68 0 00.419-.11c.145-.095.277-.255.388-.516.16-.373.251-.902.251-1.604 0-.91-.405-1.451-1.328-1.86-.822-.366-1.733-.544-3.87-.826l-.38-.05c-1.796-.24-2.783-.425-3.757-.765-1.354-.473-2.32-1.187-2.855-2.259a.85.85 0 01-.09-.38c0-1.334.362-2.649 1.047-4.038.516-1.046 1.114-1.98 2.179-3.487l.572-.81c.215-.305.387-.552.546-.787.39-.573.693-1.055.943-1.507.572-1.033.853-1.892.853-2.674 0-1.843-.215-3.32-.585-4.306-.152-.404-.32-.698-.48-.868a.557.557 0 00-.13-.11c-.2.12-.47.438-.83 1.003-.17.266-.356.58-.604 1.011-.122.212-.605 1.064-.718 1.262a47.322 47.322 0 01-1.875 3.056 31.398 31.398 0 01-2.664 3.443 27.735 27.735 0 01-4.992 4.398c-.586.403-1.278 1.027-2.11 1.89-.659.683-1.277 1.371-2.418 2.675l-.114.13c-1.576 1.802-2.207 2.504-3.009 3.31-1.111 1.118-2.02 1.845-2.84 2.204-2.61 1.139-6.867 2.13-9.24 2.213a2.57 2.57 0 00-.069.235c-.116.478-.193 1.211-.224 2.146-.06 1.824.056 4.32.316 6.923.26 2.604.643 5.1 1.07 6.926.219.94.444 1.68.66 2.168.072.162.14.287.196.373 1.015-.004 1.941-.035 4.523-.139zm28.787.41c-.371 1.115-1.225 1.97-2.584 2.422-1.542.515-4.373.535-8.176.189a102.769 102.769 0 01-8.612-1.182c-1.568-.287-3.89-.324-7.594-.194-.51.018-1 .037-1.77.067-2.788.112-3.664.14-4.804.14-.417 0-.756-.205-1.032-.53-.185-.22-.349-.503-.505-.856-.266-.602-.52-1.435-.761-2.47-.445-1.906-.838-4.474-1.105-7.147-.268-2.674-.387-5.243-.324-7.152.035-1.041.123-1.88.272-2.491.09-.37.203-.67.358-.911.242-.374.597-.62 1.051-.62 2.049 0 6.347-.976 8.866-2.077.574-.25 1.343-.867 2.315-1.845.766-.77 1.383-1.458 2.933-3.231l.114-.13c1.158-1.326 1.789-2.029 2.473-2.739.903-.938 1.671-1.631 2.37-2.111a26.032 26.032 0 004.685-4.131c1.66-1.858 2.865-3.651 4.328-6.213l.719-1.265c.26-.453.458-.787.645-1.08.493-.774.9-1.256 1.374-1.538.278-.166.576-.257.889-.257.514 0 .983.239 1.371.653.33.352.607.835.831 1.435.45 1.2.694 2.873.694 4.905 0 1.115-.367 2.236-1.066 3.5a21.187 21.187 0 01-1.023 1.64c-.166.243-.342.498-.563.81l-.573.811c-1.016 1.44-1.576 2.316-2.042 3.261-.538 1.093-.83 2.095-.867 3.075.333.536.919.938 1.8 1.246.83.29 1.736.46 3.419.684l.378.05c1.117.148 1.647.227 2.255.346.824.16 1.5.354 2.081.612 1.501.667 2.338 1.786 2.338 3.417 0 1.556-.383 2.648-1.088 3.295.89.947 1.322 2.282 1.08 3.99-.215 1.516-.84 2.706-1.748 3.588a5.549 5.549 0 01-.918.722 6 6 0 01.628 2.737c0 .652-.215 1.3-.6 1.942a7.79 7.79 0 01-1.183 1.475c-.363.363-.748.698-1.134.998.061.728.04 1.453-.195 2.16z", id: "prefix__a" })),
        React__namespace.createElement(Svg$1.Use, { fill: color, fillRule: "nonzero", xlinkHref: "#prefix__a", transform: "translate(-3)" })));
};

const Circle = styled__default['default'].TouchableOpacity.withConfig({ displayName: "Circle", componentId: "sc-h4twu2" }) `
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  border-color: ${({ color }) => `${color}CC`};
  border-radius: ${({ size }) => `${size / 2}px`}; // TODO Try 50%
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

const CircleButton$1 = ({ color, size, children, ...props }) => (React__default['default'].createElement(Circle, Object.assign({}, props, { color, size }), children));

const CircleButton = styled__default['default'](CircleButton$1).withConfig({ displayName: "CircleButton", componentId: "sc-1hlhuv" }) `
  justify-content: center;
  align-items: center;
`;
const ThumbUp = styled__default['default'](ThumbUpIcon).attrs({
    width: 45,
    height: 45,
}).withConfig({ displayName: "ThumbUp", componentId: "sc-dosh8" }) `
  transform: ${({ rotation }) => `rotate(${String(rotation)}deg)`};
`;

const getDecisionColor = (decision, theme) => {
    const ding = decision.toLowerCase();
    return theme.colors.vote.community[ding];
};
const VoteButton = ({ decision }) => {
    const theme = styled.useTheme();
    const backgroundColor = getDecisionColor(decision, theme);
    let rotation = 0;
    if (decision === 'ABSTINATION') {
        rotation = -90;
    }
    else if (decision === 'NO') {
        rotation = -180;
    }
    return (React__default['default'].createElement(CircleButton, { size: 88, color: backgroundColor },
        React__default['default'].createElement(ThumbUp, { color: theme.colors.text.secondary, rotation: rotation })));
};

const Number = styled__default['default'].Text.withConfig({ displayName: "Number", componentId: "sc-1qht293" }) `
  color: ${({ voted, theme }) => voted ? theme.colors.text.colored : theme.colors.text.primary};
  font-weight: bold;
`;
const VotesIndex = ({ votes, voted }) => (React__default['default'].createElement(Number, { voted: voted }, votes));

const Svg = styled__default['default'](Svg$1.Svg).withConfig({ displayName: "Svg", componentId: "sc-12ztyip" }) `
  flex: 1;
  align-self: stretch;
`;
const PieChart = ({ size, data }) => {
    const pieObj = d3Shape.pie()
        .value((d) => d.value)
        .sort(null);
    const arcs = pieObj(data);
    const paths = arcs.map((value) => {
        const path = d3Shape.arc()
            .outerRadius(size / 2 - size / 10 + (value.data.highlight ? size / 10 : 0))
            .innerRadius(0)(value);
        //
        return path;
    });
    const viewBox = reactNative.Platform.OS === 'web'
        ? `-${size / 2} -${size / 2} ${size} ${size}`
        : undefined;
    return (React__default['default'].createElement(Svg, { width: size, height: size, viewBox: viewBox },
        React__default['default'].createElement(Svg$1.G, { x: size / 2, y: size / 2 }, paths.map((item, i) => item ? (React__default['default'].createElement(Svg$1.Path, { key: data[i].name, fill: data[i].color, strokeWidth: size / 100, d: item })) : null))));
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var moment = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    module.exports = factory() ;
}(commonjsGlobal, (function () {
    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            'object' !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = commonjsRequire;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));
});

const DateText = styled__default['default'].Text.withConfig({ displayName: "DateText", componentId: "sc-mnzu45" }) `
  color: ${({ theme, type }) => {
    switch (type) {
        case 'future':
            return theme.colors.text.date.future;
        case 'current':
            return theme.colors.text.date.current;
        case 'past':
        default:
            return theme.colors.text.date.past;
    }
}};
  font-size: 12px;
`;
const formatDate = (voteDate) => {
    if (voteDate) {
        // Vergangene Abstimmung
        if (new Date(voteDate) <= new Date()) {
            return moment(voteDate).format('DD.MM.YY');
        }
        const daysDate = moment(voteDate).endOf('day');
        const days = Math.floor(moment.duration(daysDate.diff(moment())).asDays());
        if (days > 1) {
            return `${days} Tage`;
        }
        else if (days === 1) {
            return 'morgen';
        }
        const hours = Math.floor(moment.duration(moment(voteDate).diff(moment())).asMinutes() / 60);
        const minutes = `${Math.floor(((moment.duration(moment(voteDate).diff(moment())).asMinutes() / 60) % 1) * 60)}`.padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    return null;
};
const VoteDate = ({ date, dateEnd }) => {
    const [timeLeft, setTimeLeft] = React.useState(formatDate(date));
    React.useEffect(() => {
        // TODO check this interval function (should run only on feature procedures)
        if ((dateEnd && dateEnd > new Date()) || date < new Date()) {
            const intervalId = setInterval(() => {
                if (intervalId) {
                    setTimeLeft(formatDate(date));
                }
            }, 10000);
            return () => {
                clearInterval(intervalId);
            };
        }
        return;
    }, [date, dateEnd]);
    if (dateEnd && date <= new Date() && dateEnd >= new Date()) {
        return React__default['default'].createElement(DateText, { type: 'current' }, "l\u00E4uft");
    }
    return (React__default['default'].createElement(DateText, { type: date <= new Date() ? 'past' : 'future' }, timeLeft));
};

const CommunityChart = ({ communityChart, }) => communityChart ? (React__default['default'].createElement(React__default['default'].Fragment, null, React__default['default'].isValidElement(communityChart) ? (communityChart) : (React__default['default'].createElement(PieChart, Object.assign({}, communityChart))))) : null;

const GovernmentChart = ({ governmentChart, }) => governmentChart ? (React__default['default'].createElement(React__default['default'].Fragment, null, React__default['default'].isValidElement(governmentChart) ? (governmentChart) : (React__default['default'].createElement(PieChart, Object.assign({}, governmentChart))))) : null;

const ProcedureListItem$1 = styled__default['default'].View.withConfig({ displayName: "ProcedureListItem", componentId: "sc-1tq0vzw" }) `
  flex-direction: row;
  padding-horizontal: ${({ theme }) => theme.spaces.default};
  padding-vertical: ${({ theme }) => theme.spaces.default};
`;
const TextContainer = styled__default['default'].View.withConfig({ displayName: "TextContainer", componentId: "sc-18tdyl4" }) `
  flex: 1;
  justify-content: space-between;
`;
const Title = styled__default['default'].Text.withConfig({ displayName: "Title", componentId: "sc-muzs0q" }) `
  font-size: 17px;
  color: ${({ theme }) => theme.colors.text.primary};
`;
const Subline = styled__default['default'].Text.withConfig({ displayName: "Subline", componentId: "sc-10us3hf" }) `
  padding-top: 8px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;
const SideContainer = styled__default['default'].View.withConfig({ displayName: "SideContainer", componentId: "sc-1esmvln" }) `
  align-items: flex-end;
  min-width: 50px;
  justify-content: space-between;
`;
const PieChartContainer = styled__default['default'].View.withConfig({ displayName: "PieChartContainer", componentId: "sc-1dlw1ce" }) `
  flex-direction: row;
  width: 45px;
  justify-content: space-between;
`;
styled__default['default'].Text.withConfig({ displayName: "Label", componentId: "sc-srmc88" }) `
  font-size: ${({ theme }) => theme.fontSizes.default};
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 1px;
`;

const ProcedureListItem = ({ communityChart, governmentChart, voted, votes, title, isIntro = false, subtitle, date, dateEnd, ...props }) => {
    return (React__default['default'].createElement(ProcedureListItem$1, Object.assign({}, props),
        React__default['default'].createElement(TextContainer, null,
            React__default['default'].createElement(Title, { numberOfLines: isIntro ? undefined : 3 }, title),
            !!subtitle && (React__default['default'].createElement(Subline, { numberOfLines: isIntro ? undefined : 2 }, subtitle))),
        React__default['default'].createElement(SideContainer, null,
            React__default['default'].createElement(VotesIndex, Object.assign({}, { voted, votes })),
            React__default['default'].createElement(PieChartContainer, null,
                React__default['default'].createElement(GovernmentChart, Object.assign({}, { governmentChart })),
                React__default['default'].createElement(CommunityChart, Object.assign({}, { communityChart }))),
            React__default['default'].createElement(VoteDate, Object.assign({}, { date, dateEnd })))));
};

const constituencySvgs = {
    '1': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M256.26 97.418l-.563-.699-2.91-.14-1.983 1.782-1.884.838-4.794 3.91-2.777 1.848-1.223 2.37-1.356 1.289-2.281.313.1 2.125-1.72 1.113-.132 2.54-2.843 1.913-1.72.243-.43 3.37.827 2.222-.529 1.423-5.223 1.977-2.58-.867-1.322 2.081.662 1.317-.496 2.01-1.72.831-4.132.45-1.388-3.221.86-1.456-1.059-1.804-1.62.382-1.487 1.63-1.654-2.497 1.786-3.089 2.876 1.007 1.025-4.063 2.38-2.329-.033-3.27-1.752-2.296-.298-1.707 1.653-3.624-1.421-1.744-1.95-.662.23-2.408-2.28-2.968.562-1.258-2.017-1.258-2.15-3.673-1.255.875-2.711-.56.165-5.707 1.818-1.121.43-1.823-1.09-2.666.76-5.618 2.314.28 4.694 2.003-.231 1.79 1.884 1.826 3.968.807 1.686-1.79.562-1.615 1.554-.28.958 1.439 3.802-1.334 4.794-4.321 2.413.597-1.289 2.424 7.439 2.985 3.041 2.666 2.281 3.506 2.282.455 1.223-1.822.363-2.314 2.81 1.683 1.092 2.138.694 3.818 2.48 2.589z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '2': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M183.096 104.922l.066 1.917-1.983 4.075-2.711.453-1.587-1.776-.265-1.846 2.943-1.673zm-20.133-12.433l1.157 3.566 1.917 3.598-1.653.384-3.57-4.576.462-2.587zm12.463-6.091l1.257 1.05-.496 4.446-.728 1.4-4.496-.07-4.86-2.275.033-1.47 1.653-2.52zm30.185-11.65l-.76 5.619 1.09 2.666-.43 1.823-1.818 1.121-.165 5.707 2.71.56 1.257-.875 2.149 3.673 2.017 1.258-.562 1.258 2.28 2.968-.23 2.408 1.95.662 1.421 1.744-1.653 3.624.298 1.707 1.752 2.297.033 3.27-2.38 2.328-1.025 4.063-2.876-1.007-1.786 3.089 1.654 2.497 1.487-1.63 1.62-.382 1.058 1.804-.86 1.456 1.39 3.221 4.132-.45 1.719-.831.892 2.597 1.224.277.297 4.186-.397.622-3.173.38-2.315 1.383-4.727.07-.827 3.28-3.273-.172-.76.898-3.736 1.346-1.917-.898-2.315.483-.463-1.277-2.909 1.277-1.058 1.105-2.149-.863-1.752 1.277-1.884-2.278-1.091-3.004.628-2.765.826-.899-.099-2.352.661-1.626-.43-2.7-2.446.311-2.975-1.108-2.678 1.42-1.752-.485-3.108-3.05.099-2.322 1.818.312 2.877-1.561.297-1.284-2.116-.694 1.025-2.396 3.736.104 3.703-1.007 2.612.66 3.173-1.425 2.711-3.441 2.15-.73.363-3.342-1.389-2.647-2.05 1.115.1 1.289-3.042 3.689h-2.81l-1.884-.905.297-3.202 3.24-2.334-.165-3.172 1.355-3.349-.628-1.361-1.95-1.362-.86-2.62-2.876-1.329-1.223-1.154-.794-3.498-1.256-.946-1.852-6.342-1.487-.35-.827-2.281-1.95-2 .231-3.62-.496-.737-4.959.351-5.356 3.303-2.248-1.194-.628-1.511-1.72.28-2.049 2.916.232 2.352-.463 3.052.529 1.227-1.257 1.998.496-11.685.562-3.48 4.629-12.013 2.446.177.694 1.763-2.38 1.093-2.347 3.56.463.88.033 4.575.595 1.301 2.612 1.723 3.67.21 1.355-.738 5.025-.246 1.917-.773.034-1.583 2.71.247 2.282 1.547 2.645-.281 1.256-.844 2.744.703 2.38-.738 3.075.21 3.703 1.547 1.851 1.406z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '3': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M223.1 138.078l.694 3.18-6.48 3.556-.628 1.622.033 4.275 3.537.896 3.34-.586.793-1.654 2.182.241 1.322-1.103 2.943.414 1.719 2.791.198 1.31 4.926-.242 1.323.827 2.677-1 2.05.242.694 2.72 2.182.206 1.125.998 3.735-1.204 3.207 2.477 1.653 4.331.166 1.82-4.596 2.026-.264 1.27-2.15.652-2.446-.618-.562 2.093 1.19 3.839-.66.925-2.315-.48.165-1.85-3.372-2.571-.661-1.853-4.496.344-1.257.926.496 2.091 1.058.515-.76 4.556-1.058 2.704-4.133 1.915.893 2.906-5.389 1.366-3.504-3.075-3.505-7.22-2.182-3.084-2.578-1.577-4-1.166-3.108.24-6.679-.171-.231-1.578-2.645.377-3.075-3.055-1.884-4.604-2.645-4.678.463-1.101 2.248-.999 4.695.964 1.025-2.273-1.819-2.688-1.124-3.31 1.058-1.105 2.91-1.277.462 1.277 2.315-.483 1.917.898 3.736-1.346.76-.898 3.273.173.827-3.282 4.727-.069 2.315-1.382z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '4': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M256.26 97.418l-.298 8.27-1.521 2.65-1.852 1.81-5.653 3.133.661 2.017 2.744-1.321 4.034-.592 1.322-.66 6.215-.836 3.24 2.679-1.289 2.225-1.256 2.085-2.414-1.32-1.587 1.98-.694 4.132.397 1.11-1.422 2.428.827 3.223 2.05.138-.53 1.697 2.083 1.28-1.289 1.316 1.653 1.003-.661 6.74.694 1.415-3.24 1.795-3.074-.76-1.323-1.553-2.215 2.45-1.422 2.76.331 3.618 1.256.31-.562 2.927-3.735 1.204-1.125-.998-2.182-.206-.694-2.72-2.05-.241-2.677.999-1.323-.827-4.926.241-.198-1.309-1.72-2.791-2.942-.414-1.322 1.103-2.182-.241-.794 1.654-3.339.586-3.537-.896-.033-4.275.628-1.622 6.48-3.556-.695-3.18.397-.622-.297-4.186-1.224-.277-.892-2.597.496-2.01-.662-1.317 1.323-2.08 2.579.866 5.223-1.977.53-1.423-.827-2.222.43-3.37 1.719-.243 2.843-1.913.132-2.54 1.72-1.113-.1-2.125 2.281-.313 1.356-1.29 1.223-2.37 2.777-1.848 4.794-3.909 1.884-.838 1.984-1.782 2.91.14z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '5': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M264.128 125.023l1.686.45.727 1.873-1.554.624v1.594l1.091 1.663-1.422 2.527-3.339-.207-2.082-1.281.529-1.697-2.05-.138-.827-3.223 1.422-2.428-.397-1.11.694-4.131 1.587-1.981 2.414 1.32 1.256-2.085 1.29 2.85-.133 1.215-1.983 1.98z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '6': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M293.882 128.871l-.397 1.594.53 4.397-.927.9.397 2.455-2.016-.104-1.554-1.418-3.77-1.245-1.322 1.522-1.289 3.111-2.413.864 2.644 5.489-5.95.241-.265 3.103-2.413.965-.893-.896-.165-2.379-3.934.69-3.009 2.206-2.975 1.654-2.017-.069-.53 1.137 1.456 1.618 5.124-.069 2.017.654.562 2.615-.794.413-2.876-1.41-1.356 3.13-3.24.068-4.165 2.2-1.851 1.889-.166-1.82-1.653-4.332-3.207-2.477.562-2.927-1.256-.31-.33-3.618 1.421-2.76 2.215-2.45 1.323 1.554 3.074.759 3.24-1.795-.694-1.415.661-6.74-1.653-1.003 1.29-1.315 3.338.207 1.422-2.527-1.09-1.663v-1.594l1.553-.624-.727-1.872-1.686-.451 1.19-1.908 1.124-3.82.992-.903 2.578-.278 1.19-1.355 2.05-.174 3.009.973 4.397 3.057 3.736 1.215 5.388 3.02 2.48 3.502z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '7': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M247.002 174.382l.959.924-.76 2.705 1.553.581.067 1.916 4.86-.445-.331 1.608-1.918 3.588-.496 2.356.562 2.423-2.215 1.023-1.95 2.66-.1.374-1.719 2.01-1.124.137-2.512-2.794-1.72 3.066-.528 2.384-2.976-.647-6.91-4.803-.76-1.33-.496-3.002-1.124-2.628-1.19-1.537 5.389-1.366-.893-2.906 4.133-1.915 1.058-2.704.76-4.556-1.058-.515-.496-2.091 1.257-.926 4.496-.344.661 1.853 3.372 2.571-.165 1.85z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '8': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M277.55 149.78l2.017 2.171 1.686.138 1.124-1.31 2.05.656.793 3.271-.793 1.067-2.248-.757-2.546 3.303 2.48.688 1.024 2.544 1.422.79.297 1.89-2.611 2.54-4.067.343.794 1.372-2.414 1.646 1.157 1.954-.297 1.508 1.884 2.363 1.786 1.096-.43 2.326-1.488 1.06-.694 2.736.496 2.425-1.587.717-.595 1.776-5.026-.751v-1.605l-4.033.649-1.29 1.297-2.446.853-1.157-.58-.33-.102.694-2.664 1.884-1.605-1.124-1.436-2.777 2.256-2.149-.65-.694 3.792-3.901-.171-1.091 3.071-.199-.136-1.653-.273-.562-2.423.496-2.356 1.918-3.588.33-1.608-4.86.445-.066-1.916-1.553-.581.76-2.705-.959-.924.661-.925-1.19-3.84.562-2.092 2.447.618 2.149-.652.264-1.27 4.596-2.025 1.85-1.89 4.167-2.199 3.24-.069 1.355-3.13 2.876 1.411.794-.413-.562-2.615-2.017-.654-5.124.07-1.455-1.619.529-1.137 2.017.07 2.975-1.655 3.009-2.206 3.934-.69.165 2.38.893.895z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '9': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M300.89 158.354l-1.355 4.64-2.248 1.957-3.703.859-2.149 1.132-.86 1.338-4.099-1.098-.86 1.235 1.687 1.167.297 3.188-1.884.308.661 2.946-2.05 1.13-.363 2.634-3.306-.41.43-2.327-1.786-1.096-1.884-2.363.297-1.508-1.157-1.954 2.414-1.646-.794-1.372 4.067-.343 2.611-2.54-.297-1.89-1.422-.79-1.025-2.544-2.48-.688 2.547-3.303 2.248.757.793-1.067-.793-3.271-2.05-.655-1.124 1.31-1.686-.139-2.017-2.17.265-3.104 5.95-.241-2.644-5.49 2.413-.863 1.29-3.111 1.322-1.522 3.769 1.245 1.554 1.418 2.016.104-.397-2.456.926-.9-.529-4.396.397-1.594 4.199-.658 2.182-1.699 2.446-2.775 4.298-2.395 3.835.382.397 1.18 2.744-1.006 1.785-1.702.86 2.153-2.976 3.019.628 5.926-.099 2.597.661 4.98-2.347 1.936-5.157 3.418-3.835 4.657-1.29.759-3.273-.931-.727 1.758-1.918 1.826-.297 1.825 1.421 3.029 1.455 1.204zm13.556-50.853l4.364.767 1.719 1.288 2.05.314 1.09 3.272 2.447 3.825.793 2.71-3.173-.868-3.77.243-.76.695-2.843-.07-1.455-.694.133-3.198-1.885-.904-2.281 1.426-.959-1.078.33-3.166 1.158-2.785 1.62-2.056z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '10': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M296.593 175.272l.397 3.389-.728 1.54 2.877 2.05.793 2.29 1.884.99 1.587-.409 2.05.683 1.025 1.298.595 3.344-1.29 1.842-1.024 5.213-2.546.715-2.116-1.056.298 3.166-1.157 2.415-1.819 1.938-3.14 1.767-1.521 1.936-3.207-.068-.893 2.783-.165 3.935-1.157 1.796-4.96-.814-1.983-1.22-1.388-.644-3.802-2.883-2.248-.068-1.455-.78-.496-1.596-1.62-1.256-2.81-3.228-3.042-2.04-.066-.204-.727-3.607-.1-.408 1.026-1.499 1.653-.204-.364-2.624 1.554-1.193-1.52-1.159.33-1.569-1.323-1.297 2.447-.853 1.29-1.297 4.032-.65v1.606l5.026.75 3.107 3.856 3.108-1.058 1.653-5.631 2.843-1.401 1.157 2.46 3.57 1.263-.528-2.561.463-1.88-.562-2.222 1.62-1.88.496-1.951z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '11': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M304.362 161.654l-.496 2.954-4.132 2.952-.96 1.544-1.685.308-1.323 2.092.827 3.768-2.876 1.815-.496 1.95-1.62 1.881.562 2.222-.463 1.88.529 2.56-3.57-1.263-1.158-2.459-2.843 1.4-1.653 5.632-3.108 1.058-3.107-3.855.595-1.776 1.587-.717-.496-2.425.694-2.735 1.488-1.06 3.306.41.363-2.635 2.05-1.13-.661-2.945 1.884-.308-.297-3.188-1.686-1.167.86-1.235 4.099 1.098.86-1.338 2.148-1.132 3.703-.859 2.248-1.957 1.356-4.64 1.52.034z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '12': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M354.515 226.98l.892 2.332-3.306.101-5.95-1.452-5.455 2.803-.331 1.722.661 2.159-.694 2.933-1.157 1.247-2.81-.337-1.356-1.044h-1.983l-1.753.977.133 1.65-7.075-.942-2.81-2.056-1.323.91-1.058-2.023 1.323-1.855-3.406-2.362-2.413-1.114-1.52-1.925-2.976-5.882-1.124-3.182-4.331-.372-3.24 2.538-2.91-.44-3.306-2.539-1.818-2.439-4.1-.203-1.983.644 1.157-1.796.165-3.935.893-2.783 3.207.068 1.52-1.936 3.141-1.767 1.819-1.938 1.157-2.415-.298-3.166 2.116 1.056 2.546-.715 1.025-5.213 1.29-1.842-.596-3.344-1.025-1.298-2.05-.683-1.587.41-1.884-.99-.793-2.29-2.877-2.052.728-1.54-.397-3.388-.827-3.768 1.323-2.092 1.686-.308.959-1.544 4.132-2.952.496-2.954 3.967-2.647.695 3.574 2.876-.103.793 2.782-2.082 3.329.529 2.058 2.975 1.302-.397 4.316 2.414-.616 1.653 2.054 1.95-.89.43 1.472 2.281.273 1.852 1.779 6.645-1.881 1.983.752.728 1.779 1.785-1.47 1.455 1.162.496 1.675-1.687 4.441.695 1.775-.033 3.207 1.19 2.59-2.976 3.34.992 4.729 1.19 3.671-1.19 2.31 4.199.815-.033-2.004 1.818-1.665 1.72 1.835 1.751.51-1.19 2.546.397 1.255 2.91 2.17 2.082 7.894 2.215-.102 1.389 1.117.463 2.063 3.405.068z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '13': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M335.77 155.291l.991 2.134-1.487 3.335-4.232-.378-.727-2.063 1.653-1.548zm28.994 5.779l-2.976.412-1.09-2.613-2.712 1.754-.595 1.787-4.066 1.133.793 1.717-.76 3.055-1.72 1.131.893 1.372-.661 3.256 2.017.582.463 2.123-.926 2.156 5.091 3.283 5.125-.65 2.744 4.647 1.19 2.628 1.785 1.706 2.083-.034 1.058 1.092 3.24-.41 1.124 3.886 3.537 1.533 1.29 1.328-.893 4.628 2.942 5.267-1.917 1.325-.132 4.987-1.687 1.288 3.835 4.167-.727 1.456-1.157-.846-2.149.304-1.455-.846-.86-2.303-2.115.372-1.256 1.39-1.885-.881-4.232-.068-2.248 1.524.364 2.64-1.455.947-1.289-.473-1.058 2.333-3.405.102-1.818 2.163-2.58-.44 2.183-2.061-3.405-.068-.463-2.063-1.389-1.117-2.215.102-2.083-7.893-2.909-2.17-.397-1.256 1.19-2.547-1.752-.51-1.719-1.834-1.818 1.665.033 2.004-4.199-.815 1.19-2.31-1.19-3.671-.992-4.73 2.976-3.338-1.19-2.59.033-3.208-.695-1.775 1.687-4.44-.496-1.676-1.455-1.163-1.785 1.47-.728-1.778-1.983-.752-6.645 1.881-1.852-1.779-2.281-.273-.43-1.472-1.95.89-1.653-2.054-2.414.616.397-4.316-2.975-1.302-.53-2.058 2.083-3.329-.793-2.782-2.876.103-.695-3.574 2.91-1.72 3.802-.998 2.512.413 2.05-.516 1.157 2.202 2.48 1.685-.232 2.302.661 1.134 1.984.446 2.612-2.439 1.686 2.199 4.232 2.266 1.686-1.716.264-3.436 2.017-4.643 3.174-1.755.496-2.824 2.314-1.206-.562-2.344-1.521.827-2.48 3.24-.562-1.585 1.587-2 1.885-.448 4.694-4.83 4.497-.173 1.983.725 3.075.138 7.405-2.59-.628 2.417 2.414 1.726-1.95 3.76.726 1.275-1.057 2.997 2.446 5.093z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '14': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M401.196 153.26l-1.719 1.309-.562 2.512-2.645-.964-1.025.93-.297 2.235-3.67 2.166-1.355-2.235-3.042.31-1.72 1.822-1.288-.447-.43-3.267-2.083.894-.992 1.65-4 .585-2.678 3.333.992 1.854-.199 1.681-3.24-.034.298 1.372-1.223 1.75-3.439-1.99-.033-1.921-1.983-1.133-.1-4.602 1.323-2.441-2.446-5.093 1.057-2.997-.727-1.276 1.95-3.759-2.413-1.726.628-2.417 1.356-.552h5.29l1.157-.795 3.074-4.633 2.15-1.73 3.404-1.939-.363 1.281 1.686.9.198 1.66 3.273 2.664-.33 4.215 1.025 2.485-.034 1.967 3.571-.31.562 2.345 1.322-.483 4.067.414 1.355 2.033 2.58.38z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '15': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M430.124 110.984l2.116.94-3.24 3.235-2.38.557 1.29-3.235zm-2.579-10.563l-1.52 3.14.396 3.208-1.322 1.01.529-4.74-.265-1.222zm20.035 48.877l.066 2.137 2.017 1.722-3.901 1.584-1.852-1.033-.694 2.547.727.963-1.355 3.44-3.868-1.685-1.091-1.789-1.587-.31-.76-2.305-2.083-.448-5.984 1.377-2.612-.86-2.38.585-2.976 1.995-1.62-.034-2.744 1.995-2.413.86-2.281-2.408-3.736-2.89-2.15 1.067-1.09-1.618-2.017-.93-1.719-1.998-2.579-.379-1.355-2.033-4.067-.414-1.322.483-.562-2.345-3.57.31.033-1.967-1.025-2.485.33-4.215-3.273-2.663-.198-1.661-1.686-.9.363-1.281 2.744-2.009 1.62-2.669 2.414-5.03 1.488-1.25 1.752-2.814 1.884-5.146 2.943 1.809 5.686 1.182 10.712.278 3.537-.452.496 1.843-2.81 1.112-2.876-.66-1.224 1.111-1.19-.799-2.083.209-1.19-1.599-1.52.07-2.083 1.98-.794-1.181-3.471 1.946-3.472 2.535-3.372-.521-1.388.694.132 7.595 2.744-1.005-.33-2.392 3.14-.485.496-1.665 3.075-.556 1.157-1.249 2.843-1.632.033-1.84 2.182-.348.661 3.647 4.662.277.76 1.84 1.587-.035 2.017-1.666.826-3.125 1.422-1.042 3.438-1.147 1.653-1.355.496 3.961 1.29 1.632 1.355-.278 2.678 3.054.793-2.151 5.455.382.364-1.424-1.587-4.203-1.29.556-2.181-.626 1.124-2.26 2.611-.521.76-4.943-1.652.662-2.15-.94-.131-2.056.793-.94 3.538-.838 3.769 1.778-.397-1.847 3.041-2.476-.297 2.79 1.223 2.822 1.356-1.498 1.024 1.707-.066 2.508 1.918 1.81 2.843-1.706.826-1.985-1.289-3.728-2.512.07-1.025-1.465-1.62-.488-1.488-3.979-2.38 1.99.264 1.082-3.008 1.674-1.918.453.893-3.244 1.554-3.037-2.017-3.355 2.017-1.258 2.677-.14 2.116-.77 2.943-.14.033 2.343-2.248 1.014-.595 1.398.363 2.2 1.323 2.338 2.909 1.605 7.075-1.325h2.777l2.248 2.092-.595 3.974-3.273 2.054-2.05 2.333-.132 1.391 1.455 4.137 1.487 1.598 2.744-.173 3.802 5.068-2.182 4.922-2.611.659-.53-.901 2.943-1.698-1.19-1.283.231-1.942-2.512.59-3.538-.729-1.157 1.145-2.314-.174-2.314 1.04-.298 1.353-2.314 1.247-1.323 2.91 1.62 3.115-2.38.934-3.637-1.142.595-1.28-3.206.104-2.844-1.835-1.322-2.251-2.678 1.49-.132 2.25 2.546-.727 1.52 2.25 3.77.484 1.222 3.008 2.182 3.698 1.819-1.14 3.372 5.11.033 1.103 1.554 2.276zm1.356-37.026l-1.885.278-.959 2.435.166 2.573 3.041.8.893-2.92v-2.644z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '16': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M497.865 220.012l-3.471 1.794-1.786-.203-1.289 2.605-1.72.677.2 1.589-3.01.44-2.81-1.218-3.405.575.86-2.232 3.736-3.756 2.281-2.946 1.058-2.847-.992-4.172-1.124 1.018-1.818-.136-2.711-1.561-.926 1.799-2.975.814-.298-1.493-2.48-.51-5.421.272.86-2.206-2.348-1.63.198-2.821-3.174-1.292-1.289-2.653-1.223 1.429.099 1.632 2.711 1.36-1.818 2.107-4.331-.578-4.133 3.26-.86 3.496-2.843.136-1.653 4.068-1.487 1.084.396 2.98-.925.169-1.19 2.402-2.546-.71-.827 2.401-1.95 2.873-1.554-3.245-1.29.406-2.181-.676-2.48 1.69-1.917-1.014 1.355-1.42 1.223-2.673 2.414.135 1.686-.88-.562-3.353 1.686-1.084.661-1.899 2.777-.78-2.512-3.155-2.249.713-3.273-.815-4.165.611-2.248-1.188-1.157-1.562 1.884-3.771-.661-2.72-1.785-2.28-2.116-.273.132-1.736 2.314-.885 2.083-1.568 1.157.273 1.058-1.84 2.017.34 1.025-4.16 4.165-1.672 3.934-2.835.96-3.691-3.142-1.676-1.719-1.916 1.819-1.061 1.09-2.911-1.388-1.576-1.884-.137-.232 1.37-5.488 2.466-2.413-2.226-.463-2.296 1.653-4.562-.496-1.716-2.612-1.958-1.223 1.168-1.356-1.374-2.413-.756-2.71-3.61-1.588-1.032 2.976-1.995 2.38-.586 2.612.86 5.984-1.376 2.083.448.76 2.305 1.587.31 1.09 1.789 3.869 1.684 1.355-3.439-.727-.963.694-2.547 1.852 1.033 3.9-1.584-2.016-1.722-.066-2.137-1.256-2.897 2.876-1.104 2.546-.069 2.876-.863 3.802-2.97.033 2.21 3.075 1.692 3.041 2.898-.727 1.034-.562 3.583-1.422 1.481.033 1.824 2.05 1.927 2.083 1.1 4.364 5.773-4.86 4.152-.132 2.846 1.52.206 1.984 1.576 5.521 1.473 4.728.068 5.818.445 5.092 1.575.727 1.642-.926 6.871.926 1.502v4.47l1.818 1.534-.165 4.906-.628 1.089 1.355 4.626 1.29.714.43 3.567.727.102.1 4.378 1.222 3.661-.264 1.457zm-33.887-78.789l.793.45.96 3.106 2.479 3.416 3.504 2.378 4.463 2.136 1.72 2.135 5.124 4.988 2.314 2.784 2.281 1.752-1.025 1.133.43 3.225-1.355.79-7.075.308-1.058-.446-4.496 2.64-1.852-2.229-.826 2.503-1.95.274-1.82-1.028-.594-1.851 3.174-.515 1.487-1.063 1.058-2.437-.86-3.434-1.421-1.237.793-2.579 2.976.138-.066 3.025 1.719-.481 2.215 1.065.76-2.75-.43-2.648-4-4.785-2.744-.276.298 2.445-1.422 2.307-2.48-.173 1.455-2.478-1.355-.757-1.918 1.033-1.058 1.755-1.719-.034.166-2.031.958-.758 1.224-4.79-3.009-3.277-.463-2.106z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '17': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M419.247 157.218l1.587 1.032 2.711 3.61 2.413.756 1.356 1.374 1.223-1.168 2.612 1.958.496 1.716-1.653 4.562.463 2.296 2.413 2.226 5.488-2.466.232-1.37 1.884.137 1.389 1.576-1.091 2.91-1.819 1.062 1.72 1.916 3.14 1.676-.959 3.691-3.934 2.835-4.165 1.672-1.025 4.16-2.017-.34-1.058 1.84-1.157-.273-2.083 1.568-2.314.885-.132 1.736 2.116.273 1.785 2.28.661 2.72-1.884 3.771 1.157 1.562 2.248 1.188 4.165-.61 3.273.814 2.249-.713 2.512 3.155-2.777.78-.661 1.899-1.686 1.084.562 3.353-1.686.88-2.414-.135-1.223 2.673-1.355 1.42 1.917 1.014-.628 2.771-.661 1.452-1.488-.506-1.223-2.669h-1.554l-1.058 1.25-1.653.17.198 1.89-3.537 1.722-1.223 1.923-1.951.979-1.29-1.181.761-1.89-4 .473-1.356 1.215-2.215-1.586-3.174.877-2.248-1.114.992-2.262-1.917.237-2.844-.71-.33-2.196-3.604.507-2.777-1.318h-2.612l-3.14 1.115-.96-2.298-1.62-.474-.297-2.063-3.405-1.455.727-1.456-3.835-4.167 1.687-1.288.132-4.987 1.917-1.325-2.942-5.267.893-4.628-1.29-1.328-3.537-1.533-1.124-3.886-3.24.41-1.058-1.092-2.083.034-1.785-1.706-1.19-2.628-2.744-4.647-5.125.65-5.091-3.283.926-2.156-.463-2.123-2.017-.582.661-3.256-.892-1.372 1.719-1.131.76-3.055-.793-1.717 4.066-1.133.595-1.787 2.711-1.754 1.091 2.613 2.976-.412.099 4.602 1.983 1.133.033 1.921 3.439 1.99 1.223-1.75-.298-1.372 3.24.034.199-1.681-.992-1.854 2.678-3.333 4-.584.992-1.65 2.083-.895.43 3.267 1.289.447 1.719-1.822 3.042-.31 1.355 2.235 3.67-2.166.297-2.236 1.025-.929 2.645.964.562-2.512 1.72-1.309 2.016.93 1.09 1.618 2.15-1.067 3.736 2.89 2.28 2.407 2.414-.86 2.744-1.994z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '18': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M256.92 194.266l1.422 2.487.231 1.77 2.877-.51.628.034.132.034.463.17h.033l.033.238.727 3.607h0-.033l-.066.034h-.066v.068l-.165.238-.1.034-.991-.68-1.488.102-1.091 1.326-2.876.034-.661-.748-3.207.272-1.819-.612-1.818.782-3.273-.17-.86-1.054-2.975-1.531.066-.987 6.017 1.123 3.736-.068 1.455-1.94 1.487-1.09 1.653-.851z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '19': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M247.333 193.754h.033l.297.341.199.205 1.025.715.231 1.09 1.785 1.465 2.348.749-1.455 1.94-3.736.068-6.017-1.123-2.413-.306.529-2.384 1.719-3.066 2.512 2.794 1.124-.137 1.72-2.01z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '20': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M253.25 190.379l.034.068h0v.034l.033.068.033.069.363.716-1.057 2.148.099 2.317 1.983 1.43-1.487 1.09-2.348-.75-1.785-1.464-.231-1.09-1.025-.715-.199-.205-.297-.34h-.033v-.035l1.95-2.659 2.215-1.023 1.653.273z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '21': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M262.508 187.854l.099.034h0v.034l-.066.137v.477l.297.888-.43-.035-.33.922.297 1.125-3.537.546-.232 1.193-1.686 1.09-.529 2.113-1.653.851-1.983-1.43-.1-2.317 1.058-2.148-.363-.716-.033-.069-.033-.068v-.034h0l-.033-.068.099.068 1.09-3.071 3.902.17.694-3.79 2.15.649 2.776-2.256 1.124 1.436-1.884 1.605z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '22': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M256.92 194.266l1.686-1.091.232-1.193 3.537-.546-.297-1.125.33-.922.43.035-.297-.888v-.477l.066-.137v-.034h0l.231.068 1.157.58 1.323 1.297-.33 1.57 1.52 1.158-1.554 1.193.364 2.624-1.653.204-1.025 1.499.066.17h-.033l-.463-.17-.132-.034-.628-.035-2.877.511-.231-1.77z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '23': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M263.466 202.096l.066.204 3.042 2.04 2.81 3.228 1.62 1.256.496 1.596-2.91 1.628-.66 1.56-3.703.204-2.48-2.51-4.364-3.734-1.653 3.09-2.05 1.424-3.47-1.968-1.257-1.935-2.348 2.07-3.107-3.19.099-2.21-1.818-1.087.198-3.571 2.975 1.53.86 1.055 3.273.17 1.818-.782 1.819.612 3.207-.272.66.748 2.877-.034 1.091-1.326 1.488-.102.992.68.099-.034.165-.238v-.068h.066l.066-.034h.033z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '24': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M119.422 187.99l-2.248.956-.992 1.603.893 2.285-2.315-.34-2.48.817-.297 3.34.76 4.56 2.91-1.36 7.77-1.328 1.52.068.628 2.008-.661 1.53 1.554 1.871-.033 3.67 3.273-.883.43 1.494 1.454.917.76 1.765-.958 1.289 2.016 1.255.629 2.271-6.58 2.27-1.818.983-3.636.474-2.744-1.999-1.918.204-2.248-1.525-2.215.78-1.157 1.287-4.53-1.288-1.322 1.152-.297 2.709-1.918-.44-1.455-.576-3.802-.372-6.05.101-2.314-.541-.992-1.796.628-2.474.067-4.375.727-4.653 2.017-3.74 3.339-.067.892-.953-2.843-3.335 1.389-2.18 1.554-1.124.892-2.08 4.76-3.65 2.547-.99 3.934-.716.925.478 6.05-.034 1.62.921zm-26.184-1.126l-1.322.75-9.092 1.366.595-.717 4.43-.887zm14.58-3.655l-.496 1.162-3.34.922-5.554.239.926-2.016z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '25': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M134.035 215.778l1.024 1.152 2.083-1.186.76 2.203-1.95 5.348-4.926 4.835-3.24 1.722-.165 1.317 1.09 2.734-3.933-.338-.595 6.305-.53-.034-.826 5.184 5.521 3.867.595 3.998 1.124 2.35 4.43 1.71.1 1.677-2.711 3.62-3.505 1.74-1.62 4.719-1.124.668-2.182-.167-3.736 2.607-1.124.1-5.124 2.038-1.124-2.238-2.215.535-1.72 2.238-1.123-2.272-4.199-.5-2.215 2.839-4.066.467-.331 3.337 1.52.034 1.323 2.301-3.174 2.533.033 2.265-1.058 1.465-3.372-.732-.86-1.066-2.082 1.099.595-2.964 1.984.566.694-1.066.959-15.158 1.785-4.886 4.265-7.04 1.719-6.38-.76-6.424.198-2.963-1.323-2.291 2.15-5.6-1.455-10.95 2.975-.034 1.058-.677 1.918.44.297-2.709 1.323-1.152 4.529 1.288 1.157-1.288 2.215-.78 2.248 1.526 1.918-.204 2.744 1.999 3.636-.474 1.819-.983zm-55.74-21.376l-2.777.886-1.488 1.396-.694 2.01-3.174-2.248 1.223-1.84 3.868-1.26z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '26': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M154.995 212.659l.661 1.22-.297 2.746-1.554 1.118-2.645 2.202-3.438-1.084-1.852 2.912-3.273.541-.363-2.098-4.331-2.27-.76-2.202-2.084 1.186-1.024-1.152-.629-2.271-2.016-1.255.959-1.29-.76-1.764-1.456-.917-.43-1.494-3.272.883.033-3.67-1.554-1.87.661-1.53-.628-2.009-1.52-.068-7.77 1.328-2.91 1.36-.76-4.56.298-3.34 2.48-.818 2.314.341-.893-2.285.992-1.603 2.248-.956 7.405-2.424 4.331-.068 1.356-.718 6.91-.785 5.454.546 1.124.615-.562 2.083 1.125 3.856 2.314-.239 1.653 2.592 3.074 7.56-.86 1.87-3.272 1.156-1.885-.34.067 2.447 1.785 2.92h3.174zm-34.25-32.527l-.166.992-3.14.444-.464 1.71-2.48.102.464-2.017 1.19-.992zm8.397-2.121l4.793.034-1.024 1.163-3.075.855-3.868-.65 1.719-1.334z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '27': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M153.805 217.743l-.1 2.913 2.513 1.827 1.818.034 1.356 4.058 1.422 2.433.727 3.241-1.19 1.519.925 2.462-1.157 2.124-.463 2.964-3.14 1.448-1.554-1.246.33-1.684-4 .606-3.207 1.65-1.058 2.76-1.95-1.312-2.744-.169-.926-1.817-2.81-2.19-.727.91-2.513-2.932.793-2.056-3.537-1.35-2.314.507-1.587-.54-1.091-2.734.165-1.317 3.24-1.722 4.926-4.835 1.95-5.348 4.332 2.269.363 2.098 3.273-.541 1.852-2.912 3.438 1.084z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '28': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M174.831 201.892l-2.215 2.21-1.223 2.685-.033 4.786.43 4.985-.463 3.488.066 2.979-.562 3.415.165 3.007 1.058 2.431 4.1 2.43 1.95.404.76 2.496 1.62 2.257.893 2.897 1.984 1.178.033.235.066 2.456-2.612 2.286-1.223 2.89.86 1.746 1.686.235.33 4.261-2.248.235-1.421 6.099-4.662 1.807-.661 1.807-2.579 1.17-1.388-.267.66-1.974-4.099-.234.53-2.109-2.778-.334-2.05-2.378-4.297.435-1.885-.469-2.777-2.413.033-1.777-1.95-.335-.364-3.557.496-2.922-4.034-5.58 1.058-2.76 3.207-1.65 4-.607-.33 1.684 1.554 1.246 3.14-1.448.463-2.964 1.157-2.124-.925-2.462 1.19-1.519-.727-3.241-1.422-2.433-1.356-4.058-1.818-.034-2.512-1.827.099-2.913 1.554-1.118.297-2.745-.661-1.221 2.777 1.051 2.876-3.053.959-2.885.033-4.86-.926-1.054-1.884.646-1.885-.204.662-5.718 1.752-2.282 1.884-.852 2.215.92 1.951 2.998 4.33 1.974 2.745-.068 2.182 1.633z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '29': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M214.405 169.995l2.578 1.577 2.182 3.084 3.505 7.22 3.504 3.075 1.19 1.537-1.554 1.844-2.248-.512-1.95 2.695.892 1.842-1.355 1.875-1.157 3.474-1.653.885-.827 1.906-2.545 1.599-1.951-1.53-1.917-.137-1.521.85-1.455-2.245.132-1.77-.958-1.67-1.554 3.542-2.281-1.43-2.678 1.464-2.546-.238-.86 2.552-2.942.272-.297 1.122 3.14.714-.595 4.621-1.917 1.154 1.95 3.428-2.28 2.543-2.348-1.458-4.034.576-2.347 3.118.694 1.49-2.016 3.555-2.943.473-1.124.913-3.207-.236-1.785-.846-.826 1.116-2.513-.71.793-2.436-.297-3.048-.694-1.287-.43-4.985.033-4.786 4.232-1.394 2.016.306 2.447-2.447-.595-1.36.231-2.212-1.09-2.587.76-1.669-.794-.954-1.62 1.125-4.066-1.227-2.017-4.671-.033-3.55 3.108-8.786.132-1.712 4.033-6.991 3.505-.961 4.132 4.32 1.852 1.063 6.38.582 4.133-1.096 2.248.514 3.471-2.33 2.315-.412 5.322.103z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '30': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M239.63 198.898l2.413.306-.066.987-.198 3.571.793 5.979-2.347.237-.76 1.426-2.81 1.255-1.323-.068-4.926 6.677 2.314 4.535-.198 2.704-4.133.845-2.579 1.622-2.512-1.013-1.885 2.229-1.322.236-.86 3.24-2.28.237-.728-1.249-3.34.641-2.909-2.227-.925 2.329-.463.674-1.223.743-1.95 2.292-2.117-.674-.562-1.855-1.752-2.294-.198-4.694-1.819-2.67 1.091-2.233-2.016-3.317-1.95-.508.065-2.168-1.719-1.355 2.281-2.543-1.95-3.428 1.917-1.154.595-4.621-3.14-.714.297-1.122 2.942-.272.86-2.552 2.546.238 2.678-1.464 2.28 1.43 1.555-3.541.958 1.668-.132 1.77 1.455 2.247 1.52-.851 1.918.136 1.95 1.53 2.546-1.598.827-1.906 1.653-.885 1.157-3.474 1.355-1.875-.892-1.842 1.95-2.695 2.248.512 1.554-1.844 1.124 2.628.496 3.002.76 1.33 6.91 4.803z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '31': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M127.092 279.654l.297 1.4-4.595 3.7.397 2.663v5.09l-.595 5.746-.926.896-1.124 2.853 1.752 1.028-1.785 3.844-2.215.795-3.637 2.45-1.454.827-.563 1.753-2.248.43-1.388 1.885-2.447.727-1.058 1.487-7.835-.231-1.917.462-.86 1.52-2.182.264-1.29-1.321-.892-3.239 2.513-5.425-.728-4.272-1.256-.265-1.389-2.42-.925-3.285-2.876 2.72-4.43-1.459-.397-.73h-4.397l-4.232-2.423.364-3.222-1.323-2.859 1.95.433.563-1.33-.397-2.296.463-2.364-.727-1.099 1.52-1.7 2.315-.632 2.148.433 4.166-.3 2.314 1.166 1.95-.733 1.687.667-.595 2.964 2.083-1.099.86 1.066 3.371.732 1.058-1.465-.033-2.265 3.174-2.533L98 278.387l-1.521-.034.33-3.337 4.067-.467 2.215-2.84 4.199.501 1.124 2.272 1.719-2.238 2.215-.535 1.124 2.238 5.124-2.037 1.124-.1 3.736-2.608 2.182.167 1.124-.668 1.72 2.808-4.365 3.84z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '32': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M128.712 233.903l1.587.54 2.314-.506 3.537 1.349-.793 2.056 2.513 2.932.727-.91 2.81 2.19.926 1.817 2.744.169 1.95 1.312 4.034 5.58-.496 2.923.363 3.557 1.951.335-.033 1.777 2.777 2.413 1.885.47 4.297-.436 2.05 2.378 2.777.334-.529 2.11 4.1.233-.661 1.974.727 5.982-1.455 1.135-1.983-.033-3.935 2.836-1.553.467-.926 3.334 1.025 6.095 2.016 2.594-.297 1.23-1.653.599-.298 3.223-3.636 1.693-2.116-.1-2.447 4.414-1.554-1.061-3.868.066.133-5.344-2.248-1.728 1.223-3.923-.199-2.196 1.72-.699.43-1.798-.43-2.565-1.389-.9-1.52-2.6-2.381-1.168-3.24 1.501-3.471-2.669-2.844.801-2.149 2.102-4.132-.134-2.976-4.304 4.364-3.841-1.719-2.808 1.62-4.718 3.505-1.742 2.71-3.62-.099-1.676-4.43-1.71-1.124-2.35-.595-3.998-5.52-3.867.826-5.184.529.034.595-6.305z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '33': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M194.734 249.324l.86 1.68-1.522 2.284 2.645 7.21 2.116-.77.595-2.48 3.372.133.96 1.911 4.561.738 2.711 2.044-1.024 5.055 3.206 1.204 3.075-.77-.132 3.378 1.157.601-.463.802-1.686-.969-1.752 2.405-2.612.268-2.744.935-2.678.233-5.157 1.035.198 4.57-1.818.7-3.34 2.333-2.38.167-.661 1.798 1.554 2.064 2.017 1.398 1.09 2.893-.859 2.791 1.72 2.425 1.388.332.165 1.991-.992 2.654-1.025.298-1.554 2.155-1.686-.298-2.644 1.391-3.77-.861-2.248.994-1.95-1.856-.298-2.818.199-3.45-.562-2.824-2.546-2.06-5.29 2.924-2.644-1.395-2.678 2.192-.33 2.656-1.29 1.128-1.653-.233-2.282.63-.76-.795-2.678-.332.595-3.851.298-3.223 1.653-.598.297-1.23-2.016-2.595-1.025-6.095.926-3.334 1.553-.467 3.935-2.836 1.983.033 1.455-1.135-.727-5.982 1.388.267 2.579-1.17.661-1.807 4.662-1.807 1.421-6.099 2.248-.235-.33-4.26-1.686-.236-.86-1.746 1.223-2.89 2.612-2.286 1.025.84 2.347-.873 2.513 2.05 3.67-.067z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '34': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M194.436 215.338l1.72 1.355-.067 2.168 1.95.508 2.017 3.317-1.09 2.233 1.818 2.67.198 4.694 1.752 2.294.562 1.855 2.116.674 1.95-2.292 1.224-.743.463-.674.992 3.406-2.249 4.043.199 1.516 1.62 2.12.132 1.446 5.753 1.917 1.124 1.345 1.62-.101-.298 2.419 2.413.269.695-.907 2.446-.807 1.124 1.277.166 2.955-.893.738.397 3.22-2.15 1.408v1.776l-2.082 2.612.727 1.54-1.223 1.138-.959 3.913-1.29.902-1.156-.601.132-3.378-3.075.77-3.206-1.204 1.024-5.055-2.71-2.044-4.563-.738-.959-1.91-3.372-.135-.595 2.481-2.116.77-2.645-7.21 1.521-2.284-.86-1.68 3.538-3.295-.86-.84-.264-4.982 1.356-1.45-2.612-2.325-1.356 1.72-2.578.067h-.034l-1.95-2.9-3.24.338-2.314-1.89-1.72-.27-1.884.642-1.95-2.025-1.984 1.249-.76-3.004-1.356.878-1.818-1.722-1.95-.068-.166-3.007.562-3.415-.066-2.979.463-3.488.694 1.287.297 3.048-.793 2.436 2.513.71.826-1.116 1.785.846 3.207.236 1.124-.913 2.943-.473 2.016-3.555-.694-1.49 2.347-3.118 4.034-.576z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '35': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M258.673 238.488l2.347 2.156-.893 1.482-3.24 3.399 1.455.84 4.232-.37.43-.874 1.256-1.682 1.256.505.132.168h.562l.43 1.447-1.19 2.084-2.281.169.132 1.243 2.579-.033 1.025 3.292-.1 4.631-3.306-.838-.33 1.844-4.794.973-4.893 3.25-1.322-.368-.662-1.575-2.975.067-2.81 1.608.959 2.947-1.422.97-.529 3.446.496 4.244-4.397 1.27.529 1.535-1.29 1.668-.462 1.902.892 2.267-.595 1.166-1.058.366-.595 2.865-1.554.3-1.686-.8-.264-2.298-2.281-1.233-.827-2.733-2.513.533-.264 1.034-1.686-1.734.364-1.968-1.62-.367v-2.036l-3.174.233-1.19-.8-2.844.7-.462-2.27-1.389-.769.463-.802 1.29-.902.958-3.913 1.223-1.138-.727-1.54 2.083-2.612v-1.776l2.149-1.408-.397-3.22.893-.738-.166-2.955-1.124-1.277-2.446.807-.695.907-2.413-.27.298-2.418-1.62.1-1.124-1.344-5.753-1.917-.132-1.446-1.62-2.12-.199-1.516 2.249-4.043-.992-3.406.925-2.33 2.91 2.228 3.339-.64.727 1.248 2.281-.236.86-3.24 1.322-.237 1.885-2.23 2.512 1.014 2.58-1.622 4.132-.845 1.223 2.906 5.653 1.216 1.091 1.182 2.943 1.35 1.818-1.722 3.075.945 1.421 1.957 2.38-.64 2.48.674-.264 1.315 2.876.81z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '36': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M271.5 210.42l1.455.78 2.248.068 3.802 2.883 1.388.644-1.587 2.847-1.95-1.017-4.496.61-.033 2.371-2.844.44-2.843 1.896-.43 1.387 2.116 1.048.397 2.063-3.273 3.108 1.984 1.52-.1 1.519-1.487 1.113-2.282-.37-2.876 1.349-.132 1.214-1.884 2.595-1.455-1.988-2.876-.81.264-1.315-2.48-.675-2.38.641-1.421-1.957-3.075-.945-1.818 1.721-2.943-1.35-1.09-1.181-5.654-1.216-1.223-2.906.198-2.704-2.314-4.535 4.926-6.677 1.322.068 2.81-1.255.76-1.426 2.348-.237-.793-5.979 1.818 1.088-.1 2.208 3.108 3.192 2.348-2.071 1.256 1.935 3.471 1.968 2.05-1.425 1.653-3.09 4.364 3.735 2.48 2.51 3.702-.203.662-1.56z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '37': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M287.336 216.829l1.984-.644 4.1.203 1.817 2.44 3.306 2.538 2.91.44 3.24-2.538 4.33.372 1.125 3.182 2.975 5.882 1.52 1.925 2.414 1.114 3.406 2.362-1.323 1.855 1.058 2.023 1.322-.91 2.81 2.056.1 1.65 3.372 3.972 1.355.572 2.711-1.649 3.24-.303 2.05 2.221 2.942.034 2.546 1.412-3.008 3.328h-2.017l-.794 3.66.695 1.712-1.918.167-3.372 3.12-6.248 2.747-3.108-.402-1.025-1.675-3.637-.37-2.28.537-.827-1.575-5.554.234-.662 2.615-2.545 2.612-2.414-.268-3.008.369-1.29-1.24.331-1.775-1.058-1.106 2.612-3.89.463-1.476-1.058-2.182 2.843-1.68-.132-1.78-1.091-1.749-1.686-.706-.364-2.995-1.62-1.346-2.017-.505-2.215-3.773-3.24-1.618-1.983-.304-1.422-3.036-.826 1.653h-2.976l-1.587-2.733-.892 1.316-4.034 3.508-1.256.101-.43 3.37-3.306-.033-.86 2.323-2.082-.673-2.546 1.044-.992 1.548h-.562l-.132-.168-1.256-.505-1.257 1.682-.43.875-4.231.37-1.455-.841 3.24-3.399.893-1.482-2.347-2.156 1.884-2.595.132-1.214 2.876-1.35 2.282.371 1.487-1.113.1-1.52-1.984-1.519 3.273-3.108-.397-2.063-2.116-1.048.43-1.387 2.843-1.896 2.844-.44.033-2.37 4.496-.61 1.95 1.016 1.587-2.847 1.984 1.22z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '38': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M161.21 295.962l-.595 3.85 1.356 2.754-.463 1.823 7.174 3.91.562 2.912.86 1.554-.596 1.687.43 2.445-.562 6.24 2.843.89-.793 1.946-2.182 1.022-2.678 2.174.298 1.45-2.315.032-4.562-1.515-2.215.89-2.017 2.238-.76 2.04-3.24.066-2.215 1.447-1.653-.986h-1.95l-2.844 2.827-3.471-1.348-1.752-2.861 4.033-1.975.76-.955 1.984.066-.33-4.019.826-1.088 1.62-.461 1.884.791 2.976-1.055-.397-7.46 1.091.067 3.372-2.908-.33-1.587-2.05-1.026.496-2.25-3.042-2.053-3.107.994-3.736-.199-2.48-.894-.727.662-2.447-1.39-2.71 1.026-1.984-.232-5.125-2.65-.66-3.017-1.026-2.023-4.165-1.56.595-5.747v-5.089l-.397-2.664 4.595-3.698-.297-1.4 4.132.133 2.15-2.102 2.843-.8 3.47 2.668 3.24-1.5 2.381 1.167 1.521 2.6 1.389.9.43 2.565-.43 1.798-1.72.7.199 2.195-1.223 3.923 2.248 1.728-.133 5.344 3.868-.066 1.554 1.061 2.447-4.413 2.116.1z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '39': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M145.143 325.478l-4.298-.362-1.686-1.22-.165-2.079 1.19-1.22-.066-3.27 1.686-.991-1.323-1.29.96-1.62 2.082.2-2.149-2.845-.661-2.682.727-.662 2.48.894 3.736.199 3.107-.994 3.042 2.053-.496 2.25 2.05 1.026.33 1.587-3.372 2.908-1.091-.066.397 7.46-2.976 1.054-1.884-.791z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '40': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M216.851 272.344l1.389.768.462 2.271 2.844-.7 1.19.8 3.174-.233v2.036l1.62.367-.364 1.968 1.686 1.734-.198 2.766-1.124.466-2.744-1.5-1.224 1.567-5.256 1.93.066 2.031 1.322 1.73-5.025 1.197-2.149 1.662 1.29 2.16-.1 1.594 1.389 4.48 2.942-.464 1.686.464-2.71 3.183 1.19 1.79 3.24-2.088.595.166 1.322 3.677-1.157 2.615-.265 3.472 2.15 2.017-.728 1.52-2.281.726-1.389 2.575-1.554-.396-.86 1.188-1.52-.759-6.314 3.233-1.521.231 1.95 3.659-.33 2.042-1.587 1.876-.53-3.26-2.148.132-2.976-1.416-1.95 1.416-.298-4.086-1.454-1.484 1.95.956 1.488-1.055.198-2.21 1.124-.66-2.182-1.982-3.306-1.288-.529-1.388 1.356-.76.562-3.472 1.62-1.754 3.108-.828 1.85-3.842.365-2.187-1.62-1.924.462-1.293 1.852-1.693-2.281-2.025-2.348-.2-2.975 3.851-.165-1.991-1.389-.332-1.719-2.425.86-2.791-1.091-2.893-2.017-1.398-1.554-2.064.661-1.798 2.38-.167 3.34-2.333 1.818-.7-.198-4.57 5.157-1.035 2.678-.233 2.744-.935 2.612-.268 1.752-2.405z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '41': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M247.663 309.82h0-.132l-.264-.065-.133-.067-.33.43-1.025-.794-.198-1.82-3.009.993-3.736-3.213-2.81-.1-3.273-.066.397-2.022 1.388-1.127 6.844.398.628-2.123 2.513.299.463 1.293 3.306 1.625-.133 1.757.662 3.345-1.389.86z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '42': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M247.663 309.82l.033.067.166 1.688-1.025 1.852-1.62-.132-2.05-1.654-1.19.694-2.215-.959-2.91 1.456.034-3.011-1.885-.695.232-2.583.793-1.359 2.81.1 3.736 3.213 3.009-.994.198 1.821 1.025.795.33-.43.133.066.264.066h.132z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '43': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M239.894 283.321l1.885.8 3.438 3.096 2.612-.898.925.865 3.935.5.991 2.561-.991 1.098 6.281 2.227-1.223 1.694.264 2.458 2.116 2.854-1.025 3.15-1.917.497-3.57-1.79-2.117-.331-1.256 1.16-1.95.199-3.306-1.625-.463-1.293-2.513-.299-.628 2.123-6.844-.398-1.388 1.127-.397 2.022-.463-.861-5.19-.763-1.323 2.552-2.413 2.12-1.322-3.677-.596-.166-3.24 2.087-1.19-1.789 2.711-3.183-1.686-.464-2.942.464-1.389-4.48.1-1.594-1.29-2.16 2.15-1.662 5.024-1.197-1.322-1.73-.066-2.03 5.256-1.931 1.224-1.566 2.744 1.499 1.124-.466.198-2.766.264-1.034 2.513-.533.827 2.733 2.28 1.233.265 2.298 1.686.8 1.554-.3.595-2.865z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '44': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M300.924 263.849l-2.248.167-2.414 2.811.133 2.175-3.538 1.27-1.388 1.504-1.852-.635-4.397-5.317-1.752-.168-3.604 2.108-.826-.602-2.48 3.678.232 1.504-2.083 2.672.264 2.503 1.95 4.07-1.42 2.265 1.818 2.032-.794 2.263-2.38 2.13-.992 1.961-2.678 1.164-.86 1.528-.33 2.026-3.604-2.092-1.322-.166-2.017 1.362-2.182-1.13-1.19-1.362-6.281-2.227.991-1.098-.991-2.562-3.935-.499-.925-.865-2.612.898-3.438-3.096-1.885-.8.595-1.166-.892-2.267.463-1.902 1.289-1.668-.53-1.536 4.398-1.269-.496-4.244.529-3.445 1.422-.971-.96-2.947 2.811-1.608 2.975-.067.662 1.575 1.322.368 4.893-3.25 4.794-.973.33-1.844 3.306.838.1-4.631-1.025-3.292-2.579.033-.132-1.243 2.28-.169 1.191-2.084-.43-1.447.992-1.548 2.546-1.044 2.083.673.86-2.323 3.305.033.43-3.37 1.256-.1 4.034-3.509.892-1.316 1.587 2.733h2.976l.826-1.653 1.422 3.036 1.983.304 3.24 1.618 2.215 3.773 2.017.505 1.62 1.346.364 2.995 1.686.706 1.09 1.748.133 1.781-2.843 1.68 1.058 2.182-.463 1.476-2.612 3.89 1.058 1.106-.33 1.776z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '45': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M296.395 269.002l-.199.802 1.984 3.576.264 3.005 1.554-.3.463 1.568 2.48 3.368 1.388 2.8-2.48.633-1.454 1.065-6.877 1.2-.43 2.395 1.422 1.697.1 1.562-1.786 1.762-1.091 2.491-1.72 1.627 1.687 1.029-1.52 1.692 1.355 5.966-2.612-.695-.794 3.741-1.058-.695-3.107.662-3.207-.596.529 2.78-3.372-.893.165 5.521.463 1.057-.33 3.236-3.075 1.683-1.488 2.375-3.471.099-1.455-.726-.496-1.946-2.48-2.244-2.347.363-.959-.891-3.306.528-4.694-.066.066-2.477 1.587-.528.33-1.784 2.414-1.753.297-3.274 2.315.132 1.256-1.953-.959-3.113 2.711-.2 1.223-2.684 4.331-1.79.496-2.49-.959-.896.067-2.49.86-1.53 2.677-1.163.992-1.961 2.38-2.13.794-2.263-1.819-2.032 1.422-2.266-1.95-4.069-.265-2.503 2.083-2.672-.232-1.504 2.48-3.678.826.602 3.604-2.108 1.752.168 4.397 5.317 1.852.635 1.388-1.504z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '46': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M235.1 380.811l-1.256-1.886.496-.944 2.116 1.432zm-.991-51.642l.826 1.35 2.15.922-1.753 2.83-.33 6.771-.662 1.412 2.942 2.494 1.323-2.067 2.975-.296.794 1.313 2.48 2.133-.034.689 3.868 2.622-3.57 1.77-1.455.13-1.058 1.802-3.603-1.507-1.753 1.9-.231 1.833-2.017 1.145.364 1.504-.893 1.145.595 3.366 5.951-.49-1.157 3.918-1.719.653.364 1.99 1.851.033 1.157 3.065-1.223 1.205-.562 2.606-2.546 2.8-2.645-2.377-.066-1.302-1.487-.554-2.447.358-1.09-1.27-1.224 1.205-1.455-.423-.198-2.346-2.91.619-3.206.326-.166-1.662 1.224-3.457-.364-2.285-1.091-1.208 3.405-4.084.033-5.953-1.686.033-2.413-.819-1.025-1.375-.199-2.49-1.421-1.312-2.38-.852.297-2.624-.86-1.346-2.479.295-1.19.887-1.124-1.773 1.256-2.528-1.355-2.596.958-2.598-1.917-2.534 1.587-1.876.33-2.042-1.95-3.659 1.52-.23 6.315-3.234 1.52.76.86-1.189 1.554.396 1.389-2.575 2.281-.727.727-1.52.86 1.686 1.851 1.684 1.058 2.244-1.09 4.123 1.85.494 1.852-.362z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '47': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M269.616 294.932l-.067 2.491.96.896-.497 2.49-4.33 1.79-1.224 2.685-2.71.199.958 3.113-1.256 1.953-2.315-.132-.297 3.274-2.414 1.753-2.016-.562-4.662.859-.76 1.685-1.488-.793-4.463 1.718 1.455 2.047-.86 3.663-1.554 1.384-1.388-.494-1.19-1.946-2.315.924 1.686 1.484.199 1.384-2.645 2.273-2.314.1-3.637-3.032-1.851.362-1.852-.494 1.091-4.123-1.058-2.244-1.851-1.684-.86-1.685-2.149-2.017.265-3.472 1.157-2.615 2.413-2.12 1.323-2.552 5.19.763.463.861 3.273.066-.793 1.359-.232 2.583 1.885.695-.033 3.01 2.909-1.455 2.215.96 1.19-.695 2.05 1.654 1.62.132 1.025-1.852-.166-1.688-.264-.463 1.389-.861-.662-3.345.133-1.757 1.95-.199 1.256-1.16 2.116.331 3.57 1.79 1.918-.497 1.025-3.15-2.116-2.854-.264-2.458 1.223-1.694 1.19 1.362 2.182 1.13 2.017-1.362 1.322.166 3.604 2.092z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '48': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M256.424 315.444l-.33 1.784-1.587.528-.066 2.477 4.694.066 3.306-.528.96.891 2.346-.363 2.48 2.244.496 1.946-2.513.297-1.157 1.154-.562 2.274-.066 4.544.926.69.363 2.172-.562 1.282.662 3.385-.76 4.628-5.687-.426-1.223 2.952-1.753-1.837-2.149.755 1.091 2.426-2.512 1.376-1.356-1.409-2.777.59-3.868-2.622.033-.69-2.48-2.132-.793-1.313-2.975.296-1.323 2.067-2.942-2.494.661-1.412.33-6.77 1.753-2.83-2.149-.923-.826-1.35 2.314-.099 2.645-2.273-.199-1.384-1.686-1.484 2.314-.924 1.19 1.946 1.39.494 1.553-1.384.86-3.663-1.455-2.047 4.463-1.718 1.488.793.76-1.685 4.662-.86z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '49': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M298.709 336.64l-5.356-.198-3.108.756-.496 2.366-4.264.986-1.554 3.02-3.24-1.641-.893 1.444-2.347.657-2.017-.394-1.752 1.148 2.446 3.247-1.289 1.18-5.157.656v-.885l2.149-1.672-.926-1.542-2.149-.328-2.678 1.739-.727 4.555.363 3.176-2.644 1.112-2.612-.49.595-3.176-1.091-1.015.43-1.671-2.248-2.23 1.223-2.951 5.686.426.76-4.628-.66-3.385.561-1.282-.363-2.171-.926-.691.066-4.544.562-2.274 1.157-1.154 2.513-.297 1.455.726 3.47-.1 1.489-2.374 3.074-1.683.53 1.617 2.512-.462 1.124 1.98 3.835-1.55 1.256-1.717-.264-2.608 1.124-.43 1.653-3.502 4-.728.926.926.43 4.262 2.38 3.565h1.686l1.785 2.87 2.15-.528.23 1.55-1.156 3.196-4.1 4.772z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '50': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M288.13 309.986l1.024 1.953-.76.959 1.587 1.488-1.653 3.503-1.124.429.264 2.608-1.256 1.716-3.835 1.55-1.124-1.979-2.513.462-.529-1.617.33-3.236-.462-1.057-.165-5.521 3.372.893-.53-2.78 3.208.596 3.107-.662z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '51': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M310.148 296.194l-1.852-.431-1.719.83-.562 2.822 1.488 2.19 2.48 2.519.727 1.524 2.545 1.392.265 1.688-1.785 1.126-2.414.33 1.852 2.482-.794 2.083.893 1.917 1.29.231 1.388 4.392-3.108 1.221-.364 2.078 2.15.825.396 1.714-.794 1.515-3.835 2.8-.694 4.408-4.827-.197-.958.592-3.207.394-.397-2.368 4.1-4.772 1.157-3.196-.232-1.55-2.149.528-1.785-2.87h-1.686l-2.38-3.565-.43-4.262-.926-.926-4 .728-1.587-1.488.76-.96-1.025-1.952.794-3.741 2.612.695-1.356-5.966 1.52-1.692-1.685-1.029 1.719-1.627 1.091-2.491 1.785-1.762-.099-1.562-1.422-1.697.43-2.396 6.877-1.199 1.455-1.065 2.479-.633 1.52 1.965 1.852-1.332.628 1.731-1.983 1.631-.1 1.964 1.224 2.959z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '52': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M293.22 372.87l-3.438 1.856-.033 3.288 1.521.52-.529 1.757-2.446-1.854-1.058.52-1.554-3.287-2.413-.879-.926 1.66-1.455-.553-.066-1.954-3.868-.749-3.835-2.803-1.422.033-.462 2.02-1.819 2.086-2.942-.815-4.364-.716-.794 2.182-1.09-.554-2.05.977-1.554-.586-2.083.489-2.248-.489-.43 1.075-2.017.228-1.454-.717-3.174-.13-1.356 1.205-1.553-.977-2.58-.293.563-2.606 1.223-1.205-1.157-3.065-1.851-.033-.364-1.99 1.72-.653 1.156-3.918-5.95.49-.596-3.366.893-1.145-.364-1.504 2.017-1.145.231-1.833 1.753-1.9 3.603 1.507 1.058-1.801 1.455-.131 3.57-1.77 2.777-.59 1.356 1.41 2.512-1.377-1.09-2.426 2.148-.755 1.753 1.837 2.248 2.229-.43 1.67 1.09 1.016-.594 3.175 2.612.491 2.644-1.112-.363-3.176.727-4.555 2.678-1.739 2.149.328.926 1.542-2.15 1.672v.885l5.158-.656 1.29-1.18-2.447-3.247 1.752-1.148 2.017.394 2.347-.657.893-1.444 3.24 1.641 1.554-3.02 1.388 1.937 3.372 2.592-1.884 1.28v1.606l1.95 1.279.033 1.605-2.644 3.111-1.488 3.829 1.025 3.89 1.983 1.045.728 2.775 1.421 1.273.133 3.881z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '53': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M287.237 378.958l-1.819 1.463-2.777.033-.793-1.431-3.835-1.725-2.678.293.066 2.31-1.983 3.836-1.852.39-.529 1.884-3.008.91-3.009.259-.892 3.05-1.224-.064-1.917 1.492-2.083-.325-.827 1.2-2.942-.032-1.322 2.01-1.157.226-2.083 1.782.165-1.555-1.389-2.496-3.074 1.718-2.579-.777-.694 1.88-4.926 2.461 2.413 3.722 1.257 1.1-1.984 1.002-1.29-.776-5.62-1.94-2.149-1.23-.991-1.943 1.553-3.434 1.422-.194 2.182-1.362-.893-2.27.86-1.947-3.14-4.449 1.586-.844.397-1.366 1.421-1.008 1.356-1.398.727-1.204 2.546-2.799 2.579.293 1.553.977 1.356-1.205 3.174.13 1.454.717 2.017-.228.43-1.075 2.248.489 2.083-.489 1.554.586 2.05-.977 1.09.554.794-2.182 4.364.716 2.942.815 1.819-2.085.462-2.02 1.422-.034 3.835 2.803 3.868.75.066 1.953 1.455.554.926-1.66 2.413.878z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '54': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M183.36 243.708l4.001-.067 3.736-3.906.793-1.348.033-.033v-.135h.034l2.578-.068 1.356-1.719 2.612 2.326-1.356 1.449.265 4.981.86.841-3.538 3.295-1.72-1.143-3.67.068-2.512-2.051-2.347.874-1.025-.84-.066-2.457z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '55': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M191.923 238.219v.135l-.033.033-.793 1.348-3.736 3.906-4 .067v-.168l-1.984-1.178-.892-2.897-1.62-2.257-.76-2.496-1.951-.404-4.1-2.43-1.058-2.431 1.95.068 1.82 1.722 1.355-.878.76 3.004 1.984-1.249 1.95 2.025 1.885-.641 1.719.27 2.314 1.889 3.24-.338zm-20.53-31.432l1.223-2.685 2.215-2.21.232-.578-2.777-3.404-1.422-2.997 2.05-.545 4.066 1.227 1.62-1.125.794.954-.76 1.67 1.09 2.586-.231 2.212.595 1.36-2.447 2.447-2.016-.306z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '56': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M383.112 221.062l3.405 1.455.298 2.063 1.62.474.959 2.298 3.14-1.115h2.612l2.777 1.318 3.604-.507.33 2.196 2.844.71 1.917-.237-.992 2.262 2.248 1.114 3.174-.877 2.215 1.586 1.356-1.215 4-.473-.76 1.89 1.289 1.18 1.19.844-.86 2.393-1.52-.303-1.422 2.627 1.918 2.896 2.91.1-.1 3.667.529.706-1.422 2.319 2.248 1.88.496 2.049-.562 3.522-1.587 1.04.364 2.547-.496 1.172-2.215.301.661 1.675-.396 2.376-2.315 1.237-.892 1.17-.033 4.245-2.711 1.603-.033 1.635 2.876-.9 2.182-.101 1.554 2.536-1.753.3-1.223 2.401-1.818.7 1.52 1.467 3.803.433.363 1.932-2.182-.267-3.107.5-.33 3.461-1.885 1.796-3.703-.565-.43 2.726-1.488 2.625-1.256-.698-1.884-3.356-1.224-.532-6.347 2.094-2.15-1.03-1.983.1-1.223-1.83-1.62.566-2.843-.1-1.091-3.36 2.38.233-.926-4.595.496-.933-1.587-1.467-2.082.367-1.257-1-4.661.433-.86-3.302-1.058-1.969 1.025-1.436-.926-1.87.926-2.507 1.918-1.572-.794-1.438-.628-3.682-1.653-.703-3.802.268-.694-.905-2.017-.067-1.256-1.072-3.042.067-1.355 1.039-1.918-1.14-2.71-.435-1.323-1.375-1.72-.067-1.09-1.039 1.322-1.778-.959-1.61-2.38-.336-1.09-1.712-1.918-.773-1.587.94-1.091-.84-.364-1.948-1.752.27-1.058-.841.893-1.68-2.414-.27-2.546-1.412-2.942-.034-2.05-2.22-3.24.302-2.71 1.649-1.356-.572-3.372-3.972-.1-1.65 7.076.943-.133-1.651 1.753-.977h1.983l1.356 1.044 2.81.337 1.157-1.247.694-2.933-.661-2.16.33-1.721 5.456-2.803 5.95 1.452 3.306-.101-.892-2.331 2.579.439 1.818-2.163 3.405-.102 1.058-2.333 1.29.473 1.454-.947-.364-2.64 2.248-1.524 4.232.068 1.885.88 1.256-1.389 2.116-.372.86 2.303 1.454.846 2.149-.304z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '57': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M497.865 220.012l-.298 1.93.794 3.01 1.554 1.522-3.968 5.337-.628 2.733 1.19 2.664-1.19 5.827-1.553 3.028-5.654 4.874-1.421.47-3.637 2.451-.265.873.992 5.165-1.752-.704-2.876.402-1.356 4.054-1.487.67-1.19-.704-1.158 1.072-.198 1.606-1.885.067-.991 2.743-3.273.635-.133 2.64-3.405 1.303-3.438.902 1.223 1.636-2.017 1.568-1.95.5-3.703-1.134-1.29-2.236-2.016-.668-2.05 1.67-.43-2.138-2.644 1.07 2.215 4.404-1.587.9-1.554.967-1.455 2.467-1.421-1.167.33-5.57 1.091-2.302-.991-4.143.86-2.174 4-.87.793-3.446-1.323-.134-1.289-2.948.794-1.307-.166-1.743-3.372.804-.595-2.582 3.108-2.55 1.454.234 1.653-1.074-1.52-3.124-1.852-1.21-2.512-.269.462-2.555-1.388-.673-1.818-2.827-1.984-1.92-1.851-2.56 1.421-3.407-1.62-.877-.529-1.518-1.52-.27-.298-2.432.628-2.77 2.48-1.691 2.182.676 1.289-.406 1.554 3.245 1.95-2.873.827-2.401 2.546.71 1.19-2.402.925-.17-.396-2.98 1.487-1.083 1.653-4.068 2.844-.136.86-3.495 4.132-3.26 4.33.577 1.819-2.107-2.711-1.36-.1-1.632 1.224-1.43 1.29 2.654 3.173 1.292-.198 2.82 2.347 1.63-.86 2.207 5.423-.271 2.48.509.297 1.493 2.975-.814.926-1.8 2.71 1.562 1.819.136 1.124-1.018.992 4.172-1.058 2.847-2.281 2.946-3.736 3.756-.86 2.232 3.406-.575 2.81 1.217 3.008-.44-.198-1.588 1.719-.677 1.29-2.605 1.785.203z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '58': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M433.298 228.974l.297 2.431 1.521.27.53 1.52 1.62.876-1.422 3.406 1.851 2.561 1.984 1.92 1.818 2.827 1.388.673-.462 2.555 2.512.27 1.852 1.21 1.52 3.123-1.653 1.074-1.454-.235-3.108 2.551.595 2.582 3.372-.804.166 1.743-.794 1.307 1.29 2.948 1.322.134-.794 3.447-4 .87-.86 2.173.992 4.143-1.09 2.303-.331 5.57-1.72 2.032-.032.033-1.653.266-3.009-1.699-.992 1.3-2.413-.1-1.025 2.164.86 1.532-2.943-1.032-.628 2.363-1.223 1.496-.728 3.557 1.422-.232.595 1.627-1.785.964-1.29-.266-.132 2.158-1.488.796-2.181-1.792-.992-2.358-3.637.266-1.554 2.723-2.975 1.36-2.48-1.294-1.388.963-1.653-.233-.893-3.785 1.256.698 1.488-2.625.43-2.726 3.703.565 1.884-1.796.33-3.461 3.108-.5 2.182.267-.363-1.932-3.802-.433-1.521-1.467 1.818-.7 1.223-2.4 1.753-.3-1.554-2.537-2.182.1-2.876.901.033-1.635 2.71-1.603.034-4.244.892-1.17 2.315-1.238.396-2.376-.66-1.675 2.214-.301.496-1.172-.364-2.547 1.587-1.04.562-3.522-.496-2.048-2.248-1.881 1.422-2.319-.53-.706.1-3.666-2.91-.101-1.917-2.896 1.422-2.627 1.52.303.86-2.393-1.19-.843 1.95-.979 1.224-1.923 3.537-1.722-.198-1.89 1.653-.17 1.058-1.25h1.554l1.223 2.669 1.488.506z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '59': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M483.781 259.896l.1 1.776-1.951 2.913.364 1.44 4.826 1.037 3.472 3.945 3.967 2.105 6.546 8.443 6.91 4.297.958 2.164 1.422 1.63-1.157 1.065-.728 2.66 1.455 3.554-2.975 4.314-1.786 1.095-.595 3.05-3.173-.266-2.546.365-.397 1.789-2.942-1.193-1.124 1.193-1.885-.73.661-1.888-2.545-.563-.33-4.81-2.546-2.522-2.249-.764-.33 2.192-.827.73-3.868.299-1.322-1.56-2.513.863-1.157 2.19-1.058-1.693-2.05-1.029-2.81.233-1.124 1.526-2.975 1.56-3.372-.597.264-1.859h-1.554l.033-1.693-2.744-1.527-1.355 2.59-1.455-.465-1.421.863-.199-.066.265-.399-.133-.066.067-.465 1.024-2.823-.793-2.791-1.851-.532-.992-2.262-1.124-1.298-2.15-.4-.495-1.164.76-3.664-1.884-2.534 1.587-.9-2.215-4.405 2.645-1.069.43 2.137 2.05-1.669 2.016.668 1.29 2.236 3.702 1.135 1.95-.5 2.017-1.57-1.223-1.635 3.438-.902 3.405-1.303.133-2.64 3.273-.635.991-2.743 1.885-.067.198-1.606 1.157-1.072 1.19.703 1.488-.67 1.356-4.053 2.876-.402z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '60': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M406.023 295.231l.893 3.785 1.653.233 1.388-.963 2.48 1.295-.695.995-.198 3.813-2.083-.596-.264 3.048.892 1.39.397 3.608-.496 1.82 4.331.628 1.223 1.751 3.207-2.611 2.182 1.422 1.488 3.073 1.488 1.222.099 1.386 1.587.165-.992 2.541-4.728 3.825-2.48.922 2.315 4.479 3.306 1.151 3.802-.329 2.876 4.999 1.356.591 1.52 3.12-3.074 2.954-1.554-1.181-1.355.46.363 1.804-1.719.262-.694 3.016.132 2.883-2.512.295.33-2.653-3.339-.328-1.355-2.754h-5.918l-.496-2.92-2.744.46-.992-1.28-2.48-1.05-3.24-2.102-1.52 1.576-2.314 1.182-3.505-.328-.165-1.61-2.083-.557-.992-2.169-1.09-.132-1.455 1.578-3.24-2.53-.893-.1-1.686-2.071-.827-2.139-2.05-.954-.76-2.602-.86-.428-1.62-3.196 2.315-3.893 1.587-.792-1.52-1.849-.563-2.411.628-2.016 2.513-4.499-1.356-1.754 1.091-3.08-.562-2.288 1.786-3.715-1.488-2.855-1.488.797-.826-2.857-1.124-.432-.827 2.093-2.744-.531.959-2.36-2.513.3 1.653-4.823-.066-3.961 1.752.666 1.488-1 .463-3.299 4.661-.433 1.257 1 2.082-.367 1.587 1.467-.496.933.926 4.595-2.38-.233 1.09 3.36 2.844.1 1.62-.565 1.223 1.828 1.984-.1 2.149 1.031 6.347-2.094 1.224.532z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '61': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M428.471 295.73l-2.017 2.523.133 2.92.198.199-.033.066-1.785 2.42 1.917 1.36 3.868-1.658 2.777-.497.232 1.426 2.578-.83.86 1.36-.33 1.59-1.951 2.45-1.058.365.132 2.018 2.38-.992 2.91 1.224-.298 1.39 1.157 1.652 1.389.496-1.587 2.644-3.537.594-3.009-2.081-2.215.033-2.281 2.477-2.38-1.057-.926 2.873-1.587-.165-.1-1.386-1.487-1.222-1.488-3.073-2.182-1.422-3.207 2.611-1.223-1.751-4.33-.629.495-1.819-.397-3.607-.892-1.391.264-3.048 2.083.596.198-3.813.695-.995 2.975-1.361 1.554-2.723 3.637-.266.992 2.358 2.181 1.792 1.488-.796.132-2.158 1.29.266z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '62': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M448.407 304.82l.165-.033.959 1.126 3.14-.463 1.95 1.126.993 1.49 2.975-1.126 1.554 1.027 1.389 1.986-.992 1.886 2.38.033 3.372 1.687.893 2.645-1.72 2.873 1.753 4.852 1.884.857-1.917 1.385.86 2.076v2.075l3.735-1.746 1.587.132.992 1.35 6.943 3.062.925 3.157 3.604-.526 1.422 1.414 2.777.855 3.339-3.255 1.29-.33 2.578 1.71.264 2.27 2.215.163.43 1.085-3.339.525-1.29.723 1.29 5.809h-4.033l-3.736 2.426-1.587.36-.463 3.112-2.281 1.08-2.149-1.276-2.017-.197-.991 1.048-.728 1.735-2.81.294-1.488 2.683v1.994l-3.636.948-.033-2.484-2.215-.098.462-1.538-2.016-1.472-1.786 5.788.496 2.875-2.644.62v-1.763l-2.943-.458-1.851 1.666-1.918-.555-2.876.555-1.653-1.34-1.62.915-1.19-1.47-1.157-2.646-3.538-.883-4.86-2.748-5.884.916-1.091-1.374-1.422-3.47-2.215-.655-.628 2.161-1.025-2.03-2.612.753-.132-2.883.694-3.016 1.72-.262-.364-1.805 1.355-.459 1.554 1.181 3.075-2.954-1.521-3.12-1.356-.591-2.876-4.999-3.802.33-3.306-1.152-2.314-4.479 2.48-.922 4.727-3.825.992-2.54.926-2.874 2.38 1.057 2.281-2.477 2.215-.033 3.009 2.081 3.537-.594 1.587-2.644-1.389-.496-1.157-1.653.298-1.39-2.91-1.223-2.38.992-.132-2.018 1.058-.364 1.95-2.45.331-1.591 1.72-1.127 2.413 2.088 2.248.132-.496-2.087h.066l2.645-.862.661 2.12z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '63': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M504.61 305.383l.925 1.69.529 4.105 1.355 2.315-.528 1.52.925 1.224 5.39 1.619 1.321 1.783-.495 2.607-.96 1.683.96 1.418-1.455 2.834.397 2.931 3.041 2.172.959 1.612-.727 1.217-.265 2.761-1.322 1.938-3.075-.854-.562-1.412-3.339-.69-1.52 2.267-3.406.13-1.124-4.436-1.918 1.545v1.216l-2.215-.164-.264-2.268-2.579-1.71-1.29.329-3.338 3.255-2.777-.855-1.422-1.414-3.604.526-.925-3.157-6.943-3.062-.992-1.35-1.587-.132-3.736 1.746v-2.075l-.86-2.076 1.918-1.385-1.884-.857-1.752-4.852 1.719-2.873-.893-2.645-3.372-1.687-2.38-.033.992-1.886-1.389-1.986-1.554-1.027 2.943-6.298-4.761-2.422 1.355-2.59 2.744 1.527-.033 1.693h1.554l-.264 1.859 3.372.597 2.975-1.56 1.124-1.526 2.81-.233 2.05 1.03 1.058 1.692 1.157-2.19 2.513-.864 1.322 1.56 3.868-.298.827-.73.33-2.192 2.249.764 2.545 2.523.33 4.809 2.546.563-.66 1.889 1.884.729 1.124-1.193 2.942 1.193.397-1.79 2.546-.364z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '64': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M514.66 340.812l-.53 3.185.761 1.148-.959 1.968-.496 2.524-2.148 1.606-.166.917-3.405 3.208v1.668l.959 1.472 2.116.817.925 3.399-.363 1.371 1.884 2.873 2.48 1.761 1.19 2.544-.199 2.965.463 2.051-1.785 1.92-1.355.39-1.72 2.375-3.537.065-.595-1.919-1.62-.846-1.223 1.562-5.356.715-.165 1.203-3.406.098-2.644 3.087-.827-1.202-2.711-1.137-1.455.39-1.884-1.04-2.744-.13.033-1.691-.959-1.236 3.637-4.102-1.785-1.433-2.348.033-1.983-3.944.793-2.642 1.124-.229.364-1.795-1.752-.588-.595-1.306 1.322-3.987-1.322-2.452-1.356-.491.232-2.684.991-1.048 2.017.197 2.149 1.277 2.281-1.08.463-3.113 1.587-.36 3.736-2.426h4.033l-1.29-5.81 1.29-.722 3.34-.525-.43-1.085v-1.216l1.917-1.545 1.124 4.437 3.405-.131 1.521-2.268 3.34.69.561 1.413z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '65': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M484.145 381.82l-1.488-.196-.066 1.983-1.52-.065-1.059 3.768-.86.649-1.884-.714 1.323 3.05-1.091.552.099 1.816-2.281 2.042-.199 1.911-1.62-.162-.793-1.879-2.546 1.62-2.578-.259-1.521.454-5.323 1.36-3.108-.55-4.628-.13-.595-1.134-3.471-.227-.199-1.555-3.207-.875-4.132-3.178-1.653 1.232-2.579 1.006-3.075 2.69-2.116-.26-.396-.874-.926-2.724.595-1.881-1.09-1.071.131-1.591 1.19-2.079-1.256-4.225-2.48-1.171 1.158-1.855-2.248-2.376-1.488 1.172-2.38-3.713 5.72-3.488-.034-2.12 1.422-1.796-1.389-1.24-.397-1.96.76-.883.1-2.255-2.182-5.006 1.52-.164.629-2.16 2.215.654 1.422 3.47 1.09 1.374 5.885-.916 4.86 2.748 3.538.883 1.157 2.647 1.19 1.47 1.62-.915 1.653 1.339 2.876-.555 1.918.555 1.851-1.666 2.943.458v1.763l2.644-.62-.496-2.875 1.786-5.788 2.016 1.472-.462 1.538 2.215.098.033 2.484 3.636-.948v-1.994l1.488-2.683 2.81-.294.728-1.735-.232 2.684 1.356.49 1.322 2.453-1.322 3.987.595 1.306 1.752.588-.364 1.795-1.124.229-.793 2.642 1.983 3.944 2.348-.033 1.785 1.433-3.637 4.102.959 1.236z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '66': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M378.02 280.821l-.462 3.3-1.488.999-1.752-.666.066 3.961-1.653 4.823 2.513-.3-.959 2.36h-3.174l-1.818-2.592-1.62.864-4.992.964 1.322 1.893.926 2.855-.661 3.151-1.554 2.453-1.62.597.297 1.822-4.727 3.806-1.257-2.945.629-3.313-1.29-1.26-2.38 1.393-3.108-.995-.959-4.41-3.405-.498-2.843.53-1.355 4.412-6.381 2.087.264-1.889-3.835-2.055-3.405.53-4.364-1.16-4.893.365-4.1-3.285-.925-2.922-2.91.498-2.677-3.455-1.223-2.96.099-1.963 1.983-1.63-.628-1.732-1.851 1.332-1.521-1.965-1.388-2.8-2.48-3.368-.463-1.569-1.554.3-.264-3.004-1.984-3.576.199-.802-.133-2.175 2.414-2.811 2.248-.167 3.008-.369 2.414.268 2.545-2.612.662-2.615 5.554-.234.826 1.575 2.281-.536 3.637.369 1.025 1.675 3.108.402 6.248-2.748 3.372-3.119 1.918-.167-.695-1.712.794-3.66h2.017l3.008-3.328 2.414.27-.893 1.68 1.058.84 1.752-.269.364 1.949 1.09.84 1.588-.94 1.917.772 1.091 1.712 2.38.335.96 1.611-1.323 1.778 1.09 1.04 1.72.066 1.322 1.375 2.711.435 1.918 1.14 1.355-1.039 3.042-.067 1.256 1.072 2.017.067.694.905 3.802-.268 1.653.703.628 3.682.794 1.438-1.918 1.572-.926 2.507.926 1.87-1.025 1.436 1.058 1.97z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '67': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M374.285 295.298l2.744.531.827-2.093 1.124.432.826 2.857 1.488-.797 1.488 2.855-1.786 3.715.562 2.287-1.09 3.08 1.355 1.755-2.513 4.499-.628 2.016.562 2.411 1.52 1.85-1.586.791-2.314 3.893 1.62 3.196.86.428.76 2.602-3.472.132-1.95 2.336-2.513.658-3.24-.592-.959 1.644-1.355-.131-.827 1.775-2.843 1.315-1.454 1.774-2.678.23-.992-2.136-1.256-.328-.166-2.499-4.066-.888-1.52-2.994-1.753-1.317.463-2.569-.628-2.373-1.323-1.484-.727-3.695-2.05-.033.595 2.673-1.09 1.055-3.24 1.056-1.191 2.801-1.455 6.88 4.364-.23 1.29 1.644.066 2.696-1.29.197.1 4.466-5.19.59-1.522-1.674-3.603-2.068-.794 2.036-2.016.196-1.124 1.543 1.454 2.591-1.686 2.885-3.207-.459-1.785.46-1.587-1.574-3.339-1.869 1.058-1.443-1.322-.886-.199-3.086h-2.248l-1.488-1.018-1.487-2.268-5.158-1.775.694-4.409 3.835-2.799.794-1.515-.397-1.714-2.149-.825.364-2.078 3.108-1.22-1.389-4.393-1.29-.23-.892-1.918.794-2.083-1.852-2.481 2.414-.331 1.785-1.126-.265-1.688-2.545-1.392-.728-1.524-2.48-2.52-1.487-2.19.562-2.821 1.72-.83 1.85.431 2.91-.498.926 2.922 4.1 3.285 4.892-.365 4.364 1.16 3.405-.53 3.835 2.055-.264 1.89 6.38-2.088 1.356-4.411 2.843-.531 3.405.498.96 4.41 3.107.995 2.38-1.392 1.29 1.26-.629 3.312 1.257 2.945 4.727-3.806-.297-1.822 1.62-.597 1.554-2.453.66-3.151-.925-2.855-1.322-1.893 4.992-.964 1.62-.864 1.818 2.592z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '68': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M307.701 335.85l5.158 1.775 1.487 2.268 1.488 1.018h2.248l.199 3.086 1.322.886-1.058 1.443 3.34 1.869 1.586 1.573 1.785-.459 3.207.46-.694 1.244 1.29 1.54 1.52.654 1.157 2.259 3.604-1.113 1.025.851.33 4.252 1.488.098.727 2.026 2.15 1.503 2.611.49.959 4.113-1.29.815-.33-.913-3.174 1.468-1.554-.294-1.157-2.545-2.81.36-2.48-1.535-.33 2.742-3.009 1.402-.496 1.402-2.38.717-.992 1.369-2.083.26.562 2.867-1.653 1.692-3.107.326-.893 1.66-1.52-.782-.827-2.05-2.05-.032-2.347-2.41-2.348.228-2.446-.456-.86 1.172-1.62.391-1.52-1.856-2.116.782-.166-1.336-2.942-.88-3.471.62-1.72-2.217-.132-3.88-1.421-1.274-.728-2.775-1.983-1.046-1.025-3.89 1.488-3.828 2.644-3.11-.033-1.606-1.95-1.279v-1.606l1.884-1.28-3.372-2.592-1.388-1.937 4.264-.986.496-2.366 3.108-.756 5.356.197 3.207-.394.958-.592z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '69': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M358.813 340.747l-.364 2.068 4.595 5.675 2.678 2.622-1.124 1.277-1.587.426-1.62-1.212-3.603 2.39-.827 1.473-1.587-1.964-.066-1.113-2.38-.852-1.29 1.638-1.983-.393.562-3.243-3.405-2.524-.661 1.049-3.009-2.853-.198-1.542-.1-4.466 1.29-.197-.066-2.696-1.29-1.644-4.364.23 1.455-6.88 1.19-2.801 3.24-1.056 1.091-1.055-.595-2.673 2.05.033.727 3.695 1.323 1.484.628 2.373-.463 2.57 1.752 1.316 1.52 2.994 4.067.888.166 2.499 1.256.328z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '70': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M424.67 352.192l2.61-.753 1.026 2.03-1.521.164 2.182 5.006-.1 2.255-.76.882.397 1.96 1.389 1.241-1.422 1.795.033 2.12-5.72 3.489-1.52.912-.628-2.444-1.554-.391-.628 1.597-3.77.456-2.148-1.075-.33-1.598-3.67.946-1.091 1.597-3.042-1.206-1.587-.13-2.182 3.746-1.388-.684-2.414.196-.529-.977.199-2.705-3.174.586-2.347-1.923.066-1.794-2.38-.196-2.58.587-1.983 1.24-.066-3.197-1.19.228-1.653-4.931-.066-1.307-3.141.36-.595 2.385-4.695-2.157-1.19-.098-.165-2.223.793-1.34.628-3.96-1.653-.46.463-2.39 2.38-.328-.43-1.738 2.877-1.77.066-1.87 3.868-.722-.165-2.2 2.413-.46.959-1.707 1.917-.723.1-1.644 3.24 2.53 1.454-1.577 1.091.132.992 2.169 2.083.558.165 1.609 3.505.328 2.314-1.182 1.52-1.576 3.24 2.102 2.48 1.05.992 1.28 2.744-.46.496 2.92h5.918l1.355 2.754 3.34.328-.331 2.653z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '71': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M385.559 336.87l-.1 1.643-1.917.723-.959 1.708-2.413.46.165 2.199-3.868.722-.066 1.87-2.876 1.77.43 1.738-2.381.327-.463 2.392 1.653.458-.628 3.96-.793 1.341.165 2.223 1.19.098 4.695 2.157.595-2.386 3.14-.36.067 1.308 1.653 4.931 1.19-.228.066 3.197 1.984-1.24 2.578-.587 2.38.196-.065 1.794 2.347 1.923 3.174-.586-.199 2.705.53.977-.298.944-2.248.814-5.885.619-.1 1.497-2.247-.39-3.604.813-1.455 1.496-3.306-.032-.099 1.203-1.785 1.43-1.653-1.658-.265-2.765-6.513-.293-.099-2.44-.86-.782.596-2.02-2.248-.26-2.38.358-2.348-.521-3.108-2.25-.396 1.696-1.422-.359-1.356 1.401-2.38-.75-.595 1.988-1.422-.032-.76-1.369-5.587-1.76.33-2.38 1.29-.815-.959-4.113-2.612-.49-2.149-1.503-.727-2.026-1.488-.098-.33-4.252-1.025-.85-3.604 1.112-1.157-2.259-1.52-.654-1.29-1.54.694-1.245 1.686-2.885-1.454-2.591 1.124-1.543 2.016-.196.794-2.036 3.603 2.068 1.521 1.674 5.19-.59.199 1.542 3.009 2.853.66-1.05 3.406 2.525-.562 3.243 1.984.393 1.289-1.638 2.38.852.066 1.113 1.587 1.964.827-1.473 3.603-2.39 1.62 1.212 1.587-.426 1.124-1.277-2.678-2.622-4.595-5.675.364-2.068 2.678-.23 1.454-1.774 2.843-1.315.827-1.775 1.355.131.96-1.644 3.24.592 2.512-.658 1.95-2.336 3.472-.132 2.05.954.826 2.139 1.686 2.072z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '72': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M375.806 382.697l-.298 2.047.53 2.046-3.01 1.948.464 2.693.892 1.978-4.165-.487-3.571-.81-.826 1.297-3.604.259-1.223-2.789-.893-2.27-2.347-.91.396-1.493-1.19-2.014 2.38-2.6-.958-1.17 1.09-3.189v-1.856l1.422-1.01 2.58.033 1.289-1.922 2.248.261-.595 2.02.86.781.098 2.441 6.513.293.265 2.765z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '73': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M374.384 393.409l1.124 6.866-1.322.42-.827 1.553.794 1.456.264 3.135.86.065.628 3.907-.397 2.452.132 3.805 2.38.805-.991 1.998 3.504 1.674-1.454 2.188.198 1.448 1.389 1.061.264 1.64-2.876 3.79.1 1.734-.827 1.092-1.587-1.188-.86-1.67-1.322 1.124-3.901-1.156-3.67.643-2.248-3.984-5.059-3.633-4.661.772-2.81-.868-3.108-2.671-1.884-2.093-2.348.58-2.678-1.289-1.421 1.482h-3.34l-1.222-.934-.662-2.964 1.157-.13-.099-3.707-2.149-1.937-1.289.775-2.215-2.195.992-1.518 1.487.42 3.373-4.783 1.388 1.294 1.554-.55 1.29 1.034.925-1.81 2.116-1.779 5.157 4.365 3.174-1.422 1.72 1.26v1.81l4.727.42-.76-2.326-2.017-.291-.232-1.293 1.323-1.65.231-2.296 2.91-1.1 1.785 1.197 1.355 3.105 1.753-.485.86-3.138h1.222l.53-2.72-1.323-1.684-3.372.875-1.72 1.878-.66-4.146 1.256-3.243 1.223 2.789 3.604-.26.826-1.296 3.57.81z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '74': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M343.34 368.501l-.33 2.38 5.587 1.76.76 1.369 1.422.032.595-1.987 2.38.75 1.356-1.402 1.422.359.396-1.696 3.108 2.25 2.347.52 2.38-.358-1.289 1.922-2.579-.032-1.421 1.01v1.855l-1.091 3.188.959 1.17-2.38 2.6 1.19 2.015-.397 1.493 2.347.91.893 2.27-1.257 3.243.662 4.146 1.719-1.878 3.372-.875 1.322 1.684-.529 2.72h-1.223l-.86 3.138-1.752.485-1.355-3.105-1.785-1.198-2.91 1.1-.231 2.298-1.323 1.649.232 1.293 2.017.29.76 2.327-4.728-.42v-1.81l-1.719-1.26-3.174 1.422-5.157-4.365-2.116 1.78-.926 1.81-1.289-1.035-1.554.55-1.388-1.294-.033-.452-4.067-3.915-.132-3.238-2.083-.324-2.05-2.172-2.645.778-2.413-.421-4.265.356-4.496-2.399-3.637 1.038-2.149-1.362-.297-2.725.496-1.623-1.686-1.721.033-3.575-1.29-.552-1.917-2.928 1.157-1.204.727-1.986.86-1.172 2.446.456 2.348-.228 2.347 2.41 2.05.032.826 2.05 1.521.781.893-1.66 3.107-.325 1.653-1.692-.562-2.866 2.083-.261.992-1.369 2.38-.717.496-1.402 3.009-1.402.33-2.742 2.48 1.534 2.81-.359 1.157 2.545 1.554.294 3.174-1.468z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '75': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M436.604 291.476l1.686-1.164 3.108-.566 1.487 3.658h.034l-.232 2.027-2.314.564-1.554-.564-1.322-1.396z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '76': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M447.845 287.15h0l-.199.1-.694.467-.496.798.793 2.262-1.487 1.63-1.984-1.264-.86 2.26h-.033l-1.487-3.657-1.521-2.13.86-1.497-.067-.6-.231-.566-.165-.333-.033-.066v-.034h0l-.033-.066h.033l1.719-2.033 1.421 1.167 1.455-2.467 1.554-.967 1.884 2.534-.76 3.664z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '77': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M441.398 289.746l-3.108.566-1.686 1.164-2.447-.1-1.322-.931-.86-2.495-.86-1.532 1.026-2.164 2.413.1.992-1.3 3.009 1.7 1.653-.267v-.033l.033.066h0v.034l.033.066.165.333.231.566.067.6-.86 1.498z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '78': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M437.497 294.035l-1.29-.93-3.967.398-.694 2.127-1.091.465-.1 2.357-.595 1.427-2.975 1.493-.198-.199-.133-2.92 2.017-2.524-.595-1.627-1.422.232.728-3.557 1.223-1.496.628-2.363 2.942 1.032.86 2.495 1.322.93 2.447.1z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '79': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M437.629 298.884l1.983 1.028.86 2.389-1.554 1.591-1.719 1.127-.86-1.36-2.578.83-.232-1.426-2.777.497-3.868 1.658-1.917-1.36 1.785-2.42.033-.066 2.975-1.493.596-1.427h.033l3.868.465z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '80': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M437.497 294.035l1.322 1.396-.231 2.424-.96 1.029-3.371.033-3.868-.465h-.033l.099-2.357 1.09-.465.695-2.127 3.967-.398z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '81': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M442.456 297.124l.76 2.689-1.19 3.482 1.09.73h-.032l.496 2.087-2.248-.132-2.414-2.088 1.554-1.591-.86-2.389-1.983-1.028.959-1.03.231-2.423 1.554.564.231 1.229z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '82': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M444.24 296.792l2.117 2.258-.661 1.46 3.173 3.183-.43 1.127h-.032l-1.951.464-.661-2.121-2.645.862h-.033l-1.091-.73 1.19-3.482-.76-2.689z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '83': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M447.051 297.025l-2.017-.93-.793.697-1.785.332-1.852.1-.231-1.229 2.314-.564.232-2.027.86-2.26 1.983 1.263h0l-.033.1-.463.996z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '84': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M448.44 304.82l.43-1.127-3.174-3.183.66-1.46-2.115-2.258.793-.697 2.017.93.926 1.128 2.413.133h.066l1.852-.697.925.764h.298v.166l.165.033h0l.199.066 1.421-.863 1.455.465 4.76 2.422-2.942 6.298-2.975 1.126-.992-1.49-1.95-1.126-3.141.463-.96-1.126z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '85': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M450.423 298.286l-.925-2.889-.893-.797.364-3.723 2.314-1.663.992 2.262 1.851.532.793 2.791-1.024 2.823-.067.465.133.066-.265.399h0l-.165-.033v-.166h-.298l-.925-.764-1.852.697z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '86': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M451.283 289.214l-2.314 1.663-.364 3.723.893.797.925 2.89h-.033l-2.413-.134-.926-1.128-1.785-3.522.463-.997.033-.1h0l1.487-1.629-.793-2.262.496-.798.694-.466.199-.1h0l.165.366 2.149.4z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '87': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M37.101 442.576l1.025 3.681 2.943.352 3.306-.32-.794 1.632 1.587 2.59-.76 1.949 1.454 3.417-1.289 2.936-1.587.127-2.975-5.202-2.05.16-2.149-1.087-.727-1.693.363-1.822-1.355-2.399 1.19-1.12-.33-2.785z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '88': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M47.053 466.366l-.827 1.91-.793.095-.662 1.623-1.223-1.877zm-3.075-5.895l.066.383 4.43.032-1.587 1.307-2.876-.574zm12.927 3.156l-1.158 2.166-1.686 1.942.232 3.785-2.976 1.844-2.512-.635-2.182.604-1.852-2.894.86-2.036.826-.16.53-.89.694-3.376 1.058-1.21-.166-2.04-1.653-.543-2.744.606.397-1.977 1.29-2.936-1.455-3.417.76-1.95-1.587-2.59.794-1.63-3.306.32-2.943-.353-1.025-3.681 1.686-1.89-.727-1.634.661-1.924 2.81 1.315.794-2.438 2.314-2.117 1.587.738.298 1.829-1.554 1.635 1.752 3.045 1.157.448 2.281-1.858 1.488 1.346.86 2.113-.067 2.081-1.653 2.944.463 1.279 2.05-.608.231 1.439-1.553 2.173-1.058 3.002-1.224 1.436.595 1.436 2.546 1.276 1.124-.638 2.347 1.882-.628 2.39z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '89': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M50.028 414.134l2.347 3.643 1.091.644-.198 1.9 2.942 1.481 2.182-.16.86 4.118-1.587.74-3.24.032-.562 1.543-3.405.064-1.554 1.446-2.281 1.06-1.918 1.766-.066 1.477-2.314 2.117-.794 2.438-2.81-1.315-3.802-1.86-.033-4.27-2.71.321-.728-.77-2.777 1.22.033-2.441-1.455-1.35.43-3.022 1.455-1.287 1.355 2.766 1.091-.032 2.215-4.279 2.116-1.03 3.075-3.414 3.769-1.257-1.19-2.128 1.983-.967 1.818 1.548 2.38-2.032z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '90': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M59.252 425.76l1.157.772-1.124.964.76 3.406 1.19.739-.892 1.476 1.29 2.471.958.514.231 2.725 1.455.257.132 2.21 1.058 1.602 1.389-.096 1.487 2.305 1.62-1.184 1.819-.032 1.09.064.331 4.16-1.884 1.15 1.19 2.175.033 1.565-1.223 1.47-2.678-1.534-2.182 2.044.628 3.096-1.917 1.467.496.989-1.422 3.601-3.24.255-1.389-1.051-2.479-.606-.231.893-1.224-.35.628-2.391-2.347-1.882-1.124.638-2.546-1.276-.595-1.436 1.224-1.436 1.058-3.002 1.553-2.173-.231-1.439-2.05.608-.463-1.28 1.653-2.943.066-2.08-.86-2.114-1.487-1.346-2.281 1.858-1.157-.448-1.752-3.045 1.554-1.635-.298-1.83-1.587-.737.066-1.477 1.918-1.766 2.28-1.06 1.555-1.446 3.405-.064.562-1.543 3.24-.033z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '91': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M76.576 423.894l1.355 2.38 1.653.225.595 4.66-.628.61-.86 2.28 2.48 3.849 1.256-.45 2.182 1.54v3.3l-4.232 1.505-1.686-1.954-1.785 1.762-2.876-1.986-2.248 2.274-1.819.032-1.62 1.184-1.487-2.305-1.389.096-1.058-1.601-.132-2.211-1.455-.257-.231-2.725-.959-.514-1.29-2.47.893-1.477-1.19-.739-.76-3.406 1.124-.964.628-1.158 1.918-.965 1.487.225.562 2.926 2.282.161 1.785-.546 1.983.964 2.315.064 1.553-2.475.53-1.995z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '92': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M84.61 442.288l.66 1.473 2.744-.32.76 1.376 1.687.608.264 1.536-3.537.128-1.785-.544-3.472 1.28-.198 2.558.826 1.342 1.852 1.054-1.818 1.98-1.058 5.202.562 1.116 2.314.797-.959 2.199-.397 2.516 1.984-.287.066 1.719.165 2.005-2.314 2.385.992.477-.694 3.082-1.918 1.143-2.645-1.588-.595-1.652-1.851.763-1.323 3.589 2.282 1.777-.794 1.967 1.653 3.107-1.62.064-3.603 1.584-2.116-2.535-.959 2.06-1.587-.665.232-1.649-1.224-1.141-3.306 1.902-.694-.253-2.645 2.661-1.322-.475-.562-2.377-1.521-.158-.43-1.395-1.554.444 1.025 3.36.926 1.9h-.86l.166-1.013-1.753-1.743-.86-1.395-.991-.76 1.52-2.57.43-2.57-2.05-1.97v-1.746l-1.388-1.272 2.976-1.844-.232-3.785 1.686-1.942 1.158-2.166.231-.893 2.48.606 1.388 1.051 3.24-.255 1.422-3.601-.496-.989 1.917-1.467-.628-3.096 2.182-2.044 2.678 1.533 1.223-1.469-.033-1.565-1.19-2.174 1.884-1.151-.33-4.16-1.091-.064 2.248-2.274 2.876 1.986 1.785-1.762 1.686 1.954z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '93': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M93.833 433.214l1.356 1.316 1.884-.16-.463 5.323 1.356 1.442-3.902 2.978-1.553.32-.628-1.793-2.91 1.217-.793-.705 3.504-2.786-.397-1.507-3.074-.897-.992-2.79-2.314-.321.826-1.284 2.017-.032 1.455.642 2.975-1.316z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '94': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M88.18 443.152l-.166.289-2.744.32-.66-1.473v-3.3l-2.183-1.54-1.256.45-2.48-3.85.86-2.279.264-.289.166.193.099-.097.198.225.628-.353 1.29 2.664 2.71.739 2.315.32.992 2.79 3.074.898.397 1.507z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '95': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M87.75 433.535l-2.017.032-.826 1.284-2.711-.739-1.29-2.664-.628.353-.198-.225-.1.097-.165-.193.364-.321-.595-4.66-1.653-.225-1.355-2.38 1.719 1.383 1.454-.868-.43-1.351 1.654-.934.363.901 2.116.805 3.273 2.54.893 1.19-.595 2.314 1.95 1.991z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '96': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M100.71 460.12l-.893.606-2.116-1.052-1.587.638-1.19-1.02-2.975 1.785-1.389-1.435.959-1.659-1.157-2.649.925-4.248 1.389-1.598 2.281.703 1.025-.927 1.091 1.023 3.24 1.566-.397 2.747-1.587.83z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '97': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M125.538 445.233l1.124 2.08-1.19.96-.265 1.534-2.975.16-.992 2.461-1.719-.735-4 2.46-3.108.702-.893-.702-1.983.255-.76 1.5-1.356-.223-2.777-2.874-2.81-1.437.76-2.941-1.62.223-2.248-1.663-1.389.32-1.355 1.95-1.025.928-2.281-.703-1.884-1.663-.067-.864-.264-1.536-1.686-.608-.76-1.376.165-.289.793.705 2.91-1.217.628 1.793 1.553-.32 3.902-2.978 2.413-1.25 2.413-4.072 1.455 1.507 1.455.353 2.446-.449 1.223-2.085 1.687-1.22 2.248.29 2.182 3.111-.992 2.63 1.653.576 3.174 3.811 1.388-1.024 1.422 1.28z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '98': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M108.776 455.909l.827 1.372-.926 1.468.199 1.371-1.587.861-3.835 1.243-2.678.192-.066-2.296-2.38-4.69 1.586-.83.397-2.747-3.24-1.566-1.091-1.023 1.355-1.95 1.389-.32 2.248 1.662 1.62-.223-.76 2.94 2.81 1.438 2.777 2.874zm-18.05-8.948l.066.864 1.884 1.663-1.389 1.598-.925 4.248 1.157 2.65-.959 1.658 1.389 1.435 2.975-1.786 1.19 1.02 1.587-.637 2.116 1.052-.264 1.626-3.902 1.02-1.587 2.293-2.28-1.497-2.81 3.312-1.455.796-2.414-.255-.066-1.719-1.984.287.397-2.516.959-2.2-2.314-.796-.562-1.116 1.058-5.201 1.818-1.98-1.852-1.055-.826-1.342.198-2.558 3.472-1.28 1.785.544z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '99': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M112.975 410.682l-.727 2.29.992 1.775 1.983 2.095 2.347 3.866 3.637-.419 1.323.74-.331 1.353 1.422 1.126 3.339-1.287 2.578 4.407-.43 3.085 1.257 1.767 1.752-.193.628 2.505-.33.994-2.414 1.765.992 1.7-.132 4.966-1.554-.609-1.62 2.177-2.149.448-3.405-.64-1.422-1.28-1.388 1.024-3.174-3.811-1.653-.577.992-2.629-2.182-3.111-2.248-.29-2.38-.095-1.62-2.344-2.117.096-1.95-.867 1.653-1.735-.1-1.8 1.687-.064 1.124-3.537-2.843-3.638-.662-3.19 1.091.13 1.19-3.483-.76-1.903.595-2.938 3.538-.581z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '100': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M103.85 416.746l.662 3.189 2.843 3.638-1.124 3.537-1.686.065.099 1.8-1.653 1.734 1.95.867 2.116-.096 1.62 2.344 2.38.096-1.686 1.22-1.223 2.084-2.446.45-1.455-.354-1.455-1.507-2.413 4.072-2.413 1.25-1.356-1.442.463-5.324-1.884.16-1.356-1.315.496-2.184-1.587-.995-.264-1.671 1.851-1.222.562-3.473-2.612-.901-1.025-1.674-1.686 1.223-1.025-.836.397-2.319 1.389-.999 2.016.484 1.323-1.225 1.52.097 1.951 1.675 1.389-.676-.298-2.514 1.785.226 1.157-.806 1.951.355z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '101': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M93.833 433.214l-1.653-.353-2.975 1.316-1.455-.642 1.223-1.67-1.95-1.99.595-2.315-.893-1.19-3.273-2.54 1.157-1.448 3.042 1.158.892-2.06 1.025.837 1.686-1.223 1.025 1.674 2.612.901-.562 3.473-1.851 1.222.264 1.67 1.587.996z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '102': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M91.651 411.295l-.1-1.646-.99-1.809.859-.71.86-.097 2.28-3.653 3.736-1.358 1.257 1.552 3.636-1.908.364 1.1-.496 1.423 1.19.937-.43 1.422 2.15 2.003-.596 2.938-1.653-.323-1.587-3.616-2.81.613-1.223 1.389-2.843-.549-1.091 1.162z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '103': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M105.371 411.489l.76 1.903-1.19 3.482-1.09-.128-.728-.967-1.95-.355-1.158.806-1.785-.226.298 2.514-1.389.676-1.95-1.675-1.521-.097-1.323 1.225-2.016-.484-1.389.999-.1-2.288-1.355-.45-.297-1.516 2.645-1.354 1.818-2.259 2.513-1.13 1.09-1.162 2.844.549 1.223-1.389 2.81-.613 1.587 3.616z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '104': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M91.42 407.13l-.86.71.992 1.809.1 1.646-1.82 2.259-2.644 1.354.297 1.515 1.356.451.1 2.288-.398 2.319-.892 2.06-3.042-1.16-1.157 1.449-2.116-.805-.363-.9 1.686-1.804-1.521-1.868 2.347.161 1.223-1.61-1.157-.774.695-2.29-.496-2.258-1.422-1.065-.231-.29.462-1.68 2.844-.936.099-2.456 2.512-1.648 1.521 1.099z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '105': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M98.296 402.022l-3.736 1.358-2.28 3.653-.86.097-1.885-2.424-1.52-1.1-2.513 1.65-1.72.969-2.909-.97-2.71-.193.165-6.211 1.388-.324 1.19-.907 2.877-.42 1.09 1.521 2.249.227 3.14-1.522 3.77-.356 1.52-1.004 2.314 1.328-.793 2.266z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '106': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M82.13 410.391l-.066.033h-.199l-.463.161-2.016-.743-3.207.42-2.314-.58-1.62-.776 1.785-1.938-1.256-1.842 1.388-2.069.232-1.456-1.058-1.39 1.487-1.457 2.15.647 1.355-.55-.166 6.21 2.711.194 2.91.97 1.719-.97-.1 2.456-2.843.937-.462 1.679z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '107': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M82.13 410.391l.198.226 1.422 1.065.496 2.259-.695 2.289 1.157.773-1.223 1.611-2.347-.16-.066-2.966-2.182 1.386-1.223-.676.033-2.483-3.34-.516-.495-3.518 2.314.581 3.207-.42 2.016.743.463-.161h.199z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '108': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M73.865 409.681l.495 3.518 3.34.516-.033 2.483 1.223.676 2.182-1.386.066 2.965 1.52 1.868-1.685 1.803-1.653.934.43 1.351-1.455.868-1.72-1.383-1.124-.16-.529 1.994-1.553 2.475-2.315-.064-1.983-.964-1.785.546-2.282-.16-.562-2.927-1.487-.225.297-2.767 2.347-2.158.034-2.126 2.611-1.837.695-2.193-.067-2.033 1.389-1.937 1.984-.452z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '109': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M62.723 409.713l-1.818-.193.231 3.066 1.257.935.892 2.548-3.306 1.031-.496 2.126-1.454 1.063.363 1.353-2.182.16-2.942-1.48.198-1.9-1.09-.645-2.348-3.643 1.256-.322.86-4.002 2.215.614 2.182-.097 2.645-2.584 1.09 1.066z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '110': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M73.336 400.21l1.058 1.391-.232 1.456-1.388 2.07 1.256 1.841-1.785 1.938-1.984.452-1.389 1.937.067 2.033-.695 2.193-2.611 1.837-.034 2.126-2.347 2.158-.297 2.767-1.918.965-.628 1.158-1.157-.772-.86-4.118-.363-1.353 1.454-1.063.496-2.126 3.306-1.031-.892-2.548-1.257-.935-.231-3.066 1.818.193 2.513-1.356 2.777-.581-1.19-1.26-.628-2.263-4.695-.129.793-4.043-.231-.389 2.314-.13.661 1.425 2.15-1.554 1.19.454.066-4.664.264-.064H69.005v.064l.727.648.529 2.915z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '111': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M61.996 399.595l.297.486-.793 4.043 4.695.13.628 2.262 1.19 1.26-2.777.581-2.513 1.356-2.446-.904-1.091-1.066-2.645 2.584-2.182.097-2.215-.614-.86 4.002-1.256.322-2.281-1.29-2.38 2.032-1.819-1.548-.529-.871-3.041 1.838-2.017-.838-.298-3.292.265-1.937 2.843-2.843 2.447-5.142 1.157-.55 1.917-2.267 2.248.842 3.042-.777.694-1.198 3.009-1.458.595-1.686 3.504.649.33-1.005 2.679-.681.66 2.236-2.578.163.298 4.47z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '112': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M56.409 356.284l1.388 2.257 3.14-.752.728 2.092 1.521 1.863-2.645 1.274.364 2.742-1.587 1.795-2.876-1.664-2.943 1.86 1.356 1.598-1.422 3.227-1.818.62-1.091 1.498 1.818.911 2.215 1.953.166 2.05 1.653.456.793-1.204 4 .813-1.653 1.269 1.257 1.137-2.083 1.69 2.678 3.865.264 2.597.76 1.88-2.677.682-.33 1.005-3.505-.649-.595 1.686-3.009 1.458-.694 1.198-3.042.777-2.248-.842-1.058-3.045.992-6.682-.628-3.41-1.918-2.242-1.09-2.471-1.984-2.343-1.653-1.14.992-3.647-1.19-1.14-2.81-1.174-.43-4.698-4.265-2.057 2.149-1.568-.695-2.745-1.818-2.355.992-1.178 2.182.36 2.91-1.767 6.115 1.047v-1.833l-1.19-.753-1.058-2.555 1.752-.622 1.587 1.114 1.62 2.227 4.43-.033.595 1.703 2.215-.131.893 1.276z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '113': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M84.146 363.606l1.488 2.448-1.223 1.795-1.19 3.815.33 1.857-2.678 2.442-3.206.717-1.587.976-2.017.163-2.281 2.31-.53 2.048 1.257 1.138-1.554 1.104-2.347.747-2.182-1.656-.595 3.67-1.52.747-2.084-.812-.86.52-2.677-3.866 2.083-1.69-1.257-1.137 1.653-1.269-4-.813-.793 1.204-1.653-.456-.166-2.05-2.215-1.953-1.818-.911 1.09-1.499 1.82-.619 1.42-3.227-1.355-1.598 2.943-1.86 2.876 1.664 1.587-1.795-.364-2.742 2.645-1.274-1.52-1.863-.728-2.092h1.752l2.579 1.929 3.504-.85 2.017 1.994 5.554.98.198 1.764 2.513.294 2.182 1.24z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '114': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M68.608 385.166l1.95 1.916.76 2.824-.23 1.46-.596 2.237-1.52 1.329.033.227H68.707l-.264.064-.066 4.664-1.19-.454-2.15 1.554-.66-1.424-2.315.13-.066-.098-1.223-.615-.298-4.47 2.579-.162-.661-2.236-.76-1.881-.265-2.597.86-.52 2.082.813 1.52-.747.596-3.67z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '115': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M79.022 391.463v.616l-.1 4.99.794 1.458-1.388.324-1.356.55-2.149-.647-1.487 1.456-3.075-1.424-.529-2.915-.727-.648-.033-.291 1.52-1.329.595-2.237 2.15-.097 3.57-1.266v1.363l.76.065 1.29.032z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '116': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M79.022 391.463h-.165l-1.29-.032-.76-.065v-1.363l-3.57 1.266-2.15.097.232-1.46-.76-2.824-1.951-1.916 2.347-.747 1.554-1.104-1.256-1.138.529-2.048 4.132 2.438 3.24 2.307-.099 3.442-.463 1.103.43 1.98z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '117': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M85.105 385.686l-1.554.91v1.428l-1.62 1.136-2.38.843-.959-.584.463-1.103.1-3.442-3.24-2.307-4.133-2.438 2.28-2.31 2.018-.163 1.587-.976 3.206-.717.397 1.563-1.422.878 2.877 3.87.496 1.755z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '118': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M88.147 388.219l-1.819 1.72.463.843-.826 2.173-.133 2.398-2.05 1.846-2.876.421-1.19.907-.793-1.457.099-4.99v-.682l-.43-1.979.959.584 2.38-.843 1.62-1.136v-1.429l1.554-.909 2.579-.585.132-.064v.032l.132.227-.033 1.69.463.81z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '119': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M88.147 388.219l.231-.422-.463-.812.033-1.689-.132-.227v-.032h.033l.893-2.275.892-.195.562 1.3 1.653.682 1.158 2.241 1.818.357.297 1.623 1.29 1.85-.53.94v.033l-2.181-.876-4.232.097z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '120': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M95.883 391.593l.694.421-1.322 2.27.297 1.782-1.52 1.004-3.77.356-3.14 1.522-2.248-.227-1.091-1.522 2.05-1.846.132-2.398.826-2.173-.463-.843 1.819-1.72 1.322 2.595 4.232-.097z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '121': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M112.116 376.647l-4.398 2.05.76.846-.164 2.016.826 1.268-2.744.65-.992-1.723-2.578-2.016-3.869 1.073-1.256-6.508-.595-1.531 3.405-.587 1.224 2.02 5.025.944 2.248-1.335-.033-1.531 3.14-1.206 2.612 2.835-.496 1.628z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '122': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M111.653 370.849l.463.228-3.141 1.206.033 1.531-2.248 1.335-5.025-.944-1.224-2.02-3.405.587.595 1.53 1.256 6.51-1.884.032-.364-1.756-1.818-1.953-1.686.456-.43-2.311-1.917-1.4.198-1.695-.793-1.76 3.107-3.914-.132-1.567.694-3.037-.694-1.078 2.05-.915 3.306-3.041 2.281.425 2.612 1.602-.133 2.288 1.158 2.156 2.28 1.11-1.256 2.644z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '123': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M90.858 373.88l1.917 1.4.43 2.311 1.686-.456 1.818 1.953.364 1.756-1.19.163 1.157 3.315-.265.617-.132 1.364-1.818.844-1.818-.357-1.158-2.24-1.653-.683-.562-1.3 1.025-1.105-1.983-4.652.198-2.019z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '124': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M114.198 328.115l-.925 1.779.198 1.251-1.355 2.435-3.273-.658-2.216 2.533-1.653-.065-2.38 1.644-3.24-.428-2.38 1.216-1.091 1.906-3.835.854-.827-1.544-3.868-.723-.892.296-4.232-5.294 1.256-1.283-1.752-2.568.826-2.537 1.653-1.912 2.182-.33 1.852-3.959h1.884l2.579-1.485 2.182-.265.86-1.519 1.917-.462 7.835.23 1.058-1.486 2.447-.727 1.388-1.885 2.248-.43.563-1.753 1.454-.827 1.025 1.72 2.975 1.885 1.257 2.083-.364 1.817 1.455.529.397 2.146-6.447 3.432-1.918.066z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '125': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M93.238 360.829l.694 1.078-.694 3.037.132 1.567-3.107 3.914.793 1.76-.198 1.694-1.984.912-.198 2.019 1.983 4.652-1.025 1.105-.892.195-.893 2.275-.165.064-2.579.585-1.884-1.657-.496-1.754-2.877-3.87 1.422-.88-.397-1.562 2.678-2.442-.33-1.857 1.19-3.815 1.223-1.795-1.488-2.448.331-2.81 2.149.523.926-2.19 2.611-.327.232.916z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '126': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M92.048 340.582l.132 1.314 1.851 1.346-.66 2.46.131 1.903-1.322 2.753 1.455 3.504 2.347 2.095 2.612.916-3.306 3.04-2.05.916-2.843-1.111-.232-.916-2.611.327-.926 2.19-2.149-.523-.33 2.81-2.91 1.534-2.182-1.24-2.513-.294-.198-1.764-5.554-.98-2.017-1.994-3.504.85-2.579-1.93h-1.752l-3.14.753-1.39-2.257.067-2.16-.926-1.932 3.24.786 1.19 1.015 4.397-2.881 7.736-2.556 1.62 1.67 2.645-1.802 1.323-1.672.264-2.132 1.653-.46-.1-2.658-4.099-3.154-2.082-.986h-1.488l.496-2.466 3.008-1.645.53-2.962 5.223-.165.628-.658 1.752 2.568-1.256 1.283 4.232 5.294.892-.296 3.868.723z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '127': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M119.653 337.165l-2.28 2.958.429 2.758-2.38 2.067 1.785 1.706-.265 2 4 5.961 1.951.556 1.554 1.44h1.19l4 7.778-.892 1.665-1.785-.914-1.786 1.404-2.314-.229-3.901 2.773-1.322-2.022-.033-1.24-2.116.098-.33-1.339-2.712 1.828 1.52 2.219-.264 1.337-2.05.88-6.116-3.75 1.257-2.644-2.281-1.11-1.158-2.157.133-2.288-2.612-1.602-2.281-.425-2.612-.916-2.347-2.095-1.455-3.504 1.322-2.753-.132-1.902.661-2.461-1.85-1.346-.133-1.314 3.835-.854 1.09-1.906 2.381-1.216 3.24.428 2.38-1.644 1.653.065 2.216-2.533 3.273.658 1.355-2.435-.198-1.251.925-1.779 3.108 1.252 1.52 1.185-.363 3.423z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '128': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M140.713 308.1l.661 2.68 2.149 2.845-2.083-.198-.959 1.62 1.323 1.289-1.686.991.066 3.27-1.19 1.22.165 2.079 1.686 1.22 4.298.362-.827 1.088.331 4.02-1.984-.067-.76.955-4.033 1.975-1.918-.987-1.851.065-1.157-.921-1.918.625-3.14 5.624-1.026.099-1.454-1.61-1.62.657-1.686-1.48-2.447 1.644-1.19-3.19.364-3.423-1.521-1.185-3.108-1.252-1.157-4.318 1.918-.066 6.447-3.432-.397-2.146-1.455-.529.364-1.817-1.257-2.083-2.975-1.885-1.025-1.72 3.637-2.45 2.215-.795 1.785-3.844-1.752-1.028 1.124-2.853.926-.896 4.165 1.56 1.025 2.023.661 3.017 5.125 2.65 1.983.232 2.711-1.027z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '129': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M127.885 337.855l2.48 3.351-.827 1.51.629 2.856 1.586 2.492-.86 2-3.008-.755-.727 1.278-2.314 1.376-1.95 3.208-1.951-.556-4-5.961.264-2-1.785-1.706 2.38-2.067-.43-2.758 2.281-2.958 2.447-1.644 1.686 1.48 1.62-.658 1.454 1.611z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '130': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M137.87 333.449l1.752 2.861 3.471 1.348 2.843-2.827h1.95l1.654.986-1.157 4.141 1.752 1.61.33 3.282 2.712 2.1.628 1.18-1.19 1.77 1.586 2.947 2.05 1.8-.793 1.931 1.686.295 1.29 1.668-.2 2.647 2.613 1.7 1.025 2.546-1.323 2.741-.033 1.598-1.62 1.174-3.934.195.264-1.923-2.777-2.708-2.05-.294-.628 1.24-2.678-1.24-2.28.588-2.381-1.045-1.256 1.893-3.042-.359-.066-1.175-2.876-1.077-.166-.98-3.702 1.274-1.686-.947-4-7.778h-1.19l-1.555-1.44 1.95-3.208 2.315-1.376.727-1.278 3.009.754.86-2-1.587-2.491-.629-2.855.827-1.51-2.48-3.352 3.141-5.624 1.918-.625 1.157.921 1.851-.065z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '131': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M164.55 330.651l-.662 2.14 1.62 1.118 2.645 4.44 1.29.722-.364 2.858-2.81 1.74 1.553 2.1 2.116-.394 1.323.689 1.19 2.033 2.512.065 2.414 5.831-3.703 1.997-.694 1.962-2.943 1.57-2.81 2.973-.76 3.494-2.017.098-2.578-.653-1.025-2.547-2.612-1.699.198-2.647-1.29-1.668-1.685-.295.793-1.93-2.05-1.8-1.586-2.949 1.19-1.77-.628-1.18-2.711-2.1-.331-3.281-1.752-1.61 1.157-4.14 2.215-1.448 3.24-.066.76-2.04 2.017-2.239 2.215-.889z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '132': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M180.32 335.521l.297 1.907-1.025 1.216 1.157 1.084-.76 1.872-.033 2.889-2.282 2.952-2.71.721-2.513-.065-1.19-2.033-1.323-.69-2.116.394-1.553-2.1 2.81-1.74.363-2.857-1.289-.723-2.645-4.439-1.62-1.118.661-2.14 2.315-.033.925.922 4.992-.593 2.91.692.496 2.5 1.421-.295 1.422 1.644z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '133': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M195.362 324.357l-1.257 1.616-.727 4.909-2.744.79-1.719-1.284-3.504-.297-2.58 2.338-1.322.625-1.19 2.467-1.29-.033-1.42-1.644-1.422.296-.496-2.501-2.91-.692-4.992.593-.925-.922-.298-1.449 2.678-2.174 2.182-1.022.793-1.945-2.843-.891.562-6.24 3.108.298 3.042.793 2.909-.43 2.05 1.19 3.735-.926.496-1.718 2.513 1.19 3.736.99-1.521 2.94 1.818 2.309 2.083-.231z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '134': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M199.296 299.713l2.975-3.85 2.348.199 2.28 2.025-1.85 1.693-.463 1.293 1.62 1.924-.364 2.187-1.851 3.842-3.108.828-1.62 1.754-.562 3.472-1.356.76.53 1.388 3.305 1.288 2.182 1.981-1.124.66-.198 2.21-1.488 1.056-1.95-.956-1.488 1.187-1.752-.297-1.455-1.055-2.083.23-1.818-2.309 1.52-2.938-3.735-.991-2.513-1.19-.496 1.718-3.735.925-2.05-1.189-2.91.43-3.041-.793-3.108-.298-.43-2.445.596-1.687-.86-1.554-.562-2.913-7.174-3.909.463-1.823-1.356-2.753 2.678.332.76.796 2.282-.63 1.653.232 1.29-1.128.33-2.656 2.678-2.192 2.644 1.395 5.29-2.924 2.546 2.06.562 2.823-.199 3.451.298 2.818 1.95 1.856 2.249-.994 3.769.861 2.644-1.391 1.686.298 1.554-2.155 1.025-.298z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '135': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M207.958 332.165l1.917 2.534-.958 2.598 1.355 2.596-1.256 2.528 1.124 1.773-2.05 1.673-2.083.492-.463 2.098-2.347.82-3.041.065-1.62-1.77-.662-4.232-2.413-.46-2.314-1.706-.662 1.937-2.843.46-2.215 1.64-1.19 2.656-2.843-1.18-1.455 1.77-4.265-1.016 2.282-2.952.033-2.889.76-1.872-1.157-1.084 1.025-1.216-.298-1.907 1.19-2.467 1.323-.625 2.579-2.338 3.504.297 1.72 1.284 2.743-.79.727-4.91 1.257-1.615 1.752.297 1.488-1.187 1.454 1.484.298 4.086 1.95-1.416 2.976 1.416 2.149-.131z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '136': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M210.14 344.194l1.19-.887 2.48-.295.86 1.346-.298 2.624 2.38.852 1.421 1.312.199 2.49 1.025 1.375 2.413.819 1.686-.033-.033 5.953-3.405 4.084 1.09 1.208.365 2.285-1.224 3.457.166 1.662 3.207-.326-.76 1.76-3.01.455-1.917.977 1.058 1.498-.132 1.4-2.38 3.967.297 1.235-4.166 2.307-1.322 1.428-.033 1.915-1.72-.616-1.983 2.174-2.579-.13-1.388-1.914.826-2.598-.86-.812-2.346-.065-.893-1.234-2.612 1.007-1.322-.065-2.281-2.112 2.942-1.886.463-1.04 2.777-.944-.232-1.92-1.289-.488-.628-1.628.529-2.475-.827-2.51 1.422-2.512-.827-2.807.067-2.318-1.786-3.105-1.487.065-.893-1.373-2.645 1.112-3.934.13-1.19-1.667-.33-2.65-2.315-3.995-2.017-2.229 1.455-1.77 2.843 1.18 1.19-2.656 2.215-1.64 2.843-.46.662-1.937 2.314 1.707 2.413.46.662 4.231 1.62 1.77 3.041-.065 2.347-.82.463-2.098 2.083-.492z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '137': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M181.94 348.457l2.016 2.229 2.314 3.995.33 2.65 1.19 1.667 3.935-.13 2.645-1.112.893 1.373 1.487-.065 1.786 3.105-.067 2.318.827 2.807-1.422 2.512.827 2.51-.53 2.475.629 1.628 1.29.489.23 1.92-2.776.943-.463 1.04-2.942 1.886-1.058-1.495-3.935.78-.396 1.138 1.62 2.306-2.645 3.896-1.157.811-1.455-1.59-1.124.552-3.802-1.948-3.537.065-2.216 1.104-1.52-1.98-.562-3.054-1.786-2.048-.198-2.276 5.72-4.004-.166-2.508-1.421-2.054-3.868-1.206-.166-2.773-4-.424.76-3.494 2.81-2.973 2.943-1.57.694-1.962 3.703-1.997-2.414-5.83 2.711-.722z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '138': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M121.472 395.159l.297 4.533-.86.745.331 3.073-1.917 2.327-1.984.517-1.355 2.423-2.05.549-.959 1.356-3.471-2.712-3.538.58-2.149-2.002.43-1.422-1.19-.937.496-1.423 2.942-2.426-.033-2.752 2.05 1.36 2.017-.68 1.388-4.05 1.389.681 1.421-2.01 2.38-.161 2.249 1.718z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '139': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M114.86 391.236l.033.065-.166 1.589-1.421 2.01-1.389-.681-1.388 4.049-2.017.68-2.05-1.36.033 2.752-2.942 2.426-.364-1.1-3.636 1.908-1.257-1.552-1.223-2.362.793-2.266-2.314-1.328-.297-1.782 1.322-2.27 1.025 1.038 1.422-.486 2.28.68 1.687-.097 2.05-2.691-.133-.941.53-.227 2.479.097.363-2.37h1.257l2.81 3.927z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '140': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M105.008 389.484l-.1.033.133.94-2.05 2.692-1.686.097-2.281-.68-1.422.486-1.025-1.038-.694-.421v-.033l.529-.94-1.29-1.85-.297-1.623 1.818-.844.132-1.364 2.91-.292 2.083-.748 1.586 3.865z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '141': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M106.396 383.477l1.884 3.54-.363 2.37-2.48-.097-.43.194-1.653-1.72-1.586-3.865-2.083.748-2.91.292.265-.617-1.157-3.315 1.19-.163 1.884-.033 3.869-1.073 2.578 2.016z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '142': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M113.207 378.08l-.067.194-.264-.032-.132.325-.397.293.364.325.43 1.724-.629 2.048 1.025 1.04 2.843-.52 1.422.617-2.876 2.729.66 1.298.232 2.693-.925.455-.033-.033-2.513-.292-2.81-3.926h-1.257l-1.884-3.541 2.744-.65-.826-1.268.165-2.016-.76-.846 4.397-2.05.562 1.204z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '143': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M114.893 391.269l.925-.455-.231-2.693-.661-1.298 2.876-2.729-1.422-.617-2.843.52-1.025-1.04.628-2.048-.43-1.724-.363-.325.397-.293.132-.325.264.032.067-.195.495.195 2.38-1.008 2.15 1.399 1.587-.684 1.818.13 1.917 2.766.662 2.535-2.248 1.235.66 2.663-2.049.39-1.587 1.07-.562 2.174-1.322 1.784-2.38.162.165-1.59z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '144': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M134.696 378.502l.86 2.31-.695 4.192.397 2.37-4.133.91-3.603-.487-2.215.681-1.984 1.33.595 3.925-1.058 1.847-1.388-.421-2.116-.713-2.248-1.718 1.322-1.784.562-2.174 1.587-1.07 2.05-.39-.661-2.663 2.248-1.235-.662-2.535-1.917-2.765.1-1.042-1.753-1.074.43-2.052 2.413-1.628 3.835-.163.364 3.224 1.025.163 1.983-1.205 2.447.782 1.322-.39.199 2.831z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '145': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M141.176 367.653l2.413 1.957-1.917.554-.53 3.064-1.818 2.15-.297 1.595-1.885.162-2.446 1.367-.694-.944-.199-2.832-1.322.39-2.447-.78-1.983 1.204-1.025-.163-.364-3.224-3.835.163-2.413 1.628-.43 2.052 1.752 1.074-.1 1.042-1.817-.13-1.587.683-2.15-1.4-2.38 1.01-1.024-.424-.562-1.204 2.115-1.107.496-1.628-2.611-2.835-.463-.228 2.05-.88.264-1.337-1.52-2.219 2.71-1.828.33 1.339 2.117-.098.033 1.24 1.322 2.022 3.901-2.773 2.314.229 1.786-1.404 1.785.914.893-1.665 1.686.947 3.702-1.273.166.98 2.876 1.076.066 1.175z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '146': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M166.467 365.989l4 .424.166 2.773 3.868 1.206 1.421 2.054.166 2.508-5.72 4.004.198 2.276 1.786 2.048.562 3.054 1.52 1.98-3.273 2.077-3.702 3.016-3.042 1.166-3.736.778-1.256-1.555-2.182.259-4.33-3.437-5.886-.52-3.273-1.914-2.149.292-3.57-1.525-1.323 2.174-1.454-1.752-.397-2.371.694-4.193-.86-2.309 2.447-1.367 1.885-.162.297-1.596 1.819-2.15.529-3.063 1.917-.554-2.413-1.957 1.256-1.893 2.38 1.045 2.281-.588 2.678 1.24.629-1.24 2.05.294 2.776 2.708-.264 1.923 3.934-.195 1.62-1.174.033-1.598 1.323-2.741 2.578.653z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '147': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M194.139 382.697l2.28 2.112 1.323.065-4.43 2.208 1.752 3.181 1.455 1.557-.496 3.436-2.744-.292-1.95 1.393-2.778-1.23-4.198 1.651-1.885-.388-.562 1.263-3.438 2.266-1.918 3.397-1.653 1.81 2.05 2.65 1.918-1.131 5.19-1.163.298 2.068 1.686 6.423-3.505 3.61 1.422 1.901-3.372 1.675-3.207-.58H174.5l-2.447-2.351-1.025-1.805-2.71.613-2.249 1.288-.892 1.45-2.182 1.642-3.273-.901-2.348-.13-1.025-1.642-1.157-.193-.595-1.676-2.248-1.289.232-1.257-2.116-1.839-.728-1.775.794-2.357-2.843-.581-1.984.226-1.72.904-1.454-.581-1.62.646-1.157-1.034-.1-5.72.86-2.072-1.454-1.359.066-2.072-1.025-2.69.364-.94-.86-2.853-.893-1.104 1.323-2.174 3.57 1.525 2.15-.292 3.272 1.915 5.885.519 4.331 3.437 2.182-.26 1.256 1.556 3.736-.778 3.042-1.166 3.702-3.016 3.273-2.077 2.216-1.104 3.537-.065 3.802 1.948 1.124-.552 1.455 1.59 1.157-.811 2.645-3.896-1.62-2.306.396-1.138 3.935-.78z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '148': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M174.5 420.58l-2.611 1.995 1.421 1.448-.595 1.705 1.224 2.09-2.05 1.863-1.323 2.57-1.553 2.44.396 2.148-1.653.353-2.083 1.796-.198 1.41-1.653 1.217-2.744.064-.926-1.858-1.058.096-2.115 2.691-2.348 1.857-1.256 2.24-2.248 1.344 2.281 4.57-1.322 3.513-.926.83-1.455-1.532-3.306.543.033-2.459-3.934-4.218.43-4.447-.53-1.665-3.371-.352-1.29-2.338-2.942-.673.231-2.18.992-1.603h3.372l1.422-3.659-.231-3.148.925-1.96 2.843-.579 2.083 2.347 1.356-.097.826-1.446h2.777l2.282.675 2.347-.514.76-2.283.959-.708-1.091-2.928.727-1.352 2.348.129 3.273.901 2.182-1.642.892-1.45 2.248-1.288 2.711-.613 1.025 1.805z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '149': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M121.24 403.51l2.744 1.81 1.124 2.94 3.372-.226.034 1.486 1.719.452 1.454-.55 2.215 3.39-.727 1.258 1.72 1.128 3.57-.193.595-1.387 1.917-.58-.727-1.937.661-2.13 1.62-.646 1.455.581 1.719-.904 1.984-.226 2.843.581-.794 2.357.728 1.775 2.116 1.839-.232 1.257 2.248 1.29.595 1.675 1.157.193 1.025 1.643-.727 1.352 1.091 2.928-.959.708-.76 2.283-2.347.514-2.282-.675h-2.777l-.826 1.446-1.356.097-2.083-2.347-2.843.579-.925 1.96.231 3.148-1.422 3.659h-3.372l-3.603-1.252.33-.994-.628-2.505-1.752.193-1.256-1.767.43-3.085-2.58-4.407-3.338 1.287-1.422-1.126.33-1.352-1.322-.74-3.637.418-2.347-3.866-1.983-2.095-.992-1.774.727-2.291.959-1.356 2.05-.55 1.355-2.422 1.984-.517z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '150': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M135.258 387.375l1.454 1.752.893 1.104.86 2.853-.364.94 1.025 2.69-.066 2.072 1.454 1.36-.86 2.07.1 5.721 1.157 1.034-.661 2.13.727 1.936-1.917.581-.595 1.387-3.57.193-1.72-1.128.727-1.258-2.215-3.39-1.454.55-1.72-.452-.033-1.486-3.372.226-1.124-2.94-2.744-1.81-.33-3.073.86-.745-.298-4.533 1.388.42 1.058-1.846-.595-3.924 1.984-1.33 2.215-.682 3.603.487z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '151': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M422.785 372.38l2.38 3.714 1.488-1.172 2.248 2.376-1.157 1.855 2.48 1.17 1.256 4.226-1.19 2.079-.133 1.59 1.091 1.072-.595 1.881.926 2.724-1.554 2.398 1.157.842-.033 3.399.793 5.336-1.124 1.68.133 1.744-.86-.388-1.984 1.195-2.413-.194-4.76 1.485-1.39-1.356-1.685-.29-1.95.613-1.059-1 1.025-1.551-1.455-3.62-1.52-1.066 1.388-1.876.33-2.136 1.62-.68.331-1.166-1.554-.777-.297-2.139 1.09-1.458-2.479-2.595-3.438-.584-1.554-1.46-2.016 1.33-3.868.163-1.984 1.492.132 2.173-3.207 2.56-5.058 1.846-1.752-.648.066-2.948 1.157-2.659-2.645-1.492.066 1.557-2.082.098-2.58 1.037-4.958-.194v2.01l-1.455 2.85.1 1.457-2.745 1.392-1.124-6.866-.892-1.978-.463-2.693 3.008-1.948-.529-2.046.298-2.047 1.785-1.43.1-1.203 3.305.032 1.455-1.496 3.604-.814 2.248.39.099-1.496 5.885-.619 2.248-.814.297-.944 2.414-.196 1.388.684 2.182-3.747 1.587.13 3.042 1.207 1.09-1.597 3.67-.946.33 1.598 2.15 1.075 3.769-.456.628-1.597 1.554.39.628 2.445z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '152': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M392.7 402.83l-.133-.032-.132-.032-.066-.485-.066-.647-3.24-.065-2.446-1.877-.463-1.197h-2.645l.595 1.812-1.488.292-1.554-.907-1.983.324-.827-1.133-.099-1.457 1.455-2.85v-2.01l4.959.194 2.579-1.037 2.082-.098-.066-1.557 2.645 1.492-1.157 2.659-.066 2.948 1.752.648 1.62 1.003.793 2.201-.231 1.618z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '153': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M392.7 402.83l-.033.098-1.422 3.943-1.686-.937-.893-1.487-2.314.388-.76-.873-2.711 1.714-.926 2.003-2.876.936-.43-2.39.595-1.81-1.355-3.59 1.19-.809 1.983-.324 1.554.907 1.488-.292-.595-1.812h2.645l.463 1.197 2.446 1.877 3.24.065.066.647.066.485.132.032z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '154': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M415.908 410.359l-1.95 1.13-.496 2.194-1.786 2.289 2.15 1.901.065 3.125-4.198.515-.992-1.192-2.81.934-1.554 2.897.727 3.698-2.38 2.988-3.802.385-3.67-1.542-2.645-3.214-.363-2.734-1.488.161-1.091-1.255-3.042-.45-1.057.579-1.025-1.513-3.968.29-3.504-1.674.992-1.998-2.38-.805-.133-3.805.397-2.452-.628-3.907-.86-.065-.264-3.135-.794-1.456.827-1.552 1.322-.421 2.744-1.392.827 1.133-1.19.809 1.355 3.59-.595 1.81.43 2.39 2.876-.936.926-2.003 2.71-1.714.761.873 2.314-.388.893 1.487 1.686.937 1.422-3.943.033-.097 1.818-.194.231-1.618-.793-2.2-1.62-1.004 5.058-1.846 3.207-2.56-.132-2.173 1.984-1.492 3.868-.162 2.016-1.33 1.554 1.46 3.438.583 2.48 2.595-1.091 1.458.297 2.139 1.554.777-.33 1.166-1.62.68-.33 2.136-1.39 1.876 1.521 1.067 1.455 3.619-1.025 1.55z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '155': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M466.06 396.39l1.158 3.238-1.686-.097-1.389 3.267.926 1.94-.76.84.496 3.231-1.951 2.712.959.645-2.612 2.71.463 2.836-1.918-.483-.727 2.48-2.711 1.675-1.918-.87-.925.516-1.488 2.832-.959.515-2.909-.065-1.389-.61-2.909.997-.562 1.833-1.917-1.544-2.348.482-1.025.837-3.603-.226-.794-6.565.43-4.253-2.182-1.774-.86-4.195-.132-1.744 1.124-1.68-.793-5.336.033-3.4-1.157-.841 1.554-2.398.396.875 2.116.259 3.075-2.69 2.579-1.006 1.653-1.232 4.132 3.178 3.207.875.199 1.555 3.47.227.596 1.134 4.628.13 3.108.55z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '156': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M502.229 425.728l.066 1.736-2.116-1.093-1.785 1.446-2.116-.803-1.19-1.48-1.488.515-.925-1.318.132-1.158-4.133-.58-3.273-1.158-1.322 1.834-1.455-1.899-1.653 1.32-2.413-.065-.794-.933-1.983-1.9 1.157-1.803 2.38-.161.165-1.515 1.653-.515-.529-1.903-2.248 1.097-3.537-.613-.76 1.225-2.91-1.031.033-2.387-1.29-.807-2.38.71-3.702-.323-.959-.645 1.95-2.712-.495-3.23.76-.84-.926-1.94 1.389-3.268 1.686.097-1.157-3.238 1.52-.454 2.58.26 2.545-1.62.793 1.878 1.62.162.199-1.911 2.28-2.042-.098-1.816 1.09-.552-1.322-3.05 1.885.714.86-.65 1.057-3.767 1.521.065.066-1.983 1.488.195 2.744.13 1.884 1.04 1.455-.39 2.711 1.138.827 1.202 2.644-3.087 3.406-.098-.397 2.698 1.983.78-.297 2.402 2.843 3.83-2.38 4.148-.893 2.591.86 3.107 2.38-.711.661-1.716 1.72 2.75 2.248.842-.397 1.1 2.083 4.072-.86 1.647 2.48 1.71 1.785 2.679-2.678 2.45-.926 1.418-2.149 1.45-1.554 3.059-4.297.676z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '157': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M502.229 425.728l-.198-2.992 4.297-.676 1.554-3.059 2.15-1.45.925-1.418 2.678-2.45-1.785-2.678-2.48-1.711.86-1.647-2.083-4.073.397-1.1-2.249-.84-1.719-2.75-.66 1.715-2.381.711-.86-3.107.893-2.59 2.38-4.15-2.843-3.829.297-2.403-1.983-.78.397-2.697.165-1.203 5.356-.715 1.223-1.562 1.62.846.595 1.92 3.537-.066 1.72-2.374 1.355-.39-1.025 1.723.992 1.139.364 2.113 3.372.747 3.074 2.501 3.835.617 1.356.909 1.488 2.628-.496 4.96.727 3.919 3.075 4.238.198 4.395-1.157 1.388-.132 2.873-1.124 2.838.165 3.739-1.587 4.314-.165 1.866-.926.9-.727 2.99-1.686 3.372-.43 2.343-4.232 4.875.298 1.377-1.389 4.067-1.851.288-3.174-1.888-4.96-1.473.96-3.461.925-.706-.165-2.277-3.703 1.508-1.223-.962 1.95-3.274.166-2.151-1.124-1.156-4.43-1.897z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '158': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M492.675 424.73l-.893-.031-2.38 5.528 1.289 1.253 1.62-.61v2.697l1.983.513 3.009 2.118-.793 2.18-4.497 1.283-2.116-.962-1.719 1.122-.727 2.018-3.405 1.025-1.587 1.185-2.314.672-.695 1.216-2.413.64-2.414-1.28-2.05 1.088-.793 1.504-1.95-.352-.893 2.015.727 1.662-1.818.799-.562 1.278-2.678-.384-4.463-.096-1.124 1.438-3.075-1.15-1.884-1.566-1.223-2.397-1.124.32-1.356-1.44 1.19-1.79-2.678-1.569-.496-2.21-1.454-3.491-1.488-.77-.198-1.956-1.257-2.92 2.116-1.766-2.016-.353-.562-1.35 1.124-2.088-1.389-1.221.562-1.833 2.91-.998 1.388.611 2.91.065.958-.515.165 1.801 1.157 1.062 3.108-.193.76 1.446.761 1.35 2.248-.675 2.017.771 2.876 2.28 1.223-1.091 2.38.064 4.43-3.985.133-1.961.86-1.223 3.074.161.595-1.577.794.933 2.413.065 1.653-1.32 1.455 1.899 1.322-1.834 3.273 1.158 4.133.58z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '159': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M468.673 430.677l-2.38-.064-1.224 1.092-2.876-2.28-2.017-.772-2.248.675-.76-1.35 1.586-.45.496-1.961-1.388-1.64 1.752-.998.992 1.673 3.504-.483 3.67 4.663z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '160': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M477.764 422.092l-.595 1.577-3.074-.16-.86 1.222-.132 1.961-4.43 3.985-.893-1.895-3.67-4.663-3.504.483-.992-1.673-1.752.997 1.388 1.64-.496 1.962-1.586.45-.76-1.446-3.109.193-1.157-1.062-.165-1.8 1.488-2.833.925-.515 1.918.869 2.711-1.674.727-2.481 1.918.483-.463-2.836 2.612-2.71 3.702.323 2.38-.71 1.29.807-.033 2.387 2.91 1.031.76-1.225 3.537.613 2.248-1.097.53 1.903-1.654.515-.165 1.515-2.38.16-1.157 1.805z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '161': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M430.95 409.294l.86 4.195 2.182 1.774-.43 4.253.794 6.565 3.603.226 1.025-.837 2.348-.482 1.917 1.544 1.389 1.221-1.124 2.089.562 1.349 2.016.353-2.116 1.766 1.257 2.92.198 1.956 1.488.77 1.454 3.492.496 2.21 2.678 1.567-1.19 1.792 1.356 1.439 1.124-.32 1.223 2.397 1.884 1.566-2.744 1.756-2.347-.383-1.917.894 1.057 2.33-1.653 1.882-.694 1.945-.926-1.403-3.008-1.34.1-.956-3.307-3.256.232-2.14-.662-1.31-1.884.671-3.306.16.43-1.726-1.587-1.15-4.364-.672-1.686 1.279-1.422-1.855-1.554.895-2.016-2.27-.53-1.089.53-1.952-2.282-.961-.991-3.428 1.983-1.732.265-1.667-.96-1.188-3.107-.61-1.355.675-.794-2.215-1.818-1.766.793-1.157 2.877.771.33-1.992 1.29-1.254-.926-1.736-1.091-4.634-3.009.483-.066-3.125-2.149-1.901 1.786-2.29.496-2.193 1.95-1.13 1.95-.613 1.687.29 1.388 1.356 4.761-1.485 2.413.194 1.984-1.195z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '162': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M419.413 439.02l.991 3.428 2.282.96-.53 1.953.53 1.088-1.488 2.591-1.686.64-1.257 1.31-1.752.959-2.347-.99.033-2.207-2.678-1.503-1.653.8-2.083.128-.529-2.144.76-2.208 1.257-1.057-.066-1.601 2.446-2.724 2.447-.385 1.52 1.442z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '163': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M419.413 439.02l-3.802.48-1.521-1.442-2.447.385-2.446 2.724.066 1.601-1.256 1.057-.76 2.208.528 2.144 2.083-.128 1.653-.8 2.678 1.503-.033 2.206 2.347.99 1.752-.958.562 2.3-3.603.607-.694.895 2.05 1.915-.992 1.468-5.72 5.515-1.884.892-.1-2.07-.991-.893 1.719-1.818-.298-.893-4.265 1.818-.826-1.052 1.256-2.935-.793-1.022-2.877-.862-1.487-1.564-2.314-4.699 1.124-2.143.826-3.329 1.52-2.979-.33-2.115.76-1.411-1.256-1.829-.76-3.563 3.802-.385 2.38-2.988-.727-3.698 1.554-2.897 2.81-.934.992 1.192 4.198-.515 3.009-.483 1.09 4.634.927 1.736-1.29 1.254-.33 1.992-2.877-.771-.793 1.157 1.818 1.766.794 2.215 1.355-.674 3.108.61.959 1.187-.265 1.667z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '164': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M447.646 461.523l-2.215 2.581-2.71-1.338-.53-1.37-4.595 2.9.198 1.751-1.752.573-.694-1.592-1.72.191-1.19 2.165.133 1.528-2.777 3.944-2.48-1.336-1.752 1.336-2.48.159-1.818 1.112-.364 3.844-1.686 2-2.48.888-6.678-4.254-4.727 2.382-1.488 2.126-1.884-.793-1.521.539-1.587-.444-1.818.761v-1.428l-2.546-1.714-2.413-2.255-1.984-2.891 1.157-1.876 1.818-.636.86-1.305 1.09-1.05 2.018.477-.1-3.406 1.058-2.198 1.224.095 1.124-1.88 2.347.446 1.355-.829 4.265-1.818.298.893-1.72 1.818.992.892.1 2.071 1.884-.892 5.72-5.515.991-1.468-2.05-1.915.695-.895 3.603-.606-.562-2.3 1.257-1.311 1.686-.64 1.488-2.59 2.016 2.27 1.554-.895 1.422 1.855 1.686-1.28 4.364.672 1.587 1.151-.43 1.726 3.306-.16 1.884-.671.662 1.31-.232 2.14 3.306 3.256-.099.957 3.008 1.34z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '165': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M400.138 438.026l.33 2.115-1.52 2.98-.826 3.328-1.124 2.143 2.314 4.699 1.487 1.564 2.877.862.793 1.022-1.256 2.935.826 1.052-1.355.83-2.347-.447-1.124 1.88-1.224-.095-1.058 2.198.1 3.406-2.017-.477-1.091 1.05-1.851-.986-3.009-.287-.595-1.241.727-3.28-3.537-5.294-3.24-.191-2.447-.862-2.644-5.205.991-1.63 1.058.384 1.323-2.558-1.918.064.364-1.952 4.86-1.088.066-1.248 2.083-1.089 2.81.705 1.19-3.332 1.422-1.122 7.008-1.122z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '166': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M393.923 469.071l-.86 1.305-1.818.636-1.157 1.876 1.984 2.891 2.413 2.255 2.546 1.714v1.428l-3.935.92-2.38 3.583-1.52 1.172-.265 1.204-2.15.538.265 1.773-1.752 1.33-2.116 4.048-.363 3.128.66.821-1.024 1.769-1.356-.221-1.124-1.927 1.058-2.116-3.008-2.213 1.454-.949-.66-1.107-2.877-.158-.165-2.975-.76-1.298-3.274.602-1.355-.222-2.017-1.298-4.53-1.458-.065-3.296-3.405-3.205-1.323-2.127 2.645-.92 1.157-2.32-2.513-2.606-1.686.031-.892-2.003.793-1.082 1.885-.287 1.322-3.12 3.372-1.783 1.62 1.497-.959 2.324.827 1.114h2.215l.298-1.878 2.082.86 1.19-1.337-1.19-1.338 1.753-.733.132-1.975 2.116.478.694-1.052 1.818.733 1.686-1.435 1.918-.733 1.09-2.137 3.24.191 3.538 5.293-.727 3.28.595 1.242 3.009.287z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '167': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M237.183 378.21l-.727 1.203-2.116-1.432-.496.944 1.256 1.886-1.421 1.008-.397 1.366-1.587.844 3.141 4.45-.86 1.946.893 2.27-2.182 1.362-.992-.551-3.306.81-.826-.907-2.976.064-1.09 1.686-1.654 1.036-1.653-.162-1.421 2.04 1.586 2.558-1.256 1.132.265 2.038 3.471 1.94 3.174.775-1.19 1.518.694 1.712-6.05-.775-.992-1.841-3.868.517.43 1.291-1.025 3.228-2.414.162.397 1.516-2.182.71.066 1.87 1.72 1.868-1.488 2.545-2.976 3.894-3.736 1.672-1.19-.515-1.058-2.283-2.975-2.318-.694-1.384-.232-5.479 1.686-3.613-2.38-1.97-1.091.259-1.72-1.26-.859 1.518-.231 2.13-1.356 3.194-1.719 2.29-.132 1.32-1.554 1.997-2.182-1.803-1.752.998-1.422-1.9 3.505-3.611-1.686-6.423-.298-2.068-5.19 1.163-1.918 1.13-2.05-2.649 1.653-1.81 1.918-3.397 3.438-2.266.562-1.263 1.885.388 4.198-1.652 2.777 1.231 1.95-1.393 2.745.292.496-3.436-1.455-1.557-1.752-3.18 4.43-2.209 2.612-1.007.893 1.234 2.347.065.86.812-.827 2.598 1.388 1.914 2.58.13 1.983-2.174 1.719.616.033-1.915 1.322-1.428 4.166-2.307-.298-1.235 2.38-3.968.133-1.4-1.058-1.497 1.918-.977 3.008-.456.76-1.759 2.91-.62.198 2.347 1.455.423 1.223-1.205 1.091 1.27 2.447-.358 1.487.554.066 1.302z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '168': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M232.687 394.057l-1.422.194-1.553 3.434.991 1.943 2.15 1.23 5.62 1.94 1.289.776-3.174-1.229-1.124.26-.496 2.424 2.612 1.454 3.438-.032-1.62 2.1-2.116-.517-.595 2.228-2.644 1.453.396 1.742-1.752 1.064-1.488-.838-1.752-3.098-3.471.226-.463-1.065-.694-1.712 1.19-1.518-3.174-.776-3.471-1.94-.265-2.037 1.256-1.132-1.586-2.557 1.421-2.04 1.653.161 1.653-1.036 1.091-1.686 2.976-.064.826.907 3.306-.81z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '169': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M250.573 396.52l.099 3.108.628.388.33 2.88 6.183 2.392-.727 1.002 2.48 3.359 1.19.968 1.586-.29 1.984.807 1.62 1.645 1.587.516-1.587 1.742.198 1.999-.595 2.577-1.719-3.544-1.918 1.804 2.282 2.287-1.488 2.029-.1 2.51 1.918.61 1.852 1.898-1.323 2.41-3.008.29-1.984-.868-3.736-.482-.628 1.51 1.785 4.751-2.314.418-.43 1.154 1.686.995 1.323 1.763-1.885 1.987.562 2.146-2.182 1.504-.991-.672-1.356 1.056-.463 2.368.463 1.79-1.455.544-1.586-.99-.893-1.504-2.116.48-2.91-1.152-3.272 1.216-1.19 1.886 1.024 1.311-3.206 2.971-1.852-.83-1.719-2.525-1.818-.767-3.604 2.749-1.884-2.717-.992.192-1.091-.831.364-1.95.826-.225 3.009-2.656-.76-4.292-.794-1.666 1.52-2.052-.264-1.059 3.372-1.893-1.124-1.477 1.785-2.826-.297-.932 3.703-2.38.066-1.382 1.587-.322 1.421-1.577 2.877.805 1.487-.998.265-3.767-.364-2.03-2.38-.032-2.116-1.934-.33-1.452-2.745.194-.396-1.742 2.644-1.453.595-2.228 2.116.517 1.62-2.1-3.438.032-2.612-1.454.496-2.425 1.124-.259 3.174 1.23 1.984-1.003-1.257-1.1-2.413-3.722 4.926-2.462.694-1.88 2.579.778 3.074-1.718 1.389 2.496z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '170': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M225.513 409.746l.463 1.065 3.471-.226 1.752 3.098 1.488.838 1.752-1.064 2.744-.194.33 1.452 2.117 1.934 2.38.032.364 2.03-.265 3.767-1.487.998-2.877-.805-1.421 1.577-1.587.322-.066 1.383-3.703 2.379.297.932-1.785 2.826 1.124 1.477-3.372 1.893.265 1.059-1.521 2.052.793 1.666.76 4.292-3.008 2.656-.826.224-3.439 1.631-.826-2.015-1.488.288-4.033-1.664-2.976-.576-3.339-1.248.132-.929-1.587-2.883.43-1.699-1.124-1.7-2.512.257-1.422.802-1.488-.32-.066-1.348-2.05-.513-1.884-2.92-2.05 1.027-2.413-.417-4.199.096-.893-1.862-1.686 1.156-3.438-2.762-.926 2.216-3.273 1.958-1.917-.61-2.777-.032-1.885-1.091 1.323-2.57 2.05-1.864-1.224-2.09.595-1.704-1.421-1.448 2.612-1.996h2.876l3.207.58 3.372-1.675 1.752-.998 2.182 1.803 1.554-1.997.132-1.32 1.72-2.29 1.355-3.193.231-2.13.86-1.519 1.719 1.26 1.09-.258 2.381 1.969-1.686 3.613.232 5.479.694 1.384 2.975 2.318 1.058 2.283 1.19.515 3.736-1.672 2.976-3.894 1.487-2.545-1.719-1.869-.066-1.87 2.182-.71-.397-1.515 2.414-.162 1.025-3.228-.43-1.291 3.868-.517.992 1.84z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '171': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M207.594 443.825l-2.512.736-.596 1.824-3.636 1.024-.628 2.143-2.15.735-1.685 1.981-2.282 1.757.827 1.437-1.256 1.277-2.48-1.5-2.612.415-1.487 1.149-4 .35-3.108-1.372-1.224 1.181-1.818.32-2.91-3.672-2.313-1.182-2.414 1.406-1.19-3.451 1.422-2.078-.397-.8-2.843.096-.364-1.376.297-3.36-2.413-1.25 1.653-1.217.198-1.41 2.083-1.796 1.653-.353-.396-2.149 1.553-2.44 1.885 1.092 2.777.032 1.917.61 3.273-1.958.926-2.216 3.438 2.762 1.686-1.156.893 1.862 4.199-.096 2.413.417 2.05-1.027 1.884 2.92 2.05.513.066 1.347 1.488.321 1.422-.802 2.512-.256 1.124 1.7-.43 1.698 1.587 2.883z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '172': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M163.822 441.615l2.413 1.25-.297 3.36.364 1.376 2.843-.096.397.8-1.422 2.078 1.19 3.45 2.414-1.405 2.314 1.182 2.91 3.671 1.817-.319 1.224-1.18 1.124 1.69-.628.926 1.719 1.148-.265 3.284-1.719 1.497-3.008-.286 1.157 3.439-2.348 2.164.728 1.113 3.174.604-.86 1.781-1.984-.223-2.645 2.892-1.024.19.86 2.859 1.818 1.618-2.15-.158-1.355 1.522-1.025.286-1.62-2.126-1.454-.761-.926-2-1.653-.382-1.72-2.446-.264-2.098-2.38-.667-1.752-1.59-1.323-3.374-1.686-1.019-1.19 1.91-2.281-1.082-.727-2.006-1.29-.733.661-2.071-1.653-2.232.86-2.489.926-.83 1.322-3.512-2.281-4.571 2.248-1.344 1.256-2.24 2.348-1.857 2.115-2.691 1.058-.096.926 1.858z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '173': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M223.695 447.41l-.364 1.95 1.09.831-1.983-.192-.793 2.014-1.19.543-2.447-.096-1.52 1.82-2.81.895.297 2.49-1.356.924.199 4.432-3.141 1.975-1.19-2.23-1.091-.127-2.248 4.427 1.388 1.782-1.983 2.8-1.058-.032-1.786 1.685-2.81.318-.628 2.033-1.752 3.43-2.281-.603-1.091.888-4.166-.698-.33-1.937-1.29-1.747-3.868.318-1.488-.73-2.182-.033-3.934 3.304 1.554 1.206-1.355 1.428-1.819-1.618-.86-2.858 1.025-.19 2.645-2.893 1.984.223.86-1.78-3.174-.605-.728-1.113 2.348-2.164-1.157-3.44 3.008.287 1.72-1.497.264-3.284-1.72-1.148.629-.925-1.124-1.692 3.107 1.373 4-.351 1.488-1.15 2.612-.414 2.48 1.5 1.256-1.277-.827-1.437 2.282-1.757 1.686-1.981 2.149-.735.628-2.143 3.636-1.024.596-1.824 2.512-.736 3.34 1.248 2.975.576 4.033 1.664 1.488-.288.826 2.015z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '174': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M250.44 449.871l.76.991-.264 2.78-1.289 1.341.496.958-2.248 2.712-.165 2.169 2.777 1.02 1.851.032-.595-2.296 2.876-1.818 2.579.255 1.587 3.158-2.215 2.135.43 3.28.925 1.624-1.322 2.386.165 1.081v1.844l-1.256 2.51-1.819 1.97-4.661 3.459-2.248.539-2.876-1.3-.298-1.016-2.843.92.463.952-.893 3.488-.562.539-2.314-.412-4.298-2.854-3.174 1.047-3.769-2.792-.76-2.475-1.587 1.206-.496 1.333-2.116 2.03-1.785-.38-.893-1.11.463-1.746-1.157-2.159-2.612-.857-1.29 1.492-.66-2.096.165-3.368.793-1.209-2.777-1.495-1.421.255-3.57-1.146-1.39-1.782 2.249-4.427 1.09.127 1.19 2.23 3.142-1.975-.199-4.432 1.356-.925-.298-2.49 2.81-.893 1.521-1.821 2.447.096 1.19-.543.793-2.014 1.984.192.992-.192 1.884 2.717 3.604-2.749 1.818.767 1.72 2.525 1.85.83 3.207-2.971-1.024-1.31 1.19-1.887 3.273-1.216 2.91 1.152 2.115-.48.893 1.503z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '175': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M239.795 485.584l.793 1.267v2.407l-2.413 2.817-3.042 1.329-1.388 3.13-1.025.632-1.554-.917-1.884.696-2.182-1.612-.43 1.422 1.124 2.686-.926 1.736 1.62.6-1.124 1.957.661 2.712-.363 1.261-4.232 1.23-1.72-.221-1.983-3.783-5.984-.6-1.355-.662-2.91.725.463.82-1.95 1.42-1.918-1.23-2.777.567.133-1.987 3.967-1.262.562-.663-2.38-1.989-1.521.284-.728-1.926.133-2.054-.86-1.612-1.884 1.707-2.778-1.233-1.653-1.866-2.38-.886v-1.17l2.843-2.09 1.885-2.724 3.603-1.68.595-1.743 2.976-.951.529-2.475-1.818-.254.066-2.603-1.389-.064-.43-2.319-1.058-1.112 1.786-1.685 1.058.032 1.983-2.8 3.57 1.146 1.422-.255 2.777 1.495-.793 1.209-.165 3.368.66 2.096 1.29-1.492 2.612.857 1.157 2.159-.463 1.745.893 1.11 1.785.381 2.116-2.03.496-1.333 1.587-1.206.76 2.475 3.77 2.792 3.173-1.047 4.298 2.854z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '176': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M172.583 481.842l2.612 2.03 2.116.602 1.983 3.232.133 1.584-1.224 1.424 1.918 1.298 2.182 2.435-.364 1.297 1.521 1.043-2.347.79-2.943 2.843h-.099l-1.388 1.357-5.918-4.8-1.62-.064-2.612 3.76-2.81-1.706.364-1.2 2.611-.696-1.058-1.517.992-.917-.694-1.898-2.876-4.78-1.455-1.013 1.62-1.394.43-1.839-3.009.603-.496-.856-1.917-.032.198 1.744-1.851.253-.727-.792-6.943-4.155 1.322-3.904 1.058-2.065 1.72-1.367-2.117-3.466 1.687-5.19.727 2.007 2.281 1.082 1.19-1.91 1.686 1.02 1.323 3.372 1.752 1.59 2.38.668.265 2.098 1.719 2.446 1.653.381.926 2 1.454.762 1.62 2.126z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '177': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M193.907 492.486l-1.818-.443-1.19.57.496 1.645-1.488 1.77-.33 2.528-1.72.79-.066 1.768-.628-.379-2.215 1.547-1.62-1.168-.199-1.358 1.455-1.263-1.124-1.706-1.52-1.043.363-1.297-2.182-2.435-1.918-1.298 1.224-1.424-.133-1.584-1.983-3.232-2.116-.602-2.612-2.03 1.356-1.522 2.149.158 1.355-1.428-1.554-1.206 3.934-3.304 2.182.032 1.488.73 3.868-.317 1.29 1.747.33 1.937 4.166.698 1.09-.888 2.282.603 1.752-3.43.628-2.033 2.81-.318 1.058 1.112.43 2.32 1.389.063-.066 2.603 1.818.254-.53 2.475-2.975.951-.595 1.744-3.603 1.68-1.885 2.723-2.843 2.09z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '178': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M150.895 469.676l2.116 3.466-1.719 1.367-1.058 2.065-1.322 3.904 6.943 4.155.727.792 1.851-.253-.198-1.744 1.917.032.496.856 3.009-.603-.43 1.839-1.62 1.394 1.455 1.014 2.876 4.78.694 1.897-.992.917 1.058 1.517-2.611.695-.364 1.2.397 2.717-1.819 2.02-.33-.442-4.331.315-3.207 2.271-1.389-.284-1.553 1.798-.496 2.458 1.95 1.764.926 1.731-4.496 2.014-2.612.535-4.331 2.296-4.463.503-1.223-.88-.397-2.233-4.596-4.155v-.85l3.174-2.837 1.257-2.49 1.686 1.198 2.347-.41.033-1.924-2.413-2.43-.067-1.01 2.083-2.274 1.686-.537 2.281-1.58 1.29 1.327 2.215-1.454-1.686-2.403 2.545-.98 1.918 1.043.826-1.392-.793-3.83-1.653-1.647-.628-2.313-2.48-2.727-1.653-.063-.529-1.587.496-2.253 1.124-.762-1.289-1.715-.33-1.843.627-2.449 2.778-2.767 1.52 1.4z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '179': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M162.301 503.702l3.174 5.77-1.752 1.386 1.455 1.417-2.645 1.669-.066 2.265-2.348.44-2.413-2.768-3.835-.567-.926-1.731-1.95-1.764.496-2.458 1.553-1.798 1.389.284 3.207-2.27 4.33-.316z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '180': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M193.907 492.486l2.38.886 1.653 1.866 2.778 1.233 1.884-1.707.86 1.612-.133 2.054.728 1.926 1.52-.284 2.38 1.99-.561.662-3.967 1.262-.133 1.987-2.91.694-1.156 1.702-.364 2.111-.297-.787-3.968-.788-.264.882-1.918-1.733.695-2.554-5.852-1.009.529-3.377.066-1.768 1.72-.79.33-2.528 1.488-1.77-.496-1.645 1.19-.57z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '181': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M176.683 501.777l.099 2.399-3.306 2.113-.926-.505-2.215 1.986 2.612 3.183-2.182 1.574-.86 1.543-3.504 2.485-3.934-.346.066-2.265 2.645-1.669-1.455-1.417 1.752-1.386-3.174-5.77 1.819-2.02-.397-2.715 2.81 1.705 2.612-3.759 1.62.063z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '182': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M173.211 509.063l-.264 1.89-2.612-3.183 2.215-1.986.926.505 3.306-2.113-.1-2.399 1.39-1.357h.098l1.72.631 1.686 1.547.033 3.375-.794 1.766-1.785.85-2.876-.062-1.29-.82z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '183': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M173.211 509.063l1.653-1.356 1.29.82 2.876.063 1.785-.851.794-1.766-.033-3.375-1.687-1.547-1.719-.631 2.943-2.843 2.347-.79 1.124 1.706-1.455 1.263.199 1.358 1.62 1.168 2.215-1.547.628.38-.53 3.376-.297 2.397-1.454 1.26-1.752 2.773-4.133.725-2.48.944-.297 2.14-1.223-.692-2.777.44-.166-1.038 2.38-1.385-.33-1.543z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '184': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M176.848 514.73l2.017 3.586-.43.88-.992.032-2.017 1.917-.86 1.916.794 3.233-2.48 1.443 1.654 3.731-.728 3.728.992 1.565.265 2.691-3.538.47-2.579-.876 1.587-2.034-.595-1.002-2.314.094-2.314-4.354.165-2.727-1.554-1.192-.793-2.039.595-2.7-.595-1.759-1.124-2.828-1.885-1.856 2.348-.44 3.934.346 3.504-2.485.86-1.543 2.182-1.574.264-1.89 1.521 1.449.33 1.543-2.38 1.385.166 1.039 2.777-.44z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '185': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M194.337 509.787l-2.678.977-.628 2.11-1.653.975-1.124 3.367-2.05.346-.86 2.106-3.24 1.005-3.67-1.477.43-.88-2.016-3.586.297-2.14 2.48-.944 4.133-.725 1.752-2.772 1.454-1.261.298-2.397 5.852 1.01-.695 2.553z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '186': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M185.344 519.668l4.728.848 1.851-1.131 2.348 3.896-2.711.314-.893-1.005-3.934.942-.661 1.726 2.545 2.322-1.157 1.474.827 4.075-.893 2.13-.231 2.19.661 1.378-2.281 1.157-1.422-1.533-1.785-.876-.265 1.72-2.744.47-1.586-.75-2.678.437-.265-2.69-.992-1.566.728-3.728-1.653-3.73 2.48-1.444-.794-3.233.86-1.916 2.016-1.917.992-.032 3.67 1.477z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '187': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M198.866 510.48l-.826 1.575 3.074.787.199 3.21-1.058 1.132.562 2.924.595 6.468.727 1.13-.793 1.693 1.554 1.254 1.487 3.51 2.083-.439.33 1.128-1.52 2.035 2.281 1.314-1.62 3.878-1.388.187-.265 2.282.694 2.28-1.983 1.904 2.05 3.619-.232 1.434-.595.997-.265 1.932-1.785.56-.43 1.713-3.041-.56-1.356.373-1.719 2.615-1.818-1.183.033-1.619.628-1.65-1.058-.748-.661-3.116.43-.748-.628-3.151.462-.655-1.256-2.842-1.686-1.499-2.017-1 .331-2.063-.562-2.314-.661-1.377.231-2.191.893-2.13-.827-4.075 1.157-1.474-2.545-2.322.661-1.726 3.934-.942.893 1.005 2.71-.314-2.347-3.896-1.85 1.131-4.729-.848.86-2.106 2.05-.346 1.124-3.367 1.653-.976.628-2.11 2.678-.976.264-.882 3.968.788z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '188': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M193.808 560.232l1.818 1.183-.165 1.773-4.133 4.538-1.289-2.3.198-2.3-.43-1.618 1.39-1.183 1.355 1.432zm-5.984-21.405l.562 2.314-.33 2.063 2.016 1 1.686 1.5 1.256 2.84-.462.656.628 3.15-.43.749.661 3.116 1.058.748-.628 1.65-4.496-.062.033-1.432-2.876.56-3.108-1.495-1.422-3.241-.264-4.71-4.728 1.248 1.52 5.613-2.214 2.15-1.587-.063-3.174-4.456-1.686-1.404-2.314.5-.43-.968-1.884-2.933-1.323-4.153 1.025-2.25 3.471-1.533.562-.938 2.58.875 3.537-.469 2.678-.438 1.586.751 2.744-.47.265-1.72 1.785.876 1.422 1.533z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '189': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M305.056 375.15l-.727 1.985-1.157 1.204 1.917 2.928 1.29.552-.033 3.575 1.686 1.72-.496 1.624.297 2.725 2.15 1.362 3.636-1.038 4.496 2.4 4.265-.357 2.413.421 2.645-.778 2.05 2.172 2.083.324.132 3.238 4.067 3.915.033.452-3.373 4.783-1.487-.42-1.819-2.358-3.206 2.487-2.38-.936-2.05 1.227-3.505-1.357.562-1.583-2.248-1.228-1.091-2.167-1.72-.873-.892 2.716-1.19.162-.231 1.713-1.257.323-.165 4.005-1.157-.032-1.058 1.42-2.116.033-1.554-1.098-3.273-.42-2.81.42-2.116-.323-2.05.42-1.785-5.523-2.314-.809-1.686-2.749-2.347-.582-2.05 1.876-1.554-.55-.694-2.62-4.463-.26-1.554 1.23.231 1.683-1.455 2.328-1.62.323-1.024 3.393-1.72.904-3.008.032-1.818 1.163 1.19 2.452-1.62-1.645-1.984-.807-1.587.29-1.19-.968-2.48-3.36.728-1.001-6.182-2.393-.33-2.879-.63-.388-.098-3.109 2.083-1.782 1.157-.226 1.322-2.01 2.942.032.827-1.2 2.083.325 1.917-1.492 1.224.065.892-3.051 3.009-.26 3.008-.91.53-1.883 1.85-.39 1.984-3.836-.066-2.31 2.678-.293 3.835 1.725.793 1.43 2.777-.032 1.819-1.463 1.058-.521 2.446 1.854.53-1.756-1.522-.521.033-3.288 3.439-1.857 3.471-.619 2.942.88.166 1.336 2.116-.782 1.52 1.856z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '190': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M305.42 411.489l-1.025 2.258.364 4.062-1.885.644.199 2.448-3.868.032-2.15.419-1.983-1.642-1.719 1.094-.364 1.481.76 2.639-1.785 1.222-3.339-.129-1.388 1.415-6.183 2.635.298 2.12 1.52.61-1.62 3.722-2.776 1.379-1.852 3.525.595 1.217-.363 1.857-2.645 4.415-1.653-.863-2.215.895-1.323 1.247-3.206-.671.86 2.045-.53 2.045-1.488.575.43 1.756-.694 2.266 1.62 1.499.463 1.658-.661 1.625-4.133-.318-2.876-1.498-1.587-3.158-2.579-.255-2.876 1.818.595 2.296-1.851-.032-2.777-1.02.165-2.169 2.248-2.712-.496-.958 1.29-1.341.264-2.78-.76-.99 1.454-.544-.463-1.791.463-2.368 1.356-1.056.991.672 2.182-1.504-.562-2.146 1.885-1.987-1.323-1.763-1.686-.995.43-1.154 2.314-.418-1.785-4.751.628-1.51 3.736.482 1.984.867 3.008-.289 1.323-2.41-1.852-1.897-1.917-.611.099-2.51 1.488-2.029-2.282-2.287 1.918-1.804 1.72 3.544.594-2.577-.198-1.999 1.587-1.742-1.587-.516-1.19-2.452 1.818-1.163 3.008-.032 1.72-.904 1.025-3.393 1.62-.323 1.454-2.328-.231-1.683 1.554-1.23 4.463.26.694 2.62 1.554.55 2.05-1.876 2.347.582 1.686 2.75 2.314.808 1.785 5.523 2.05-.42 2.116.323 2.81-.42 3.273.42z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '191': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M330.943 407.937l-.992 1.518 2.215 2.195 1.29-.775 2.148 1.937.1 3.708-1.158.129.662 2.964 1.223.934h3.339l1.421-1.482 2.678 1.289 2.348-.58 1.884 2.093-.595 3.217-1.851 2.348-1.455-.129-1.157 1.736-3.207 1.349 1.091 2.12 2.777-.964 2.447 1.477.297 4.235-1.124 1.25.992 1.443-3.108.48-.165 1.218-2.314.48-.232-3.011-.992-.93-2.777-.032-.165 1.795-2.678 1.442 1.19 2.274-2.314 2.592-1.653-.832-1.488.224-.099 1.504-2.083.352-3.273-3.392-.396 1.344-1.852 1.216-1.19-.288-2.446-1.92.86-1.953-.398-1.794-1.818-.352-1.157-3.238 1.488-1.443 2.05.834 2.545-.898 1.885 1.315.363-1.957 1.72 1.732 2.148-.77.033-1.38 1.95.161 1.885-2.054-.297-1.734-2.182-1.188-1.323-1.929-2.115-.964-2.943.61-1.29-.61-2.644 1.157-2.38.257-1.852-4.019-1.454-1.673-1.488 1.223-2.612.579-.33 1.35-1.753.547-2.28 1.93-2.778-.997.298-3.216 1.256-.74-.595-2.35-.199-2.448 1.885-.644-.364-4.062 1.025-2.258 2.116-.033 1.058-1.42 1.157.032.165-4.005 1.257-.323.231-1.713 1.19-.162.893-2.716 1.719.873 1.09 2.167 2.249 1.228-.562 1.583 3.504 1.357 2.05-1.227 2.38.936 3.207-2.487z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '192': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M303.073 420.901l.595 2.35-1.256.74-.298 3.216.066 2.25 1.52.963-1.586 1.092 1.72 1.477.363 1.669 2.083-.481 1.388 2.02-1.752 1.252.893 1.635 1.785-1.186 7.174-.77 1.157 3.238 1.818.352.397 1.794-.86 1.953 2.447 1.92 1.19.288-1.322.8-1.29 1.983.827 3.1-2.876.958-2.15-.351-.198 2.746-1.256.287-.628-1.724-1.488 2.043 1.091 1.34.628 4.688 1.389 1.307-.959 1.624-.132 1.974-2.546 1.241-3.074-.159-1.389.414-2.579-5.317-1.058 2.548-2.611.955-.232-2.643-2.413-1.115.297-1.562-.826-1.913-1.918-.606.96-4.915-2.282-1.533-.33 1.246-1.555.128-3.67-1.789-2.049-.287-2.083-7.484-1.983-.512-1.951-1.601-2.149.769-.893-.673-.595-1.217 1.852-3.525 2.777-1.38 1.62-3.722-1.521-.61-.298-2.12 6.183-2.634 1.388-1.415 3.34.129 1.785-1.222-.76-2.639.363-1.48 1.72-1.095 1.983 1.642 2.149-.419z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '193': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M315.768 437.128l-7.174.77-1.785 1.186-.893-1.635 1.752-1.251-1.388-2.021-2.083.481-.364-1.669-1.719-1.477 1.587-1.092-1.52-.964-.067-2.25 2.777.997 2.281-1.929 1.752-.546.331-1.351 2.612-.58 1.488-1.222 1.454 1.673 1.852 4.02 2.38-.258 2.645-1.157 1.29.61 2.942-.61 2.115.964 1.323 1.929 2.182 1.188.297 1.734-1.884 2.054-1.95-.16-.034 1.38-2.149.77-1.719-1.733-.363 1.957-1.885-1.315-2.546.898-2.05-.834z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '194': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M398.882 431.223l.76 3.563 1.257 1.829-.76 1.41-1.555-.288-7.008 1.122-1.422 1.122-1.19 3.332-2.81-.705-2.083 1.089-.066 1.248-4.86 1.088-.364 1.952 1.918-.064-1.323 2.558-1.058-.384-.991 1.63 2.644 5.205 2.447.862-1.091 2.137-1.918.733-1.686 1.435-1.818-.733-.694 1.052-2.116-.478-.132 1.975-1.753.733 1.19 1.338-1.19 1.337-2.082-.86-.298 1.878h-2.215l-.827-1.114.96-2.324-1.62-1.497-3.373 1.783-.496-1.083-1.785-.318-.992-1.689.132-3.22-1.058.159.331-2.872-.364-1.149 1.587-2.906 2.447-1.566-2.777-2.206-.033-1.44 1.09-2.176-.991-.768-.033-5.254 1.454.16.298-1.827 1.653-.16.264-2.503 1.653-.802 1.852.513v-1.83l3.67-.642 3.9 1.156 1.323-1.123.86 1.67 1.587 1.187.826-1.092-.1-1.733 2.877-3.791-.264-1.64-1.389-1.061-.198-1.448 1.454-2.188 3.968-.29 1.025 1.513 1.057-.58 3.042.451 1.091 1.255 1.488-.16.363 2.733 2.645 3.214z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '195': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M365.987 432.25v1.83l-1.852-.513-1.653.802-.264 2.502-1.653.16-.298 1.828-1.454-.16.033 5.254.992.768-1.091 2.176.033 1.44 2.777 2.206-2.447 1.566-1.587 2.906.364 1.15-.33 2.871 1.057-.16-.132 3.221.992 1.689 1.785.318.496 1.083-1.322 3.12-1.885.287-.793 1.082.892 2.003 1.686-.031 2.513 2.606-1.157 2.32-2.645.92 1.323 2.127-2.116.952-.827 1.142-1.851.508-2.017-2.03-2.182 1.11-2.645.127-1.388.983-3.174.476-1.223-1.015-1.95.286-.86 1.11-1.753.158-.099-1.268-2.215-.476.496-1.46-3.703-2.19-.264-2.128 1.388-2.86-.892-1.303-3.009-.636-2.678 1.272-.132 1.685-2.942.826.066-1.78-1.752-.636-1.653.668-3.207-.668 1.157-1.526-.628-1.654-3.472 1.145-.529 1.781-3.405-1.495-1.785-.031-1.19-2.164 3.074.16 2.546-1.242.132-1.974.959-1.624-1.389-1.307-.628-4.687-1.09-1.34 1.487-2.044.628 1.724 1.256-.287.199-2.746 2.149.351 2.876-.958-.827-3.1 1.29-1.983 1.322-.8 1.852-1.216.396-1.344 3.273 3.392 2.083-.352.1-1.504 1.487-.224 1.653.832 2.314-2.592-1.19-2.274 2.678-1.442.165-1.795 2.777.032.992.93.232 3.012 2.314-.48.165-1.218 3.108-.48-.992-1.443 1.124-1.25-.297-4.236-2.447-1.477-2.777.964-1.091-2.12 3.207-1.35 1.157-1.735 1.455.129 1.851-2.348.595-3.217 3.108 2.67 2.81.87 4.661-.773 5.059 3.633z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '196': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M307.933 468.53l1.19 2.164 1.785.031 3.405 1.495.53-1.78 3.47-1.146.629 1.654-1.157 1.526 3.207.668 1.653-.668 1.752.636-.066 1.78-1.124.858.991 2.318.397 4.252.76 2.885-.991.73-.562 2.502.198 4.146-.694.538-2.711-1.993-.43 1.772-3.14-2.5.098-1.203 1.323-1.394-2.38-3.137-1.455.064-2.579 1.838-1.917-1.775-1.389 1.141-2.744-3.487-1.884.666-3.77-.698-1.454 1.174-1.025-.54-1.983 2.378-1.885-.507 1.455 4.118 1.587 2.026 1.851 1.108 2.314.411.33 2.024-1.553 1.202-1.29-1.202-1.718.917-2.38-.569.165 1.518-.265 2.054-2.149-1.39-4.033-.159-.066-2.15-.96-1.77.629-2.089-.694-1.519.43-1.932-2.116-.285-1.521-2.503-1.52.697-1.092-1.521-1.587-.666-.496-1.713-1.421.888-1.984-.475.86-2.444-1.819-.73-1.884-2.699-.298-2.446-1.322.19-2.777-1.812-2.876-3.626-3.571 1.018-1.785-1.814-2.116 2.928-1.52 1.176-.166-1.08 1.322-2.387-.925-1.623-.43-3.281 2.215-2.135 2.876 1.498 4.133.318.66-1.625-.462-1.658-1.62-1.5.694-2.265-.43-1.756 1.488-.575.53-2.045-.86-2.045 3.206.671 1.323-1.247 2.215-.895 1.653.863 2.645-4.415.363-1.857.893.673 2.149-.769 1.95 1.601 1.984.512 2.083 7.484 2.05.287 3.67 1.789 1.553-.128.33-1.246 2.282 1.533-.959 4.915 1.918.606.826 1.913-.297 1.562 2.413 1.115.232 2.643 2.611-.955 1.058-2.548 2.58 5.317z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '197': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M136.018 436.038l-.992 1.603-.231 2.18 2.942.673 1.29 2.338 3.372.352.529 1.665-.43 4.447 3.934 4.218-.033 2.459-1.884.798-.695 1.053-2.545-2.873-3.075-.575-.892 2.395-2.116-2.075-1.984-.383.232-1.278-3.34.096-2.611 2.012 1.587 1.564-1.19 2.967-.034 2.774-1.52.733.595 3.535.991 1.05-.495 2.928-1.488.795-1.091 2.892-2.447.318-.33 1.493-3.472 3.715-3.207.793-1.454-1.428-.727-1.174-2.282-.096-2.512-2.159-2.943-4.386-1.157-3.85-.661-.955-2.975-1.56.099-2.676 2.678-.192 3.835-1.243 1.587-.86-.199-1.372.926-1.468-.827-1.372.76-1.5 1.984-.256.893.702 3.108-.702 4-2.46 1.72.735.991-2.46 2.975-.16.265-1.535 1.19-.96-1.124-2.08 2.149-.448 1.62-2.177 1.554.609.132-4.967-.992-1.7 2.414-1.764z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '198': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M100.71 460.12l.066 2.296-.1 2.676 2.976 1.56.661.955 1.157 3.85 2.943 4.386 2.512 2.16 2.282.095.727 1.174-.694 2.983-.166 3.836-1.487.411.66 2.503-1.454 2.437 1.157 1.709.199 1.581-2.249 3.382-1.157-.316-1.058 1.358-2.71-3.57-3.24-1.993-1.786-.063-1.884-1.455-1.422 1.36-3.769-1.265-4.793-2.374 1.983-1.995-.496-1.679-3.14 1.743-.86 1.773-4.595-1.425-.926.633-2.083-2.28.1-1.49-1.654-3.107.794-1.967-2.282-1.777 1.323-3.59 1.851-.762.595 1.652 2.645 1.588 1.918-1.143.694-3.082-.992-.477 2.314-2.385-.165-2.005 2.414.255 1.454-.796 2.81-3.312 2.281 1.497 1.587-2.293 3.902-1.02.264-1.626z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '199': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M136.184 505.216l-1.257 2.491-3.174 2.836-.495-1.386-2.348-2.963.794-.883-1.885-3.155-3.207-1.42-.231-2.117-2.017-2.401-.165-1.486-2.777-.696-1.918.38-.396 1.928-2.182 2.591-2.248-.6-.76 1.327.859 1.42-1.157 1.169-1.488.189-.661-1.736.43-2.59 2.248-3.382-.199-1.581-1.157-1.709 1.455-2.437-.661-2.503 1.487-.411.166-3.836.694-2.983 1.454 1.428 3.207-.793 3.472-3.715 1.487 1.874 2.348 1.555.363 2.094-1.653 1.015 2.315 1.332.727 1.331 2.215-1.204.893-2.474 1.851 1.428-1.091 1.078.43 1.236-.066 3.864-2.083 3.355.132 1.74-1.388.822 2.148 4.645 2.414 1.705.1 1.704z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '200': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M109.9 498.114l-.43 2.59.662 1.736 1.488-.19 1.157-1.167-.86-1.421.76-1.327 2.249.6 2.182-2.59.396-1.93 1.918-.379 2.777.696.165 1.486 2.017 2.401.231 2.116 3.207 1.421 1.885 3.155-.794.883 2.348 2.963-3.273 1.638-1.852 2.047 1.686 2.423 1.752 1.101-1.421.063-.1 1.478-2.181.975-.298 2.514-1.719.408-3.207 3.046-2.215.973-1.653 2.071-1.884-.22-2.348 1.35-1.719-.628.199-1.882-.629-1.381-3.471-.251-1.653 1.757-.727-1.789-2.182.377-.794 1.318 1.95 2.259-2.644 1.975-4.76 4.511.131 1.628-4.727 5.911-2.215 1.375-2.182-1.813.529-1.563-1.521-1.939-2.116-1.189-.661-1.815.463-2.787 2.512-1.066-2.71-1.379-1.654-4.108 1.455-1.35 3.273-.721 1.322-.88-1.95-1.915 1.124-1.163-.562-2.074 1.488-2.516 1.388.031 2.215 2.045.562 1.666 2.744-2.106.76-2.454-1.024-1.983-.265-2.204-2.347-.693-1.818.284-1.091-1.607-1.422-.788.298-2.869-.96-2.776.365-1.326-.893-2.053-.033-2.053 1.19-1.138 1.52 1.232 1.522-.252 1.421-2.024.628-2.688 3.77 1.265 1.42-1.36 1.885 1.455 1.786.063 3.24 1.993 2.71 3.57 1.058-1.358z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '201': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M129.571 516.366l1.819.85.33 1.32 1.62 1.195-.066 1.822 2.38-.408 1.753.565 1.223 1.414 1.157 3.233 1.554.125 1.157 2.259-.297 1.787-1.984 1.88.264 3.853-1.487 1.189-2.38-1.158-2.083 1.19-1.125-.502-2.05 1.127-2.38 2.315.628 1.688-1.454 3.344-1.72 1.56-1.123.188.793-4.28-3.967.688-4.364-1.75-.265 1.969-3.405.281-1.554 1.75.662 1.81.297 2.903-1.256.717-2.017-.873-1.157.343-3.042 3.617-1.719.405-1.256-2.276-1.62.905-1.884-1.03-1.918-2.183-2.05.562-1.388-.655-1.885-2.278-1.686-.75 1.257-1.311-.364-2.937 4.727-5.911-.132-1.628 4.761-4.511 2.645-1.975-1.95-2.259.793-1.318 2.182-.377.727 1.79 1.653-1.758 3.471.25.629 1.382-.199 1.882 1.72.627 2.347-1.348 1.884.22 1.653-2.072 2.215-.973 3.207-3.046 1.72-.408.297-2.514 2.182-.975.099-1.478z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '202': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M78.063 485.076l-.099 1.49 2.083 2.28.926-.633 4.595 1.425.86-1.773 3.14-1.743.496 1.68-1.983 1.994 4.793 2.374-.628 2.688-1.421 2.024-1.521.252-1.521-1.232-1.19 1.138.033 2.053.893 2.053-.364 1.326.959 2.776-.298 2.87 1.422.787 1.09 1.607 1.819-.284 2.347.693.265 2.204 1.025 1.983-.76 2.454-2.745 2.106-.562-1.666-2.215-2.045-1.388-.031-1.488 2.516.562 2.074-1.124 1.163 1.95 1.916-1.322.879-3.273.722-1.455 1.35-.198 1.254-3.901.345-1.885-2.604-1.686 1.035-1.289-2.542-1.488-.094-.793 1.507-2.083 1.35-1.256-.126-3.538 1.317-3.736 3.574-2.38.91-1.884-1.004-1.852-2.445h-2.281l-.661-1.63-2.678-.942-1.554-1.632-.364-3.14-1.19-1.603-1.587.063-.43-2.546-1.454-.88.165-2.423-1.851-3.243.86-4.79 1.487-2.208-.43-3.093 2.215-.094-.66-4.834 1.388-.41 1.025-1.424 3.24-.885 1.52-4.4 3.835.317 1.653-.823h.86l-.926-1.9-1.025-3.36 1.554-.444.43 1.395 1.52.158.563 2.377 1.322.475 2.645-2.661.694.253 3.306-1.902 1.224 1.141-.232 1.649 1.587.665.959-2.06 2.116 2.535 3.603-1.584z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '203': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M81.964 526.545l1.653 4.108 2.711 1.38-2.512 1.065-.463 2.787.661 1.815 2.116 1.19 1.52 1.938-.528 1.563 2.182 1.813 2.215-1.375.364 2.937-1.257 1.311-.86.937-2.082-.468-2.612 1.31-1.984.406-1.851.687-1.256 1.934-1.19-.78-3.67 2.9-4.596 1.278-1.52.093-1.786 2.025-1.95-1.682-1.653-.156-.86.966-2.545-1.153-3.207-.187-2.116-.623-1.157-1.621.826-1.778 2.645-2.558 1.025-2.935-.793-.78 1.752-2.157 2.645-2.282-.596-.657.298-2.346.959-.814-.562-2.567.76-1.817-1.818.094-.76-.784 3.735-3.574 3.538-1.317 1.256.125 2.083-1.35.793-1.506 1.488.094 1.29 2.542 1.685-1.035 1.885 2.604 3.901-.345z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '204': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M146.4 455.973l3.305-.543 1.455 1.532-.86 2.489 1.653 2.232-.66 2.071 1.289.733-1.687 5.189-2.777.159-1.52-1.4-2.778 2.767-.628 2.449.331 1.843 1.29 1.715-1.125.762-.496 2.253.53 1.587 1.652.063 2.48 2.727.628 2.313 1.653 1.647.793 3.83-.826 1.392-1.918-1.044-2.545.981 1.686 2.403-2.215 1.454-1.29-1.328-2.28 1.58-1.687.538-2.083 2.274.067 1.01 2.413 2.43-.033 1.924-2.347.41-1.686-1.199-2.976-1.924-.1-1.704-2.413-1.705-2.148-4.645 1.388-.822-.132-1.74 2.083-3.355.066-3.864-.43-1.236 1.091-1.078-1.851-1.428-.893 2.474-2.215 1.204-.727-1.33-2.315-1.333 1.653-1.015-.363-2.094-2.348-1.555-1.487-1.874.33-1.493 2.447-.318 1.09-2.892 1.489-.795.495-2.928-.991-1.05-.595-3.535 1.52-.733.033-2.774 1.19-2.967-1.586-1.564 2.611-2.012 3.34-.096-.232 1.278 1.984.383 2.116 2.075.892-2.395 3.075.575 2.545 2.873.695-1.053z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '205': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M131.753 510.543v.85l4.596 4.156.397 2.233 1.223.88 4.463-.503 4.33-2.296 2.613-.535 4.496-2.014 3.835.567 2.413 2.768 1.885 1.856 1.124 2.828-.926-.408-2.546.345-1.719 3.926-1.025 1.569-1.884.721-1.058-2.667-2.71.785-5.687.439-1.62-3.045-1.058.534-4.265-.408-1.223-1.414-1.752-.565-2.38.408.065-1.822-1.62-1.195-.33-1.32-1.819-.85-1.752-1.1-1.686-2.424 1.852-2.047 3.273-1.638z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '206': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M163.128 521.333l.595 1.76-.595 2.699.793 2.04 1.554 1.191-.165 2.727 2.314 4.354 2.314-.094.595 1.002-1.587 2.034-.562.938-3.47 1.532-1.026 2.25 1.323 4.154 1.884 2.933-2.876-.623-4.496 1.31-2.645-.094-.794-1.872-1.52-1.498-2.15.063.232-2.373-2.513-2-.462-1.718-2.38.281-2.216-1.125-1.355.781-1.885-.219.232-2.22-1.025-.156-2.248-1.94 1.487-1.19-.264-3.852 1.984-1.88.297-1.787-1.157-2.259-1.554-.125-1.157-3.233 4.265.408 1.058-.534 1.62 3.045 5.686-.44 2.711-.784 1.058 2.667 1.884-.721 1.025-1.57 1.72-3.925 2.545-.345z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '207': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M167.095 550.853l.43.967-.463 2.339 1.72 5.637.958 1.432-.727 2.333 2.71.218-.066 2.673-.033.155-.033.125-2.512-.497-2.348 1.895-1.818-1.927-2.678 1.585 1.984 4.068v.93l-2.48 1.707-1.256-4.841-1.19-1.429-.86-2.579-1.223-1.586 2.645-.621-.694-2.707-.166-4.95.893-1.123-.165-3.117 4.496-1.31z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '208': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M159.723 551.54l.165 3.117-.893 1.122.166 4.951.694 2.707-2.645.621 1.223 1.586.86 2.579 1.19 1.429 1.256 4.841 2.48-1.706v-.931l-1.984-4.068 2.678-1.585 1.818 1.927 2.348-1.895 2.512.497v.497l-1.719 1.243 1.488 2.546-2.083 2.234.231 1.52 1.687 1.675-4.2 3.656-2.446-1.518-.066-1.146-2.083-.93-.66-1.334-3.439.9-3.042-.186-2.347-1.272-1.19.28-2.942-1.024-.992.434-4.43-2.017-.662 1.117-4.364 1.49-1.421-.156-.661-1.303-1.72-.496.893-2.048.926-1.242 5.72-2.33-.563-1.367 1.885-.902-1.852-2.83.199-2.333 2.942-.81 3.009-3.768 2.115-.966-.826-1.154 1.587-1.465.165-1.591 1.885-1.997 2.149-.063 1.52 1.498.794 1.872z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '209': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M138.994 537.45l2.248 1.94 1.025.156-.232 2.22 1.885.22 1.355-.782 2.215 1.125 2.38-.281.463 1.719 2.513 1.999-.231 2.373-1.885 1.997-.165 1.59-1.587 1.466.826 1.154-2.115.966-3.009 3.768-2.942.81-.199 2.333 1.852 2.83-1.885.902.562 1.367-5.72 2.33-.925 1.242-1.322-.435-2.612-2.64-4.265.031-1.653-2.672-1.752.093-.265-2.114-.892-1.587-1.19.436-2.744-2.365-2.91.124-2.083 2.956.827 1.43-2.05 1.306-1.124 1.492-.496 2.827-3.67-.683-2.181-1.118.165-1.274-1.752-1.306-.794-1.865 2.215-1.027.992-1.244-1.388-.965.33-2.802.76-1.246-1.256-1.464 1.72-.405 3.04-3.617 1.158-.343 2.017.873 1.256-.717-.297-2.902-.662-1.811 1.554-1.75 3.405-.281.265-1.969 4.364 1.75 3.967-.687-.793 4.28 1.124-.188 1.719-1.561 1.454-3.344-.628-1.688 2.38-2.315 2.05-1.127 1.125.501 2.082-1.19z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '210': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M135.423 570.894l-.892 2.048 1.719.496.66 1.303.034 3.039-1.72.433.265 1.426 1.984.495 1.322 1.425.133 3.621.694.99-1.091 2.566-1.885-.618-.529 2.01.992 1.42 1.852-.309.529 1.36-1.852 3.92 1.653.863-1.19-.339-1.223 1.357-4-2.745-1.39 1.511-1.553.031-2.48-.894-1.256 1.08-2.314-.834-.033-1.48-1.653-.896-1.752.309-2.215-1.482-1.786-3.244.562-1.607-.694-1.237-2.016.526-1.19-1.392-3.108.402-.595 1.114-1.025-.093-2.447-3.248-.925-2.476.958-2.168 1.786-.65 2.578-2.573.992-4.374-.43-2.204.496-2.827 1.124-1.492 2.05-1.305-.827-1.43 2.083-2.957 2.91-.124 2.744 2.365 1.19-.436.892 1.587.265 2.114 1.752-.093 1.653 2.672 4.265-.03 2.612 2.639z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '211': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M166.996 580.103l-1.389 1.58.96.929-1.323 2.908-1.157 6.955-1.124 1.945-1.29 1.667-1.058 3.947-1.09 1.973-.893.77-1.587 1.201-.562-.8-3.802-.093-4.596-1.602-1.09-1.48-3.108-1.264-3.439-2.467-1.157 1.11-1.653-.863 1.852-3.92-.53-1.36-1.85.31-.993-1.422.53-2.009 1.884.618 1.09-2.566-.693-.99-.133-3.621-1.322-1.425-1.984-.495-.264-1.426 1.719-.433-.033-3.039 1.421.155 4.364-1.489.662-1.117 4.43 2.017.992-.434 2.942 1.023 1.19-.279 2.347 1.272 3.042.186 3.438-.9.661 1.334 2.083.93.066 1.146z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '212': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M416.933 667.344l-4.066.394-1.29 2.85-2.744 1.88-.595 1.727-1.587-.242-.363 1.15-1.422.879-1.223-.334.198 3.27-1.455 1.754-3.603-.06.033-1.513-1.785-.272-2.976-6.965-2.248-.303-.1 1.666-2.38 1.97-1.256-1.606-1.851 1.12-2.083-.696-1.256 1.696-2.215-.09-1.819-2-1.686-.394-1.421 1.06-1.95 3.27-1.555-1.21.1-2.06-2.778.031-1.983-.576-.959-2.454 3.703-.849 3.24-2.608 2.644-.273 1.323-.789-.827-1.335 1.058-1.64-.396-2.247 1.454-1.063-.165-2.706 2.843-.7 1.223.883 1.753-.852 1.62-2.22 1.553-.335 1.356-2.04.033-1.613 2.48-2.072 2.611.975.661 1.523 1.257-.335 2.678 4.353 2.347 1.186 1.422-.669 2.777 2.008 2.744-.548 1.884.943.298 1.155 4.397 4.071-.562 1.366 1.322 1.609z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '213': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M365.788 648.766l.199 1.188 3.372-1.066 4.595.731 1.224 4.08 2.446 1.857 1.025 2.22.165 2.706-1.454 1.063.396 2.248-1.058 1.639.827 1.335-1.323.79-2.644.272-3.24 2.608-3.703.849.959 2.454 1.983.576-1.289 1.908.661 1.09.132 5.595 1.091.756.067 1.39-1.356.302-.86 1.51-1.686-.09-1.553.875-1.687-1.842-1.553-.785-.728.725.86 3.412-.827.905-2.578-1.931-1.819.543-.43-1.329-2.115-1.238-1.786-1.722.893-1.843.132-2.843-.363-2.845-1.19-1.392-.53-2.938 1.422-1.485-.86-1.698.166-2.184-.827-2.337.595-1.488-1.157-1.761.066-1.641 1.488-.152.232-2.858.66-2.19 1.455-1.918 1.72-1.127v-1.37l1.95-.091 3.273-1.92 1.389-1.554z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '214': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M349.357 619.41l-.264 2.24-3.273.982.727 2.299-.694 1.47 2.182 1.287-.298 1.745 1.257 1.224-.926 2.356 3.042 1.59 1.256.092 1.388-1.223 3.042 2.385 2.446-.092 3.604 1.59-.132 2.931.562 3.327 2.05.275-.76 2.562 1.222 2.316-3.173-2.011-1.389 1.554-3.273 1.92-1.95.091v1.37l-1.72 1.127-1.454 1.917-.661 2.19-.232 2.859-1.488.152-.066 1.64-3.372.547-3.405-.03-2.017-2.461-.297-3.01-3.538-1.49-.297-1.857 1.19-2.132-1.356-1.157v-1.554l-1.587-.396-1.818.914-1.19 1.523-1.752-2.315-2.248-1.433-1.819.244-.43-1.83-2.512.061-.562-1.037-2.116-1.19-.264-2.228-2.744-2.901.562-1.467-1.091-1.07 1.719-2.599 3.405-2.754 1.058.582 1.421-.918 1.224.336 2.149-1.132 1.884 2.816 3.34-1.04.892-4.165-.794-1.9 4.464-.95.727-1.257 1.653-.123.364-2.853 1.818-2.087 1.917.952 1.918 1.933.992-1.289z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '215': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M341.588 659.63l-3.306 1.733-1.025 2.551-1.29 2.337-1.09.91-3.57.699-1.72 3.487-.86 1.636-1.42 1.182-3.737-.94-2.942 1.909-.364.969-2.71-.697-.596 1.15-2.281.606-1.851-2.27.198-1.97-1.818-.757-1.918-2.304 1.752-.151.53-1.244 1.388-.273-1.058-3.277 1.455-1.61 2.975-1.396-.364-2.127.794-2.098h1.62l.562-3.62 1.587-1.492-.728-2.344 1.686-1.463h1.389l1.389-1.158 2.611-.64 1.819-.244 2.248 1.433 1.752 2.315 1.19-1.523 1.818-.914 1.587.396v1.554l1.356 1.157-1.19 2.132.297 1.856 3.538 1.49z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '216': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M342.745 605.241l1.95 1.6 1.786.647 1.29-.523 1.653 1.6-.199 1.107 1.455 2.06-1.157.37-.166 2.734-.694 2.058 1.752.982-1.058 1.535-1.487-.553-.992 1.29-1.918-1.934-1.917-.952-1.818 2.087-.364 2.853-1.653.123-.727 1.257-4.464.95.794 1.9-.893 4.164-3.339 1.04-1.884-2.815-2.15 1.132-1.223-.336-1.421.918-1.058-.582-3.405 2.754-1.72 2.6-1.421-1.285-3.835.55-1.356-2.11.662-1.713-1.95-1.592-1.026-4.349.86-1.38-.76-4.508-1.356-1.166 2.48-1.628-.992-1.628-2.844-1.843 2.083-1.291 3.009-.77 1.686-2.152-.496-1.539 1.984-2.524 2.744-.247 1.487-2.895-.132-1.08 2.248-2.898 2.48-.062 2.149 3.608 2.578.4.992-1.818 1.752.34 1.389-1.759-1.19-3.424 2.81 1.142 2.81.154.628-1.019 2.15.463-.398 2.13.562 2.929z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '217': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M344.332 669.558v.03l-1.653 2.486-1.818.818-.959-2.546-2.71.213-.563-.607-.661-3.7 1.29-2.338 2.578 1.64 3.769-.092 1.95 1.002z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '218': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M340.86 672.892l1.82-.818 1.652-2.486-.033.182 3.273-.242-.496 2.91 1.686-.303.628 1.212-.595 2.635-2.446 1.937-2.678-.787-1.19-2.786-1.389-.03h0v-.03z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '219': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M341.092 674.316l1.389.03 1.19 2.786-.132-.03-1.554-.424-4.53 2.028-1.785-1.15-.363-3.664v-.06l2.413.242.959-.94z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '220': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M341.092 674.316l-2.413-1.181-.959.939-2.413-.243v-.09l-1.918-.697-.959.878-1.355-.182-.298-2-1.19-.393 1.72-3.487 3.57-.698 1.09-.91.662 3.7.562.607 2.711-.213.959 2.546.231 1.394v.03z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '221': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M350.382 661.576l1.157 1.761-.595 1.488.827 2.337-.165 2.184.86 1.698-1.423 1.485.53 2.938 1.19 1.392.363 2.845-.132 2.843-.893 1.843 1.786 1.722 2.116 1.238.43 1.329-2.282 1.84-1.62-1.387-1.058 1.66-2.248.452-.529-1.63-1.256-.09-3.835 1.479-.76-1.479-1.687-1.48-1.917.514-2.248-1.932-1.356.664-2.314-1.117-1.223-.907 1.421-2.206-.793-1.3.066-1.844-.926-1.513 1.19-1.967-1.289-1.635.661-.879.96-.878 1.917.696v.152l.363 3.664 1.786 1.15 4.529-2.028 1.554.424.132.03 2.678.787 2.446-1.937.595-2.635-.628-1.212-1.686.303.496-2.91-3.273.242.033-.212 1.223-3.094-1.95-1.002-3.769.091-2.579-1.639 1.025-2.551 3.306-1.732 2.017 2.461 3.405.03z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '222': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M386.22 674.71l-1.488 1.15-1.984 3.088 1.786 2.117-1.356 2.328.397.544-.364 2.9.926.906 3.802.332 1.256 3.2-.595 1.809-1.322 1.628-.76-.603-1.62.995.628 2.892h2.909l.364 1.596-2.513.09.496 1.626-1.091 1.084-.165 2.226-1.521.782-.794 1.924.265 1.983-3.34.75-1.223.692-.793-1.202 1.322-3.155-.86-.722-1.255 1.894-2.348 1.472-.958 1.352 1.785 3.483.496 2.16-3.77.78-3.173-.36-1.19-.75-1.62-2.07.826-1.802-1.884-5.137-1.091-1.503-.165-2.436-3.77-2.257 1.62-1.566-.23-1.536-3.472-1.868-1.885-.392-2.215-2.955-.132-1.66 2.281-1.84 1.819-.543 2.578 1.931.827-.905-.86-3.412.728-.725 1.553.785 1.687 1.842 1.553-.875 1.686.09.86-1.51 1.356-.302-.067-1.39-1.09-.756-.133-5.595-.661-1.09 1.29-1.908 2.776-.03-.099 2.059 1.554 1.21 1.95-3.27 1.422-1.06 1.686.394 1.819 2 2.215.09 1.256-1.696z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '223': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M354.151 690.52l.132 1.66 2.215 2.954 1.885.392 3.471 1.868.232 1.536-1.62 1.566 3.769 2.257.165 2.436 1.09 1.503 1.885 5.137-.826 1.802 1.62 2.07-2.281.57-.364-.93-8.695 1.71-.43 1.648-3.636-.72-4.629.21-2.149.36-.959-.779-1.983 1.14-1.058 2.786.132 1.647-1.058.958-3.107.599-3.207-.18-.695-.748-1.752 1.826-1.421-.45-3.439-2.903-1.686-2.966-1.587-1.17.86-2.308-.364-2.16.661-1.921 3.538-.781-.198-1.562 1.487-1.021.496-2.134 1.95-.692-1.42-4.753-.993.392-1.752-.693-.595-1.565.43-.452-.265-8.531h2.215l1.323-.755 1.785-3.2 2.314 1.117 1.356-.664 2.248 1.932 1.917-.513 1.686 1.479.76 1.479 3.836-1.479 1.256.09.53 1.63 2.247-.453 1.058-1.66z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '224': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M311.57 668.466l-.53 1.244-1.752.151 1.918 2.304 1.818.757-.198 1.97 1.851 2.27 2.281-.605.595-1.15 2.711.696.364-.97 2.942-1.908 3.736.94 1.422-1.182.86-1.636 1.19.394.297 2 1.355.181-.66.879 1.289 1.635-1.19 1.967.925 1.513-.066 1.845.793 1.3-1.421 2.205 1.223.907-1.785 3.2-1.323.755H328l.265 8.531-.43.452-2.182-1.024.694-2.11-.727-1.144-2.017-.814-3.339-.181-.132-1.176 2.215-2.142-2.149-.634-.496-1.358-3.471 1.841-2.579.603-.33 1.78-3.307-.513-1.752 1.75-4.298 1.175-1.355-.18-2.38 1.506-1.918-.06-1.488.843.232-3.646 1.025-4.103 1.983-4.378-.76-1.028.198-2.267-1.454-.695-1.587.393 1.289-3.449 1.322-.847-.33-1.453-.893-3.756 3.207.242 2.579-3.668.727-3.763 1.356.182 2.578 2.185z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '225': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M406.288 675.103l.066 2.029.86 1.695 3.537 3.175 1.355 1.784.53 2.659.859 1.268 1.719.272 1.388 1.479 3.604 7.72-3.538 5.388.265 1.204-2.215 3.067 1.587 1.442 2.975.18 1.157-1.232 1.951.692 2.017 2.253-.166 1.381 1.091 2.372-.066 1.02-2.876 3.658.661 2.128-1.322 1.767.793.959.066 2.604-1.124.449-1.421 1.854-.86-1.435-1.19.508-3.042-1.765-1.553-2.036-1.29-.419-.529-1.557-2.413-.33-1.091-1.528.397-2.368 1.057-1.92-1.653-.96-1.19-1.47-.793-2.041-4.331-.42-.628.72h-2.843l-1.554 3.242-2.116-.33-1.356.9-2.578-1.98-1.455-2.162-.529-1.652-3.604 1.021-1.421-1.081-.265-1.983.794-1.924 1.52-.782.166-2.226 1.09-1.084-.495-1.625 2.513-.09-.364-1.597h-2.91l-.628-2.892 1.62-.995.76.603 1.323-1.628.595-1.81-1.256-3.199-3.802-.332-.926-.906.364-2.9-.397-.544 1.356-2.328-1.786-2.117 1.984-3.088 1.488-1.15 1.851-1.121 1.256 1.605 2.38-1.969.1-1.666 2.248.303 2.976 6.965 1.785.272-.033 1.512 3.603.06 1.455-1.754-.198-3.269 1.223.334z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '226': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M327.835 699.11l.595 1.566 1.752.693.992-.392 1.422 4.753-1.95.692-.497 2.134-1.487 1.021.198 1.562-3.538.78-.66 1.922.363 2.16-.86 2.309 1.587 1.169 1.686 2.966 3.439 2.904 1.421.449-1.454 1.884 1.289.45.463 1.614-4.364-.15-1.389 1.525-1.124.239-.033 1.614-.959.776-2.777.03 1.686-2.51-2.644-.448-4.2 1.703-.76 1.405-8-.359.727-2.45-4.033-4.516-2.15.3-.065-1.407 2.48-1.107-1.588-1.976-.727-2.906 1.984-.69 1.983-1.739-1.058-2.31-1.256-.57.661-1.92-2.116.39-1.587-.93-2.71.9-.463-1.501.925-4.116-3.339 3.125-1.686-1.532.86-1.142.496-3.97 1.851.211.364-1.263-1.752-1.204-.067-1.324 1.058-2.65 1.488-.844 1.918.06 2.38-1.507 1.355.181 4.298-1.176 1.752-1.749 3.306.513.331-1.78 2.579-.603 3.471-1.841.496 1.358 2.149.634-2.215 2.142.132 1.176 3.34.18 2.016.815.727 1.145-.694 2.109z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '227': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M442.952 602.839l2.413 1.509 1.95 1.755.629-2.34 4.33.061.298 1.325 2.612 2.247.926 2.707.925 1.138 3.075-.246 2.546 4.394 2.28 2.825-.627 1.32 1.95.859-.892 1.196-.298 2.146-1.19 1.44-.959-.919-1.124 1.042-2.017.307.628 1.562-2.512-.061-1.52.582-1.059-.643-2.777.643-3.835-3.524-1.19-.245-2.248 1.195-.926-.98-.959-2.484-1.884-.398-1.984.398-1.355 1.87 1.752 2.452.033 2.298-1.984.428-.793 1.041-1.455-1.439-2.909-.919-.926 1.715-2.71 1.286-.893-.765-2.744-.796.231 1.99-.595 1.59-1.653.398-2.116-.336-.463 2.17-1.256-.03-2.678-1.835.1-2.264-2.315-.367-4.066-1.96-2.017-3.614.694-1.533-1.388-.49-1.025-4.418-.794-1.72 1.422-1.166 1.72.829 2.313-1.444-.66-4.241 1.322-.646.495-4.308 1.19-.431 1.224 1.57 3.603-1.324 2.546.8.165 3.047 1.686 1.845 1.488.308 2.05-.677 2.843 1.906 2.612.676 1.388-.307.397-1.414 1.852-.523-.397-2.306.86-1.231-.794-1.046 2.91-1.14 2.049-2.617z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '228': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M372.301 620.791l4.563 2.454.396.827 2.15.307 1.719-1.655 1.85 1.808 1.092 2.941 2.281.858.198 2.51-2.149 1.622.926 1.835-3.074 4.858 1.818.947.33 1.252-1.289 1.465 1.52 2.196 2.084-.091 1.355 1.769 3.075.03.363 2.103-2.479 2.072-.033 1.614-1.356 2.039-1.553.335-1.62 2.22-1.753.852-1.223-.882-2.843.7-1.025-2.221-2.446-1.856-1.224-4.08-4.595-.732-3.372 1.066-.199-1.188-1.223-2.316.76-2.562-2.05-.275-.561-3.327.132-2.932-3.604-1.589-2.446.092-3.042-2.385-1.388 1.223-1.256-.092-3.042-1.59.926-2.356-1.257-1.224.298-1.745-2.182-1.287.694-1.47-.727-2.3 3.273-.98.264-2.24 1.058-1.535-1.752-.982.694-2.058.166-2.735 1.157-.368-1.455-2.06.199-1.108-1.654-1.6-1.289.523-1.785-.646-1.95-1.601 1.223-2.741-.43-2.034 1.785.308.727-.955 1.62-.463 1.885.833.925 1.695 1.885.678 1.818-2.96 2.81-.277 2.182 1.85 1.852 3.05 1.554.831h3.008l3.042.955.892 1.846 1.356 1.17 1.256 2.183-1.752 2.49.43 3.992-.496 2.762z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '229': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M463.879 625.176l1.322 1.195-.297 4.164.595 2.631-.992 2.782-2.182 2.537-1.322.824.099 1.313-.992 1.282-3.57-1.831-.463-1.07-1.587-.518-1.455-1.284-1.851.58-1.95-1.894-3.043 2.445-2.016-.184.992 3.665-1.653 4.911.628 2.164-1.786 4.812-2.082 1.49-2.38 2.678-4.133 2.31-4-.122-.232-1.398-2.215-2.798-2.215-.639-.595-1.186.628-1.583 2.744-.944 1.752-1.401-3.174-2.804-.198-3.05-1.554-.335.794-4.578-1.29-.855-2.942-.58-2.182-2.17.595-1.132 1.256.03.463-2.17 2.116.336 1.653-.398.595-1.59-.231-1.99 2.744.796.892.765 2.711-1.286.926-1.715 2.91.92 1.454 1.438.793-1.04 1.984-.43-.033-2.297-1.752-2.451 1.355-1.87 1.984-.4 1.884.4.96 2.483.925.98 2.248-1.195 1.19.245 3.835 3.524 2.777-.643 1.058.643 1.52-.582 2.513.061-.628-1.562 2.017-.307 1.124-1.042z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '230': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M406.982 618.122l1.025 4.418 1.388.49-.694 1.533 2.017 3.615 4.066 1.959 2.314.367-.099 2.264 2.678 1.835-.595 1.131 2.182 2.17 2.942.58 1.29.856-.794 4.578 1.554.336.198 3.05 3.174 2.803-1.752 1.4-2.744.945-.628 1.583.595 1.186 2.215.64 2.215 2.797.231 1.398-2.512 1.276-2.943.213-2.975 1.489-3.438 3.885-.959.425-1.587-.88-1.322-1.609.562-1.366-4.397-4.071-.298-1.155-1.884-.943-2.744.548-2.777-2.008-1.422.67-2.347-1.187-2.678-4.353-1.257.335-.66-1.523-2.613-.975-.363-2.103-3.075-.03-1.355-1.77-2.083.092-1.52-2.196 1.288-1.465-.33-1.252-1.818-.947 3.074-4.858-.926-1.835 2.15-1.622-.199-2.51-2.281-.858-1.091-2.94 4.926-3.65 2.215.737 1.95-.522 1.984 1.288.43 1.196 3.24.736.264-.89 2.777-.643 2.58-1.35 1.884-2.638z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '231': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M442.952 602.839l-2.48-.277-2.05 2.617-2.909 1.14.793 1.046-.86 1.23.398 2.307-1.852.523-.397 1.414-1.388.307-2.612-.676-2.843-1.906-2.05.677-1.488-.308-1.686-1.845-.165-3.047-2.546-.8-3.603 1.324-1.223-1.57-1.19.43-.496 4.309-1.323.646.661 4.241-2.314 1.444-1.72-.83-1.42 1.168.793 1.719-1.752.675-1.885 2.639-2.579 1.349-2.777.644-.264.889-3.24-.736-.43-1.196-1.983-1.288-1.951.522-2.215-.737-4.926 3.65-1.851-1.81-1.72 1.656-2.149-.307-.396-.827-4.563-2.454-.33-1.135 3.438-1.135 1.918-1.811.363-1.904 1.323.092 3.14-2.243 3.207 1.382 2.744-2.489.265-1.937 1.487-1.477-.793-1.538.727-2.525 1.356-.74.661-4.006-.562-.863 1.322-2.499 1.356.34.793-2.13 6.117-2.254 1.818.71 2.149-1.08 2.116.185 4.298-1.916 2.115-.216 1.918.432 1.719-.587 1.256-1.855 4.43.495 1.091 2.195 3.273 1.544.463-1.42 1.587-1.762.33-2.103-.032 2.504 1.95 1.855 1.72.71 2.909-.432 3.008 2.501 1.752 2.562.926.37z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '232': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M344.464 536.73l.926.97.397 4.035-.066 4.03-.728 1.968 1.257.593h4.066l2.347-2.03 1.72-.343 1.19.968 2.413.531 1.091-.343 4.331-.094 1.058 3.059-.496 2.245 4.562.032.067 1.06 2.81.498-.199.935-2.38 1.652 1.322 2.927-.826.81-2.81-.686.595 2.676-.43 2.675-2.777-.342-.33.964 2.446 2.113 1.421.28.827 3.477-2.446.031-1.654 2.886-1.19 1.178.595 1.148-1.653 1.704 1.984 1.611-2.017.93-.595 3.869-1.62 1.825-2.48.247-.098 1.268-3.604-.804-.496 1.979-2.149 1.885.265 1.08-2.91 1.545-1.322 1.265.033 1.821-.86 2.96-.727.956-1.785-.308.43 2.034-1.224 2.741-3.24-4.898-.562-2.93.397-2.129-2.149-.463-.628 1.019-2.81-.154-2.81-1.142-1.025-1.081-.661-2.131-1.653-.03v-3.308l-.629-1.824-2.446-.897-.33-1.888 3.074.093-1.422-2.167.53-.681-1.257-2.479-1.851.31-3.273-2.417 1.785-1.489 1.322.744 1.257-1.488 3.372 1.83 2.083-2.016.991-.094.596-2.451 1.487-1.615 1.587-3.2 1.554-1.15 3.24 1.4 3.273-5.38-3.24-2.677.298-2.585-1.488-1.029.529-1.309 2.645-1.403-.893-1.528.198-1.248 1.653.062.133-2.278-1.554-1.905-.232-4.563 1.918-1.783-.066-1.564z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '233': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M391.245 598.462l.562.863-.661 4.007-1.356.739-.727 2.525.793 1.538-1.487 1.477-.265 1.937-2.744 2.49-3.207-1.383-3.14 2.243-1.323-.092-.363 1.904-1.918 1.81-3.438 1.136.33 1.135-1.983-.337.496-2.762-.43-3.992 1.752-2.49-1.256-2.184-1.356-1.169-.892-1.846-3.042-.955h-3.008l-1.554-.831-1.852-3.05-2.182-1.85-2.81.278-1.818 2.959-1.885-.678-.925-1.695-1.885-.833-1.62.463.86-2.961-.033-1.82 1.322-1.266 2.91-1.544-.265-1.081 2.149-1.885.496-1.979 3.604.804.099-1.268 2.48-.247 1.62-1.825 1.057.804 2.414-.03 1.487 2.257 1.058-.99 1.521 1.763 1.752-.711 2.612-1.917-.264-1.857 1.818-1.578 1.09 3.435 1.555.37.033 1.33 2.446.248.926-.65 1.719 2.01-.33 1.761.396 2.564 1.95.03 3.01-.771.727.555-.596 3.488 1.819 1.296z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '234': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M397.593 555.343l.43.81 2.347.81-.232 2.055.992 4.108-.132 1.337 2.91.84 2.71 2.547.033 1.646 2.447 2.856 4.264-.744 3.869.62 1.223.776 2.116 2.42 1.025.093.264 3.41 2.579 1.393.297 1.518 1.488.866-.165 1.362 3.339 2.475-.33 2.103-1.588 1.761-.463 1.421-3.273-1.544-1.09-2.195-4.43-.495-1.257 1.855-1.72.587-1.917-.432-2.115.216-4.298 1.916-2.116-.186-2.15 1.081-1.817-.71-6.117 2.254-.793 2.13-1.356-.34-1.322 2.499-1.752-.308-1.819-1.296.596-3.488-.728-.555-3.008.772-1.95-.031-.398-2.564.331-1.761-1.72-2.01-.925.65-2.446-.248-.033-1.33-1.554-.37-1.091-3.435-1.818 1.578.264 1.857-2.612 1.917-1.752.71-1.52-1.761-1.059.989-1.487-2.258-2.414.031-1.058-.804.595-3.87 2.017-.929-1.984-1.61 1.653-1.705-.595-1.148 1.19-1.178 1.654-2.886 2.446-.03-.827-3.479-1.421-.28-2.447-2.112.331-.964 2.777.342.43-2.675-.595-2.676 2.81.685.826-.81-1.322-2.926 2.38-1.652.76-1.153 3.042-.78.265-1.59 1.454.094 1.653 1.123-.528.997 1.586 2.088 2.05.218.033 1.465 2.48.591 3.107-1.557 1.455.125 4-1.62 1.422 1.121 2.711-1.09z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '235': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M397.593 555.343l-.893-.468-2.711 1.091-1.422-1.122-4 1.62-1.455-.124-3.107 1.557-2.48-.591-.033-1.465-2.05-.218-1.586-2.088.528-.997-1.653-1.123-1.454-.094-.265 1.59-3.041.78-.76 1.153.198-.935-2.81-.498-.067-1.06-4.562-.032.496-2.245-1.058-3.06-4.33.095-1.092.343-2.413-.53-1.19-.969-1.72.344-2.347 2.03h-4.066l-1.257-.594.728-1.967.066-4.031-.397-4.035-.926-.97-.066-1.503.926-2.443 2.975-1.128 2.083-1.724 3.207.063 2.05-.47.463-2.039-.199-3.86-1.421-2.795.529-1.415 2.512.189 1.984-1.572.562.723 3.504-1.069 3.174-.283 1.918-.786 1.322 1.51 5.455-1.95.298-2.77 2.38-.22 1.091-1.952 2.116-.031 3.769 3.368 3.14 1.605 1.984.503 1.62 1.132.033 1.98-.661 1.949 3.835 1.319.132 1.538-1.554 1.79-1.322 3.763-1.389.345-.33 4.104-3.505 2.004.496 2.503 1.521 2.314 4.496 1.595.463 1.75-.661 1.936.562 2.185.992-.281 1.719 2.964-.165 2.307z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '236': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M317.289 529.932l.793 1.568-.925.94-1.091 3.07 3.636 3.348-.033 1.533 1.389.312.958 3.626-1.62 1.187 3.538 3.216 1.62.093-.43 1.217-5.752 1.373-3.538-.125-1.322-1.03-1.521-3.058-.76-2.592-1.687-.344-4.595-2.468.562-2.158-1.223-.97.76-1.47-1.256-2.254-2.248.939-.298 1.002-3.57.938-1.356-1.658-2.48-1.44-1.884.72-1.388 1.627 1.917.908-2.876 2.127-1.29-1.439-4.396-1.533-1.058-3.225-2.976.69.265-1.724-1.885-1.159-.363-2.288.958-2.792 2.513.157 3.901.251 1.157 1.568 1.785-.72 1.455-1.79h1.587l.397-2.353 1.256-.911 2.48 2.386 2.148.847 2.017-.408.496-1.224-.694-1.413.826-2.198 1.323.534 1.355-1.697 1.025 2.953 3.372.691 1.257 1.695 2.115.408 2.348-.376 1.157 4.172z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '237': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M359.507 518.033l-1.984 1.572-2.512-.189-.53 1.415 1.422 2.795.199 3.86-.463 2.039-2.05.47-3.207-.063-2.083 1.724-2.975 1.128-.926 2.443.066 1.503-2.016.595.066 1.564-1.918 1.783-.264 3.157.463 1.062-.76 2.061-2.05-.78-4.563 1.904-1.785.25-1.157-3.56-1.356.125-1.124 2.374-2.446 1.56-1.62-.093-3.538-3.216 1.62-1.187-.958-3.626-1.389-.312.033-1.533-3.636-3.349 1.09-3.07.926-.94-.793-1.567 2.05.659 2.677-.22.595-1.505-.562-1.85-1.884-.973-.264-1.538 1.653-2.826-1.091-1.477 3.802-3.3.892 1.917 3.438 1.415 2.348 1.602.463-2.011 2.644-2.798 1.323.723.793-1.163 1.356.157 4-1.227 1.389-1.92 1.52-.283 1.091-1.48-.958-1.511 2.644-1.954-.132-2.837 3.67.662 1.686-.851.562 1.86 1.322.662-.694 1.828 2.083.945.033.945 1.752 1.07-.43 1.605 2.15 2.046z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '238': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M342.944 481.874l.396.856-.595 2.917 1.058 1.014-1.19 1.489-2.248-2.503-.86-.032-.66 2.313 1.388 1.52.628 1.93-1.323 2.026-3.074 1.391-3.438 3.508.628 2.18-2.116.631-1.752-.915-.232 1.736-1.29.631-3.074-.158-1.554-.978-1.09-2.432-1.588-.19-1.355 1.517-1.488-1.137-1.62.253-1.157-1.295-2.314.19-1.455-.886-2.71.6 1.322 1.517-.066 1.421-3.042.537-1.554 1.988 1.29 1.735-3.174 1.45-1.686 1.671-.133-1.292.86-3.532-3.901.094-1.422-.6.199-3.504-2.81-3.064-.166-1.518 2.38.57 1.72-.918 1.29 1.202 1.553-1.202-.33-2.024-2.315-.411-1.851-1.108-1.587-2.026-1.455-4.118 1.885.507 1.983-2.377 1.025.539 1.455-1.174 3.769.698 1.884-.666 2.744 3.487 1.389-1.14 1.917 1.774 2.579-1.838 1.455-.064 2.38 3.137-1.323 1.394-.099 1.203 3.141 2.5.43-1.772 2.71 1.993.695-.538-.198-4.146.562-2.503.992-.729-.76-2.885-.398-4.252-.991-2.318 1.124-.858 2.942-.826.132-1.685 2.678-1.272 3.009.636.892 1.304-1.388 2.86.264 2.127 3.703 2.19-.496 1.46 2.215.476.1 1.268 1.752-.159.86-1.11z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '239': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M370.384 488.878l2.083 3.672-2.182 1.107.562 2.118 2.71.98.199 1.264 2.182 1.99.529 2.589-.926 1.798.298 2.24 1.653.882 2.05 1.986-.331 1.732-1.091 1.952-2.38.22-.298 2.77-5.455 1.95-1.322-1.51-1.918.786-3.174.283-3.504 1.07-.562-.724-.298-1.73-2.149-2.045.43-1.605-1.752-1.07-.033-.945-2.083-.945.694-1.828-1.322-.662-.562-1.86-1.686.851-3.67-.662-1.388.788-.066-4.07 1.52-1.357-1.355-4.454-2.347.474-.364-3.73-1.323 1.17-2.215-.95 1.323-2.024-.628-1.931-1.389-1.52.661-2.313.86.032 2.248 2.503 1.19-1.49-1.058-1.013.595-2.917-.396-.856 1.223 1.015 3.174-.476 1.388-.983 2.645-.127 2.182-1.11 2.017 2.03 1.851-.508.827-1.142 2.116-.952 3.405 3.205.066 3.296 4.53 1.458z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '240': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M347.076 505.532l.132 2.837-2.644 1.954.958 1.511-1.09 1.48-1.521.283-1.389 1.92-4 1.227-1.356-.157-.793 1.163-1.323-.723-2.644 2.798-.463 2.01-2.348-1.601-3.438-1.415-.892-1.918-3.802 3.301 1.09 1.477-1.652 2.826.264 1.538 1.884.973.562 1.85-.595 1.505-2.678.22-2.05-.659-2.148-.72-1.157-4.173-2.348.376-2.115-.408-1.257-1.695-3.372-.69-1.025-2.954-1.355 1.697-1.323-.534-.826 2.198.694 1.413-.496 1.224-2.017.408-2.148-.847-2.48-2.386 2.579-3.865-.695-1.635.893-1.132.628-3.682 2.645.252 1.984-4.41 1.686-1.67 3.174-1.451-1.29-1.735 1.554-1.988 3.042-.537.066-1.421-1.323-1.516 2.711-.6 1.455.884 2.314-.19 1.157 1.296 1.62-.253 1.488 1.137 1.355-1.516 1.587.19 1.091 2.431 1.554.978 3.075.158 1.29-.631.23-1.736 1.753.915 2.116-.631-.628-2.18 3.438-3.508 3.074-1.391 2.215.948 1.323-1.17.364 3.731 2.347-.474 1.355 4.454-1.52 1.358.066 4.07z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '241': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M302.378 571.11l.133 3.104 2.05 2.326-.596 1.89.827 1.24-4.067 5.046 1.786.65-.86 2.196 2.182.834 2.414 1.731.33-1.514 2.943-.495 4.661 4.11 2.281 1.729 1.62.432 2.711 2.87-2.248 2.899.132 1.079-1.487 2.895-2.744.247-1.984 2.524.496 1.539-1.686 2.153-3.009.769-2.083 1.29-1.686-1.629-2.116.585-3.273-2.707 1.356-.615-.397-1.354-2.083-.739-.958 1.293-1.753-.062-1.09 2.185-2.678-1.661 1.19-1.724v-1.693l-1.058-1.787-1.984-.832.265-1.972h-1.488l-1.058-1.665-2.182.03-.826 2.344-3.538-.432-2.91.617-.793 2.218-1.52-1.817-6.91-5.089-.43-2.685-1.455-.525.364-1.637 1.455-1.792-1.521-1.793-1.95-.65-1.786-1.298-1.884-3.745-.496-3.128 1.653-.372.363-1.363-1.09-.961.33-2.481-1.62-.31-.364-1.521.728-1.863-.298-1.335 2.711-.466-1.488-3.978-2.148-.902 1.289-2.146 3.438-1.4 2.943.124 1.62 1.93-.827 1.088 2.579 3.389 2.71-1.492.265 1.678 2.083-.186.893-1.679 1.785.342.562.995 3.24-1.71 3.802-.093 3.802 1.337 3.041-1.182 1.918.062 1.025 1.089-.43 1.895 2.116 1.46 2.215.683z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '242': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M325.124 550.042l-.397 2.059-2.082 1.091-1.786.187-.33 1.902-1.587 4.422.562 1.432-1.521.186-1.355-1.774-3.736-1.09.595-1.494-2.546-1.246-1.917.093-1.025.312-3.009-.81-2.48.03-3.008.562.132-1.247-1.223-2.338-2.215-.686.33-3.4 1.257-.719-.926-2.092-2.115-2.312-1.62-.218-4.166.906-1.124-.125-.661-2.032 1.884-1.5 1.554-.032 2.876-2.127-1.917-.908 1.388-1.627 1.885-.72 2.48 1.44 1.355 1.658 3.57-.938.298-1.002 2.248-.94 1.256 2.255-.76 1.47 1.223.97-.562 2.158 4.595 2.468 1.686.344.76 2.592 1.522 3.059 1.322 1.03 3.538.124z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '243': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M290.609 540.11l-1.554.03-1.884 1.501.66 2.032 1.125.125 4.166-.906 1.62.218 2.115 2.312.926 2.092-1.256.718-.33 3.401 2.214.686 1.223 2.338-.132 1.247 3.009-.561 2.48-.031 3.008.81 1.025-.312 2.082 5.325-.925.902v.093l-1.025 2.177 1.388 1.648.331 1.988-1.587 1.025-2.182-.03-1.421 2.11-3.307.063-2.545-1.584-2.215-.683-2.116-1.46.43-1.895-1.025-1.089-1.918-.062-3.041 1.182-3.802-1.337-3.802.093-3.24 1.71-.562-.995-1.785-.342-.893 1.679-2.083.186-.264-1.678-2.711 1.492-2.579-3.39.827-1.088-1.62-1.93-2.943-.124-3.438 1.4-1.885-3.268-.033-2.71-.727-3.803 2.215-2.808 2.083.811.43 1.342 2.413-.593.033-1.935 1.256-.561 3.273 1.123 1.025-.686 2.612.405 2.017-1.186-1.19-2.404.66-1.719-1.751-1.344 1.719-1.876 3.471-2.346 1.455.75 1.752-1.032 3.042-.219 4.397 1.533z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '244': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M319.504 561.135l-1.223 2.364.099 1.927.099.031-.033.063-.198.093-.43-.187-.926-.808.033.902-.661.466-.727-.249-.133-1.15-2.347-.933-2.347-1.182-.397-.28-.033-.093-.1-.062.926-.902-2.082-5.325 1.917-.093 2.546 1.246-.595 1.495 3.736 1.09 1.355 1.773z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '245': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M318.479 565.457l.1.063 1.62 2.703-4.133.062-.563.839.496 1.894-1.818 1.83-.198 1.428-1.653.403-.628 1.489-1.257.217-1.19-3.753-1.157-1.77 1.19-1.894 1.587-1.025-.33-1.988-1.39-1.648 1.026-2.177v-.093l.099.062.033.093.397.28 2.347 1.182 2.347.933.133 1.15.727.249.661-.466-.033-.902.926.808.43.187.198-.093z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '246': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M330.943 594.544l1.19 3.424-1.389 1.758-1.752-.339-.992 1.819-2.578-.401-2.15-3.608-2.479.062-2.71-2.87-1.62-.432-2.282-1.73-4.661-4.109-2.943.495-.33 1.514-2.414-1.73-2.182-.835.86-2.196-1.786-.65 4.067-5.046-.827-1.24.595-1.89-2.05-2.326-.132-3.103 3.307-.062 1.421-2.112 2.182.031-1.19 1.895 1.157 1.769 1.19 3.753 1.257-.217.628-1.489 1.653-.403.198-1.427 1.818-1.831-.496-1.894.563-.839 4.132-.062-1.62-2.703-.198-.094-.1-1.927 1.224-2.364-.562-1.432 1.587-4.422.33-1.902 1.786-.187 2.082-1.091.397-2.059.43-1.217 2.446-1.56 1.124-2.374 1.356-.125 1.157 3.56 1.785-.25 4.563-1.904 2.05.78.76-2.06-.463-1.063.264-3.157.232 4.563 1.554 1.905-.133 2.278-1.653-.062-.198 1.248.893 1.528-2.645 1.403-.53 1.31 1.489 1.028-.298 2.585 3.24 2.677-3.273 5.38-3.24-1.4-1.554 1.15-1.587 3.2-1.487 1.615-.596 2.451-.991.094-2.083 2.016-3.372-1.83-1.257 1.488-1.322-.744-1.785 1.489 3.273 2.417 1.851-.31 1.256 2.479-.529.681 1.422 2.167-3.075-.093.331 1.888 2.446.897.629 1.824v3.307l1.653.031.66 2.131z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '247': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M221.71 508.716l-1.057 2.804 1.19.472.033 4.5 1.223.535 1.025 3.395 1.488.503-.826 1.947-1.786.44.298 2.888-1.422.533-3.174 3.419-1.752.188-1.124-2.1-2.116-.91 1.19-2.825-.86-2.072-1.751-.691-4.96 1.319-1.62-1.54-.694 1.822.397 1.288-3.273 3.075-.727-1.13-.595-6.468-.562-2.924 1.058-1.132-.199-3.21-3.074-.787.826-1.575.364-2.11 1.157-1.703 2.91-.694 2.776-.567 1.918 1.23 1.95-1.42-.462-.82 2.909-.725 1.355.662 5.984.6z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '248': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M294.742 496.47l2.81 3.065-.199 3.505 1.422.6 3.901-.095-.86 3.532.133 1.292-1.984 4.41-2.645-.252-.628 3.682-.893 1.132.695 1.635-2.579 3.865-1.256.91-.397 2.355h-1.587l-1.455 1.788-1.785.721-1.157-1.568-3.901-.25-.33-1.444.826-3.329-1.885-.597-1.95-1.665-.033-1.666-2.81-1.258-.166-1.856-3.405-.63 1.52-1.07 2.282-.755.364-1.795 1.52-1.102-2.81-1.387 1.455-2.333-.628-1.514 1.488-1.514 1.157-3.915-.628-1.864-3.406-.57-2.28 2.15.76 1.452-1.323 1.327.265 1.578-2.58-.221-.991.568-4.33-.379-1.852 1.483-.166 1.388-4.43 1.891-2.777-.85-2.38 2.048-.33 2.583-.86 1.89-1.224.25-1.322-1.92-1.455 1.48-3.636-1.007.396-2.457-.991-2.647-1.488-2.207-3.967-4.324-.298-2.337-.86-1.58-3.074-.158 1.388-3.13 3.042-1.329 2.413-2.817v-2.407l-.793-1.267.562-.54.893-3.487-.463-.952 2.843-.92.298 1.015 2.876 1.3 2.248-.538 4.661-3.46 1.819-1.968 1.256-2.51v-1.845l1.52-1.176 2.117-2.928 1.785 1.814 3.57-1.018 2.877 3.626 2.777 1.812 1.322-.19.298 2.446 1.884 2.7 1.819.73-.86 2.443 1.984.475 1.421-.888.496 1.713 1.587.666 1.091 1.521 1.52-.697 1.522 2.503 2.116.285-.43 1.932.694 1.52-.628 2.088.959 1.77.066 2.15 4.033.158 2.149 1.39z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '249': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M233.745 496.534l3.075.158.86 1.58.297 2.337 3.967 4.324 1.488 2.207.991 2.647-.396 2.457 3.636 1.007 1.455-1.48 1.322 1.92 1.224-.25.86-1.89 2.347 1.89 1.157-.693 1.025 2.108-.298 4.686-.529.786-1.223 1.288-3.042-.094-.793-.88-1.389 1.257.827 3.485-4.331-.157-.727 1.57-3.141-.158-1.488 1.161-.297 1.411-1.29 1.286-2.512-.063-.53 2.632-1.123 1.034-1.587.658-3.406.5-2.05 1.41-.925-2.255h-1.157l-1.323 1.535-2.182-1.597-1.586 1.565-4.1.125.33 3.192 1.026-.25.66 2.283h1.588l.991-1.814 1.091 1.877v1.406l-1.223 1.656 1.19 1.031-1.983 1.343-.893-1.124-1.686 1-1.29-.781-2.347 1.654.794 1.655-2.579 2.838-1.355.406-3.042-.25-3.075.188-2.05-3.62 1.984-1.903-.694-2.28.265-2.282 1.388-.187 1.62-3.878-2.281-1.314 1.52-2.035-.33-1.128-2.083.439-1.487-3.51-1.554-1.254.793-1.693 3.273-3.075-.397-1.288.695-1.821 1.62 1.539 4.959-1.32 1.752.692.86 2.072-1.19 2.824 2.115.91 1.124 2.101 1.752-.188 3.174-3.419 1.422-.533-.298-2.888 1.786-.44.826-1.947-1.488-.503-1.025-3.395-1.223-.535-.033-4.5-1.19-.472 1.058-2.804 1.72.22 4.23-1.229.364-1.26-.66-2.713 1.123-1.957-1.62-.6.926-1.736-1.124-2.686.43-1.422 2.182 1.612 1.884-.696 1.554.917z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '250': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M282.377 526.796l-2.513-.157-.958 2.792.363 2.288 1.885 1.16-.265 1.722 2.976-.689 1.058 3.225-3.042.219-1.752 1.033-1.455-.751-3.471 2.346-1.72 1.876 1.753 1.344-.661 1.719 1.19 2.404-2.017 1.186-2.612-.405-1.025.686-3.273-1.123-1.256.561-.033 1.935-2.413.593-.43-1.342-2.083-.811-1.455-.999-.099-1.218 2.48-3.373-1.72-2.408-1.685-.344-1.224-2.596.992-.72-.198-2.912.397-2.85 2.975-1.13 1.058-.94 1.421.22.232-3.106 1.157-1.726-4.43-.69-.165-1.445-1.488-.283-2.645-1.76.529-.785.298-4.686-1.025-2.108-1.157.692-2.348-1.889.33-2.583 2.381-2.049 2.777.851 4.43-1.891.166-1.388 1.851-1.483 4.331.379.992-.568 2.579.22-.265-1.577 1.323-1.327-.76-1.452 2.28-2.15 3.406.57.628 1.864-1.157 3.915-1.488 1.514.628 1.514-1.455 2.333 2.81 1.387-1.52 1.102-.364 1.795-2.281.756-1.52 1.07 3.404.63.166 1.855 2.81 1.258.033 1.666 1.95 1.665 1.885.597-.827 3.329z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '251': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M260.623 548.607l-2.215 2.808.727 3.803-2.413 1.247.959.81-1.62 1.307-.397 1.526-3.637.466-2.248-1.089.728-3.644-.364-2.306-.76-1.216-1.72-.093-1.289 2.836-2.314-.997 2.116-1.746-.43-1.497 1.62-1.154-.827-2.778-1.388-.874-.265-1.843.364-2.594-2.91-1.595-3.305 1.751-.53-2.126-1.785.907-.165 1.657-1.322.75-1.356-1.344.694-4.286.629-.939-.033-2.254 1.124-1.034.529-2.632 2.512.063 1.29-1.286.297-1.411 1.488-1.16 3.14.156.728-1.569 4.33.157-.826-3.485 1.389-1.257.793.88 3.042.094 1.223-1.288 2.645 1.76 1.488.282.165 1.444 4.43.691-1.157 1.726-.232 3.106-1.421-.22-1.058.94-2.975 1.13-.397 2.85.198 2.912-.992.72 1.224 2.596 1.686.344 1.719 2.408-2.48 3.373.1 1.218z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '252': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M304.362 664.855l-2.678-.698.53-3.858-2.943-.668-2.48.243.133-1.368 1.223-.456.363-2.099 1.257.153 1.686-.974.496-1.278-1.058-1.34.363-1.796 2.282-.457.066-1.828 2.05.823 1.686 3.746-.397 1.339.43 2.282-.199 2.402-.826 3.312-1.587.729z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '253': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M304.362 664.855l.397-1.791 1.587-.729.826-3.312.199-2.402-.43-2.282.397-1.34-1.687-3.745-2.05-.823-.065 1.828-2.282.457-.363 1.797 1.058 1.339-.496 1.278-1.686.974-1.257-.153-.363 2.099-1.223.456-.133 1.368 2.48-.243 2.942.668-.529 3.858 2.678.698-.727 3.763-2.579 3.668-3.207-.242.893 3.756-1.95.908-.86-1.423-2.116 1.15-.992-.242-.595-2.604.661-2.727-1.355-.789-3.406 1.122-2.248-.576 1.025-1.607-.76-2.123-.86-1.882 1.356-3.067.231-3.039-1.686-1.064-.826.912-2.546-.547.992-1.581 1.256-5.631-1.653-.61 1.752-2.071-.496-2.927 2.182-.701 2.513-1.525 3.405-.061 1.785 1.128 2.083-.518.86-2.289.529-3.634-.33-2.965.859-1.773 5.72-1.469-.265 1.622 1.058 2.17 1.719 1.284 1.785.092 1.124 2.322-2.281 1.069-1.852-.489-1.983.733-.033 3.052 3.008-.946 1.488.305 1.091 2.075 1.52-.092 1.786-.976 1.19-2.38 1.091 1.282 2.744.122 2.182 1.83 1.62.61.496 2.47.727 1.036-1.686 1.463.728 2.344-1.587 1.492-.562 3.62h-1.62l-.794 2.098.364 2.127-2.975 1.397-1.455 1.609 1.058 3.277-1.389.273-3.273-1.244-2.578-2.185z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '254': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M306.18 612.655l2.844 1.843.991 1.628-2.48 1.628 1.356 1.166.76 4.509-.859 1.379 1.025 4.35 1.95 1.591-.66 1.714 1.355 2.11 3.835-.55 1.422 1.283 1.09 1.07-.561 1.467 2.744 2.901.264 2.228 2.116 1.19.562 1.037 2.512-.06.43 1.829-2.611.64-1.389 1.158h-1.389l-.727-1.036-.496-2.47-1.62-.61-2.182-1.83-2.744-.122-1.09-1.282-1.191 2.38-1.785.976-1.521.092-1.091-2.075-1.488-.305-3.008.946.033-3.052 1.983-.733 1.852.489 2.281-1.07-1.124-2.321-1.785-.092-1.72-1.283-1.057-2.171.264-1.622-5.72 1.469-.859 1.773.33 2.965-.528 3.634-.86 2.289-2.083.518-1.785-1.128-3.405.06-2.513 1.526-2.182.701-3.174-1.342-2.314.61-.363-2.99-2.711 1.679-2.38 1.006-1.323-.122-1.521-2.563.992-.091.231-2.32.76-.948-.958-3.973 1.455-.428-1.488-2.05-1.554-1.07-.33-2.174.363-2.603 2.678 1.746 1.653.306.033 1.562 2.281-.551.166-1.807.925-.858 1.422.95-1.488 1.99 2.281-.122 1.752-1.409.133-2.175-2.215-1.777-1.455-1.84.595-3.374 1.058-1.75.33-3.287-.132-3.473-1.454-.83 1.818-1.17-2.612-5.08.794-2.218 2.91-.617 3.537.432.826-2.343 2.182-.031 1.058 1.665h1.488l-.265 1.972 1.984.832 1.058 1.787v1.693l-1.19 1.724 2.677 1.66 1.091-2.184 1.753.062.958-1.293 2.083.74.397 1.353-1.356.615 3.273 2.707 2.116-.585z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '255': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M283.666 645.382l.496 2.927-1.752 2.072 1.653.609-1.256 5.63-.992 1.582 2.546.547.826-.912 1.686 1.064-.231 3.04-1.356 3.066.86 1.882-1.488.789-1.52-1.851-4.2 1.426-.528 1.365-1.323.09.033 1.699 1.752.03 1.918.97 1.851 2 .794 2.605-2.777.605-1.984 1.665.132 2.42-.496 2.026-2.71-.363-2.083.484-1.29 1.723-1.62.755-.066-1.995-1.983-2.54-2.877.243-1.851 1.451-1.818-.03.43-4.204-.397-3.058-1.62-1.696-.628-2.636-.662-3.76-1.256-2.52.463-1.154-.198-2.308-3.736-5.442-.298-1.4-1.388-.852 2.413-2.253 1.223-2.102-.033-2.53 2.116-.091 1.62-1.007 1.851 1.312 2.083-.244.728-1.556 2.909-1.983-.165-.427-.199-.427 2.612-.458 1.52 2.563 1.323.122 2.38-1.006 2.712-1.679.363 2.99 2.314-.61z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '256': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M280.592 718.31l-2.38.809 1.388 1.738-1.29 4.252.496 1.407 1.257.299.694 4.127-2.05 1.524-.43 2.42-1.851.567-.595 1.701-1.62 1.552-.562 1.79-1.752.686-1.852 1.55-2.149.775-3.768.626.264-2.057 1.587-.686-.198-2.654 1.818-2.985-2.314-1.314-1.422 1.463-1.752.299-1.025-.657-1.058 1.732-1.62-4.33 1.918-1.704-.596-1.883-1.322-.359-1.818-2.662-1.984.539-.33-1.706-2.844-2.784-1.29.599-2.148-1.498-1.554.659-2.083-.629.629-2.637-1.356-1.289-1.422.06-1.553 1.978-.96 3.026-1.024-1.378-3.009-.479-3.074-2.278.661.27 2.38-2.488 1.918.09 1.917.3 1.554-.6 2.215-1.77.265-1.2 1.62-.661.066-1.05 1.686-.541 1.388.96 4.067 1.111 2.314-2.402 1.554.6 1.587-.48 1.322 2.042 2.546-1.681.562-2.223-1.256-1.322-.033-3.458-1.852-.782-.992-1.203 2.943-1.355.793-1.475 1.157-.12 3.207-2.2 4.893-1.084 2.91 1.838 1.19 2.65 3.372.692.165 2.197 1.72 2.556-.596 4.027 2.91 2.042-.463 2.222-2.877 2.07.992.72z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '257': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M286.146 666.889l.76 2.123-1.025 1.607 2.248.576 3.406-1.122 1.355.789-.661 2.727.595 2.604.992.243 2.116-1.15.86 1.422 1.95-.908.33 1.453-1.322.847-1.29 3.449 1.588-.393 1.454.695-.198 2.267.76 1.028-1.983 4.378-1.025 4.103-.232 3.646-1.058 2.65.067 1.325 1.752 1.204-.364 1.263-1.851-.21-.496 3.969-.86 1.142 1.686 1.532 3.34-3.125-.926 4.116.463 1.501 2.71-.9 1.587.93 2.116-.39-.661 1.92 1.256.57 1.058 2.31-1.983 1.74-1.984.689.727 2.906-1.818.18-4.166 1.676-1.52-1.916-3.042-.57-.43-1.108-2.843-.09-2.083-.869-.958 1.139-.397 1.797-4.662-.539-1.884-1.258 1.025-1.229-.033-1.318-.199-1.5-.992-.72 2.877-2.07.463-2.22-2.91-2.043.595-4.027-1.719-2.556-.165-2.197-3.372-.692-1.19-2.65-2.91-1.838-4.893 1.085-3.207 2.199-1.157.12-1.587-2.59-1.454-1.326 1.52-.814.298-2.714-.231-2.414-.992-.845.397-1.842 1.09-.302.265-2.236.893-1.662 1.818.03 1.851-1.451 2.877-.242 1.983 2.54.066 1.994 1.62-.755 1.29-1.723 2.083-.484 2.71.363.496-2.026-.132-2.42 1.984-1.665 2.777-.605-.794-2.605-1.851-2-1.918-.97-1.752-.03-.033-1.698 1.323-.091.529-1.365 4.198-1.426 1.521 1.85z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '258': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M214.24 621.65l-.464.982-2.578 1.042 1.686 3.095-2.612.306-1.422-.98-3.702-.552-2.678-1.992.463-1.9.727.091.364-3.65v-.032h.033l.033-.03.165-.062h.265l.694.062.198 1.412 1.422-.093 1.917-2.179 1.885.86-.76 2.363 1.355.95 2.38-1.012z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '259': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M214.24 621.65l-.629-1.319-2.38 1.013-1.356-.951.76-2.363-1.884-.86-1.917 2.18-1.422.092-.198-1.412-.694-.062h-.265l-.165.062-.033.03h-.033l.033-.245v-2.64l1.487.92 1.455-.49.397-2.643 1.421.86 1.984-.307 1.256-.86.794 1.352-.166 1.536 1.19 3.04 1.786.275 1.025 1.228-2.083.368-.231 1.166z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '260': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M202.933 621.65l-.463 1.901 2.678 1.992.396 1.532-1.355.613.893 1.561-.794 1.592.463 1.989-.43 1.56-2.083.825-.958 1.375-3.108-1.192-4.893 2.231-.132 1.894-1.488 1.252-.727 2.197-2.777-.824-1.521-.976-.794-5.254.265-1.56 1.686.582.595-1.223-.1-3.947 3.538-3.216.86-2.328-2.744-.95.364-1.35-1.72-2.116 1.488-1.627 2.017.4 1.785-1.935 1.62-.982 2.281-.43 2.744.276 1.223.676-.694 1.811 1.157 3.007z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '261': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M227.133 621.804l-.893 2.268.066 3.34-2.446.245-.661 1.378-1.984 1.316-2.248-1.775-2.513.98-2.149-.276-1.421-2.511-1.686-3.095 2.578-1.042.463-.982.133-.03.23-1.166 2.084-.368 4 .337 2.017.583 1.223-1.166 1.52.215z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '262': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M212.884 626.769l1.421 2.51 2.15.276 2.512-.98 2.248 1.776 1.984-1.316.66-1.378 2.447-.245 1.422 2.48 1.52-.153.993 2.387 2.016 1.621-.363 3.302-1.587 1.619 1.19 1.069-.926.06-2.281 1.863-4.033-2.534-3.207 1.282-2.711-1.252-.661.428-2.017-2.047-1.984-.06-1.223-1.01-1.653.46-.231-2.63-4.067.245-1.752-1.712-.463-1.99.794-1.59-.893-1.562 1.355-.613-.396-1.532 3.702.552 1.422.98z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '263': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M233.943 620.086l1.686.276 2.877-.644 2.082.767.298 1.503 1.785.95.364 1.686 2.546-.827 2.644 1.287.629-1.44 1.917-.767.926 1.042 2.149.123.264 1.808-1.554.888.364 1.47-2.81 2.694 1.322 1.102-1.09.153-3.075 3.272-3.009 2.75-4.628-.489-2.645 3.238-1.62.183-2.281-1.558-1.455.367-.132-.183-1.19-1.07 1.587-1.618.363-3.302-2.016-1.621-.992-2.387-1.521.153-1.422-2.48-.066-3.34.893-2.268.793-.583 2.15 1.135 1.322-.246-.397-1.625.826-.951z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '264': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M233.943 620.086l-2.116-.552-.826.95.397 1.626-1.323.246-2.149-1.135-.793.583-1.686-1.749-1.521-.215-1.223 1.166-2.017-.583-4-.337-1.025-1.228-1.785-.276-1.19-3.04.165-1.535.826-1.322 1.653-.123 1.29-3.013 2.578-.43.96-.954.726-.185 3.67 2.215 1.686-.061 1.389-.954 1.587.123 1.322-.83 1.058.769 1.091-2.862 4.033-.123 1.356 2.308.86-.277 1.62 1.63.23 2.706.993 2.55-2.711 1.597-.496-1.198-2.843.246z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '265': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M216.62 609.55l-1.29 3.012-1.653.123-.826 1.322-.794-1.352-1.256.86-1.984.307-1.421-.86-.397 2.642-1.455.492-1.487-.922v2.64l-.033.277-.364 3.651-.727-.092-.728-.644-1.157-3.007.694-1.811-1.223-.676-2.744-.276-2.281.43-1.62.982-.33-.798-.496-.43 1.09-2.704 1.058-.799-.925-3.167-.066-2.678 2.215-.184-.066-1.51-1.389-1.724.562-1.11-1.422-2.157 1.554.77 2.844.617 1.256 2.065 1.62.647.363 2.217 1.389.215 1.223 2.309 1.984.584 1.818-1.385 1.422.831 1.653-.954 1.983-.246.992.893 2.414.492z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '266': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M222.34 597.197l-1.753 2.282-2.38 1.295 1.421 2.157-2.876 2.987 1.884.74 1.521 1.507-.959.954-2.578.43v-1.107l-2.414-.492-.992-.893-1.983.246-1.653.954-1.422-.83-1.818 1.384-1.984-.584-1.223-2.309-1.389-.215-.363-2.217-1.62-.647-1.256-2.065-2.844-.616-1.554-.771-1.487-.925v-2.221l.76-2.037 4.695.247 3.074-3.119 1.819.062 1.025-1.545-.629-1.67.893-1.267 2.215-.093 1.488 2.505-1.356 1.297 2.414 2.595 1.52-1.513 2.81.34 2.546-.68 3.24 1.575 3.141 2.902z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '267': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M223.827 570.428l.992 1.149.991 4.25-2.413 1.58-1.19 3.037.661 1.548 1.223.34-2.016 2.539-2.248.154-.695 2.104 1.455 1.422 2.083.958 1.917 2.163 1.686.093-.264-1.545 1.388-.31-.396 4.603-2.513.463-2.149 2.221-.066-1.357-3.14-2.902-3.24-1.575-2.546.68-2.81-.34-1.521 1.513-2.414-2.595 1.356-1.297-1.488-2.505-2.215.093-.893 1.268.629 1.669-1.025 1.545-1.819-.062-3.074 3.119-4.695-.247-.198-2.903-2.777-.834.264-1.947-1.355-.65.033-3.092 2.512 1.701 1.786-.65-.53-1.732 3.902-.866 1.488-1.641.727-1.796 1.884-1.333.959-1.983 1.256 1.24 4.331.31.496-4.155 1.852-.31 2.81 2.48.991-.713.397-2.016 2.546-2.265-.265-1.739 1.224-.838 1.553 1.77h2.116l1.554.807z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '268': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M260.69 568.689l.297 1.335-.728 1.863.364 1.52 1.62.31-.33 2.482 1.09.96-.363 1.364-1.653.372.496 3.128 1.884 3.745 1.785 1.299 1.951.65 1.52 1.792-1.454 1.792-.364 1.637 1.455.525.43 2.685-3.24 1.574-.959-1.42-3.273.957-5.752.185-2.05 1.357 1.157 3.113-4.992 2.157-.529 1.878-1.223 2.031-4.662-2.677-2.512-.493-.695-1.201-1.719 1.109-1.818-1.356-1.984-2.526h-1.95l.595-1.51-.76-2.838-3.439-.185-1.884-1.79.396-4.602-1.388.309.264 1.545-1.686-.093-1.917-2.163-2.083-.958-1.455-1.422.695-2.104 2.248-.154 2.016-2.538-1.223-.34-.661-1.549 1.19-3.036 2.413-1.581-.991-4.25-.992-1.15.165-2.235 3.67 1.304h3.24l.959-1.521-.992-2.02 2.645-1.088 1.057 1.399 3.935-.156.132 1.399 3.438.434.992-1.18 1.058 1.615 4.893 1.802 1.322-.56.926 1.336 1.785-1.553 3.67.59-.463-1.056 2.017-.9 2.083-.218z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '269': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M249.052 605.95l1.686-.832 2.48-.093.43 1.14 1.818-.124.066 2.74 1.19.738-.165 1.476-3.273.983-.265 1.107.959 2.734-1.389 5.28 2.083.337.066 2.269-.892.337-2.15-.123-.925-1.042-1.917.766-.629 1.44-2.644-1.286-2.546.827-.364-1.686-1.785-.95-.298-1.503-2.082-.767-2.877.644-1.686-.276 1.786-4.267 2.843-.246.496 1.198 2.71-1.597-.991-2.55-.232-2.706-1.62-1.63-.86.277-1.355-2.308-4.033.123-1.091 2.862-1.058-.77-1.322.831-1.587-.123-1.389.954-1.686.061-3.67-2.215-.727.185-1.52-1.508-1.885-.739 2.876-2.987-1.421-2.157 2.38-1.295 1.752-2.282 2.149-2.221 2.513-.463 1.884 1.79 3.438.185.76 2.837-.594 1.51h1.95l1.984 2.527 1.818 1.356 1.72-1.11.694 1.202 2.512.493 4.662 2.677z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '270': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M268.69 596.148l6.91 5.089 1.52 1.817 2.612 5.08-1.818 1.17 1.454.83.133 3.473-.331 3.287-1.058 1.75-.595 3.374 1.455 1.84 2.215 1.777-.133 2.175-1.752 1.409-2.28.122 1.487-1.99-1.422-.95-.925.858-.166 1.807-2.28.55-.034-1.56-1.653-.307-2.678-1.746-.364 2.603.331 2.174 1.554 1.07 1.488 2.05-1.455.428.959 3.973-.76.947-.232 2.32-.992.092-2.612.458-2.083-3.42-4.397-.366-.826-1.833-2.579-1.162-.595-1.04-2.645-.091-2.71-2.202-1.323-1.102 2.81-2.694-.364-1.47 1.554-.888-.264-1.808.892-.337-.066-2.27-2.083-.337 1.389-5.279-.959-2.734.265-1.107 3.273-.983.165-1.476-1.19-.739-.066-2.739-1.819.124-.43-1.14-2.479.093-1.686.831.529-1.878 4.992-2.157-1.157-3.113 2.05-1.357 5.752-.185 3.273-.956.959 1.419z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '271': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M159.524 602.007l1.091-1.973 1.058-3.947 1.29-1.667.396.803 4.43-.155 1.95 2.5 1.555-.74 1.587 1.726.099 1.357-1.058 1.603.364 2.403 1.884.616-1.884 1.478-3.439-.154-.396-2.248-1.521.924-4.496-2.464z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '272': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M189.312 587.87l1.355.65-.264 1.947 2.777.834.198 2.903-.76 2.037-2.05-.154-.231 1.696-1.29.556-.892-.987-2.91.709-.793 1.727.529 1.233-5.058.924-3.902.093-2.182 3.88.166 2.893-1.224.8-.033 2.829-2.677 1.782 1.355 2.027-2.777.092-1.455-1.351-.264-1.506-1.95-.184-1.29.891-2.612-1.475-.86-2.029.298-2.214 1.091-.8 1.818-.093.364-.954-2.413-1.2-2.777-.708.033-1.94.892-.771 2.91.062 4.496 2.464 1.52-.924.397 2.248 3.439.154 1.884-1.478-1.884-.616-.364-2.403 1.058-1.603-.1-1.357-1.586-1.727-1.554.74-1.95-2.499-4.43.155-.397-.803 1.124-1.945 1.157-6.955 3.14-1.113 1.72 1.237 2.115-.464.794 1.237-.562 1.732.198 4.357.893 1.945 3.504 1.76 2.116-.865 2.777-1.729-.363-2.47-1.653-.464-.364-1.452 1.851-2.195 2.348-.433 1.686 1.67 1.52-.711z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '273': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M167.194 614.99l-1.917.153-.133.215 1.356.738 1.62 4.327 2.81 1.135-.694 3.097-2.314 6.278-2.05.734-1.885 2.906-2.182 1.04-3.107-.093-2.248-1.13 1.058-1.224-2.447-1.07-3.306-2.204-1.587.49-1.917-1.714-2.282-.95-3.24-.582 1.025-1.256-1.752-1.133 1.124-3.526 1.521.153 1.851-2.638 1.72-.154 1.719-2.333 1.752-5.654 3.736-6.062 1.62-.555 1.587-1.2-.033 1.94 2.777.708 2.413 1.2-.364.954-1.818.093-1.091.8-.298 2.214.86 2.03 2.612 1.474 1.29-.891 1.95.184z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '274': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M171.988 566.483l-.364.124.033-.155zm14.514-8.804l-1.091 3.362 1.057 2.613 1.158.995.363 2.3-1.355 2.206-2.414.776-.958 1.118-2.744-.404-1.323.807-1.818-1.18.661-1.583-.529-2.05-1.653-.591.76-1.492.133-2.208-2.414-1.525.463-1.089 1.818-.965-.33-1.526 2.215-2.15-1.52-5.612 4.727-1.249.264 4.71 1.422 3.242z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '275': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M176.286 557.243l.33 1.526-1.818.965-.463 1.09 2.414 1.524-.133 2.208-.76 1.492-3.868.435-.33-.031.066-2.673-2.711-.218.727-2.333-.959-1.432-1.719-5.637.463-2.339 2.314-.499 1.686 1.404 3.174 4.456z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '276': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M259.135 555.218l.033 2.71 1.885 3.269-1.29 2.146 2.15.902 1.487 3.978-2.71.466-.331-.87-2.083.218-2.017.9.463 1.056-3.67-.59-1.785 1.553-.926-1.335-1.322.559-4.893-1.802-1.058-1.615-.992 1.18-3.438-.434-.132-1.399-3.935.156-1.057-1.4-2.645 1.089.992 2.02-.96 1.521h-3.24l-3.669-1.304-.165 2.236-.893.62-1.554-.806h-2.116l-1.553-1.77-1.224.838.265 1.739-2.546 2.265-.397 2.016-.991.714-2.81-2.482-1.852.31-.496 4.155-4.33-.31-1.257-1.24-.264-2.046-2.81-2.11-.827.156-2.215-4.068 2.876-1.46-.33-.994 1.917-.777 1.62-1.617-1.322-2.209 1.024-.31 2.348-2.055-.86-.81.727-1.463.265-1.932.595-.997.231-1.434 3.075-.188 3.042.25 1.355-.406 2.579-2.838-.794-1.655 2.348-1.654 1.29.78 1.685-1 .893 1.125 1.983-1.343-1.19-1.03 1.223-1.657v-1.406l-1.09-1.877-.992 1.814h-1.587l-.661-2.283-1.025.25-.33-3.192 4.099-.125 1.586-1.565 2.182 1.597 1.323-1.535h1.157l.926 2.254 2.05-1.408 3.405-.501 1.587-.658.033 2.254-.629.94-.694 4.285 1.356 1.344 1.322-.75.165-1.657 1.786-.907.529 2.126 3.306-1.751 2.909 1.595-.364 2.594.265 1.843 1.388.874.827 2.778-1.62 1.154.43 1.497-2.116 1.746 2.314.997 1.29-2.836 1.719.093.76 1.216.364 2.306-.728 3.644 2.248 1.09 3.637-.467.397-1.526 1.62-1.308-.959-.81z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '277': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M203.957 556.714l-.727 1.463.86.81-2.348 2.054-1.024.311 1.322 2.209-1.62 1.617-1.917.777.33.994-2.876 1.46 2.215 4.068.826-.156 2.81 2.11.265 2.047-.959 1.983-1.884 1.333-.727 1.796-1.488 1.64-3.901.867.529 1.733-1.786.65-2.512-1.702-3.604-.99-1.52-2.632-1.323.898-3.24-.712-3.967-1.641-.496-.96 1.785-2.511.86-1.985-.53-1.427 1.885-1.366 1.323-.807 2.744.404.958-1.118 2.414-.776 1.355-2.206-.363-2.3-1.158-.995-1.057-2.613 1.09-3.362 2.877-.56-.033 1.432 4.496.062-.033 1.62-1.256 1.524-1.356-1.432-1.388 1.183.43 1.618-.199 2.3 1.29 2.3 4.132-4.538.165-1.773 1.72-2.615 1.355-.373 3.041.56.43-1.713z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '278': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M175.856 566.048l1.653.59.53 2.051-.662 1.584 1.818 1.18-1.884 1.365.529 1.427-.86 1.985-1.785 2.51.496.96 3.967 1.642 3.24.712 1.322-.898 1.521 2.632 3.604.99-.033 3.093-2.348-.31-1.52.712-1.686-1.67-2.348.433-1.851 2.195.364 1.452 1.653.464.363 2.47-2.777 1.729-2.116.864-3.504-1.76-.893-1.944-.198-4.357.562-1.732-.794-1.237-2.115.464-1.72-1.237-3.14 1.113 1.322-2.908-.959-.93 1.389-1.579 4.199-3.656-1.687-1.675-.23-1.52 2.082-2.234-1.488-2.546 1.72-1.243v-.497l.032-.125.364-.124z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '279': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M192.618 596.24v2.222l1.487.925 1.422 2.158-.562 1.109 1.389 1.725.066 1.509-2.215.184.066 2.678.925 3.167-1.057.8-1.091 2.703.495.43.331.798-1.785 1.934-2.017-.399-1.488 1.627-1.223.276-3.703-3.591-3.405.43-2.281-1.26-2.777 1.382-.727 1.873-1.025.276-.562-2.333-1.455-.614-1.355-2.027 2.677-1.782.033-2.83 1.224-.799-.166-2.893 2.182-3.88 3.902-.093 5.058-.924-.53-1.233.794-1.727 2.91-.71.892.988 1.29-.556.231-1.696z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '280': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M188.584 619.81l1.72 2.116-.364 1.35 2.744.95-.86 2.328-3.537 3.216.099 3.947-.595 1.223-1.686-.581-.265 1.559.794 5.254-.43 1.343.86 1.586 1.024.153 1.653 1.8-2.082 1.34-1.29 1.585.53.975-2.017 3.167-2.612-.76-.794-1.127-3.24.335-1.09-.975-1.918.731-2.215-.06-.198 1.187-1.521.213-.695 2.952.86 2.798-1.95.121-1.62-.912-1.852.092-1.984-1.308-.099-3.378-1.62-.64-1.355 3.136-2.48-1.37.265-1.126-1.686-1.827 1.19-1.066.76-2.895-.099-3.476-2.116-.58-.826-2.014.132-2.535 1.058-1.619-.727-2.629 2.248 1.131 3.107.092 2.182-1.04 1.885-2.905 2.05-.734 2.314-6.278.694-3.097-2.81-1.135-1.62-4.327-1.356-.738.133-.215 1.917-.153 1.455 1.351 2.777-.092 1.455.614.562 2.333 1.025-.276.727-1.873 2.777-1.381 2.281 1.259 3.405-.43 3.703 3.59z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '281': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M135.985 680.127l2.05 3.447 2.149-.332.198 1.904-.86 2.325.53 1.872-.827 2.112-1.355.845-1.885.512-1.19 1.056-3.703.603-.43-1.116-1.62-.784-2.942-5.22-3.24.483.496-1.48-.463-1.51-2.48-3.325.034-3.721.463-2.937.76.636 2.876-.333 4.926.394 1.653.575 3.34 2.391z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '282': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M137.87 692.3l1.124 2.322 2.678.03 1.223.693 2.016.06.298 2.05-.992 1.144.1 4.725-1.257.271-.595 2.647.694 1.893-.165 1.352-1.554 1.412-1.29.3-.925 1.951-1.587.63-.132 2.07 1.256 1.26-.396 1.26-2.91.33-1.19-.39-1.29 2.397-5.487 2.037-1.587-.27-1.091-1.947 1.95-1.138-.892-1.5-1.19-.389-1.455 1.649-1.653-1.05.198-.929-1.421-2.52-2.546-2.64-.397-3.184 1.455-1.292.43-1.713-.794-2.166-.066-1.805 1.686-4.486-.231-3.225 1.157-1.085.066-2.625 1.752-2.595 3.24-.484 2.942 5.221 1.62.784.43 1.116 3.703-.603 1.19-1.056z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '283': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M152.714 656.408l-.695 3.8-1.09 2.097 2.909 1.61-.165 3.004.892.789-.397 1.516-2.446 1.668.33 1.91-.892.605 1.455 3.18-2.38 2.572.892.938-.463 1.33 1.091 2.238-3.504-4.052-8.497-.363-1.818.787-1.95.09-1.522-1.603-3.339-2.391-1.653-.575-4.926-.394-2.876.333-.76-.636 1.256-1.908.1-1.697 1.52-2.032.793-1.94 1.356-1.518 1.29-6.074 2.181-1.52.794-1.278-.76-3.62.198-2.284.925-2.407 3.637 1.34.76 1.92 1.455-1.675 3.438.73.794 1.919 1.487 1.157 1.951 3.437-1.091 1.855 1.422.456 1.62-2.25 1.157 1.186 2.843-.365.397-1.003z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '284': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M156.45 634.39l.727 2.628-1.058 1.62-.132 2.534.826 2.014 2.116.58.1 3.476-.761 2.895-1.19 1.066-.827-.03-1.686 2.07-1.851 3.165-2.281.882-.397 1.003-2.843.365-1.157-1.186-1.62 2.25-1.422-.456 1.091-1.855-1.95-3.437-1.488-1.157-.794-1.918-3.438-.731-1.455 1.675-.76-1.92-3.637-1.34.76-2.316.034-2.196 2.182-2.441-.1-6.354 2.414-4.527 2.314-1.316 3.835-4.686 1.752 1.133-1.024 1.256 3.24.582 2.28.95 1.918 1.714 1.587-.49 3.306 2.203 2.447 1.071z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '285': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M184.882 653.121l.33 2.344-2.38 1.916 1.025.973-2.81.851-.463 1.793 1.322.213.794 1.883.231 2.702.628 1.335 1.72.668-1.125 2.365 2.215.758.265-1.607h2.48l1.19 2.577 1.355.637 1.19 2.332 3.174 1 2.248 1.483.926 1.452-1.223.999-1.422.03.165 2.117 3.075.363.76 3.807-.529 3.503-1.487-.06-1.091 1.086-1.124-.363-3.604 1.358-1.885 2.805-3.934-1.357-3.603 1.176-.926 2.29-2.843-.18-1.752-1.869.727-.814-1.62-1.236-.198-3.5 2.611-.453 1.488-1.721-1.818-3.596.76-1.572-.397-1.24-1.785-2.117-2.017-.454.232-1.635-1.587-1.12.562-1.515-2.017-2.879-1.983-.181-.298-.82-3.736.94-1.19-.545-3.24 1.122-1.917-1.91.925-.576-1.157-4.795.496-.85-1.09-2.218 2.875-1.428-.43-2.22-.991-1.642 1.355-3.135 1.62.64.1 3.377 1.983 1.308 1.852-.092 1.62.912 1.95-.121-.86-2.798.695-2.952 1.52-.213.199-1.188 2.215.061 1.917-.73 1.091.974 3.24-.335.794 1.126z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '286': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M157.078 651.203l1.686 1.827-.265 1.126 2.48 1.37.992 1.642.43 2.22-2.877 1.428 1.091 2.218-.496.85 1.157 4.795-.925.576 1.917 1.91 3.24-1.122 1.19.546 3.736-.94.298.819 1.983.181 2.017 2.88-.562 1.514 1.587 1.12-.232 1.635 2.017.454 1.785 2.117.397 1.24-.76 1.572 1.818 3.596-1.488 1.72-2.611.454.198 3.5 1.62 1.236-.727.814 1.752 1.869-1.455 4.397-2.116-.06-1.256 1.414-2.347.692.165-2.86-.661-1.445-1.686-.24-.43-1.537-1.422-.633-1.587-3.889-5.19-3.138-.33-4.107-4.662-.392-3.405.332-1.389-1.239-1.091-2.237.463-1.33-.893-.939 2.38-2.572-1.454-3.18.893-.606-.331-1.909 2.446-1.668.397-1.516-.892-.789.165-3.005-2.91-1.61 1.091-2.096.695-3.8 1.851-3.165 1.686-2.07z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '287': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M205.048 691.847l2.414.965-.033 2.05-.959 2.14-2.71 1.296-.497 1.957-2.215.06 1.984 2.197 4.562 2.557 1.587 1.894.1 1.683 1.751 1.862-.231 1.562-3.736-.06-1.454-1.712-1.753.12-2.083-.81 2.216-1.233-3.34-1.653-1.553-1.172-2.777 1.593 2.611 1.353.33 1.622-3.239 2.072-2.513.78-2.38-2.642.231-1.682-1.719-.48-.892-2.135-2.083 1.533 1.554 1.262-.43 2.283-2.083-1.262-1.322-.18.264-2.103-1.19-.962 1.554-1.894-1.422-.993-1.388.572-.397-2.076-1.356-1.384-.793 2.888-1.29-.21-.297-2.738 1.455-4.397 2.843.18.926-2.29 3.603-1.176 3.934 1.357 1.885-2.805 3.604-1.358 1.124.363 1.09-1.087 1.488.06 2.083.091.893 1.479z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '288': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M151.755 683.665l1.389 1.239 3.405-.332 4.661.392.33 4.107 5.191 3.138 1.587 3.89 1.422.632.43 1.536 1.686.241.661 1.446-.165 2.859-1.95.933-1.39 2.135.232 1.262-2.05 1.112-.661.962.066 1.922 3.34 2.612 3.735-.57 1.455-1.682.959.69 1.586-.84.199 1.681-.794.69.463 2.52-1.19 1.32-1.389-2.31-2.314-.78-.397 1.35-1.388.3-1.455 1.35.562 1.08-1.587 1.378-2.314-.81-.595.87-2.876-.33-1.95-1.528-.034-1.35-2.116-.78-1.19.24-1.851-.69-2.05 2.1-3.042.96-1.124 2.067-1.157-.51-2.611 1.11-1.29-.48-2.545.09-1.984.629-.364-1.888-.925-1.258.396-1.26-1.256-1.26.132-2.07 1.587-.63.926-1.951 1.29-.3 1.553-1.412.165-1.352-.694-1.893.595-2.647 1.256-.27-.099-4.726.992-1.145-.298-2.049-2.016-.06-1.223-.693-2.678-.03-1.124-2.322 1.355-.845.827-2.112-.53-1.872.86-2.325-.198-1.904-2.15.332-2.049-3.447 1.95-.09 1.82-.787 8.496.363z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '289': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M231.497 639.737l.132.183.496 5.096 1.124.427.992 2.317.264 2.012-.86 1.888-2.247.091 1.289 1.675-1.355 3.53-1.158.212-1.223 1.43.959 1.671-2.645 1.124 1.025 2.096-1.884 1.7.43 1.67-6.117 1.152-2.182-3.399-2.05-1.609-1.719-2.248-.959 1.155-2.248.303-1.884-1.032-1.058-2.493 2.38.304.1-2.128-2.116-.943.264-1.917-2.248-.335-.926-1.43 1.422-1.767-1.686-1.432.165-1.462 1.058-1.921-.628-1.281 1.422-.732-.827-2.533 1.95-.428-.198-1.893-2.314-1.589.066-2.659 4.067-.244.231 2.628 1.653-.458 1.223 1.008 1.984.061 2.017 2.047.66-.428 2.712 1.252 3.207-1.282 4.033 2.534 2.281-1.862z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '290': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M206.503 634.542l-.066 2.66 2.314 1.588.199 1.893-1.951.428.827 2.533-1.422.732.628 1.28-1.058 1.922-.165 1.462 1.686 1.432-1.422 1.767.926 1.43 2.248.335-.264 1.917 2.116.943-.1 2.128-2.38-.304 1.058 2.493.033.698-4.133 1.55-2.28-.365-.728-1.519-2.248-2.188-1.223-.547-1.885.851-.033 1.58-2.579.091-.628-1.488-2.91-3.01.464-1.37v-2.921l-1.455-1.705-3.174-.884-.529-.975 1.29-1.584 2.082-1.342-1.653-1.8-1.024-.152-.86-1.586.43-1.343 1.52.976 2.778.824.727-2.197 1.488-1.252.132-1.894 4.893-2.23 3.108 1.191.958-1.375 2.083-.826.43-1.56z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '291': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M267.268 642.118l.199.427.165.427-2.91 1.983-.727 1.556-2.083.244-1.85-1.312-1.62 1.007-2.117.091.033 2.53-1.223 2.102-2.413 2.253 1.388.852.298 1.4 3.736 5.442.198 2.308-.463 1.154 1.256 2.52.662 3.76-2.513 1.788-.694-4.426.165-2.67-1.058-.152-1.785-2.703-5.885-2.582-.43 1.428-1.487 1.337-2.943 1.245.033 1.153-2.876 2.246.1 2.335-1.059.425-2.446-.425-1.157.546-.926-1.607-2.612-1.487-.926 1.123-1.586-.03-1.455-2.428-1.851-.789 1.884-1.7-1.025-2.096 2.645-1.124-.959-1.672 1.223-1.429 1.158-.213 1.355-3.53-1.29-1.674 2.249-.091.86-1.888-.265-2.012-.992-2.317-1.124-.427-.496-5.096 1.455-.367 2.28 1.558 1.62-.183 2.646-3.238 4.628.489 3.009-2.75 3.074-3.272 1.091-.153 2.711 2.202 2.645.092.595 1.039 2.579 1.162.826 1.833 4.397.366z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '292': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M259.797 670.862l.628 2.636 1.62 1.696.396 3.058-.43 4.204-.892 1.662-.264 2.236-1.091.302-.397 1.842.992.845.231 2.414-.297 2.714-1.521.814-1.257-.754-1.752.332-1.884-.754-.86 1.658-2.942-.844-.86.663.199 2.23 2.149 3.402-.397 2.588-1.124 1.774-2.281 1.293-3.538-2.736 1.19-6.02-1.554.15.463-2.56-.33-3.709 2.016-1.78-1.058-2.566-3.306.333.232-1.118-1.818-.543-1.72.362-2.38-.332-2.182.906-1.058-3.051-1.322-1.662-.562-1.724-1.819-.756-.562-1.09-4.1-1.27-2.082-1.03-3.372-.06-1.488-1.453-.463-1.393-2.512-1.758 1.454-1.09 1.157-2.154-.694-2.882 2.182-1.275 2.182 3.4 6.116-1.154-.43-1.669 1.852.79 1.455 2.427 1.586.03.926-1.123 2.612 1.487.926 1.607 1.157-.546 2.446.425 1.058-.425-.099-2.335 2.876-2.246-.033-1.153 2.943-1.245 1.487-1.337.43-1.428 5.885 2.582 1.785 2.703 1.058.151-.165 2.67.694 4.427z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '293': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M220.223 694.14l1.29 1.657.43 3.284 2.909.993-.265 1.475-1.29 1.475 1.29 1.443.827-.721 1.322 1.022-.099 1.053 5.72 1.112 1.884 1.773h1.322l.43 1.652 3.405-.06 1.025 2.492-.76 1.38-2.579.57.463 1.65-1.918-.09-2.38 2.49-.661-.27-2.876-.27-1.158-1.32-.76-2.55-1.09-1.23-1.918-.09-3.505-1.44-2.645.63-4.727-2.763-1.819-2.043-.33-1.684-4.695-2.345-.826-1.114-2.976-2.046.496-1.957 2.711-1.296.959-2.14.033-2.05-2.414-.965 2.513-2.293-.628-1.69.959-.966 1.322 1.268.794-2.084 3.768.453 1.224-.695 1.818 5.977.727 1.448 2.017-.12z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '294': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M232.72 684.209l1.058 3.05 2.182-.905 2.38.332 1.72-.362 1.818.543-.232 1.118 3.306-.333 1.058 2.566-2.016 1.78.33 3.709-.463 2.56 1.554-.15-1.19 6.02 3.538 2.736 2.28-1.293 1.125-1.774.397-2.588-2.15-3.402-.198-2.23.86-.663 2.942.844.86-1.658 1.884.754 1.752-.332 1.257.754 1.454 1.326 1.587 2.59-.793 1.475-2.943 1.355.992 1.203 1.852.782.033 3.458 1.256 1.322-.562 2.223-2.546 1.681-1.322-2.042-1.587.48-1.554-.6-2.314 2.402-4.067-1.11-1.388-.961-1.686.54-.066 1.05-1.62.661-.265 1.2-2.215 1.77-1.554.6-1.917-.3-.463-1.65 2.579-.57.76-1.38-1.025-2.492-3.405.06-.43-1.652h-1.322l-1.885-1.773-5.719-1.112.1-1.053-1.323-1.022-.827.721-1.29-1.443 1.29-1.475.265-1.475-2.91-.993-.43-3.284-1.289-1.658 1.257-1.628.198-2.564.992-.453.033-1.69 3.504-.121 1.157-1.42 1.554.876 1.488-.03.264-2.266z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '295': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M209.677 661.18l1.884 1.033 2.248-.303.96-1.155 1.718 2.248 2.05 1.61-2.182 1.274.694 2.882-1.157 2.153-1.454 1.091 2.512 1.758.463 1.393 1.488 1.453 3.372.06 2.083 1.03 4.1 1.27.561 1.09 1.819.756.562 1.724 1.322 1.662-2.05.634-.264 2.266-1.488.03-1.554-.876-1.157 1.42-3.504.12-.033 1.69-.992.454-.198 2.564-1.257 1.628-.661-.995-2.017.12-.727-1.447L215 685.84l-1.224.695-3.768-.453-.794 2.084-1.322-1.268-.96.966.63 1.69-2.514 2.293-2.05-.663-.892-1.479-2.083-.09.53-3.503-.761-3.807-3.075-.363-.165-2.117 1.422-.03 1.223-.999-.926-1.452-2.248-1.484-3.174-.999-1.19-2.332-1.355-.637-1.19-2.577h-2.48l-.265 1.607-2.215-.758 1.124-2.365-1.719-.668-.628-1.335-.231-2.702-.794-1.883-1.322-.213.463-1.793 2.81-.851-1.025-.973 2.38-1.916-.33-2.344 2.016-3.167 3.174.884 1.455 1.705v2.922l-.463 1.369 2.91 3.01.627 1.488 2.58-.09.032-1.58 1.885-.852 1.223.547 2.248 2.188.727 1.519 2.281.364 4.133-1.549z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '296': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M88.709 574.12l1.223 2.079 2.116.775.463 2.138.925.991 1.72-.65 1.057 1.456-.033 2.445-.892 1.795.363 1.701-1.024 1.175-1.091.588.462 1.607-1.785 1.514-1.62-4.915-2.876-3.31-.893.557-2.248-1.671-1.388 1.145-1.918-1.145-1.124.774 1.29 2.94-.96.494-.561 1.855-2.976-1.484-2.281.402-1.52-2.072 1.123-1.485-.43-1.084 2.38-.34 2.414-1.517 2.48-2.634 1.388-2.448-.33-2.234 2.05-.279 1.223.559z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '297': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M83.088 549.262l.76 1.966 1.522-.749 1.124.406-.199 1.746.728 1.247-.43 4.05-2.678 1.184-1.752 1.525-1.19-.28-3.042 1.96-.463 1.96.33 1.647 1.455 1.988 2.711 1.864 2.447-.155.165.869-2.579 1.645.166 1.427.33 2.234-1.388 2.448-2.48 2.634-2.413 1.517-2.38.34-1.554.31-.562-2.353-1.389-1.549.033-1.797-3.967-3.35.364-.682-.463-4.594-1.29-.31-1.454-1.803.727-1.367-4.827-3.359-1.884-.933-1.95 1.027-1.455-.467-.496-5.386 1.223-1.558 2.116.623 3.207.187 2.545 1.153.86-.966 1.653.156 1.95 1.682 1.786-2.025 1.52-.093 4.596-1.278 3.67-2.9 1.19.78 1.256-1.934z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '298': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M104.313 554.782l1.257 1.464-.76 1.246-.331 2.802 1.388.965-.992 1.244-2.215 1.027.794 1.865 1.752 1.306-1.29.839-6.38.714-.926 3.323-1.256 1.21-1.52-.87-2.282-.278-2.843 2.482-3.273-.28-1.224-.558-2.05.28-.165-1.428 2.58-1.645-.166-.87-2.447.156-2.71-1.864-1.455-1.988-.33-1.648.462-1.96 3.042-1.96 1.19.28 1.752-1.524 2.678-1.184.43-4.05-.728-1.247.199-1.746-1.124-.406-1.521.749-.76-1.966 1.983-.405 2.612-1.311 2.083.468.86-.937 1.685.75 1.885 2.278 1.388.655 2.05-.562 1.918 2.184 1.884 1.029 1.62-.905z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
    '299': ({ fill, stroke = '#777' }) => (React__namespace.createElement(Svg$1.Path, { d: "M110.892 569.776l.43 2.204-.992 4.374-2.578 2.572-1.786.65-.958 2.169.925 2.476 2.447 3.248 1.025.093-.331 1.545-1.818-.123-1.72 2.317-2.942-1.081-2.71.71-2.216.031-1.09-.587-1.951-2.349 1.024-1.175-.363-1.7.892-1.796.033-2.445-1.058-1.456-1.719.65-.925-.991-.463-2.138-2.116-.775-1.223-2.078 2.843-2.482 2.281.279 1.52.869 1.257-1.21.926-3.323 6.38-.714 1.29-.84-.165 1.275 2.182 1.118z", strokeLinecap: "round", strokeLinejoin: "round", stroke: stroke, strokeWidth: 0.5, fill: fill })),
};

const CountryMapSvg = ({ children, width }) => {
    const theme = React.useContext(styled.ThemeContext);
    return (React__default['default'].createElement(Svg__default['default'], { width: width, height: width * 1.3392857143, viewBox: "0 0 560 750" },
        children,
        React__default['default'].createElement(Svg$1.Path, { d: "M247.234 194.095l-1.72 2.01-1.124.137-2.512-2.794-1.72 3.066-.528 2.384-2.976-.647-6.91-4.803-.76-1.33-.496-3.002-1.124-2.628-1.19-1.537-3.504-3.075-3.505-7.22-2.182-3.084-2.578-1.577m38.746 20.316l-1.653-.273-2.215 1.023-1.95 2.66m15.307 4.36l1.025-1.499 1.653-.204-.364-2.624 1.554-1.193-1.52-1.159.33-1.569-1.323-1.297-1.157-.58m-.33-.102l.694-2.664 1.884-1.605-1.124-1.436-2.777 2.256-2.149-.65-.694 3.792-3.901-.171-1.091 3.071m51.012-28.793l-.496 2.954-4.132 2.952-.96 1.544-1.685.308-1.323 2.092.827 3.768.397 3.389-.728 1.54 2.877 2.05.793 2.29 1.884.99 1.587-.409 2.05.683 1.025 1.298.595 3.344-1.29 1.842-1.024 5.213-2.546.715-2.116-1.056.298 3.166-1.157 2.415-1.819 1.938-3.14 1.767-1.521 1.936-3.207-.068-.893 2.783-.165 3.935-1.157 1.796-4.96-.814-1.983-1.22-1.388-.644-3.802-2.883-2.248-.068-1.455-.78-.496-1.596-1.62-1.256-2.81-3.228-3.042-2.04m-.066-.204l-.727-3.607m235.126 21.523l-3.471 1.794-1.786-.203-1.289 2.605-1.72.677.2 1.589-3.01.44-2.81-1.218-3.405.575.86-2.232 3.736-3.756 2.281-2.946 1.058-2.847-.992-4.172-1.124 1.018-1.818-.136-2.711-1.561-.926 1.799-2.975.814-.298-1.493-2.48-.51-5.421.272.86-2.206-2.348-1.63.198-2.821-3.174-1.292-1.289-2.653-1.223 1.429.099 1.632 2.711 1.36-1.818 2.107-4.331-.578-4.133 3.26-.86 3.496-2.843.136-1.653 4.068-1.487 1.084.396 2.98-.925.169-1.19 2.402-2.546-.71-.827 2.401-1.95 2.873-1.554-3.245-1.29.406-2.181-.676-2.48 1.69-.628 2.771-.661 1.452-1.488-.506-1.223-2.669h-1.554l-1.058 1.25-1.653.17.198 1.89-3.537 1.722-1.223 1.923-1.951.979-1.29-1.181.761-1.89-4 .473-1.356 1.215-2.215-1.586-3.174.877-2.248-1.114.992-2.262-1.917.237-2.844-.71-.33-2.196-3.604.507-2.777-1.318h-2.612l-3.14 1.115-.96-2.298-1.62-.474-.297-2.063-3.405-1.455-1.157-.846-2.149.304-1.455-.846-.86-2.303-2.115.372-1.256 1.39-1.885-.881-4.232-.068-2.248 1.524.364 2.64-1.455.947-1.289-.473-1.058 2.333-3.405.102-1.818 2.163-2.58-.44.893 2.332-3.306.101-5.95-1.452-5.455 2.803-.331 1.722.661 2.159-.694 2.933-1.157 1.247-2.81-.337-1.356-1.044h-1.983l-1.753.977.133 1.65-7.075-.942-2.81-2.056-1.323.91-1.058-2.023 1.323-1.855-3.406-2.362-2.413-1.114-1.52-1.925-2.976-5.882-1.124-3.182-4.331-.372-3.24 2.538-2.91-.44-3.306-2.539-1.818-2.439-4.1-.203-1.983.644m-15.836-6.41l-2.91 1.63-.66 1.56-3.703.203-2.48-2.51-4.364-3.734-1.653 3.09-2.05 1.424-3.47-1.968-1.257-1.935-2.348 2.07-3.107-3.19.099-2.21-1.818-1.087.198-3.571.066-.987-2.413-.306m-47.707 39.32l-1.95-2.899-3.24.338-2.314-1.89-1.72-.27-1.884.642-1.95-2.025-1.984 1.249-.76-3.004-1.356.878-1.818-1.722-1.95-.068 1.057 2.431 4.1 2.43 1.95.404.76 2.496 1.62 2.257.893 2.897 1.984 1.178m-8.53-41.648l-2.215 2.21-1.223 2.685 4.232-1.394 2.016.306 2.447-2.447-.595-1.36.231-2.212-1.09-2.587.76-1.669-.794-.954-1.62 1.125-4.066-1.227m151.417 44.76l.099 1.651 3.372 3.972 1.355.572 2.711-1.649 3.24-.303 2.05 2.221 2.942.034 2.546 1.412-3.008 3.328h-2.017l-.794 3.66.695 1.712-1.918.167-3.372 3.12-6.248 2.747-3.108-.402-1.025-1.675-3.637-.37-2.28.537-.827-1.575-5.554.234-.662 2.615-2.545 2.612-2.414-.268-3.008.369-2.248.167-2.414 2.811.133 2.175-.199.802 1.984 3.576.264 3.005 1.554-.3.463 1.568 2.48 3.368 1.388 2.8 1.52 1.965 1.852-1.332.628 1.731-1.983 1.631-.1 1.964 1.224 2.959 2.678 3.455-1.852-.431-1.719.83-.562 2.822 1.488 2.19 2.48 2.519.727 1.524 2.545 1.392.265 1.688-1.785 1.126-2.414.33 1.852 2.482-.794 2.083.893 1.917 1.29.231 1.388 4.392-3.108 1.221-.364 2.078 2.15.825.396 1.714-.794 1.515-3.835 2.8-.694 4.408-4.827-.197-.958.592-3.207.394-5.356-.197-3.108.756-.496 2.366-4.264.986 1.388 1.937 3.372 2.592-1.884 1.28v1.606l1.95 1.279.033 1.605-2.644 3.111-1.488 3.829 1.025 3.89 1.983 1.045.728 2.775 1.421 1.273.133 3.881 1.719 2.216-3.439 1.857-.033 3.288 1.521.52-.529 1.757-2.446-1.854-1.058.52-1.819 1.464-2.777.033-.793-1.431-3.835-1.725-2.678.293.066 2.31-1.983 3.836-1.852.39-.529 1.884-3.008.91-3.009.259-.892 3.05-1.224-.064-1.917 1.492-2.083-.325-.827 1.2-2.942-.032-1.322 2.01-1.157.226-2.083 1.782.165-1.555-1.389-2.496-3.074 1.718-2.579-.777-.694 1.88-4.926 2.461 2.413 3.722 1.257 1.1-1.984 1.002-1.29-.776-5.62-1.94-2.149-1.23-.991-1.943 1.553-3.434 1.422-.194 2.182-1.362-.893-2.27.86-1.947-3.14-4.449 1.586-.844.397-1.366 1.421-1.008-1.256-1.886.496-.944 2.116 1.432.727-1.204-2.645-2.376-.066-1.302-1.487-.554-2.447.358-1.09-1.27-1.224 1.205-1.455-.423-.198-2.346-2.91.619-3.206.326-.166-1.662 1.224-3.457-.364-2.285-1.091-1.208 3.405-4.084.033-5.953-1.686.033-2.413-.819-1.025-1.375-.199-2.49-1.421-1.312-2.38-.852.297-2.624-.86-1.346-2.479.295-1.19.887-1.124-1.773 1.256-2.528-1.355-2.596.958-2.598-1.917-2.534-.53-3.26-2.148.132-2.976-1.416-1.95 1.416-.298-4.086-1.454-1.484 1.95.956 1.488-1.055.198-2.21 1.124-.66-2.182-1.982-3.306-1.288-.529-1.388 1.356-.76.562-3.472 1.62-1.754 3.108-.828 1.85-3.842.365-2.187-1.62-1.924.462-1.293 1.852-1.693-2.281-2.025-2.348-.2-2.975 3.851-.992 2.654-1.025.298-1.554 2.155-1.686-.298-2.644 1.391-3.77-.861-2.248.994-1.95-1.856-.298-2.818.199-3.45-.562-2.824-2.546-2.06-5.29 2.924-2.644-1.395-2.678 2.192-.33 2.656-1.29 1.128-1.653-.233-2.282.63-.76-.795-2.678-.332 1.356 2.753-.463 1.823 7.174 3.91.562 2.912.86 1.554-.596 1.687.43 2.445-.562 6.24 2.843.89-.793 1.946-2.182 1.022-2.678 2.174.298 1.45-2.315.032-4.562-1.515-2.215.89-2.017 2.238-.76 2.04-3.24.066-2.215 1.447-1.653-.986h-1.95l-2.844 2.827-3.471-1.348-1.752-2.861 4.033-1.975.76-.955 1.984.066-.33-4.019.826-1.088-4.298-.362-1.686-1.22-.165-2.079 1.19-1.22-.066-3.27 1.686-.991-1.323-1.29.96-1.62 2.082.2-2.149-2.845-.661-2.682-2.447-1.39-2.71 1.026-1.984-.232-5.125-2.65-.66-3.017-1.026-2.023-4.165-1.56-.926.896-1.124 2.853 1.752 1.028-1.785 3.844-2.215.795-3.637 2.45-1.454.827-.563 1.753-2.248.43-1.388 1.885-2.447.727-1.058 1.487-7.835-.231-1.917.462-.86 1.52-2.182.264m90.685-75.468l.066 2.456 1.025.84 2.347-.873 2.513 2.05 3.67-.067 1.719 1.143 3.537-3.295-.86-.84-.264-4.982 1.356-1.45-2.612-2.325-1.356 1.72-2.578.067m323.43 139.99l-1.355.39-1.72 2.375-3.537.065-.595-1.919-1.62-.846-1.223 1.562-5.356.715-.165 1.203-3.406.098-2.644 3.087-.827-1.202-2.711-1.137-1.455.39-1.884-1.04-2.744-.13-1.488-.196-.066 1.983-1.52-.065-1.059 3.768-.86.649-1.884-.714 1.323 3.05-1.091.552.099 1.816-2.281 2.042-.199 1.911-1.62-.162-.793-1.879-2.546 1.62-2.578-.259-1.521.454-5.323 1.36-3.108-.55-4.628-.13-.595-1.134-3.471-.227-.199-1.555-3.207-.875-4.132-3.178-1.653 1.232-2.579 1.006-3.075 2.69-2.116-.26-.396-.874-.926-2.724.595-1.881-1.09-1.071.131-1.591 1.19-2.079-1.256-4.225-2.48-1.171 1.158-1.855-2.248-2.376-1.488 1.172-2.38-3.713 5.72-3.488-.034-2.12 1.422-1.796-1.389-1.24-.397-1.96.76-.883.1-2.255-2.182-5.006 1.52-.164-1.024-2.03-2.612.753-2.512.295.33-2.653-3.339-.328-1.355-2.754h-5.918l-.496-2.92-2.744.46-.992-1.28-2.48-1.05-3.24-2.102-1.52 1.576-2.314 1.182-3.505-.328-.165-1.61-2.083-.557-.992-2.169-1.09-.132-1.455 1.578-3.24-2.53-.893-.1-1.686-2.071-.827-2.139-2.05-.954-.76-2.602-.86-.428-1.62-3.196 2.315-3.893 1.587-.792-1.52-1.849-.563-2.411.628-2.016 2.513-4.499-1.356-1.754 1.091-3.08-.562-2.288 1.786-3.715-1.488-2.855-1.488.797-.826-2.857-1.124-.432-.827 2.093-2.744-.531.959-2.36-2.513.3 1.653-4.823-.066-3.961 1.752.666 1.488-1 .463-3.299-.86-3.302-1.058-1.969 1.025-1.436-.926-1.87.926-2.507 1.918-1.572-.794-1.438-.628-3.682-1.653-.703-3.802.268-.694-.905-2.017-.067-1.256-1.072-3.042.067-1.355 1.039-1.918-1.14-2.71-.435-1.323-1.375-1.72-.067-1.09-1.039 1.322-1.778-.959-1.61-2.38-.336-1.09-1.712-1.918-.773-1.587.94-1.091-.84-.364-1.948-1.752.27-1.058-.841.893-1.68-2.414-.27m104.868 39.314l.76-3.664-1.884-2.534-1.554.967-1.455 2.467-1.421-1.167-1.72 2.033m8.332 20.333l.959 1.126 3.14-.463 1.95 1.126.993 1.49 2.975-1.126 2.943-6.298-4.761-2.422-1.455-.465-1.421.863m-.199-.066l.265-.399-.133-.066.067-.465 1.024-2.823-.793-2.791-1.851-.532-.992-2.262-1.124-1.298-2.15-.4m-7.801-3.029l-1.653.266-3.009-1.699-.992 1.3-2.413-.1-1.025 2.164.86 1.532-2.943-1.032-.628 2.363-1.223 1.496-.728 3.557 1.422-.232.595 1.627-2.017 2.524.133 2.92m.198.199l-.033.066-1.785 2.42 1.917 1.36 3.868-1.658 2.777-.497.232 1.426 2.578-.83.86 1.36 1.72-1.127 2.413 2.088 2.248.132-.496-2.087m.066 0l2.645-.862.661 2.12 1.95-.463m-25.621 67.56l-1.521.913-.628-2.444-1.554-.391-.628 1.597-3.77.456-2.148-1.075-.33-1.598-3.67.946-1.091 1.597-3.042-1.206-1.587-.13-2.182 3.746-1.388-.684-2.414.196-.297.944-2.248.814-5.885.619-.1 1.497-2.247-.39-3.604.813-1.455 1.496-3.306-.032-.099 1.203-1.785 1.43-.298 2.047.53 2.046-3.01 1.948.464 2.693.892 1.978 1.124 6.866-1.322.42-.827 1.553.794 1.456.264 3.135.86.065.628 3.907-.397 2.452.132 3.805 2.38.805-.991 1.998 3.504 1.674-1.454 2.188.198 1.448 1.389 1.061.264 1.64-2.876 3.79.1 1.734-.827 1.092-1.587-1.188-.86-1.67-1.322 1.124-3.901-1.156-3.67.643-2.248-3.984-5.059-3.633-4.661.772-2.81-.868-3.108-2.671-1.884-2.093-2.348.58-2.678-1.289-1.421 1.482h-3.34l-1.222-.934-.662-2.964 1.157-.13-.099-3.707-2.149-1.937-1.289.775-2.215-2.195.992-1.518 1.487.42 3.373-4.783-.033-.452-4.067-3.915-.132-3.238-2.083-.324-2.05-2.172-2.645.778-2.413-.421-4.265.356-4.496-2.399-3.637 1.038-2.149-1.362-.297-2.725.496-1.623-1.686-1.721.033-3.575-1.29-.552-1.917-2.928 1.157-1.204.727-1.986-1.62.391-1.52-1.856-2.116.782-.166-1.336-2.942-.88-3.471.62m-69.56-.75l-.76 1.76-3.008.455-1.918.977 1.058 1.498-.132 1.4-2.38 3.967.297 1.235-4.166 2.307-1.322 1.428-.033 1.915-1.72-.616-1.983 2.174-2.579-.13-1.388-1.914.826-2.598-.86-.812-2.346-.065-.893-1.234-2.612 1.007-4.43 2.208 1.752 3.181 1.455 1.557-.496 3.436-2.744-.292-1.95 1.393-2.778-1.23-4.198 1.651-1.885-.388-.562 1.263-3.438 2.266-1.918 3.397-1.653 1.81 2.05 2.65 1.918-1.131 5.19-1.163.298 2.068 1.686 6.423-3.505 3.61 1.422 1.901-3.372 1.675-3.207-.58H174.5l-2.612 1.996 1.421 1.448-.595 1.705 1.224 2.09-2.05 1.863-1.323 2.57-1.553 2.44.396 2.148-1.653.353-2.083 1.796-.198 1.41-1.653 1.217-2.744.064-.926-1.858-1.058.096-2.115 2.691-2.348 1.857-1.256 2.24-2.248 1.344 2.281 4.57-1.322 3.513-.926.83-1.455-1.532-3.306.543.033-2.459-3.934-4.218.43-4.447-.53-1.665-3.371-.352-1.29-2.338-2.942-.673.231-2.18.992-1.603-3.603-1.252-2.414 1.765.992 1.7-.132 4.966-1.554-.609-1.62 2.177-2.149.448 1.124 2.08-1.19.96-.265 1.534-2.975.16-.992 2.461-1.719-.735-4 2.46-3.108.702-.893-.702-1.983.255-.76 1.5.826 1.373-.926 1.468.199 1.371-1.587.861-3.835 1.243-2.678.192-.066-2.296-.893.606-.264 1.626-3.902 1.02-1.587 2.293-2.28-1.497-2.81 3.312-1.455.796-2.414-.255.165 2.005-2.314 2.385.992.477-.694 3.082-1.918 1.143-2.645-1.588-.595-1.652-1.851.763-1.323 3.589 2.282 1.777-.794 1.967 1.653 3.107-1.62.064-3.603 1.584-2.116-2.535-.959 2.06-1.587-.665.232-1.649-1.224-1.141-3.306 1.902-.694-.253-2.645 2.661-1.322-.475-.562-2.377-1.521-.158-.43-1.395-1.554.444 1.025 3.36.926 1.9h-.86m314.14.475l-2.016-1.298-4.53-1.458-.065-3.296-3.405-3.205-1.323-2.127 2.645-.92 1.157-2.32-2.513-2.606-1.686.031-.892-2.003.793-1.082 1.885-.287 1.322-3.12 3.372-1.783 1.62 1.497-.959 2.324.827 1.114h2.215l.298-1.878 2.082.86 1.19-1.337-1.19-1.338 1.753-.733.132-1.975 2.116.478.694-1.052 1.818.733 1.686-1.435 1.918-.733 1.09-2.137-2.446-.862-2.644-5.205.991-1.63 1.058.384 1.323-2.558-1.918.064.364-1.952 4.86-1.088.066-1.248 2.083-1.089 2.81.705 1.19-3.332 1.422-1.122 7.008-1.122 1.554.289.76-1.411-1.256-1.829-.76-3.563-3.67-1.542-2.645-3.214-.363-2.734-1.488.161-1.091-1.255-3.042-.45-1.057.579-1.025-1.513-3.968.29m-129.96-25.026l.099 3.109.628.388.33 2.88 6.183 2.392-.727 1.002 2.48 3.359 1.19.968 1.586-.29 1.984.807 1.62 1.645 1.587.516-1.587 1.742.198 1.999-.595 2.577-1.719-3.544-1.918 1.804 2.282 2.287-1.488 2.029-.1 2.51 1.918.61 1.852 1.898-1.323 2.41-3.008.29-1.984-.868-3.736-.482-.628 1.51 1.785 4.751-2.314.418-.43 1.154 1.686.995 1.323 1.763-1.885 1.987.562 2.146-2.182 1.504-.991-.672-1.356 1.056-.463 2.368.463 1.79-1.455.544.76.991-.264 2.78-1.289 1.341.496.958-2.248 2.712-.165 2.169 2.777 1.02 1.851.032-.595-2.296 2.876-1.818 2.579.255 1.587 3.158-2.215 2.135.43 3.28.925 1.624-1.322 2.386.165 1.081v1.844l-1.256 2.51-1.819 1.97-4.661 3.459-2.248.539-2.876-1.3-.298-1.016-2.843.92.463.952-.893 3.488-.562.539.793 1.267v2.407l-2.413 2.817-3.042 1.329-1.388 3.13-1.025.632-1.554-.917-1.884.696-2.182-1.612-.43 1.422 1.124 2.686-.926 1.736 1.62.6-1.124 1.957.661 2.712-.363 1.261-4.232 1.23-1.72-.221-1.983-3.783-5.984-.6-1.355-.662-2.91.725.463.82-1.95 1.42-1.918-1.23-2.777.567-2.91.694-1.156 1.702-.364 2.111-.826 1.575 3.074.787.199 3.21-1.058 1.132.562 2.924.595 6.468.727 1.13-.793 1.693 1.554 1.254 1.487 3.51 2.083-.439.33 1.128-1.52 2.035 2.281 1.314-1.62 3.878-1.388.187-.265 2.282.694 2.28-1.983 1.904 2.05 3.619-.232 1.434-.595.997-.265 1.932-1.785.56-.43 1.713-3.041-.56-1.356.373-1.719 2.615-.165 1.773-4.133 4.538-1.289-2.3.198-2.3-.43-1.618 1.39-1.183 1.355 1.432 1.256-1.525.033-1.619-4.496-.062.033-1.432-2.876.56-3.108-1.495-1.422-3.241-.264-4.71-4.728 1.248 1.52 5.613-2.214 2.15-1.587-.063-3.174-4.456-1.686-1.404-2.314.5-.43-.968-1.884-2.933-1.323-4.153 1.025-2.25 3.471-1.533.562-.938 1.587-2.034-.595-1.002-2.314.094-2.314-4.354.165-2.727-1.554-1.192-.793-2.039.595-2.7-.595-1.759-1.124-2.828-1.885-1.856-2.413-2.768-3.835-.567-4.496 2.014-2.612.535-4.331 2.296-4.463.503-1.223-.88-.397-2.233-4.596-4.155v-.85l3.174-2.837 1.257-2.49 1.686 1.198 2.347-.41.033-1.924-2.413-2.43-.067-1.01 2.083-2.274 1.686-.537 2.281-1.58 1.29 1.327 2.215-1.454-1.686-2.403 2.545-.98 1.918 1.043.826-1.392-.793-3.83-1.653-1.647-.628-2.313-2.48-2.727-1.653-.063-.529-1.587.496-2.253 1.124-.762-1.289-1.715-.33-1.843.627-2.449 2.778-2.767 1.52 1.4 2.777-.16 1.687-5.188-1.29-.733.661-2.071-1.653-2.232.86-2.489m209.207 22.66l-2.116.951-.827 1.142-1.851.508-2.017-2.03-2.182 1.11-2.645.127-1.388.983-3.174.476-1.223-1.015-1.95.286-.86 1.11-1.753.158-.099-1.268-2.215-.476.496-1.46-3.703-2.19-.264-2.128 1.388-2.86-.892-1.303-3.009-.636-2.678 1.272-.132 1.685-2.942.826-1.124.858.991 2.318.397 4.252.76 2.885-.991.73-.562 2.502.198 4.146-.694.538-2.711-1.993-.43 1.772-3.14-2.5.098-1.203 1.323-1.394-2.38-3.137-1.455.064-2.579 1.838-1.917-1.775-1.389 1.141-2.744-3.487-1.884.666-3.77-.698-1.454 1.174-1.025-.54-1.983 2.378-1.885-.507 1.455 4.118 1.587 2.026 1.851 1.108 2.314.411.33 2.024-1.553 1.202-1.29-1.202-1.718.917-2.38-.569.165 1.518-.265 2.054-2.149-1.39-4.033-.159-.066-2.15-.96-1.77.629-2.089-.694-1.519.43-1.932-2.116-.285-1.521-2.503-1.52.697-1.092-1.521-1.587-.666-.496-1.713-1.421.888-1.984-.475.86-2.444-1.819-.73-1.884-2.699-.298-2.446-1.322.19-2.777-1.812-2.876-3.626-3.571 1.018-1.785-1.814-2.116 2.928-1.52 1.176M109.404 587.562l-1.025-.093-2.447-3.248-.925-2.476.958-2.168 1.786-.65 2.578-2.573.992-4.374-.43-2.204-3.67-.683-2.181-1.118.165-1.274-1.752-1.306-.794-1.865 2.215-1.027.992-1.244-1.388-.965.33-2.802.76-1.246-1.256-1.464-1.256-2.276-1.62.905-1.884-1.03-1.918-2.183-2.05.562-1.388-.655-1.885-2.278-1.686-.75-.86.937-2.082-.468-2.612 1.31-1.984.406-1.851.687-1.256 1.934-1.19-.78-3.67 2.9-4.596 1.278-1.52.093-1.786 2.025-1.95-1.682-1.653-.156-.86.966-2.545-1.153-3.207-.187-2.116-.623m112.637-2.744l-.463 2.339 1.72 5.637.958 1.432-.727 2.333 2.71.218-.066 2.673-.033.155-.033.125v.497l-1.719 1.243 1.488 2.546-2.083 2.234.231 1.52 1.687 1.675-4.2 3.656-1.388 1.58.96.929-1.323 2.908-1.157 6.955-1.124 1.945-1.29 1.667-1.058 3.947-1.09 1.973-.893.77-1.587 1.201m75.543 114.541l.661.27 2.38-2.488 1.918.09 1.917.3 1.554-.6 2.215-1.77.265-1.2 1.62-.661.066-1.05 1.686-.541 1.388.96 4.067 1.111 2.314-2.402 1.554.6 1.587-.48 1.322 2.042 2.546-1.681.562-2.223-1.256-1.322-.033-3.458-1.852-.782-.992-1.203 2.943-1.355.793-1.475-1.587-2.59-1.454-1.326 1.52-.814.298-2.714-.231-2.414-.992-.845.397-1.842 1.09-.302.265-2.236.893-1.662.43-4.204-.397-3.058-1.62-1.696-.628-2.636-.662-3.76-1.256-2.52.463-1.154-.198-2.308-3.736-5.442-.298-1.4-1.388-.852 2.413-2.253 1.223-2.102-.033-2.53 2.116-.091 1.62-1.007 1.851 1.312 2.083-.244.728-1.556 2.909-1.983-.165-.427-.199-.427 2.612-.458.992-.091.231-2.32.76-.948-.958-3.973 1.455-.428-1.488-2.05-1.554-1.07-.33-2.174.363-2.603 2.678 1.746 1.653.306.033 1.562 2.281-.551.166-1.807.925-.858 1.422.95-1.488 1.99 2.281-.122 1.752-1.409.133-2.175-2.215-1.777-1.455-1.84.595-3.374 1.058-1.75.33-3.287-.132-3.473-1.454-.83 1.818-1.17-2.612-5.08-1.52-1.817-6.91-5.089-.43-2.685-1.455-.525.364-1.637 1.455-1.792-1.521-1.793-1.95-.65-1.786-1.298-1.884-3.745-.496-3.128 1.653-.372.363-1.363-1.09-.961.33-2.481-1.62-.31-.364-1.521.728-1.863-.298-1.335 2.711-.466-1.488-3.978-2.148-.902 1.289-2.146-1.885-3.269-.033-2.71-2.413 1.247.959.81-1.62 1.307-.397 1.526-3.637.466-2.248-1.089.728-3.644-.364-2.306-.76-1.216-1.72-.093-1.289 2.836-2.314-.997 2.116-1.746-.43-1.497 1.62-1.154-.827-2.778-1.388-.874-.265-1.843.364-2.594-2.91-1.595-3.305 1.751-.53-2.126-1.785.907-.165 1.657-1.322.75-1.356-1.344.694-4.286.629-.939-.033-2.254-1.587.658-3.406.5-2.05 1.41-.925-2.255h-1.157l-1.323 1.535-2.182-1.597-1.586 1.565-4.1.125.33 3.192 1.026-.25.66 2.283h1.588l.991-1.814 1.091 1.877v1.406l-1.223 1.656 1.19 1.031-1.983 1.343-.893-1.124-1.686 1-1.29-.781-2.347 1.654.794 1.655-2.579 2.838-1.355.406-3.042-.25-3.075.188", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", stroke: theme.colors.text.primary, strokeWidth: 0.6 })));
};

const Container$1 = styled__default['default'].View.withConfig({ displayName: "Container", componentId: "sc-8ctt1d" }) `
  align-items: center;
  flex: 1;
`;
const CountryMap = ({ data }) => {
    const { width } = reactNative.useWindowDimensions();
    const theme = React.useContext(styled.ThemeContext);
    if (!data?.procedure.communityVotes) {
        return null;
    }
    const allConstituencies = data.procedure.communityVotes;
    const maxVotersConstituency = d3Array.max(allConstituencies.constituencies.map(({ total }) => total));
    return (React__default['default'].createElement(Container$1, null,
        React__default['default'].createElement(CountryMapSvg, { width: width / 1.5 }, Object.keys(constituencySvgs).map((constituencyI) => {
            const constituencyData = allConstituencies.constituencies.find(({ constituency }) => constituency === constituencyI);
            const { constituency, yes, abstination, no, total, } = constituencyData || {
                constituency: constituencyI,
                yes: 0,
                abstination: 0,
                no: 0,
                total: 0,
            };
            const yesNoValue = (yes - no) / total;
            const abstinationValue = abstination / total / 2;
            const colorValue = yesNoValue === 0
                ? 0
                : yesNoValue > 0
                    ? yesNoValue - abstinationValue
                    : yesNoValue + abstinationValue;
            const colorRange = d3Scale.scaleLinear()
                .domain([-1, 0, 1])
                .range([
                theme.colors.vote.community.no,
                theme.colors.vote.community.abstination,
                theme.colors.vote.community.yes,
            ]);
            const opacityRange = d3Scale.scaleLinear().domain([0, 1]).range([0.3, 1]);
            return (React__default['default'].createElement(Svg$1.G, { key: `constituency-${constituency}`, opacity: total ? opacityRange(total / (maxVotersConstituency || 0)) : 0.5 }, constituencySvgs[constituency]({
                fill: total
                    ? colorRange(colorValue)
                    : theme.colors.background.secondary,
                stroke: theme.colors.primary,
            })));
        }))));
};

const VoteResultsWrapper = styled__default['default'].View.withConfig({ displayName: "VoteResultsWrapper", componentId: "sc-wcoo67" }) `
  align-items: center;
`;
const VoteResultNumbers = styled__default['default'].View.withConfig({ displayName: "VoteResultNumbers", componentId: "sc-18j7tuh" }) `
  width: ${() => reactNative.Dimensions.get('window').width - 18 * 2}px;
  max-width: 464px;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 18px;
  height: 40px;
`;
const VoteResult = styled__default['default'].View.withConfig({ displayName: "VoteResult", componentId: "sc-phsgec" }) `
  justify-content: center;
  align-items: center;
`;
const VoteResultCircleNumber = styled__default['default'].View.withConfig({ displayName: "VoteResultCircleNumber", componentId: "sc-1jb9e9n" }) `
  flex-direction: row;
`;
const VoteResultNumber = styled__default['default'].Text.withConfig({ displayName: "VoteResultNumber", componentId: "sc-1t3kwod" }) `
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 12px;
  padding-top: 1px;
`;
const VoteResultLabel = styled__default['default'].Text.withConfig({ displayName: "VoteResultLabel", componentId: "sc-1jt1k5p" }) `
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 12px;
  padding-top: 6px;
`;
const VoteResultCircle = styled__default['default'].View.withConfig({ displayName: "VoteResultCircle", componentId: "sc-180xkin" }) `
  width: 11px;
  height: 11px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  margin-top: 3px;
  margin-right: 5px;
`;

const ChartLegend = ({ data }) => {
    return (React__default['default'].createElement(VoteResultsWrapper, null,
        React__default['default'].createElement(VoteResultNumbers, null, data.map(({ label, value, color }) => (React__default['default'].createElement(VoteResult, { key: label },
            React__default['default'].createElement(VoteResultCircleNumber, null,
                React__default['default'].createElement(VoteResultCircle, { color: color }),
                React__default['default'].createElement(VoteResultNumber, null, value)),
            React__default['default'].createElement(VoteResultLabel, null, label)))))));
};

const Container = styled__default['default'].View.withConfig({ displayName: "Container", componentId: "sc-1x5x0pp" }) `
  margin-horizontal: ${({ theme }) => theme.spaces.default};
  margin-vertical: ${({ theme }) => theme.spaces.default};
  align-items: center;
`;
const TopContainere = styled__default['default'].View.withConfig({ displayName: "TopContainere", componentId: "sc-1lxhwgn" }) `
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  right: 0;
`;
const TopLeftText = styled__default['default'].Text.withConfig({ displayName: "TopLeftText", componentId: "sc-12cck09" }) `
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DonutChart = ({ votesData, colors, innerTextTop, innerTextBottom, size, topLeftText, topRightSvg, hidePercentage = false, }) => {
    const theme = styled.useTheme();
    const chartSize = size - size / 5;
    const dataLabels = Object.keys(votesData);
    const total = dataLabels.reduce((sum, key) => sum + votesData[key], 0);
    const preparedData = dataLabels.map((label) => ({
        name: label,
        value: votesData[label],
    }));
    const pieObj = d3Shape.pie()
        .value((d) => {
        return d.value;
    })
        .sort(null);
    const arcs = pieObj(preparedData);
    const pieEntryData = arcs.map((value) => {
        const arcGenerator = d3Shape.arc()
            .outerRadius(chartSize / 2)
            .innerRadius(chartSize / 6);
        const path = arcGenerator(value);
        const textTransform = arcGenerator.centroid(value);
        console.log('textTransform', {
            translate: `${textTransform[0]} ${textTransform[1]}`,
        });
        const percentage = Math.round((value.data.value / total) * 100);
        return {
            path,
            textTransform,
            percentage,
        };
    });
    const vetColors = d3Scale.scaleOrdinal().domain(dataLabels).range(colors);
    const viewBox = reactNative.Platform.OS === 'web'
        ? `-${chartSize / 2} -${chartSize / 2} ${chartSize} ${chartSize}`
        : undefined;
    return (React__default['default'].createElement(Container, null,
        !!topLeftText && (React__default['default'].createElement(TopContainere, null,
            React__default['default'].createElement(TopLeftText, null, topLeftText),
            topRightSvg)),
        React__default['default'].createElement(Svg$1.Svg, { width: chartSize, height: chartSize, viewBox: viewBox },
            React__default['default'].createElement(Svg$1.G, { x: chartSize / 2, y: chartSize / 2 }, 
            // pieChart has all the svg paths calculated in step 2)
            pieEntryData.map(({ path, textTransform, percentage }, index) => path ? (React__default['default'].createElement(Svg$1.G, { key: 'pie_shape_' + index },
                React__default['default'].createElement(Svg$1.Path, { fill: vetColors(preparedData[index].name), strokeWidth: chartSize / 100, d: path }),
                !hidePercentage && percentage > 3 && (React__default['default'].createElement(Svg$1.Text, { y: "6", transform: `translate(${textTransform[0]} ${textTransform[1]})`, fontSize: '18', textAnchor: "middle", fill: theme.colors.text.secondary }, `${percentage}%`)))) : null)),
            React__default['default'].createElement(Svg$1.G, { x: chartSize / 2, y: chartSize / 2 },
                React__default['default'].createElement(Svg$1.Text, { y: -4, fontSize: "18", textAnchor: "middle", fill: theme.colors.text.primary }, innerTextTop),
                React__default['default'].createElement(Svg$1.Text, { y: 15, fontSize: "14", textAnchor: "middle", fill: theme.colors.text.primary }, innerTextBottom)))));
};

const Bar = ({ data, width, height, active = true, }) => {
    const themeContext = React.useContext(styled.ThemeContext);
    const total = data.reduce((sum, { value }) => sum + value, 0);
    const xScale = d3Scale.scaleLinear().domain([0, total]).range([0, width]);
    const getPercentage = (value, { x } = {}) => {
        const percentage = Math.round((value / total) * 100);
        if (!active || percentage < 12) {
            return null;
        }
        return (React__default['default'].createElement(Svg$1.Text, { x: (xScale(value) || 0) + (x || 0) - 4, y: height / 2 + 5, fontSize: 14, textAnchor: "end", fill: themeContext.colors.text.secondary }, `${percentage}%`));
    };
    let x = 0;
    return (React__default['default'].createElement(Svg$1.G, { opacity: active ? 1 : 0.5 }, data.map(({ value, color }) => {
        x = x + xScale(value);
        return (React__default['default'].createElement(Svg$1.G, { transform: `translate(${-xScale(value) + x} 0)` },
            React__default['default'].createElement(Svg$1.Rect, { width: xScale(value), height: height, fill: color }),
            getPercentage(value)));
    })));
};

const BarChart = ({ data, size, selectedParty, setSelectedParty, }) => {
    const theme = React.useContext(styled.ThemeContext);
    const margin = {
        top: 11,
        right: 11,
        bottom: 0,
        left: 80,
    };
    const innerWidth = size - margin.right - margin.left;
    const innerHeight = size - margin.top - margin.bottom - 13;
    const yValue = ({ party }) => party;
    const yScale = d3Scale.scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.2);
    return (React__default['default'].createElement(Svg__default['default'], { width: size, height: size - 13 },
        React__default['default'].createElement(Svg$1.G, { y: margin.top + 3 }, data.map(({ party }, i) => (React__default['default'].createElement(Svg$1.Text, { opacity: i === selectedParty ? 1 : 0.5, key: `axis-${party}`, y: yScale.bandwidth() +
                ((yScale(party) || 0) - yScale.bandwidth() / 2), fill: theme.colors.text.primary }, party)))),
        data.map(({ party, deviants }, i) => (React__default['default'].createElement(Svg$1.G, { key: `bar-${party}`, transform: `translate(${margin.left} ${yScale(party) || 0})`, onPress: () => setSelectedParty(i) },
            React__default['default'].createElement(Bar, { active: i === selectedParty, data: deviants, width: innerWidth, height: yScale.bandwidth() }))))));
};

Object.defineProperty(exports, 'ThemeProvider', {
  enumerable: true,
  get: function () {
    return styled.ThemeProvider;
  }
});
exports.BarChart = BarChart;
exports.Button = Button;
exports.ChartLegend = ChartLegend;
exports.CountryMap = CountryMap;
exports.DonutChart = DonutChart;
exports.PieChart = PieChart;
exports.ProcedureListItem = ProcedureListItem;
exports.ThumbUpIcon = ThumbUpIcon;
exports.VoteButton = VoteButton;
exports.VoteDate = VoteDate;
exports.VotesIndex = VotesIndex;
exports.darkTheme = darkTheme;
exports.lightTheme = lightTheme;
//# sourceMappingURL=index.js.map
