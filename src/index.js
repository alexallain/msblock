export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const cf = request.cf || {};

    // TEST OVERRIDE (remove after testing)
    const fakeRegion = request.headers.get("x-test-region");
    const fakeCountry = request.headers.get("x-test-country");
    const region = fakeRegion || cf.regionCode;
    const country = fakeCountry || cf.country;

    const isMS = (country === "US" && region === "MS");
    const restricted = /^\/register\.php(\/.*|\?.*|$)/;

    if (isMS && restricted.test(url.pathname + url.search)) {
      return new Response("Registration is not available in your region.", {
        status: 451,
        headers: { "Cache-Control": "no-store" }
      });
      // Or redirect:
      // return Response.redirect("https://cboard.cprogramming.com/", 302);
    }

    return fetch(request);
  }
};
//test
