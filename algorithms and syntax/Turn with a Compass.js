/* 
You have an 8-wind compass.

You receive the direction you are facing (one of the 8 directions: N, NE, E, SE, S, SW, W, NW)
and a certain degree to turn (a multiple of 45, between -1080 and 1080); positive means clockwise,
and negative means counter-clockwise.

Return the direction you will face after the turn.

Examples
"S",  180  -->  "N"
"SE", -45  -->  "E"
"W",  495  -->  "NE"

*/


function direction(facing, turn){
    let compass = ['S', 'SW', 'W', 'NW', 'N', 'NE', 'E', 'SE'];
    let turnBuf;
    let direction;
    let res = [];
    if (turn < 0 === true) {
      turnBuf = turn * -1;
      compass = compass.reverse();
      res = res.concat(compass.slice(compass.indexOf(facing), 8), 
                    compass.slice(0, compass.indexOf(facing) + 1));
    } else {
      turnBuf = turn;
      res = res.concat(compass.slice(compass.indexOf(facing), 8), 
                        compass.slice(0, compass.indexOf(facing) + 1));
    }
    direction = (turnBuf / 45) % 8;
    return res[direction];
  }
  