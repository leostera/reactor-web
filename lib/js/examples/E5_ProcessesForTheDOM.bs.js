// Generated by BUCKLESCRIPT VERSION 4.0.5, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ReActor = require("../src/ReActor.bs.js");
var ReActor_Utils = require("../src/ReActor_Utils.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var __name = "logger";

var Log = Caml_exceptions.create("E5_ProcessesForTheDOM.DOMLogger.Log");

function logger_f(env, state) {
  Curry._1(env[/* recv */3], (function (param) {
          if (param[0] === Log) {
            ReActor_Utils.DOM[/* withInnerText */1](state[/* node */0], param[1]);
            return Curry._1(env[/* loop */0], state);
          } else {
            return Curry._1(env[/* loop */0], state);
          }
        }));
  return state;
}

var dom_logger = ReActor.register(__name, ReActor.spawn(logger_f, /* record */[/* node */ReActor_Utils.DOM[/* getElementById */0]("sample")]));

function logInt(s) {
  return [
          Log,
          String(s) + ("ms - " + ReActor_Utils.Random[/* shortId */3](/* () */0))
        ];
}

var DOMLogger = /* module */[
  /* __name */__name,
  /* Log */Log,
  /* logger_f */logger_f,
  /* dom_logger */dom_logger,
  /* logInt */logInt
];

var Diff = Caml_exceptions.create("E5_ProcessesForTheDOM.Differ.Diff");

function f(env, config) {
  Curry._1(env[/* recv */3], (function (param) {
          if (param[0] === Diff) {
            var delta = ReActor_Utils.Performance[/* now */0](/* () */0) - param[1] | 0;
            ReActor.send(config[/* send_to */0], Curry._1(config[/* wrap */1], delta));
            return Curry._1(env[/* loop */0], config);
          } else {
            return Curry._1(env[/* loop */0], config);
          }
        }));
  return config;
}

function start(param) {
  return ReActor.spawn(f, param);
}

var Differ = /* module */[
  /* Diff */Diff,
  /* f */f,
  /* start */start
];

function clock_f(env, config) {
  Curry._2(env[/* sleep */2], config[/* delay */0], (function () {
          ReActor.send(config[/* send_to */1], Curry._1(config[/* wrap */2], ReActor_Utils.Performance[/* now */0](/* () */0)));
          return Curry._1(env[/* loop */0], config);
        }));
  return config;
}

function start$1(param) {
  return ReActor.spawn(clock_f, param);
}

var Clock = /* module */[
  /* clock_f */clock_f,
  /* start */start$1
];

var match = ReActor.where_is("logger");

if (match !== undefined) {
  var differ = ReActor.spawn(f, /* record */[
        /* send_to */match,
        /* wrap */logInt
      ]);
  ReActor.spawn(clock_f, /* record */[
        /* delay */0,
        /* send_to */differ,
        /* wrap */(function (x) {
            return [
                    Diff,
                    x
                  ];
          })
      ]);
} else {
  console.log("Failed to start logger.");
}

exports.DOMLogger = DOMLogger;
exports.Differ = Differ;
exports.Clock = Clock;
/* dom_logger Not a pure module */