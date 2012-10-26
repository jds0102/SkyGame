var levels = new Array();

var level = {
    data: 'level0.ccbjs',
    speed: 1.0,
    time: 30,
    witch: 0.3,
    power: null,
    chat: 
    [['Click to hear what I have to say.', 'wizard.png'],
    ['We must outrun the evil witch!', 'wizard.png'],
    ['We have stolen her Crystal Ball and she is after us.', 'wizard.png'],
    ['I will get you!', 'witch.png'],
    ['I have created airstreams in the sky,', 'wizard.png'],
    ['which will carry our balloon home.', 'wizard.png'],
    ['She has disabled our propeller,', 'wizard.png'],
    ['so we will have to rely on the airstreams for thrust.', 'wizard.png'],
    ['Also, outside of the airstream she can attack our balloon.', 'wizard.png'],
    ['HA HA HA HA', 'witch.png'], ['Use the arrow keys to shift left and right,', 'wizard.png'],
    ['and use \'Q\' and \'E\' to rotate the balloon.', 'wizard.png'],
    ['Spacebar will fire our guns to destoy asteroids in the way.', 'wizard.png'],
    ['If you lose health, collect the red globes to heal up.', 'wizard.png'],
    ['I have created a portal up ahead,', 'wizard.png'],
    ['get us there befor time runs out!', 'wizard.png'],
    ['Click to get started.', 'wizard.png']]
}
levels.push(level);

var level = {
    data: 'level1.ccbjs',
    speed: 1.0,
    time: 35,
    witch: 0.3,
    power: null,
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
    data: 'level2.ccbjs',
    speed: 1.0,
    time: 35,
    witch: 0.35,
    power: 10000,
    chat:
    [['Alright! Go YOU!', 'wizard.png'],
    ['You escaped again?', 'witch.png'],
    ['Don\'t dare think I\'ll let you escape that easy!', 'witch.png'],
    ['Minions! My dear foools! Get them!!!', 'witch.png'],
    ['Don\'t worry my friend....', 'wizard.png'],
    ['We have some powers in our arsenal too!', 'wizard.png'],
    ['I am activating one more of the balloons powers.', 'wizard.png'],
    ['Pressing \'3\' will provide us with a pulse to destroy...', 'wizard.png'],
    ['everything in our path.', 'wizard.png'],
    ['Use these powers wisely!', 'wizard.png'], ['Here we go!', 'wizard.png']]
}
levels.push(level);

var level = {
    data: 'level3.ccbjs',
    speed: 0.8,
    time: 45,
    witch: 0.35,
    power: 10000,
    chat:
    [['We\'re almost there!', 'wizard.png'],
    ['Hey witch!', 'wizard.png'],
    ['??', 'witch.png'],
    ['What does a witch get if she is a poor traveller ?', 'wizard.png'],
    ['.....', 'witch.png'],
    ['Broom sick ! HA HA HA', 'wizard.png'],
    ['You insolent piece of $]-[I! !!', 'witch.png'],
    ['There\'s no way you can escape this maze!', 'witch.png'],
    ['Maze?!! HA HA,  Keep to the left,', 'wizard.png'],
    ['and we\'ll be through before it\'s Halloween.', 'wizard.png'],
    ['Here we go!', 'wizard.png']]
}
levels.push(level);

var level = {
    data: 'level4.ccbjs',
    speed: 1.2,
    time: 45,
    witch: 0.35,
    power: 10000,
    chat:
    [['Good Job!', 'wizard.png'],
    ['NOOOOOOOOOOOOOOOOOOOOOOOOOOOO', 'witch.png'],
    ['Shut up, witch!', 'wizard.png'],
    ['Don\'t let her distract you. We\'re near the end.', 'wizard.png'],
    ['You wish! You\'re stuck in the center of my hole!', 'witch.png'],
    ['HA HA HA HA!', 'wizard.png'],
    ['You think it\'s funny? Try getting out!', 'witch.png'],
    ['Look alive friend, we\'re in for a ride!', 'wizard.png'],
    ]
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
    'coin': 20,
    'slow': 15,
    'pulse': 15
};