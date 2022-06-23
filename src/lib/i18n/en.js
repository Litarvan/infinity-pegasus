export default {
    app: {
        logout: 'Logout',
        error: {
            title: 'Error',
            content: {
                text: `Error while fetching marks: {error}

If the problem persists, please {link}, attaching the console content (CTRL + SHIFT + I, 'Console' tab).`,
                link: 'open an issue'
            },
            button: 'Cringe :)'
        },
        noMarks: {
            title: 'No mark',
            content: `Pegasus returned no mark.

If you just started your semester and really have no mark, then everything is fine.

If not, it sometimes happens that Pegasus returns no mark. In this case retry in ~30 seconds, it should fix itself.`,
            button: 'Got it'
        },
        back: {
            title: 'Going back to Pegasus ?',
            content: `To disable Infinity Pegasus and go back to the original Pegasus, simply click on the extension button.

Click again to re-enable it.`,
            button: 'Got it.'
        },
        separator: '.'
    },
    login: {
        title: 'Login',
        login_ms: 'Login with Microsoft account',
        disclaimer: {
            title: 'Disclaimer',
            content: {
                text:  `Infinity Pegasus is a web extension where all data processing is made client-side, in your browser. There is no server, except the one hosting the website assets.

Because of that, there are no terms or conditions for its usage.

Nevertheless, even though I did my best to guarantee the reliability of the data displayed, it is possible that the marks and averages aren't completely accurate.

Only the PDFs ('relevé' and 'bulletin de notes') are to be considered 100% accurate.

Coefficients are manually added throughout the year (except the modules'), which means it's common for average computation not to be accurate. To help improving their accuracy, please report any error to me, and do not hesitate to {link}.`,
                link: 'contribute to coefficients on the project\'s GitHub'
            },
            ok: 'Got it.'
        },
        terms: {
            prefix: 'By clicking on \'Login with your Microsoft account\' you agree to the',
            link: 'terms and conditions',
            suffix: 'of the service'
        }
    },
    main: {
        title: 'Home',
        progress: {
            loading: 'Loading',
            listing: {
                documents: 'Listing documents',
                filters: 'Listing filters'
            },
            fetching: {
                summary: 'Fetching the grade summary',
                report: 'Fetching the grade report'
            },
            reading: {
                summary: 'Reading the summary',
                report: 'Reading the report'
            },
        },
        average: 'average',
        promo: 'promo',
        updates: {
            title: 'Last updates',
            empty: 'No update detected since last time.',
            average: 'Promotion average',
            mark: 'Mark'
        },
        averages: {
            title: 'Averages',
            student: 'Student average',
            promo: 'Promotion average'
        },
        documents: {
            title: 'Documents'
        },
        coefficient: 'coeff.',
        empty: 'No marks',
        percentage: 'contributes for',
    },
    logout: {
        title: 'Logout',
        text: 'You are now logged out.',
        login: 'Login'
    },
    footer: {
        links: {
            coefficients: 'Coefficients',
            sources: 'Sources (GitHub)'
        },
        copyright: {
            text: 'Copyright © 2021-2022 Adrien ‘Litarvan’ Navratil',
            license: {
                prefix: 'Under',
                link: 'MIT license'
            }
        }
    }
}
