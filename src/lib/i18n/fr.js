export default {
    app: {
        logout: 'Se déconnecter',
        error: {
            title: 'Erreur',
            content: {
                text: `Erreur lors de la récupération des notes : {error}

Si le problème persiste, merci {link}, en y attachant le contenu de la console (CTRL + SHIFT + I, onglet 'Console').`,
                link: 'd\'ouvrir une issue'
            },
            button: 'Cringe :)'
        },
        noMarks: {
            title: 'Aucune note',
            content: `Pegasus n'a retourné aucune note.

Si vous êtes en début de semestre et que vous n'avez vraiment aucune note, alors tout va bien.

Sinon, il arrive que Pegasus ne retourne pas de note. Dans ce cas-là réessayez dans une vingtaine de secondes, ça devrait se résoudre tout seul.`,
            button: 'Noté'
        },
        back: {
            title: 'Retourner sur Pegasus ?',
            content: `Pour désactiver Infinity Pegasus et retourner sur le Pegasus original, cliquez simplement sur le bouton de l'extension.

Cliquez à nouveau pour la ré-activer.`,
            button: 'Compris.'
        },
        separator: ','
    },
    login: {
        title: 'Se connecter',
        login_ms: 'Se connecter avec Microsoft',
        disclaimer: {
            title: 'Disclaimer',
            content: {
                text:  `Infinity Pegasus est une extension navigateur dont l'entièreté du traitement se situe côté client, dans votre navigateur. Aucun serveur n'entre en jeu, si ce n'est pour héberger les ressources du site.

De ce fait, aucune condition particulière n'est nécessaire pour son utilisation.

Cependant, même si j'ai fait de mon mieux pour garantir la fiabilité des données qui sont affichées, il est possible que les notes et moyennes affichées ne soient pas toutes exactes.

Seuls les PDFs (relevé et bulletin de notes) sont à considérer comme 100% fiables.

Les coefficients sont manuellement entrés au fur et à mesure de l'année (sauf ceux des modules), il est donc courant que le calcul des moyennes ne soit pas exact. Pour aider à améliorer leur précision, n'hésitez pas à me notifier des erreurs, et à {link}.`,
                link: 'participer à l\'ajout des coefficients sur le GitHub'
            },
            button: 'C\'est noté.'
        },
        terms: {
            prefix: 'En cliquant sur le bouton ci-dessus vous acceptez les',
            link: 'conditions d\'utilisation',
            suffix: 'du service'
        }
    },
    main: {
        title: 'Accueil',
        progress: {
            loading: 'Chargement',
            listing: {
                documents: 'Listage des documents',
                filters: 'Listage des filtres'
            },
            reading: {
                summary: 'Lecture du relevé',
                report: 'Lecture du bulletin'
            },
            fetching: {
                summary: 'Récupération du relevé de notes',
                report: 'Récupération du bulletin de notes'
            }
        },
        average: 'moyenne ',
        promo: 'promo ',
        updates: {
            title: 'Dernières mises à jour',
            empty: 'Aucune mise à jour détectée depuis la dernière fois.',
            average: 'Moyenne de promo',
            mark: 'Note'
        },
        averages: {
            title: 'Moyennes',
            student: 'Moyenne générale',
            promo: 'Moyenne de promotion'
        },
        documents: {
            title: 'Documents'
        },
        coefficient: 'coeff.',
        empty: 'Aucune note',
        percentage: 'compte pour',
    },
    logout: {
        title: 'Déconnexion',
        text: 'Vous êtes maintenant déconnecté',
        login: 'Se connecter'
    },
    footer: {
        links: {
            coefficients: 'Coefficients',
            sources: 'GitHub',
            reset: 'Reset'
        },
        copyright: {
            text: 'Copyright © 2021-2023 Adrien ‘Litarvan’ Navratil',
            license: {
                prefix: 'Sous',
                link: 'license MIT'
            }
        }
    }
}
