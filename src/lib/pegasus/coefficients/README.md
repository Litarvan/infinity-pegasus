# Comment écrire un fichier de coefficients ?

Les coefficients peuvent être récupérés sur le bulletin pour les semestres terminés, ou en se démerdant avec le syllabus
sinon. Le tout peut être écrit dans un fichier `sX_ANNEE.js` et ajouté dans le fichier `index.js` via un `Symbol`, un
import dans l'objet `coefficients`, et une condition dans le switch de `getCoefficients` en bas (il suffit de suivre
l'exemple de ce qui est déjà écrit).

Le format d'un fichier est le suivant :
```js
export default {
    MODULE1: {
        SUJET1: {
            _subject: 2, // Coefficient du sujet
            'Note n°1': 3, // Coefficient de la note
            'Note n°2': 4
        },
        SUJET2: {
            // ...
        }
    },
    MODULE2: {
        // ...
    }
};
```

Quelques détails sont à retenir :

- Les noms des notes sont des Regex, match les unes après les autres. De ce fait, il est possible d'écrire :

```js
export default {
    MODULE1: {
        SUJET1: {
            'Sujet CC[1-3]': 3,
            '.*': 2
        }
    }
}
```

Les notes telles que `Sujet CC1` ou `Sujet CC2` seront coefficient 3, et les autres coefficient 2.

**Attention : Il faut penser à escape les `[` s'ils ne sont pas utilisés pour écrire une range !**

- Il est possible d'utiliser le nom d'un module comme clé si celui-ci n'a pas d'ID.
- Il est possible d'utiliser le numéro d'une note (correspondant à l'ordre dans le relevé) comme clé si plusieurs notes
ont le même nom.

Ce code est donc valide :
```js
export default {
    'Harmonisation mathématique': {
        SUJET1: {
            0: 3 // La première note a pour coefficient 3
        }
    }
};
```

- Par défaut, les notes et les sujets ont pour coefficient 1.
- Il est inutile de préciser les coefficients des notes d'un sujet si ce sont tous les mêmes (non jure).
- Il est inutile de préciser les coefficients d'un module si tous les sujets ont le même coefficient, et que les notes de
ces derniers ont aussi les mêmes coefficients (ah bon).

De ce fait, ces deux codes sont équivalents (en admettant que MODULE2#SUJET2 a pour seule note 'Note n°1'):
```js
export default {
    MODULE1: {
        SUJET1: {
            _subject: 1,
            'Note n°1': 2,
            'Note n°2': 2
        },
        SUJET2: {
            _subject: 2,
            'Note n°1': 3,
            'Note n°2': 2,
            'Note n°3': 1
        },
        SUJET3: {
            _subject: 1,
            'Note n°1': 2,
            'Note n°2': 3,
        }
    },
    MODULE2: {
        SUJET1: {
            _subject: 3,
            '.*': 2
        },
        SUJET2: {
            _subject: 3,
            'Note n°1': 3
        }
    }
};
```
```js
export default {
    MODULE1: {
        SUJET2: {
            _subject: 2,
            'Note n°1': 3,
            'Note n°2': 2
        },
        SUJET3: {
            'Note n°1': 2,
            'Note n°2': 3,
        }
    }
};
```
