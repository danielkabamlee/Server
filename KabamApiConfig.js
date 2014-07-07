function define(name, value) {
  Object.defineProperty(exports, name, {
    value:      value,
    enumerable: true
  });
}

define("KABAM_CLIENT_PUBLIC_KEY",  "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoxMFLRh1tRBHH9OkE5JFkXIU8ByRUqDmuFG4ys0iJ/T2rBCpRpsXfTsz8+vgEZxOncnHekv5lHZDNoAxIC70nsUEYAh1QMhxMFzHUF9gXzPdgH8khdKAgRtu7Uc9s1KGj465/l1q62Sd6bQxkCh5KYTm2iNBZKEe+B7wyZl42uLtGRvLmNTSRJcs/v3iOqCHXmKwsAx5xFQmkJ/nHsl1IiPBq9Tp5i0/GiwL7qOvW0AeDXyDHsouGAtXFmbGL0RDKIFUdc46xzsq+2bMWojT7i07njLoIq3KSnWD7leq2aBmS7RPZuxAs9C1+Edw90RJl+8IKN0YVIm96ACaxp2R4wIDAQAB");
define("KABAM_CLIENT_SECRET", "3b97a26cba4c477b777c561be8892d3c");
define("KABAM_CLIENT_ID", "gam1");
define("KABAM_CLIENT_VERSION", "1.0");
define("KABAM_WSKE_SERVER", "api.wske.kabam.com");
define("KABAM_WSKE_PORT", "443");
define("KABAM_WSKE_PROTOCOL", "https");
define("KABAM_API_SERVICE_TIMEOUT", 10);
