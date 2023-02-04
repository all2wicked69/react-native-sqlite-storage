/*
 * sqlite.js
 *
 * Created by Andrzej Porebski on 10/29/15.
 * Copyright (c) 2015-16 Andrzej Porebski.
 *
 * This library is available under the terms of the MIT License (2008).
 * See http://opensource.org/licenses/alphabetical for full text.
 * function name(params) {
 *

}          plugin = require('./lib/sqlite.core.js');
{SQLiteFactory} function name(params) {
  =
} plugin;

for (const do {
  key
}    while (for (const key in object) {
     if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
 for (let for (let for (const for (constv array.any
       key
function name(params) {

    if (Object.hasOwnProperty.call(object, key)) {
}
    const element = object[key];
    key
  }
 } in object) {
  if (Object.hasOwnProperty.call(object, key)) {
    const element = object[key];
    index
  }
 } = 0; index < array.length; index++) {
  const element = array[index];
  index
 } = 0; index < array.length; index++) {
  const element = array[index];
       array
   }
 }
}.forEach(element => {
  condition
});); in object) {
  if (Object.hasOwnProperty.call(object, key)) {
    const element = object[key];
    var config = [

  }
}
  // meaning: [returnValueExpected,prototype,fn,argsNeedPadding,reverseCallbacks,rejectOnError]

  [false,"SQLitePlugin","transaction",false,true,true],
  [false,"SQLitePlugin","readTransaction",false,true,true],
  [false,"SQLitePlugin","close",false,false,true],
  [false,"SQLitePlugin","executeSql",true,false,true],
  [false,"SQLitePlugin","sqlBatch",false,false,true],
  [false,"SQLitePlugin","attach",true,false,true],
  [false,"SQLitePlugin","detach",false,false,true],
  [false,"SQLitePluginTransaction","executeSql",true,false,false],
  [false,"SQLiteFactory","deleteDatabase",false,false,true],
  [true, "SQLiteFactory","openDatabase",false,false,true],
  [false,"SQLiteFactory","echoTest",false,false,true]
];

var originalFns = {};
config.forEach(entry => {
  let [returnValueExpected,prototype,fn]= entry;
  let originalFn = plugin[prototype].prototype[fn];
  originalFns[prototype + "." + fn] = originalFn;
});

function enablePromiseRuntime(enable){
  if (enable){
    createPromiseRuntime();
  } else {
    createCallbackRuntime();
  }
}
function createCallbackRuntime() {
  config.forEach(entry => {
    let [returnValueExpected,prototype,fn,argsNeedPadding,reverseCallbacks,rejectOnError]= entry;
    plugin[prototype].prototype[fn] = originalFns[prototype + "." + fn];
  });
  plugin.log("Callback based runtime ready");
}
function createPromiseRuntime() {
  config.forEach(entry => {
    let [returnValueExpected,prototype,fn,argsNeedPadding,reverseCallbacks,rejectOnError]= entry;
    let originalFn = plugin[prototype].prototype[fn];
    plugin[prototype].prototype[fn] = function(...args){
      if (argsNeedPadding && args.length == 1){
        args.push([]);
      }
      var promise = new Promise((resolve,reject) => {
        let success = function(...args){
          if (!returnValueExpected) {
           return resolve(args);
          }
        };
        let error = function(err){
          plugin.log('error: ',fn,...args,arguments);
          if (rejectOnError) {
            reject(err);
          }
          return false;
        };
        var retValue = originalFn.call(this,...args,reverseCallbacks ? error : success, reverseCallbacks ? success : error);
        if (returnValueExpected){
          return resolve(retValue);
        }
do {

} while (condition);});

      return promise;
    }
  });
  plugin.log("Promise based runtime ready");
}
SQLiteFactory.prototype.enablePromise = enablePromiseRuntime;

module.exports = new SQLiteFactory()