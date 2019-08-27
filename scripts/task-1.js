import quiz from "./quiz-data.js";

const refs = {
    form: document.querySelector("form"),
    btn: document.querySelector("button"),
    quizTitle: document.createElement("h2")
};

const formSections = quizQuestions => {
    let i = 1;

    const sections = quizQuestions.map(quest => {
        const sectionRefs = {
            title: document.createElement("h3"),
            section: document.createElement("section"),
            list: document.createElement("ol")
        };

        let answer = `${i}`;
        replies[answer] = false;
        sectionRefs.section.classList.add("section");
        sectionRefs.title.textContent = `${i}. ` + quest.question;
        sectionRefs.list.setAttribute("id", `list${i}`);

        const choices = formChoices(quest.choices, i);

        choices.forEach(choice => {
            sectionRefs.list.appendChild(choice);
        });

        i += 1;
        sectionRefs.section.appendChild(sectionRefs.title);
        sectionRefs.section.append(sectionRefs.list);

        return sectionRefs.section;
    });

    return sections;
};

const formChoices = function(choices, i) {
    let j = 1;

    const items = choices.map(choice => {
        const twoRefs = {
            item: document.createElement("li"),
            label: document.createElement("label"),
            input: document.createElement("input")
        };

        twoRefs.label.textContent = `${choice}`;
        twoRefs.input.setAttribute("type", "radio");
        const name = "choice" + i;
        const value = j;
        j += 1;
        twoRefs.input.setAttribute("name", name);
        twoRefs.input.setAttribute("value", value);
        twoRefs.label.prepend(twoRefs.input);
        twoRefs.item.appendChild(twoRefs.label);

        return twoRefs.item;
    });

    return items;
};

const checkAnswers = (quizQuestions) => {
    let i = 1;

    quizQuestions.forEach(quest => {
        let choices = document.getElementsByName(`choice${i}`);
        let answerProvided;

        choices.forEach(item => {
            if (item.checked) {
                answerProvided = item.value;
            }
        });

        if (Number(answerProvided) === quest.answer + 1) {
            replies[`${i}`] = true;
        }

        i += 1;
    });

    let points = Object.values(replies).reduce((acc, answer) => {
        if (answer) {
            acc += 1;
        }
        return acc;
    }, 0);

    const howQuestions = Object.values(replies).length
    const percent = ((points / howQuestions) * 100).toFixed(1);
    let str = percent > 80 ? "Тест пройден!" : "Тест не пройден ))";

    alert(`Ваш результат ${percent}%. ${str}`);
};

const submitFunction = () => {
    event.preventDefault();
    checkAnswers(quiz.questions);
};

let replies = {};
refs.form.addEventListener("submit", submitFunction);
refs.quizTitle.textContent = quiz.title;
refs.btn.before(refs.quizTitle);

const quizQuestions = formSections(quiz.questions);

quizQuestions.forEach(quest => {
    refs.btn.before(quest);
});