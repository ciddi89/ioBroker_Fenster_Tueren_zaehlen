/*
Script zum Zählen der geöffneten/geschlossen Fenster und Türen + Liste erstellen der geöffneten Fenster
erstellt von Christian Behrends (ciddi89)
Github: https://github.com/ciddi89
zuletzt geändert am 17.01.2022
*/

//Alias der zu zählenden Fenster und Türen
let aliasDoors      = 'alias_tueren';
let aliasWindows    = 'alias_fenster';

//Selektoren
const selector_doors    = $('state[id=*](functions=' + aliasDoors + ')');
const selector_windows  = $('state[id=*](functions=' + aliasWindows + ')');

//Auswählen bei welchen Werte die Fenster und Türen geöffnet/geschlossen sind
let isOpen = 1;     //['true', 'offen', 'open', 'opened', '1'];
let isClosed = 0;   //['false', 'geschlossen', 'closed', '0']; 

//Datenpunkte
//Alias
let tueren  = 'Türen';
let fenster = 'Fenster';

let anzahl_tueren_gesamt        = 'Anzahl_Türen_gesamt';
let anzahl_tueren_geschlossen   = 'Anzahl_Türen_geschlossen';
let anzahl_tueren_geoeffnet     = 'Anzahl_Türen_geöffnet';
let liste_tueren_geoeffnet      = 'Liste_Türen_geöffnet';
let tuer_zuletzt_geoeffnet      = 'Name_Tür_zuletzt_geöffnet';

let anzahl_fenster_gesamt        = 'Anzahl_Fenster_gesamt';
let anzahl_fenster_geschlossen   = 'Anzahl_Fenster_geschlossen';
let anzahl_fenster_geoeffnet     = 'Anzahl_Fenster_geöffnet';
let liste_fenster_geoeffnet      = 'Liste_Fenster_geöffnet';
let fenster_zuletzt_geoeffnet    = 'Name_Fenster_zuletzt_geöffnet';


//Hauptpfad
const dp_mainPath = '0_userdata.0.Datenpunkte.Haus';

//Türen
const dp_number_doors_total     = dp_mainPath + '.' + tueren + '.' + anzahl_tueren_gesamt;
const dp_number_doors_closed    = dp_mainPath + '.' + tueren + '.' + anzahl_tueren_geschlossen;
const dp_number_doors_open      = dp_mainPath + '.' + tueren + '.' + anzahl_tueren_geoeffnet;

const dp_list_doors_open        = dp_mainPath + '.' + tueren + '.' + liste_tueren_geoeffnet;
const dp_door_last_opened       = dp_mainPath + '.' + tueren + '.' + tuer_zuletzt_geoeffnet;

//Fenster
const dp_number_windows_total   = dp_mainPath + '.' + fenster + '.' + anzahl_fenster_gesamt;
const dp_number_windows_closed  = dp_mainPath + '.' + fenster + '.' + anzahl_fenster_geschlossen;
const dp_number_windows_open    = dp_mainPath + '.' + fenster + '.' + anzahl_fenster_geoeffnet;

const dp_list_windows_open      = dp_mainPath + '.' + fenster + '.' + liste_fenster_geoeffnet;
const dp_window_last_opened     = dp_mainPath + '.' + fenster + '.' + fenster_zuletzt_geoeffnet;

//Counters
let jsStart_count = null;

//Datenpunkte erstellen falls nicht vorhanden (Werden bei Skriptstart erstellt)
function createDPs() {
    //Türen Datenpunkte erstellen
    if (!existsObject(dp_number_doors_total)) {
        createState(dp_number_doors_total, 0, {name: anzahl_tueren_gesamt, type: "number", unit: 'Tür(en)'}, function (){
            log('Datenpunkt '+ anzahl_tueren_gesamt +' wurde erstellt'); });};
    if (!existsObject(dp_number_doors_closed)) {
        createState(dp_number_doors_closed, 0, {name: anzahl_tueren_geschlossen, type: "number", unit: 'Tür(en)'}, function (){
            log('Datenpunkt '+ anzahl_tueren_geschlossen +' wurde erstellt'); });};
    if (!existsObject(dp_number_doors_open)) {
        createState(dp_number_doors_open, 0, {name: anzahl_tueren_geoeffnet, type: "number", unit: 'Tür(en)'}, function (){
            log('Datenpunkt '+ anzahl_tueren_geoeffnet +' wurde erstellt'); });};
    if (!existsObject(dp_list_doors_open)) {
        createState(dp_list_doors_open, '', {name: liste_tueren_geoeffnet, type: "string"}, function (){
            log('Datenpunkt '+ liste_tueren_geoeffnet +' wurde erstellt'); });};
    if (!existsObject(dp_door_last_opened)) {
        createState(dp_door_last_opened, '', {name: tuer_zuletzt_geoeffnet, type: "string"}, function (){
            log('Datenpunkt '+ tuer_zuletzt_geoeffnet +' wurde erstellt'); });};

    //Fenster Datenpunkte erstellen
    if (!existsObject(dp_number_windows_total)) {
        createState(dp_number_windows_total, 0, {name: anzahl_fenster_gesamt, type: "number", unit: 'Fenster'}, function (){
            log('Datenpunkt '+ anzahl_fenster_gesamt +' wurde erstellt'); });};
    if (!existsObject(dp_number_windows_closed)) {
        createState(dp_number_windows_closed, 0, {name: anzahl_fenster_geschlossen, type: "number", unit: 'Fenster'}, function (){
            log('Datenpunkt '+ anzahl_fenster_geschlossen +' wurde erstellt'); });};
    if (!existsObject(dp_number_windows_open)) {
        createState(dp_number_windows_open, 0, {name: anzahl_fenster_geoeffnet, type: "number", unit: 'Fenster'}, function (){
            log('Datenpunkt '+ anzahl_fenster_geoeffnet +' wurde erstellt'); });};
    if (!existsObject(dp_list_windows_open)) {
        createState(dp_list_windows_open, '', {name: liste_fenster_geoeffnet, type: "string"}, function (){
            log('Datenpunkt '+ liste_fenster_geoeffnet +' wurde erstellt'); });};
    if (!existsObject(dp_window_last_opened)) {
        createState(dp_window_last_opened, '', {name: fenster_zuletzt_geoeffnet, type: "string"}, function (){
            log('Datenpunkt '+ fenster_zuletzt_geoeffnet +' wurde erstellt'); });};
}

//Türen
//Funktionen
function count_doors() {
    let doorsOpen = 0;
    let doorsClosed = 0;
    let doorsTotal = 0;
    let list_doorsOpen = [];

    let doors = getObject('enum.functions.' + aliasDoors).common.members;


for (let i = 0; i < doors.length; i++) {
        let val_doors = getState(doors[i]).val;
        doorsTotal = doorsTotal + 1;
            if (val_doors == isOpen) {
                doorsOpen = doorsOpen + 1;
                list_doorsOpen.push(getObject(doors[i]).common.name)
            }
    }
    for (let i = 0; i < doors.length; i++) {
        let val_doors = getState(doors[i]).val;
            if (val_doors == isClosed) {
                doorsClosed = doorsClosed + 1;
            }
    }
    //Datenpunkte befüllen
    setState(dp_number_doors_total, doorsTotal);
    setState(dp_number_doors_closed, doorsClosed);
    setState(dp_number_doors_open, doorsOpen);

    if (doorsOpen == 0) {
        setState(dp_list_doors_open, ('Alle Türen sind geschlossen.'))
    } 
    else if (doorsOpen == doorsTotal) {
        setState(dp_list_doors_open, ('Alle Türen sind geöffnet'))
    }
    else {
        setState(dp_list_doors_open, String(list_doorsOpen.join(', ')));
    }
}

//Fenster
//Funktionen
function count_windows() {
    let windowsOpen = 0;
    let windowsClosed = 0;
    let windowsTotal = 0;
    let list_windowsOpen = [];

    let windows = getObject('enum.functions.' + aliasWindows).common.members;


for (let i = 0; i < windows.length; i++) {
        let val_windows = getState(windows[i]).val;
        windowsTotal = windowsTotal + 1;
            if (val_windows == isOpen) {
                windowsOpen = windowsOpen + 1;
                list_windowsOpen.push(getObject(windows[i]).common.name)
            }
    }
    for (let i = 0; i < windows.length; i++) {
        let val_windows = getState(windows[i]).val;
            if (val_windows == isClosed) {
                windowsClosed = windowsClosed + 1;
            }
    }
    //Datenpunkte befüllen
    setState(dp_number_windows_total, windowsTotal);
    setState(dp_number_windows_closed, windowsClosed);
    setState(dp_number_windows_open, windowsOpen);

    if (windowsOpen == 0) {
        setState(dp_list_windows_open, ('Alle Fenster sind geschlossen.'))
    } 
    else if (windowsOpen == windowsTotal) {
        setState(dp_list_windows_open, ('Alle Fenster sind geöffnet'))
    }
    else {
        setState(dp_list_windows_open, String(list_windowsOpen.join(', ')));
    }
}

//Main function
function main() {
    //Datenpunkte sofort erstellen
    createDPs();
    //Bei state Änderung einer Tür auslösen und zählen
    selector_doors.on(function (obj) {
        count_doors();
        if (obj.state.val == 1) {
            setState(dp_door_last_opened, (obj).common.name);  
        }
    });

    //Bei state Änderung eines Fenster auslösen und zählen
    selector_windows.on(function (obj) {
        count_windows();
        if (obj.state.val == 1) {
            setState(dp_window_last_opened, (obj).common.name);  
        }
    });
    
    jsStart_count = setTimeout(function() {
        count_doors();
        count_windows();
        }, 2000);
    };

main();
