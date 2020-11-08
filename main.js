const fs = require("fs");
const path = require("path");
const arguments = process.argv.slice(2);
const groupby = parseInt(arguments[2]);
var students, topics;

if (arguments.length === 3) {
    try {
        students = fs.readFileSync(path.resolve(arguments[0]))
            .toString()
            .split("\r\n");

        topics = fs.readFileSync(path.resolve(arguments[1]))
            .toString()
            .split("\r\n");

        if (groupby > students.length || groupby > topics.length) {
            return console.log("no pueden haber mas grupos que estudiantes o temas")
        }
    } catch (error) {
        console.error("Hubo un error al momento de ingresar la ruta de los archivos");
    
    }
}
else {
    return console.log("solo puede ingresar 3 parametros")
}

//shuffle array
const Shuffle = (arr) => {
    var currentIndex = arr.length,
        temporaryVar,
        randomIndex;
    while (0 !== currentIndex) {
        //pick a remaining
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryVar = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryVar;
    }

    return arr;
}

const Chunk = (a, n, balanced) => {
    if (n < 2) return [a];

    var len = a.length,
        out = [],
        i = 0,
        size;
    
    if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
            out.push(a.slice(i, (i += size)));
        }
    }
        else if (balanced) {
        while (i < len) {
            size = Math.ceil((len - i) / n--);
            out.push(a.slice(i, (i += size)));
        }
    }
    else {
        n--;
        size = Math.floor(len / n);
        if (len % size === 0) size--;
        while (i < size * n) {
            out.push(a.slice(i, (i += size)));
        }
        out.push(a.slice(size * n));
    }
    return out;
}

//Assing Topic

const Group_topic = (students, topics, n) => {
    const student_shuffle = Chunk(Shuffle(students), n, true);
    const topic_shuffle = Chunk(Shuffle(topics), n, true);
    let group_topic = [];

    for (let i = 0; i < student_shuffle.length; i++){
        group_topic[i] = [`Grupo: ${i + 1} (Estudiantes: ${student_shuffle[i].length} Temas: ${topic_shuffle[i].length})`
            , student_shuffle[i], topic_shuffle[i]];
    }
    return group_topic;
}

console.log(Group_topic(students,topics, groupby))