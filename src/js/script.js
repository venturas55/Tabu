
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
        tiempoPartida: 10,
        puntosAcierto: 5,
        penalizaFallo: 3,
        penalizaPasa: 1,
        tiempo: 0,
        caraB: {
            palabra: "TABU",
            tabu:["",""], 
            vacio: true
        },
    },
    mounted: async function () {
        // Get the modal
        var modal = document.getElementById("myModal");
        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
        // When the user clicks on the button, open the modal
        btn.onclick = function () {
            modal.style.display = "flex";
        }
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        await this.readJson();
        this.ficha = this.caraB;
        this.cargarConfiguracion();
        this.cargarMarcador();
    },
    computed: {},
    methods: {
        readJson: async function () {
            //console.log(this);
            let vm = this;
            const response = await fetch("./src/js/words2.json")
                .then((response) => response.json())
                .then((json) => {
                    vm.fichas = json;
                    //console.log(vm.fichas);
                })
                .catch(function () {
                    vm.dataError = true;
                    console.log("error");
                });
            //console.log(response);
        },

        siguienteCarta: function () {
            this.ficha = this.fichas[this.aleatorio()];
            console.log(this.ficha);
            console.log(this.ficha.palabra);
            console.log(this.ficha.tabu);
            console.log(this.ficha.tabu.length);
            console.log(this.ficha.tabu[0]);
        },
        aleatorio: function () {
            return Math.floor(Math.random() * this.fichas.length);
        },
        fallo: function () {
            if (this.esTurnoA) 
                this.marcadorA -= this.penalizaFallo;
            else 
                this.marcadorB -= this.penalizaFallo;
            this.siguienteCarta();
        },
        pasar: function () {
            if (this.esTurnoA)
                 this.marcadorA -= this.penalizaPasa;
            else
                 this.marcadorB -= this.penalizaPasa;
            this.siguienteCarta();
        },
        acierto: function () {
            if (this.esTurnoA) this.marcadorA += this.puntosAcierto;
            else this.marcadorB += this.puntosAcierto;
            this.siguienteCarta();
        },

        updateClock: function () {
            if (this.tiempo == 0) {
                this.tiempo--;
                this.ficha = this.caraB;
                console.log("Final");
                this.cambiarEquipo();
                this.guardarMarcador();
            } else {
                this.tiempo--;
                setTimeout(this.updateClock, 1000);
            }
        },
        resetClock: function () {
            this.tiempo = this.tiempoPartida;
        },
        startClock: function () {
            this.siguienteCarta();
            this.resetClock();
            setTimeout(this.updateClock, 1000);
        },
        resetGame: function () {
            this.equipoA = "Equipo 1";
            this.marcadorA = 0;
            this.equipoB = "Equipo 2";
            this.marcadorB = 0;
        },
        cambiarEquipo: function () {
            this.esTurnoA = !this.esTurnoA;
        },
        guardarMarcador: function () {
            var obj = {
                equipoA: this.equipoA,
                equipoB: this.equipoB,
                marcadorA: this.marcadorA,
                marcadorB: this.marcadorB,
                esTurnoA: this.esTurnoA,
            };
            localStorage.setItem("marcador", JSON.stringify(obj));
            //console.log("guardado:" + JSON.stringify(obj));
        },
        cargarMarcador: function () {
            var marcador = localStorage.getItem("marcador");
            //console.log("Cargar:" + marcador);
            if (marcador) {
                var obj = JSON.parse(marcador);
                this.equipoA = obj.equipoA;
                this.equipoB = obj.equipoB;
                this.marcadorA = obj.marcadorA;
                this.marcadorB = obj.marcadorB;
                this.esTurnoA = obj.esTurnoA;
            } else {
                this.resetGame();
            }
        },
        guardarConfiguracion: function () {
            var obj = {
                tiempoPartida: this.tiempoPartida,
                puntosAcierto: this.puntosAcierto,
                penalizaFallo: this.penalizaFallo,
                penalizaPasa: this.penalizaPasa
            };
            localStorage.setItem("configuracion", JSON.stringify(obj));
            //console.log("guardado:" + JSON.stringify(obj));
            document.getElementById("myModal").style.display = "none";
        },
        cargarConfiguracion: function () {
            var configuracion = localStorage.getItem("configuracion");
            //console.log("Cargar:" + configuracion);
            if (configuracion) {
                var obj = JSON.parse(configuracion);
                this.tiempoPartida = obj.tiempoPartida;
                this.puntosAcierto = obj.puntosAcierto;
                this.penalizaFallo = obj.penalizaFallo;
                this.penalizaPasa = obj.penalizaPasa;
            }
        },
    }
});