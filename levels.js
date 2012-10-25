var levels = new Array();

var level = {
    data: 'level0.ccbjs',
    speed: 1.0,
    time : 30,
    chat: 
    [['Click to hear what I have to say.', 'wizard.png'],
   // ['We must outrun the evil witch!', 'wizard.png'],
   // ['We have stolen her Crystal Ball and she is after us.', 'wizard.png'],
//    ['I will get you!', 'witch.png'],
//    ['I have created airstreams in the sky,', 'wizard.png'],
//    ['which will carry our balloon home.', 'wizard.png'],
//    ['She has disabled our propeller,', 'wizard.png'],
//    ['so we will have to rely on the airstreams for thrust.', 'wizard.png'],
//    ['Also, outside of the airstream she can attack our balloon.', 'wizard.png'],
//    ['HA HA HA HA', 'witch.png'], ['Use the arrow keys to shift left and right,', 'wizard.png'],
//    ['and use \'Q\' and \'E\' to rotate the balloon.', 'wizard.png'],
//    ['Spacebar will fire our guns to destoy asteroids in the way.', 'wizard.png'],
//    ['I have created a portal up ahead,', 'wizard.png'],
//    ['get us there befor time runs out!', 'wizard.png'],
    ['Click to get started.', 'wizard.png']]
}
levels.push(level);

var level = {
    data: 'level1.ccbjs',
    speed: 1.0,
    time: 30,
    chat:
    [['Whew, we made it!', 'wizard.png'], 
    ['Not so fast!', 'witch.png'], 
    ['I am more powerful than you think', 'witch.png'], 
    ['This may be a little harder than I anticipated.', 'wizard.png'], 
    ['I am activating some of the balloons powers.', 'wizard.png'], 
    ['Each time you use a power it will cost us some coins.', 'wizard.png'], 
    ['Pressing \'1\' will provide us with a temporary shield', 'wizard.png'], 
    ['and pressing \'2\' will slow down the objects around us.', 'wizard.png'], 
    ['Use these powers wisely!', 'wizard.png'], ['Here we go!', 'wizard.png']]
}
levels.push(level);

var level = {
    data: '',
    chat:
    [['We have outsmarted the witch', 'wizard.png'],
    ['Rats!', 'witch.png'],
    ['Thank you for your noble efforts!', 'wizard.png'], 
    ['You WIN!', 'wizard.png']]
}
levels.push(level);

var lostChat =
    ["You Lost. Click OK to retry this level.", 'wizard.png'];

var leveldoneChat =
    ["Level Completed! Click OK to proceed to the next level.", 'wizard.png'];

var gameoverChat =
    ["You are out of lives. Click OK to try again!", 'wizard.png'];

var cost = {
    'coin': 0,
    'slow': 0,
    'pulse': 0
};