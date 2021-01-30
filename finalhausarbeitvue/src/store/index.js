import {createStore} from 'vuex'

export default createStore({
    state: {
        topic: "",
        subtopic: "",
        data: [
            {
                exercise: "Übung 1",
                heading: "HTTP, URI und HTML",
                tasks: [
                    {
                        task: "Aufgabe 1",
                        txt: "Fachliche Argumentation über Erfolgsprinzipien des WWW",
                        subtasks: [
                            {
                                q: "Mit welchen fachlichen Argumenten wurde das WWW-Proposal von TBL abgelehnt?",
                                a: "- Vorgesetzter hat die Vagheit des WWW nicht verstanden und mit Evolvierbarkeit verwechselt\n" +
                                    "- Hypertext-Community empfand das WWW-Konzept als ein Rückschritt (\"broken-links\" sind möglich!)"
                            },
                            {
                                q: "Was sind die fachlichen Argumente, warum das WWW dennoch ein Erfolg wurde?",
                                a: "- Das WWW ist Effizient, Sicher und Skalierbar"
                            },
                            {
                                q: "Was wäre der Preis für die garantierte Verhinderung von “broken links”?",
                                a: "- Man müsste 'Referentielle Integrität' für Links garantieren\n" +
                                    "- Dies impliziert auch, dass man eine Ressource nur löschen kann, wenn diese nicht mehr referenziert wird\n" +
                                    "- Dies wäre nur umsetzbar durch eine zentrale Organisation aller Ressourcen und Links (-> Datenbank)"
                            }
                        ]
                    },
                    {
                        task: "Aufgabe 2",
                        txt: "HTTP",
                        subtasks: [
                            {
                                q: "Sie bekommen im Browser den HTTP Status Code 200. Was bedeutet das?",
                                a: "Status Code 200 ('OK') bestätigt einen erfolgreichen durchlauf des HTTP-Requests"
                            },
                            {
                                q: "Sie bekommen im Browser den HTTP Status Code 301. Was hat das zu bedeuten?",
                                a: "3XX Status Codes signalisieren eine Umleitung: Status Code 301 bedeutet, dass eine angefragte Ressource permanent verschoben wurde. Die neue Adresse wird im Header mit gesendet."
                            },
                            {
                                q: "Sie bekommen im Browser den HTTP Status Code 400. Was hat das zu bedeuten? Was können Sie dagegen tun?",
                                a: "4XX Status Codes signalisieren einen Fehler auf der Seite des Clients: Status Code 400 bedeutet, dass die vom Clienten gesendete HTTP-Anfrage syntaktisch fehlerhaft ist."
                            },
                            {
                                q: "Sie bekommen im Browser den HTTP Status Code 403. Was hat das zu bedeuten? Was können Sie dagegen tun?",
                                a: "Status Code 403 bedeutet, dass die Anfrage des Clienten nicht ausgeführt wurde, weil dieser nicht über die benötigten Rechte verfügt."
                            },
                            {
                                q: "In einer Webanwendung benötigen Sie eine OPTIONS-Anfrage, die die Optionen des Servers vor dem eigentlichen Zugriff erfragen soll. Aus Performanzgründen soll die Abfrage jedoch cacheable sein. Wie könnten Sie dafür eine Lösung angehen?",
                                a: "Laut der Vorlesung ist eine OPTIONS-Anfrage nicht cashable?"
                            }
                        ]
                    },
                    {
                        task: "Aufgabe 3",
                        txt: "HTML-Literatur lesen und Fragen beantworten",
                        subtasks: [
                            {
                                q: "Was ist HTML?",
                                a: "HTML (Hypertext Markup Language) ist eine (Markup)-Sprache, welche verwendet wird um Webseiten zu entwerfen."
                            },
                            {
                                q: "Wie kann man eine geschachtelte geordnete Liste der Schachtelungstiefe 3 erzeugen?",
                                a: "<ol>\n" +
                                    "\t<li>Schachtelungstiefe 1</li>\n" +
                                    "    \t<ol><li>Schachtelungstiefe 2</li><ol>\n" +
                                    "       \t\t<li>Schachtelungstiefe 3</li>\n" +
                                    "</ol>"
                            },
                            {
                                q: "Wie ist eine HTML-Tabelle aufgebaut?",
                                a: "<table>\n" +
                                    "<!-- Überschrift -->\n" +
                                    "  <tr>\n" +
                                    "    <th>Überschrift 1</th>\n" +
                                    "    <th>Überschrift 2</th>\n" +
                                    "  </tr>\n" +
                                    "<!-- Zeile 1 -->\n" +
                                    "  <tr>\n" +
                                    "    <td>Element 1</td>\n" +
                                    "    <td>Element 2</td>\n" +
                                    "  </tr>\n" +
                                    "<!-- Zeile 2 -->\n" +
                                    "  <tr>\n" +
                                    "    <td>Element 1</td>\n" +
                                    "    <td>Element 2</td>\n" +
                                    "  </tr>\n" +
                                    "</table>"
                            },
                            {
                                q: "Welche Konventionen sollte man bei Pfaden und Dateinamen beachten?",
                                a: "Man sollte relative Pfade verwenden, damit verwendete Links (z.B. Bilder) nicht an die derzeitige Adresse gebunden sind. So kann man beispielsweise ohne Probleme auf localhost die Website testen. Außerdem sollte man Leerzeichen in Dateinamen vermeiden."
                            },
                            {
                                q: "Wie baut man in HTML ein Menü?",
                                a: "<div>\n" +
                                    "  <a href=\"<link>\">Startseite</a>\n" +
                                    "  <a href=\"<link>\">Seite 1</a>\n" +
                                    "  <a href=\"<link>\">Seite 2</a>\n" +
                                    "</div>"
                            },
                            {
                                q: "Welche Attribute sollte man bei Bildern wie verwenden?",
                                a: "src = <pfad zum bild> (am besten relativ)\n" +
                                    "alt = <alternativer Text, falls das Bild nicht geladen werden kann>\n" +
                                    "width = <Breite in Pixeln>\n" +
                                    "height = <Höhe in Pixeln>"
                            }
                        ]
                    },
                    {
                        task: "Aufgabe 4",
                        txt: "HTML Wireframe",
                        subtasks: [
                            {
                                q: "haha funny question",
                                a: "funny answer XD"
                            }
                        ]
                    }
                ]
            },
            {
                exercise: "Übung 2",
                heading: "headhead",
                tasks: []
            },
            {
                exercise: "Übung 3",
                heading: "headhead",
                tasks: []
            },
            {
                exercise: "Übung 4",
                heading: "headhead",
                tasks: []
            },
            {
                exercise: "Übung 5",
                heading: "headhead",
                tasks: []
            }
        ]
    },
    mutations: {
        changeTopic(state, t) {
            state.topic = t;
        },
        changeSubTopic(state, st) {
            state.subtopic = st;
        }
    },
    actions: {},
    modules: {}
})
