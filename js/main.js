var app = new Vue({
  el: '#root',
  data: {
    risposta:[],
    searchtext: '',
    consigliati:[],
    text: '',
    serie: [],
    film_tendenza : [],
    movie: [],
    movie_consigliati: [],
    serie_consigliate: [],
    actors:[],
    film: [],

  },
  mounted(){
      axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=55ed5a7c338e0f33b35608c6f63cee1b&language=it-IT")
        .then((response) => {
          this.film_tendenza = response.data.results;
          this.film_tendenza.forEach((movie, i) => {
            this.consigliati.push(movie);
          });
      })

      axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=55ed5a7c338e0f33b35608c6f63cee1b&language=it-IT")
        .then((response) => {
          this.film = response.data.results;
          this.film.forEach((films, i) => {
            this.movie_consigliati.push(films);
          });

      })
      axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=55ed5a7c338e0f33b35608c6f63cee1b&language=it-IT")
        .then((response) => {
          this.series = response.data.results;
          this.series.forEach((series, i) => {
            this.serie_consigliate.push(series);
          });
      })
  },


  methods:{
    search: function () {
      this.risposta =[];
      this.text = this.searchtext
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=55ed5a7c338e0f33b35608c6f63cee1b&query=${this.searchtext}&language=it-IT`)
        .then((response) => {
          this.movie = response.data.results;
          this.movie.forEach((film, i) => {
            this.risposta.push(film);
          });
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=55ed5a7c338e0f33b35608c6f63cee1b&query=${this.searchtext}&language=it-IT`)
          .then((response) => {
            this.serie = response.data.results;
            this.serie.forEach((serie, i) => {
              this.risposta.push(serie);

            });
        });
          this.searchtext = '';
      })
      console.log(this.risposta);

    },
    get_titolo:function (pelicula) {
      if (pelicula.title) {
        return pelicula.title;
      } else {
        return pelicula.name;
      }
    },
    get_original_title:function (pelicula) {
      if (pelicula.original_title) {
        return pelicula.original_title;
      } else {
        return pelicula.original_name;
      }
    },
    getvote: function (pelicula) {
      let voto_decimale = parseInt(pelicula.vote_average);
      let voto = parseInt(voto_decimale * 5 / 10);
      return voto;
    },
    get_title:function (img) {
      if (img.title) {
        return img.title;
      } else {
        return img.name;
      }
    },
    refresh:function () {
      this.text = ''
    },
    getcast: function (id) {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=55ed5a7c338e0f33b35608c6f63cee1b&language=it-IT`)
          .then((response) => {
            response.data.cast.forEach((attori, i) => {
              this.actors.push(attori)
            })
       });
       return this.actors;
     },

     getcastserie: function (id) {
       axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=55ed5a7c338e0f33b35608c6f63cee1b&language=it-IT`)
         .then((response) => {
           response.data.cast.forEach((attori, i) => {
             this.actors.push(attori)
           });        
      });
      return this.actors;

     },
     pulisci: function () {
       this.actors = [];
     },
     opennav: function () {
        var vm = this;
        console.log(vm.$refs);
        vm.$refs.mySidenav.style.width = "250px";
        vm.$refs.mySidenav.style.marginLeft = "0px";
     },
     closenav:function () {
       var vm = this;
       vm.$refs.mySidenav.style.width = "0";
       vm.$refs.mySidenav.style.marginLeft = "0";
     }

   }
});
