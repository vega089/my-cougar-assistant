'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

const Api = require('./data-connector');
const dataConnector = new Api.Test();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        return this.toIntent('HelloWorldIntent');
    },

    HelloWorldIntent() {
        this.ask('Hello ! What\'s your name?', 'Please tell me your name.'); // with "," the system choose between the first or the second sentence (random)
    },

    MyNameIsIntent() {
        // We have to save the name in db (this.$inputs.name.value)
        this.$speech.addText('Hey ' + this.$inputs.name.value + ', nice to meet you!')
            .addBreak('300ms')
            .addText('How are you today ?');

        this.ask(this.$speech);

    },

    OpenningTimeOfficeIntent() {
        // dataConnector.nameFunction(nameVariable, (nameVariableReturn) => {
            // use nameVariableReturn;
            this.ask('The ' + this.$inputs.office.value + ' will be open at 8am untill 8pm'); // ask -> continue the discussion
        // })

    },

    WhereIsOfficeIntent() {
        // dataConnector.nameFunction(nameVariable, (nameVariableReturn) => {
            // use nameVariableReturn;
            if (this.$inputs.buildingOrRoom.value == "USU")
                this.ask('The ' + this.$inputs.buildingOrRoom.value + ' is the building next to the library');
            else
                this.ask('The ' + this.$inputs.buildingOrRoom.value + ' is in the fourth floor of the library');
        // })
    },

    NextEventsIntent() {
        // dataConnector.nameFunction(nameVariable, (nameVariableReturn) => {
            // use nameVariableReturn;
                this.ask('The next event is cougar party at 6pm at the usu today');
        // })
    },

    HowAreYouIntent() {
        this.$speech.addText('Hey yes, I have a good time today, I am learning a lot of thing about CSUSM')
            .addBreak('300ms')
            .addText('And you, how are you ?');

        this.ask(this.$speech);
    },
    
    HowAreYouResponseIntent() {
        this.$speech.addText('Oh it\'s great, I am happy for you.')
            .addBreak('300ms')
            .addText('And, what do you want to know ?');

        this.ask(this.$speech);
    },

    ThankYouIntent() {
        this.tell('I am glad to help you, have a good day'); // tell -> end of the discussion
    },
});

module.exports.app = app;
