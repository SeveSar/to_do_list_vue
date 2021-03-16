
const App = {
    data() {
        return {
            title: "Мои дела",
            myPlaseholder: "Пиши заметку",
            myInputValue: "",
            notes: [],
            readyNotes: 0

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
                this.myInputValue = "";
            }
        },
        deleteNote(index,event) {
            this.notes.splice(index,1);
            if (this.readyNotes > 0) {
                this.readyNotes -=1;
            }
        },
        readyNote(index,event) {
            event.target.closest('li').classList.add("ready-note");
            console.log(event.target);
            this.readyNotes +=1;
            this.$refs.list.append(event.target.closest('li'));
            event.target.remove();
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
        }
    }
}

Vue.createApp(App).mount('#app');

