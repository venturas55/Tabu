/*var keyword = document.getElementById("input_busqueda");
var contentGifs = document.getElementById("contentGifs");
var trending = document.getElementById("trending");
var boton = document.getElementById("boton");
var mp = document.getElementsByTagName("li");
boton.addEventListener("click", buscar, false);
*/


var app = new Vue({
    el: "#app",
    data: {

        fichas: [],
        ficha: "",
        verOpciones: false,
        equipoA: "Equipo 1",
        marcadorA: 0,
        equipoB: "Equipo 2",
        marcadorB: 0,
        sec: 0,
        min: 0,
        hrs: 0,
        t: "",

    },
    mounted: async function() {
        await this.readJson();
        await this.siguiente();
        var temporizador = document.getElementById('temporizador');
    },
    computed: {

    },
    methods: {
        readJson: async function() {
            //console.log(this);
            let vm = this;
            const response = await fetch('./words.json').then((response) => response.json()).then(json => {
                vm.fichas = json;
                console.log(vm.fichas);
            }).catch(function() {
                vm.dataError = true;
                console.log("error");
            })
            console.log(response);
        },

        siguiente: function() {
            this.ficha = this.fichas[this.aleatorio()];
        },
        aleatorio: function() {
            return Math.floor(Math.random() * this.fichas.length);
        },
        fallo: function() {
            this.marcadorA -= 3;
            this.siguiente();

        },
        pasar: function() {
            this.siguiente();
            this.marcadorA--;
        },
        acierto: function() {
            this.marcadorA += 5;
            this.siguiente();
        },

        tick: function() {
            this.sec++;
            if (this.sec >= 60) {
                this.sec = 0;
                this.min++;
                if (this.min >= 60) {
                    this.min = 0;
                    this.hrs++;
                }
            }
        },
        add: function() {
            this.tick();
            h1.textContent = (this.hrs > 9 ? this.hrs : "0" + this.hrs) +
                ":" + (this.min > 9 ? this.min : "0" + this.min) +
                ":" + (this.sec > 9 ? this.sec : "0" + this.sec);
            this.timer();
        },
        timer: function() {
            this.t = setTimeout(this.add(), 1000);

        },
        comienzaTurno: function() {
            clearTimeout(this.t);
        },
        resetTemporizador: function() {
            temporizador.textContent = "00:00:00";
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
        }

    }
})