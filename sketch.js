let in_a1_start, in_a1_end;
let in_a2_start, in_a2_end;

let in_r1_start, in_r1_end;
let in_r2_start, in_r2_end;

let THE_VALUE = 500;

function setup() {
  let c = createCanvas(800, 500);
  c.parent("canvas_container");

  in_a1_start = createInput("0").size(30).parent("overlay_container");
  in_a1_end = createInput("1023").size(30).parent("overlay_container");

  in_a2_start = createInput("0").size(30).parent("overlay_container");
  in_a2_end = createInput("360").size(30).parent("overlay_container");

  createSpan("map").parent("overlay_container").class("h_function");
  createSpan("(x,").parent("overlay_container").class("h_text");
  in_r1_start = createInput("200").class("map in_r1_start").parent("overlay_container");
  createSpan(",").parent("overlay_container").class("h_text");
  in_r1_end = createInput("800").class("map in_r1_end").parent("overlay_container");
  createSpan(",").parent("overlay_container").class("h_text");
  in_r2_start = createInput("0").class("map in_r2_start").parent("overlay_container");
  createSpan(",").parent("overlay_container").class("h_text");
  in_r2_end = createInput("180").class("map in_r2_end").parent("overlay_container");
  createSpan(");").parent("overlay_container").class("h_text");
}

function draw() {
  clear(); //background(220);
  strokeWeight(3);

  let a1 = {
    x: 100,
    y: 150,
    l: 600,
    h: 20,
    a: in_a1_start.value(),
    b: in_a1_end.value(),
  };
  let a2 = {
    x: 100,
    y: 350,
    h: 20,
    a: in_a2_start.value(),
    b: in_a2_end.value(),
  };
  let range1 = { a: Number(in_r1_start.value()), b: Number(in_r1_end.value()) };
  let range2 = { a: Number(in_r2_start.value()), b: Number(in_r2_end.value()) };
  a2.l = (a1.l / a1.b) * a2.b;

  drawHorizontalAxis(a1.x, a1.y, a1.l, a1.h, 2, 2);
  in_a1_start.position(a1.x - 10 - in_a1_start.width, a1.y - 10);
  in_a1_end.position(a1.x + a1.l + 10, a1.y - 10);

  drawHorizontalAxis(a2.x, a2.y, a2.l, a2.h, 2, 2);
  in_a2_start.position(a2.x - 10 - in_a1_start.width, a2.y - 10);
  in_a2_end.position(a2.x + a2.l + 10, a2.y - 10);

  strokeWeight(2);
  textSize(14);
  drawMapping(range1.a, range1, range2, a1, a2);
  drawMapping(range1.b, range1, range2, a1, a2);
  strokeWeight(5);
  textSize(20);
  drawMapping(THE_VALUE, range1, range2, a1, a2);
  textAlign(LEFT, BOTTOM);
  textSize(40);
  textFont("Inconsolata");
  textStyle(BOLD);
  fill(0);
  // text("map(x,    ,    ,    ,    );", 15, 75);
  fill(255, 150, 0);
  // text("map", 15, 75);
}

function drawMapping(v1, range1, range2, a1, a2) {
  let v2 = map(v1, range1.a, range1.b, range2.a, range2.b);

  let px1 = map(v1, a1.a, a1.b, a1.x, a1.x + a1.l);
  let px2 = map(v2, a2.a, a2.b, a2.x, a2.x + a2.l);

  if (v1 <= range1.b && v1 >= range1.a) stroke(0, 255, 0);
  else stroke(255, 0, 200);

  //strokeWeight(3);
  line(px1, a1.y, px2, a2.y);

  line(px1, a1.y, px1, a1.y - 10);
  line(px2, a2.y, px2, a2.y + 10);

  // textSize(14);
  noStroke();
  fill(0);
  textAlign(CENTER, BOTTOM);
  text(v1.round(2), px1, a1.y - textSize() * 1.5);
  textAlign(CENTER, TOP);
  text(v2.round(2), px2, a2.y + textSize() * 1.5);
}

function drawHorizontalAxis(x, y, l, h, divs, recursion) {
  stroke(100);
  strokeWeight(2);
  line(x, y, x + l, y);
  line(x, y - h / 2, x, y + h / 2);
  line(x + l, y - h / 2, x + l, y + h / 2);
  divideLine(x, y, l, h, divs, recursion);

  function divideLine(x, y, l, h, divs, recursion) {
    console.log(recursion);
    strokeWeight(recursion + 1.5);

    for (let i = 0; i < divs; i++) {
      let d = l / divs;
      let xd = x + i * d;
      if (i >= 1) line(xd, y - h / 2, xd, y + h / 2);

      if (recursion > 0) divideLine(xd, y, d, h * 0.75, divs, recursion - 1);
    }
  }
}

function mouseWheel(event) {
  THE_VALUE += event.delta;
  return false; // block page scrolling
}

Number.prototype.round = function (decimals) {
  if (typeof decimals === "undefined") {
    decimals = 0;
  }
  return Math.round(this * Math.pow(10, decimals)) / Math.pow(10, decimals);
};
