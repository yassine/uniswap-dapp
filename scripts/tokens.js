/*
  Rates "rationale":

  (sun = 109 earths,
    jupiter = 11209/1000 earths, //11.209 earths
    sun = 109 * (1000/11209) jupiter = 9.72
    saturn = 9449/1000  earths, //9.449 earths
    sun = 109 * (1000/9449) saturn = 11.53 saturn
    venus  = 9499/10000 earths
    sun = 109 * (10000/9449) venus = 115.35 venus
    mars = 533/1000 earths //0.533 earths
    sun = 109 * 1000 / 533 = 204.5 mars
  )

  setup oracle rates init,
  sun = 1 eth
  sun = ((109 * 1000) / 9449) saturn = 11.53 saturn
  sun = (109*1000/11209) jupiters = 9.72 jupiters
  sun = (109*1000/9499) venus = 117.74 venuses
*/
module.exports = {
  tokens : [
    {
      name: "Jupiter",
      symbol: "JPTR",
      exchange: 10
    },
    {
      name: "Saturn",
      symbol: "STRN",
      exchange: 12
    },
    {
      name: "Venus",
      symbol: "VNS",
      exchange: 116
    },
    {
      name: "Mars",
      symbol: "MRS",
      exchange: 205
    }
  ]
}
