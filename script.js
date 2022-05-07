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
        esTurnoA: true,
        tiempo: 0,
        caraB: {
            "palabra": "",
            "tabu1": "",
            "tabu2": "",
            "tabu3": "TABU",
            "tabu4": "",
            "tabu5": ""
        }

    },
    mounted: async function() {
        await this.readJson();
        this.ficha = this.caraB;
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
            if (this.esTurnoA)
                this.marcadorA -= 3;
            else
                this.marcadorB -= 3;
            this.siguiente();

        },
        pasar: function() {
            if (this.esTurnoA)
                this.marcadorA--;
            else
                this.marcadorB--;
            this.siguiente();

        },
        acierto: function() {
            if (this.esTurnoA)
                this.marcadorA += 5;
            else
                this.marcadorB += 5;
            this.siguiente();
        },


        updateClock: function() {
            if (this.tiempo == 0) {
                this.tiempo--;
                this.ficha = this.caraB;
                console.log('Final');
                this.esTurnoA = !this.esTurnoA;
            } else {
                this.tiempo--;
                setTimeout(this.updateClock, 1000);
            }
        },
        resetClock: function() {
            this.tiempo = 100;
        },
        startClock: function() {
            this.siguiente();
            this.resetClock();
            setTimeout(this.updateClock, 1000);

        }

    }
})