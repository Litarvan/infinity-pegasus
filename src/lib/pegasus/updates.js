const UPDATE_EXPIRATION_DELAY = 1000 * 60 * 60 * 24 * 7; // 7 days

export function getUpdates(filters, marks)
{
    const save = JSON.parse(localStorage.save || '{}');
    const updates = JSON.parse( localStorage.updates || '{}');

    const key = JSON.stringify(filters);
    const previous = save[key];
    if (!previous) {
        save[key] = marks;
        localStorage.save = JSON.stringify(save);

        return [];
    }

    // Just in case the bug where Pegasus returns marks with no values happens (pretty frequent actually)
    if (marks.every(m => m.subjects.every(s => s.marks.every(m => m.value === undefined)))) {
        return [];
    }

    let result = updates[key] || [];
    for (const module of marks) {
        const otherModule = previous.find(m => m.name === module.name);
        if (!otherModule) {
            // TODO: Maybe handle?
            continue;
        }

        for (const subject of module.subjects) {
            const otherSubject = otherModule.subjects.find(s => s.name === subject.name);
            if (!otherSubject) {
                // TODO: Maybe handle?
                continue;
            }

            function pushUpdate(type, id, name, value, old)
            {
                const existing = result.find(u => u.subject === subject.id && u.id === id && u.name === name);

                if (existing && !(existing.type === 'average-update' || type === 'average-update')) {
                    existing.type = type;
                    existing.date = new Date();
                    existing.value = value;
                    existing.old = old;
                } else {
                    result.push({
                        date: new Date(),
                        type,
                        subject: subject.id,
                        id,
                        name,
                        ...(value ? { value } : {}),
                        ...(old ? { old } : {})
                    });
                }
            }

            for (const { id, name, value, classAverage } of subject.marks) {
                const otherMark = otherSubject.marks.find(m => m.id === id && m.name === name);
                if (!otherMark) {
                    pushUpdate('add', id, name, value);
                } else if (otherMark.value !== value) {
                    pushUpdate(otherMark.value === undefined ? 'remove' : 'update', id, name, value, otherMark.value);
                } else if (otherMark.classAverage !== classAverage) {
                    pushUpdate('average-update', id, name, classAverage, otherMark.classAverage);
                }
            }

            for (const mark of otherSubject.marks) {
                const otherMark = subject.marks.find(m => m.name === mark.name);
                if (!otherMark) {
                    // TODO: Save deleted marks
                    pushUpdate('remove', mark.id, mark.name, undefined, mark.value);
                }
            }
        }
    }

    result = purge(result);

    save[key] = marks;
    updates[key] = result;

    localStorage.save = JSON.stringify(save);
    localStorage.updates = JSON.stringify(updates);

    return result;
}

function purge(updates)
{
    const now = new Date();
    const result = [];
    for (const update of updates) {
        if (now - new Date(update.date) < UPDATE_EXPIRATION_DELAY) {
            result.push(update);
        }
    }

    return result;
}
