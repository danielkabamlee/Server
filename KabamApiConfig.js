function define(name, value) {
  Object.defineProperty(exports, name, {
    value:      value,
    enumerable: true
  });
}

define("KABAM_CLIENT_PUBLIC_KEY",  "");
define("KABAM_CLIENT_SECRET", "");
define("KABAM_CLIENT_ID", "");
define("KABAM_CLIENT_VERSION", "1.0");
define("KABAM_WSKE_SERVER", "api.wske.kabam.com");
define("KABAM_WSKE_PORT", "443");
define("KABAM_WSKE_PROTOCOL", "https");
define("KABAM_API_SERVICE_TIMEOUT", 10);
