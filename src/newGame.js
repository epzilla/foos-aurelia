import {HttpClient} from 'aurelia-http-client';

export class NewGame {
  static inject() { return [HttpClient]; }
  constructor(http){
    this.heading = 'New Game';
    this.http = http;
    this.players = [
      {name: 'Adam Epling', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Albert Kurucz', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Alex Mabry', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Andrew Delongchamp', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Ashley Monroe', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Barry Tice', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Ben Goode', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Ben Taylor', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Beth Goggans', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Bill Baker', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Bill Curtis', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Brandon Dauphinais', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Brandon Steele', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Brent Deason', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Brent Dix', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Brent Humphries', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Bryan Bates', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Carla Kopp', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Carol Prestwood', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Carolyn Wyche', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Chad Cannon', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Chad Markle', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Charles Workman', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Chip Bagwell', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Chris Browning', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Christopher Cegelski', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Chris Dail', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Chris Messick', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Chris Sanders', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Craig Goodwin', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Cynthia Sandor', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Dan Muse', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'David Brad Ewing', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'David Murray', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'David Pierce', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'David Stewart', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'David Whitten', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Dell Jones', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Dick Detweiler', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Donna Barone', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Douglas Goldstein', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Dustin Clark', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Eddie Jory', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Emerson Price', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Eric Ibarra', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Erik Roehl', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'George McCrary', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Geri Ewing', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Gina Ridenour', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Glenn Ray', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Grant Patten', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Gre7g Luterman', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Greg Powell', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Greg Voce', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'HD Nguyen', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'James Gober', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jansen Ng', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jared Plummer', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jarvis Marten', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jason Amos', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jason Gastler', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jason Reinhardt', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jason Wyatt', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jay Allison', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jeff Strouse', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jennifer Kirby', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jeremy Zoller', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jim Doyle', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jim Wyatt', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Joe Auteri', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Joe Davis', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Joe Moretti', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'John Brewer', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'John Cole', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'John White', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Johnny Thorington', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jon Martin', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jonathan Creekmore', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jonathan Heath', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Jordan Frazer', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kathleen Snyder', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kathryn Caspar', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kelly Johnson', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kerry DuBois', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kevin Banks', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kevin Lettow', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kevin Orndorf', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Key Foster', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kristi Caradonna', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kurt Copley', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Kyle Banks', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Lewis Chi', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Lisa Heise', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Lyle Johnson', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Margith McElven', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Mark Barr', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Mark Guagenti', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Mark Kershner', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Mark Shafer', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Matt Gann', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Matt Hales', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Matt Pasulka', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Maverick Morgan', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Max Avula', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Max Franks', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Max Wright', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Megan Kearl', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Megan Nivens', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Mia Chung', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Michael Davidson', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Michelle Pessler', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Mike Nelson', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Nathan Warner', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Nirav Patel', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Patricia Forrest', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Phillip Slawinski', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Rick Martindale', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Robert Cobbs', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Robert Newberry', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Rob Toth', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Robyn Terry', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Ron Jolly', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Russ Dickerson', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Scott Sansom', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Shari Harper', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Sharon Jefferson', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Snappy Cat', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Steve Sweeney', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Tad Harris', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Terry Bayne', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Tim Taylor', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Topher Cantrell', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Troy Gutterridge', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Tyler Crumpton', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Vamshi Krishna', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0},
      {name: 'Wade Oakes', matches: 0, games: 0, matchesWon: 0, matchesLost: 0, gamesWon: 0, gamesLost: 0, pct: 0.000, ptsFor: 0, ptsAgainst: 0}
    ];
  }

  // activate(){
  //   return this.http.jsonp(url).then(response => {
  //     this.images = response.content.items;
  //   });
  // }

  // canDeactivate(){
  //   return confirm('Are you sure you want to leave?');
  // }
}