
const App = {
    data() {
        return {
            title: "Мои дела",
            myPlaseholder: "Пиши заметку",
            myInputValue: "",
            notes: [],
            readyNotes: [],
            readyNotesCounter: 0,
        }
    },
    methods: {
        // Оптимизация с помощью v-model=""
        // getInputValue(event) {
        //     this.myInputValue = event.target.value;
        // },
        addNewNotes(event) {
            if (this.myInputValue != "") {
                this.notes.push(this.myInputValue);
                localStorage.setItem('notes', JSON.stringify(this.notes));
                this.myInputValue = "";
            }
        },
        deleteNote(index,event) {
            this.notes.splice(index,1);
            localStorage.setItem('notes', JSON.stringify(this.notes));
            if (this.readyNotesCounter > 0) {
                this.readyNotesCounter -=1;
            }
        },
        deleteReadyNote(index) {
            this.readyNotes.splice(index,1);
            localStorage.setItem('notesReady', JSON.stringify(this.readyNotes));
        },
        readyNote(myNote,event) {
            // event.target.closest('li').classList.add("ready-note");
            // this.readyNotesCounter +=1;
            // this.$refs.list.append(event.target.closest('li'));
            // event.target.remove();
            // localStorage.setItem('notesReady', JSON.stringify(this.notes));
            this.readyNotes.push(myNote);
            localStorage.setItem('notesReady', JSON.stringify(this.readyNotes));
            console.log(this.readyNotes);

        },
        toUpperCase(item) {
            return item.toUpperCase();
        }
        // inputKeyPress(event) {
        //     if (event.key === "Enter") {
        //         this.addNewNotes()
        //     }
        // }
    },
    mounted() {
        if (localStorage.getItem('notes')) {
           this.notes = JSON.parse(localStorage.getItem('notes'));
        }
        if (localStorage.getItem('notesReady')) {
            this.readyNotes = JSON.parse(localStorage.getItem('notesReady'));
        }
    },
    computed: {
        // Компьтед отимизирует код, если есть какието переменные внутри нашего приложения от которого мы вычесляем результат, в нашем случает этот результат зависит от this.notes то кидаем в Computed(они геттеры, сеттеры НЕ вызываем ())
        doubleCountComputed() {
            console.log("doubleCountComputed")
            return this.notes.length * 2
        }
    },
    watch: {
        // watch позволяет следить за любыми изменениями свойств в объекте
        // название метода(свойства) должно соподать с названием переменной
        myInputValue(value) {
            if (value.length > 10) {
                this.myInputValue = ""
            }
        },

    }
}
Vue.createApp(App).mount('#app');

