//canvaksen koon määrittäminen
let taustakuva;
let kissakuva;
let lautanY = 350;
let lautan_leveys = 80;
let taustan_korkeus = 400;
let taustan_leveys = 800;

var kissalista = [];
var elamia_jaljella = 9;
var pelastetut_kissat = 0
var kissa_ajastin;

function preload() {
  taustakuva = loadImage("https://igno.cc/opetus/kuvat/tausta.png");
  kissakuva = loadImage("https://igno.cc/opetus/kuvat/cat.png");
}

function setup() {
  var canvas = createCanvas(taustan_leveys, taustan_korkeus);
  canvas.parent("kissapeli");

  angleMode(DEGREES);

}

function aloitaPeli(){
  //Nämä komennot ovat restarttia varten, eli jos halutaa pelata uudelleen ensimmäisen pelin jälkeen
  kissalista = [];
  elamia_jaljella = 9;
  pelastetut_kissat = 0
  clearTimeout(kissa_ajastin);
  loop();

  //Lähdetään luomaan kissoja, kun nappia on painettu
  luo_kissoja();
}

function draw() {
  image(taustakuva, 0, 0, taustan_leveys, taustan_korkeus);
  luo_lautta();

  //Tässäkäydään kissalista läpi ja kutsutaan kaikille liikuta metodia sekä tarkastetaan kuoliko kissa / pääsikä peille
  kissalista.forEach(function(kissa_olio, monesko) {
      kissa_olio.liikuta();

      if(kissa_olio.Y > taustan_korkeus){
        kissalista.splice(monesko, 1);
        elamia_jaljella = elamia_jaljella - 1;
      }

      if(kissa_olio.X > taustan_leveys){
        kissalista.splice(monesko, 1);
        pelastetut_kissat = pelastetut_kissat + 1;
      }
  });

  //Päivitetään pelin tilanne
  textSize(40);                      // piirretään elämät
  textAlign(LEFT, TOP);              // tekstin origo vasempaan yläreunaan
  text("Elämät: " + elamia_jaljella+ "   Pelastetut kissat: " + pelastetut_kissat, 5,5);
  if (elamia_jaljella <= 0) gameOver();       // game over teksti jos elämät lopussa
}

function luo_lautta(){
  fill('#ffe6e6');
  rect(mouseX, taustan_korkeus - 50, lautan_leveys, 30, 20, 20, 0, 0);
}

function luo_kissoja() {             // luo kissoja:
    let uusi_kisu = new Kissa();          // luodaan uusi kissa
    kissalista.unshift(uusi_kisu);        // ja lisätään se kissalistan alkuun
    kissa_ajastin = setTimeout(luo_kissoja, 2000);      // ja luodaan uusi kissa tauon jälkeen
}

//luodaan Kissa-luokka ja sille liikuta-metodi
class Kissa{
   constructor(){
     this.X = 30;
     this.Y = 200;
     this.Xnopeus = 2;
     this.Ynopeus = -2; //lähetetään ylöspäin ja painovoima tuo sitten alaspäin
     this.korkeus = 50;
     this.leveys = 50;
     this.kulma = 0;
   }
   liikuta(){
     this.X = this.X + this.Xnopeus; //liikutaan oikealle päin
     this.Ynopeus = this.Ynopeus + 0.05; //painovoima

     //Tarkistetaan osuiko kissa lauttaan
     if(this.Y + this.korkeus / 2 > lautanY){
       if(this.X > mouseX && this.X < mouseX + lautan_leveys){
        //jos osui lähetetään kissa samalla nopeudella, kun se tuli alas ylöspäin
        this.Ynopeus = -abs(this.Ynopeus);
      }
     }

     this.Y = this.Y + this.Ynopeus;

     //Seuraavilla komennoilla pyöritetään kissaa
     this.kulma = this.kulma + 1;

     push();       // tallentaa koordinaatiston origon ja kulman
     translate(this.X, this.Y); //siirtää koordinaatiston origon kissan kohdalle
     rotate(this.kulma);
     imageMode(CENTER);         //asetaa kuvan origon kuvan keskelle
     image(kissakuva, 0, 0, this.leveys, this.korkeus);
     pop();        // palauttaa koordinaatiston asetuksen alkuperäiseen

     //image(kissakuva, this.X, this.Y, this.leveys, this.korkeus);
   }
}

function gameOver() {           // piirretään game over teksti:
  noLoop();                        //pystäyttää pelin
  textSize(80);
  textAlign(CENTER)
  text("Game Over", taustan_leveys/2, taustan_korkeus/2);
}
