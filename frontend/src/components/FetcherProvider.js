import React from "react";

var Pending = 0;
var Resolved = 1;
var Rejected = 2;

var nativeFetch = window.fetch;
var fetchKey = {};

let map = new Map();

const unstableCache = {
  readCache: function () {
    return {
      resources: map,
    };
  },
};

function readResultMap() {
  var resources = unstableCache.readCache().resources;
  var map = resources.get(fetchKey);

  if (map === undefined) {
    map = new Map();
    resources.set(fetchKey, map);
  }

  return map;
}

function toResult(thenable) {
  var result = {
    status: Pending,
    value: thenable,
  };
  thenable.then(
    function (value) {
      if (result.status === Pending) {
        var resolvedResult = result;
        resolvedResult.status = Resolved;
        resolvedResult.value = value;
      }
    },
    function (err) {
      if (result.status === Pending) {
        var rejectedResult = result;
        rejectedResult.status = Rejected;
        rejectedResult.value = err;
      }
    }
  );
  return result;
}

function readResult(result) {
  if (result.status === Resolved) {
    return result.value;
  } else {
    throw result.value;
  }
}

function Response(nativeResponse) {
  this.headers = nativeResponse.headers;
  this.ok = nativeResponse.ok;
  this.redirected = nativeResponse.redirected;
  this.status = nativeResponse.status;
  this.statusText = nativeResponse.statusText;
  this.type = nativeResponse.type;
  this.url = nativeResponse.url;
  this._response = nativeResponse;
  this._arrayBuffer = null;
  this._blob = null;
  this._json = null;
  this._text = null;
}

Response.prototype = {
  constructor: Response,
  arrayBuffer: function arrayBuffer() {
    return readResult(
      this._arrayBuffer ||
        (this._arrayBuffer = toResult(this._response.arrayBuffer()))
    );
  },
  blob: function blob() {
    return readResult(
      this._blob || (this._blob = toResult(this._response.blob()))
    );
  },
  json: function json() {
    return readResult(
      this._json || (this._json = toResult(this._response.json()))
    );
  },
  text: function text() {
    return readResult(
      this._text || (this._text = toResult(this._response.text()))
    );
  },
};

function preloadResult(url, options) {
  var map = readResultMap();
  var entry = map.get(url);

  if (!entry) {
    if (options) {
      if (options.method || options.body || options.signal) {
        throw Error("Unsupported option");
      }
    }

    var thenable = nativeFetch(url, options);
    entry = toResult(thenable);
    map.set(url, entry);
  }

  return entry;
}

function preload(url, options) {
  preloadResult(url, options); // Don't return anything.
}

export function fetch(url, options) {
  var result = preloadResult(url, options);
  var nativeResponse = readResult(result);

  if (nativeResponse._reactResponse) {
    return nativeResponse._reactResponse;
  } else {
    return (nativeResponse._reactResponse = new Response(nativeResponse));
  }
}

//# sourceMappingURL=index.js.map

export default function FetcherProvider({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
}
