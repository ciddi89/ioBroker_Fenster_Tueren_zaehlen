# ioBroker Fenster und Türen zählen
Mit diesen Javascript werden Fenster und Türen, die mit einer Alias unter Aufzählung gespeichert sind, gezählt.

Alle Fenster und Türen die mitgezählt werden sollen, sollten daher am Anfang unter Objekte oder Aufzählung mit dieser Alias deklariert werden. In diesem Fall sind sie mit "alias_fenster" bei Fenstern und "alias_tueren" bei Türen deklariert. Falls eine andere Alias genutzt werden soll, kann diese in den ersten Zeilen (derzeit Zeile 11 und 12) geändert werden.

Die Datenpunkte werden selbst erstellt. Falls ein anderer Pfad gewünscht ist, kann dieser in Zeile 17 geändert werden. Aktuell ist der Pfad: "0_userdata.0.Datenpunkte.Haus". In diesem werden zwei Unterordner erstellt namens "Fenster" und "Türen". Wo wiederrum in diesen Ordnern die erforderlichen Datenpunkte erstellt werden. (Siehe Screenshot) Bitte beachtet, das die Erstellung evtl. ein paar Sekunden dauern kann und die Datenpunkte nicht sofort zur Verfügung stehen.

Bei Fragen oder Änderungswünsche einfach ein Issue erstellen.

<img width="1310" alt="Datenpunkte Fenster" src="https://user-images.githubusercontent.com/66088020/149665625-6037c539-03a2-4154-b48c-a8238d9df5a9.png">

<img width="1286" alt="Datenpunkte Türen" src="https://user-images.githubusercontent.com/66088020/149665631-e8817a7d-4fd1-455b-82b7-852732f698af.png">
