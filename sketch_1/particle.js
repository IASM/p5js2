function Particle(x, y){
  this.pos = createVector(random(width),random(height));
  this.prev = this.pos;
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxSpeed = 5;
  this.maxForce = 0.3;
}

Particle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);

}
Particle.prototype.applyForce = function(f){
  this.acc.add(f);
}

Particle.prototype.behaviors = function(target){
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX,mouseY);
  var flee = this.flee(mouse);
  // arrive.mult(1);
  flee.mult(5);
  this.applyForce(arrive);
  this.applyForce(flee);

}

Particle.prototype.arrive = function(target){

  var desired = p5.Vector.sub(target,this.pos);
  var d = desired.mag();
  var speed = this.maxSpeed;
  if(d < 100){

    speed = map(d,0,100,0,this.maxSpeed);

  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxForce);
  return steer;

}
Particle.prototype.seek = function(target){

  var desired = p5.Vector.sub(target,this.pos);
  desired.setMag(this.maxSpeed);
  var steer = p5.Vector.sub(desired,this.vel);
  steer.limit(this.maxForce);
  return steer;

}
Particle.prototype.flee = function(target){

  var desired = p5.Vector.sub(target,this.pos);
  var d = desired.mag();
  if(d< 100){


    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired,this.vel);
    steer.limit(this.maxForce);
    return steer;
  }else{
    return createVector();

  }
}

Particle.prototype.show = function(){

  fill(255);
    ellipse(this.pos.x,this.pos.y,5,5);

}
